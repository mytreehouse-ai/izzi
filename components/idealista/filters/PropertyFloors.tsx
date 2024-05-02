import { Ionicons, Text, View } from "@/components/Themed";
import Colors from "@/constants/Colors";
import React from "react";
import { StyleSheet, useColorScheme } from "react-native";
import SelectDropdown from "react-native-select-dropdown";

interface PropertyFloorsProps {
  objKey?: "title" | "value";
  value?: string;
  onChange: (propertyType: string) => void;
}

const dropDownValues = Array.from({ length: 80 }, (_, i) => i + 1)
  .filter((floor) => floor !== 13)
  .map((floor) => ({
    title: `${floor}${
      floor === 1 ? "st" : floor === 2 ? "nd" : floor === 3 ? "rd" : "th"
    } floor`,
    value: `${floor}`,
  }));

const PropertyFloors: React.FC<PropertyFloorsProps> = ({
  objKey = "value",
  value = "",
  onChange,
}) => {
  const colorScheme = useColorScheme();

  function defaultValue(propertyType: string, key: "title" | "value") {
    return dropDownValues.find((data) => data[key] === propertyType);
  }

  return (
    <SelectDropdown
      data={dropDownValues}
      defaultValue={value ? defaultValue(value, objKey) : ""}
      onSelect={(selectedItem, _index) => {
        onChange(selectedItem[objKey]);
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
              {(selectedItem && selectedItem.title) || "Select property floor"}
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

export default PropertyFloors;