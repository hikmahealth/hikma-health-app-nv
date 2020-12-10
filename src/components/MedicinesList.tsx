import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, Picker } from "react-native";
import { database } from "../storage/Database";
import styles from './Style';
import LinearGradient from 'react-native-linear-gradient';
import { LocalizedStrings } from '../enums/LocalizedStrings'
import { MedicinesDisplay } from "./nv_events/Medicines";

const MedicinesList = (props) => {
  const language = props.navigation.getParam('language', 'en');
  const patient = props.navigation.getParam('patient');
  const eventType = props.navigation.getParam('eventType');

  const [list, setList] = useState(props.navigation.getParam('events', []));

  useEffect(() => {
    database.getAllPatientEventsByType(patient.id, eventType).then(events => {
      const filteredEvents = events.filter(event => {
        return !!event.event_metadata;
      })
      setList(filteredEvents);
    })
  }, [props, language])

  const keyExtractor = (item, index) => index.toString()

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} 
    // onLongPress={() => editEvent(item)}
    >
      <View style={styles.cardContent} >
        <View style={{ margin: 10 }}>
          <Text>{`${LocalizedStrings[language].eventType}: ${item.event_type}`}</Text>
          <View
            style={{
              marginVertical: 5,
              borderBottomColor: 'black',
              borderBottomWidth: 1,
            }}
          />
          {MedicinesDisplay(JSON.parse(item.event_metadata), language)}
          <Text>{`${LocalizedStrings[language].datePrescribed}: ${item.edited_at.split('T')[0]}`}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )



  return (
    <LinearGradient colors={['#31BBF3', '#4D7FFF']} style={styles.main}>
      <View style={styles.searchBar}>
        <TouchableOpacity onPress={() => props.navigation.navigate('PatientView', { language: language, patient: patient })}>
          <Text style={styles.text}>{LocalizedStrings[language].back}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.listContainer}>
        <View style={styles.scroll}>
          <FlatList
            keyExtractor={keyExtractor}
            data={list}
            renderItem={(item) => renderItem(item)}
          />
        </View>
      </View>
    </LinearGradient>
  )

}

export default MedicinesList;