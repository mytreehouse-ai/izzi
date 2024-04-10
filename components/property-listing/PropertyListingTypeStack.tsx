import {
  MaterialCommunityIcons,
  MaterialCommunityIconsProps,
  Text,
  View,
} from "@/components/Themed";
import Colors from "@/constants/Colors";
import * as Haptics from "expo-haptics";
import React, { useRef, useState } from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from "react-native";

const tabItems = [
  {
    id: 1,
    name: "House",
    value: "house",
    icon: "home",
    lightColor: Colors.light.accent,
    darkColor: Colors.dark.accent,
  },
  {
    id: 2,
    name: "Condominium",
    value: "condominium",
    icon: "home-modern",
    lightColor: Colors.common.lightAmber,
    darkColor: Colors.common.darkAmber,
  },
  {
    id: 3,
    name: "Warehouse",
    value: "warehouse",
    icon: "warehouse",
    lightColor: Colors.common.lightBlue,
    darkColor: Colors.common.darkBlue,
  },
  {
    id: 4,
    name: "Land",
    value: "land",
    icon: "island",
    lightColor: Colors.common.lightIndigo,
    darkColor: Colors.common.darkIndigo,
  },
];

interface PropertyListingTypeStackProps {
  onPropertyTypeChange?: (propertyType: string) => void;
}

const PropertyListingTypeStack = ({
  onPropertyTypeChange,
}: PropertyListingTypeStackProps) => {
  const colorScheme = useColorScheme();
  const scrollViewRef = useRef<ScrollView>(null);
  const propertyTypesItemRef = useRef<Array<TouchableOpacity | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <ScrollView
      horizontal
      ref={scrollViewRef}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.contentContainerStyle}
    >
      {tabItems.map((item, index) => (
        <TouchableOpacity
          key={item.id}
          style={[
            styles.items,
            activeIndex === index
              ? {
                  borderBottomWidth: 2,
                  borderColor:
                    colorScheme === "light"
                      ? Colors.light.primary
                      : Colors.dark.primary,
                }
              : {},
          ]}
          activeOpacity={0.8}
          ref={(el) => (propertyTypesItemRef.current[index] = el)}
          onPress={() => {
            const selected = propertyTypesItemRef.current[index];

            setActiveIndex(index);

            if (selected && Platform.OS === "ios") {
              selected.measure((x) => {
                scrollViewRef.current?.scrollTo({
                  x: x - 16,
                  y: 0,
                  animated: true,
                });
              });
            }

            // TODO: This isn't working properly.
            if (selected && Platform.OS === "android") {
              selected.measure((x, y, width) => {
                scrollViewRef.current?.scrollTo({
                  x: index * width,
                  y: 0,
                  animated: true,
                });
              });
            }

            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            onPropertyTypeChange && onPropertyTypeChange(item.value);
          }}
        >
          <View
            style={[
              {
                backgroundColor:
                  colorScheme === "light"
                    ? Colors.common.gray["100"]
                    : Colors.common.gray["800"],
                shadowColor:
                  colorScheme === "light"
                    ? Colors.common.gray["900"]
                    : Colors.common.white,
              },
              styles.itemsContainer,
            ]}
          >
            <MaterialCommunityIcons
              name={item.icon as MaterialCommunityIconsProps["name"]}
              size={24}
              lightColor={item.lightColor}
              darkColor={item.darkColor}
            />
          </View>
          <Text fontWeight="semibold">{item.name}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  contentContainerStyle: {
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  itemsContainer: {
    padding: 10,
    borderRadius: 24,
    elevation: 1,
    shadowOpacity: 0.04,
    shadowRadius: 24,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
  items: {
    alignItems: "center",
    gap: 4,
    paddingBottom: 10,
  },
});

export default PropertyListingTypeStack;
