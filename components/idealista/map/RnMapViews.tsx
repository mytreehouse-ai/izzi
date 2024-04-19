import { View } from "@/components/Themed";
import { mapDarkModeStyle } from "@/constants/MapStyles";
import { defaultStyles } from "@/constants/Styles";
import { PropertyListing } from "@/interfaces/propertyListing";
import { useRouter } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  useColorScheme,
} from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import MapMarker from "./MapMarker";

const data: PropertyListing[] = [];

const RnMapViews = () => {
  const router = useRouter();
  const colorScheme = useColorScheme();

  return (
    <View style={defaultStyles.container}>
      <MapView
        userInterfaceStyle={colorScheme as "light" | "dark"}
        customMapStyle={colorScheme === "dark" ? mapDarkModeStyle : undefined}
        loadingEnabled={Platform.OS === "android" ? true : false}
        provider={PROVIDER_GOOGLE}
        style={StyleSheet.absoluteFill}
        zoomEnabled={true}
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
      </MapView>
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
});

export default RnMapViews;
