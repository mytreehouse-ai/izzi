import { Ionicons, Text, View } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import React from "react";
import { useColorScheme } from "react-native";

interface PropertyListingRatingProps {
  rating: number;
  iconSize?: number;
  fontSize?: number;
}

const PropertyListingRating: React.FC<PropertyListingRatingProps> = ({
  rating,
  iconSize = 16,
  fontSize = 14,
}) => {
  const colorScheme = useColorScheme();
  return (
    <View
      style={[
        defaultStyles.removedBackground,
        { flexDirection: "row", gap: 4 },
      ]}
    >
      <Ionicons
        name="star"
        size={iconSize}
        color={
          colorScheme === "light" ? Colors.light.yellow : Colors.dark.yellow
        }
      />
      <Text fontWeight="semibold" fontSize={fontSize}>
        {rating}
      </Text>
    </View>
  );
};

export default PropertyListingRating;
