import { Text, View } from "@/components/Themed";
import { defaultStyles } from "@/constants/Styles";
import React from "react";
import { StyleSheet } from "react-native";

const PageUnderConstruction = () => {
  return (
    <View
      style={[defaultStyles.container, style.pageUnserConstructionContainer]}
    >
      <Text fontWeight="bold" fontSize={24}>
        Page under construction
      </Text>
      <Text></Text>
      <Text fontSize={16} style={{ textAlign: "center" }}>
        We're working hard to bring you this page soon. Stay tuned!
      </Text>
    </View>
  );
};

const style = StyleSheet.create({
  pageUnserConstructionContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
});

export default PageUnderConstruction;
