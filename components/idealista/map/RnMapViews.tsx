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
interface Coordinate {
  latitude: number;
  longitude: number;
}

const DrawMarker = () => {
	return (
		<Ionicons
			name="pencil"
			size={25}
      lightColor="black"
		/>
	);
};

const RnMapViews = () => {
  const router = useRouter();
  const colorScheme = useColorScheme();

  const mapView = useRef<MapView>(null);
  const [points, setPoints] = useState<Coordinate[]>([]);
  const [currentCoordinate, setCurrentCoordinate] = useState<Coordinate>();
  const [isDrawState, setIsDrawState] = useState<boolean>(false);

  const handleClearDraw = () => {
    setIsDrawState(false);
    setPoints([]);
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
        onPanDrag={handleMapDrawOnPan} // Log coordinates/points while map is on pan
        onTouchEnd={() => console.log(points)} // Call API to fetch properties by tracked "Points | Coordinates"
      >
        {data.map((propertyListing) => (
          <MapMarker
            key={propertyListing.id}
            id={String(propertyListing.id)}
            price={propertyListing.price_formatted}
            coordinate={{
              latitude: propertyListing.coordinates[0],
              longitude: propertyListing.coordinates[1],
            }}
            onPress={() =>
              router.push(`/property-listing/${propertyListing.id}`)
            }
          />
        ))}

        {
          // Render polygon drawing
          points.length > 0 && (
            <Polygon
              coordinates={points.map((point) => ({
                latitude: point.latitude,
                longitude: point.longitude,
              }))}
              fillColor="rgba(186, 214, 175, 0.3)"
            />
          )
        }

        {
					// Drawing Pen Marker
				(isDrawState == true && currentCoordinate !== undefined) && (
          <Marker
            draggable
            coordinate={{
              latitude: currentCoordinate.latitude,
              longitude: currentCoordinate.longitude,
            }}
						children={<DrawMarker/>}
          />
        )}
      </MapView>

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
