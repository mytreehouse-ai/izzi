import { Ionicons, MaterialCommunityIcons, View } from "@/components/Themed";
import Colors from "@/constants/Colors";
import React from "react";
import { StyleSheet, useColorScheme } from "react-native";

interface ListingMediaProps {
  singleView?: boolean;
}

const ListingMedia: React.FC<ListingMediaProps> = ({ singleView }) => {
  const colorScheme = useColorScheme();

  return (
    <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
      <View
        style={{
          padding: singleView ? 6 : 8,
          borderRadius: singleView ? 6 : 8,
          borderWidth: StyleSheet.hairlineWidth,
          borderColor:
            colorScheme === "light"
              ? Colors.common.gray["400"]
              : Colors.common.gray["600"],
        }}
      >
        <Ionicons name="image-outline" size={singleView ? 26 : 20} />
      </View>
      <View
        style={{
          padding: singleView ? 6 : 8,
          borderRadius: singleView ? 6 : 8,
          borderWidth: StyleSheet.hairlineWidth,
          borderColor:
            colorScheme === "light"
              ? Colors.common.gray["400"]
              : Colors.common.gray["600"],
        }}
      >
        <MaterialCommunityIcons name="floor-plan" size={singleView ? 26 : 20} />
      </View>
      <View
        style={{
          padding: singleView ? 6 : 8,
          borderRadius: singleView ? 6 : 8,
          borderWidth: StyleSheet.hairlineWidth,
          borderColor:
            colorScheme === "light"
              ? Colors.common.gray["400"]
              : Colors.common.gray["600"],
        }}
      >
        <Ionicons name="videocam-outline" size={singleView ? 26 : 20} />
      </View>
    </View>
  );
};

export default ListingMedia;
