import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Modal } from 'react-native';

const ReminderInput = props => {

  const [enteredReminder, setEnteredReminder] = useState({
  	title: '',
  	description: '',
  });

  const addReminderHandler = () => {
  	props.onAddReminder(enteredReminder);
  	setEnteredReminder('');
  };

  return ( 
	<Modal visible={props.visible} animationType='slide'>
	<View style={styles.inputContainer}>
		<TextInput
            style={styles.reminderInputField} 
            placeholder='Reminder Title'
            onChangeText={(text)=>{ 
              setEnteredReminder({ 
                "title": text,
                "description": enteredReminder.description
              })
            }}
            name="title"
            value={enteredReminder.title}
        />
        <TextInput
            style={styles.reminderInputField} 
            placeholder='Reminder Description'
            onChangeText={
              (text)=>{ 
                setEnteredReminder({ 
                  "title": enteredReminder.title,
                  "description": text
                })
              }
            }
            name="description"
            value={enteredReminder.description}
        />
	    <View style={styles.buttonContainer}>
	    <View style={styles.button}>
		    <Button 
		    	title="CANCEL" color='red' 
		    	onPress={props.onCancel}
		    />
	    </View>
	    <View style={styles.button}>
		    <Button 
		    	title="ADD" 
		    	onPress={addReminderHandler} 
		    />
	    </View>
	    </View>
    </View>
    </Modal>
  	);
}

const styles = StyleSheet.create({
  reminderInputField: {
  	width: '80%',
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10
  },
  inputContainer: {
  	flex: 1,
  	justifyContent: 'center',
  	alignItems: 'center',
  },
  buttonContainer: {
  	flexDirection: 'row',
  	justifyContent: 'space-between',
  	width: '60%',
  },
  button: {
  	width: '40%',
  },
});



export default ReminderInput;
