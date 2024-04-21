import {
  AnimatedView,
  Ionicons,
  SafeAreaView,
  Text,
  View,
} from "@/components/Themed";
import PropertyCities from "@/components/idealista/filters/PropertyCity";
import PropertyTypes from "@/components/idealista/filters/PropertyTypes";
import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { useStore } from "@/store/slices";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import {
  Dimensions,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import * as Progress from "react-native-progress";
import { Easing, SlideInDown, SlideInRight } from "react-native-reanimated";

const PropertyValuation = () => {
  const router = useRouter();
  const { user } = useUser();
  const { isLoaded, isSignedIn } = useAuth();
  const colorScheme = useColorScheme();
  const store = useStore((state) => state.propertyValuation);
  const nextStep = useStore((action) => action.nextStep);
  const prevStep = useStore((action) => action.prevStep);
  const updatePropertyDetails = useStore(
    (action) => action.updatePropertyDetails
  );

  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      updatePropertyDetails({ userId: user.id });
    }
  }, [isLoaded, isSignedIn]);

  function onChanged(text: string) {
    let newText = "";
    let numbers = "0123456789";

    for (var i = 0; i < text.length; i++) {
      if (numbers.indexOf(text[i]) > -1) {
        newText = newText + text[i];
      } else {
        alert("Please enter numbers only.");
      }
    }

    updatePropertyDetails({ propertySize: Number(newText) });
  }

  return (
    <View style={defaultStyles.container}>
      <SafeAreaView
        style={defaultStyles.safeAreaViewContainer}
        lightColor={Colors.light.primary}
        darkColor={Colors.dark.primary}
      >
        <View
          style={[
            defaultStyles.removedBackground,
            {
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 16,
              paddingBottom: 16,
            },
          ]}
        >
          <TouchableOpacity
            style={{ position: "absolute", left: 16, bottom: 16, zIndex: 1 }}
            onPress={() => router.back()}
            activeOpacity={0.75}
          >
            <Ionicons name="arrow-back" size={24} />
          </TouchableOpacity>
          <View
            style={[
              defaultStyles.removedBackground,
              {
                flex: 1,
                alignItems: "center",
                alignContent: "center",
              },
            ]}
          >
            <Text fontWeight="semibold" fontSize={18}>
              {store.steps[store.currentStepIndex].title}
            </Text>
          </View>
        </View>
      </SafeAreaView>
      <View
        style={defaultStyles.container}
        lightColor={Colors.common.gray["100"]}
      >
        <View style={[defaultStyles.removedBackground, { flex: 1 }]}>
          <Progress.Bar
            height={12}
            borderRadius={0}
            borderWidth={0}
            progress={store.steps[store.currentStepIndex].progress}
            color={
              colorScheme === "light"
                ? Colors.common.emerald["200"]
                : Colors.common.darkEmerald300
            }
            width={Dimensions.get("screen").width}
          />
          {store.currentStepIndex === 0 ? (
            <AnimatedView
              style={[
                defaultStyles.removedBackground,
                { padding: 16, gap: 12 },
              ]}
              entering={SlideInRight}
            >
              <Text fontWeight="semibold" fontSize={16}>
                Property type
              </Text>
              <PropertyTypes
                forPropertyValuation={true}
                onChange={(propertyType) =>
                  updatePropertyDetails({ propertyType })
                }
              />
              <Text fontWeight="semibold" fontSize={16}>
                Property size
              </Text>
              <TextInput
                style={styles.textInput}
                keyboardType="numeric"
                maxLength={5}
                value={
                  store.propertyDetails.propertySize
                    ? String(store.propertyDetails.propertySize)
                    : ""
                }
                onChangeText={onChanged}
              />
              <Text fontWeight="semibold" fontSize={16}>
                Address
              </Text>
              <TextInput
                style={styles.textInput}
                onChangeText={(text) =>
                  updatePropertyDetails({ address: text })
                }
              />
              <Text fontWeight="semibold" fontSize={16}>
                City
              </Text>
              <PropertyCities
                forPropertyValuation={true}
                onChange={(city) => updatePropertyDetails({ city })}
              />
            </AnimatedView>
          ) : null}
          {store.currentStepIndex === 1 ? (
            <AnimatedView
              style={[
                defaultStyles.removedBackground,
                { padding: 16, gap: 12 },
              ]}
              entering={SlideInRight}
            >
              <Text>Processing</Text>
            </AnimatedView>
          ) : null}
          {store.currentStepIndex === 2 ? (
            <AnimatedView
              style={[
                defaultStyles.removedBackground,
                { padding: 16, gap: 12 },
              ]}
              entering={SlideInRight}
            >
              <Text>Valuation result</Text>
            </AnimatedView>
          ) : null}
          <AnimatedView
            style={[
              defaultStyles.footer,
              styles.footerExtra,
              {
                borderColor:
                  colorScheme === "light"
                    ? Colors.common.gray["300"]
                    : Colors.common.gray["700"],
              },
            ]}
            entering={SlideInDown.duration(1000).easing(
              Easing.out(Easing.cubic)
            )}
          >
            {store.currentStepIndex === 0 ? null : (
              <TouchableOpacity
                style={[
                  styles.stepBtn,
                  {
                    width: "45%",
                    backgroundColor:
                      colorScheme === "light"
                        ? Colors.common.emerald["200"]
                        : Colors.common.darkEmerald300,
                  },
                ]}
                onPress={prevStep}
                activeOpacity={0.65}
              >
                <Text fontWeight="semibold" fontSize={16}>
                  Previous Step
                </Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={[
                styles.stepBtn,
                {
                  width: store.currentStepIndex === 0 ? "90%" : "45%",
                  backgroundColor:
                    colorScheme === "light"
                      ? Colors.common.emerald["200"]
                      : Colors.common.darkEmerald300,
                },
              ]}
              onPress={nextStep}
              activeOpacity={0.65}
            >
              <Text fontWeight="semibold" fontSize={16}>
                Next Step
              </Text>
            </TouchableOpacity>
          </AnimatedView>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  stepBtn: {
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  footerExtra: {
    height: 80,
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
  },
  textInput: {
    backgroundColor: Colors.common.white,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    fontFamily: "MontserratSemiBold",
  },
});

export default PropertyValuation;
