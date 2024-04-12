import { Ionicons, SafeAreaView, Text, View } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, TouchableOpacity, useColorScheme } from "react-native";
import Animated from "react-native-reanimated";

const PropertyListingsPage = () => {
  const router = useRouter();
  const colorScheme = useColorScheme();

  const borderColor = {
    borderColor:
      colorScheme === "light"
        ? Colors.common.gray["300"]
        : Colors.common.gray["600"],
  };

  return (
    <View style={defaultStyles.container}>
      <SafeAreaView
        lightColor={Colors.light.primary}
        darkColor={Colors.dark.primary}
      >
        <View
          style={{ paddingHorizontal: 16, paddingBottom: 16 }}
          lightColor={Colors.light.primary}
          darkColor={Colors.dark.primary}
        >
          <View
            style={[
              defaultStyles.removedBackground,
              {
                flexDirection: "row",
                gap: 8,
                alignItems: "center",
                justifyContent: "space-between",
              },
            ]}
          >
            <View
              style={[
                defaultStyles.removedBackground,
                {
                  flexDirection: "row",
                  gap: 8,
                  alignItems: "center",
                },
              ]}
            >
              <TouchableOpacity
                onPress={() => router.back()}
                activeOpacity={0.75}
              >
                <Ionicons name="arrow-back" size={24} />
              </TouchableOpacity>
              <View style={[defaultStyles.removedBackground, { gap: 2 }]}>
                <Text fontWeight="semibold">182 House to buy</Text>
                <View
                  style={[
                    defaultStyles.removedBackground,
                    { flexDirection: "row", gap: 4, alignItems: "center" },
                  ]}
                >
                  <Text fontSize={12}>182 House to buy</Text>
                  <Ionicons name="caret-down-sharp" size={12} />
                </View>
              </View>
            </View>
            <TouchableOpacity
              style={[
                defaultStyles.btnSmall,
                {
                  backgroundColor:
                    colorScheme === "light"
                      ? Colors.common.emerald["100"]
                      : Colors.common.darkEmerald300,
                },
              ]}
              activeOpacity={0.8}
            >
              <Text fontWeight="semibold">Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
      <View
        style={[
          defaultStyles.removedBackground,
          {
            height: 40,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-evenly",
            borderBottomWidth: 1,
            ...borderColor,
          },
        ]}
      >
        <Pressable onPress={() => console.log("Filter press")}>
          <Text>Filter</Text>
        </Pressable>
        <View
          style={{
            height: 30,
            borderRightWidth: 1,
            ...borderColor,
          }}
        />
        <Pressable onPress={() => console.log("Sort press")}>
          <Text>Sort</Text>
        </Pressable>
        <View
          style={{
            height: 30,
            borderRightWidth: 1,
            ...borderColor,
          }}
        />
        <Pressable onPress={() => console.log("Map press")}>
          <View
            style={{
              flexDirection: "row",
              gap: 4,
            }}
          >
            <Ionicons name="location-sharp" size={16} />
            <Text>Map</Text>
          </View>
        </Pressable>
      </View>
      <Animated.ScrollView
        style={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
      >
        <Text>a</Text>
      </Animated.ScrollView>
    </View>
  );
};

export default PropertyListingsPage;
