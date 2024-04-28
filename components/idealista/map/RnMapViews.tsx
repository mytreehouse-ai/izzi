import { Ionicons, Text, View } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { mapDarkModeStyle } from "@/constants/MapStyles";
import { defaultStyles } from "@/constants/Styles";
import { PropertyListing } from "@/interfaces/propertyListing";
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

	const handleMapReady = async() => {
		setPointBounds([]);
		// Step size for generating points (adjust as needed)
		const bounds = await mapView.current?.getMapBoundaries();
		// You can adjust this value as per your requirement
		var step = 0.0001; 
		// Generate points covering the entire area within the bounds
		var b = getPointsInBounds(bounds, step);
		setPointBounds(b);
	};

	const handleRegionChangeComplete = async (newRegion: any) => {
		handleMapReady();
	};

	const handleMapDrawPanEnd = async() => {
		if (points.length > 0) {
			const pointToPolygon: Coordinate[] = [];
			pointBounds.map(bb=> {
				if (isPointInsidePolygon(bb, points)) {
					console.log('Point bounds: ', bb);
					
					pointToPolygon.push(bb);
				}
			});

			setInsideBounds(pointToPolygon);
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
	}

	const isPointInsidePolygon = (point: Coordinate, polygon: Coordinate[]):  boolean => {
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
												const xinters = (y - p1y) * (p2x - p1x) / (p2y - p1y) + p1x;
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
				onRegionChangeComplete={handleRegionChangeComplete}
        onPanDrag={handleMapDrawOnPan} // Log coordinates/points while map is on pan
        onTouchEnd={handleMapDrawPanEnd} // Call API to fetch properties by tracked "Points | Coordinates"
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

        { points.length > 0 && (
            <Polygon
              coordinates={points.map((point) => ({
                latitude: point.latitude,
                longitude: point.longitude,
              }))}
              fillColor="rgba(186, 214, 175, 0.3)"
            />
          )
        }

        { (isDrawState == true && currentCoordinate !== undefined) && (
          	<Marker
								draggable
								coordinate={{
									latitude: currentCoordinate.latitude,
									longitude: currentCoordinate.longitude,
								}}
								children={<DrawMarker/>}
							/>
						)
				}

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

				{ insideBounds.map((i,k) => {
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
				}

      </MapView>

			{ // TODO: Future Draw Feature Implementation For Improvement
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
