import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, ScrollView, Button, Picker
} from 'react-native';

import { database } from "../../storage/Database";
import { v4 as uuid } from 'uuid';
import styles from '../Style';
import { EventTypes } from '../../enums/EventTypes';
import LinearGradient from 'react-native-linear-gradient';
import { datePicker } from '../Covid19Form'
import { LocalizedStrings } from '../../enums/LocalizedStrings';

export const MedicalHistoryDisplay = (metadataObj, language) => {
  return (
    <View>
      <Text>{LocalizedStrings[language].doctor}: {metadataObj.doctor} </Text>
      <Text>{LocalizedStrings[language].malnutrition}: {metadataObj.malnutrition} </Text>
      <Text>{LocalizedStrings[language].prenatal}: {metadataObj.prenatal}</Text>
      <Text>{LocalizedStrings[language].sexualHx}: {metadataObj.sexualHx}</Text>
      <Text>{LocalizedStrings[language].nutrition}: {metadataObj.nutrition}</Text>
      <Text>{LocalizedStrings[language].parasiteTreatment}: {metadataObj.parasiteTreatment}</Text>
      <Text>{LocalizedStrings[language].familyHx}: {metadataObj.familyHx}</Text>
      <Text>{LocalizedStrings[language].surgeryHx}: {metadataObj.surgeryHx}</Text>
      <Text>{LocalizedStrings[language].vaccinations}: {metadataObj.vaccinations}</Text>
      <Text>{LocalizedStrings[language].bloodType}: {metadataObj.bloodType}</Text>
    </View>)
}

