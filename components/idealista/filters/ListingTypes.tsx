import { Ionicons, Text, View } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { usePropertyListingFilter } from "@/store";
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, useColorScheme } from "react-native";
import SelectDropdown from "react-native-select-dropdown";

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

const dropDownValues = [
  {
    title: "Sale",
    value: "for-sale",
  },
  {
    title: "Rent",
    value: "for-rent",
  },
];

type ListingTypeProps = {
  label?: string;
} & (
  | { type: "group-btn" }
  | {
      type: "select";
      objKey?: "title" | "value";
      value?: string;
      onChange: (propertyType: string) => void;
    }
);

const ListingTypes: React.FC<ListingTypeProps> = (props) => {
  const colorScheme = useColorScheme();
  const store = usePropertyListingFilter();
  const [selectedListingTypeIndex, setSelectedListingTypeIndex] = useState(
    store.propertyListingFilters.listing_type === "for-sale" ? 0 : 1
  );

  function defaultValue(propertyType: string, key: "title" | "value") {
    return dropDownValues.find((data) => data[key] === propertyType);
  }

  return props.type === "group-btn" ? (
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
  ) : (
    <SelectDropdown
      data={dropDownValues}
      defaultValue={
        props.value ? defaultValue(props.value, props?.objKey ?? "value") : ""
      }
      onSelect={(selectedItem, _index) => {
        props.onChange(selectedItem[props?.objKey ?? "value"]);
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
              {(selectedItem && selectedItem.title) || "Select listing type"}
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

export default ListingTypes;
