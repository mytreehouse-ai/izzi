import GooglePlacesSearch from "@/components/GooglePlacesSearch";
import Input from "@/components/Input";
import {
  AnimatedView,
  Ionicons,
  SafeAreaView,
  Text,
  View,
} from "@/components/Themed";
import PropertyTypes from "@/components/idealista/filters/PropertyTypes";
import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { usePropertyValuationQuery } from "@/hooks/usePropertyValuationQuery";
import { useStore } from "@/store/slices";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
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
  const { isLoaded, isSignedIn, getToken } = useAuth();
  const colorScheme = useColorScheme();
  const [showButton, setShowButton] = useState(false);
  const propertyValuation = useStore((state) => state.propertyValuation);
  const nextStep = useStore((action) => action.propertyValuationNextStep);
  const prevStep = useStore((action) => action.propertyValuationPrevStep);
  const resetPropertyValuation = useStore(
    (action) => action.resetPropertyValuation
  );
  const updatePropertyDetails = useStore(
    (action) => action.updatePropertyDetails
  );

  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      updatePropertyDetails({ user_id: user.id });
    }
  }, [isLoaded, isSignedIn]);

  function isObjectValuesNotNullish<T extends object>(obj: T): boolean {
    return Object.values(obj).every(
      (value) => value !== null && value !== undefined && value !== ""
    );
  }

  const { isLoading, isSuccess, data } = usePropertyValuationQuery({
    getToken,
    filter: propertyValuation.propertyDetails,
    enabled: propertyValuation.currentStepIndex === 1,
  });

  useEffect(() => {
    const testPassed = isObjectValuesNotNullish(
      propertyValuation.propertyDetails
    );

    console.log(propertyValuation.propertyDetails);
    console.log(testPassed);

    setShowButton(testPassed);
  }, [propertyValuation.propertyDetails]);

  useEffect(() => {
    if (!isLoading && isSuccess) {
      nextStep();
    }
  }, [isLoading, isSuccess]);

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
            onPress={() => {
              router.back();
              resetPropertyValuation();
            }}
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
                objKey="title"
                value={propertyValuation.propertyDetails.property_type}
                onChange={(propertyType) =>
                  updatePropertyDetails({ property_type: propertyType })
                }
              />
              <Text fontWeight="semibold" fontSize={16}>
                Property size
              </Text>
              <Input
                type="number"
                value={propertyValuation.propertyDetails.sqm}
                onChange={(data) =>
                  updatePropertyDetails({ sqm: Number(data) })
                }
              />
              <Text fontWeight="semibold" fontSize={16}>
                Property address
              </Text>
              <GooglePlacesSearch
                onPress={(data, details) => {
                  updatePropertyDetails({
                    city: details ? details.vicinity : "",
                    address: details ? details.formatted_address : "",
                    google_places_data_id: data.place_id,
                    google_places_details_id: details?.place_id ?? "",
                  });
                }}
              />
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
              <Text>{JSON.stringify(data, null, 2)}</Text>
            </AnimatedView>
          ) : null}
        </View>
      </View>
      {showButton && [0, 2].includes(propertyValuation.currentStepIndex) ? (
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
          {propertyValuation.currentStepIndex === 0 ? (
            <TouchableOpacity
              style={[
                styles.stepBtn,
                {
                  width: "95%",
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
                Valuate my property
              </Text>
            </TouchableOpacity>
          ) : null}
          {propertyValuation.currentStepIndex === 2 ? (
            <TouchableOpacity
              style={[
                styles.stepBtn,
                {
                  width: "95%",
                  backgroundColor:
                    colorScheme === "light"
                      ? Colors.common.emerald["200"]
                      : Colors.common.darkEmerald300,
                },
              ]}
              onPress={() => {
                resetPropertyValuation();
                setShowButton(false); // Explicitly set to false to ensure button state is reset correctly
              }}
              activeOpacity={0.65}
            >
              <Text fontWeight="semibold" fontSize={16}>
                Valuate again
              </Text>
            </TouchableOpacity>
          ) : null}
        </AnimatedView>
      ) : null}
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
