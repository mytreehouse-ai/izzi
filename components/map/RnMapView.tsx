import { View } from "@/components/Themed";
import { mapDarkModeStyle } from "@/constants/MapStyles";
import { defaultStyles } from "@/constants/Styles";
import { ApiBaseResponse } from "@/interfaces/apiBaseResponse";
import { PropertyListing } from "@/interfaces/propertyListing";
import { InfiniteData, UseInfiniteQueryResult } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  useColorScheme,
} from "react-native";
import MapView from "react-native-map-clustering";
import CustomMapMarker from "./CustomMapMarker";

interface RnMapViewProps {
  propertyListingsQuery: UseInfiniteQueryResult<
    InfiniteData<ApiBaseResponse<PropertyListing[]>, unknown>,
    Error
  >;
}

const RnMapView = ({ propertyListingsQuery }: RnMapViewProps) => {
  const router = useRouter();
  const colorScheme = useColorScheme();

  const {
    isLoading,
    isFetchingNextPage,
    data: propertyListings,
  } = propertyListingsQuery;

  return (
    <View style={defaultStyles.container}>
      <MapView
        userInterfaceStyle={colorScheme as "light" | "dark"}
        customMapStyle={colorScheme === "dark" ? mapDarkModeStyle : undefined}
        animationEnabled={false}
        loadingEnabled={Platform.OS === "android" ? true : false}
        style={StyleSheet.absoluteFill}
        zoomEnabled={true}
        zoomTapEnabled={false}
        showsUserLocation={true}
        moveOnMarkerPress={false}
        showsMyLocationButton={true}
        clusterFontFamily="MontserratSemiBold"
        onRegionChangeComplete={({ longitude, latitude }) => {
          !isFetchingNextPage &&
            setTimeout(async () => {
              await propertyListingsQuery.fetchNextPage();
            }, 2000);
        }}
        minZoomLevel={10}
        maxZoomLevel={20}
        initialRegion={{
          latitude: 14.5547,
          longitude: 121.0244,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
      >
        {propertyListings?.pages.flatMap((page) =>
          page.data
            .filter((p) => p.coordinates.length > 0)
            .map((propertyListing) => (
              <CustomMapMarker
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
            ))
        )}
      </MapView>
      {isLoading && (
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

export default RnMapView;
