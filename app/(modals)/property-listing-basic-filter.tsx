import { Text, View } from "@/components/Themed";
import ListingPrice from "@/components/idealista/filters/ListingPrice";
import ListingTypes from "@/components/idealista/filters/ListingTypes";
import PropertyBathroom from "@/components/idealista/filters/PropertyBathroom";
import PropertyBedroom from "@/components/idealista/filters/PropertyBedroom";
import PropertySqm from "@/components/idealista/filters/PropertySqm";
import PropertyTypes from "@/components/idealista/filters/PropertyTypes";
import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { usePropertyListingFilter } from "@/store";
import { useRouter } from "expo-router";
import { Fragment } from "react";
import { TouchableOpacity, useColorScheme } from "react-native";
import Animated from "react-native-reanimated";

const PropertyListingBasicFilter = () => {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const store = usePropertyListingFilter();

  return (
    <Animated.ScrollView
      showsVerticalScrollIndicator={false}
      scrollEventThrottle={16}
    >
      <View
        style={[defaultStyles.container, { padding: 16, gap: 16 }]}
        lightColor={Colors.common.gray["100"]}
      >
        <ListingTypes />
        <PropertyTypes
          value={store.propertyListingFilters.property_type!}
          onChange={(propertyType) => {
            store.updateFilters({ property_type: propertyType });
          }}
        />
        <ListingPrice />
        <PropertySqm />
        {["house", "condominium"].includes(
          store.propertyListingFilters.property_type || ""
        ) && (
          <Fragment>
            <PropertyBedroom />
            <PropertyBathroom />
          </Fragment>
        )}
        <TouchableOpacity
          style={[
            defaultStyles.btn,
            {
              backgroundColor:
                colorScheme === "light"
                  ? Colors.common.emerald["200"]
                  : Colors.common.darkEmerald300,
            },
          ]}
          onPress={router.back}
        >
          <Text fontWeight="semibold" fontSize={16}>
            Search
          </Text>
        </TouchableOpacity>
      </View>
    </Animated.ScrollView>
  );
};

export default PropertyListingBasicFilter;
