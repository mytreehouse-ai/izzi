import {
  AnimatedView,
  Ionicons,
  MaterialCommunityIcons,
  SafeAreaView,
  Text,
  View,
} from "@/components/Themed";
import PropertyListingCard from "@/components/property-listing/PropertyListingCard";
import PropertyListingFeatures from "@/components/property-listing/PropertyListingFeatures";
import PropertyListingImage from "@/components/property-listing/PropertyListingImage";
import PropertyListingInfo from "@/components/property-listing/PropertyListingInfo";
import PropertyListingLikeBtn from "@/components/property-listing/PropertyListingLikeBtn";
import PropertyListingPrice from "@/components/property-listing/PropertyListingPrice";
import PropertyListingRating from "@/components/property-listing/PropertyListingRating";
import PropertyListingRibbon from "@/components/property-listing/PropertyListingRibbon";
import PropertyListingSearch from "@/components/property-listing/PropertyListingSearch";
import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { Link, Stack } from "expo-router";
import { useRef, useState } from "react";
import {
  Dimensions,
  Platform,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import SelectDropdown from "react-native-select-dropdown";

const windowWidth = Dimensions.get("window").width;

const listingTypes = [
  {
    id: 1,
    name: "Buy",
    value: "for-sale",
  },
  {
    id: 2,
    name: "Rent",
    value: "for-rent",
  },
];

const emojisWithIcons = [
  {
    title: "House",
    value: "house",
  },
  {
    title: "Condominium",
    value: "condominium",
  },
  {
    title: "Warehouse",
    value: "warehouse",
  },
  {
    title: "Land",
    value: "land",
  },
];

export default function TabOneScreen() {
  const colorScheme = useColorScheme();
  const mainScrollViewRef = useRef<Animated.ScrollView>(null);
  const recommendedPropertyScrollViewRef = useRef<Animated.ScrollView>(null);
  const nearByPropertyScrollViewRef = useRef<Animated.ScrollView>(null);
  const [listingType, setListingType] = useState("for-sale");

  return (
    <GestureHandlerRootView
      style={[
        defaultStyles.container,
        {
          backgroundColor:
            colorScheme === "light"
              ? Colors.light.background
              : Colors.dark.background,
        },
      ]}
    >
      <Stack.Screen
        options={{
          header: () => (
            <SafeAreaView style={styles.safeAreaViewContainer}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingHorizontal: 16,
                }}
              >
                <TouchableOpacity
                  style={{
                    padding: 14,
                    borderRadius: 100,
                    backgroundColor:
                      colorScheme === "light"
                        ? Colors.common.gray["100"]
                        : Colors.common.gray["800"],
                  }}
                >
                  <Ionicons
                    name="menu"
                    size={24}
                    lightColor={Colors.light.tabIconDefault}
                    darkColor={Colors.common.gray["500"]}
                  />
                </TouchableOpacity>
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 6,
                  }}
                >
                  <Text lightColor={Colors.common.gray["500"]}>
                    Your location
                  </Text>
                  <Text fontWeight="semibold" fontSize={18}>
                    Makati
                  </Text>
                </View>
                <TouchableOpacity
                  style={{
                    padding: 14,
                    borderRadius: 100,
                    backgroundColor:
                      colorScheme === "light"
                        ? Colors.common.gray["100"]
                        : Colors.common.gray["800"],
                  }}
                >
                  <View
                    style={[
                      defaultStyles.removedBackground,
                      { position: "relative" },
                    ]}
                  >
                    <MaterialCommunityIcons
                      name="bell-outline"
                      size={24}
                      lightColor={Colors.light.tabIconDefault}
                      darkColor={Colors.common.gray["500"]}
                    />
                    <AnimatedView
                      style={{
                        position: "absolute",
                        top: 5,
                        right: 1.5,
                        backgroundColor: Colors.common.white,
                        width: 10,
                        height: 10,
                        borderRadius: 50,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      entering={FadeIn.delay(500)}
                      exiting={FadeOut.delay(500)}
                    >
                      <View
                        style={{
                          backgroundColor: Colors.common.red["600"],
                          width: 5,
                          height: 5,
                          borderRadius: 50,
                        }}
                      />
                    </AnimatedView>
                  </View>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  borderRadius: 8,
                  borderWidth: StyleSheet.hairlineWidth,
                  borderColor:
                    colorScheme === "light"
                      ? Colors.light.border
                      : Colors.dark.border,
                  marginHorizontal: 16,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                }}
              >
                {listingTypes.map((lt) => (
                  <TouchableOpacity
                    key={lt.id}
                    style={[
                      {
                        width: "50%",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: 12,
                      },
                      lt.value === listingType && {
                        backgroundColor:
                          colorScheme === "light"
                            ? Colors.light.primary
                            : Colors.dark.primary,
                      },
                      lt.id === 1 && {
                        borderTopLeftRadius: 8,
                        borderBottomLeftRadius: 8,
                      },
                      lt.id === 2 && {
                        borderTopRightRadius: 8,
                        borderBottomRightRadius: 8,
                      },
                    ]}
                    onPress={() => setListingType(lt.value)}
                    activeOpacity={0.8}
                  >
                    <Text
                      fontWeight="semibold"
                      fontSize={16}
                      lightColor={Colors.light.text}
                      darkColor={Colors.dark.text}
                    >
                      {lt.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              <SelectDropdown
                data={emojisWithIcons}
                onSelect={(selectedItem, index) => {
                  console.log(selectedItem, index);
                }}
                renderButton={(selectedItem, isOpened) => {
                  return (
                    <View
                      style={[
                        styles.dropdownButtonStyle,
                        {
                          backgroundColor:
                            colorScheme === "light"
                              ? Colors.common.gray["100"]
                              : Colors.common.gray["800"],
                        },
                      ]}
                    >
                      <Text
                        style={styles.dropdownButtonTxtStyle}
                        fontWeight="semibold"
                        fontSize={16}
                      >
                        {(selectedItem && selectedItem.title) ||
                          "Select property type"}
                      </Text>
                      <Ionicons
                        name={isOpened ? "chevron-up" : "chevron-down"}
                        size={24}
                        lightColor={Colors.light.tabIconDefault}
                        darkColor={Colors.common.gray["500"]}
                      />
                    </View>
                  );
                }}
                renderItem={(item, _index, isSelected) => {
                  return (
                    <View
                      style={{
                        ...styles.dropdownItemStyle,
                        ...(isSelected && {
                          backgroundColor:
                            colorScheme === "light"
                              ? Colors.common.gray["200"]
                              : Colors.common.gray["700"],
                        }),
                      }}
                    >
                      <Text fontSize={16}>{item.title}</Text>
                    </View>
                  );
                }}
                showsVerticalScrollIndicator={false}
                dropdownStyle={{
                  borderRadius: 8,
                  backgroundColor:
                    colorScheme === "light"
                      ? Colors.light.background
                      : Colors.dark.background,
                }}
              />
              <PropertyListingSearch />
            </SafeAreaView>
          ),
        }}
      />
      <Animated.ScrollView
        ref={mainScrollViewRef}
        style={[
          defaultStyles.container,
          styles.mainScrollViewContainer,
          {
            backgroundColor:
              colorScheme === "light"
                ? Colors.light.background
                : Colors.dark.background,
          },
        ]}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
      >
        <View
          style={[
            defaultStyles.removedBackground,
            {
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingHorizontal: 16,
            },
          ]}
        >
          <Text fontWeight="semibold" fontSize={16}>
            Featured Properties
          </Text>
          <TouchableOpacity activeOpacity={0.7}>
            <Text
              fontWeight="semibold"
              lightColor={Colors.light.primary}
              darkColor={Colors.dark.primary}
            >
              See all
            </Text>
          </TouchableOpacity>
        </View>
        <Animated.ScrollView
          ref={recommendedPropertyScrollViewRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={[defaultStyles.removedBackground, { width: windowWidth }]}
          scrollEventThrottle={16}
        >
          <View
            style={[
              defaultStyles.removedBackground,
              styles.recommendedPropertyContainer,
            ]}
          >
            {[5000, 5001, 5002, 5003, 5004].map((i) => (
              <Link key={i} href={`/property-listing/${String(i)}`} asChild>
                <TouchableOpacity activeOpacity={1}>
                  <PropertyListingCard
                    image={<PropertyListingImage />}
                    info={
                      <PropertyListingInfo
                        title="Cozy Suburban Home"
                        address="Quezon City"
                        rating={<PropertyListingRating rating={4.5} />}
                      />
                    }
                    features={<PropertyListingFeatures />}
                    price={<PropertyListingPrice price="Php 35,500" />}
                    ribbon={
                      <PropertyListingRibbon
                        propertyType="House"
                        listingType="Rent"
                      />
                    }
                    like={<PropertyListingLikeBtn />}
                  />
                </TouchableOpacity>
              </Link>
            ))}
          </View>
        </Animated.ScrollView>
        <View
          style={[
            defaultStyles.removedBackground,
            {
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingHorizontal: 16,
            },
          ]}
        >
          <Text fontWeight="semibold" fontSize={16}>
            Recommended Properties
          </Text>
          <TouchableOpacity activeOpacity={0.7}>
            <Text
              fontWeight="semibold"
              lightColor={Colors.light.primary}
              darkColor={Colors.dark.primary}
            >
              See all
            </Text>
          </TouchableOpacity>
        </View>
        <Animated.ScrollView
          ref={recommendedPropertyScrollViewRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={[defaultStyles.removedBackground, { width: windowWidth }]}
          scrollEventThrottle={16}
        >
          <View
            style={[
              defaultStyles.removedBackground,
              styles.recommendedPropertyContainer,
            ]}
          >
            {[5000, 5001, 5002, 5003, 5004].map((i) => (
              <Link key={i} href={`/property-listing/${String(i)}`} asChild>
                <TouchableOpacity activeOpacity={1}>
                  <PropertyListingCard
                    image={<PropertyListingImage />}
                    info={
                      <PropertyListingInfo
                        title="Cozy Suburban Home"
                        address="Quezon City"
                        rating={<PropertyListingRating rating={4.5} />}
                      />
                    }
                    features={<PropertyListingFeatures />}
                    price={<PropertyListingPrice price="Php 35,500" />}
                    ribbon={
                      <PropertyListingRibbon
                        propertyType="House"
                        listingType="Rent"
                      />
                    }
                    like={<PropertyListingLikeBtn />}
                  />
                </TouchableOpacity>
              </Link>
            ))}
          </View>
        </Animated.ScrollView>
        <View
          style={[
            defaultStyles.removedBackground,
            {
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingHorizontal: 16,
            },
          ]}
        >
          <Text fontWeight="semibold" fontSize={16}>
            Nearby You
          </Text>
          <TouchableOpacity activeOpacity={0.7}>
            <Text
              fontWeight="semibold"
              lightColor={Colors.light.primary}
              darkColor={Colors.dark.primary}
            >
              See all
            </Text>
          </TouchableOpacity>
        </View>
        <Animated.ScrollView
          ref={nearByPropertyScrollViewRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={[defaultStyles.removedBackground, { width: windowWidth }]}
          scrollEventThrottle={16}
        >
          <View
            style={[defaultStyles.removedBackground, styles.nearbyYouContainer]}
          >
            {[5000, 5001, 5002, 5003, 5004].map((i) => (
              <Link key={i} href={`/property-listing/${i}`} asChild>
                <TouchableOpacity activeOpacity={1}>
                  <PropertyListingCard
                    image={<PropertyListingImage />}
                    info={
                      <PropertyListingInfo
                        title="Cozy Suburban Home"
                        address="Quezon City"
                        rating={<PropertyListingRating rating={4.5} />}
                      />
                    }
                    features={<PropertyListingFeatures />}
                    price={<PropertyListingPrice price="Php 35,500" />}
                    ribbon={
                      <PropertyListingRibbon
                        propertyType="House"
                        listingType="Rent"
                      />
                    }
                    like={<PropertyListingLikeBtn />}
                  />
                </TouchableOpacity>
              </Link>
            ))}
          </View>
        </Animated.ScrollView>
      </Animated.ScrollView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  safeAreaViewContainer: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    gap: 20,
  },
  mainScrollViewContainer: {
    paddingVertical: 16,
  },
  recommendedPropertyContainer: {
    flexDirection: "row",
    gap: 16,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
    height: 340, //TODO: fix height
  },
  nearbyYouContainer: {
    gap: 16,
    height: 350,
    paddingTop: 16,
    paddingBottom: 36,
    flexDirection: "row",
    paddingHorizontal: 16,
  },
  dropdownButtonStyle: {
    height: 45,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    marginHorizontal: 16,
  },
  dropdownItemStyle: {
    padding: 12,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
  },
  dropdownItemIconStyle: {
    marginRight: 8,
  },
});
