import {
  AnimatedView,
  Ionicons,
  SafeAreaView,
  Text,
  View,
} from "@/components/Themed";
import RnMapView from "@/components/idealista/map/RnMapView";
import PropertyListingInfo from "@/components/property-listing/PropertyListingInfo";
import PropertyListingPrice from "@/components/property-listing/PropertyListingPrice";
import PropertyListingRating from "@/components/property-listing/PropertyListingRating";
import PropertyListingRibbon from "@/components/property-listing/PropertyListingRibbon";
import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { usePropertyListingQuery } from "@/hooks/usePropertyListingQuery";
import { useAuth } from "@clerk/clerk-expo";
import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  Dimensions,
  Image,
  Platform,
  Share,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import PagerView from "react-native-pager-view";
import Animated, {
  Easing,
  SlideInDown,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

const IMAGE_HEIGHT = 300;
const { width } = Dimensions.get("window");

const PropertyListing = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [showMore, setShowMore] = useState<boolean>(false);
  const [enablePagerView, setEnablePagerView] = useState<boolean>(true);
  const [propertyImages, setPropertyImages] = useState<
    { id: number; url: string }[] | null
  >(null);
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const scrollOffset = useSharedValue(0);
  const { getToken } = useAuth();

  const { isLoading, data: propertyListing } = usePropertyListingQuery(
    getToken,
    Number(id)
  );

  useEffect(() => {
    if (!isLoading && propertyListing?.data) {
      console.log(
        "property images length: " +
          propertyListing?.data?.property_images?.length
      );
      console.log(propertyListing?.data.listing_url);
      console.log(id);
      setPropertyImages(
        propertyListing?.data ? propertyListing.data.property_images : null
      );
    }
  }, [isLoading, propertyListing]);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollOffset.value = event.contentOffset.y;
    },
  });

  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-IMAGE_HEIGHT, 0, IMAGE_HEIGHT],
            [-IMAGE_HEIGHT / 2, 0, IMAGE_HEIGHT * 0.75]
          ),
        },
        {
          scale: interpolate(
            scrollOffset.value,
            [-IMAGE_HEIGHT, 0, IMAGE_HEIGHT],
            [2, 1, 1]
          ),
        },
      ],
    };
  });

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollOffset.value, [0, IMAGE_HEIGHT / 1.5], [0, 1]),
    };
  });

  const sharePropertyListing = async (url: string) => {
    try {
      await Share.share({
        message: `Check out this listing on: ${url}`,
      });
    } catch (error) {
      console.error(error);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackground: () => (
        <AnimatedView
          style={[headerAnimatedStyle, styles.animatedHeaderContainer]}
        />
      ),
      headerRight: () => (
        <View style={styles.headerBtnContainer}>
          <TouchableOpacity
            style={[styles.headerRoundBtn]}
            onPress={async () => await sharePropertyListing("")}
          >
            <Ionicons
              name="share-outline"
              size={22}
              color={Colors.common.gray["900"]}
            />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.headerRoundBtn]}>
            <Ionicons
              name="heart-outline"
              size={22}
              color={Colors.common.gray["900"]}
            />
          </TouchableOpacity>
        </View>
      ),
      headerLeft: () => (
        <TouchableOpacity
          style={[styles.headerRoundBtn]}
          onPress={navigation.goBack}
        >
          <Ionicons
            name="arrow-back"
            size={22}
            color={Colors.common.gray["900"]}
          />
        </TouchableOpacity>
      ),
    });
  }, []);

  return (
    <View style={[defaultStyles.container, { width }]}>
      <Animated.ScrollView
        onScroll={scrollHandler}
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
      >
        {enablePagerView && propertyImages && propertyImages.length > 0 ? (
          <PagerView
            style={[defaultStyles.container, { height: IMAGE_HEIGHT }]}
            initialPage={0}
            onPageSelected={() => {}}
            onPageScroll={() => {}}
          >
            <TouchableOpacity
              style={{ height: IMAGE_HEIGHT }}
              activeOpacity={0.9}
            >
              <Animated.Image
                defaultSource={require("@/assets/images/dark-placeholder.webp")}
                source={{
                  uri:
                    !isLoading && propertyListing?.data.main_image_url
                      ? propertyListing.data.main_image_url
                      : undefined,
                }}
                style={[styles.propertyListingImage, imageAnimatedStyle]}
              />
            </TouchableOpacity>
            {propertyImages?.map((img) => (
              <TouchableOpacity
                key={img.id}
                style={{ height: IMAGE_HEIGHT }}
                activeOpacity={0.9}
              >
                <Animated.Image
                  defaultSource={require("@/assets/images/dark-placeholder.webp")}
                  source={{ uri: img.url }}
                  style={[styles.propertyListingImage, imageAnimatedStyle]}
                />
              </TouchableOpacity>
            ))}
          </PagerView>
        ) : (
          <TouchableOpacity
            style={{ height: IMAGE_HEIGHT }}
            activeOpacity={0.9}
          >
            <Animated.Image
              defaultSource={require("@/assets/images/dark-placeholder.webp")}
              source={{
                uri:
                  !isLoading && propertyListing?.data.main_image_url
                    ? propertyListing.data.main_image_url
                    : undefined,
              }}
              style={[styles.propertyListingImage, imageAnimatedStyle]}
            />
          </TouchableOpacity>
        )}
        <SafeAreaView style={styles.safeAreaViewContainer}>
          <View
            style={[
              defaultStyles.removedBackground,
              {
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingHorizontal: 16,
                paddingTop: 16,
              },
            ]}
          >
            <PropertyListingRibbon
              absolute={false}
              fontSize={16}
              btnContainerColorLight={Colors.common.emerald["100"]}
              btnContainerColorDark={Colors.common.gray["800"]}
              propertyType={propertyListing?.data.property_type ?? ""}
              listingType={propertyListing?.data.listing_type ?? ""}
            />
            <PropertyListingRating rating={4.5} iconSize={18} fontSize={16} />
          </View>
          <View style={{ gap: 8, paddingHorizontal: 16 }}>
            <PropertyListingInfo
              titleSize={18}
              title={propertyListing?.data.listing_title ?? ""}
              numberOfLines={3}
              addressSize={16}
              address={`${propertyListing?.data.city} ${
                propertyListing?.data.area ?? ""
              }`}
              iconSize={20}
            />
          </View>
          {!isLoading &&
            propertyListing?.data.features &&
            propertyListing.data.features.length > 0 && (
              <View style={{ gap: 8 }}>
                <Text
                  fontWeight="semibold"
                  fontSize={16}
                  style={{ paddingHorizontal: 16 }}
                >
                  Features
                </Text>
                <Animated.ScrollView
                  horizontal
                  scrollEventThrottle={16}
                  contentContainerStyle={{ gap: 8, paddingHorizontal: 16 }}
                  showsHorizontalScrollIndicator={false}
                >
                  {propertyListing.data.features.map((feature, index) => (
                    <View
                      key={`${feature}-${index}`}
                      style={{
                        borderWidth: StyleSheet.hairlineWidth,
                        borderColor:
                          colorScheme === "light"
                            ? Colors.common.gray["400"]
                            : Colors.common.gray["600"],
                        borderRadius: 8,
                        padding: 16,
                      }}
                    >
                      <Text>{feature}</Text>
                    </View>
                  ))}
                </Animated.ScrollView>
              </View>
            )}
          <View style={{ gap: 8, paddingHorizontal: 16 }}>
            <Text fontWeight="semibold" fontSize={16}>
              Description
            </Text>
            <Text
              numberOfLines={showMore ? undefined : 4}
              style={{ textAlign: "justify" }}
            >
              {propertyListing?.data?.description}
            </Text>
            {!isLoading &&
              propertyListing?.data?.description &&
              propertyListing.data.description.length > 200 && (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => setShowMore(!showMore)}
                >
                  <Text
                    fontWeight="semibold"
                    style={{ textAlign: "right" }}
                    lightColor={Colors.light.primary}
                    darkColor={Colors.light.primary}
                  >
                    {showMore ? "Show less" : "Show more"}
                  </Text>
                </TouchableOpacity>
              )}
          </View>
          <View
            style={{
              gap: 8,
              paddingHorizontal: 16,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
            >
              <Image
                source={require("@/assets/images/kunar_pichay.jpg")}
                style={{ width: 45, height: 45, borderRadius: 100 }}
              />
              <View>
                <Text fontWeight="semibold" fontSize={16}>
                  Kunar Pichay
                </Text>
                <Text>Property Agent</Text>
              </View>
            </View>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
            >
              <TouchableOpacity
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  borderWidth: StyleSheet.hairlineWidth,
                  borderRadius: 100,
                  padding: 10,
                }}
                activeOpacity={0.8}
              >
                <Ionicons
                  name="chatbox-ellipses"
                  size={20}
                  color={Colors.common.gray["500"]}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  borderWidth: StyleSheet.hairlineWidth,
                  borderRadius: 100,
                  padding: 10,
                }}
                activeOpacity={0.8}
              >
                <Ionicons
                  name="call"
                  size={20}
                  color={Colors.common.gray["500"]}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ gap: 8, paddingHorizontal: 16 }}>
            <Text fontWeight="semibold" fontSize={16}>
              Location
            </Text>
            <RnMapView formattedPrice={propertyListing?.data.price_formatted} />
          </View>
        </SafeAreaView>
      </Animated.ScrollView>
      {!isLoading && propertyListing && (
        <AnimatedView
          style={defaultStyles.footer}
          entering={SlideInDown.duration(1000).easing(Easing.out(Easing.cubic))}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingHorizontal: 16,
              width,
            }}
          >
            <PropertyListingPrice
              price={propertyListing.data.price_formatted}
              fontSize={20}
            />
            <TouchableOpacity
              style={[
                defaultStyles.btn,
                {
                  backgroundColor:
                    colorScheme === "light"
                      ? Colors.light.primary
                      : Colors.dark.primary,
                },
              ]}
              activeOpacity={0.8}
            >
              <Text fontWeight="semibold" fontSize={16}>
                Inquire now
              </Text>
            </TouchableOpacity>
          </View>
        </AnimatedView>
      )}
    </View>
  );
};

