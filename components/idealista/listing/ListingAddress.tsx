import { Text } from '@/components/Themed';
import H3 from '@/components/custom/H3';
import React from 'react';
import { StyleSheet, View } from 'react-native';

interface Address {
	location: string
}

const ListingAddress : React.FC<Address> = ({
	location
}) => {
	return (
		<View style={styles.container}>
			<H3 text='Address'/>
			<Text>{location}</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		gap: 8,
	}
});

export default ListingAddress;
