import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import Constants from "expo-constants";
import React, { useMemo } from "react";
import { StyleSheet, useColorScheme } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { View } from "./Themed";

const GooglePlacesSearch = () => {
  const colorScheme = useColorScheme();

  const textStyle = useMemo(
    () => ({
      fontSize: 16,
      fontFamily: "MontserratSemiBold",
      color: colorScheme === "light" ? Colors.light.text : Colors.dark.text,
    }),
    [colorScheme]
  );

  return (
    <View
      style={[defaultStyles.removedBackground, { height: "100%", zIndex: 1 }]}
    >
      <GooglePlacesAutocomplete
        styles={{
          textInput: textStyle,
          textInputContainer: {
            ...textStyle,
          },
          predefinedPlacesDescription: {
            fontFamily: "Montserrat",
          },
        }}
        placeholder="Search address"
        fetchDetails={true}
        onFail={(error) => console.error(error)}
        onPress={(data, details = null) => {
          console.log(JSON.stringify(data, null, 2));
          console.log(JSON.stringify(details, null, 2));
        }}
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
