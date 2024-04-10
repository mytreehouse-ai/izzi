import { AnimatedView, View } from "@/components/Themed";
import { defaultStyles } from "@/constants/Styles";
import { ApiBaseResponse } from "@/interfaces/apiBaseResponse";
import { PropertyListing } from "@/interfaces/propertyListing";
import globalStateStore from "@/store";
import {
  BottomSheetFlatList,
  BottomSheetFlatListMethods,
} from "@gorhom/bottom-sheet";
import { FlashList } from "@shopify/flash-list";
import { InfiniteData, UseInfiniteQueryResult } from "@tanstack/react-query";
import { Link } from "expo-router";
import { MotiView } from "moti";
import { Skeleton } from "moti/skeleton";
import React, { memo, useEffect, useRef } from "react";
import {
  Dimensions,
  ListRenderItem,
  Platform,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import { FadeInRight, FadeOutLeft } from "react-native-reanimated";
import PropertyListingCard from "./PropertyListingCard";
import PropertyListingFeatures from "./PropertyListingFeatures";
import PropertyListingImage from "./PropertyListingImage";
import PropertyListingInfo from "./PropertyListingInfo";
import PropertyListingLikeBtn from "./PropertyListingLikeBtn";
import PropertyListingPrice from "./PropertyListingPrice";
import PropertyListingRibbon from "./PropertyListingRibbon";

interface PropertyListingListProps {
  propertyListingsQuery: UseInfiniteQueryResult<
    InfiniteData<ApiBaseResponse<PropertyListing[]>, unknown>,
    Error
  >;
}

const IMAGE_HEIGHT = 300;

const dummyPropertyListingsData: PropertyListing[] = [
  {
    id: 130,
    listing_title: "Farm Land FOR SALE, Brgy. Asturias, Tarlac City",
    listing_url:
      "https://www.lamudi.com.ph/farm-land-for-sale-brgy-asturias-tarlac-city-169977186728.html",
    price: 25000000,
    price_formatted: "₱25,000,000",
    listing_type: "For Sale",
    property_status: "Available",
    property_type: "Land",
    sub_category: "Agricultural Lot",
    building_name: null,
    subdivision_name: null,
    floor_area: null,
    lot_area: 10900,
    building_size: null,
    bedrooms: null,
    bathrooms: null,
    parking_space: null,
    city: "Tarlac",
    area: "Asturias",
    address: "Asturias",
    features: [],
    main_image_url:
      "https://static-ph.lamudi.com/static/media/bm9uZS9ub25l/2x2x5x880x396/1ad1092baf4cef.jpg",
    property_images: [],
    coordinates: [15.444895, 59.346821],
    latitude_in_text: null,
    longitude_in_text: null,
    description:
      "Calling all aspiring farmers! Your ‘Dream Farm’ awaits!Explore the endless possibilities of owning this 1.9 hectares prime farm land near Hacienda Luisita and conveniently close to SCTEX, located in Brgy. Asturias, Tarlac City. ",
    created_at: "2024-04-09T01:52:28.357Z",
  },
  {
    id: 131,
    listing_title: "Farm Land FOR SALE, Brgy. Asturias, Tarlac City",
    listing_url:
      "https://www.lamudi.com.ph/farm-land-for-sale-brgy-asturias-tarlac-city-169977186728.html",
    price: 25000000,
    price_formatted: "₱25,000,000",
    listing_type: "For Sale",
    property_status: "Available",
    property_type: "Land",
    sub_category: "Agricultural Lot",
    building_name: null,
    subdivision_name: null,
    floor_area: null,
    lot_area: 10900,
    building_size: null,
    bedrooms: null,
    bathrooms: null,
    parking_space: null,
    city: "Tarlac",
    area: "Asturias",
    address: "Asturias",
    features: [],
    main_image_url:
      "https://static-ph.lamudi.com/static/media/bm9uZS9ub25l/2x2x5x880x396/1ad1092baf4cef.jpg",
    property_images: [],
    coordinates: [15.444895, 59.346821],
    latitude_in_text: null,
    longitude_in_text: null,
    description:
      "Calling all aspiring farmers! Your ‘Dream Farm’ awaits!Explore the endless possibilities of owning this 1.9 hectares prime farm land near Hacienda Luisita and conveniently close to SCTEX, located in Brgy. Asturias, Tarlac City. ",
    created_at: "2024-04-09T01:52:28.357Z",
  },
];

const PropertyListingList: React.FC<PropertyListingListProps> = ({
  propertyListingsQuery,
}) => {
  const colorScheme = useColorScheme();
  const flashListRef = useRef<FlashList<any>>(null);
  const flatListRef = useRef<BottomSheetFlatListMethods>(null);
  const store = globalStateStore();

  const {
    isLoading,
    isFetching,
    data: listings,
    fetchNextPage,
  } = propertyListingsQuery;

  async function loadMorePropertyListings() {
    if (!isLoading || !isFetching) {
      await fetchNextPage();
    }
  }

  useEffect(() => {
    const offset = { offset: 0, animated: true };
    if (Platform.OS === "ios") {
      flashListRef.current?.scrollToOffset(offset);
    }
    if (Platform.OS === "android") {
      flatListRef.current?.scrollToOffset(offset);
    }
  }, [store.propertyListingFilters.property_type]);

  const renderRow = ({ item }: { item: PropertyListing }) => (
    <Link href={`/property-listing/${item.id}`} asChild>
      <TouchableOpacity activeOpacity={0.8}>
        <AnimatedView
          style={{ gap: 10, paddingVertical: 8 }}
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
          <PropertyListingCard
            adoptWidth={true}
            enableAnimation={false}
            image={<PropertyListingImage imageUrl={item.main_image_url} />}
            info={
              <PropertyListingInfo
                title={item.listing_title}
                address={`${item.city} ${item.area ?? ""}`}
              />
            }
            features={<PropertyListingFeatures />}
            price={<PropertyListingPrice price={item.price_formatted} />}
            ribbon={
              <PropertyListingRibbon
                propertyType={item.property_type}
                listingType={item.listing_type}
              />
            }
            like={<PropertyListingLikeBtn />}
          />
        </AnimatedView>
      </TouchableOpacity>
    </Link>
  );

  const renderRowForLoading = ({ item }: { item: PropertyListing }) => {
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
            height={300}
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
  };

  const Row = memo(
    isLoading ? renderRowForLoading : renderRow,
    (prevProps, nextProps) => {
      return String(prevProps.item.id) === String(nextProps.item.id);
    }
  );

  const flatListRenderRow: ListRenderItem<PropertyListing> = ({ item }) => {
    return <Row item={item} />;
  };

  return (
    <View style={defaultStyles.container}>
      {Platform.OS === "ios" ? (
        <View
          style={[
            styles.flashListContainer,
            { paddingBottom: IMAGE_HEIGHT + 5 },
          ]}
        >
          <FlashList
            ref={flashListRef}
            data={
              isLoading
                ? dummyPropertyListingsData
                : listings?.pages.map((page) => page.data).flat()
            }
            contentContainerStyle={styles.listingContainer}
            keyExtractor={(item) => String(item.id)}
            estimatedItemSize={200}
            renderItem={isLoading ? renderRowForLoading : renderRow}
            showsVerticalScrollIndicator={false}
            onEndReached={loadMorePropertyListings}
          />
        </View>
      ) : (
        <BottomSheetFlatList
          ref={flatListRef}
          data={
            isLoading
              ? dummyPropertyListingsData
              : listings?.pages.map((page) => page.data).flat()
          }
          initialNumToRender={200}
          renderItem={flatListRenderRow}
          contentContainerStyle={styles.listingContainer}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          onEndReached={loadMorePropertyListings}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  flashListContainer: {
    height: Dimensions.get("screen").height,
    width: Dimensions.get("screen").width,
  },
  listingContainer: {
    paddingHorizontal: 16,
    paddingBottom: Platform.OS === "android" ? 14 : 20,
  },
  image: {
    width: "100%",
    height: IMAGE_HEIGHT,
    borderRadius: 10,
  },
});

export default PropertyListingList;
