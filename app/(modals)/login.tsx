import { Ionicons, Text, View } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { useWarmUpBrowser } from "@/hooks/useWarmUpBrowser";
import { useOAuth } from "@clerk/clerk-expo";
import { makeRedirectUri } from "expo-auth-session";
import { useRouter } from "expo-router";
import React from "react";
import { Image, Platform, StyleSheet, TouchableOpacity } from "react-native";

enum Strategy {
  Google = "oauth_google",
  Apple = "oauth_apple",
  Facebook = "oauth_facebook",
  LinkedIn = "oauth_linkedin",
}

const LoginPage = () => {
  const redirectUri = makeRedirectUri();
  const router = useRouter();

  useWarmUpBrowser();

  const { startOAuthFlow: googleAuth } = useOAuth({
    strategy: "oauth_google",
    redirectUrl: Platform.OS === "android" ? redirectUri : undefined,
  });
  const { startOAuthFlow: appleAuth } = useOAuth({
    strategy: "oauth_apple",
  });
  const { startOAuthFlow: facebookAuth } = useOAuth({
    strategy: "oauth_facebook",
  });
  const { startOAuthFlow: linkedinAuth } = useOAuth({
    strategy: "oauth_linkedin",
  });

  const onSelectAuth = async (strategy: Strategy) => {
    const selectedAuth = {
      [Strategy.Google]: googleAuth,
      [Strategy.Apple]: appleAuth,
      [Strategy.Facebook]: facebookAuth,
      [Strategy.LinkedIn]: linkedinAuth,
    }[strategy];

    try {
      const { createdSessionId, setActive } = await selectedAuth();
      if (createdSessionId) {
        setActive!({ session: createdSessionId });
        Platform.OS === "ios" ? router.back() : null;
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={[defaultStyles.container, styles.loginBtnContainer]}>
      <TouchableOpacity
        style={[styles.loginBtn, { backgroundColor: Colors.common.facebook }]}
        onPress={() => void onSelectAuth(Strategy.Facebook)}
        activeOpacity={0.7}
      >
        <Ionicons
          style={styles.iconLogo}
          name="logo-facebook"
          size={24}
          color={Colors.common.white}
        />
        <Text fontWeight="semibold" style={{ color: Colors.common.white }}>
          Continue With Facebook
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.loginBtn}
        onPress={() => void onSelectAuth(Strategy.Google)}
        activeOpacity={0.7}
      >
        <Image
          style={styles.imageLogo}
          source={require("@/assets/images/socials/linkedin.png")}
        />
        <Text
          style={{
            color: Colors.common.black,
          }}
          fontWeight="semibold"
        >
          Continue With LinkedIn
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.loginBtn}
        onPress={() => void onSelectAuth(Strategy.Google)}
        activeOpacity={0.7}
      >
        <Image
          style={styles.imageLogo}
          source={require("@/assets/images/socials/google.png")}
        />
        <Text
          style={{
            color: Colors.common.black,
          }}
          fontWeight="semibold"
        >
          Continue With Google
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.loginBtn}
        onPress={() => void onSelectAuth(Strategy.Google)}
        activeOpacity={0.7}
      >
        <Ionicons
          style={styles.iconLogo}
          name="logo-apple"
          size={24}
          color={Colors.common.black}
        />
        <Text
          style={{
            color: Colors.common.black,
          }}
          fontWeight="semibold"
        >
          Continue With Apple
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  loginBtnContainer: {
    padding: 16,
    gap: 16,
  },
  loginBtn: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.common.white,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
    padding: 12,
    gap: 5,
  },
  iconLogo: {
    position: "absolute",
    left: 10,
  },
  imageLogo: {
    position: "absolute",
    left: 10,
    width: 20,
    height: 20,
  },
});

export default LoginPage;
