import React from "react";
import { Image, StyleSheet } from "react-native";

interface PropertyListingImageProps {
  imageUrl?: string;
}

const PropertyListingImage: React.FC<PropertyListingImageProps> = ({
  imageUrl,
}) => {
  return (
    <Image
      style={styles.image}
      defaultSource={require("@/assets/images/dark-placeholder.webp")}
      source={{ uri: imageUrl }}
    />
  );
};

const styles = StyleSheet.create({
  image: {
    height: 200,
    width: "auto",
    borderRadius: 12,
  },
});

export default PropertyListingImage;
