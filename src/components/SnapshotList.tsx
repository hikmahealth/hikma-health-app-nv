import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, Picker } from "react-native";
import { database } from "../storage/Database";
import styles from './Style';
import LinearGradient from 'react-native-linear-gradient';
import { LocalizedStrings } from '../enums/LocalizedStrings'
import { MedicinesDisplay } from "./nv_events/Medicines";
import { Event } from "../types/Event";
import { EventTypes } from "../enums/EventTypes";
import { MedicalPathologiesDisplay } from "./nv_events/MedicalPathologies";
import { PsychologicalPathologiesDisplay } from "./nv_events/PsychologicalPathologies";
import { HouseholdEnvironmentDisplay } from "./nv_events/HouseholdEnvironment";
import { MedicalHistoryDisplay } from "./nv_events/MedicalHistory";
import { LabOrdersDisplay } from "./nv_events/LabOrders";
import { FamilyPlanningDisplay } from "./nv_events/FamilyPlanning";
import { ProgramTrainingsDisplay } from "./nv_events/ProgramTrainings";
import { XrayOrderDisplay } from "./nv_events/XrayOrders";

const SnapshotList = (props) => {
  const language = props.navigation.getParam('language', 'en');
  const patient = props.navigation.getParam('patient');
  const eventType = props.navigation.getParam('eventType');
  const userName = props.navigation.getParam('userName');
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

  const editEvent = (event: Event) => {
    switch (event.event_type) {
      case EventTypes.MedicinesInStock:
      case EventTypes.MedicinesOTC:
      case EventTypes.ControlledMedicines:
        props.navigation.navigate('EditMedicines', { previousScreen: 'SnapshotList', event, language, userName });
      default:
        break
    }
  }

  const parseMetadata = (metadata: string) => {
    try {
      JSON.parse(metadata);
    } catch (e) {
      return metadata;
    }
    return JSON.parse(metadata);
  }

  const renderItem = ({ item }) => {

    const metadataObj = parseMetadata(item.event_metadata)

    let eventTypeText: string
    let display
    switch (item.event_type) {
      case EventTypes.MedicalHistory:
        eventTypeText = LocalizedStrings[language].medicalHistory
        display = MedicalHistoryDisplay(metadataObj, language)
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
      case EventTypes.LabOrders:
        eventTypeText = LocalizedStrings[language].labOrders
        display = LabOrdersDisplay(metadataObj, language)
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
      case EventTypes.FamilyPlanning:
        eventTypeText = LocalizedStrings[language].familyPlanning
        display = FamilyPlanningDisplay(metadataObj, language)
        break
      case EventTypes.ProgramTrainings:
        eventTypeText = LocalizedStrings[language].programTrainings
        display = ProgramTrainingsDisplay(metadataObj, language)
        break
      case EventTypes.XrayOrders:
        eventTypeText = LocalizedStrings[language].xrayOrders
        display = XrayOrderDisplay(metadataObj, language)
        break
      default:
        eventTypeText = item.event_type
        display = <Text>{metadataObj}</Text>
        break

    }

    const time = new Date(item.edited_at).toLocaleString([], { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true })

    return (
      <TouchableOpacity style={styles.card}
        onLongPress={() => editEvent(item)}
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

export default SnapshotList;