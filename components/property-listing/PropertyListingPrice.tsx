import { Text } from "@/components/Themed";
import React from "react";

interface PropertyListingPriceProps {
  price: string;
  fontSize?: number;
}

const PropertyListingPrice: React.FC<PropertyListingPriceProps> = ({
  price,
  fontSize = 16,
}) => {
  return (
    <Text fontWeight="bold" fontSize={fontSize}>
      {price}
    </Text>
  );
};

export default PropertyListingPrice;
