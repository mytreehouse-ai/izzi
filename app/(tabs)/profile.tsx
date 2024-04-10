import { SafeAreaView, View } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { useAuth, useUser } from "@clerk/clerk-expo";
import React from "react";
import {
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

const profile = () => {
  const { user } = useUser();
  const { signOut, isSignedIn, getToken } = useAuth();

  return (
    <SafeAreaView
      style={[defaultStyles.container, styles.safeAreaViewContainer]}
    >
      <Text>profile</Text>
      <TouchableOpacity>
        <Text>Singout</Text>
      </TouchableOpacity>
      <View
        style={defaultStyles.btn}
        lightColor={Colors.common.gray["100"]}
        darkColor={Colors.common.gray["800"]}
      >
        <Text>{user?.fullName}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaViewContainer: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});

export default profile;
