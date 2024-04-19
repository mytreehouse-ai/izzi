import { Text, View } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { usePropertyListingFilter } from "@/store";
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, useColorScheme } from "react-native";

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

const ListingTypes = () => {
  const colorScheme = useColorScheme();
  const store = usePropertyListingFilter();
  const [selectedListingTypeIndex, setSelectedListingTypeIndex] = useState(
    store.propertyListingFilters.listing_type === "for-sale" ? 0 : 1
  );

  return (
    <View
      style={{
        borderRadius: 8,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor:
          colorScheme === "light" ? Colors.light.border : Colors.dark.border,
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
  );
};

export default ListingTypes;
