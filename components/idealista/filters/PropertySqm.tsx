import { Ionicons, Text, View } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { usePropertyListingFilter } from "@/store";
import React from "react";
import { StyleSheet, useColorScheme } from "react-native";
import SelectDropdown from "react-native-select-dropdown";

const dropDownValues = [
  {
    title: "20 sqm",
    value: 20,
  },
  {
    title: "25 sqm",
    value: 25,
  },
  {
    title: "30 sqm",
    value: 30,
  },
  {
    title: "35 sqm",
    value: 35,
  },
  {
    title: "40 sqm",
    value: 40,
  },
  {
    title: "50 sqm",
    value: 50,
  },
  {
    title: "60 sqm",
    value: 60,
  },
  {
    title: "70 sqm",
    value: 70,
  },
  {
    title: "80 sqm",
    value: 80,
  },
  {
    title: "90 sqm",
    value: 90,
  },
  {
    title: "100 sqm",
    value: 100,
  },
  {
    title: "110 sqm",
    value: 110,
  },
  {
    title: "120 sqm",
    value: 120,
  },
  {
    title: "5000+ sqm",
    value: 10000,
  },
];

const PropertySqm = () => {
  const colorScheme = useColorScheme();
  const store = usePropertyListingFilter();

  return (
    <View
      style={[
        defaultStyles.removedBackground,
        {
          paddingHorizontal: 5,
          gap: 8,
        },
      ]}
    >
      <Text fontWeight="semibold" fontSize={16}>
        Sqm
      </Text>
      <View
        style={[
          defaultStyles.removedBackground,
          {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-evenly",
            gap: 16,
          },
        ]}
      >
        <SelectDropdown
          data={dropDownValues}
          defaultValue={
            dropDownValues.find(
              (data) => store.propertyListingFilters.min_sqm === data.value
            ) || null
          }
          onSelect={(selectedItem, _index) => {
            store.updateFilters({
              min_sqm: selectedItem.value,
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
                  {(selectedItem && selectedItem.title) || "Min"}
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

        <SelectDropdown
          data={dropDownValues}
          defaultValue={
            dropDownValues.find(
              (data) => store.propertyListingFilters.max_sqm === data.value
            ) || null
          }
          onSelect={(selectedItem, _index) => {
            store.updateFilters({
              min_sqm: 20,
              max_sqm: selectedItem.value,
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
                  {(selectedItem && selectedItem.title) || "Max"}
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
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownButtonStyle: {
    width: "50%",
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

export default PropertySqm;
