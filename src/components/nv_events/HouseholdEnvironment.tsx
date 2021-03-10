import React, { useState, useEffect } from 'react';
import {
    View, Text, TextInput, Button
} from 'react-native';

import { database } from "../../storage/Database";
import { v4 as uuid } from 'uuid';
import styles from '../Style';
import { EventTypes } from '../../enums/EventTypes';
import LinearGradient from 'react-native-linear-gradient';
import { radioButtons } from '../Covid19Form'
import { LocalizedStrings } from '../../enums/LocalizedStrings';

export const HouseholdEnvironmentDisplay = (metadataObj, language) => {
    return (
        <View>
            <Text>{LocalizedStrings[language].doctor}: {metadataObj.doctor} </Text>
            <Text>{LocalizedStrings[language].potableWater}: {metadataObj.potableWater ? LocalizedStrings[language].yes : LocalizedStrings[language].no}</Text>
            <Text>{LocalizedStrings[language].animals}: {metadataObj.animals} </Text>
            <Text>{LocalizedStrings[language].gasCooking}: {metadataObj.gasCooking ? LocalizedStrings[language].yes : LocalizedStrings[language].no}</Text>
            <Text>{LocalizedStrings[language].woodCooking}: {metadataObj.woodCooking ? LocalizedStrings[language].yes : LocalizedStrings[language].no}</Text>
            <Text>{LocalizedStrings[language].householdSize}: {metadataObj.householdSize}</Text>
            <Text>{LocalizedStrings[language].toilet}: {metadataObj.toilet ? LocalizedStrings[language].yes : LocalizedStrings[language].no}</Text>
            <Text>{LocalizedStrings[language].latrine}: {metadataObj.latrine ? LocalizedStrings[language].yes : LocalizedStrings[language].no}</Text>
            <Text>{LocalizedStrings[language].familyViolence}: {metadataObj.familyViolence ? metadataObj.familyViolenceText : LocalizedStrings[language].no}</Text>
        </View>)
}

const HouseholdEnvironment = (props) => {
    const [potableWater, setPotableWater] = useState(null);
    const [animals, setAnimals] = useState(null);
    const [gasCooking, setGasCooking] = useState(null);
    const [woodCooking, setWoodCooking] = useState(null);
    const [householdSize, setHouseholdSize] = useState(null);
    const [toilet, setToilet] = useState(null);
    const [latrine, setLatrine] = useState(null);
    const [familyViolence, setFamilyViolence] = useState(null);
    const [familyViolenceText, setFamilyViolenceText] = useState(null);

    const patientId = props.navigation.getParam('patientId');
    const visitId = props.navigation.getParam('visitId');
    const language = props.navigation.getParam('language', 'en');
    const userName = props.navigation.getParam('userName');

    useEffect(() => {
        database.getLatestPatientEventByType(patientId, EventTypes.HouseholdEnvironment).then((response: any) => {
            if (response.length > 0) {
                const responseObj = JSON.parse(response)
                setPotableWater(responseObj.potableWater)
                setAnimals(responseObj.animals)
                setGasCooking(responseObj.gasCooking)
                setWoodCooking(responseObj.woodCooking)
                setHouseholdSize(responseObj.householdSize)
                setToilet(responseObj.toilet)
                setLatrine(responseObj.latrine)
                setFamilyViolence(responseObj.familyViolence)
                setFamilyViolenceText(responseObj.familyViolenceText)
            }
        })
    }, [])

    const submit = async () => {
        database.addEvent({
            id: uuid(),
            patient_id: patientId,
            visit_id: visitId,
            event_type: EventTypes.HouseholdEnvironment,
            event_metadata: JSON.stringify({
                doctor: userName,
                potableWater,
                animals,
                gasCooking,
                woodCooking,
                householdSize,
                toilet,
                latrine,
                familyViolence,
                familyViolenceText
            })
        }).then(() => {
            props.navigation.navigate('NewVisit')
        })
    };

    return (
        <LinearGradient colors={['#31BBF3', '#4D7FFF']} style={styles.containerLeft}>
            <View style={[styles.inputsContainer, { alignItems: 'flex-start' }]}>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignSelf: 'stretch', }}>
                    <Text style={[styles.text, { fontSize: 16, fontWeight: 'bold' }]}>{LocalizedStrings[language].householdEnvironment}</Text>
                </View>
                <View style={[styles.responseRow]}>
                    {radioButtons({ field: potableWater, action: setPotableWater, prompt: LocalizedStrings[language].potableWater, language })}
                </View>

                <View style={[styles.responseRow, { paddingBottom: 0 }]}>
                    <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].animals}</Text>
                </View>
                <View style={[styles.responseRow, { padding: 0 }]}>
                    <TextInput
                        style={styles.inputs}
                        onChangeText={(text) => setAnimals(text)}
                        value={animals}
                    />
                </View>

                <View style={[styles.responseRow]}>
                    {radioButtons({ field: gasCooking, action: setGasCooking, prompt: LocalizedStrings[language].gasCooking, language })}
                </View>

                <View style={[styles.responseRow]}>
                    {radioButtons({ field: woodCooking, action: setWoodCooking, prompt: LocalizedStrings[language].woodCooking, language })}
                </View>

                <View style={[styles.responseRow, { paddingVertical: 0 }]}>
                    <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].householdSize}</Text>
                </View>
                <View style={[styles.responseRow, { padding: 0 }]}>
                    <TextInput
                        style={styles.inputs}
                        onChangeText={(text) => setHouseholdSize(text)}
                        value={householdSize}
                        keyboardType={'numeric'}
                    />
                </View>

                <View style={[styles.responseRow]}>
                    {radioButtons({ field: toilet, action: setToilet, prompt: LocalizedStrings[language].toilet, language })}
                </View>

                <View style={[styles.responseRow]}>
                    {radioButtons({ field: latrine, action: setLatrine, prompt: LocalizedStrings[language].latrine, language })}
                </View>

                <View style={[styles.responseRow, { padding: 0 }]}>
                    <View style={[styles.responseRow]}>
                        {radioButtons({ field: familyViolence, action: setFamilyViolence, prompt: LocalizedStrings[language].familyViolence, language })}
                    </View>
                    {familyViolence ?
                        <View style={[styles.responseRow, { padding: 0 }]}>
                            <TextInput
                                placeholder={LocalizedStrings[language].details}
                                style={styles.inputs}
                                onChangeText={(text) => setFamilyViolenceText(text)}
                                value={familyViolenceText}
                            />
                        </View> : null}
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

export default HouseholdEnvironment;
