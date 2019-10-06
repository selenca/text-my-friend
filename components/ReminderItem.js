import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const ReminderItem = props => {
	return ( 
		<TouchableOpacity 
			onPress={props.onDelete.bind(this, props.id)}
			activeOpacity={0.8}
		>
			<View>
		    	<Text styles={styles.reminderItemField}>{"\n"}{props.title};{props.description}</Text>
	  		</View>
  		</TouchableOpacity>
  	);
}

const styles = StyleSheet.create({
  reminderItemField: {
    borderColor: 'black',
    borderWidth: 1,
  },
});

export default ReminderItem;