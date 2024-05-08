import { AnimatedView, Ionicons, Text, View } from "@/components/Themed";
import Divider from "@/components/custom/Divider";
import ListingAddress from "@/components/idealista/listing/ListingAddress";
import ListingAgent from "@/components/idealista/listing/ListingAgent";
import ListingDescription from "@/components/idealista/listing/ListingDescription";
import ListingFeatures from "@/components/idealista/listing/ListingFeatures";
import ListingImagePager from "@/components/idealista/listing/ListingImagePager";
import ListingInfo from "@/components/idealista/listing/ListingInfo";
import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { usePropertyListingQuery } from "@/hooks/usePropertyListingQuery";
import { useAuth } from "@clerk/clerk-expo";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { MotiView } from "moti";
import { Skeleton } from "moti/skeleton";
import React, { Fragment, useLayoutEffect } from "react";
import {
	Dimensions,
	Platform,
	PlatformIOSStatic,
	Share,
	StyleSheet,
	TouchableOpacity,
	useColorScheme,
} from "react-native";
import Animated, {
	Easing,
	FadeInRight,
	FadeOutLeft,
	SlideInDown,
	interpolate,
	useAnimatedScrollHandler,
	useAnimatedStyle,
	useSharedValue,
} from "react-native-reanimated";

const IMAGE_HEIGHT = 300;
const { width } = Dimensions.get("window");
const platformIOS = Platform as PlatformIOSStatic;

const PropertyListing = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const scrollOffset = useSharedValue(0);
  const { getToken } = useAuth();

  const { isLoading, data: propertyListing } = usePropertyListingQuery(
    getToken,
    Number(id)
  );

  console.log(JSON.stringify(propertyListing, null, 2));

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

  function SkeletonLoader() {
    return (
      <AnimatedView
        style={{ gap: 10, paddingVertical: 8 }}
        entering={FadeInRight}
        exiting={FadeOutLeft}
      >
        <MotiView
          style={{ gap: 10 }}
          animate={{ backgroundColor: "transparent" }}
        >
          <Skeleton
            colorMode={colorScheme as "light" | "dark"}
            width="100%"
            height={30}
          >
            {true ? null : <View />}
          </Skeleton>
          <Skeleton
            colorMode={colorScheme as "light" | "dark"}
            width="100%"
            height={30}
          >
            {true ? null : <View />}
          </Skeleton>
          <Skeleton
            colorMode={colorScheme as "light" | "dark"}
            width="100%"
            height={30}
          >
            {true ? null : <View />}
          </Skeleton>
          <Skeleton
            colorMode={colorScheme as "light" | "dark"}
            width="100%"
            height={30}
          >
            {true ? null : <View />}
          </Skeleton>
        </MotiView>
      </AnimatedView>
    );
  }

  return (
    <View style={defaultStyles.container}>
      <Animated.ScrollView
        onScroll={scrollHandler}
        contentContainerStyle={{ paddingBottom: 80 }}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
      >
        <ListingImagePager
          uri={[
            { id: 1, url: propertyListing?.data.main_image_url ?? "" },
            ...(propertyListing?.data.property_images ?? []),
          ]}
          height={IMAGE_HEIGHT}
          showPageIndicator={true}
          pageIndicatorType={"number"}
        />

        <View style={[defaultStyles.container, { padding: 8, gap: 12 }]}>
          {isLoading && !propertyListing ? (
            <SkeletonLoader />
          ) : (
            <Fragment>
              {propertyListing?.data && (
                <Fragment>
									<View style={{marginHorizontal:10}}>
										
										<ListingInfo
											data={{
												listing_title: propertyListing.data.listing_title,
												price_formatted: propertyListing.data.price_formatted,
												floor_area: propertyListing.data.floor_area || 0,
												lot_area: propertyListing.data.lot_area || 0,
												building_area: propertyListing.data.building_size || 0,
												city: propertyListing.data.city,
												area: propertyListing.data.area,
											}}
											singleView={true}
										/>

										<Divider/>

										<ListingAgent />
										
										<Divider/>
										
										<ListingDescription
											description={propertyListing.data.description}
											showDescriptionTitle={true}
										/>
										
										<Divider/>

										<ListingFeatures 
											label="Amenities & Features"
											features={propertyListing.data.features}
										/>
											
										<Divider/>

										<ListingAddress 
											location={`${propertyListing.data.city}, ${propertyListing.data.address}`}
										/>

										<Divider/>

									</View>
								</Fragment>
              )}
            </Fragment>
          )}
        </View>
      </Animated.ScrollView>

      {!isLoading && propertyListing && (
        <AnimatedView
          style={[
            defaultStyles.footer,
            {
              borderColor:
                colorScheme === "light"
                  ? Colors.common.gray["300"]
                  : Colors.common.gray["700"],
            },
          ]}
          entering={SlideInDown.duration(1000).easing(Easing.out(Easing.cubic))}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              paddingHorizontal: Platform.OS === "ios" ? 32 : 16,
              width: Dimensions.get("window").width,
              gap: 16,
            }}
          >
            <TouchableOpacity
              style={[
                defaultStyles.btn,
                {
                  backgroundColor:
                    colorScheme === "light"
                      ? Colors.common.emerald["300"]
                      : Colors.common.darkEmerald300,
                  alignItems: "center",
                  flexDirection: "row",
                  width: "50%",
                  gap: 4,
                },
              ]}
              activeOpacity={0.8}
            >
              <Ionicons name="call" size={20} />
              <Text fontWeight="semibold" fontSize={16}>
                Call
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                defaultStyles.btn,
                {
                  backgroundColor:
                    colorScheme === "light"
                      ? Colors.common.emerald["300"]
                      : Colors.common.darkEmerald300,
                  alignItems: "center",
                  flexDirection: "row",
                  width: "50%",
                  gap: 4,
                },
              ]}
              activeOpacity={0.8}
            >
              <Ionicons name="chatbox-ellipses" size={20} />
              <Text fontWeight="semibold" fontSize={16}>
                Chat
              </Text>
            </TouchableOpacity>
          </View>
        </AnimatedView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  animatedHeaderContainer: {
    height: 100,
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
  image: {
    height: platformIOS.isPad ? IMAGE_HEIGHT * 2 : IMAGE_HEIGHT,
    width,
  },
});

export default PropertyListing;
