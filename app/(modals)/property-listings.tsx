import { dummyPropertyListingsData } from "@/assets/data/propertyListings";
import {
  AnimatedView,
  Ionicons,
  SafeAreaView,
  Text,
  View,
} from "@/components/Themed";
import ListingCard from "@/components/idealista/listing/ListingCard";
import ListingCardLoader from "@/components/idealista/listing/ListingCardLoader";
import ListingFooter from "@/components/idealista/listing/ListingFooter";
import ListingImages from "@/components/idealista/listing/ListingImages";
import ListingInfo from "@/components/idealista/listing/ListingInfo";
import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { usePropertyListingsQuery } from "@/hooks/usePropertyListingsQuery";
import { PropertyListing } from "@/interfaces/propertyListing";
import { usePropertyListingFilter } from "@/store";
import { useStore } from "@/store/slices";
import { useAuth } from "@clerk/clerk-expo";
import { FlashList } from "@shopify/flash-list";
import { Link, useRouter } from "expo-router";
import { MotiView } from "moti";
import { Skeleton } from "moti/skeleton";
import React, { useRef } from "react";
import {
  Dimensions,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import { FadeIn, FadeOut } from "react-native-reanimated";

const IMAGE_HEIGHT = 300;

const PropertyListingsPage = () => {
  const router = useRouter();
  const { getToken } = useAuth();
  const colorScheme = useColorScheme();
  const store = usePropertyListingFilter();
  const resetBedroomFilter = useStore((action) => action.resetBedroomFilter);
  const resetBathroomFilter = useStore((action) => action.resetBathroomFilter);
  const flashListRef = useRef<FlashList<any>>(null);

  const {
    isLoading,
    data,
    fetchNextPage,
    isFetchingNextPage,
    isRefetching,
    refetch,
  } = usePropertyListingsQuery(getToken, store.propertyListingFilters);

  const borderColor = {
    borderColor:
      colorScheme === "light"
        ? Colors.common.gray["300"]
        : Colors.common.gray["600"],
  };

  function FlashListRowItem({ item }: { item: PropertyListing }) {
    return (
      <ListingCard
        image={
          <Link href={`/property-listing/${item.id}`} asChild>
            <TouchableOpacity activeOpacity={0.8}>
              <ListingImages
                mainImage={item.main_image_url}
                IMAGE_HEIGHT={IMAGE_HEIGHT}
              />
            </TouchableOpacity>
          </Link>
        }
        info={
          <ListingInfo
            data={{
              listing_title: item.listing_title,
              price_formatted: item.price_formatted,
              city: item.city,
              area: item.area,
              floor_area: item?.floor_area || 0,
              lot_area: item?.lot_area || 0,
              building_area: item?.building_size || 0,
            }}
          />
        }
        footer={<ListingFooter />}
      />
    );
  }

  const RenderRowForLoading = ({ item }: { item: PropertyListing }) => {
    return <ListingCardLoader />;
  };

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
                {isLoading ? (
                  <AnimatedView
                    style={defaultStyles.removedBackground}
                    entering={FadeIn}
                    exiting={FadeOut}
                  >
                    <MotiView animate={defaultStyles.removedBackground}>
                      <Skeleton
                        colorMode={colorScheme as "light" | "dark"}
                        width="60%"
                        height={20}
                      >
                        {true ? null : <View />}
                      </Skeleton>
                    </MotiView>
                  </AnimatedView>
                ) : (
                  <Text numberOfLines={1} fontWeight="semibold" fontSize={16}>
                    {`${
                      data?.pages.map((page) => page?.count).length
                        ? data?.pages.map((page) => page.count)[0]
                        : 0
                    } ${(
                      store.propertyListingFilters.property_type ?? "Properties"
                    ).replace(/\b\w/g, (l) => l.toUpperCase())} to ${
                      store.propertyListingFilters.listing_type === "for-sale"
                        ? "Buy"
                        : "Rent"
                    }`}
                  </Text>
                )}
                {isLoading ? (
                  <AnimatedView
                    style={defaultStyles.removedBackground}
                    entering={FadeIn}
                    exiting={FadeOut}
                  >
                    <MotiView animate={defaultStyles.removedBackground}>
                      <Skeleton
                        colorMode={colorScheme as "light" | "dark"}
                        width="50%"
                        height={18}
                      >
                        {true ? null : <View />}
                      </Skeleton>
                    </MotiView>
                  </AnimatedView>
                ) : (
                  <View
                    style={[
                      defaultStyles.removedBackground,
                      { flexDirection: "row", gap: 4, alignItems: "center" },
                    ]}
                  >
                    <Text fontSize={12}>Your drawn search</Text>
                    <Ionicons name="caret-down-sharp" size={12} />
                  </View>
                )}
              </View>
            </View>
            {store.propertyListingFilters.min_price! > 10_000 ||
            store.propertyListingFilters.min_sqm! > 10 ||
            store.propertyListingFilters?.min_bedrooms ||
            store.propertyListingFilters?.min_bathrooms ? (
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
                disabled={isLoading}
                activeOpacity={0.8}
                onPress={() => {
                  store.updateFilters({
                    min_price: 10_000,
                    max_price: 5_000_000_001,
                    min_sqm: 10,
                    max_sqm: 10_001,
                  });
                  resetBedroomFilter();
                  resetBathroomFilter();
                  flashListRef.current?.scrollToOffset({
                    animated: true,
                    offset: 0,
                  });
                }}
              >
                <Text fontWeight="semibold">Reset Filters</Text>
              </TouchableOpacity>
            ) : null}
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
        <Pressable
          onPress={() => router.push("/(modals)/property-listing-basic-filter")}
        >
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
        data={
          isLoading
            ? dummyPropertyListingsData
            : data?.pages.map((page) => page.data).flat()
        }
        contentContainerStyle={styles.listingContainer}
        keyExtractor={(item) => String(item.id)}
        estimatedItemSize={200}
        renderItem={isLoading ? RenderRowForLoading : FlashListRowItem}
        showsVerticalScrollIndicator={false}
        refreshing={isRefetching}
        onRefresh={refetch}
        onEndReachedThreshold={0.75}
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
          <Text
            fontWeight="semibold"
            fontSize={12}
            lightColor={Colors.common.gray["600"]}
          >
            Loading more property...
          </Text>
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
