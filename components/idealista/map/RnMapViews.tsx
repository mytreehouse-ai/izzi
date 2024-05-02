import { Ionicons, Text, View } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { mapDarkModeStyle } from "@/constants/MapStyles";
import { defaultStyles } from "@/constants/Styles";
import { PropertyListing } from "@/interfaces/propertyListing";
import { useAuth } from "@clerk/clerk-expo";
import booleanPointInPolygon from "@turf/boolean-point-in-polygon";
import destination from "@turf/destination";
import { point, polygon } from "@turf/helpers";
import { useRouter } from "expo-router";
import React, { useEffect, useReducer, useRef } from "react";
import {
	ActivityIndicator,
	Platform,
	StyleSheet,
	TouchableOpacity,
	useColorScheme,
} from "react-native";
import MapView, {
	Circle,
	MapMarker,
	Marker,
	PROVIDER_GOOGLE,
	Polygon
} from "react-native-maps";

const data: PropertyListing[] = [];

interface Bounds {
  southWest: Coordinate;
  northEast: Coordinate;
}

const DrawMarker = () => {
  return <Ionicons name="pencil" size={25} lightColor="black" />;
};

interface State {
  points: Coordinate[];
  pointBounds: Coordinate[];
  insideBounds: Coordinate[];
  centerPoint: Coordinate;
  currentCoordinate: Coordinate | undefined;
  isDrawState: boolean;
	radius: number;
}

interface Action {
  type: string;
  payload?: any;
}

const initialState: State = {
  points: [],
  pointBounds: [],
  insideBounds: [],
  centerPoint: {latitude: 0, longitude: 0},
  currentCoordinate: undefined,
  isDrawState: false,
	radius: 0,
};

function mapReducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_POINTS":
      return { ...state, points: action.payload };
    case "SET_RADIUS":
      return { ...state, radius: action.payload };
    case "SET_POINT_BOUNDS":
      return { ...state, pointBounds: action.payload };
    case "SET_INSIDE_BOUNDS":
      return { ...state, insideBounds: action.payload };
    case "SET_CENTER_POINT":
      return { ...state, centerPoint: action.payload };
    case "SET_CURRENT_COORDINATE":
      return { ...state, currentCoordinate: action.payload };
    case "TOGGLE_DRAW_STATE":
      return { ...state, isDrawState: !state.isDrawState };
    case "CLEAR_DRAW":
      return { ...initialState, isDrawState: false };
    default:
      return state;
  }
}

