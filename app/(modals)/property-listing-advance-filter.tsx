import { RnBlurView } from "@/components/RnBlurView";
import { Text, View } from "@/components/Themed";
import React from "react";
import {
  Dimensions,
  Image,
  TouchableOpacity,
  useColorScheme,
} from "react-native";

const { height, width } = Dimensions.get("window");

const advanceFilters = [
  {
    id: 1,
    title: "Draw your area",
    description: "Draw your search area on the map",
    image: require("@/assets/images/real-state/avi-werde-8N46xC5YmKM-unsplash.jpg"),
  },
  {
    id: 2,
    title: "Search on the map",
    description: "Move on the map to see available properties",
    image: require("@/assets/images/real-state/bailey-anselme-Bkp3gLygyeA-unsplash.jpg"),
  },
  {
    id: 3,
    title: "Around you",
    description: "View available properties near you",
    image: require("@/assets/images/real-state/dan-gold-4HG3Ca3EzWw-unsplash.jpg"),
  },
  {
    id: 4,
    title: "Search by phone",
    description: "Insert a phone number to see the property it corresponds to",
    image: require("@/assets/images/real-state/daniel-barnes-RKdLlTyjm5g-unsplash.jpg"),
  },
];

const PropertyListingAdvanceFilterPage = () => {
  const colorScheme = useColorScheme();

  return (
    <RnBlurView
      intensity={75}
      tint={colorScheme as "light" | "dark"}
      style={{ width, height, padding: 8, gap: 16 }}
    >
      {advanceFilters.map((filter) => (
        <TouchableOpacity key={filter.id} activeOpacity={0.8}>
          <View
            style={{
              flexDirection: "row",
              gap: 8,
              borderRadius: 8,
              width: width - 16,
            }}
          >
            <Image
              style={{
                width: 100,
                height: 100,
                borderTopLeftRadius: 8,
                borderBottomLeftRadius: 8,
              }}
              defaultSource={filter.image}
              source={filter.image}
            />
            <View
              style={{
                gap: 6,
                justifyContent: "center",
                flexShrink: 1,
                borderRadius: 8,
              }}
            >
              <Text fontWeight="semibold">{filter.title}</Text>
              <Text fontSize={12}>{filter.description}</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </RnBlurView>
  );
};

export default PropertyListingAdvanceFilterPage;
