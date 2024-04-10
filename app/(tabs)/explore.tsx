import { SafeAreaView } from "@/components/Themed";
import RnMapView from "@/components/map/RnMapView";
import PropertyListingsBottomSheet from "@/components/property-listing/PropertyListingBottomSheet";
import PropertyListingSearch from "@/components/property-listing/PropertyListingSearch";
import PropertyListingTypeStack from "@/components/property-listing/PropertyListingTypeStack";
import { defaultStyles } from "@/constants/Styles";
import { usePropertyListingsQuery } from "@/hooks/usePropertyListingsQuery";
import globalStateStore from "@/store";
import { useAuth } from "@clerk/clerk-react";
import { Stack } from "expo-router";
import { Platform, StatusBar, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function TabTwoScreen() {
  const { getToken } = useAuth();
  const store = globalStateStore();

  const propertyListingsQuery = usePropertyListingsQuery(
    getToken,
    store.propertyListingFilters
  );

  return (
    <GestureHandlerRootView style={defaultStyles.container}>
      <Stack.Screen
        options={{
          header: () => (
            <SafeAreaView
              style={{
                gap: 20,
                paddingTop:
                  Platform.OS === "android" ? StatusBar.currentHeight : 0,
              }}
            >
              <PropertyListingSearch />
              <PropertyListingTypeStack
                onPropertyTypeChange={(propertyType) => {
                  store.updateFilters({ property_type: propertyType });
                }}
              />
            </SafeAreaView>
          ),
        }}
      />
      <RnMapView propertyListingsQuery={propertyListingsQuery} />
      <PropertyListingsBottomSheet
        propertyListingsQuery={propertyListingsQuery}
      />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
