import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, Button
} from 'react-native';

import { database } from "../../storage/Database";
import { v4 as uuid } from 'uuid';
import styles from '../Style';
import LinearGradient from 'react-native-linear-gradient';
import { LocalizedStrings } from '../../enums/LocalizedStrings';
import { EventTypes } from '../../enums/EventTypes';

export const MedicinesDisplay = (metadataObj, language) => {
  return (
    <View>
      <Text>{LocalizedStrings[language].doctor}: {metadataObj.doctor} </Text>
      <Text>{LocalizedStrings[language].medicine}: {metadataObj.medicine} </Text>
      <Text>{LocalizedStrings[language].format}: {metadataObj.format}</Text>
      <Text>{LocalizedStrings[language].dosage}: {metadataObj.dosage}</Text>
      <Text>{LocalizedStrings[language].days}: {metadataObj.days}</Text>
    </View>)
}

const Medicines = (props) => {
  const [medicine, setMedicine] = useState(null);
  const [format, setFormat] = useState(null);
  const [dosage, setDosage] = useState(null);
  const [days, setDays] = useState(null);

  const eventType = props.navigation.getParam('eventType');
  const patientId = props.navigation.getParam('patientId');
  const visitId = props.navigation.getParam('visitId');
  const language = props.navigation.getParam('language', 'en');
  const userName = props.navigation.getParam('userName');

  const submit = async () => {
    database.addEvent({
      id: uuid(),
      patient_id: patientId,
      visit_id: visitId,
      event_type: eventType,
      event_metadata: JSON.stringify({
        doctor: userName,
        medicine,
        format,
        dosage,
        days
      })
    }).then(() => {
      props.navigation.navigate('NewVisit')
    })
  };

  const title = () => {
    switch (eventType) {
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

export default Medicines;
