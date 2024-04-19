import React from "react";
import { Image, Platform, PlatformIOSStatic } from "react-native";

const platformIOS = Platform as PlatformIOSStatic

interface ListingImagesProps {
  mainImage: string;
  IMAGE_HEIGHT: number;
}

const ListingImages: React.FC<ListingImagesProps> = ({
  mainImage,
  IMAGE_HEIGHT,
}) => {
  return (
    <Image
      style={{
        height: platformIOS.isPad ? IMAGE_HEIGHT * 2 : IMAGE_HEIGHT,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
      }}
      defaultSource={require("@/assets/images/dark-placeholder.webp")}
      source={{ uri: mainImage }}
    />
  );
};

export default ListingImages;
