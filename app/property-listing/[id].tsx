import { AnimatedView, Ionicons, Text, View } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { usePropertyListingQuery } from "@/hooks/usePropertyListingQuery";
import { useAuth } from "@clerk/clerk-expo";
import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useLayoutEffect } from "react";
import {
  Dimensions,
  Image,
  Share,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import {
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

const IMAGE_HEIGHT = 300;
const { width } = Dimensions.get("window");

const PropertyListing = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const scrollOffset = useSharedValue(0);
  const { getToken } = useAuth();

  const { isLoading, data: propertyListing } = usePropertyListingQuery(
    getToken,
    Number(id)
  );

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollOffset.value = event.contentOffset.y;
    },
  });

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

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollOffset.value, [0, IMAGE_HEIGHT / 1.5], [0, 1]),
    };
  });

  const sharePropertyListing = async (url: string) => {
    try {
      await Share.share({
        message: `Check out this listing on: ${url}`,
      });
    } catch (error) {
      console.error(error);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackground: () => (
        <AnimatedView
          style={[headerAnimatedStyle, styles.animatedHeaderContainer]}
        />
      ),
      headerRight: () => (
        <View style={styles.headerBtnContainer}>
          <TouchableOpacity
            style={[styles.headerRoundBtn]}
            onPress={async () => await sharePropertyListing("")}
          >
            <Ionicons
              name="share-outline"
              size={22}
              color={Colors.common.gray["900"]}
            />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.headerRoundBtn]}>
            <Ionicons
              name="heart-outline"
              size={22}
              color={Colors.common.gray["900"]}
            />
          </TouchableOpacity>
        </View>
      ),
      headerLeft: () => (
        <TouchableOpacity
          style={[styles.headerRoundBtn]}
          onPress={navigation.goBack}
        >
          <Ionicons
            name="arrow-back"
            size={22}
            color={Colors.common.gray["900"]}
          />
        </TouchableOpacity>
      ),
    });
  }, []);

  return (
    <View style={defaultStyles.container}>
      <Image
        defaultSource={require("@/assets/images/dark-placeholder.webp")}
        source={{ uri: propertyListing?.data.main_image_url }}
        style={styles.image}
      />
      <View style={[defaultStyles.container, { padding: 8 }]}>
        <Text>Description here...</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  animatedHeaderContainer: {
    height: 100,
  },
  headerBtnContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    gap: 10,
  },
  headerRoundBtn: {
    width: 40,
    height: 40,
    borderRadius: 80,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.common.white,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.common.gray["500"],
  },
  image: {
    height: IMAGE_HEIGHT,
    width,
  },
});

export default PropertyListing;
