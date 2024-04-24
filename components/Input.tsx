import Colors from "@/constants/Colors";
import React from "react";
import { StyleSheet, TextInput, useColorScheme } from "react-native";

interface InputProps {
  type?: "text" | "number";
  value: string | number;
  multiline?: boolean;
  placeholder?: string;
  onChange: (data: string | number) => void;
}

const Input: React.FC<InputProps> = ({
  type = "text",
  value,
  multiline = false,
  placeholder,
  onChange,
}) => {
  const colorScheme = useColorScheme();

  return type === "text" ? (
    <TextInput
      style={[
        styles.textInput,
        {
          height: multiline ? 150 : "auto",
          backgroundColor:
            colorScheme === "light"
              ? Colors.light.background
              : Colors.common.gray["800"],
        },
      ]}
      value={String(value)}
      multiline={multiline}
      numberOfLines={multiline ? 5 : 1}
      placeholder={placeholder}
      onChangeText={onChange}
    />
  ) : (
    <TextInput
      style={[
        styles.textInput,
        {
          backgroundColor:
            colorScheme === "light"
              ? Colors.light.background
              : Colors.common.gray["800"],
        },
      ]}
      maxLength={5}
      keyboardType="numeric"
      value={String(value)}
      placeholder={placeholder}
      onChangeText={(text) => {
        let newText = "";
        let numbers = "0123456789";

        for (var i = 0; i < text.length; i++) {
          if (numbers.indexOf(text[i]) > -1) {
            newText = newText + text[i];
          } else {
            alert("Please enter numbers only.");
          }
        }

        onChange(newText);
      }}
    />
  );
};

const styles = StyleSheet.create({
  textInput: {
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    fontFamily: "MontserratSemiBold",
  },
});

export default Input;
