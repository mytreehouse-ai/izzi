import React from 'react';
import { StyleSheet, View } from 'react-native';

const Divider: React.FC<{style?: any}> = ({
	style = null
}) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.divider} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  divider: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    width: '100%',
		marginTop:20,
		marginBottom:25
  },
});

export default Divider;
