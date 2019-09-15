import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';

const ReminderInput = props => {

  const [enteredReminder, setEnteredReminder] = useState('');
  const reminderInputHanlder = (enteredText) => {
    setEnteredReminder(enteredText);
  };

	return ( 
	<View>
		<TextInput
            style={styles.reminderInputField} 
            placeholder='Reminder Title'
            onChangeText={reminderInputHanlder}
            value={enteredReminder}
        />
        <Button 
        	title="Create Reminder" 
        	onPress={props.onCreateReminder.bind(this, enteredReminder)} 
        />
    </View>
  	);
}

const styles = StyleSheet.create({
  reminderInputField: {
    borderColor: 'black',
    borderWidth: 1,
  },
});



export default ReminderInput;
