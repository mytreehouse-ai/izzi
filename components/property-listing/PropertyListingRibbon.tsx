import {
  Ionicons,
  MaterialCommunityIcons,
  Text,
  View,
} from "@/components/Themed";
import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import React from "react";
import { Platform, StyleSheet } from "react-native";

interface PropertyListingRibbonProps {
  absolute?: boolean;
  iconColor?: string;
  textColor?: string;
  fontSize?: number;
  btnContainerColorLight?: string;
  btnContainerColorDark?: string;
  propertyType: string;
  listingType: string;
}

const PropertyListingRibbon: React.FC<PropertyListingRibbonProps> = ({
  absolute = true,
  iconColor = Colors.common.secondary,
  textColor = Colors.common.secondary,
  fontSize = 14,
  btnContainerColorLight = Colors.common.white,
  btnContainerColorDark = Colors.common.white,
  propertyType,
  listingType,
}) => {
  return (
    <View
      style={[
        defaultStyles.removedBackground,
        absolute
          ? { ...styles.ribbonContainer, ...styles.ribbonContainerRow }
          : styles.ribbonContainerRow,
      ]}
    >
      <View
        style={[
          styles.propertyListingRibbon,
          Platform.OS === "ios" ? styles.shadow : {},
        ]}
        lightColor={btnContainerColorLight}
        darkColor={btnContainerColorDark}
      >
        <Ionicons name="home" size={16} color={iconColor} />
        <Text
          fontWeight="semibold"
          fontSize={fontSize}
          style={{ color: textColor }}
        >
          {propertyType}
        </Text>
      </View>
      <View
        style={[
          styles.propertyListingRibbon,
          Platform.OS === "ios" ? styles.shadow : {},
        ]}
        lightColor={btnContainerColorLight}
        darkColor={btnContainerColorDark}
      >
        <MaterialCommunityIcons name="sale" size={16} color={iconColor} />
        <Text
          fontWeight="semibold"
          fontSize={fontSize}
          style={{
            color: textColor,
          }}
        >
          {listingType}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ribbonContainer: {
    position: "absolute",
    left: 15,
    top: 15,
  },
  ribbonContainerRow: {
    flexDirection: "row",
    gap: 12,
  },
  propertyListingRibbon: {
    flexDirection: "row",
    gap: 4,
    padding: 8,
    borderRadius: 12,
  },
  shadow: {
    elevation: 1,
    shadowColor: Colors.common.gray["900"],
    shadowOpacity: 0.04,
    shadowRadius: 12,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
});

export default PropertyListingRibbon;
