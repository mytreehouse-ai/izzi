import {
  Ionicons,
  MaterialCommunityIcons,
  SafeAreaView,
  Text,
  View,
} from "@/components/Themed";
import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { useRouter } from "expo-router";
import React from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import PagerView from "react-native-pager-view";
import Animated from "react-native-reanimated";

const IMAGE_HEIGHT = 300;

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
          <View
            style={{
              flexDirection: "row",
              gap: 4,
            }}
          >
            <Ionicons name="filter-outline" size={16} />
            <Text>Filter</Text>
          </View>
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
        <View
          style={[
            {
              borderWidth: StyleSheet.hairlineWidth,
              borderRadius: 8,
              borderColor:
                colorScheme === "light"
                  ? Colors.common.gray["300"]
                  : Colors.common.gray["600"],
            },
            styles.propertyListingContainerShadow,
          ]}
        >
          <PagerView
            style={[defaultStyles.container, { height: IMAGE_HEIGHT }]}
            initialPage={0}
          >
            <Image
              style={{
                height: IMAGE_HEIGHT,
                borderTopLeftRadius: 8,
                borderTopRightRadius: 8,
              }}
              defaultSource={require("@/assets/images/real-state/douglas-sheppard-9rYfG8sWRVo-unsplash.jpg")}
            />
            <Image
              style={{
                height: IMAGE_HEIGHT,
                borderTopLeftRadius: 8,
                borderTopRightRadius: 8,
              }}
              defaultSource={require("@/assets/images/real-state/avi-werde-8N46xC5YmKM-unsplash.jpg")}
            />
            <Image
              style={{
                height: IMAGE_HEIGHT,
                borderTopLeftRadius: 8,
                borderTopRightRadius: 8,
              }}
              defaultSource={require("@/assets/images/real-state/bailey-anselme-Bkp3gLygyeA-unsplash.jpg")}
            />
          </PagerView>
          <View style={{ padding: 16, gap: 8 }}>
            <View
              style={{ flexDirection: "row", gap: 8, alignItems: "center" }}
            >
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
            <View style={[defaultStyles.removedBackground, { gap: 4 }]}>
              <Text numberOfLines={1} fontWeight="semibold">
                House for sale in quezon city business district
              </Text>
              <Text>Quezon City, NCR</Text>
            </View>
            <View style={[defaultStyles.removedBackground, { gap: 4 }]}>
              <Text numberOfLines={1} fontWeight="semibold" fontSize={18}>
                Php 2,500,000.00
              </Text>
              <View
                style={{ flexDirection: "row", gap: 8, alignItems: "center" }}
              >
                <Text>135 sqm</Text>
                <Text>1,135 price/sqm</Text>
              </View>
            </View>
          </View>
          <View
            style={{
              borderBottomWidth: StyleSheet.hairlineWidth,
              ...borderColor,
            }}
          />
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
            <View
              style={{ flexDirection: "row", gap: 12, alignItems: "center" }}
            >
              <Ionicons
                name="trash-outline"
                size={20}
                lightColor={Colors.light.primary}
                darkColor={Colors.dark.primary}
              />
              <Ionicons
                name="heart-outline"
                size={20}
                lightColor={Colors.light.primary}
                darkColor={Colors.dark.primary}
              />
            </View>
          </View>
        </View>
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  propertyListingContainerShadow: {
    elevation: 1,
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
});

export default PropertyListingsPage;
