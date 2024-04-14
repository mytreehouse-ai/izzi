import { AnimatedView, View } from "@/components/Themed";
import { MotiView } from "moti";
import { Skeleton } from "moti/skeleton";
import React from "react";
import { useColorScheme } from "react-native";
import { FadeInRight, FadeOutLeft } from "react-native-reanimated";

const Loader = () => {
  const colorScheme = useColorScheme();

  return (
    <AnimatedView
      style={{ gap: 10, paddingVertical: 8 }}
      entering={FadeInRight}
      exiting={FadeOutLeft}
    >
      <MotiView
        style={{ gap: 10 }}
        animate={{ backgroundColor: "transparent" }}
      >
        <Skeleton
          colorMode={colorScheme as "light" | "dark"}
          width="100%"
          height={300}
        >
          {true ? null : <View />}
        </Skeleton>
        <Skeleton
          colorMode={colorScheme as "light" | "dark"}
          width="100%"
          height={30}
        >
          {true ? null : <View />}
        </Skeleton>
        <Skeleton
          colorMode={colorScheme as "light" | "dark"}
          width="100%"
          height={30}
        >
          {true ? null : <View />}
        </Skeleton>
      </MotiView>
    </AnimatedView>
  );
};

export default Loader;
