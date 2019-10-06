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
} from 'react-native';
import ReminderItem from '../components/ReminderItem';
import ReminderInput from '../components/ReminderInput';

import { MonoText } from '../components/StyledText';
import { Card, List, ListItem, Button, Icon } from 'react-native-elements';

export default function HomeScreen() {
  const [listReminders, setReminders] = useState([]);
  const [isAddMode, setIsAddMode] = useState(false);


  const createReminderHandler = (reminder) => {
    setReminders(currentReminders => [
      ...currentReminders, 
      { 
        id: Math.random().toString(),
        title: reminder.title,
        description: reminder.description
      }
    ]);
    setIsAddMode(false);
  };

  const removeReminderHandler = reminderId => {
    setReminders(currentReminders => {
      return currentReminders.filter((reminder) => reminder.id !== reminderId);
    });
  }

  const cancelAddReminderHandler = () => {
    setIsAddMode(false);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>
        <View style={styles.getStartedContainer}>

          <Text style={styles.getStartedText}>
            Get started by typing a reminder title {"\n"}
          </Text>
          <Button title="Add new Reminder" onPress={() => setIsAddMode(true)} />
          <ReminderInput visible={isAddMode} onAddReminder={createReminderHandler} onCancel={cancelAddReminderHandler}/>
          <FlatList 
            keyExtractor={(item, index) => item.id}
            data ={listReminders}
            renderItem={itemData => (
              <ReminderItem 
                id={itemData.item.id}
                title={itemData.item.title}
                description={itemData.item.description}
                onDelete={removeReminderHandler} 
              />
            )}
          />
          <Text style={styles.getStartedText}>
            {"\n"} Below you will see the reminders sorted by date
          </Text>
          <RenderReminderList />
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
