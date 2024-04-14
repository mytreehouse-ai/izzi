import { defaultStyles } from "@/constants/Styles";
import { PropertyImage } from "@/interfaces/propertyListing";
import React from "react";
import { Image } from "react-native";
import PagerView from "react-native-pager-view";

interface ListingImagesProps {
  mainImage: string;
  propertyImages: PropertyImage[] | null;
  IMAGE_HEIGHT: number;
}

const ListingImages: React.FC<ListingImagesProps> = ({
  mainImage,
  propertyImages,
  IMAGE_HEIGHT,
}) => {
  console.log(propertyImages?.length);

  return (
    <PagerView
      style={[defaultStyles.container, { height: IMAGE_HEIGHT }]}
      initialPage={0}
    >
      {/* {[{ id: "main", url: mainImage }, ...(propertyImages ?? [])].map(
        (image, index) => (
          <Image
            key={image.id || index}
            style={{
              height: IMAGE_HEIGHT,
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
            }}
            defaultSource={require("@/assets/images/dark-placeholder.webp")}
            source={{ uri: image.url }}
          />
        )
      )} */}
      <Image
        key="123"
        style={{
          height: IMAGE_HEIGHT,
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
        }}
        defaultSource={require("@/assets/images/dark-placeholder.webp")}
        source={require("@/assets/images/real-state/avi-werde-8N46xC5YmKM-unsplash.jpg")}
      />
      <Image
        key="456"
        style={{
          height: IMAGE_HEIGHT,
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
        }}
        defaultSource={require("@/assets/images/dark-placeholder.webp")}
        source={require("@/assets/images/real-state/bailey-anselme-Bkp3gLygyeA-unsplash.jpg")}
      />
    </PagerView>
  );
};

export default ListingImages;
