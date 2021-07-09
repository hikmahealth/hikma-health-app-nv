import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, Button
} from 'react-native';

import { database } from "../../storage/Database";
import styles from '../Style';
import LinearGradient from 'react-native-linear-gradient';
import { LocalizedStrings } from '../../enums/LocalizedStrings';
import { EventTypes } from '../../enums/EventTypes';

const EditMedicines = (props) => {
  const [medicine, setMedicine] = useState(null);
  const [format, setFormat] = useState(null);
  const [dosage, setDosage] = useState(null);
  const [days, setDays] = useState(null);

  const event = props.navigation.getParam('event');

  const language = props.navigation.getParam('language', 'en');
  const userName = props.navigation.getParam('userName');
  let previousScreen = props.navigation.getParam('previousScreen', 'EventList')

  useEffect(() => {
    if (!!event.event_metadata) {
      const metadataObj = JSON.parse(event.event_metadata)
      setMedicine(metadataObj.medicine)
      setFormat(metadataObj.format)
      setDosage(metadataObj.dosage)
      setDays(metadataObj.days)
    }
  }, [props])

  const submit = async () => {
    database.editEvent(
      event.id,
      JSON.stringify({
        doctor: userName,
        medicine,
        format,
        dosage,
        days
      })
    ).then((response) => {
      props.navigation.navigate(previousScreen, { events: response, language })
    })
  };

  const title = () => {
    switch (event.event_type) {
      case EventTypes.MedicinesInStock:
        return LocalizedStrings[language].medicinesInStock
      case EventTypes.MedicinesOTC:
        return LocalizedStrings[language].medicinesOTC
      case EventTypes.ControlledMedicines:
        return LocalizedStrings[language].controlledMedicines
    }
  }

  return (
    <LinearGradient colors={['#31BBF3', '#4D7FFF']} style={[styles.containerLeft]}>
      <View style={[styles.inputsContainer, { alignItems: 'flex-start' }]}>
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignSelf: 'stretch', }}>
          <Text style={[styles.text, { fontSize: 16, fontWeight: 'bold' }]}>{title()}</Text>
        </View>
        <View style={[styles.responseRow, { paddingBottom: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].medicine}</Text>
        </View>
        <View style={[styles.responseRow, { padding: 0 }]}>
          <TextInput
            style={styles.inputs}
            onChangeText={(text) => setMedicine(text)}
            value={medicine}
          />
        </View>
        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].format}</Text>
        </View>
        <View style={[styles.responseRow, { padding: 0 }]}>
          <TextInput
            style={styles.inputs}
            onChangeText={(text) => setFormat(text)}
            value={format}
          />
        </View>
        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].dosage}</Text>
        </View>
        <View style={[styles.responseRow, { padding: 0 }]}>
          <TextInput
            style={styles.inputs}
            onChangeText={(text) => setDosage(text)}
            value={dosage}
          />
        </View>
        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].days}</Text>
        </View>
        <View style={[styles.responseRow, { padding: 0 }]}>
          <TextInput
            style={styles.inputs}
            onChangeText={(text) => setDays(text)}
            value={days}
            keyboardType={'numeric'}
          />
        </View>
      </View>
      <View style={{ alignItems: 'center' }}>
        <Button
          title={LocalizedStrings[language].save}
          color={'#F77824'}
          onPress={() => submit()} />
      </View>
    </LinearGradient>
  );
};

export default EditMedicines;
