import { Text, View } from "@/components/Themed";
import { defaultStyles } from "@/constants/Styles";
import React, { Fragment } from "react";

interface ListingInfoProps {
  listing_title: string;
  price_formatted: string;
  city: string;
  area: string;
  sqm: string;
  price_sqm: string;
}

const ListingInfo: React.FC<ListingInfoProps> = ({
  listing_title,
  price_formatted,
  city,
  area,
  sqm,
  price_sqm,
}) => {
  return (
    <Fragment>
      <View style={[defaultStyles.removedBackground, { gap: 4 }]}>
        <Text numberOfLines={2} fontWeight="semibold">
          {listing_title}
        </Text>
        <Text>{`${city}${area && ","} ${area ? area : ""}`}</Text>
      </View>
      <View style={[defaultStyles.removedBackground, { gap: 4 }]}>
        <Text numberOfLines={1} fontWeight="semibold" fontSize={18}>
          {price_formatted}
        </Text>
        <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
          <Text>{sqm}</Text>
          <Text>{price_sqm}</Text>
        </View>
      </View>
    </Fragment>
  );
};

export default ListingInfo;
