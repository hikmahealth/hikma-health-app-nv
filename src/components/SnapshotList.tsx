import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, Picker } from "react-native";
import { database } from "../storage/Database";
import styles from './Style';
import LinearGradient from 'react-native-linear-gradient';
import { LocalizedStrings } from '../enums/LocalizedStrings'
import { MedicinesDisplay } from "./nv_events/Medicines";
import { EventTypes } from "../enums/EventTypes";
import { VitalSignsDisplay } from "./nv_events/VitalSigns";
import { MedicalHistoryDisplay } from "./nv_events/MedicalHistory";
import { ClinicalEvaluationDisplay } from "./nv_events/ClinicalEvaluation";
import { MedicalPathologiesDisplay } from "./nv_events/MedicalPathologies";

const SnapshotList = (props) => {
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

    const parseMetadata = (metadata: string) => {
        try {
            JSON.parse(metadata);
        } catch (e) {
            return metadata;
        }
        return JSON.parse(metadata);
    }

    const renderDisplay = (item, metadataObj) => {
        switch (item.event_type) {
            case EventTypes.Covid19Screening:
                return (<Text>Test/Isolate Patient: {metadataObj.testAndIsolate.toString()}</Text>)
            case EventTypes.Vitals:
                return VitalSignsDisplay(metadataObj, language)
            case EventTypes.MedicalHistory:
                return MedicalHistoryDisplay(metadataObj, language)
            case EventTypes.Evaluation:
                return ClinicalEvaluationDisplay(metadataObj, language)
            case EventTypes.MedicalPathologies:
                return MedicalPathologiesDisplay(metadataObj, language)
            case EventTypes.MedicinesInStock:
            case EventTypes.MedicinesOTC:
            case EventTypes.ControlledMedicines:
                return MedicinesDisplay(metadataObj, language)
            default:
                return (<Text>{metadataObj}</Text>)
        }
    }

    const renderItem = ({ item }) => {
        const metadataObj = parseMetadata(item.event_metadata)
        const time = new Date(item.edited_at).toLocaleString([], {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute:'2-digit', hour12: true})

        return (
            <TouchableOpacity style={styles.card}
            // onLongPress={() => editEvent(item)}
            >
                <View style={styles.cardContent} >
                    <View style={{ margin: 10 }}>
                        <Text>{`${item.event_type}, ${metadataObj.doctor}, ${time} `}</Text>
                        <View
                            style={{
                                marginVertical: 5,
                                borderBottomColor: 'black',
                                borderBottomWidth: 1,
                            }}
                        />
                        {renderDisplay(item, metadataObj)}
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