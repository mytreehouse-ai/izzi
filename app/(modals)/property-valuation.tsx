import Input from "@/components/Input";
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
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import * as Progress from "react-native-progress";
import {
  Easing,
  SlideInDown,
  SlideInRight,
  SlideOutLeft,
} from "react-native-reanimated";

const PropertyValuation = () => {
  const router = useRouter();
  const { user } = useUser();
  const { isLoaded, isSignedIn } = useAuth();
  const colorScheme = useColorScheme();
  const propertyValuation = useStore((state) => state.propertyValuation);
  const nextStep = useStore((action) => action.propertyValuationNextStep);
  const prevStep = useStore((action) => action.propertyValuationPrevStep);
  const updatePropertyDetails = useStore(
    (action) => action.updatePropertyDetails
  );

  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      updatePropertyDetails({ userId: user.id });
    }
  }, [isLoaded, isSignedIn]);

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
            style={{
              position: "absolute",
              left: 16,
              bottom: 14,
              zIndex: 1,
            }}
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
              {
                propertyValuation.steps[propertyValuation.currentStepIndex]
                  .title
              }
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
            progress={
              propertyValuation.steps[propertyValuation.currentStepIndex]
                .progress
            }
            color={
              colorScheme === "light"
                ? Colors.common.emerald["200"]
                : Colors.common.darkEmerald300
            }
            width={Dimensions.get("screen").width}
          />
          {propertyValuation.currentStepIndex === 0 ? (
            <AnimatedView
              style={[
                defaultStyles.removedBackground,
                { padding: 16, gap: 12 },
              ]}
              entering={SlideInRight}
              exiting={SlideOutLeft}
            >
              <Text fontWeight="semibold" fontSize={16}>
                Property type
              </Text>
              <PropertyTypes
                value={propertyValuation.propertyDetails.propertyType}
                onChange={(propertyType) =>
                  updatePropertyDetails({ propertyType })
                }
              />
              <Text fontWeight="semibold" fontSize={16}>
                Property size
              </Text>
              <Input
                type="number"
                value={propertyValuation.propertyDetails.propertySize}
                onChange={(data) =>
                  updatePropertyDetails({ propertySize: Number(data) })
                }
              />
              <Text fontWeight="semibold" fontSize={16}>
                Address
              </Text>
              <Input
                value={propertyValuation.propertyDetails.address}
                onChange={(data) =>
                  updatePropertyDetails({ address: String(data) })
                }
              />
              <Text fontWeight="semibold" fontSize={16}>
                City
              </Text>
              <PropertyCities
                objKey="title"
                value={propertyValuation.propertyDetails.city}
                onChange={(city) => updatePropertyDetails({ city })}
              />
              <Text>
                {JSON.stringify(propertyValuation.propertyDetails, null, 2)}
              </Text>
            </AnimatedView>
          ) : null}
          {propertyValuation.currentStepIndex === 1 ? (
            <AnimatedView
              style={[
                defaultStyles.removedBackground,
                { padding: 16, gap: 12 },
              ]}
              entering={SlideInRight}
              exiting={SlideOutLeft}
            >
              <Text>Processing</Text>
            </AnimatedView>
          ) : null}
          {propertyValuation.currentStepIndex === 2 ? (
            <AnimatedView
              style={[
                defaultStyles.removedBackground,
                { padding: 16, gap: 12 },
              ]}
              entering={SlideInRight}
              exiting={SlideOutLeft}
            >
              <Text>Valuation result</Text>
            </AnimatedView>
          ) : null}
        </View>
      </View>
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
        entering={SlideInDown.duration(1000).easing(Easing.out(Easing.cubic))}
      >
        {propertyValuation.currentStepIndex === 0 ? null : (
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
              width: propertyValuation.currentStepIndex === 0 ? "90%" : "45%",
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
});

export default PropertyValuation;
