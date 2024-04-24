import { Ionicons, SafeAreaView, Text, View } from "@/components/Themed";
import ListingTypes from "@/components/idealista/filters/ListingTypes";
import PropertyTypes from "@/components/idealista/filters/PropertyTypes";
import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { usePropertyListingFilter } from "@/store";
import { useAuth } from "@clerk/clerk-expo";
import { Link, Stack } from "expo-router";
import { Fragment, useRef } from "react";
import {
  Dimensions,
  Image,
  Platform,
  PlatformIOSStatic,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import Animated from "react-native-reanimated";

const windowWidth = Dimensions.get("window").width;
const platformIOS = Platform as PlatformIOSStatic;

export default function Home() {
  const { isSignedIn } = useAuth();
  const colorScheme = useColorScheme();
  const mainScrollViewRef = useRef<Animated.ScrollView>(null);
  const store = usePropertyListingFilter();

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
                style={defaultStyles.safeAreaViewContainer}
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
                defaultSource={require("@/assets/images/dark-placeholder.webp")}
                source={require("@/assets/images/real-state/dan-gold-4HG3Ca3EzWw-unsplash.jpg")}
                style={{
                  height: platformIOS.isPad ? 600 : 300,
                  width: windowWidth,
                }}
              />
              <View
                style={{ padding: 8, gap: 16 }}
                lightColor={Colors.light.primary}
                darkColor={Colors.dark.primary}
              >
                <ListingTypes />
                <PropertyTypes
                  value={store.propertyListingFilters.property_type!}
                  onChange={(propertyType) => {
                    store.updateFilters({ property_type: propertyType });
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
          <Link
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
            href={
              isSignedIn
                ? "/(modals)/property-listing-create"
                : "/(modals)/login"
            }
            asChild
          >
            <TouchableOpacity activeOpacity={0.7}>
              <Text
                fontWeight="semibold"
                fontSize={16}
                lightColor={Colors.light.primary}
                darkColor={Colors.dark.primary}
              >
                Post your listing
              </Text>
            </TouchableOpacity>
          </Link>
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
  mainScrollViewContainer: {
    padding: 8,
  },
});
