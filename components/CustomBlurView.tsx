import type { BlurViewProps } from "expo-blur";
import { BlurView } from "expo-blur";
import getBackgroundColor from "expo-blur/build/getBackgroundColor";
import React from "react";
import { Platform, View } from "react-native";

const LegacyAndroidBlurView: React.FC<BlurViewProps> = ({
  tint = "default",
  intensity = 50,
  style,
  ...props
}) => {
  const backgroundColor = getBackgroundColor(intensity, tint);
  return <View {...props} style={[style, { backgroundColor }]} />;
};

export const PBlurView: React.FC<BlurViewProps> =
  Platform.OS === "ios"
    ? (props) => <BlurView {...props} />
    : LegacyAndroidBlurView;
