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
  return (
    <PagerView
      style={[defaultStyles.container, { height: IMAGE_HEIGHT }]}
      initialPage={0}
    >
      {[{ id: "main", url: mainImage }, ...(propertyImages ?? [])].map(
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
      )}
    </PagerView>
  );
};

export default ListingImages;
