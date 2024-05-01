import {
  Ionicons,
  MaterialCommunityIcons,
  Text,
  View,
} from "@/components/Themed";
import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import React from "react";
import { useColorScheme } from "react-native";

interface ListingInfoProps {
  data: {
    listing_title: string;
    price_formatted: string;
    floor_area?: number;
    lot_area?: number;
    building_area?: number;
    city: string;
    area: string;
  };
  singleView?: boolean;
}

const ListingInfo: React.FC<ListingInfoProps> = ({ data, singleView }) => {
  const colorScheme = useColorScheme();
  const {
    listing_title,
    price_formatted,
    floor_area,
    lot_area,
    building_area,
    city,
    area,
  } = data;

  return (
    <View style={{ gap: 16 }}>
      <View style={[defaultStyles.removedBackground, { gap: 8 }]}>
        <Text
          numberOfLines={2}
          fontWeight="semibold"
          fontSize={singleView ? 18 : 16}
        >
          {listing_title}
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Ionicons
            name="location-outline"
            size={24}
            lightColor={Colors.light.primary}
            darkColor={Colors.dark.primary}
          />
          <Text fontSize={16}>{`${city}${area && ","} ${
            area ? area : ""
          }`}</Text>
        </View>
      </View>
      <View
        style={[
          defaultStyles.removedBackground,
          {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          },
        ]}
      >
        <Text
          numberOfLines={1}
          fontWeight="semibold"
          fontSize={singleView ? 24 : 16}
        >
          {price_formatted}
        </Text>
        <View style={{ flexDirection: "row", gap: 6, alignItems: "center" }}>
          <MaterialCommunityIcons
            name="image-size-select-small"
            size={24}
            lightColor={Colors.light.primary}
            darkColor={Colors.dark.primary}
          />
          {floor_area ? (
            <View>
              <Text fontSize={14}>{floor_area} m²</Text>
              <Text fontSize={12}>Lot area</Text>
            </View>
          ) : null}
          {lot_area ? (
            <View>
              <Text fontSize={14}>{lot_area} m²</Text>
              <Text fontSize={12}>Lot area</Text>
            </View>
          ) : null}
          {building_area ? (
            <View>
              <Text fontSize={14}>{building_area} m²</Text>
              <Text fontSize={12}>Building area</Text>
            </View>
          ) : null}
        </View>
      </View>
    </View>
  );
};

export default ListingInfo;
