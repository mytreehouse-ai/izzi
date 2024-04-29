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

  const handleMapReady = async () => {
    setPointBounds([]);
    // Step size for generating points (adjust as needed)
    const bounds = await mapView.current?.getMapBoundaries();
    // You can adjust this value as per your requirement
    var step = 0.0001;
    // Generate points covering the entire area within the bounds
    var b = getPointsInBounds(bounds, step);
    setPointBounds(b);
  };

  const handleMapDrawPanEnd = async () => {
    if (points.length > 0) {
      const pointToPolygon: Coordinate[] = [];
      pointBounds.map((bb) => {
        if (isPointInsidePolygonUsingTurf(bb, points)) {
          console.log("Point bounds: ", bb);

          pointToPolygon.push(bb);
        }
      });

      setInsideBounds(pointToPolygon);
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
      const generatedPoints = generatePointsWithinBounds(bounds, distance);

      // Filter points to ensure they're inside the polygon
      const insidePoints = generatedPoints.filter((pointCoord) =>
        isPointInsidePolygonUsingTurf(pointCoord, points)
      );

      console.log(insidePoints);

      setInsideBounds(insidePoints);
    }
  };

  // Function to generate points covering the entire area within given bounds
  const getPointsInBounds = (bounds: any, step: any) => {
    var minLat = bounds.southWest.latitude;
    var maxLat = bounds.northEast.latitude;
    var minLng = bounds.southWest.longitude;
    var maxLng = bounds.northEast.longitude;

    var points = [];
    for (var lat = minLat; lat <= maxLat; lat += step) {
      for (var lng = minLng; lng <= maxLng; lng += step) {
        points.push({ latitude: lat, longitude: lng });
      }
    }

    return points;
  };

  const isPointInsidePolygon = (
    point: Coordinate,
    polygon: Coordinate[]
  ): boolean => {
    const x = point.longitude;
    const y = point.latitude;
    let inside = false;
    const n = polygon.length;
    let p1x: number, p1y: number, p2x: number, p2y: number;

    p1x = polygon[0].longitude;
    p1y = polygon[0].latitude;

    for (let i = 0; i < n + 1; i++) {
      p2x = polygon[i % n].longitude;
      p2y = polygon[i % n].latitude;

      if (y > Math.min(p1y, p2y)) {
        if (y <= Math.max(p1y, p2y)) {
          if (x <= Math.max(p1x, p2x)) {
            if (p1y !== p2y) {
              const xinters = ((y - p1y) * (p2x - p1x)) / (p2y - p1y) + p1x;
              if (p1x === p2x || x <= xinters) {
                inside = !inside;
              }
            }
          }
        }
      }
      p1x = p2x;
      p1y = p2y;
    }
    return inside;
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

  const generatePointsWithinBounds = (
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
        onMapReady={handleMapReady}
        onRegionChangeComplete={() => setTimeout(handleMapReady, 200)}
        onPanDrag={handleMapDrawOnPan} // Log coordinates/points while map is on pan
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
