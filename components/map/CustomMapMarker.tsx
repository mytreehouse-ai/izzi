import { AnimatedView, Text } from "@/components/Themed";
import Colors from "@/constants/Colors";
import React from "react";
import { StyleSheet } from "react-native";
import { Marker } from "react-native-maps";
import { FadeIn, FadeOut } from "react-native-reanimated";

interface CustomMapMarkerProps {
  id: string;
  price: string;
  coordinate: {
    latitude: number;
    longitude: number;
  };
  onPress: () => void;
}

const CustomMapMarker: React.FC<CustomMapMarkerProps> = ({
  id,
  price,
  coordinate,
  onPress,
}) => (
  <Marker
    key={id}
    tracksViewChanges={false}
    coordinate={coordinate}
    onPress={onPress}
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
        {price}
      </Text>
    </AnimatedView>
  </Marker>
);

interface AreEqualProps {
  id: string;
  coordinate: {
    latitude: number;
    longitude: number;
  };
}

const areEqual = (prevProps: AreEqualProps, nextProps: AreEqualProps) => {
  return (
    prevProps.id === nextProps.id &&
    prevProps.coordinate.latitude === nextProps.coordinate.latitude &&
    prevProps.coordinate.longitude === nextProps.coordinate.longitude
  );
};

const styles = StyleSheet.create({
  marker: {
    padding: 6,
    borderRadius: 10,
  },
});

export default React.memo(CustomMapMarker, areEqual);
