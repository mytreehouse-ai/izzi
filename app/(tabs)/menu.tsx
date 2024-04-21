import { Ionicons, Text, View } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import React, { Fragment } from "react";
import { StyleSheet, TouchableOpacity, useColorScheme } from "react-native";
import Animated from "react-native-reanimated";

const settings = [
  {
    id: 1,
    title: "Search location",
    subtitle: "Tailored search results",
  },
];

const services = [
  {
    id: 1,
    title: "Post your property",
    subtitle: "Your first 2 listings are free",
    href: "/(modals)/property-listings",
  },
  {
    id: 2,
    title: "Value your property",
    subtitle: "Free online valuation",
    href: "/(modals)/property-valuation",
  },
];

const Menu = () => {
  const { user } = useUser();
  const router = useRouter();
  const colorScheme = useColorScheme();
  const { signOut, isLoaded, isSignedIn, getToken } = useAuth();

  return (
    <View
      style={[defaultStyles.container, styles.menuContainer]}
      lightColor={Colors.common.gray["100"]}
      darkColor={Colors.common.gray["900"]}
    >
      <View style={{ gap: 24, padding: 16 }}>
        {!isSignedIn && isLoaded ? (
          <Fragment>
            <View style={{ flexDirection: "row", gap: 4 }}>
              <Ionicons name="person" size={24} />
              <Text fontWeight="semibold" fontSize={18}>
                Login into your account
              </Text>
            </View>
            <Text>
              Bring together your favorite properties and searches from your
              computer, tablet and mobile
            </Text>
            <Link
              style={[
                defaultStyles.btn,
                {
                  backgroundColor:
                    colorScheme === "light"
                      ? Colors.common.emerald["200"]
                      : Colors.common.darkEmerald300,
                },
              ]}
              href="/(modals)/login"
              asChild
            >
              <TouchableOpacity activeOpacity={0.8}>
                <Text fontWeight="semibold" fontSize={16}>
                  Login into your account
                </Text>
              </TouchableOpacity>
            </Link>
          </Fragment>
        ) : (
          <Fragment>
            <View style={{ flexDirection: "row", gap: 4 }}>
              <Ionicons name="person" size={24} />
              <Text fontWeight="semibold" fontSize={18}>
                {user?.fullName}
              </Text>
            </View>
            <Text>
              Bring together your favorite properties and searches from your
              computer, tablet and mobile
            </Text>
            <TouchableOpacity
              style={[
                defaultStyles.btn,
                {
                  backgroundColor:
                    colorScheme === "light"
                      ? Colors.common.emerald["200"]
                      : Colors.common.darkEmerald300,
                },
              ]}
              activeOpacity={0.8}
              onPress={async () => await signOut()}
            >
              <Text fontWeight="semibold" fontSize={16}>
                Logout
              </Text>
            </TouchableOpacity>
          </Fragment>
        )}
      </View>
      <Animated.ScrollView
        style={{
          backgroundColor:
            colorScheme === "light"
              ? Colors.light.background
              : Colors.dark.background,
        }}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ flex: 1, gap: 20, padding: 16 }}>
          <Text fontWeight="semibold" fontSize={18}>
            Settings
          </Text>
          {settings.map((setting) => (
            <TouchableOpacity
              key={setting.id}
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
              activeOpacity={0.5}
              onPress={() => (isSignedIn ? void signOut() : null)}
            >
              <View key={setting.id} style={{ gap: 6 }}>
                <Text fontSize={16}>{setting.title}</Text>
                <Text>{setting.subtitle}</Text>
              </View>
              <Text
                lightColor={Colors.light.text}
                darkColor={Colors.dark.primary}
              >
                Makati, NCR
              </Text>
            </TouchableOpacity>
          ))}
          <Text fontWeight="semibold" fontSize={18}>
            Services for you
          </Text>
          {services.map((service) => (
            <Link
              key={service.id}
              href={isSignedIn ? (service.href as any) : "/(modals)/login"}
              asChild
            >
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
                activeOpacity={0.5}
              >
                <View style={{ gap: 6 }}>
                  <Text fontSize={16}>{service.title}</Text>
                  <Text>{service.subtitle}</Text>
                </View>
                <Ionicons
                  name="chevron-forward"
                  size={24}
                  lightColor={Colors.light.primary}
                  darkColor={Colors.dark.primary}
                />
              </TouchableOpacity>
            </Link>
          ))}
        </View>
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    gap: 14,
  },
});

export default Menu;
