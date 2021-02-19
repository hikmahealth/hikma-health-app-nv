import React, { useState } from 'react';
import {
    View, Text, TextInput, ScrollView, Button, Picker
} from 'react-native';

import { database } from "../../storage/Database";
import { v4 as uuid } from 'uuid';
import styles from '../Style';
import { EventTypes } from '../../enums/EventTypes';
import LinearGradient from 'react-native-linear-gradient';
import { radioButtons, datePicker } from '../Covid19Form'
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

const formatDateDisplay = (field, dateField, language) => {
    if (field !== null) {
        if (!!dateField) {
            return field ? (LocalizedStrings[language].yes + '   ' + dateField) : LocalizedStrings[language].no
        } else {
            return field ? (LocalizedStrings[language].yes) : LocalizedStrings[language].no
        }
    }
    return null
}

export const OptometryDisplay = (metadataObj, language) => {
    return (
        <View>
            <Text>{LocalizedStrings[language].doctor}: {metadataObj.doctor} </Text>
            <Text>{LocalizedStrings[language].cataract}: {!!metadataObj.cataract ? metadataObj.cataractText : LocalizedStrings[language].no} </Text>
            <Text>{LocalizedStrings[language].cataractOperation}: {formatDateDisplay(metadataObj.cataractOperation, metadataObj.cataractOperationDate, language)} </Text>
            <Text>{LocalizedStrings[language].glasses}: {metadataObj.glasses} </Text>
            <Text>{LocalizedStrings[language].glassesDuration}: {formatDisplay(metadataObj.glassesDuration, language)} </Text>
            <Text>{LocalizedStrings[language].orangeReflection}: {metadataObj.orangeReflection} </Text>
            <Text>{LocalizedStrings[language].visualAcuityOD}: {metadataObj.visualAcuityOD} </Text>
            <Text>{LocalizedStrings[language].visualAcuityOS}: {metadataObj.visualAcuityOS} </Text>
            <Text>{LocalizedStrings[language].autorefractorOD}: {metadataObj.autorefractorOD} </Text>
            <Text>{LocalizedStrings[language].autorefractorOS}: {metadataObj.autorefractorOS} </Text>
            <Text>{LocalizedStrings[language].phoropterOD}: {metadataObj.phoropterOD} </Text>
            <Text>{LocalizedStrings[language].phoropterOS}: {metadataObj.phoropterOS} </Text>
            <Text>{LocalizedStrings[language].phoropterADD}: {metadataObj.phoropterADD} </Text>
            <Text>{LocalizedStrings[language].lensesOD}: {metadataObj.lensesOD} </Text>
            <Text>{LocalizedStrings[language].lensesOS}: {metadataObj.lensesOS} </Text>
            <Text>{LocalizedStrings[language].lensesADD}: {metadataObj.lensesADD} </Text>
            <Text>{LocalizedStrings[language].visualAcuityLensesOD}: {metadataObj.visualAcuityLensesOD} </Text>
            <Text>{LocalizedStrings[language].visualAcuityLensesOS}: {metadataObj.visualAcuityLensesOS} </Text>
        </View>)
}

