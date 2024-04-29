import Colors from "@/constants/Colors";
import React from "react";
import { StyleSheet, TextInput, useColorScheme } from "react-native";

interface InputProps {
  type?: "text" | "number";
  value: string | number;
  maxLength?: number;
  multiline?: boolean;
  placeholder?: string;
  onChange: (data: string | number) => void;
}

const Input: React.FC<InputProps> = ({
  type = "text",
  value,
  maxLength,
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
          color: colorScheme === "light" ? Colors.light.text : Colors.dark.text,
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
      cursorColor={
        colorScheme === "light" ? Colors.light.primary : Colors.dark.primary
      }
      placeholder={placeholder}
      clearButtonMode="always"
      placeholderTextColor={
        colorScheme === "light"
          ? Colors.common.gray["300"]
          : Colors.common.gray["600"]
      }
      onChangeText={onChange}
    />
  ) : (
    <TextInput
      style={[
        styles.textInput,
        {
          color: colorScheme === "light" ? Colors.light.text : Colors.dark.text,
          backgroundColor:
            colorScheme === "light"
              ? Colors.light.background
              : Colors.common.gray["800"],
        },
      ]}
      maxLength={maxLength}
      keyboardType="numeric"
      value={String(value)}
      cursorColor={
        colorScheme === "light" ? Colors.light.primary : Colors.dark.primary
      }
      placeholder={placeholder}
      placeholderTextColor={
        colorScheme === "light"
          ? Colors.common.gray["300"]
          : Colors.common.gray["600"]
      }
      clearButtonMode="always"
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
