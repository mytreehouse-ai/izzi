import { AnimatedView, View } from "@/components/Themed";
import Colors from "@/constants/Colors";
import React from "react";
import { Platform, StyleSheet, useColorScheme } from "react-native";
import { FadeInRight, FadeOutLeft } from "react-native-reanimated";

interface ListingCardProps {
  image: React.ReactNode;
  media: React.ReactNode;
  info: React.ReactNode;
  footer: React.ReactNode;
}

const ListingCard: React.FC<ListingCardProps> = ({
  image,
  media,
  info,
  footer,
}) => {
  const colorScheme = useColorScheme();

  return (
    <AnimatedView
      style={[
        {
          borderWidth: StyleSheet.hairlineWidth,
          borderRadius: 8,
          marginBottom: 16,
          borderColor:
            colorScheme === "light"
              ? Colors.common.gray["300"]
              : Colors.common.gray["600"],
        },
        styles.propertyListingContainerShadow,
      ]}
      entering={
        Platform.OS === "android" ? FadeInRight.delay(100) : FadeInRight
      }
      exiting={Platform.OS === "android" ? FadeOutLeft.delay(100) : FadeOutLeft}
    >
      {image}
      <View style={{ padding: 16, gap: 8 }}>
        {media}
        {info}
      </View>
      <View
        style={{
          borderBottomWidth: StyleSheet.hairlineWidth,
          borderColor:
            colorScheme === "light"
              ? Colors.common.gray["300"]
              : Colors.common.gray["600"],
        }}
      />
      {footer}
    </AnimatedView>
  );
};

const styles = StyleSheet.create({
  propertyListingContainerShadow: {
    elevation: 1,
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
});

export default ListingCard;
