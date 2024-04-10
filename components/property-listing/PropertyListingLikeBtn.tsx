import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Platform, StyleSheet, TouchableOpacity } from "react-native";

const PropertyListingLikeBtn = () => {
  const [liked, setLiked] = useState(false);

  return (
    <TouchableOpacity
      style={[styles.heartBtn, styles.shadow]}
      onPress={() => setLiked(!liked)}
      activeOpacity={0.8}
    >
      {liked ? (
        <Ionicons name="heart" size={24} color={Colors.common.red["600"]} />
      ) : (
        <Ionicons
          name="heart-outline"
          size={24}
          color={Colors.common.red["400"]}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  heartBtn: {
    right: 15,
    top: 15,
    width: 40,
    height: 40,
    borderRadius: 100,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.common.white,
  },
  shadow: {
    elevation: 1,
    shadowColor:
      Platform.OS === "ios"
        ? Colors.common.gray["900"]
        : Colors.common.gray["100"],
    shadowOpacity: 0.04,
    shadowRadius: 100,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
});

export default PropertyListingLikeBtn;
