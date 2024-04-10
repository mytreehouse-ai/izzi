import { Tabs } from "expo-router";
import React from "react";
import { useColorScheme } from "react-native";

import { Ionicons, SafeAreaView, Text, View } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { useClientOnlyValue } from "@/hooks/useClientOnlyValue";

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
        name="wishlist"
        options={{
          title: "Wishlist",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="message"
        options={{
          title: "Message",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbox-ellipses" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          header: () => (
            <View>
              <Text>aa</Text>
              <SafeAreaView>
                <Text>asd</Text>
              </SafeAreaView>
            </View>
          ),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-sharp" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
