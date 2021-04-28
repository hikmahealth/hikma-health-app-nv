import React, { useState } from 'react';
import {
  View, Text, TextInput, ScrollView, Picker, Button
} from 'react-native';

import { database } from "../../storage/Database";
import { v4 as uuid } from 'uuid';
import styles from '../Style';
import { EventTypes } from '../../enums/EventTypes';
import LinearGradient from 'react-native-linear-gradient';
import { LocalizedStrings } from '../../enums/LocalizedStrings';

export const VitalSignsDisplay = (metadataObj, language) => {
  return (
    <View>
      <Text>{LocalizedStrings[language].doctor}: {metadataObj.doctor} </Text>
      <Text>{LocalizedStrings[language].glycemia}: {metadataObj.glycemia}</Text>
      <Text>{LocalizedStrings[language].weight}: {metadataObj.weight}</Text>
      <Text>{LocalizedStrings[language].weightLb}: {metadataObj.weightLb}</Text>
      <Text>{LocalizedStrings[language].idealWeight}: {metadataObj.idealWeight}</Text>
      <Text>{LocalizedStrings[language].bloodPressure}: {metadataObj.systolic}/{metadataObj.diastolic}</Text>
      <Text>{LocalizedStrings[language].pulse}: {metadataObj.pulse}</Text>
      <Text>{LocalizedStrings[language].respiration}: {metadataObj.respiration}</Text>
      <Text>{LocalizedStrings[language].sats}: {metadataObj.sats}</Text>
      <Text>{LocalizedStrings[language].height}: {metadataObj.height}</Text>
      <Text>{LocalizedStrings[language].temp}: {metadataObj.temp}</Text>
    </View>)
}