const Optometry = (props) => {
    const [cataract, setCataract] = useState(null);
    const [cataractText, setCataractText] = useState(null);
    const [cataractOperation, setCataractOperation] = useState(null);
    const [cataractOperationDate, setCataractOperationDate] = useState(null);
    const [glasses, setGlasses] = useState(null);
    const [glassesDuration, setGlassesDuration] = useState(null);
    const [orangeReflection, setOrangeReflection] = useState(null);
    const [visualAcuityOD, setVisualAcuityOD] = useState(null);
    const [visualAcuityOS, setVisualAcuityOS] = useState(null);
    const [autorefractorOD, setAutorefractorOD] = useState(null);
    const [autorefractorOS, setAutorefractorOS] = useState(null);
    const [phoropterOD, setPhoropterOD] = useState(null);
    const [phoropterOS, setPhoropterOS] = useState(null);
    const [phoropterADD, setPhoropterADD] = useState(null);
    const [lensesOD, setLensesOD] = useState(null);
    const [lensesOS, setLensesOS] = useState(null);
    const [lensesADD, setLensesADD] = useState(null);
    const [visualAcuityLensesOD, setVisualAcuityLensesOD] = useState(null);
    const [visualAcuityLensesOS, setVisualAcuityLensesOS] = useState(null);

    const patientId = props.navigation.getParam('patientId');
    const visitId = props.navigation.getParam('visitId');
    const language = props.navigation.getParam('language', 'en');
    const userName = props.navigation.getParam('userName');

    const submit = async () => {
        database.addEvent({
            id: uuid(),
            patient_id: patientId,
            visit_id: visitId,
            event_type: EventTypes.Optometry,
            event_metadata: JSON.stringify({
                doctor: userName,
                cataract,
                cataractText,
                cataractOperation,
                cataractOperationDate,
                glasses,
                glassesDuration,
                orangeReflection,
                visualAcuityOD,
                visualAcuityOS,
                autorefractorOD,
                autorefractorOS,
                phoropterOD,
                phoropterOS,
                phoropterADD,
                lensesOD,
                lensesOS,
                lensesADD,
                visualAcuityLensesOD,
                visualAcuityLensesOS,
            })
        }).then(() => {
            props.navigation.navigate('NewVisit')
        })
    };

    const formRow = (field, action, prompt) => {
        return (
            <View style={[styles.responseRow, { padding: 0 }]}>
                <View style={[styles.responseRow, { paddingVertical: 0 }]}>
                    <Text style={{ color: '#FFFFFF' }}>{prompt}</Text>
                </View>
                <View style={[styles.responseRow, { padding: 0 }]}>
                    <TextInput
                        style={styles.inputs}
                        onChangeText={(text) => action(text)}
                        value={field}
                        keyboardType={'numeric'}
                    />
                </View>
            </View>)
    }

    return (
        <ScrollView>
            <LinearGradient colors={['#31BBF3', '#4D7FFF']} style={styles.containerLeft}>
                <View style={[styles.inputsContainer, { alignItems: 'flex-start' }]}>
                    <View style={[styles.responseRow, { padding: 0 }]}>
                        <View style={[styles.responseRow]}>
                            {radioButtons({ field: cataract, action: setCataract, prompt: LocalizedStrings[language].cataract, language })}
                        </View>
                        {cataract ?
                            <View style={[styles.responseRow, { padding: 0 }]}>
                                <TextInput
                                    placeholder={LocalizedStrings[language].details}
                                    style={styles.inputs}
                                    onChangeText={(text) => setCataractText(text)}
                                    value={cataractText}
                                />
                            </View> : null}
                    </View>

                    <View style={[styles.responseRow]}>
                        {radioButtons({ field: cataractOperation, action: setCataractOperation, prompt: LocalizedStrings[language].cataractOperation, language })}
                    </View>
                    <View>{cataractOperation ? datePicker({ future: true, placeholder: LocalizedStrings[language].date, date: cataractOperationDate, action: setCataractOperationDate, language }) : null}</View>

                    <View style={[styles.responseRow, { paddingVertical: 0 }]}>
                        <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].glasses}</Text>
                    </View>
                    <View style={[styles.responseRow, { padding: 0 }]}>
                        <TextInput
                            style={styles.inputs}
                            onChangeText={(text) => setGlasses(text)}
                            value={glasses}
                        />
                    </View>
                    {formRow(glassesDuration, setGlassesDuration, LocalizedStrings[language].glassesDuration)}

                    <View style={[styles.responseRow]}>
                        {radioButtons({ field: orangeReflection, action: setOrangeReflection, prompt: LocalizedStrings[language].orangeReflection, language })}
                    </View>
                    {formRow(visualAcuityOD, setVisualAcuityOD, LocalizedStrings[language].visualAcuityOD)}
                    {formRow(visualAcuityOS, setVisualAcuityOS, LocalizedStrings[language].visualAcuityOS)}
                    {formRow(autorefractorOD, setAutorefractorOD, LocalizedStrings[language].autorefractorOD)}
                    {formRow(autorefractorOS, setAutorefractorOS, LocalizedStrings[language].autorefractorOS)}
                    {formRow(phoropterOD, setPhoropterOD, LocalizedStrings[language].phoropterOD)}
                    {formRow(phoropterOS, setPhoropterOS, LocalizedStrings[language].phoropterOS)}
                    {formRow(phoropterADD, setPhoropterADD, LocalizedStrings[language].phoropterADD)}
                    {formRow(lensesOD, setLensesOD, LocalizedStrings[language].lensesOD)}
                    {formRow(lensesOS, setLensesOS, LocalizedStrings[language].lensesOS)}
                    {formRow(lensesADD, setLensesADD, LocalizedStrings[language].lensesADD)}
                    {formRow(visualAcuityLensesOD, setVisualAcuityLensesOD, LocalizedStrings[language].visualAcuityLensesOD)}
                    {formRow(visualAcuityLensesOS, setVisualAcuityLensesOS, LocalizedStrings[language].visualAcuityLensesOS)}

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

export default Optometry;