// <View
//   style={[
//     defaultStyles.removedBackground,
//     {
//       flexDirection: "row",
//       justifyContent: "center",
//       position: "absolute",
//       top: 250,
//       left: 0,
//       right: 0,
//     },
//   ]}
// >
//   {[1, 2, 3].map((i) => (
//     <View
//       key={i}
//       style={{
//         width: 12,
//         height: 12,
//         borderRadius: 100,
//         backgroundColor: Colors.common.gray["200"],
//         marginHorizontal: 4,
//         alignItems: "center",
//         justifyContent: "center",
//       }}
//     >
//       {i === page + 1 && (
//         <Animated.View
//           style={{
//             width: 6,
//             height: 6,
//             borderRadius: 100,
//             backgroundColor: Colors.common.primary,
//           }}
//           entering={FadeIn.duration(500)}
//           exiting={FadeOut.duration(500)}
//         />
//       )}
//     </View>
//   ))}
// </View>;

const styles = StyleSheet.create({
  safeAreaViewContainer: {
    gap: 18,
    width,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  animatedHeaderContainer: {
    height: 100,
  },
  propertyListingImage: {
    height: IMAGE_HEIGHT,
    width,
  },
  headerBtnContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    gap: 10,
  },
  headerRoundBtn: {
    width: 40,
    height: 40,
    borderRadius: 80,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.common.white,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.common.gray["500"],
  },
});

export default PropertyListing;
