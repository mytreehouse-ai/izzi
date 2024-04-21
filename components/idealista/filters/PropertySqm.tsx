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
    title: "130 sqm",
    value: 130,
  },
  {
    title: "140 sqm",
    value: 140,
  },
  {
    title: "150 sqm",
    value: 150,
  },
  {
    title: "160 sqm",
    value: 160,
  },
  {
    title: "170 sqm",
    value: 170,
  },
  {
    title: "180 sqm",
    value: 180,
  },
  {
    title: "190 sqm",
    value: 190,
  },
  {
    title: "200 sqm",
    value: 200,
  },
  {
    title: "220 sqm",
    value: 220,
  },
  {
    title: "240 sqm",
    value: 240,
  },
  {
    title: "260 sqm",
    value: 260,
  },
  {
    title: "280 sqm",
    value: 280,
  },
  {
    title: "300 sqm",
    value: 300,
  },
  {
    title: "320 sqm",
    value: 320,
  },
  {
    title: "340 sqm",
    value: 340,
  },
  {
    title: "360 sqm",
    value: 360,
  },
  {
    title: "380 sqm",
    value: 380,
  },
  {
    title: "400 sqm",
    value: 400,
  },
  {
    title: "420 sqm",
    value: 420,
  },
  {
    title: "440 sqm",
    value: 440,
  },
  {
    title: "460 sqm",
    value: 460,
  },
  {
    title: "480 sqm",
    value: 480,
  },
  {
    title: "500 sqm",
    value: 500,
  },
  {
    title: "520 sqm",
    value: 520,
  },
  {
    title: "540 sqm",
    value: 540,
  },
  {
    title: "560 sqm",
    value: 560,
  },
  {
    title: "580 sqm",
    value: 580,
  },
  {
    title: "600 sqm",
    value: 600,
  },
  {
    title: "620 sqm",
    value: 620,
  },
  {
    title: "640 sqm",
    value: 640,
  },
  {
    title: "660 sqm",
    value: 660,
  },
  {
    title: "680 sqm",
    value: 680,
  },
  {
    title: "700 sqm",
    value: 700,
  },
  {
    title: "720 sqm",
    value: 720,
  },
  {
    title: "740 sqm",
    value: 740,
  },
  {
    title: "760 sqm",
    value: 760,
  },
  {
    title: "780 sqm",
    value: 780,
  },
  {
    title: "800 sqm",
    value: 800,
  },
  {
    title: "820 sqm",
    value: 820,
  },
  {
    title: "840 sqm",
    value: 840,
  },
  {
    title: "860 sqm",
    value: 860,
  },
  {
    title: "880 sqm",
    value: 880,
  },
  {
    title: "900 sqm",
    value: 900,
  },
  {
    title: "920 sqm",
    value: 920,
  },
  {
    title: "940 sqm",
    value: 940,
  },
  {
    title: "960 sqm",
    value: 960,
  },
  {
    title: "980 sqm",
    value: 980,
  },
  {
    title: "1000 sqm",
    value: 1000,
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
            const maxSqm = store.propertyListingFilters.max_sqm!;
            if (maxSqm <= selectedItem.value) {
              const nextIndex =
                dropDownValues.findIndex(
                  (data) => data.value === selectedItem.value
                ) + 1;
              const nextValue = dropDownValues[nextIndex]
                ? dropDownValues[nextIndex].value
                : 10_001;
              store.updateFilters({
                min_sqm: selectedItem.value,
                max_sqm: nextValue,
              });
            } else {
              store.updateFilters({
                min_sqm: selectedItem.value,
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
              (data) => store.propertyListingFilters.max_sqm === data.value
            ) || null
          }
          onSelect={(selectedItem, _index) => {
            const minSqm = store.propertyListingFilters.min_sqm!;
            if (minSqm >= selectedItem.value) {
              const prevIndex =
                dropDownValues.findIndex(
                  (data) => data.value === selectedItem.value
                ) - 1;
              const prevValue = dropDownValues[prevIndex]
                ? dropDownValues[prevIndex].value
                : 10_001;
              store.updateFilters({
                min_sqm: prevValue,
                max_sqm: selectedItem.value,
              });
            } else {
              store.updateFilters({
                max_sqm: selectedItem.value,
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

export default PropertySqm;
