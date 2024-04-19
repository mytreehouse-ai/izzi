import { Ionicons, Text, View } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import React from "react";
import { TouchableOpacity } from "react-native";

const ListingFooter = () => {
  return (
    <View
      style={[
        defaultStyles.removedBackground,
        {
          padding: 16,
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-between",
        },
      ]}
    >
      <View
        style={{
          gap: 12,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          style={{ flexDirection: "row", gap: 4, alignItems: "center" }}
          activeOpacity={0.75}
        >
          <Ionicons
            name="call"
            size={20}
            lightColor={Colors.light.primary}
            darkColor={Colors.dark.primary}
          />
          <Text
            fontWeight="semibold"
            lightColor={Colors.light.primary}
            darkColor={Colors.dark.primary}
          >
            Call
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ flexDirection: "row", gap: 4, alignItems: "center" }}
          activeOpacity={0.75}
        >
          <Ionicons
            name="chatbox-ellipses"
            size={20}
            lightColor={Colors.light.primary}
            darkColor={Colors.dark.primary}
          />
          <Text
            fontWeight="semibold"
            lightColor={Colors.light.primary}
            darkColor={Colors.dark.primary}
          >
            Chat
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity activeOpacity={0.5}>
        <Ionicons
          name="heart-outline"
          size={24}
          lightColor={Colors.common.red["600"]}
          darkColor={Colors.common.darkRed}
        />
      </TouchableOpacity>
    </View>
  );
};

export default ListingFooter;
