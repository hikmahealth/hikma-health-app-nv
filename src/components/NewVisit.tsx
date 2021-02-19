import React, { useState, useEffect, useRef } from 'react';
import {
  View, Text, Image, TextInput, TouchableOpacity, Picker, ScrollView
} from 'react-native';
import styles from './Style';
import { EventTypes } from '../enums/EventTypes';
import LinearGradient from 'react-native-linear-gradient';
import { database } from "../storage/Database";
import { LocalizedStrings } from '../enums/LocalizedStrings';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';

const NewVisit = (props) => {
  const [visitDate, setVisitDate] = useState(new Date().toISOString().split('T')[0]);
  const [language, setLanguage] = useState(props.navigation.getParam('language', 'en'))
  const patient = props.navigation.getParam('patient');
  const visitId = props.navigation.getParam('visitId');
  const userName = props.navigation.getParam('userName');
  const existingVisit = props.navigation.getParam('existingVisit');

  const today = new Date();

  useEffect(() => {

    if (!!props.navigation.getParam('language') && language !== props.navigation.getParam('language')) {
      setLanguage(props.navigation.getParam('language'));
    }
  }, [props])

  const LanguageToggle = () => {
    return (
      <Picker
        selectedValue={language}
        onValueChange={value => setLanguage(value)}
        style={[styles.picker, { marginLeft: 10 }]}
      >
        <Picker.Item value='en' label='en' />
        {/* <Picker.Item value='ar' label='ar' /> */}
        <Picker.Item value='sp' label='sp' />
      </Picker>
    )
  }

  const openTextEvent = (eventType: string) => {
    props.navigation.navigate('OpenTextEvent', { patientId: patient.id, visitId: visitId, eventType: eventType, language: language })
  }

  return (
    <LinearGradient colors={['#31BBF3', '#4D7FFF']} style={styles.main}>
      <View style={styles.listContainer}>
        <View style={styles.searchBar}>
          <TouchableOpacity onPress={() => existingVisit ?
            props.navigation.navigate('EventList', { language, patient }) :
            props.navigation.navigate('PatientView', { language, patient })
          }>
            <Text style={styles.text}>{LocalizedStrings[language].back}</Text>
          </TouchableOpacity>
          {LanguageToggle()}
        </View>

        {existingVisit ?
          null :
          <View style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>

            <View style={styles.inputRow}>
              <DatePicker
                style={styles.datePicker}
                date={visitDate}
                mode="date"
                placeholder={LocalizedStrings[language].selectDob}
                format="YYYY-MM-DD"
                minDate="1900-05-01"
                maxDate={today.toISOString().split('T')[0]}
                confirmBtnText={LocalizedStrings[language].confirm}
                cancelBtnText={LocalizedStrings[language].cancel}
                customStyles={{
                  dateInput: {
                    alignItems: 'flex-start',
                    borderWidth: 0
                  }
                }}
                androidMode='spinner'
                onDateChange={(date) => {
                  setVisitDate(date)
                  database.editVisitDate(visitId, moment(date).toISOString())
                }}
              />
              <Text style={styles.inputs}>
                {userName}
              </Text>
            </View>
          </View>
        }

        <ScrollView style={styles.scroll}>

          {/* 1-3 */}
          <View style={styles.gridContainer}>
            <TouchableOpacity style={styles.actionButton} onPress={() => props.navigation.navigate('MedicalHistory', { patientId: patient.id, visitId, language, userName })}>
              <View style={styles.actionIcon}>
                <Image source={require('../images/medicalHistory.png')} style={{ width: 53, height: 51 }} />
              </View>
              <Text style={styles.actionText}>{LocalizedStrings[language].medicalHistory}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton} onPress={() => props.navigation.navigate('VitalSigns', { patientId: patient.id, visitId, language, userName })}>
              <View style={styles.actionIcon}>
                <Image source={require('../images/vitals.png')} style={{ width: 66, height: 31 }} />
              </View>
              <Text style={styles.actionText}>{LocalizedStrings[language].vitals}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton} onPress={() => props.navigation.navigate('ClinicalEvaluation', { patientId: patient.id, visitId, visitDate, userName, language })}>
              <View style={styles.actionIcon}>
                <Image source={require('../images/stethoscope.png')} style={{ width: 43, height: 47 }} />
              </View>
              <Text style={styles.actionText}>{LocalizedStrings[language].clinicalEvaluation}</Text>
            </TouchableOpacity>
          </View>
          {/* 4-6 */}
          <View style={styles.gridContainer}>
            <TouchableOpacity style={styles.actionButton} onPress={() => props.navigation.navigate('Medicines', { eventType: EventTypes.MedicinesInStock, patientId: patient.id, visitId, language, userName })}>
              <View style={styles.actionIcon}>
                <Image source={require('../images/medicine.png')} style={{ width: 77, height: 38 }} />
              </View>
              <Text style={styles.actionText}>{LocalizedStrings[language].medicinesInStock}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={() => props.navigation.navigate('Medicines', { eventType: EventTypes.MedicinesOTC, patientId: patient.id, visitId, language, userName })}>
              <View style={styles.actionIcon}>
                <Image source={require('../images/medicine.png')} style={{ width: 77, height: 38 }} />
              </View>
              <Text style={styles.actionText}>{LocalizedStrings[language].medicinesOTC}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={() => props.navigation.navigate('Medicines', { eventType: EventTypes.ControlledMedicines, patientId: patient.id, visitId, language, userName })}>
              <View style={styles.actionIcon}>
                <Image source={require('../images/medicine.png')} style={{ width: 77, height: 38 }} />
              </View>
              <Text style={styles.actionText}>{LocalizedStrings[language].controlledMedicines}</Text>
            </TouchableOpacity>
          </View>
          {/* 7-9 */}
          <View style={styles.gridContainer}>
            <TouchableOpacity style={styles.actionButton}
              onPress={() => props.navigation.navigate('MedicalPathologies', { patientId: patient.id, visitId, language, userName })}>
              <View style={styles.actionIcon}>
                <Image source={require('../images/doctor.png')} style={{ width: 40, height: 48 }} />
              </View>
              <Text style={styles.actionText}>{LocalizedStrings[language].medicalPathologies}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={() => props.navigation.navigate('PsychologicalPathologies', { patientId: patient.id, visitId, language, userName })}>
              <View style={styles.actionIcon}>
                <Image source={require('../images/diagnosis.png')} style={{ width: 42, height: 52 }} />
              </View>
              <Text style={styles.actionText}>{LocalizedStrings[language].psychologicalPathologies}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={() => props.navigation.navigate('HouseholdEnvironment', { patientId: patient.id, visitId, language, userName })}>
              <View style={styles.actionIcon}>
                <Image source={require('../images/fee.png')} style={{ width: 50, height: 41 }} />
              </View>
              <Text style={styles.actionText}>{LocalizedStrings[language].householdEnvironment}</Text>
            </TouchableOpacity>
          </View>
          {/* */}
          <View style={[styles.gridContainer]}>
            <TouchableOpacity style={styles.actionButton} onPress={() => props.navigation.navigate('LabOrders', { patientId: patient.id, visitId, language, userName })}>
              <View style={styles.actionIcon}>
                <Image source={require('../images/complaint.png')} style={{ width: 42, height: 52 }} />
              </View>
              <Text style={styles.actionText}>{LocalizedStrings[language].labOrders}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={() => props.navigation.navigate('LabTests', { patientId: patient.id, visitId, language, userName })}>
              <View style={styles.actionIcon}>
                <Image source={require('../images/stethoscope.png')} style={{ width: 42, height: 52 }} />
              </View>
              <Text style={styles.actionText}>{LocalizedStrings[language].labTests}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={() => props.navigation.navigate('UrineTests', { patientId: patient.id, visitId, language, userName })}>
              <View style={styles.actionIcon}>
                <Image source={require('../images/diagnosis.png')} style={{ width: 42, height: 52 }} />
              </View>
              <Text style={styles.actionText}>{LocalizedStrings[language].labUrineTests}</Text>
            </TouchableOpacity>
          </View>
          {/* */}
          <View style={[styles.gridContainer]}>
            <TouchableOpacity style={styles.actionButton} onPress={() => props.navigation.navigate('PAPResults', { patientId: patient.id, visitId, language, userName })}>
              <View style={styles.actionIcon}>
                <Image source={require('../images/notes.png')} style={{ width: 42, height: 52 }} />
              </View>
              <Text style={styles.actionText}>{LocalizedStrings[language].PAPResults}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={() => props.navigation.navigate('Ultrasound', { patientId: patient.id, visitId, language, userName })}>
              <View style={styles.actionIcon}>
                <Image source={require('../images/notes.png')} style={{ width: 42, height: 52 }} />
              </View>
              <Text style={styles.actionText}>{LocalizedStrings[language].ultrasound}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={() => props.navigation.navigate('FamilyPlanning', { patientId: patient.id, visitId, language, userName })}>
              <View style={styles.actionIcon}>
                <Image source={require('../images/notes.png')} style={{ width: 42, height: 52 }} />
              </View>
              <Text style={styles.actionText}>{LocalizedStrings[language].familyPlanning}</Text>
            </TouchableOpacity>
          </View>
          {/* */}
          <View style={[styles.gridContainer]}>
            <TouchableOpacity style={styles.actionButton} onPress={() => props.navigation.navigate('DentalOrigin', { patientId: patient.id, visitId, language, userName })}>
              <View style={styles.actionIcon}>
                <Image source={require('../images/notes.png')} style={{ width: 42, height: 52 }} />
              </View>
              <Text style={styles.actionText}>{LocalizedStrings[language].dentalOrigin}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={() => props.navigation.navigate('DentalTreatment', { patientId: patient.id, visitId, language, userName })}>
              <View style={styles.actionIcon}>
                <Image source={require('../images/notes.png')} style={{ width: 42, height: 52 }} />
              </View>
              <Text style={styles.actionText}>{LocalizedStrings[language].dentalTreatment}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={() => props.navigation.navigate('ProgramTrainings', { patientId: patient.id, visitId, language, userName })}>
              <View style={styles.actionIcon}>
                <Image source={require('../images/notes.png')} style={{ width: 42, height: 52 }} />
              </View>
              <Text style={styles.actionText}>{LocalizedStrings[language].programTrainings}</Text>
            </TouchableOpacity>
          </View>

          {/* */}
          <View style={[styles.gridContainer]}>
            <TouchableOpacity style={styles.actionButton} onPress={() => props.navigation.navigate('XrayOrders', { patientId: patient.id, visitId, language, userName })}>
              <View style={styles.actionIcon}>
                <Image source={require('../images/notes.png')} style={{ width: 42, height: 52 }} />
              </View>
              <Text style={styles.actionText}>{LocalizedStrings[language].xrayOrders}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={() => props.navigation.navigate('XrayResults', { patientId: patient.id, visitId, language, userName })}>
              <View style={styles.actionIcon}>
                <Image source={require('../images/notes.png')} style={{ width: 42, height: 52 }} />
              </View>
              <Text style={styles.actionText}>{LocalizedStrings[language].xrayResults}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={() => props.navigation.navigate('Optometry', { patientId: patient.id, visitId, language, userName })}>
              <View style={styles.actionIcon}>
                <Image source={require('../images/notes.png')} style={{ width: 42, height: 52 }} />
              </View>
              <Text style={styles.actionText}>{LocalizedStrings[language].optometry}</Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.gridContainer, {width: '67%'}]}>
            <TouchableOpacity style={styles.actionButton} onPress={() => props.navigation.navigate('AccidentReport', { patientId: patient.id, visitId, language, userName })}>
              <View style={styles.actionIcon}>
                <Image source={require('../images/notes.png')} style={{ width: 42, height: 52 }} />
              </View>
              <Text style={styles.actionText}>{LocalizedStrings[language].accidentReport}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={() => openTextEvent(EventTypes.Notes)}>
              <View style={styles.actionIcon}>
                <Image source={require('../images/notes.png')} style={{ width: 43, height: 47 }} />
              </View>
              <Text style={styles.actionText}>{LocalizedStrings[language].notes}</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </View>
    </LinearGradient>
  );
};

export default NewVisit;