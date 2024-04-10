/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import DefaultIonicons from "@expo/vector-icons/Ionicons";
import DefaultMaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import {
  SafeAreaView as DefaultSafeAreaView,
  Text as DefaultText,
  View as DefaultView,
  useColorScheme,
} from "react-native";
import Animated, { AnimatedProps } from "react-native-reanimated";

import Colors from "@/constants/Colors";

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

interface IoniconsBaseProps {
  name: React.ComponentProps<typeof DefaultIonicons>["name"];
  style?: React.ComponentProps<typeof DefaultIonicons>["style"];
  color?: string;
  size?: number;
}

interface MaterialCommunityIconsBaseProps {
  name: React.ComponentProps<typeof DefaultMaterialCommunityIcons>["name"];
  style?: React.ComponentProps<typeof DefaultMaterialCommunityIcons>["style"];
  color?: string;
  size?: number;
}

interface TextStyleBaseProps {
  fontSize?: number;
  fontWeight?: "default" | "semibold" | "bold";
}

export type TextProps = ThemeProps & DefaultText["props"] & TextStyleBaseProps;
export type ViewProps = ThemeProps & DefaultView["props"];
export type AnimatedViewProps = ThemeProps & AnimatedProps<ViewProps>;
export type SafeAreaViewProps = ThemeProps & DefaultSafeAreaView["props"];
export type IoniconsProps = ThemeProps & IoniconsBaseProps;
export type MaterialCommunityIconsProps = ThemeProps &
  MaterialCommunityIconsBaseProps;

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme() ?? "light";
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

export function Text(props: TextProps) {
  const {
    style,
    lightColor = Colors.light.text,
    darkColor = Colors.dark.text,
    fontWeight = "default",
    fontSize = 14,
    ...otherProps
  } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  let fontFamily = "Montserrat";

  if (fontWeight === "semibold") {
    fontFamily = "MontserratSemiBold";
  } else if (fontWeight === "bold") {
    fontFamily = "MontserratBold";
  }

  return (
    <DefaultText
      style={[{ color, fontFamily, fontSize }, style]}
      {...otherProps}
    />
  );
}

export function View(props: ViewProps) {
  const {
    style,
    lightColor = Colors.light.background,
    darkColor = Colors.dark.background,
    ...otherProps
  } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}

export function AnimatedView(props: AnimatedViewProps) {
  const {
    style,
    lightColor = Colors.light.background,
    darkColor = Colors.dark.background,
    ...otherProps
  } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return <Animated.View style={[{ backgroundColor }, style]} {...otherProps} />;
}

export const SafeAreaView = (props: SafeAreaViewProps) => {
  const {
    style,
    lightColor = Colors.light.background,
    darkColor = Colors.dark.background,
    ...otherProps
  } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return (
    <DefaultSafeAreaView style={[{ backgroundColor }, style]} {...otherProps} />
  );
};

export function Ionicons({
  name,
  style,
  color,
  size,
  lightColor,
  darkColor,
}: IoniconsProps) {
  const defaultColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "text"
  );
  return (
    <DefaultIonicons
      style={style}
      name={name}
      color={color ?? defaultColor}
      size={size}
    />
  );
}

export function MaterialCommunityIcons({
  name,
  style,
  color,
  size,
  lightColor,
  darkColor,
}: MaterialCommunityIconsProps) {
  const defaultColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "text"
  );
  return (
    <DefaultMaterialCommunityIcons
      style={style}
      name={name}
      color={color ?? defaultColor}
      size={size}
    />
  );
}
