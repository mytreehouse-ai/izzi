import { Ionicons, Text, View } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { usePropertyCitiesQuery } from "@/hooks/usePropertyCitiesQuery";
import { usePropertyListingFilter } from "@/store";
import { useStore } from "@/store/slices";
import { useAuth } from "@clerk/clerk-expo";
import React, { useEffect, useState } from "react";
import { StyleSheet, useColorScheme } from "react-native";
import SelectDropdown from "react-native-select-dropdown";

interface PropertyCitiesProps {
  forPropertyValuation?: boolean;
  onChange?: (city: string) => void;
}

const PropertyCities: React.FC<PropertyCitiesProps> = ({
  forPropertyValuation = false,
  onChange,
}) => {
  const colorScheme = useColorScheme();
  const { getToken } = useAuth();
  const [shit, setShit] = useState<{ title: string; value: string }[]>([]);
  const propertyListingFilter = usePropertyListingFilter();
  const valuationPropertyDetails = useStore(
    (state) => state.propertyValuation.propertyDetails
  );
  const { isLoading, data: cities } = usePropertyCitiesQuery(getToken);

  useEffect(() => {
    if (!isLoading && cities) {
      setShit(
        cities.data.map((data) => ({ title: data.name, value: data.name }))
      );
    }
  }, [isLoading]);

  function defaultValue(propertyType: string, key: "title" | "value") {
    return shit.find((data) => data[key] === propertyType);
  }

  return (
    <SelectDropdown
      data={shit}
      defaultValue={
        forPropertyValuation
          ? defaultValue(valuationPropertyDetails.city, "title")
          : defaultValue(
              propertyListingFilter.propertyListingFilters.city ?? "",
              "value"
            )
      }
      onSelect={(selectedItem, _index) => {
        if (forPropertyValuation) {
          onChange && onChange(selectedItem.title);
        } else {
          propertyListingFilter.updateFilters({
            city: selectedItem.value,
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
              {(selectedItem && selectedItem.title) || "Select listing city"}
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

export default PropertyCities;
