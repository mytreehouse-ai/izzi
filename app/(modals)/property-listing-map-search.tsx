import { View } from "@/components/Themed";
import RnMapViews from "@/components/idealista/map/RnMapViews";
import { defaultStyles } from "@/constants/Styles";
import React from "react";

const PropertyListingMapSearch = () => {
  return (
    <View style={defaultStyles.container}>
      <RnMapViews />
    </View>
  );
};

export default PropertyListingMapSearch;
