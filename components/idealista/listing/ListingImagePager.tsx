import React, { useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import PagerView from "react-native-pager-view";
import ListingImages from "./ListingImages";

interface Image {
  id: number;
  url: string;
}

interface ImagePager {
  uri: Image[];
  height: number;
  showPageIndicator?: boolean;
  pageIndicatorType?: PageIndicatorType | string;
}

enum PageIndicatorType {
  INumber = "number",
  IDots = "dots",
}

const ListingImagePager: React.FC<ImagePager> = ({
  uri,
  height = 100,
  showPageIndicator = false,
  pageIndicatorType = PageIndicatorType.INumber,
}) => {
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const pagerRef = useRef<PagerView>(null);

  // console.log(JSON.stringify(uri, null, 2), height);

  return (
    <View style={styles.container}>
      <PagerView
        ref={pagerRef}
        style={{ ...styles.container, height: height }}
        initialPage={activeSlide}
        scrollEnabled={true}
        onPageSelected={(event) => setActiveSlide(event.nativeEvent.position)}
      >
        {uri
          ? uri.map((i: Image) => (
              <ListingImages
                key={i.id}
                mainImage={i.url}
                IMAGE_HEIGHT={height}
                animated={true}
              />
            ))
          : null}
      </PagerView>
      {showPageIndicator && (
        <View>
          {pageIndicatorType == PageIndicatorType.IDots && (
            <View style={styles.dotsContainer}>
              {uri.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.dot,
                    index === activeSlide && styles.activeDot,
                  ]}
                />
              ))}
            </View>
          )}

          {pageIndicatorType == PageIndicatorType.INumber && (
            <View style={styles.numberDotContainer}>
              <View style={styles.numberDot}>
                <Text style={styles.numberDotText}>
                  {activeSlide + 1} / {uri.length}
                </Text>
              </View>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  page: {
    justifyContent: "center",
    alignItems: "center",
  },
  dotsContainer: {
    bottom: 20,
    flexDirection: "row",
    justifyContent: "center",
  },
  dot: {
    backgroundColor: "#fff",
    margin: 5,
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  activeDot: {
    backgroundColor: "#000",
  },
  numberDotContainer: {
    position: "absolute", // Adjust positioning as needed
    bottom: 25,
    right: 15,
  },
  numberDot: {
    width: 45, // Adjust size as needed
    height: 20, // Adjust height for rectangle
    borderRadius: 2, // Minimal border radius for rectangle
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Slightly transparent background
    justifyContent: "center",
    alignItems: "center",
  },
  numberDotText: {
    color: "#fff", // White text color
    fontSize: 11,
    fontWeight: "normal", // For a modern look
  },
});

export default ListingImagePager;
