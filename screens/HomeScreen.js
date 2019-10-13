import * as WebBrowser from 'expo-web-browser';
import React, { useState } from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
  Alert,
  Clipboard,
  Share,
  AsyncStorage,
} from 'react-native';
import ReminderItem from '../components/ReminderItem';
import ReminderInput from '../components/ReminderInput';

import { MonoText } from '../components/StyledText';
import { Card, List, ListItem, Button, Icon } from 'react-native-elements';

export default function HomeScreen() {
  const [listReminders, setReminders] = useState(() => {
    return retrieveData;
  });
  const [isAddMode, setIsAddMode] = useState(false);
  const [editableReminder, setEditableReminder] = useState({
    id: '',                     
    title: '',
    description: '', 
  });


      // fetch the data back asyncronously
  const retrieveData = async () => {
      try {
          const value = await AsyncStorage.getItem('savedReminders');
          console.log(value);
          if (value !== null) {
              // Our data is fetched successfully
              return value;
          }
      } catch (error) {
        console.log('returning undefined');
        return undefined;
      }
  };

  const storeData = async () => {
    try {
      await AsyncStorage.setItem('savedReminders', listReminders);
    } catch (error) {
      // Error saving data
    }
  };

  const createReminderHandler = (reminder) => {
    setReminders(currentReminders => [
      ...currentReminders, 
      { 
        id: Math.random().toString(),
        title: reminder.title,
        description: reminder.description
      }
    ]);
    //storeData();
    setIsAddMode(false);
  };

  const removeReminderHandler = reminderId => {
    setReminders(currentReminders => {
      return currentReminders.filter((reminder) => reminder.id !== reminderId);
    });
    //storeData();
  }

  const editReminderHandler = modifiedReminder => {
    let newReminderObj = 
    { 
      title: modifiedReminder.title,
      description: modifiedReminder.description 
    };
    setEditableReminder(newReminderObj);
    removeReminderHandler(modifiedReminder.id);
    setIsAddMode(true);
  }

  const onPressHandler = (reminder) => {
    Alert.alert(
      'Reminder Details',
      'What would you like to do with the reminder '+reminder.title,
      [
        {
          text: 'Edit',
          onPress: () => editReminderHandler(reminder),
          style: 'cancel',
        },
        //{text: 'Delete', onPress: () => removeReminderHandler(reminder.id)},
        {text: 'Copy Description', onPress: () => copyToClipboard(reminder.description)},
        {text: 'Share', onPress: () => onShare(reminder.description)}
      ],
      {cancelable: true},
    );
  };

  const copyToClipboard = (description) => {
    Clipboard.setString(description);
  };
  
  const cancelAddReminderHandler = () => {
    setIsAddMode(false);
  };

  onShare = async (textToShare) => {
    console.log(textToShare);
    try {
      const result = await Share.share({
        message: textToShare,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };



  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>
        <View style={styles.getStartedContainer}>

          <Text style={styles.getStartedText}>
            Add a Reminder by pressing the button below
          </Text>
          <Button title="Add new Reminder" onPress={() => setIsAddMode(true)} />
          <ReminderInput editableReminder={editableReminder} visible={isAddMode} onAddReminder={createReminderHandler} onCancel={cancelAddReminderHandler}/>
          <FlatList 
            keyExtractor={(item, index) => item.id}
            data ={listReminders}
            renderItem={itemData => (
              <ReminderItem 
                id={itemData.item.id}
                title={itemData.item.title}
                description={itemData.item.description}
                onPressHandler={onPressHandler}
              />
            )}
          />
        </View>
      </ScrollView>
    </View>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};


// name on top, when and what in  the bottom
const reminderList = [
  {
    name: 'Yesim',
    subtitle: 'When | What',
    reminder_type: 'mail'
  },
  {
    name: 'Ana',
    subtitle: 'When | What',
    reminder_type: 'phone'
  }
];
 

function RenderReminderList() {
  return(  
    <View style={styles.reminderContainer}>
      {
        reminderList.map((l, i) => (
          <ListItem
            key={i}
            leftAvatar=<Icon name={l.reminder_type} />
            title={l.name}
            subtitle={l.subtitle}
            bottomDivider
            onPress={() => openReminder()}
          />
        ))
      }
    </View>
  );
}

function openReminder() {
  alert("Show | Modify");
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  reminderInputField: {
    borderColor: 'black',
    borderWidth: 1,
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  reminderContainer: {
    padding: 0,
    width: "100%",
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },

});
