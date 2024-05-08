import { Text, View } from "@/components/Themed";
import H3 from "@/components/custom/H3";
import Colors from "@/constants/Colors";
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

interface ListingDescriptionProps {
  description: string;
  showDescriptionTitle?: boolean;
}

const ListingDescription: React.FC<ListingDescriptionProps> = ({
  description,
  showDescriptionTitle = true,
}) => {
  const [showMore, setShowMore] = useState(false);

  return (
    <View style={styles.container}>
      
			{showDescriptionTitle && <H3 text="Description"/>}
      
			<TouchableOpacity
        style={{ flexDirection: "row-reverse" }}
        onPress={() => setShowMore(!showMore)}
      >
      	<Text numberOfLines={showMore ? 0 : 5}>{description}</Text>
      </TouchableOpacity>
			<TouchableOpacity
        style={{ flexDirection: "row-reverse" }}
        onPress={() => setShowMore(!showMore)}
      >
				<Text
					fontSize={12}
					lightColor={Colors.light.primary}
					darkColor={Colors.dark.primary}
				>
					{showMore ? "Show less" : "Show more"}
				</Text>
			</TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
});

export default ListingDescription;
