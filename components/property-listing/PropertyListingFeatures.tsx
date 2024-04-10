import { MaterialCommunityIcons, Text, View } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import React from "react";

const PropertyListingFeatures = () => {
  return (
    <View
      style={[
        defaultStyles.removedBackground,
        { flexDirection: "row", gap: 10, flex: 1 },
      ]}
    >
      <MaterialCommunityIcons name="bed-outline" size={16} />
      <Text>4</Text>
      <View
        style={[
          defaultStyles.removedBackground,
          {
            borderRightWidth: 1,
            borderColor: Colors.common.gray["200"],
          },
        ]}
      />
      <MaterialCommunityIcons name="shower" size={16} />
      <Text>2</Text>
    </View>
  );
};

export default PropertyListingFeatures;
