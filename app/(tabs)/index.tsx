import { Ionicons, SafeAreaView, Text, View } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { globalStateStore } from "@/store";
import { Link, Stack } from "expo-router";
import { Fragment, useRef, useState } from "react";
import {
	Dimensions,
	Image,
	Platform,
	PlatformIOSStatic,
	StatusBar,
	StyleSheet,
	TouchableOpacity,
	useColorScheme,
} from "react-native";
import Animated from "react-native-reanimated";
import SelectDropdown from "react-native-select-dropdown";

const windowWidth = Dimensions.get("window").width;
const platformIOS = Platform as PlatformIOSStatic

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
  const store = globalStateStore();
  const [selectedListingTypeIndex, setSelectedListingTypeIndex] = useState(0);

  return (
    <View
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
            <Fragment>
              <SafeAreaView
                style={styles.safeAreaViewContainer}
                lightColor={Colors.light.primary}
                darkColor={Colors.dark.primary}
              >
                <View
                  style={[
                    {
                      paddingVertical: 8,
                      width: windowWidth,
                      alignItems: "center",
                      justifyContent: "center",
                    },
                  ]}
                >
                  <Text fontWeight="semibold" fontSize={30}>
                    izzi
                  </Text>
                </View>
              </SafeAreaView>
              <Image
                defaultSource={require("@/assets/images/real-state/dan-gold-4HG3Ca3EzWw-unsplash.jpg")}
                source={require("@/assets/images/real-state/dan-gold-4HG3Ca3EzWw-unsplash.jpg")}
                style={{ height: platformIOS.isPad ? 600 : 300, width: windowWidth }}
              />
              <View
                style={{ padding: 8, gap: 16 }}
                lightColor={Colors.light.primary}
                darkColor={Colors.dark.primary}
              >
                <View
                  style={{
                    borderRadius: 8,
                    borderWidth: StyleSheet.hairlineWidth,
                    borderColor:
                      colorScheme === "light"
                        ? Colors.light.border
                        : Colors.dark.border,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-evenly",
                  }}
                  lightColor={Colors.light.background}
                  darkColor={Colors.common.gray["800"]}
                >
                  {listingTypes.map((lt, index) => (
                    <TouchableOpacity
                      key={lt.id}
                      delayPressIn={0}
                      style={[
                        {
                          width: "50%",
                          alignItems: "center",
                          justifyContent: "center",
                          padding: 12,
                        },
                        selectedListingTypeIndex === index && {
                          borderWidth: 1,
                          borderColor:
                            colorScheme === "light"
                              ? Colors.light.accent
                              : Colors.dark.accent,
                          backgroundColor:
                            colorScheme === "light"
                              ? Colors.common.emerald["100"]
                              : Colors.common.darkEmerald300,
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
                      onPress={() => {
                        setSelectedListingTypeIndex(index);
                        store.updateFilters({ listing_type: lt.value });
                      }}
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
                  defaultValue={store.propertyListingFilters.property_type}
                  onSelect={(selectedItem, _index) => {
                    store.updateFilters({
                      property_type: String(selectedItem.value),
                    });
                  }}
                  renderButton={(selectedItem, isOpened) => {
                    return (
                      <View
                        style={[
                          styles.dropdownButtonStyle,
                          {
                            backgroundColor:
                              colorScheme === "light"
                                ? Colors.light.background
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
                <Link
                  href="/(modals)/property-listing-advance-filter"
                  style={{
                    height: 45,
                    borderRadius: 8,
                    paddingHorizontal: 12,
                    flexDirection: "row",
                    alignItems: "center",
                    backgroundColor:
                      colorScheme === "light"
                        ? Colors.light.background
                        : Colors.common.gray["800"],
                  }}
                  asChild
                >
                  <TouchableOpacity
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                    activeOpacity={0.8}
                  >
                    <Text fontWeight="semibold" fontSize={16}>
                      Visible area
                    </Text>
                    <Ionicons name="locate-sharp" size={24} />
                  </TouchableOpacity>
                </Link>
                <Link
                  style={[
                    defaultStyles.btn,
                    {
                      backgroundColor:
                        colorScheme === "light"
                          ? Colors.common.emerald["100"]
                          : Colors.common.darkEmerald300,
                    },
                  ]}
                  href="/(modals)/property-listings"
                  asChild
                >
                  <TouchableOpacity activeOpacity={0.8}>
                    <Text fontWeight="semibold" fontSize={16}>
                      Search
                    </Text>
                  </TouchableOpacity>
                </Link>
              </View>
            </Fragment>
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
        <View style={{ gap: 16 }}>
          <TouchableOpacity
            style={[
              defaultStyles.btn,
              {
                borderWidth: 1,
                borderColor:
                  colorScheme === "light"
                    ? Colors.common.emerald["300"]
                    : Colors.common.darkEmerald300,
              },
            ]}
            activeOpacity={0.7}
          >
            <Text
              fontWeight="semibold"
              fontSize={16}
              lightColor={Colors.light.primary}
              darkColor={Colors.dark.primary}
            >
              Post your listing
            </Text>
          </TouchableOpacity>
          <Text fontWeight="semibold" fontSize={16}>
            Your Searches
          </Text>
          <View style={{ flexDirection: "row", paddingBottom: 30, gap: 8 }}>
            <View
              style={{
                height: 100,
                width: 100,
                borderWidth: StyleSheet.hairlineWidth,
                borderRadius: 8,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text>Map</Text>
            </View>
            <View style={{ height: 100, gap: 8 }}>
              <Text fontWeight="semibold">
                House in your custom search area
              </Text>
              <View>
                <Text>All prices</Text>
                <Text>No Filter</Text>
              </View>
            </View>
          </View>
        </View>
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  safeAreaViewContainer: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  mainScrollViewContainer: {
    padding: 8,
  },
  dropdownButtonStyle: {
    height: 45,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
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
