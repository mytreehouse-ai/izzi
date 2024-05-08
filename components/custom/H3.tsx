import { Text } from "@/components/Themed";
import React from 'react';
import { View } from 'react-native';

const H3 = ({
	text = "Replace"
}) => {
	return (
		<View>
      <Text fontWeight="semibold" fontSize={16}>
        {text}
      </Text>
		</View>
	);
}

export default H3;