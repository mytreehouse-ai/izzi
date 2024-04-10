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

import { Ionicons } from "@/components/Themed";
import PropertyListingFilterHeader from "@/components/property-listing/PropertyListingFilterHeader";
import zustandStore from "@/store";
import { TouchableOpacity, useColorScheme } from "react-native";

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

export default function RootLayout() {
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
  const store = zustandStore();

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

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: "modal" }} />
        <Stack.Screen
          name="(modals)/login"
          options={{
            presentation: "modal",
            title: "Login or signup",
            headerTitleStyle: {
              fontFamily: "MontserratSemiBold",
              fontSize: 16,
            },
            headerLeft: () => (
              <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name="close-outline" size={24} />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen
          name="property-listing/[id]"
          options={{
            headerTitle: "",
            headerTransparent: true,
          }}
        />
        <Stack.Screen
          name="(modals)/property-listing-filter"
          options={{
            presentation: "transparentModal",
            animation: "fade",
            headerTransparent: true,
            header: () => <PropertyListingFilterHeader />,
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}
