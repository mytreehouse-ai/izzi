import React from "react";
import { Dimensions, Image, Platform, PlatformIOSStatic, StyleSheet, View } from "react-native";
import Animated, { interpolate, useAnimatedStyle, useSharedValue } from "react-native-reanimated";
interface ListingImagesProps {
  mainImage: string;
  IMAGE_HEIGHT: number;
	animated?: boolean
}

const IMAGE_HEIGHT = 300;
const { width } = Dimensions.get("window");
const platformIOS = Platform as PlatformIOSStatic;

const ListingImages: React.FC<ListingImagesProps> = ({
  mainImage,
  IMAGE_HEIGHT = 300,
	animated = false
}) => {

	const scrollOffset = useSharedValue(0);
	const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-IMAGE_HEIGHT, 0, IMAGE_HEIGHT],
            [-IMAGE_HEIGHT / 2, 0, IMAGE_HEIGHT * 0.75]
          ),
        },
        {
          scale: interpolate(
            scrollOffset.value,
            [-IMAGE_HEIGHT, 0, IMAGE_HEIGHT],
            [2, 1, 1]
          ),
        },
      ],
    };
  });

  return (
		(animated == true
			? <Animated.Image
					defaultSource={require("@/assets/images/dark-placeholder.webp")}
					source={{ uri: mainImage}}
					style={[styles.image, imageAnimatedStyle]}
				/>
			: <View>
					<Image
						style={{
							height: platformIOS.isPad ? IMAGE_HEIGHT * 2 : IMAGE_HEIGHT,
							borderTopLeftRadius: 8,
							borderTopRightRadius: 8,
						}}
						defaultSource={require("@/assets/images/dark-placeholder.webp")}
						source={{ uri: mainImage }}
					/>
			</View>
		)
  );
};

const styles = StyleSheet.create({
	image : {
		height: platformIOS.isPad ? IMAGE_HEIGHT * 2 : IMAGE_HEIGHT,
		width: width
	}
});

export default ListingImages;
