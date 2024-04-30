import { Ionicons, Text, View } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { mapDarkModeStyle } from "@/constants/MapStyles";
import { defaultStyles } from "@/constants/Styles";
import { PropertyListing } from "@/interfaces/propertyListing";
import booleanPointInPolygon from "@turf/boolean-point-in-polygon";
import destination from "@turf/destination";
import { point, polygon } from "@turf/helpers";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import MapView, {
  MapMarker,
  Marker,
  PROVIDER_GOOGLE,
  Polygon,
} from "react-native-maps";

const data: PropertyListing[] = [];

interface Bounds {
  southWest: Coordinate;
  northEast: Coordinate;
}

const DrawMarker = () => {
  return <Ionicons name="pencil" size={25} lightColor="black" />;
};

const RnMapViews = () => {
  const router = useRouter();
  const colorScheme = useColorScheme();

  const mapView = useRef<MapView>(null);
  const [points, setPoints] = useState<Coordinate[]>([]); // Can be stored
  const [pointBounds, setPointBounds] = useState<Coordinate[]>([]); // Can be stored
  const [insideBounds, setInsideBounds] = useState<Coordinate[]>([]); // Can be stored
  const [currentCoordinate, setCurrentCoordinate] = useState<Coordinate>(); // Can be stored
  const [isDrawState, setIsDrawState] = useState<boolean>(false); // Can be stored

  const handleClearDraw = () => {
    setIsDrawState(false);
    setPoints([]);
    setInsideBounds([]);
    setCurrentCoordinate(undefined);
  };

  const handleMapDrawOnPan = (event: any) => {
    if (isDrawState) {
      const { nativeEvent } = event;
      const { coordinate } = nativeEvent;
      setCurrentCoordinate(coordinate);
      setPoints([...points, coordinate]);
    }
  };

  const handleMapReadyUsingTurf = async () => {
    // Clear any existing points
    setPointBounds([]);

    // Obtain the current map boundaries
    const bounds = await mapView.current?.getMapBoundaries();

    if (bounds) {
      // Define the desired distance between points in meters
      // For example, 100 meters
      const distanceMeters = 100;

      // Generate points within the bounds, spaced approximately 100 meters apart
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
      setPointBounds(generatedPoints);
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

      console.log(insidePoints);

      setInsideBounds(insidePoints);
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

  function calculateDistanceBasedOnZoom(zoomLevel: number): number {
    // Adjusted values for optimized performance and user experience
    if (zoomLevel > 15) return 50; // 50 meters between points when zoomed in closely for detailed view
    if (zoomLevel > 13) return 150; // 150 meters for intermediate zoom to balance detail and performance
    return 300; // 300 meters when zoomed out to reduce load while providing an overview
  }

  return (
    <View style={defaultStyles.container}>
      <MapView
        ref={mapView}
        userInterfaceStyle={colorScheme as "light" | "dark"}
        customMapStyle={colorScheme === "dark" ? mapDarkModeStyle : undefined}
        loadingEnabled={Platform.OS === "android" ? true : false}
        provider={PROVIDER_GOOGLE}
        style={StyleSheet.absoluteFill}
        minZoomLevel={13}
        maxZoomLevel={20}
        zoomEnabled={!isDrawState}
        zoomTapEnabled={false}
        showsUserLocation={true}
        moveOnMarkerPress={false}
        showsMyLocationButton={true}
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

        {points.length > 0 && (
          <Polygon
            coordinates={points.map((point) => ({
              latitude: point.latitude,
              longitude: point.longitude,
            }))}
            fillColor="rgba(186, 214, 175, 0.3)"
          />
        )}

        {isDrawState == true && currentCoordinate !== undefined && (
          <Marker
            draggable
            coordinate={{
              latitude: currentCoordinate.latitude,
              longitude: currentCoordinate.longitude,
            }}
            children={<DrawMarker />}
          />
        )}

        {/* { points.map((i,k) => {
						return <Marker
								key={`mk_${k}`}
								draggable
								coordinate={{
									latitude: i.latitude,
									longitude: i.longitude,
								}}
							/>
						}
					)
				} */}

        {/* { pointBounds.map((i,k) => {
						return <Marker
								key={`mb_${k}`}
								draggable
								coordinate={{
									latitude: i.latitude,
									longitude: i.longitude,
								}}
								children={<Text>.</Text>}
							/>
						}
					)
				} */}

        {insideBounds.map((i, k) => {
          return (
            <Marker
              key={`mb_${k}`}
              draggable
              coordinate={{
                latitude: i.latitude,
                longitude: i.longitude,
              }}
            />
          );
        })}
      </MapView>

      {
        // TODO: Future Draw Feature Implementation For Improvement
        // isDrawState == true && mapView.current != null &&
        // <Draw
        // 	mapView={mapView.current}
        // 	points={points}
        // 	setPoints={updatePoints}
        // 	isDrawState={isDrawState}
        // />
      }

      {isDrawState == false && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={{ ...styles.buttonTouch, ...styles.shadowProp }}
            activeOpacity={0.75}
            onPress={() => setIsDrawState(!isDrawState)}
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
