import { ExternalLink } from "@/components/ExternalLink";
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
import Animated, {
  Easing,
  SlideInDown,
  SlideInRight,
  SlideOutDown,
  SlideOutLeft,
} from "react-native-reanimated";

const PropertyValuation = () => {
  const router = useRouter();
  const { user } = useUser();
  const { getToken } = useAuth();
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

  function isObjectValuesNotNullish<T extends object>(obj: T): boolean {
    return Object.values(obj).every(
      (value) =>
        value !== null && value !== undefined && value !== "" && value !== 0
    );
  }

  const { isLoading, data: valuation } = usePropertyValuationQuery({
    getToken,
    filter: propertyValuation.propertyDetails,
    enabled: propertyValuation.currentStepIndex === 1,
  });

  useEffect(() => {
    const testPassed = isObjectValuesNotNullish(
      propertyValuation.propertyDetails
    );
    setShowButton(testPassed);
  }, [propertyValuation.propertyDetails]);

  useEffect(() => {
    if (!isLoading && valuation) {
      nextStep();
    }
  }, [isLoading, valuation, propertyValuation.currentStepIndex]);

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
                    user_id: user?.id,
                    city: details ? details.vicinity : "",
                    address: details ? details.formatted_address : "",
                    google_places_data_id: data.place_id,
                    google_places_details_id: details?.place_id ?? "",
                  });
                }}
                // TODO: Hack to listen on text input clear event.
                onChangeText={(text) => {
                  if (
                    !text &&
                    isObjectValuesNotNullish(propertyValuation.propertyDetails)
                  ) {
                    updatePropertyDetails({
                      city: "",
                      address: "",
                      google_places_data_id: "",
                      google_places_details_id: "",
                    });
                  }
                }}
              />
            </AnimatedView>
          ) : null}
          {propertyValuation.currentStepIndex === 1 ? (
            <AnimatedView
              style={[
                defaultStyles.removedBackground,
                {
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 16,
                  gap: 12,
                },
              ]}
              entering={SlideInRight}
              exiting={SlideOutLeft}
            >
              <Text>Processing</Text>
              <Text>(Replace with a loader)</Text>
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
              <Text fontWeight="semibold" fontSize={18}>
                Valuation result
              </Text>
              <View style={{ padding: 14, borderRadius: 8, gap: 4 }}>
                <View style={{ flexDirection: "row", gap: 2 }}>
                  <Text fontSize={16}>Average sale price:</Text>
                  <Text fontWeight="semibold" fontSize={16}>
                    {valuation?.data.valuation.sale.average_price}
                  </Text>
                </View>
                <View style={{ flexDirection: "row", gap: 2 }}>
                  <Text fontSize={16}>Average sale price per sqm:</Text>
                  <Text fontWeight="semibold" fontSize={16}>
                    {valuation?.data.valuation.sale.price_per_sqm}
                  </Text>
                </View>
              </View>
              <View style={{ padding: 14, borderRadius: 8, gap: 4 }}>
                <View style={{ flexDirection: "row", gap: 2 }}>
                  <Text fontSize={16}>Average rent price:</Text>
                  <Text fontWeight="semibold" fontSize={16}>
                    {valuation?.data.valuation.rent.average_price}
                  </Text>
                </View>
                <View style={{ flexDirection: "row", gap: 2 }}>
                  <Text fontSize={16}>Average rent price per sqm:</Text>
                  <Text fontWeight="semibold" fontSize={16}>
                    {valuation?.data.valuation.rent.price_per_sqm}
                  </Text>
                </View>
              </View>
              <Text fontWeight="semibold" fontSize={18}>
                Similar properties
              </Text>
              <Animated.ScrollView
                style={[
                  defaultStyles.removedBackground,
                  { height: Dimensions.get("screen").height },
                ]}
                contentContainerStyle={{ paddingBottom: 450 }}
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={16}
              >
                <View style={[defaultStyles.removedBackground, { gap: 16 }]}>
                  {valuation?.data.valuation.sale.similar_properties
                    .concat(valuation?.data.valuation.rent.similar_properties)
                    .map((property) => (
                      <View
                        style={{ padding: 14, borderRadius: 8, gap: 8 }}
                        key={property.id}
                      >
                        <Text>{property.listing_title}</Text>
                        <View style={{ flexDirection: "row", gap: 4 }}>
                          <Text>Property price:</Text>
                          <Text fontWeight="semibold">
                            {property.price_formatted}
                          </Text>
                        </View>
                        <ExternalLink href={property.listing_url}>
                          View property
                        </ExternalLink>
                      </View>
                    ))}
                </View>
              </Animated.ScrollView>
            </AnimatedView>
          ) : null}
        </View>
      </View>
      {showButton && [0, 2].includes(propertyValuation.currentStepIndex) && (
        <AnimatedView
          key="1"
          style={[
            defaultStyles.footer,
            styles.footerExtra,
            {
              zIndex: 1,
              borderColor:
                colorScheme === "light"
                  ? Colors.common.gray["300"]
                  : Colors.common.gray["700"],
            },
          ]}
          entering={SlideInDown.duration(1000).easing(Easing.out(Easing.cubic))}
          exiting={SlideOutDown.duration(1000).easing(Easing.out(Easing.cubic))}
        >
          {propertyValuation.currentStepIndex === 0 && (
            <TouchableOpacity
              style={[
                styles.stepBtn,
                {
                  width: "90%",
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
          )}
          {propertyValuation.currentStepIndex === 2 && (
            <TouchableOpacity
              style={[
                styles.stepBtn,
                {
                  width: "90%",
                  backgroundColor:
                    colorScheme === "light"
                      ? Colors.common.emerald["200"]
                      : Colors.common.darkEmerald300,
                },
              ]}
              onPress={() => {
                resetPropertyValuation();
                setShowButton(false);
              }}
              activeOpacity={0.65}
            >
              <Text fontWeight="semibold" fontSize={16}>
                Valuate again
              </Text>
            </TouchableOpacity>
          )}
        </AnimatedView>
      )}
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
