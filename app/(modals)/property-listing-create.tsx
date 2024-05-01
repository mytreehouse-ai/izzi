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
import ListingTypes from "@/components/idealista/filters/ListingTypes";
import PropertyClassificationTypes from "@/components/idealista/filters/PropertyClassificationTypes";
import PropertyFloors from "@/components/idealista/filters/PropertyFloors";
import PropertyTypes from "@/components/idealista/filters/PropertyTypes";
import ListingCard from "@/components/idealista/listing/ListingCard";
import ListingFooter from "@/components/idealista/listing/ListingFooter";
import ListingImages from "@/components/idealista/listing/ListingImages";
import ListingInfo from "@/components/idealista/listing/ListingInfo";
import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { useCreateListingImageMutation } from "@/hooks/useCreateListingImageMutation";
import { useStore } from "@/store/slices";
import { useAuth } from "@clerk/clerk-expo";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import React, { Fragment, useEffect, useMemo, useReducer } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import * as Progress from "react-native-progress";
import Animated, {
  Easing,
  SlideInDown,
  SlideInRight,
  SlideOutLeft,
  SlideOutRight,
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
  const { getToken } = useAuth();
  const colorScheme = useColorScheme();
  const store = useStore((state) => state.propertyListingCreate);
  const [state, dispatch] = useReducer(propertyListingReducer, initialState);
  const nextStep = useStore((action) => action.propertyListingCreateNextStep);
  const prevStep = useStore((action) => action.propertyListingCreatePrevStep);
  const newPropertyListingUpdatePropertyDetails = useStore(
    (action) => action.newPropertyListingUpdatePropertyDetails
  );

  const {
    mutateAsync,
    isPending,
    data: image,
  } = useCreateListingImageMutation();

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

  const propertyFeatures = useMemo(
    () =>
      store.propertyFeatures[
        store.propertyDetails
          .propertyType as keyof typeof store.propertyFeatures
      ],
    [store.propertyDetails]
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
    if (!isPending && image) {
      newPropertyListingUpdatePropertyDetails({
        ...store.propertyDetails,
        images: [...store.propertyDetails.images, image.blobUrl],
      });
    }
  }, [isPending, image]);

  useEffect(() => {
    newPropertyListingUpdatePropertyDetails({
      bedrooms: state.bedrooms,
      bathrooms: state.bathrooms,
    });
  }, [state.bedrooms, state.bathrooms]);

  async function onPickImage() {
    try {
      const imagePicker = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 1.0,
        base64: true,
      });
      if (!imagePicker.canceled) {
        const base64Image = `data:image/jpeg;base64,${imagePicker.assets[0].base64}`;
        mutateAsync({ getToken, base64: base64Image });
      }
    } catch (error) {
      console.error(error);
      alert("Error setting property image");
    }
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
            <GooglePlacesSearch
              onPress={(data, details) => {
                console.log(JSON.stringify(data, null, 2));
                console.log(JSON.stringify(details, null, 2));
                newPropertyListingUpdatePropertyDetails({
                  address: data?.description,
                  city: details?.vicinity,
                  longitude: details?.geometry.location.lng,
                  latitude: details?.geometry.location.lat,
                });
              }}
            />
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
                  Listing type
                </Text>
                <ListingTypes
                  type="select"
                  value={store.propertyDetails.listingType}
                  onChange={(text) => console.log(text)}
                />
                <Text fontWeight="semibold" fontSize={16}>
                  Property type
                </Text>
                <PropertyTypes
                  value={store.propertyDetails.propertyType}
                  onChange={(propertyType) => {
                    newPropertyListingUpdatePropertyDetails({ propertyType });
                  }}
                />
                {store.propertyDetails.propertyType === "warehouse" && (
                  <Fragment>
                    <Text fontWeight="semibold" fontSize={16}>
                      Classification type
                    </Text>
                    <PropertyClassificationTypes
                      value=""
                      onChange={(text) => console.log(text)}
                    />
                  </Fragment>
                )}
                {store.propertyDetails.propertyType === "condominium" && (
                  <Fragment>
                    <Text fontWeight="semibold" fontSize={16}>
                      Unit floor
                    </Text>
                    <PropertyFloors
                      value={store.propertyDetails.floorNo}
                      onChange={(text) => console.log(text)}
                    />
                    <Text fontWeight="semibold" fontSize={16}>
                      Unit no.
                    </Text>
                    <Input
                      value={store.propertyDetails.unitNo}
                      placeholder="Unit no."
                      onChange={(text) => console.log(text)}
                    />
                  </Fragment>
                )}
                {store.propertyDetails.propertyType && (
                  <Fragment>
                    <Text fontWeight="semibold" fontSize={16}>
                      Property price
                    </Text>
                    <Input
                      type="number"
                      value={store.propertyDetails.price}
                      placeholder="Property price"
                      onChange={(text) =>
                        newPropertyListingUpdatePropertyDetails({
                          price: Number(text),
                        })
                      }
                    />
                  </Fragment>
                )}
                {["condominium", "house-and-lot", "dormitory"].includes(
                  store.propertyDetails.propertyType
                ) && (
                  <Fragment>
                    <Text fontWeight="semibold" fontSize={16}>
                      Floor area
                    </Text>
                    <Input
                      type="number"
                      maxLength={5}
                      value={store.propertyDetails.floorArea}
                      onChange={(data) =>
                        newPropertyListingUpdatePropertyDetails({
                          floorArea: Number(data),
                        })
                      }
                    />
                  </Fragment>
                )}
                {["warehouse", "building"].includes(
                  store.propertyDetails.propertyType
                ) && (
                  <Fragment>
                    <Text fontWeight="semibold" fontSize={16}>
                      Building area
                    </Text>
                    <Input
                      type="number"
                      maxLength={5}
                      value={store.propertyDetails.buildingArea}
                      onChange={(data) =>
                        newPropertyListingUpdatePropertyDetails({
                          buildingArea: Number(data),
                        })
                      }
                    />
                  </Fragment>
                )}
                {store.propertyDetails.propertyType === "warehouse" && (
                  <Fragment>
                    <Text fontWeight="semibold" fontSize={16}>
                      Ceiling height
                    </Text>
                    <Input
                      type="number"
                      maxLength={5}
                      value={store.propertyDetails.ceilingHeight}
                      onChange={(data) =>
                        newPropertyListingUpdatePropertyDetails({
                          ceilingHeight: Number(data),
                        })
                      }
                    />
                  </Fragment>
                )}
                {[
                  "land",
                  "house-and-lot",
                  "dormitory",
                  "building",
                  "warehouse",
                ].includes(store.propertyDetails.propertyType) && (
                  <Fragment>
                    <Text fontWeight="semibold" fontSize={16}>
                      Lot area
                    </Text>
                    <Input
                      type="number"
                      maxLength={5}
                      value={store.propertyDetails.lotArea}
                      onChange={(data) =>
                        newPropertyListingUpdatePropertyDetails({
                          lotArea: Number(data),
                        })
                      }
                    />
                  </Fragment>
                )}
                {["condominium", "house-and-lot", "dormitory"].includes(
                  store.propertyDetails.propertyType
                ) && (
                  <Fragment>
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
                  </Fragment>
                )}
                {propertyFeatures?.length &&
                store.propertyDetails.propertyType ? (
                  <Fragment>
                    <Text fontWeight="semibold" fontSize={16}>
                      {store.propertyDetails.propertyType
                        .split(" ")
                        .map(
                          (word) => word.charAt(0).toUpperCase() + word.slice(1)
                        )
                        .join(" ")}{" "}
                      features
                    </Text>
                    {propertyFeatures.map((feature) => (
                      <BouncyCheckbox
                        key={feature.id}
                        size={20}
                        text={feature.text}
                        fillColor={checkbox.fillColor}
                        textStyle={checkbox.textStyle as any}
                        isChecked={feature.checked}
                        onPress={(isChecked) =>
                          console.log(`${feature.id} - ${isChecked}`)
                        }
                      />
                    ))}
                  </Fragment>
                ) : null}
                {store.propertyDetails.propertyType && (
                  <Fragment>
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
                  </Fragment>
                )}
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
            <TouchableOpacity onPress={onPickImage}>
              <Text>Property Photos {isPending && "..."}</Text>
            </TouchableOpacity>
            <Animated.ScrollView
              contentContainerStyle={{
                gap: 16,
                paddingBottom: 125,
              }}
              showsVerticalScrollIndicator={false}
              scrollEventThrottle={16}
            >
              {store.propertyDetails.images
                .map((image, index) => (
                  <AnimatedView
                    key={index}
                    style={defaultStyles.removedBackground}
                    entering={SlideInRight}
                    exiting={SlideOutRight}
                  >
                    <Image
                      style={{ width: "100%", height: 300, borderRadius: 8 }}
                      source={{ uri: image }}
                    />
                  </AnimatedView>
                ))
                .reverse()}
            </Animated.ScrollView>
          </AnimatedView>
        ) : null}
        {store.currentStepIndex === 3 ? (
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
        {store.currentStepIndex === 4 ? (
          <AnimatedView
            style={[defaultStyles.removedBackground, styles.formContainer]}
            entering={SlideInRight}
            exiting={SlideOutLeft}
          >
            <ListingCard
              image={
                <TouchableOpacity activeOpacity={0.8}>
                  <ListingImages
                    mainImage={store.propertyDetails.images[0]}
                    IMAGE_HEIGHT={300}
                  />
                </TouchableOpacity>
              }
              info={
                <ListingInfo
                  data={{
                    listing_title: store.propertyDetails.listingTitle,
                    price_formatted: `₱${store.propertyDetails.price.toLocaleString(
                      "en-PH"
                    )}`,
                    city: store.propertyDetails.city,
                    area: "",
                  }}
                />
              }
              footer={<ListingFooter />}
            />
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
            {store.currentStepIndex === 4 ? "Submit" : "Next Step"}
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
