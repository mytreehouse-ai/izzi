import { PBlurView } from "@/components/CustomBlurView";
import { Ionicons, Text, View } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { globalStateStore } from "@/store";
import { AntDesign } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { useRouter } from "expo-router";
import React, { Fragment, useEffect, useReducer } from "react";
import {
  Dimensions,
  Platform,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";

const { height } = Dimensions.get("window");

type FilterState = {
  search: string;
  listingType: string | null;
  bedrooms: number;
  bathrooms: number;
  minSqm: number;
  maxSqm: number;
};

type FilterAction =
  | { type: "SET_SEARCH"; payload: string }
  | { type: "SET_LISTING_TYPE"; payload: string | null }
  | { type: "SET_BEDROOMS"; payload: number }
  | { type: "SET_BATHROOMS"; payload: number }
  | { type: "SET_MIN_SQM"; payload: number }
  | { type: "SET_MAX_SQM"; payload: number };

const initialState: FilterState = {
  search: "",
  listingType: null,
  bedrooms: 0,
  bathrooms: 0,
  minSqm: 0,
  maxSqm: 0,
};

function filterReducer(state: FilterState, action: FilterAction): FilterState {
  switch (action.type) {
    case "SET_SEARCH":
      return { ...state, search: action.payload };
    case "SET_LISTING_TYPE":
      return { ...state, listingType: action.payload };
    case "SET_BEDROOMS":
      return { ...state, bedrooms: action.payload };
    case "SET_BATHROOMS":
      return { ...state, bathrooms: action.payload };
    case "SET_MIN_SQM":
      return { ...state, minSqm: action.payload };
    case "SET_MAX_SQM":
      return { ...state, maxSqm: action.payload };
    default:
      return state;
  }
}

const PropertyListingFilter = () => {
  const router = useRouter();
  const store = globalStateStore();
  const colorScheme = useColorScheme();
  const [state, dispatch] = useReducer(filterReducer, initialState);

  useEffect(() => {
    dispatch({
      type: "SET_LISTING_TYPE",
      payload: store.propertyListingFilters?.listing_type ?? null,
    });
    dispatch({
      type: "SET_BEDROOMS",
      payload: store.propertyListingFilters?.min_bedrooms ?? 0,
    });
    dispatch({
      type: "SET_BATHROOMS",
      payload: store.propertyListingFilters?.min_bathrooms ?? 0,
    });
  }, []);

  function getSqmParam(property_type: string, isMin: boolean) {
    const sizeType = isMin ? "min" : "max";
    switch (property_type) {
      case "warehouse":
        return `${sizeType}_building_size`;
      case "land":
        return `${sizeType}_lot_size`;
      default:
        return `${sizeType}_floor_size`;
    }
  }

  function onSubmitPropertyListingFilter(filter: FilterState) {
    store.updateFilters({
      listing_type: filter.listingType,
      min_bedrooms: filter.bedrooms,
      max_bedrooms: filter.bedrooms,
      min_bathrooms: filter.bathrooms,
      max_bathrooms: filter.bathrooms,
      [getSqmParam(store.propertyListingFilters.property_type!, true)]:
        state.minSqm,
      [getSqmParam(store.propertyListingFilters.property_type!, false)]:
        state.maxSqm,
    });

    router.back();
  }

  return (
    <PBlurView
      intensity={Platform.OS === "ios" ? 75 : 80}
      tint={colorScheme as "light" | "dark"}
      style={{ width: "100%", height }}
    >
      <View
        style={[{ backgroundColor: "transparent" }, styles.androidSafeAreaView]}
      >
        <View
          style={{
            margin: 16,
            padding: 16,
            gap: 16,
            borderRadius: 8,
          }}
        >
          <RNPickerSelect
            darkTheme={colorScheme === "dark"}
            style={{
              inputIOS: {
                ...defaultStyles.inpField,
                fontFamily: "Montserrat",
                fontSize: 16,
                color:
                  colorScheme === "light"
                    ? Colors.light.text
                    : Colors.dark.text,
              },
              inputAndroid: {
                ...defaultStyles.inpField,
                borderWidth: StyleSheet.hairlineWidth,
                fontFamily: "Montserrat",
                fontSize: 16,
                color:
                  colorScheme === "light"
                    ? Colors.light.text
                    : Colors.dark.text,
              },
              iconContainer: { padding: 12 },
            }}
            placeholder={{
              label: "Listing type",
              value: null,
            }}
            value={state.listingType}
            onValueChange={(value) =>
              dispatch({ type: "SET_LISTING_TYPE", payload: value })
            }
            items={[
              { label: "For Sale", value: "for-sale" },
              { label: "For Rent", value: "for-rent" },
            ]}
            Icon={() => <Ionicons name="chevron-down-outline" size={24} />}
          />
          {!["warehouse", "land"].includes(
            store.propertyListingFilters.property_type!
          ) && (
            <Fragment>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text fontSize={16}>Bedrooms</Text>
                <View
                  style={{
                    gap: 14,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <TouchableOpacity
                    disabled={state.bedrooms === 10}
                    style={{
                      paddingVertical: 8,
                      paddingHorizontal: 8,
                      borderRadius: 8,
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor:
                        colorScheme === "light"
                          ? Colors.light.primary
                          : Colors.dark.primary,
                    }}
                    activeOpacity={0.75}
                    onPress={() =>
                      state.bedrooms < 10 &&
                      dispatch({
                        type: "SET_BEDROOMS",
                        payload: state.bedrooms + 1,
                      })
                    }
                  >
                    <Ionicons name="add" size={24} />
                  </TouchableOpacity>
                  <Text
                    fontSize={16}
                    style={{
                      textAlign: "center",
                      width: 20,
                    }}
                    lightColor={Colors.light.text}
                    darkColor={Colors.dark.text}
                  >
                    {state.bedrooms}
                  </Text>
                  <TouchableOpacity
                    disabled={state.bedrooms <= 0}
                    style={{
                      paddingVertical: 8,
                      paddingHorizontal: 8,
                      borderRadius: 8,
                      alignItems: "center",
                      backgroundColor:
                        colorScheme === "light"
                          ? Colors.light.primary
                          : Colors.dark.primary,
                    }}
                    activeOpacity={0.75}
                    onPress={() =>
                      state.bedrooms > 0 &&
                      dispatch({
                        type: "SET_BEDROOMS",
                        payload: state.bedrooms - 1,
                      })
                    }
                  >
                    <AntDesign
                      name="minus"
                      size={24}
                      color={
                        colorScheme === "light"
                          ? Colors.light.text
                          : Colors.dark.text
                      }
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text fontSize={16}>Bathrooms</Text>
                <View
                  style={{
                    gap: 14,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <TouchableOpacity
                    disabled={state.bathrooms === 10}
                    style={{
                      paddingVertical: 8,
                      paddingHorizontal: 8,
                      borderRadius: 8,
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor:
                        colorScheme === "light"
                          ? Colors.light.primary
                          : Colors.dark.primary,
                    }}
                    activeOpacity={0.75}
                    onPress={() =>
                      state.bathrooms < 10 &&
                      dispatch({
                        type: "SET_BATHROOMS",
                        payload: state.bathrooms + 1,
                      })
                    }
                  >
                    <Ionicons
                      name="add"
                      size={24}
                      lightColor={Colors.light.text}
                      darkColor={Colors.dark.text}
                    />
                  </TouchableOpacity>
                  <Text
                    fontSize={16}
                    style={{
                      textAlign: "center",
                      width: 20,
                    }}
                  >
                    {state.bathrooms}
                  </Text>
                  <TouchableOpacity
                    disabled={state.bathrooms <= 0}
                    style={{
                      paddingVertical: 8,
                      paddingHorizontal: 8,
                      borderRadius: 8,
                      alignItems: "center",
                      backgroundColor:
                        colorScheme === "light"
                          ? Colors.light.primary
                          : Colors.dark.primary,
                    }}
                    activeOpacity={0.75}
                    onPress={() =>
                      state.bathrooms > 0 &&
                      dispatch({
                        type: "SET_BATHROOMS",
                        payload: state.bathrooms - 1,
                      })
                    }
                  >
                    <AntDesign
                      name="minus"
                      size={24}
                      color={
                        colorScheme === "light"
                          ? Colors.light.text
                          : Colors.dark.text
                      }
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </Fragment>
          )}
          <View
            style={{
              flexDirection: "row",
              gap: 10,
              alignItems: "center",
            }}
          >
            <Text fontSize={16}>Min sqm</Text>
            <View
              style={{
                alignItems: "center",
                padding: 5,
                borderRadius: 5,
                flexDirection: "row",
                gap: 5,
              }}
              lightColor={Colors.light.primary}
              darkColor={Colors.dark.primary}
            >
              <Ionicons
                name="expand-outline"
                size={20}
                color={Colors.common.white}
              />
              <Text
                fontSize={16}
                style={{
                  color: Colors.common.white,
                }}
              >
                {state.minSqm}
              </Text>
            </View>
          </View>
          <Slider
            style={{ width: "100%" }}
            minimumValue={0}
            maximumValue={5000}
            value={state.minSqm}
            onValueChange={(value) => {
              const newValue = Math.floor(value);
              dispatch({ type: "SET_MIN_SQM", payload: newValue });

              if (newValue > state.maxSqm) {
                dispatch({ type: "SET_MAX_SQM", payload: newValue });
              }
            }}
            minimumTrackTintColor={
              colorScheme === "light" ? Colors.light.border : Colors.dark.border
            }
            maximumTrackTintColor={
              colorScheme === "light"
                ? Colors.light.primary
                : Colors.dark.primary
            }
          />
          <View
            style={{
              flexDirection: "row",
              gap: 8,
              alignItems: "center",
            }}
          >
            <Text fontSize={16}>Max sqm</Text>
            <View
              style={{
                alignItems: "center",
                padding: 5,
                borderRadius: 5,
                flexDirection: "row",
                gap: 5,
              }}
              lightColor={Colors.light.primary}
              darkColor={Colors.dark.primary}
            >
              <Ionicons
                name="expand-outline"
                size={20}
                color={Colors.common.white}
              />
              <Text
                fontSize={16}
                style={{
                  color: Colors.common.white,
                }}
              >
                {state.maxSqm}
              </Text>
            </View>
          </View>
          <Slider
            style={{ width: "100%" }}
            minimumValue={state.minSqm}
            maximumValue={10000}
            value={state.maxSqm > state.minSqm ? state.maxSqm : state.minSqm}
            onValueChange={(value) => {
              const newValue = Math.floor(value);
              dispatch({ type: "SET_MAX_SQM", payload: newValue });
            }}
            minimumTrackTintColor={
              colorScheme === "light" ? Colors.light.border : Colors.dark.border
            }
            maximumTrackTintColor={
              colorScheme === "light"
                ? Colors.light.primary
                : Colors.dark.primary
            }
          />
          <TouchableOpacity
            style={[
              defaultStyles.btn,
              {
                backgroundColor:
                  colorScheme === "light"
                    ? Colors.light.primary
                    : Colors.dark.primary,
              },
            ]}
            activeOpacity={0.75}
            onPress={() => onSubmitPropertyListingFilter(state)}
          >
            <Text fontWeight="semibold" fontSize={16}>
              Submit
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </PBlurView>
  );
};

const styles = StyleSheet.create({
  androidSafeAreaView: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});

export default PropertyListingFilter;
