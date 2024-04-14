import { Ionicons, MaterialCommunityIcons, View } from "@/components/Themed";
import Colors from "@/constants/Colors";
import React from "react";
import { StyleSheet, useColorScheme } from "react-native";

const ListingMedia = () => {
  const colorScheme = useColorScheme();

  return (
    <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
      <View
        style={{
          padding: 6,
          borderRadius: 6,
          borderWidth: StyleSheet.hairlineWidth,
          borderColor:
            colorScheme === "light"
              ? Colors.common.gray["400"]
              : Colors.common.gray["600"],
        }}
      >
        <Ionicons name="image-outline" size={20} />
      </View>
      <View
        style={{
          padding: 6,
          borderRadius: 6,
          borderWidth: StyleSheet.hairlineWidth,
          borderColor:
            colorScheme === "light"
              ? Colors.common.gray["400"]
              : Colors.common.gray["600"],
        }}
      >
        <MaterialCommunityIcons name="floor-plan" size={20} />
      </View>
      <View
        style={{
          padding: 6,
          borderRadius: 6,
          borderWidth: StyleSheet.hairlineWidth,
          borderColor:
            colorScheme === "light"
              ? Colors.common.gray["400"]
              : Colors.common.gray["600"],
        }}
      >
        <Ionicons name="videocam-outline" size={20} />
      </View>
    </View>
  );
};

export default ListingMedia;
