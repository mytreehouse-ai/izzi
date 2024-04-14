import type { BlurViewProps } from "expo-blur";
import { BlurView } from "expo-blur";
import React from "react";
import { Platform } from "react-native";
import { View } from "./Themed";

export const RnBlurView: React.FC<BlurViewProps> =
  Platform.OS === "ios" ? (props) => <BlurView {...props} /> : View;
