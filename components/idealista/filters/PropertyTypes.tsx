import { Ionicons, Text, View } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { usePropertyListingFilter } from "@/store";
import React from "react";
import { StyleSheet, useColorScheme } from "react-native";
import SelectDropdown from "react-native-select-dropdown";

const dropDownValues = [
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

const PropertyTypes = () => {
  const colorScheme = useColorScheme();
  const store = usePropertyListingFilter();

  return (
    <SelectDropdown
      data={dropDownValues}
      defaultValue={
        dropDownValues.find(
          (data) => store.propertyListingFilters.property_type === data.value
        ) || null
      }
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
              {(selectedItem && selectedItem.title) || "Select property type"}
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
  );
};

const styles = StyleSheet.create({
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

export default PropertyTypes;
