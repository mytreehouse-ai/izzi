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

const PropertyBedroom = () => {
  const colorScheme = useColorScheme();
  const propertyListingFilter = usePropertyListingFilter();
  const store = useStore((state) => state.bedroomFilter);
  const toggleBedroomCheck = useStore((action) => action.toggleBedroomCheck);

  useEffect(() => {
    const bedroom = store.bedrooms.find((bedroom) => bedroom.checked);
    if (bedroom) {
      propertyListingFilter.updateFilters({
        min_bedrooms: bedroom.id,
        max_bedrooms: bedroom.id === 4 ? 8 : bedroom.id,
      });
    } else {
      propertyListingFilter.updateFilters({
        min_bedrooms: 0,
        max_bedrooms: 0,
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
        Bedrooms
      </Text>
      {store.bedrooms.map((data) => (
        <BouncyCheckbox
          key={data.id}
          size={20}
          text={data.text}
          fillColor={fillColor}
          textStyle={textStyle as any}
          isChecked={
            store.bedrooms.find((bedroom) => bedroom.id === data.id)?.checked
          }
          onPress={() => toggleBedroomCheck(data.id)}
        />
      ))}
    </View>
  );
};

export default PropertyBedroom;
