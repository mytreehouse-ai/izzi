import { Ionicons, Text, View } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { usePropertyListingFilter } from "@/store";
import React from "react";
import { StyleSheet, useColorScheme } from "react-native";
import SelectDropdown from "react-native-select-dropdown";

const dropDownValues = [
  {
    title: "20k",
    value: 20000,
  },
  {
    title: "30k",
    value: 30000,
  },
  {
    title: "40k",
    value: 40000,
  },
  {
    title: "50k",
    value: 50000,
  },
  {
    title: "60k",
    value: 60000,
  },
  {
    title: "70k",
    value: 70000,
  },
  {
    title: "80k",
    value: 80000,
  },
  {
    title: "90k",
    value: 90000,
  },
  {
    title: "100k",
    value: 100000,
  },
  {
    title: "110k",
    value: 110000,
  },
  {
    title: "120k",
    value: 120000,
  },
  {
    title: "130k",
    value: 130000,
  },
  {
    title: "140k",
    value: 140000,
  },
  {
    title: "150k",
    value: 150000,
  },
  {
    title: "160k",
    value: 160000,
  },
  {
    title: "170k",
    value: 170000,
  },
  {
    title: "180k",
    value: 180000,
  },
  {
    title: "190k",
    value: 190000,
  },
  {
    title: "200k",
    value: 200000,
  },
  {
    title: "220k",
    value: 220000,
  },
  {
    title: "240k",
    value: 240000,
  },
  {
    title: "260k",
    value: 260000,
  },
  {
    title: "280k",
    value: 280000,
  },
  {
    title: "300k",
    value: 300000,
  },
  {
    title: "330k",
    value: 330000,
  },
  {
    title: "360k",
    value: 360000,
  },
  {
    title: "390k",
    value: 390000,
  },
  {
    title: "400k",
    value: 400000,
  },
  {
    title: "450k",
    value: 450000,
  },
  {
    title: "500k",
    value: 500000,
  },
  {
    title: "550k",
    value: 550000,
  },
  {
    title: "600k",
    value: 600000,
  },
  {
    title: "650k",
    value: 650000,
  },
  {
    title: "700k",
    value: 700000,
  },
  {
    title: "750k",
    value: 750000,
  },
  {
    title: "800k",
    value: 800000,
  },
  {
    title: "850k",
    value: 850000,
  },
  {
    title: "900k",
    value: 900000,
  },
  {
    title: "950k",
    value: 950000,
  },
  {
    title: "1m",
    value: 1_000_000,
  },
  {
    title: "1.1m",
    value: 1_100_000,
  },
  {
    title: "1.2m",
    value: 1_200_000,
  },
  {
    title: "1.3m",
    value: 1_300_000,
  },
  {
    title: "1.4m",
    value: 1_400_000,
  },
  {
    title: "1.5m",
    value: 1_500_000,
  },
  {
    title: "1.6m",
    value: 1_600_000,
  },
  {
    title: "1.7m",
    value: 1_700_000,
  },
  {
    title: "1.8m",
    value: 1_800_000,
  },
  {
    title: "1.9m",
    value: 1_900_000,
  },
  {
    title: "2m",
    value: 2_000_000,
  },
  {
    title: "2.2m",
    value: 2_200_000,
  },
  {
    title: "2.4m",
    value: 2_400_000,
  },
  {
    title: "2.6m",
    value: 2_600_000,
  },
  {
    title: "2.8m",
    value: 2_800_000,
  },
  {
    title: "3m",
    value: 3_000_000,
  },
  {
    title: "3.3m",
    value: 3_300_000,
  },
  {
    title: "3.6m",
    value: 3_600_000,
  },
  {
    title: "3.9m",
    value: 3_900_000,
  },
  {
    title: "4m",
    value: 4_000_000,
  },
  {
    title: "4.5m",
    value: 4_500_000,
  },
  {
    title: "5m",
    value: 5_000_000,
  },
  {
    title: "5.5m",
    value: 5_500_000,
  },
  {
    title: "6m",
    value: 6_000_000,
  },
  {
    title: "6.5m",
    value: 6_500_000,
  },
  {
    title: "7m",
    value: 7_000_000,
  },
  {
    title: "7.5m",
    value: 7_500_000,
  },
  {
    title: "8m",
    value: 8_000_000,
  },
  {
    title: "8.5m",
    value: 8_500_000,
  },
  {
    title: "9m",
    value: 9_000_000,
  },
  {
    title: "9.5m",
    value: 9_500_000,
  },
  {
    title: "10m",
    value: 10_000_000,
  },
  {
    title: "Unlimited",
    value: 5_000_000_000,
  },
];

const ListingPrice = () => {
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
        Price
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
              (data) => store.propertyListingFilters.min_price === data.value
            ) || null
          }
          onSelect={(selectedItem, _index) => {
            const maxPrice = store.propertyListingFilters.max_price!;
            if (maxPrice <= selectedItem.value) {
              const nextIndex =
                dropDownValues.findIndex(
                  (data) => data.value === selectedItem.value
                ) + 1;
              const nextValue = dropDownValues[nextIndex]
                ? dropDownValues[nextIndex].value
                : 5_000_000_001;
              store.updateFilters({
                min_price: selectedItem.value,
                max_price: nextValue,
              });
            } else {
              store.updateFilters({
                min_price: selectedItem.value,
              });
            }
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
              (data) => store.propertyListingFilters.max_price === data.value
            ) || null
          }
          onSelect={(selectedItem, _index) => {
            const minPrice = store.propertyListingFilters.min_price!;
            if (minPrice >= selectedItem.value) {
              const prevIndex =
                dropDownValues.findIndex(
                  (data) => data.value === selectedItem.value
                ) - 1;
              const prevValue = dropDownValues[prevIndex]
                ? dropDownValues[prevIndex].value
                : 10_000;
              store.updateFilters({
                min_price: prevValue,
                max_price: selectedItem.value,
              });
            } else {
              store.updateFilters({
                max_price: selectedItem.value,
              });
            }
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

export default ListingPrice;
