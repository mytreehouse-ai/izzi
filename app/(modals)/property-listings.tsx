import {
  AnimatedView,
  Ionicons,
  MaterialCommunityIcons,
  SafeAreaView,
  Text,
  View,
} from "@/components/Themed";
import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { usePropertyListingsQuery } from "@/hooks/usePropertyListingsQuery";
import { PropertyListing } from "@/interfaces/propertyListing";
import { globalStateStore } from "@/store";
import { useAuth } from "@clerk/clerk-expo";
import { FlashList } from "@shopify/flash-list";
import { useRouter } from "expo-router";
import React, { useRef } from "react";
import {
  Dimensions,
  Image,
  Platform,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import PagerView from "react-native-pager-view";
import { FadeInRight, FadeOutLeft } from "react-native-reanimated";

const IMAGE_HEIGHT = 300;

const PropertyListingsPage = () => {
  const router = useRouter();
  const { getToken } = useAuth();
  const colorScheme = useColorScheme();
  const store = globalStateStore();
  const flashListRef = useRef<FlashList<any>>(null);

  const { isLoading, data, fetchNextPage, isFetchingNextPage } =
    usePropertyListingsQuery(getToken, store.propertyListingFilters);

  const borderColor = {
    borderColor:
      colorScheme === "light"
        ? Colors.common.gray["300"]
        : Colors.common.gray["600"],
  };

  function FlastListRowItem({ item }: { item: PropertyListing }) {
    return (
      <TouchableOpacity activeOpacity={0.8}>
        <AnimatedView
          style={[
            {
              borderWidth: StyleSheet.hairlineWidth,
              borderRadius: 8,
              marginBottom: 16,
              borderColor:
                colorScheme === "light"
                  ? Colors.common.gray["300"]
                  : Colors.common.gray["600"],
            },
            styles.propertyListingContainerShadow,
          ]}
          entering={
            Platform.OS === "android"
              ? isLoading
                ? FadeInRight.delay(100)
                : undefined
              : FadeInRight
          }
          exiting={
            Platform.OS === "android"
              ? isLoading
                ? FadeOutLeft.delay(100)
                : undefined
              : FadeOutLeft
          }
        >
          {item.property_images && item.property_images.length > 0 ? (
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
                defaultSource={require("@/assets/images/dark-placeholder.webp")}
                source={{ uri: item.main_image_url }}
              />
              {item.property_images.map((image) => (
                <Image
                  key={image.id}
                  style={{
                    height: IMAGE_HEIGHT,
                    borderRadius: 8,
                  }}
                  defaultSource={require("@/assets/images/dark-placeholder.webp")}
                  source={{ uri: image.url }}
                />
              ))}
            </PagerView>
          ) : (
            <Image
              style={{
                height: IMAGE_HEIGHT,
                borderTopLeftRadius: 8,
                borderTopRightRadius: 8,
              }}
              defaultSource={require("@/assets/images/dark-placeholder.webp")}
              source={{ uri: item.main_image_url }}
            />
          )}
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
              <Text numberOfLines={2} fontWeight="semibold">
                {item.listing_title}
              </Text>
              <Text>{`${item.city}${item.area && ","} ${
                item.area ? item.area : ""
              }`}</Text>
            </View>
            <View style={[defaultStyles.removedBackground, { gap: 4 }]}>
              <Text numberOfLines={1} fontWeight="semibold" fontSize={18}>
                {item.price_formatted}
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
        </AnimatedView>
      </TouchableOpacity>
    );
  }

  return (
    <View style={defaultStyles.container}>
      <SafeAreaView
        style={defaultStyles.safeAreaViewContainer}
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
                <Text numberOfLines={1} fontWeight="semibold" fontSize={16}>
                  {`182 ${(
                    store.propertyListingFilters.property_type ?? "Properties"
                  ).replace(/\b\w/g, (l) => l.toUpperCase())} to ${
                    store.propertyListingFilters.listing_type === "for-sale"
                      ? "Buy"
                      : "Rent"
                  }`}
                </Text>
                <View
                  style={[
                    defaultStyles.removedBackground,
                    { flexDirection: "row", gap: 4, alignItems: "center" },
                  ]}
                >
                  <Text fontSize={12}>Your drawn search</Text>
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
        <Pressable
          onPress={() => router.push("/(modals)/property-listing-map-search")}
        >
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
      <FlashList
        ref={flashListRef}
        data={data?.pages.map((page) => page.data).flat()}
        contentContainerStyle={styles.listingContainer}
        keyExtractor={(item) => String(item.id)}
        estimatedItemSize={200}
        renderItem={FlastListRowItem}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.5}
        onEndReached={fetchNextPage}
      />
      {isFetchingNextPage && (
        <View
          style={[
            defaultStyles.removedBackground,
            {
              height: 75,
              position: "absolute",
              alignItems: "center",
              justifyContent: "center",
              bottom: 0,
              left: 0,
              right: 0,
            },
          ]}
        >
          <Text fontWeight="semibold">Loading more property...</Text>
        </View>
      )}
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
  flashListContainer: {
    height: Dimensions.get("screen").height,
    width: Dimensions.get("screen").width,
  },
  listingContainer: {
    paddingTop: 8,
    paddingHorizontal: 8,
  },
});

export default PropertyListingsPage;
