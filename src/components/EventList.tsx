import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, Picker, Button } from "react-native";
import { database } from "../storage/Database";
import styles from './Style';
import LinearGradient from 'react-native-linear-gradient';
import { LocalizedStrings } from '../enums/LocalizedStrings'
import { EventTypes } from "../enums/EventTypes";
import { Event } from "../types/Event";
import { MedicalHistoryDisplay } from "./nv_events/MedicalHistory";
import { VitalSignsDisplay } from "./nv_events/VitalSigns";
import { ClinicalEvaluationDisplay } from "./nv_events/ClinicalEvaluation";
import { MedicalPathologiesDisplay } from "./nv_events/MedicalPathologies";
import { MedicinesDisplay } from "./nv_events/Medicines";
import { PsychologicalPathologiesDisplay } from "./nv_events/PsychologicalPathologies";
import { HouseholdEnvironmentDisplay } from "./nv_events/HouseholdEnvironment";

const EventList = (props) => {
  const visit = props.navigation.getParam('visit');
  const patient = props.navigation.getParam('patient');
  const userName = props.navigation.getParam('userName');

  const [list, setList] = useState(props.navigation.getParam('events', []));
  const [language, setLanguage] = useState(props.navigation.getParam('language', 'en'));

  useEffect(() => {
    database.getEvents(visit.id).then(events => {
      const filteredEvents = events.filter(event => {
        return !!event.event_metadata;
      })
      setList(filteredEvents);
    })
  }, [props, language])

  useEffect(() => {
    if (language !== props.navigation.getParam('language')) {
      setLanguage(props.navigation.getParam('language'));
    }
  }, [props])

  const keyExtractor = (item, index) => index.toString()

  const editEvent = (event: Event) => {
    switch (event.event_type) {
      case EventTypes.Covid19Screening:
        break
      case EventTypes.Vitals:
        props.navigation.navigate('EditVitals', { event, language })
        break
      default:
        props.navigation.navigate('EditOpenTextEvent', { event, language })

    }
  }

  const renderItem = ({ item }) => {
    const metadataObj = parseMetadata(item.event_metadata)
    let eventTypeText: string
    let display
    switch (item.event_type) {
      case EventTypes.Covid19Screening:
        eventTypeText = LocalizedStrings[language].covidScreening
        display = <Text>Test/Isolate Patient: {metadataObj.testAndIsolate.toString()}</Text>
        break
      case EventTypes.Vitals:
        eventTypeText = LocalizedStrings[language].vitals
        display = VitalSignsDisplay(metadataObj, language)
        break
      case EventTypes.MedicalHistory:
        eventTypeText = LocalizedStrings[language].medicalHistory
        display = MedicalHistoryDisplay(metadataObj, language)
        break
      case EventTypes.Evaluation:
        eventTypeText = LocalizedStrings[language].clinicalEvaluation
        display = ClinicalEvaluationDisplay(metadataObj, language)
        break
      case EventTypes.MedicinesInStock:
        eventTypeText = LocalizedStrings[language].medicinesInStock
        display = MedicinesDisplay(metadataObj, language)
        break
      case EventTypes.MedicinesOTC:
        eventTypeText = LocalizedStrings[language].medicinesOTC
        display = MedicinesDisplay(metadataObj, language)
        break
      case EventTypes.ControlledMedicines:
        eventTypeText = LocalizedStrings[language].controlledMedicines
        display = MedicinesDisplay(metadataObj, language)
        break
      case EventTypes.MedicalPathologies:
        eventTypeText = LocalizedStrings[language].medicalPathologies
        display = MedicalPathologiesDisplay(metadataObj, language)
        break
      case EventTypes.PsychologicalPathologies:
        eventTypeText = LocalizedStrings[language].psychologicalPathologies
        display = PsychologicalPathologiesDisplay(metadataObj, language)
        break
      case EventTypes.HouseholdEnvironment:
        eventTypeText = LocalizedStrings[language].householdEnvironment
        display = HouseholdEnvironmentDisplay(metadataObj, language)
        break
      default:
        eventTypeText = item.event_type
        display = <Text>{metadataObj}</Text>
        break
    }
    const time = new Date(item.event_timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })

    return (
      <TouchableOpacity style={styles.card}
      // onLongPress={() => editEvent(item)}
      >
        <View style={styles.cardContent} >
          <View style={{ margin: 10 }}>
            <Text>{`${eventTypeText}, ${metadataObj.doctor}, ${time} `}</Text>
            <View
              style={{
                marginVertical: 5,
                borderBottomColor: 'black',
                borderBottomWidth: 1,
              }}
            />
            {display}
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  const parseMetadata = (metadata: string) => {
    try {
      JSON.parse(metadata);
    } catch (e) {
      return metadata;
    }
    return JSON.parse(metadata);
  }

  const LanguageToggle = () => {
    return (
      <Picker
        selectedValue={language}
        onValueChange={value => setLanguage(value)}
        style={styles.picker}
      >
        <Picker.Item value='en' label='en' />
        <Picker.Item value='ar' label='ar' />
        <Picker.Item value='sp' label='sp' />
      </Picker>
    )
  }

  return (
    <LinearGradient colors={['#31BBF3', '#4D7FFF']} style={styles.main}>
      <View style={styles.searchBar}>
        <TouchableOpacity onPress={() => props.navigation.navigate('VisitList', { language: language, patient: patient })}>
          <Text style={styles.text}>{LocalizedStrings[language].back}</Text>
        </TouchableOpacity>
        {LanguageToggle()}
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <Text style={styles.text}>{visit.check_in_timestamp.split('T')[0]}</Text>
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
      <View style={{ position: 'absolute', bottom: 20, right: 20 }}>
        <Button
          title={LocalizedStrings[language].newEntry}
          color={'#F77824'}
          onPress={() => {
            props.navigation.navigate('NewVisit',
              {
                language: language,
                patient: patient,
                visitId: visit.id,
                userName: userName,
                existingVisit: true
              }
            )
          }} />
      </View>
    </LinearGradient>
  )

}

export default EventList;