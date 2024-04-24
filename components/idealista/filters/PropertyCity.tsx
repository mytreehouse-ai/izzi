import { Ionicons, Text, View } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { usePropertyCitiesQuery } from "@/hooks/usePropertyCitiesQuery";
import { useAuth } from "@clerk/clerk-expo";
import React, { useEffect, useState } from "react";
import { StyleSheet, useColorScheme } from "react-native";
import SelectDropdown from "react-native-select-dropdown";

interface PropertyCitiesProps {
  objKey?: "title" | "value";
  value?: string;
  placeholder?: string;
  onChange: (city: string) => void;
}

const PropertyCities: React.FC<PropertyCitiesProps> = ({
  objKey = "value",
  value = "",
  placeholder = "Select city",
  onChange,
}) => {
  const colorScheme = useColorScheme();
  const { getToken } = useAuth();
  const [localCities, setLocalCities] = useState<
    { title: string; value: string }[]
  >([]);
  const { isLoading, data: cities } = usePropertyCitiesQuery(getToken);

  useEffect(() => {
    if (!isLoading && cities) {
      setLocalCities(
        cities.data.map((data) => ({ title: data.name, value: data.name }))
      );
    }
  }, [isLoading]);

  function defaultValue(propertyType: string, key: "title" | "value") {
    return localCities.find((data) => data[key] === propertyType);
  }

  return (
    <SelectDropdown
      data={localCities}
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
              {(selectedItem && selectedItem[objKey]) || placeholder}
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
            <Text fontSize={16}>{item[objKey]}</Text>
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

export default PropertyCities;
