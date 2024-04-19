import { Text, View } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { usePropertyListingFilter } from "@/store";
import { useStore } from "@/store/slices";
import React, { useEffect, useMemo } from "react";
import { useColorScheme } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";

const textStyle = {
  textDecorationLine: "none",
  fontFamily: "Montserrat",
};

const PropertyBathroom = () => {
  const colorScheme = useColorScheme();
  const propertyListingFilter = usePropertyListingFilter();
  const store = useStore((state) => state.bathroomFilter);
  const toggleBathroomCheck = useStore((action) => action.toggleBathroomCheck);

  useEffect(() => {
    const bathroom = store.bathrooms.find((bathroom) => bathroom.checked);
    if (bathroom) {
      propertyListingFilter.updateFilters({
        min_bathrooms: bathroom.id,
        max_bathrooms: bathroom.id === 3 ? 6 : bathroom.id,
      });
    } else {
      propertyListingFilter.updateFilters({
        min_bathrooms: 0,
        max_bathrooms: 0,
      });
    }
  }, [store]);

  const fillColor = useMemo(
    () =>
      colorScheme === "light" ? Colors.light.primary : Colors.dark.primary,
    [colorScheme]
  );

  return (
    <View style={[defaultStyles.removedBackground, { gap: 8 }]}>
      <Text fontWeight="semibold" fontSize={16}>
        Bathrooms
      </Text>
      {store.bathrooms.map((data) => (
        <BouncyCheckbox
          key={data.id}
          size={20}
          text={data.text}
          fillColor={fillColor}
          textStyle={textStyle as any}
          isChecked={
            store.bathrooms.find((bathroom) => bathroom.id === data.id)?.checked
          }
          onPress={() => toggleBathroomCheck(data.id)}
        />
      ))}
    </View>
  );
};

export default PropertyBathroom;
