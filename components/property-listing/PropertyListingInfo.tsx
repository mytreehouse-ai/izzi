import { Ionicons, Text, View } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import React, { Fragment } from "react";
import { useColorScheme } from "react-native";

interface PropertyListingInfoProps {
  title: string;
  numberOfLines?: number;
  address: string;
  titleSize?: number;
  addressSize?: number;
  iconSize?: number;
  rating?: React.ReactNode;
}

const PropertyListingInfo = ({
  title,
  numberOfLines = 1,
  address,
  titleSize = 14,
  addressSize = 14,
  iconSize = 18,
  rating,
}: PropertyListingInfoProps) => {
  const colorScheme = useColorScheme();
  return (
    <Fragment>
      <View
        style={[
          defaultStyles.removedBackground,
          {
            flexDirection: "row",
            alignItems: "center",
            alignContent: rating ? "space-between" : "flex-start",
          },
        ]}
      >
        <Text
          numberOfLines={numberOfLines}
          fontWeight="semibold"
          fontSize={titleSize}
          style={{ flex: 1 }}
        >
          {title}
        </Text>
        {rating ?? null}
      </View>
      <View
        style={[
          defaultStyles.removedBackground,
          { flexDirection: "row", alignItems: "center", gap: 2 },
        ]}
      >
        <Ionicons
          name="location-sharp"
          size={iconSize}
          lightColor={Colors.light.primary}
          darkColor={Colors.dark.primary}
        />
        <Text numberOfLines={1} fontSize={addressSize}>
          {address}
        </Text>
      </View>
    </Fragment>
  );
};

export default PropertyListingInfo;
