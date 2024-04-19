import { Text, View } from "@/components/Themed";
import Colors from "@/constants/Colors";
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

interface ListingDescriptionProps {
  showDescriptionTitle?: boolean;
  description: string;
}

const ListingDescription: React.FC<ListingDescriptionProps> = ({
  showDescriptionTitle = true,
  description,
}) => {
  const [showMore, setShowMore] = useState(false);

  return (
    <View style={styles.container}>
      {showDescriptionTitle && (
        <Text fontWeight="semibold" fontSize={16}>
          Description
        </Text>
      )}
      <Text numberOfLines={showMore ? 0 : 5}>{description}</Text>
      <TouchableOpacity
        style={{ flexDirection: "row-reverse" }}
        onPress={() => setShowMore(!showMore)}
      >
        <Text
          fontSize={12}
          lightColor={Colors.light.primary}
          darkColor={Colors.dark.primary}
        >
          {showMore ? "Show less" : "Show more"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
});

export default ListingDescription;
