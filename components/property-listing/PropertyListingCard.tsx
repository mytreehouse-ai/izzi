import { AnimatedView, View } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import React, { Fragment } from "react";
import { StyleProp, StyleSheet, ViewStyle, useColorScheme } from "react-native";
import { AnimatedStyle, FadeIn, FadeOut } from "react-native-reanimated";

interface PropertyListingCardProps {
  adoptWidth?: boolean;
  enableAnimation?: boolean;
  image: React.ReactNode;
  info: React.ReactNode;
  price: React.ReactNode;
  features: React.ReactNode;
  ribbon: React.ReactNode;
  like: React.ReactNode;
}

const PropertyListingCard: React.FC<PropertyListingCardProps> = ({
  adoptWidth,
  enableAnimation = true,
  image,
  info,
  price,
  features,
  ribbon,
  like,
}) => {
  const colorScheme = useColorScheme();

  const viewStyle = [
    styles.mainContainer,
    styles.mainContainerShadow,
    {
      width: adoptWidth ? "auto" : 309,
      borderColor:
        colorScheme === "light" ? Colors.light.border : Colors.dark.border,
      shadowColor:
        colorScheme === "light"
          ? Colors.common.gray["900"]
          : Colors.common.white,
    },
  ];

  const viewStyles = [
    styles.mainContainer,
    styles.mainContainerShadow,
    {
      width: adoptWidth ? "auto" : 309,
      borderColor:
        colorScheme === "light" ? Colors.light.border : Colors.dark.border,
      shadowColor:
        colorScheme === "light"
          ? Colors.common.gray["900"]
          : Colors.common.white,
    },
  ];

  function PropertyListingCardContent() {
    return (
      <Fragment>
        {image}
        <View
          style={[
            defaultStyles.removedBackground,
            {
              paddingHorizontal: 8,
              paddingVertical: 4,
            },
          ]}
        >
          <View style={[defaultStyles.removedBackground, { gap: 4 }]}>
            {info}
            <View
              style={{
                paddingTop: 10,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              {features}
              {price}
            </View>
          </View>
        </View>
        {ribbon}
        {like}
      </Fragment>
    );
  }

  return (
    <Fragment>
      {enableAnimation ? (
        <AnimatedView
          style={viewStyle as StyleProp<AnimatedStyle<StyleProp<ViewStyle>>>}
          entering={FadeIn}
          exiting={FadeOut}
          lightColor={Colors.light.background}
          darkColor={Colors.dark.background}
        >
          <PropertyListingCardContent />
        </AnimatedView>
      ) : (
        <View
          style={viewStyles as StyleProp<ViewStyle>}
          lightColor={Colors.light.background}
          darkColor={Colors.dark.background}
        >
          <PropertyListingCardContent />
        </View>
      )}
    </Fragment>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    position: "relative",
    borderRadius: 14,
    gap: 4,
    padding: 4,
    borderWidth: StyleSheet.hairlineWidth,
  },
  mainContainerShadow: {
    elevation: 1,
    shadowOpacity: 0.04,
    shadowRadius: 14,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
});

export default PropertyListingCard;
