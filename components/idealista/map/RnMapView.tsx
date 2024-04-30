import { mapDarkModeStyle } from "@/constants/MapStyles";
import React from "react";
import { useColorScheme } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

interface RnMapViewProps {
  latitude: number;
  longitude: number;
  height?: number;
}

const RnMapView: React.FC<RnMapViewProps> = ({
  latitude,
  longitude,
  height = 300,
}) => {
  const colorScheme = useColorScheme();

  return (
    <MapView
      userInterfaceStyle={colorScheme as "light" | "dark"}
      customMapStyle={colorScheme === "dark" ? mapDarkModeStyle : undefined}
      style={{ height, borderRadius: 8 }}
      provider={PROVIDER_GOOGLE}
      minZoomLevel={16}
      zoomEnabled={true}
      zoomTapEnabled={false}
      showsUserLocation={false}
      moveOnMarkerPress={false}
      showsMyLocationButton={false}
      initialRegion={{
        latitude,
        longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}
    >
      <Marker
        tracksViewChanges={false}
        coordinate={{
          latitude,
          longitude,
        }}
      />
    </MapView>
  );
};

export default RnMapView;
