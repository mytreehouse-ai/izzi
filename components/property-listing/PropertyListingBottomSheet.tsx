import { Ionicons, Text, View, useThemeColor } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { ApiBaseResponse } from "@/interfaces/apiBaseResponse";
import { PropertyListing } from "@/interfaces/propertyListing";
import BottomSheet from "@gorhom/bottom-sheet";
import { InfiniteData, UseInfiniteQueryResult } from "@tanstack/react-query";
import React, { useMemo, useRef } from "react";
import {
  Platform,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import PropertyListingList from "./PropertyListingList";

interface PropertyListingsBottomSheetsProp {
  propertyListingsQuery: UseInfiniteQueryResult<
    InfiniteData<ApiBaseResponse<PropertyListing[]>, unknown>,
    Error
  >;
}

const PropertyListingsBottomSheet: React.FC<
  PropertyListingsBottomSheetsProp
> = ({ propertyListingsQuery }) => {
  const colorScheme = useColorScheme();
  const backgroundColor = useThemeColor(
    { light: Colors.light.background, dark: Colors.dark.background },
    "background"
  );
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPointFirstIndex = Platform.OS === "ios" ? "8%" : "9%";
  const snapPoints = useMemo(() => [snapPointFirstIndex, "99%"], []);

  const handleOnCollapse = () => {
    bottomSheetRef.current?.collapse();
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={1}
      snapPoints={snapPoints}
      enablePanDownToClose={false}
      handleIndicatorStyle={{
        backgroundColor:
          colorScheme === "light" ? Colors.light.primary : Colors.dark.primary,
      }}
      backgroundStyle={{ backgroundColor: backgroundColor }}
      style={[
        styles.sheetContainerShadow,
        { backgroundColor: backgroundColor },
      ]}
    >
      <PropertyListingList propertyListingsQuery={propertyListingsQuery} />
      <View style={styles.absoluteBtn}>
        <TouchableOpacity
          style={[
            styles.btn,
            {
              backgroundColor:
                colorScheme === "light"
                  ? Colors.light.primary
                  : Colors.dark.primary,
            },
          ]}
          activeOpacity={0.85}
          onPress={handleOnCollapse}
        >
          <Text fontWeight="semibold" fontSize={16}>
            Map
          </Text>
          <Ionicons name="map-outline" size={26} />
        </TouchableOpacity>
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  sheetContainerShadow: {
    borderRadius: 10,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
  absoluteBtn: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    alignItems: "center",
    backgroundColor: "transparent",
    opacity: 0.75,
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 30,
    gap: 4,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
});

export default PropertyListingsBottomSheet;
