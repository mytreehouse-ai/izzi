import { Text, View } from "@/components/Themed";
import { FlashList } from "@shopify/flash-list";
import React from "react";
import { StyleSheet } from "react-native";

const ListingFeatures = () => {
  return (
    <View style={styles.container}>
      <Text fontWeight="semibold" fontSize={16}>
        Basic features
      </Text>
      <FlashList
        data={[
          { key: "Swimming Pool" },
          { key: "Garden Area" },
          { key: "24/7 Security" },
          { key: "Gym Facility" },
          { key: "Parking Space" },
        ]}
        estimatedItemSize={20}
        renderItem={({ item }) => {
          return (
            <View style={{ marginBottom: 8 }}>
              <Text>{`\u2022 ${item.key}`}</Text>
            </View>
          );
        }}
      />
      <Text fontWeight="semibold" fontSize={16}>
        Equipment
      </Text>
      <FlashList
        data={[
          { key: "High-Speed Internet" },
          { key: "Smart Home Technology" },
          { key: "Energy Efficient Appliances" },
        ]}
        estimatedItemSize={20}
        renderItem={({ item }) => {
          return (
            <View style={{ marginBottom: 8 }}>
              <Text>{`\u2022 ${item.key}`}</Text>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 200,
    gap: 8,
  },
});

export default ListingFeatures;
