import GooglePlacesSearch from "@/components/GooglePlacesSearch";
import Input from "@/components/Input";
import {
  AnimatedView,
  Ionicons,
  MaterialCommunityIcons,
  SafeAreaView,
  Text,
  View,
} from "@/components/Themed";
import PropertyTypes from "@/components/idealista/filters/PropertyTypes";
import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { useStore } from "@/store/slices";
import { useRouter } from "expo-router";
import React, { useEffect, useMemo, useReducer } from "react";
import {
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import * as Progress from "react-native-progress";
import RadioGroup, { RadioButtonProps } from "react-native-radio-buttons-group";
import Animated, {
  Easing,
  SlideInDown,
  SlideInRight,
  SlideOutLeft,
} from "react-native-reanimated";

type PropertyListingAction =
  | {
      type:
        | "ADD_BEDROOM"
        | "REMOVE_BEDROOM"
        | "ADD_BATHROOM"
        | "REMOVE_BATHROOM";
    }
  | { type: "SET_LISTING_TYPE_ID"; payload: string }
  | { type: "SET_DEFAULT"; payload?: { bedrooms: number; bathrooms: number } };

interface PropertyListingState {
  bedrooms: number;
  bathrooms: number;
  selectedListingtypeId: string;
}

const initialState: PropertyListingState = {
  bedrooms: 0,
  bathrooms: 1,
  selectedListingtypeId: "1",
};

function propertyListingReducer(
  state: PropertyListingState,
  action: PropertyListingAction
): PropertyListingState {
  switch (action.type) {
    case "ADD_BEDROOM":
      return { ...state, bedrooms: state.bedrooms + 1 };
    case "REMOVE_BEDROOM":
      return { ...state, bedrooms: Math.max(0, state.bedrooms - 1) };
    case "ADD_BATHROOM":
      return { ...state, bathrooms: state.bathrooms + 1 };
    case "REMOVE_BATHROOM":
      return { ...state, bathrooms: Math.max(1, state.bathrooms - 1) };
    case "SET_LISTING_TYPE_ID":
      return { ...state, selectedListingtypeId: action.payload };
    case "SET_DEFAULT":
      return {
        ...state,
        bedrooms: action.payload?.bedrooms ?? state.bedrooms,
        bathrooms: action.payload?.bathrooms ?? state.bathrooms,
      };
    default:
      return state;
  }
}

const PropertyListingCreate = () => {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const store = useStore((state) => state.propertyListingCreate);
  const [state, dispatch] = useReducer(propertyListingReducer, initialState);
  const nextStep = useStore((action) => action.propertyListingCreateNextStep);
  const prevStep = useStore((action) => action.propertyListingCreatePrevStep);

  const newPropertyListingUpdatePropertyDetails = useStore(
    (action) => action.newPropertyListingUpdatePropertyDetails
  );

  const checkbox = useMemo(
    () => ({
      fillColor:
        colorScheme === "light" ? Colors.light.primary : Colors.dark.primary,
      textStyle: {
        textDecorationLine: "none",
        fontFamily: "MontserratSemiBold",
        color: colorScheme === "light" ? Colors.light.text : Colors.dark.text,
      },
    }),
    [colorScheme]
  );

  const radioButtons: RadioButtonProps[] = useMemo(
    () => [
      {
        id: "1",
        label: "Sale",
        value: "for-sale",
        borderColor: checkbox.fillColor,
        color: checkbox.fillColor,
        labelStyle: {
          color: checkbox.textStyle.color,
          fontSize: 16,
          fontFamily: "MontserratSemiBold",
        },
      },
      {
        id: "2",
        label: "Rent",
        value: "for-rent",
        borderColor: checkbox.fillColor,
        color: checkbox.fillColor,
        labelStyle: {
          color: checkbox.textStyle.color,
          fontSize: 16,
          fontFamily: "MontserratSemiBold",
        },
      },
    ],
    [colorScheme]
  );

  useEffect(() => {
    dispatch({
      type: "SET_DEFAULT",
      payload: {
        bedrooms: store.propertyDetails.bedrooms,
        bathrooms: store.propertyDetails.bathrooms,
      },
    });
  }, []);

  useEffect(() => {
    newPropertyListingUpdatePropertyDetails({
      listingType: radioButtons.find(
        (listingType) => listingType.id === state.selectedListingtypeId
      )?.value,
      bedrooms: state.bedrooms,
      bathrooms: state.bathrooms,
    });
  }, [state]);

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
              {store.steps[store.currentStepIndex].title}
            </Text>
          </View>
        </View>
      </SafeAreaView>
      <View
        style={defaultStyles.container}
        lightColor={Colors.common.gray["100"]}
      >
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
            style={[defaultStyles.removedBackground, styles.formContainer]}
            entering={SlideInRight}
            exiting={SlideOutLeft}
          >
            <Text fontWeight="semibold" fontSize={16}>
              Property address
            </Text>
            <GooglePlacesSearch />
          </AnimatedView>
        ) : null}
        {store.currentStepIndex === 1 ? (
          <AnimatedView
            style={defaultStyles.removedBackground}
            entering={SlideInRight}
            exiting={SlideOutLeft}
          >
            <Animated.ScrollView
              style={[
                defaultStyles.removedBackground,
                { height: Dimensions.get("screen").height },
              ]}
              contentContainerStyle={{ paddingBottom: 200 }}
              showsVerticalScrollIndicator={false}
              scrollEventThrottle={16}
            >
              <View
                style={[defaultStyles.removedBackground, styles.formContainer]}
              >
                <Text fontWeight="semibold" fontSize={16}>
                  Select property type
                </Text>
                <PropertyTypes
                  value={store.propertyDetails.propertyType}
                  onChange={(propertyType) => {
                    newPropertyListingUpdatePropertyDetails({ propertyType });
                  }}
                />
                <Text fontWeight="semibold" fontSize={16}>
                  Listing type
                </Text>
                <RadioGroup
                  radioButtons={radioButtons}
                  containerStyle={{
                    alignItems: "flex-start",
                  }}
                  labelStyle={{
                    fontSize: 16,
                    fontFamily: "MontserratSemiBold",
                    color:
                      colorScheme === "light"
                        ? Colors.light.text
                        : Colors.dark.text,
                  }}
                  onPress={(selectedId) =>
                    dispatch({
                      type: "SET_LISTING_TYPE_ID",
                      payload: selectedId,
                    })
                  }
                  selectedId={state.selectedListingtypeId}
                />
                <Text fontWeight="semibold" fontSize={16}>
                  Bedrooms
                </Text>
                <View
                  style={[
                    defaultStyles.removedBackground,
                    {
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    },
                  ]}
                >
                  <TouchableOpacity
                    style={{
                      padding: 10,
                      borderRadius: 8,
                      backgroundColor:
                        colorScheme === "light"
                          ? Colors.common.emerald["200"]
                          : Colors.common.darkEmerald300,
                    }}
                    onPress={() => dispatch({ type: "REMOVE_BEDROOM" })}
                  >
                    <MaterialCommunityIcons name="minus" size={24} />
                  </TouchableOpacity>
                  <Text fontWeight="semibold" fontSize={16}>
                    {store.propertyDetails.bedrooms ?? state.bedrooms}
                  </Text>
                  <TouchableOpacity
                    style={{
                      padding: 10,
                      borderRadius: 8,
                      backgroundColor:
                        colorScheme === "light"
                          ? store.propertyDetails.bedrooms === 6
                            ? Colors.common.emerald["100"]
                            : Colors.common.emerald["200"]
                          : Colors.common.darkEmerald300,
                    }}
                    disabled={store.propertyDetails.bedrooms === 6}
                    onPress={() => dispatch({ type: "ADD_BEDROOM" })}
                  >
                    <MaterialCommunityIcons name="plus" size={24} />
                  </TouchableOpacity>
                </View>
                <Text fontWeight="semibold" fontSize={16}>
                  Bathrooms
                </Text>
                <View
                  style={[
                    defaultStyles.removedBackground,
                    {
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    },
                  ]}
                >
                  <TouchableOpacity
                    style={{
                      padding: 10,
                      borderRadius: 8,
                      backgroundColor:
                        colorScheme === "light"
                          ? Colors.common.emerald["200"]
                          : Colors.common.darkEmerald300,
                    }}
                    onPress={() => dispatch({ type: "REMOVE_BATHROOM" })}
                  >
                    <MaterialCommunityIcons name="minus" size={24} />
                  </TouchableOpacity>
                  <Text fontWeight="semibold" fontSize={16}>
                    {store.propertyDetails.bathrooms}
                  </Text>
                  <TouchableOpacity
                    style={{
                      padding: 10,
                      borderRadius: 8,
                      backgroundColor:
                        colorScheme === "light"
                          ? store.propertyDetails.bathrooms === 6
                            ? Colors.common.emerald["100"]
                            : Colors.common.emerald["200"]
                          : Colors.common.darkEmerald300,
                    }}
                    disabled={store.propertyDetails.bathrooms === 6}
                    onPress={() => dispatch({ type: "ADD_BATHROOM" })}
                  >
                    <MaterialCommunityIcons name="plus" size={24} />
                  </TouchableOpacity>
                </View>
                <Text fontWeight="semibold" fontSize={16}>
                  Property size
                </Text>
                <Input
                  type="number"
                  value={store.propertyDetails.areaSize}
                  onChange={(data) =>
                    newPropertyListingUpdatePropertyDetails({
                      areaSize: Number(data),
                    })
                  }
                />
                <Text fontWeight="semibold" fontSize={16}>
                  House features
                </Text>
                {store.propertyFeatures.house.map((data) => (
                  <BouncyCheckbox
                    key={data.id}
                    size={20}
                    text={data.text}
                    fillColor={checkbox.fillColor}
                    textStyle={checkbox.textStyle as any}
                    isChecked={false}
                    onPress={() => console.log(data.id)}
                  />
                ))}
                <Text fontWeight="semibold" fontSize={16}>
                  Description
                </Text>
                <Input
                  value={store.propertyDetails.description}
                  multiline={true}
                  onChange={(data) =>
                    newPropertyListingUpdatePropertyDetails({
                      description: String(data),
                    })
                  }
                />
              </View>
            </Animated.ScrollView>
          </AnimatedView>
        ) : null}
        {store.currentStepIndex === 2 ? (
          <AnimatedView
            style={[defaultStyles.removedBackground, styles.formContainer]}
            entering={SlideInRight}
            exiting={SlideOutLeft}
          >
            <Text fontWeight="semibold" fontSize={16}>
              Contact name
            </Text>
            <Input
              value=""
              placeholder="Contact name"
              onChange={(data) => console.log(data)}
            />
            <Text fontWeight="semibold" fontSize={16}>
              Contact Number
            </Text>
            <Input
              value=""
              placeholder="+63"
              onChange={(data) => console.log(data)}
            />
          </AnimatedView>
        ) : null}
        {store.currentStepIndex === 3 ? (
          <AnimatedView
            style={[defaultStyles.removedBackground, styles.formContainer]}
            entering={SlideInRight}
            exiting={SlideOutLeft}
          >
            <Text>Property Photos</Text>
          </AnimatedView>
        ) : null}
        {store.currentStepIndex === 4 ? (
          <AnimatedView
            style={[defaultStyles.removedBackground, styles.formContainer]}
            entering={SlideInRight}
            exiting={SlideOutLeft}
          >
            <Text>Listing Preview</Text>
          </AnimatedView>
        ) : null}
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
  );
};

const styles = StyleSheet.create({
  formContainer: {
    padding: 16,
    gap: 12,
  },
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

export default PropertyListingCreate;
