import { Ionicons, Text, View } from "@/components/Themed";
import Colors from "@/constants/Colors";
import React from "react";
import { Image } from "react-native";

const ListingAgent = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 8,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
        }}
      >
        <Image
          style={{ width: 50, height: 50, borderRadius: 100 }}
          defaultSource={require("@/assets/images/adaptive-icon.png")}
        />
        <View style={{ gap: 2 }}>
          <Text fontWeight="semibold">Washalu Baru</Text>
          <Text>Property agent</Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "column",
          alignItems: "flex-end",
          gap: 4,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 4,
          }}
        >
          <Text>Verified</Text>
          <Ionicons
            name="checkmark-outline"
            size={16}
            lightColor={Colors.light.primary}
            darkColor={Colors.dark.primary}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 4,
          }}
        >
          <Text>4.5</Text>
          <Ionicons
            name="star"
            size={16}
            lightColor={Colors.light.primary}
            darkColor={Colors.dark.primary}
          />
        </View>
      </View>
    </View>
  );
};

export default ListingAgent;
