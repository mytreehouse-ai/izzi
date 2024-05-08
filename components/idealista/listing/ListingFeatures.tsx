import { Text, View } from "@/components/Themed";
import { FlashList } from "@shopify/flash-list";
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

const ListingFeatures: React.FC<{
	features : Array<string>;
	label?: string;
}> = ({
	features,
	label = 'Features',
}) => {

	const [showAll, setShowAll] = useState<boolean>(false);

  return (
    <View style={styles.container}>
      <Text fontWeight="semibold" fontSize={16}>
       {label}
      </Text>
      <FlashList
        data={
					(features.length > 7 && !showAll) 
						? features.slice(0,7) 
						: features
				}
        estimatedItemSize={20}
        renderItem={({ item }) => {
          return (
            <View style={{ marginBottom: 8 }}>
              <Text>{`\u2022 ${item}`}</Text>
            </View>
          );
        }}
      />
			<View style={styles.showContainer}>
				<TouchableOpacity
					style={styles.showAllButton}
					onPress={() => setShowAll(!showAll)}
				>
					<Text 
						fontWeight="default" 
						fontSize={14}>
						{ !showAll 
							? `Show all ${features.length} features`
							: 'Show less'
						}
					</Text>
				</TouchableOpacity>
			</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 200,
    gap: 8,
  },
	showContainer: {
		display: 'flex',
		justifyContent:'center',
		alignItems:'center',
	},
	showAllButton: {
		width:'90%',
		padding:10,
		borderWidth:1,
		borderRadius:5,
		alignItems:'center',
	}
});

export default ListingFeatures;
