import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const ReminderItem = props => {
	return ( 
		<TouchableOpacity 
			onPress={props.onPressHandler.bind(this, props)}
			activeOpacity={0.8}
		>
			<View styles={styles.reminderItemField}>
		    	<Text styles={styles.reminderText}>Title: {props.title} Description: {props.description}</Text>
	  		</View>
  		</TouchableOpacity>
  	);
}

const styles = StyleSheet.create({
  reminderItemField: {
    borderColor: 'black',
    borderWidth: 1,
  },
  reminderText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
});

export default ReminderItem;