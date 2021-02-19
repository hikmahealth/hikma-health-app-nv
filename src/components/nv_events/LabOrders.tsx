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


const formatDisplay = (field, language) => {
    if (!!field) {
        return LocalizedStrings[language].yes
    }
    if (field === null) {
        return null
    }
    return LocalizedStrings[language].no
}

export const LabOrdersDisplay = (metadataObj, language) => {
    return (
        <View>
            <Text>{LocalizedStrings[language].doctor}: {metadataObj.doctor} </Text>
            <Text>{LocalizedStrings[language].hematicBiometry}: {formatDisplay(metadataObj.hematicBiometry, language)}</Text>
            <Text>{LocalizedStrings[language].urinalysis}: {formatDisplay(metadataObj.urinalysis, language)}</Text>
            <Text>{LocalizedStrings[language].biochemistry}: {formatDisplay(metadataObj.biochemistry, language)}</Text>
            <Text>{LocalizedStrings[language].lipidProfile}: {formatDisplay(metadataObj.lipidProfile, language)}</Text>
            <Text>{LocalizedStrings[language].pregnancyTest}: {formatDisplay(metadataObj.pregnancyTest, language)}</Text>
            <Text>{LocalizedStrings[language].immunologyTest}: {formatDisplay(metadataObj.immunologyTest, language)}</Text>
            <Text>{LocalizedStrings[language].PAPTest}: {formatDisplay(metadataObj.PAPTest, language)}</Text>
            <Text>{LocalizedStrings[language].serologyTest}: {formatDisplay(metadataObj.serologyTest, language)}</Text>
            <Text>{LocalizedStrings[language].stoolTest}: {formatDisplay(metadataObj.stoolTest, language)}</Text>
            <Text>{LocalizedStrings[language].fecalAntigens}: {formatDisplay(metadataObj.fecalAntigens, language)}</Text>
            <Text>{LocalizedStrings[language].bloodType}: {formatDisplay(metadataObj.bloodType, language)}</Text>
            <Text>{LocalizedStrings[language].HIVTest}: {formatDisplay(metadataObj.HIVTest, language)}</Text>
            <Text>{LocalizedStrings[language].other}: {metadataObj.other} </Text>
        
        </View>)
}

const LabOrders = (props) => {
    const [hematicBiometry, setHematicBiometry] = useState(null);
    const [urinalysis, setUrinalysis] = useState(null);
    const [biochemistry, setBiochemistry] = useState(null);
    const [lipidProfile, setLipidProfile] = useState(null);
    const [pregnancyTest, setPregnancyTest] = useState(null);
    const [immunologyTest, setImmunologyTest] = useState(null);
    const [PAPTest, setPAPTest] = useState(null);
    const [serologyTest, setSerologyTest] = useState(null);
    const [stoolTest, setStoolTest] = useState(null);
    const [fecalAntigens, setFecalAntigens] = useState(null);
    const [bloodType, setBloodType] = useState(null);
    const [HIVTest, setHIVTest] = useState(null);
    const [other, setOther] = useState(null);


    const patientId = props.navigation.getParam('patientId');
    const visitId = props.navigation.getParam('visitId');
    const language = props.navigation.getParam('language', 'en');
    const userName = props.navigation.getParam('userName');

    useEffect(() => {
        database.getLatestPatientEventByType(patientId, EventTypes.HouseholdEnvironment).then((response: any) => {
            if (response.length > 0) {
                const responseObj = JSON.parse(response)
                setHematicBiometry(responseObj.hematicBiometry)
                setUrinalysis(responseObj.urinalysis)
                setBiochemistry(responseObj.biochemistry)
                setLipidProfile(responseObj.lipidProfile)
                setPregnancyTest(responseObj.pregnancyTest)
                setImmunologyTest(responseObj.immunologyTest)
                setPAPTest(responseObj.PAPTest)
                setSerologyTest(responseObj.serologyTest)
                setStoolTest(responseObj.stoolTest)
                setFecalAntigens(responseObj.fecalAntigens)
                setBloodType(responseObj.bloodType)
                setHIVTest(responseObj.HIVTest)
                setOther(responseObj.other)

            }
        })
    }, [])

    const submit = async () => {
        database.addEvent({
            id: uuid(),
            patient_id: patientId,
            visit_id: visitId,
            event_type: EventTypes.LabOrders,
            event_metadata: JSON.stringify({
                doctor: userName,
                hematicBiometry,
                urinalysis,
                biochemistry,
                lipidProfile,
                pregnancyTest,
                immunologyTest,
                PAPTest,
                serologyTest,
                stoolTest,
                fecalAntigens,
                bloodType,
                HIVTest,
                other,

            })
        }).then(() => {
            props.navigation.navigate('NewVisit')
        })
    };

    return (
        <LinearGradient colors={['#31BBF3', '#4D7FFF']} style={styles.containerLeft}>
            <View style={[styles.inputsContainer, { alignItems: 'flex-start' }]}>
                <View style={[styles.responseRow]}>
                    {radioButtons({ field: hematicBiometry, action: setHematicBiometry, prompt: LocalizedStrings[language].hematicBiometry, language })}
                </View>
                <View style={[styles.responseRow]}>
                    {radioButtons({ field: urinalysis, action: setUrinalysis, prompt: LocalizedStrings[language].urinalysis, language })}
                </View>
                <View style={[styles.responseRow]}>
                    {radioButtons({ field: biochemistry, action: setBiochemistry, prompt: LocalizedStrings[language].biochemistry, language })}
                </View>
                <View style={[styles.responseRow]}>
                    {radioButtons({ field: lipidProfile, action: setLipidProfile, prompt: LocalizedStrings[language].lipidProfile, language })}
                </View>
                <View style={[styles.responseRow]}>
                    {radioButtons({ field: pregnancyTest, action: setPregnancyTest, prompt: LocalizedStrings[language].pregnancyTest, language })}
                </View>
                <View style={[styles.responseRow]}>
                    {radioButtons({ field: immunologyTest, action: setImmunologyTest, prompt: LocalizedStrings[language].immunologyTest, language })}
                </View>
                <View style={[styles.responseRow]}>
                    {radioButtons({ field: PAPTest, action: setPAPTest, prompt: LocalizedStrings[language].PAPTest, language })}
                </View>
                <View style={[styles.responseRow]}>
                    {radioButtons({ field: serologyTest, action: setSerologyTest, prompt: LocalizedStrings[language].serologyTest, language })}
                </View>
                <View style={[styles.responseRow]}>
                    {radioButtons({ field: stoolTest, action: setStoolTest, prompt: LocalizedStrings[language].stoolTest, language })}
                </View>
                <View style={[styles.responseRow]}>
                    {radioButtons({ field: fecalAntigens, action: setFecalAntigens, prompt: LocalizedStrings[language].fecalAntigens, language })}
                </View>
                <View style={[styles.responseRow]}>
                    {radioButtons({ field: bloodType, action: setBloodType, prompt: LocalizedStrings[language].bloodType, language })}
                </View>
                <View style={[styles.responseRow]}>
                    {radioButtons({ field: HIVTest, action: setHIVTest, prompt: LocalizedStrings[language].HIVTest, language })}
                </View>

                <View style={[styles.responseRow, { paddingBottom: 0 }]}>
                    <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].other}</Text>
                </View>
                <View style={[styles.responseRow, { padding: 0 }]}>
                    <TextInput
                        style={styles.inputs}
                        onChangeText={(text) => setOther(text)}
                        value={other}
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

export default LabOrders;
