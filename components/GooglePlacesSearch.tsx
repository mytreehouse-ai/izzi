import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import Constants from "expo-constants";
import React, { useMemo } from "react";
import { StyleSheet, useColorScheme } from "react-native";
import {
  GooglePlaceData,
  GooglePlaceDetail,
  GooglePlacesAutocomplete,
} from "react-native-google-places-autocomplete";
import { View } from "./Themed";

interface GooglePlacesSearchProps {
  onPress?: (data: GooglePlaceData, details: GooglePlaceDetail | null) => void;
}

const GooglePlacesSearch: React.FC<GooglePlacesSearchProps> = ({ onPress }) => {
  const colorScheme = useColorScheme();

  const backgroundColor = useMemo(
    () =>
      colorScheme === "light"
        ? Colors.light.background
        : Colors.common.gray["800"],
    [colorScheme]
  );

  const textStyle = useMemo(
    () => ({
      fontSize: 16,
      fontFamily: "MontserratSemiBold",
      color: colorScheme === "light" ? Colors.light.text : Colors.dark.text,
    }),
    [colorScheme]
  );

  return (
    <View style={[defaultStyles.removedBackground, { height: "100%" }]}>
      <GooglePlacesAutocomplete
        styles={{
          textInput: {
            ...textStyle,
            backgroundColor: backgroundColor,
          },
          textInputContainer: {
            ...textStyle,
            borderRadius: 8,
          },
          description: {
            fontFamily: "Montserrat",
            color: textStyle.color,
            fontSize: 14,
          },
          row: {
            backgroundColor: backgroundColor,
          },
        }}
        debounce={100}
        placeholder="Search address"
        textInputProps={{
          placeholderTextColor:
            colorScheme === "light"
              ? Colors.common.gray["300"]
              : Colors.common.gray["600"],
          cursorColor:
            colorScheme === "light"
              ? Colors.light.primary
              : Colors.dark.primary,
        }}
        fetchDetails={true}
        onFail={(error) => console.error(error)}
        onPress={(data, details = null) => onPress && onPress(data, details)}
        enablePoweredByContainer={false}
        query={{
          key: Constants.expoConfig?.extra?.googlePlacesApiKey ?? "",
          language: "en",
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default GooglePlacesSearch;
