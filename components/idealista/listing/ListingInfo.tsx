import {
  Ionicons,
  MaterialCommunityIcons,
  Text,
  View,
} from "@/components/Themed";
import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import React, { Fragment } from "react";
import { useColorScheme } from "react-native";

interface ListingInfoProps {
  data: {
    listing_title: string;
    price_formatted: string;
    city: string;
    area: string;
    sqm: string;
    price_sqm: string;
  };
  singleView?: boolean;
}

const ListingInfo: React.FC<ListingInfoProps> = ({ data, singleView }) => {
  const colorScheme = useColorScheme();
  const { listing_title, price_formatted, city, area, sqm, price_sqm } = data;

  return (
    <Fragment>
      <View style={[defaultStyles.removedBackground, { gap: 4 }]}>
        <Text
          numberOfLines={2}
          fontWeight="semibold"
          fontSize={singleView ? 18 : 14}
        >
          {listing_title}
        </Text>
        <View style={{ flexDirection: "row", gap: 2, alignItems: "center" }}>
          <Ionicons
            name="location-outline"
            size={18}
            lightColor={Colors.light.primary}
            darkColor={Colors.dark.primary}
          />
          <Text>{`${city}${area && ","} ${area ? area : ""}`}</Text>
        </View>
      </View>
      <View style={[defaultStyles.removedBackground, { gap: 4 }]}>
        <Text
          numberOfLines={1}
          fontWeight="semibold"
          fontSize={singleView ? 24 : 18}
        >
          {price_formatted}
        </Text>
        <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
          <View style={{ flexDirection: "row", gap: 4, alignItems: "center" }}>
            <MaterialCommunityIcons
              name="image-size-select-small"
              size={18}
              lightColor={Colors.light.primary}
              darkColor={Colors.dark.primary}
            />
            <Text>{sqm}</Text>
          </View>
          <View
            style={{
              height: 10,
              borderRightWidth: 1,
              borderRightColor:
                colorScheme === "light"
                  ? Colors.common.gray[500]
                  : Colors.common.gray[700],
            }}
          />
          <Text>{price_sqm}</Text>
        </View>
      </View>
    </Fragment>
  );
};

export default ListingInfo;