const RnMapViews = () => {
  const router = useRouter();
  const { getToken } = useAuth();
  const colorScheme = useColorScheme();
  const mapView = useRef<MapView>(null);
  const [state, dispatch] = useReducer(mapReducer, initialState);
  const {
    points,
    pointBounds,
    insideBounds,
    centerPoint,
    currentCoordinate,
    isDrawState,
		radius,
  } = state;

  const handleClearDraw = () => {
    dispatch({ type: "CLEAR_DRAW" });
  };

  const handleMapDrawOnPan = (event: any) => {
    if (isDrawState) {
      const { nativeEvent } = event;
      const { coordinate } = nativeEvent;
      dispatch({ type: "SET_CURRENT_COORDINATE", payload: coordinate });
      dispatch({ type: "SET_POINTS", payload: [...points, coordinate] });
    }
  };

  const handleMapReadyUsingTurf = async () => {
    // Clear any existing points
    dispatch({ type: "SET_POINT_BOUNDS", payload: [] });

    // Obtain the current map boundaries
    const bounds = await mapView.current?.getMapBoundaries();

    if (bounds) {
      // Define the desired distance between points in meters
      // For example, 50 meters
      const distanceMeters = 50;

      // Generate points within the bounds, spaced approximately 50 meters apart
      const generatedPoints = generatePointsWithinBoundsUsingTurf(
        {
          southWest: {
            latitude: bounds.southWest.latitude,
            longitude: bounds.southWest.longitude,
          },
          northEast: {
            latitude: bounds.northEast.latitude,
            longitude: bounds.northEast.longitude,
          },
        },
        distanceMeters
      );

      // Update state with the generated points
      dispatch({ type: "SET_POINT_BOUNDS", payload: generatedPoints });
    }
  };

  const handleMapDrawPanEndUsingTurf = async (zoomLevel: number) => {
    if (points.length > 0) {
      const latitudes = points.map((p) => p.latitude);
      const longitudes = points.map((p) => p.longitude);

      const bounds: Bounds = {
        southWest: {
          latitude: Math.min(...latitudes),
          longitude: Math.min(...longitudes),
        },
        northEast: {
          latitude: Math.max(...latitudes),
          longitude: Math.max(...longitudes),
        },
      };

      // Calculate distance based on zoom level
      const distance = calculateDistanceBasedOnZoom(zoomLevel);

      // Generate points within the bounds, using the calculated distance
      const generatedPoints = generatePointsWithinBoundsUsingTurf(
        bounds,
        distance
      );

      // Filter points to ensure they're inside the polygon
      const insidePoints = generatedPoints.filter((pointCoord) =>
        isPointInsidePolygonUsingTurf(pointCoord, points)
      );

      dispatch({ type: "SET_INSIDE_BOUNDS", payload: insidePoints });

			const radius = calculateAverageRadius(points, centerPoint);
			dispatch({type: "SET_RADIUS", payload: radius});
    }
  };

  const isPointInsidePolygonUsingTurf = (
    pointCoord: Coordinate,
    polygonCoords: Coordinate[]
  ): boolean => {
    // Convert the point and polygon coordinates to the format expected by Turf.js
    const turfPoint = point([pointCoord.longitude, pointCoord.latitude]);
    const turfPolygon = polygon([
      [
        ...polygonCoords.map((coord) => [coord.longitude, coord.latitude]),
        [polygonCoords[0].longitude, polygonCoords[0].latitude], // Close the polygon by repeating the first point
      ],
    ]);

    // Use Turf.js to check if the point is inside the polygon
    return booleanPointInPolygon(turfPoint, turfPolygon);
  };

  const generatePointsWithinBoundsUsingTurf = (
    bounds: Bounds,
    distanceMeters: number
  ): Coordinate[] => {
    let currentLat = bounds.southWest.latitude;
    let currentLng = bounds.southWest.longitude;
    const points: Coordinate[] = [];

    while (currentLat <= bounds.northEast.latitude) {
      while (currentLng <= bounds.northEast.longitude) {
        points.push({ latitude: currentLat, longitude: currentLng });

        // Move east by the specified distance
        const eastPoint = destination(
          [currentLng, currentLat],
          distanceMeters,
          90,
          { units: "meters" }
        );
        currentLng = eastPoint.geometry.coordinates[0];
      }

      // Move north by the specified distance and reset longitude to start again from the west
      const northPoint = destination(
        [bounds.southWest.longitude, currentLat],
        distanceMeters,
        0,
        { units: "meters" }
      );
      currentLat = northPoint.geometry.coordinates[1];
      currentLng = bounds.southWest.longitude; // Reset to start longitude
    }

    return points;
  };

  function getPolygonCenterPoint(insidePoints: Coordinate[]) {
    const sum = insidePoints.reduce(
      (acc, coord) => {
        acc.lat += coord.latitude;
        acc.lng += coord.longitude;
        return acc;
      },
      { lat: 0, lng: 0 }
    );

    const centerPoint: Coordinate = {
      latitude: sum.lat / insidePoints.length,
      longitude: sum.lng / insidePoints.length,
    };

    return centerPoint;
  }

	function calculateAverageRadius(
		points: Coordinate[], 
		center: Coordinate) 
	{
		let totalDistance = 0;
		
		for (const point of points) {
			const distance = Math.sqrt(
				Math.pow(point.latitude - center.latitude, 2) +
					Math.pow(point.longitude - center.longitude, 2)
			);
			totalDistance += distance;
		}

		return totalDistance / points.length;
	}

  function calculateDistanceBasedOnZoom(zoomLevel: number): number {
    // Adjusted values for optimized performance and user experience
    if (zoomLevel > 15) return 50; // 50 meters between points when zoomed in closely for detailed view
    if (zoomLevel > 13) return 100; // 100 meters for intermediate zoom to balance detail and performance
    return 150; // 150 meters when zoomed out to reduce load while providing an overview
  }

  useEffect(() => {
    if (insideBounds.length >= 4) {
      const centerPoint = getPolygonCenterPoint(insideBounds);
      // console.log(centerPoint);
      dispatch({ type: "SET_CENTER_POINT", payload: centerPoint });
    }
  }, [insideBounds]);

  return (
    <View style={defaultStyles.container}>
      <MapView
        ref={mapView}
        userInterfaceStyle={colorScheme as "light" | "dark"}
        customMapStyle={colorScheme === "dark" ? mapDarkModeStyle : undefined}
        loadingEnabled={Platform.OS === "android" ? true : false}
        provider={PROVIDER_GOOGLE}
        style={StyleSheet.absoluteFill}
        minZoomLevel={12}
        maxZoomLevel={16}
        zoomEnabled={!isDrawState}
        zoomTapEnabled={false}
        showsUserLocation={true}
        moveOnMarkerPress={false}
        initialRegion={{
          latitude: 14.5547,
          longitude: 121.0244,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        scrollEnabled={!isDrawState}
        onMapReady={handleMapReadyUsingTurf}
        onRegionChangeComplete={() => setTimeout(handleMapReadyUsingTurf, 200)}
        onPanDrag={handleMapDrawOnPan}
        onTouchEnd={async () => {
          const camera = await mapView.current?.getCamera();
          if (camera?.zoom) {
            void handleMapDrawPanEndUsingTurf(camera.zoom);
          }
        }}
      >
        {data.map((propertyListing) => (
          <MapMarker
            key={propertyListing.id}
            id={String(propertyListing.id)}
            coordinate={{
              latitude: propertyListing.coordinates[0],
              longitude: propertyListing.coordinates[1],
            }}
            onPress={() =>
              router.push(`/property-listing/${propertyListing.id}`)
            }
          />
        ))}

        { (points.length > 0 && radius == 0) && (
          <Polygon
            coordinates={points.map((point) => ({
              latitude: point.latitude,
              longitude: point.longitude,
            }))}
            fillColor="rgba(186, 214, 175, 0.3)"
          />
        )}

				{centerPoint && radius != 0 && (
					<Circle
						center={{latitude: centerPoint?.latitude, longitude: centerPoint?.longitude}} 
						radius={radius} 
						strokeColor="#000" 
						fillColor="rgba(0, 0, 255, 0.3)" 
					/>
				)}

        {isDrawState == true && currentCoordinate !== undefined && (
          <Marker
            draggable={true}
            coordinate={{
              latitude: currentCoordinate.latitude,
              longitude: currentCoordinate.longitude,
            }}
            children={<DrawMarker />}
          />
        )}

        {centerPoint && (
          <Marker
            draggable
            coordinate={{
              latitude: centerPoint.latitude,
              longitude: centerPoint.longitude,
            }}
          />
        )}

        {/* {!isLoading &&
          propertyListings?.pages
            .map((page) => page.data)
            .flat()
            .map((property) => {
              console.log(property.coordinates);

              return (
                <Marker
                  key={property.id}
                  draggable
                  coordinate={{
                    latitude: property.coordinates[1],
                    longitude: property.coordinates[0],
                  }}
                />
              );
            })} */}

        {insideBounds.map((i, k) => {
          return (
            <Marker
              key={`mb_${k}`}
              draggable
              coordinate={{
                latitude: i.latitude,
                longitude: i.longitude,
              }}
              children={<Text>.</Text>}
            />
          );
        })}
      </MapView>

      {isDrawState == false && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={{ ...styles.buttonTouch, ...styles.shadowProp }}
            activeOpacity={0.75}
            onPress={() => dispatch({ type: "TOGGLE_DRAW_STATE" })}
          >
            <Ionicons
              name="color-wand"
              size={25}
              lightColor={Colors.light.primary}
              darkColor={Colors.dark.primary}
            />
            <Text
              fontWeight="bold"
              lightColor={Colors.light.primary}
              darkColor={Colors.dark.primary}
            >
              Draw to filter
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {isDrawState == true && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={{ ...styles.buttonTouch, ...styles.shadowProp }}
            activeOpacity={0.75}
            onPress={handleClearDraw}
          >
            <Ionicons
              name="close"
              size={25}
              lightColor={Colors.light.primary}
              darkColor={Colors.dark.primary}
            />
            <Text
              fontWeight="bold"
              lightColor={Colors.light.primary}
              darkColor={Colors.dark.primary}
            >
              Clear Draw
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {false && (
        <View style={styles.loader}>
          <ActivityIndicator size="large" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  loader: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 100,
  },
  buttonContainer: {
    backgroundColor: "transparent",
    position: "absolute",
    bottom: 50,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  buttonTouch: {
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    borderColor: "#E5E7EB",
    borderWidth: 1,
  },
  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});

export default RnMapViews;
