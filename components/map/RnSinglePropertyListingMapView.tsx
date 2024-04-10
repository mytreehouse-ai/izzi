import { AnimatedView, Text, View } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { mapDarkModeStyle } from "@/constants/MapStyles";
import { defaultStyles } from "@/constants/Styles";
import { useRouter } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  useColorScheme,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { FadeIn, FadeOut } from "react-native-reanimated";

interface RnsSinglePropertyListingMapViewProps {
  formattedPrice?: string;
}

const RnsSinglePropertyListingMapView: React.FC<
  RnsSinglePropertyListingMapViewProps
> = ({ formattedPrice }) => {
  const router = useRouter();
  const colorScheme = useColorScheme();

  return (
    <View style={defaultStyles.container}>
      <MapView
        userInterfaceStyle={colorScheme as "light" | "dark"}
        customMapStyle={colorScheme === "dark" ? mapDarkModeStyle : undefined}
        loadingEnabled={Platform.OS === "android" ? true : false}
        style={{ width: "auto", height: 300, borderRadius: 10 }}
        zoomEnabled={true}
        zoomTapEnabled={false}
        showsUserLocation={true}
        moveOnMarkerPress={false}
        showsMyLocationButton={true}
        minZoomLevel={10}
        maxZoomLevel={20}
        initialRegion={{
          latitude: 14.5547,
          longitude: 121.0244,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
      >
        <Marker
          key={1}
          tracksViewChanges={false}
          coordinate={{
            latitude: 14.5547,
            longitude: 121.0244,
          }}
        >
          <AnimatedView
            style={styles.marker}
            lightColor={Colors.light.primary}
            darkColor={Colors.dark.primary}
            entering={FadeIn.duration(500)}
            exiting={FadeOut.duration(500)}
          >
            <Text
              fontWeight="bold"
              fontSize={12}
              style={{ color: Colors.common.white }}
            >
              {formattedPrice ?? "100"}
            </Text>
          </AnimatedView>
        </Marker>
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
  marker: {
    width: "auto",
    height: 30,
    padding: 8,
    borderRadius: 15,
    backgroundColor: Colors.common.primary,
    alignItems: "center",
    justifyContent: "center",
  },
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

export default RnsSinglePropertyListingMapView;
