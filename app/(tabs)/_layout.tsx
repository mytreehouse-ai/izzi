import { Ionicons, SafeAreaView, Text, View } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { useClientOnlyValue } from "@/hooks/useClientOnlyValue";
import { Tabs } from "expo-router";
import React from "react";
import { Platform, StatusBar, StyleSheet, useColorScheme } from "react-native";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        tabBarInactiveTintColor: Colors[colorScheme ?? "light"].tabIconDefault,
        tabBarLabelStyle: {
          fontFamily: "MontserratSemiBold",
          fontSize: 14,
        },
        tabBarStyle: {
          borderTopWidth: 0,
          backgroundColor:
            colorScheme === "light"
              ? Colors.light.background
              : Colors.dark.background,
          shadowColor:
            colorScheme === "light"
              ? Colors.common.gray["900"]
              : Colors.common.white,
          elevation: 0,
          shadowOpacity: 0.04,
          shadowOffset: {
            width: 0,
            height: -1,
          },
        },
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="compass" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: "Favorites",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: "Chat",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbox-ellipses" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="menu"
        options={{
          title: "Menu",
          header: () => (
            <SafeAreaView
              style={[styles.safeAreaViewContainer]}
              lightColor={Colors.light.primary}
              darkColor={Colors.dark.primary}
            >
              <View
                style={{ padding: 16 }}
                lightColor={Colors.light.primary}
                darkColor={Colors.dark.primary}
              >
                <Text fontWeight="semibold" fontSize={18}>
                  Menu
                </Text>
              </View>
            </SafeAreaView>
          ),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-sharp" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  safeAreaViewContainer: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
