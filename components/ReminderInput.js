import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';

const ReminderInput = props => {

  const [enteredReminder, setEnteredReminder] = useState({
  	reTitle: 'j',
  	reDescription: 'b',
  });
 
  const printValues = e => {
    e.preventDefault();
    console.log(e);
    console.log(enteredReminder.reTitle, enteredReminder.reDescription);
  };

  const reminderInputHanlder = e => {
	setEnteredReminder({ 
	  [e.target.name]: e.target.value
	});
  };

	return ( 
	<View>
		<TextInput
            style={styles.reminderInputField} 
            placeholder='Reminder Title'
            onChangeText={(text)=>{ 
              setEnteredReminder({ 
                "reTitle": text,
                "reDescription": enteredReminder.reDescription
              })
            }}
            name="reTitle"
            value={enteredReminder.reTitle}
        />
        <TextInput
            style={styles.reminderInputField} 
            placeholder='Reminder Description'
            onChangeText={
              (text)=>{ 
                setEnteredReminder({ 
                  "reTitle": enteredReminder.reTitle,
                  "reDescription": text
                })
              }
            }
            name="reDescription"
            value={enteredReminder.reDescription}
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
