import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import NetInfo from "@react-native-community/netinfo";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Constants from "expo-constants";
import { useFonts } from "expo-font";
import * as Location from "expo-location";
import { Stack, useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

import { Ionicons, SafeAreaView, View } from "@/components/Themed";
import PropertyListingSearch from "@/components/property-listing/PropertyListingSearch";
import Colors from "@/constants/Colors";
import { globalStateStore } from "@/store";
import {
  Platform,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from "react-native";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const tokenCache = {
  async getToken(key: string) {
    return await SecureStore.getItemAsync(key);
  },
  async saveToken(key: string, value: string) {
    await SecureStore.setItemAsync(key, value);
  },
};

function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    Montserrat: require("@/assets/fonts/Montserrat-Regular.ttf"),
    MontserratBold: require("@/assets/fonts/Montserrat-Bold.ttf"),
    MontserratSemiBold: require("@/assets/fonts/Montserrat-SemiBold.ttf"),
    ...FontAwesome.font,
  });

  const queryClient = new QueryClient();

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ClerkProvider
      publishableKey={Constants.expoConfig?.extra?.clerkPublishableKey ?? ""}
      tokenCache={tokenCache}
    >
      <QueryClientProvider client={queryClient}>
        <RootLayoutNav />
      </QueryClientProvider>
    </ClerkProvider>
  );
}

function RootLayoutNav() {
  const router = useRouter();
  const { isLoaded, isSignedIn } = useAuth();
  const colorScheme = useColorScheme();
  const store = globalStateStore();

  useEffect(() => {
    const removeNetInfoSubscription = NetInfo.addEventListener((state) => {
      const connected = state.isConnected;
      const _connectionType = state.type;
      !connected ? alert("No Internet Connection!") : null;
    });
    return () => removeNetInfoSubscription();
  }, []);

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      setTimeout(() => router.push("/(modals)/login"), 100);
    } else {
      (async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          store.setLocationErrorMessage(
            "Permission to access location was denied"
          );
        }
        const location = await Location.getCurrentPositionAsync({});
        store.setUserLocation(location);
      })();
    }
  }, [isLoaded, isSignedIn]);

  function HeaderCloseBtn() {
    return (
      <TouchableOpacity
        style={[
          styles.closeBtn,
          {
            borderColor:
              colorScheme === "light"
                ? Colors.light.border
                : Colors.dark.border,
          },
        ]}
        onPress={() => router.back()}
        activeOpacity={0.75}
      >
        <Ionicons name="close-outline" size={24} />
      </TouchableOpacity>
    );
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="property-listing/[id]"
          options={{
            headerTitle: "",
            headerTransparent: true,
          }}
        />
        <Stack.Screen
          name="(modals)/login"
          options={{
            title: "Login or signup",
            headerTitleStyle: {
              fontFamily: "MontserratSemiBold",
              fontSize: 18,
            },
            headerLeft: () => (
              <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name="close-outline" size={24} />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen
          name="(modals)/property-listing-filter"
          options={{
            title: "Customize Property Search",
            presentation: "transparentModal",
            animation: Platform.OS === "ios" ? "ios" : "fade",
            headerTitleStyle: {
              fontFamily: "MontserratSemiBold",
              fontSize: 18,
            },
            headerLeft: () => <HeaderCloseBtn />,
          }}
        />
        <Stack.Screen
          name="(modals)/property-listing-advance-filter"
          options={{
            title: "",
            presentation: "transparentModal",
            animation: Platform.OS === "ios" ? "ios" : "fade",
            headerTitleStyle: {
              fontFamily: "MontserratSemiBold",
              fontSize: 18,
            },
            header: () => (
              <SafeAreaView>
                <View style={{ padding: 16, gap: 16 }}>
                  <HeaderCloseBtn />
                  <PropertyListingSearch />
                </View>
              </SafeAreaView>
            ),
          }}
        />
        <Stack.Screen
          name="(modals)/property-listings"
          options={{
            title: "",
            headerShown: false,
            headerTransparent: true,
            headerTitleStyle: {
              fontFamily: "MontserratSemiBold",
              fontSize: 18,
            },
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  closeBtnContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  closeBtn: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: StyleSheet.hairlineWidth,
  },
});

export default RootLayout;