const VitalSigns = (props) => {
  const [glycemia, setGlycemia] = useState(null);
  const [weight, setWeight] = useState(null);
  const [weightLb, setWeightLb] = useState(null);
  const [idealWeight, setIdealWeight] = useState(null);
  const [systolic, setSystolic] = useState(null);
  const [diastolic, setDiastolic] = useState(null);
  const [pulse, setPulse] = useState(null);
  const [respiration, setRespiration] = useState(null);
  const [sats, setSats] = useState(null);
  const [height, setHeight] = useState(null);
  const [temp, setTemp] = useState(null);


  const patientId = props.navigation.getParam('patientId');
  const visitId = props.navigation.getParam('visitId');
  const language = props.navigation.getParam('language', 'en');
  const userName = props.navigation.getParam('userName');

  const setVitals = async () => {
    database.addEvent({
      id: uuid(),
      patient_id: patientId,
      visit_id: visitId,
      event_type: EventTypes.Vitals,
      event_metadata: JSON.stringify({
        doctor: userName,
        glycemia,
        weight,
        weightLb,
        idealWeight,
        systolic,
        diastolic,
        pulse,
        respiration,
        sats,
        height,
        temp
      })
    }).then(() => {
      props.navigation.navigate('NewVisit')
    })
  };

  return (
    <ScrollView>
      <LinearGradient colors={['#31BBF3', '#4D7FFF']} style={styles.containerLeft}>
        <View style={[styles.inputsContainer, { alignItems: 'flex-start' }]}>
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignSelf: 'stretch', }}>
            <Text style={[styles.text, { fontSize: 16, fontWeight: 'bold' }]}>{LocalizedStrings[language].vitals}</Text>
          </View>
          <View style={[styles.responseRow, { paddingBottom: 0 }]}>
            <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].glycemia}</Text>
          </View>

          <View style={[styles.responseRow, { padding: 0 }]}>
            <TextInput
              style={styles.inputs}
              placeholder="mg"
              onChangeText={(text) => setGlycemia(text)}
              value={glycemia}
              keyboardType='numeric'
            />
          </View>

          <View style={[styles.responseRow, { paddingVertical: 0 }]}>
            <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].weight}</Text>
          </View>

          <View style={[styles.responseRow, { padding: 0 }]}>
            <TextInput
              style={styles.inputs}
              placeholder="kg"
              onChangeText={(text) => setWeight(text)}
              value={weight}
              keyboardType='numeric'
            />
          </View>

          <View style={[styles.responseRow, { paddingVertical: 0 }]}>
            <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].weightLb}</Text>
          </View>

          <View style={[styles.responseRow, { padding: 0 }]}>
            <TextInput
              style={styles.inputs}
              placeholder="libra"
              onChangeText={(text) => setWeightLb(text)}
              value={weightLb}
              keyboardType='numeric'
            />
          </View>

          <View style={[styles.responseRow, { paddingVertical: 0 }]}>
            <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].idealWeight}</Text>
          </View>

          <View style={[styles.responseRow, { padding: 0 }]}>
            <TextInput
              style={styles.inputs}
              placeholder="kg"
              onChangeText={(text) => setIdealWeight(text)}
              value={idealWeight}
              keyboardType='numeric'
            />
          </View>

          <View style={[styles.responseRow, { paddingVertical: 0 }]}>
            <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].bloodPressure}</Text>
          </View>

          <View style={[styles.responseRow, { padding: 0 }]}>
            <TextInput
              style={styles.inputs}
              placeholder="Systolic"
              onChangeText={(text) => setSystolic(text)}
              value={systolic}
              keyboardType='numeric'
            />
            <Text style={{ color: '#FFFFFF' }}>/</Text>
            <TextInput
              style={styles.inputs}
              placeholder="Diastolic"
              onChangeText={(text) => setDiastolic(text)}
              value={diastolic}
              keyboardType='numeric'
            />
          </View>

          <View style={[styles.responseRow, { paddingVertical: 0 }]}>
            <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].pulse}</Text>
          </View>
          <View style={[styles.responseRow, { padding: 0 }]}>
            <TextInput
              style={styles.inputs}
              placeholder="BPM"
              onChangeText={(text) => setPulse(text)}
              value={pulse}
              keyboardType='numeric'
            />
          </View>
          <View style={[styles.responseRow, { paddingVertical: 0 }]}>
            <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].respiration}</Text>
          </View>
          <View style={[styles.responseRow, { padding: 0 }]}>
            <TextInput
              style={styles.inputs}
              placeholder="BPM"
              onChangeText={(text) => setRespiration(text)}
              value={respiration}
              keyboardType='numeric'
            />
          </View>
          <View style={[styles.responseRow, { paddingVertical: 0 }]}>
            <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].sats}</Text>
          </View>
          <View style={[styles.responseRow, { padding: 0 }]}>
            <TextInput
              style={styles.inputs}
              placeholder="%"
              onChangeText={(text) => setSats(text)}
              value={sats}
              keyboardType='numeric'
            />
          </View>

          <View style={[styles.responseRow, { paddingVertical: 0 }]}>
            <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].height}</Text>
          </View>
          <View style={[styles.responseRow, { padding: 0 }]}>
            <TextInput
              style={styles.inputs}
              placeholder="m"
              onChangeText={(text) => setHeight(text)}
              value={height}
              keyboardType='numeric'
            />
          </View>

          <View style={[styles.responseRow, { paddingVertical: 0 }]}>
            <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].temp}</Text>
          </View>
          <View style={[styles.responseRow, { padding: 0 }]}>
            <TextInput
              style={styles.inputs}
              placeholder="°C"
              onChangeText={(text) => setTemp(text)}
              value={temp}
              keyboardType='numeric'
            />
          </View>
        </View>

        <View style={{ marginTop: 30, alignItems: 'center' }}>
          <Button
            title={LocalizedStrings[language].save}
            color={'#F77824'}
            onPress={() => setVitals()} />
        </View>
      </LinearGradient>
    </ScrollView>
  );
};

export default VitalSigns;