const MedicalHistory = (props) => {
  const [malnutrition, setMalnutrition] = useState(null);
  const [prenatal, setPrenatal] = useState(null);
  const [sexualHx, setSexualHx] = useState(null);
  const [nutrition, setNutrition] = useState(null);
  const [parasiteTreatment, setParasiteTreatment] = useState('');

  const [familyHx, setFamilyHx] = useState(null);
  const [surgeryHx, setSurgeryHx] = useState(null);
  const [vaccinations, setVaccinations] = useState(null);
  const [bloodType, setBloodType] = useState('A+');

  const patientId = props.navigation.getParam('patientId');
  const visitId = props.navigation.getParam('visitId');
  const language = props.navigation.getParam('language', 'en');
  const userName = props.navigation.getParam('userName');

  useEffect(() => {
    database.getLatestPatientEventByType(patientId, EventTypes.MedicalHistory).then((response: any) => {
      if (response.length > 0) {
        const responseObj = JSON.parse(response)
        setMalnutrition(responseObj.malnutrition)
        setPrenatal(responseObj.prenatal)
        setSexualHx(responseObj.sexualHx)
        setNutrition(responseObj.nutrition)
        setParasiteTreatment(responseObj.parasiteTreatment)
        setFamilyHx(responseObj.familyHx)
        setSurgeryHx(responseObj.surgeryHx)
        setVaccinations(responseObj.vaccinations)
        setBloodType(responseObj.bloodType)
      }
    })
  }, [])

  const submit = async () => {
    database.addEvent({
      id: uuid(),
      patient_id: patientId,
      visit_id: visitId,
      event_type: EventTypes.MedicalHistory,
      event_metadata: JSON.stringify({
        doctor: userName,
        malnutrition,
        prenatal,
        sexualHx,
        nutrition,
        parasiteTreatment,
        familyHx,
        surgeryHx,
        vaccinations,
        bloodType
      })
    }).then(() => {
      props.navigation.navigate('NewVisit')
    })
  };

  const bloodToggle = () => {
    return (
      <Picker
        selectedValue={bloodType}
        onValueChange={value => setBloodType(value)}
        style={[styles.picker, { width: 100 }]}
      >
        <Picker.Item value='A+' label='A+' />
        <Picker.Item value='B+' label='B+' />
        <Picker.Item value='AB+' label='AB+' />
        <Picker.Item value='O+' label='O+' />
        <Picker.Item value='A-' label='A-' />
        <Picker.Item value='B-' label='B-' />
        <Picker.Item value='AB-' label='AB-' />
        <Picker.Item value='O-' label='O-' />

      </Picker>
    )
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <LinearGradient colors={['#31BBF3', '#4D7FFF']} style={styles.containerLeft}>
        <View style={[styles.inputsContainer, { alignItems: 'flex-start' }]}>

          <View style={{ flexDirection: 'row', justifyContent: 'center', alignSelf: 'stretch', }}>
            <Text style={[styles.text, { fontSize: 16, fontWeight: 'bold' }]}>{LocalizedStrings[language].medicalHistory}</Text>
          </View>
          <View style={[styles.responseRow, { paddingBottom: 0 }]}>
            <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].malnutrition}</Text>
          </View>
          <View style={[styles.responseRow, { padding: 0 }]}>
            <TextInput
              style={styles.inputs}
              onChangeText={(text) => setMalnutrition(text)}
              value={malnutrition}
            />
          </View>
          <View style={[styles.responseRow, { paddingVertical: 0 }]}>
            <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].prenatal}</Text>
          </View>
          <View style={[styles.responseRow, { padding: 0 }]}>
            <TextInput
              style={styles.inputs}
              onChangeText={(text) => setPrenatal(text)}
              value={prenatal}
            />
          </View>
          <View style={[styles.responseRow, { paddingVertical: 0 }]}>
            <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].sexualHx}</Text>
          </View>
          <View style={[styles.responseRow, { padding: 0 }]}>
            <TextInput
              style={styles.inputs}
              onChangeText={(text) => setSexualHx(text)}
              value={sexualHx}
            />
          </View>
          <View style={[styles.responseRow, { paddingVertical: 0 }]}>
            <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].nutrition}</Text>
          </View>
          <View style={[styles.responseRow, { padding: 0 }]}>
            <TextInput
              style={styles.inputs}
              onChangeText={(text) => setNutrition(text)}
              value={nutrition}
            />
          </View>


          <View style={[styles.responseRow, { paddingVertical: 0 }]}>
            <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].parasiteTreatment}</Text>
          </View>
          <View>{datePicker({ placeholder: LocalizedStrings[language].treatmentDate, date: parasiteTreatment, action: setParasiteTreatment, language })}</View>


          <View style={[styles.responseRow, { paddingVertical: 0 }]}>
            <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].familyHx}</Text>
          </View>
          <View style={[styles.responseRow, { padding: 0 }]}>
            <TextInput
              style={styles.inputs}
              onChangeText={(text) => setFamilyHx(text)}
              value={familyHx}
            />
          </View>
          <View style={[styles.responseRow, { paddingVertical: 0 }]}>
            <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].surgeryHx}</Text>
          </View>
          <View style={[styles.responseRow, { padding: 0 }]}>
            <TextInput
              style={styles.inputs}
              onChangeText={(text) => setSurgeryHx(text)}
              value={surgeryHx}
            />
          </View>
          <View style={[styles.responseRow, { paddingVertical: 0 }]}>
            <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].vaccinations}</Text>
          </View>
          <View style={[styles.responseRow, { paddingTop: 0, paddingHorizontal: 0 }]}>
            <TextInput
              style={styles.inputs}
              onChangeText={(text) => setVaccinations(text)}
              value={vaccinations}
            />
          </View>
          <View style={[styles.responseRow, { paddingVertical: 0 }]}>
            <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].bloodType}</Text>
          </View>
          <View style={[styles.responseRow, { paddingVertical: 0 }]}>
            {bloodToggle()}
          </View>
        </View>
        <View style={{ alignItems: 'center' }}>
          <Button
            title={LocalizedStrings[language].save}
            color={'#F77824'}
            onPress={() => submit()} />
        </View>
      </LinearGradient>
    </ScrollView>
  );
};

export default MedicalHistory;
