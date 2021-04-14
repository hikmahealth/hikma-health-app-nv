import React, { useState } from 'react';
import {
    View, Text, TextInput, ScrollView, Button, TouchableOpacity, Picker
} from 'react-native';

import { database } from "../../storage/Database";
import { v4 as uuid } from 'uuid';
import styles from '../Style';
import { EventTypes } from '../../enums/EventTypes';
import LinearGradient from 'react-native-linear-gradient';
import { datePicker } from '../Covid19Form'
import { radioButtons as symbolRadioButtons } from './UrineTests'
import { LocalizedStrings } from '../../enums/LocalizedStrings';

const formatTextDisplay = (field, dateField) => {
    if (!!field && !!dateField) {
        return (field + '   ' + dateField)
    }
    return null
}

const formatDisplay = (field, textField, dateField, language) => {
    if (field == null) {
        return null
    }
    if (!!field && textField == null) {
        return field
    }
    return field ? (LocalizedStrings[language].positive + '   ' + textField + '   ' + dateField) : LocalizedStrings[language].negative
}

export const LabTestsDisplay = (metadataObj, language) => {
    return (
        <View>
            <Text>{LocalizedStrings[language].doctor}: {metadataObj.doctor} </Text>
            <Text>{LocalizedStrings[language].CBCImmature}: {formatTextDisplay(metadataObj.CBCImmature, metadataObj.CBCImmatureDate)} </Text>
            <Text>{LocalizedStrings[language].CBCMCHC}: {formatTextDisplay(metadataObj.CBCMCHC, metadataObj.CBCMCHCDate)} </Text>
            <Text>{LocalizedStrings[language].CBCMCH}: {formatTextDisplay(metadataObj.CBCMCH, metadataObj.CBCMCHDate)} </Text>
            <Text>{LocalizedStrings[language].CBCBasophils}: {formatTextDisplay(metadataObj.CBCBasophils, metadataObj.CBCBasophilsDate)} </Text>
            <Text>{LocalizedStrings[language].CBCEosinophils}: {formatTextDisplay(metadataObj.CBCEosinophils, metadataObj.CBCEosinophilsDate)} </Text>
            <Text>{LocalizedStrings[language].CBCHematocrit}: {formatTextDisplay(metadataObj.CBCHematocrit, metadataObj.CBCHematocritDate)} </Text>
            <Text>{LocalizedStrings[language].CBCHemoglobin}: {formatTextDisplay(metadataObj.CBCHemoglobin, metadataObj.CBCHemoglobinDate)} </Text>
            <Text>{LocalizedStrings[language].CBCLymphocytes}: {formatTextDisplay(metadataObj.CBCLymphocytes, metadataObj.CBCLymphocytesDate)} </Text>
            <Text>{LocalizedStrings[language].CBCMonocytes}: {formatTextDisplay(metadataObj.CBCMonocytes, metadataObj.CBCMonocytesDate)} </Text>
            <Text>{LocalizedStrings[language].CBCPlatelets}: {formatTextDisplay(metadataObj.CBCPlatelets, metadataObj.CBCPlateletsDate)} </Text>
            <Text>{LocalizedStrings[language].CBCSegmented}: {formatTextDisplay(metadataObj.CBCSegmented, metadataObj.CBCSegmentedDate)} </Text>
            <Text>{LocalizedStrings[language].CBCWBC}: {formatTextDisplay(metadataObj.CBCWBC, metadataObj.CBCWBCDate)} </Text>
            <Text>{LocalizedStrings[language].CBCPlateletCount}: {formatTextDisplay(metadataObj.CBCPlateletCount, metadataObj.CBCPlateletCountDate)} </Text>
            <Text>{LocalizedStrings[language].CBCRBC}: {formatTextDisplay(metadataObj.CBCRBC, metadataObj.CBCRBCDate)} </Text>
            <Text>{LocalizedStrings[language].CBCMCV}: {formatTextDisplay(metadataObj.CBCMCV, metadataObj.CBCMCVDate)} </Text>
            <Text>{LocalizedStrings[language].biochemUric}: {formatTextDisplay(metadataObj.biochemUric, metadataObj.biochemUricDate)} </Text>
            <Text>{LocalizedStrings[language].biochemCreatinine}: {formatTextDisplay(metadataObj.biochemCreatinine, metadataObj.biochemCreatinineDate)} </Text>
            <Text>{LocalizedStrings[language].biochemGlucose}: {formatTextDisplay(metadataObj.biochemGlucose, metadataObj.biochemGlucoseDate)} </Text>
            <Text>{LocalizedStrings[language].lipidCholesterol}: {formatTextDisplay(metadataObj.lipidCholesterol, metadataObj.lipidCholesterolDate)} </Text>
            <Text>{LocalizedStrings[language].lipidHDL}: {formatTextDisplay(metadataObj.lipidHDL, metadataObj.lipidHDLDate)} </Text>
            <Text>{LocalizedStrings[language].lipidLDL}: {formatTextDisplay(metadataObj.lipidLDL, metadataObj.lipidLDLDate)} </Text>
            <Text>{LocalizedStrings[language].lipidTriglycerides}: {formatTextDisplay(metadataObj.lipidTriglycerides, metadataObj.lipidTriglyceridesDate)} </Text>
            <Text>{LocalizedStrings[language].lipidVLDL}: {formatTextDisplay(metadataObj.lipidVLDL, metadataObj.lipidVLDLDate)} </Text>

            <Text>{LocalizedStrings[language].fecalAntigens}: {formatDisplay(metadataObj.fecalAntigens, metadataObj.fecalAntigensText, metadataObj.fecalAntigensDate, language)} </Text>

            <Text>{LocalizedStrings[language].fecalMononuclear}: {formatTextDisplay(metadataObj.fecalMononuclear, metadataObj.fecalMononuclearDate)} </Text>
            <Text>{LocalizedStrings[language].fecalPolymophonuclear}: {formatTextDisplay(metadataObj.fecalPolymophonuclear, metadataObj.fecalPolymophonuclearDate)} </Text>
            <Text>{LocalizedStrings[language].fecalBacteria}: {formatTextDisplay(metadataObj.fecalBacteria, metadataObj.fecalBacteriaDate)} </Text>
            <Text>{LocalizedStrings[language].fecalErythrocytes}: {formatTextDisplay(metadataObj.fecalErythrocytes, metadataObj.fecalErythrocytesDate)} </Text>
            <Text>{LocalizedStrings[language].fecalLeukocytes}: {formatTextDisplay(metadataObj.fecalLeukocytes, metadataObj.fecalLeukocytesDate)} </Text>
            <Text>{LocalizedStrings[language].fecalOthers}: {formatTextDisplay(metadataObj.fecalOthers, metadataObj.fecalOthersDate)} </Text>
            <Text>{LocalizedStrings[language].fecalCysts}: {formatTextDisplay(metadataObj.fecalCysts, metadataObj.fecalCystsDate)} </Text>
            <Text>{LocalizedStrings[language].fecalTrophozoites}: {formatTextDisplay(metadataObj.fecalTrophozoites, metadataObj.fecalTrophozoitesDate)} </Text>
            <Text>{LocalizedStrings[language].fecalPH}: {formatTextDisplay(metadataObj.fecalPH, metadataObj.fecalPHDate)} </Text>
            <Text>{LocalizedStrings[language].fecalReducers}: {formatTextDisplay(metadataObj.fecalReducers, metadataObj.fecalReducersDate)} </Text>
            <Text>{LocalizedStrings[language].fecalOccult}: {formatTextDisplay(metadataObj.fecalOccult, metadataObj.fecalOccultDate)} </Text>
            <Text>{LocalizedStrings[language].fecalColor}: {formatTextDisplay(metadataObj.fecalColor, metadataObj.fecalColorDate)} </Text>
            <Text>{LocalizedStrings[language].fecalObservations}: {formatTextDisplay(metadataObj.fecalObservations, metadataObj.fecalObservationsDate)} </Text>
            <Text>{LocalizedStrings[language].fecalConsistency}: {formatTextDisplay(metadataObj.fecalConsistency, metadataObj.fecalConsistencyDate)} </Text>

            <Text>{LocalizedStrings[language].pregnancyHemogravindex}: {formatDisplay(metadataObj.pregnancyHemogravindex, metadataObj.pregnancyHemogravindexText, metadataObj.pregnancyHemogravindexDate, language)} </Text>
            <Text>{LocalizedStrings[language].pregnancyGravindex}: {formatDisplay(metadataObj.pregnancyGravindex, metadataObj.pregnancyGravindexText, metadataObj.pregnancyGravindexDate, language)} </Text>
            <Text>{LocalizedStrings[language].microbiologyPilori}: {formatDisplay(metadataObj.microbiologyPilori, metadataObj.microbiologyPiloriText, metadataObj.microbiologyPiloriDate, language)} </Text>
            <Text>{LocalizedStrings[language].microbiologyMalaria}: {formatDisplay(metadataObj.microbiologyMalaria, metadataObj.microbiologyMalariaText, metadataObj.microbiologyMalariaDate, language)} </Text>
            <Text>{LocalizedStrings[language].serologyStrep}: {formatDisplay(metadataObj.serologyStrep, metadataObj.serologyStrepText, metadataObj.serologyStrepDate, language)} </Text>
            <Text>{LocalizedStrings[language].serologyRheumatoid}: {formatDisplay(metadataObj.serologyRheumatoid, metadataObj.serologyRheumatoidText, metadataObj.serologyRheumatoidDate, language)} </Text>
            <Text>{LocalizedStrings[language].serologyOthers}: {formatDisplay(metadataObj.serologyOthers, metadataObj.serologyOthersText, metadataObj.serologyOthersDate, language)} </Text>
            <Text>{LocalizedStrings[language].serologyProtein}: {formatDisplay(metadataObj.serologyProtein, metadataObj.serologyProteinText, metadataObj.serologyProteinDate, language)} </Text>
            <Text>{LocalizedStrings[language].serologyVDRL}: {formatDisplay(metadataObj.serologyVDRL, metadataObj.serologyVDRLText, metadataObj.serologyVDRLDate, language)} </Text>
            <Text>{LocalizedStrings[language].serologyVIH}: {formatDisplay(metadataObj.serologyVIH, metadataObj.serologyVIHText, metadataObj.serologyVIHDate, language)} </Text>

            <Text>{LocalizedStrings[language].serologyVSG}: {formatTextDisplay(metadataObj.serologyVSG, metadataObj.serologyVSGDate)} </Text>
            <Text>{LocalizedStrings[language].bloodType}: {formatTextDisplay(metadataObj.bloodType, metadataObj.bloodTypeDate)} </Text>

            <Text>{LocalizedStrings[language].RHFactor}: {formatDisplay(metadataObj.RHFactor, metadataObj.RHFactorText, metadataObj.RHFactorDate, language)} </Text>
        </View>)
}

const LabTests = (props) => {
    let defaultTestDate = new Date().toISOString().split('T')[0]

    const [CBCImmature, setCBCImmature] = useState(null);
    const [CBCImmatureDate, setCBCImmatureDate] = useState(defaultTestDate);
    const [CBCMCHC, setCBCMCHC] = useState(null);
    const [CBCMCHCDate, setCBCMCHCDate] = useState(defaultTestDate);
    const [CBCMCH, setCBCMCH] = useState(null);
    const [CBCMCHDate, setCBCMCHDate] = useState(defaultTestDate);
    const [CBCBasophils, setCBCBasophils] = useState(null);
    const [CBCBasophilsDate, setCBCBasophilsDate] = useState(defaultTestDate);
    const [CBCEosinophils, setCBCEosinophils] = useState(null);
    const [CBCEosinophilsDate, setCBCEosinophilsDate] = useState(defaultTestDate);
    const [CBCHematocrit, setCBCHematocrit] = useState(null);
    const [CBCHematocritDate, setCBCHematocritDate] = useState(defaultTestDate);
    const [CBCHemoglobin, setCBCHemoglobin] = useState(null);
    const [CBCHemoglobinDate, setCBCHemoglobinDate] = useState(defaultTestDate);
    const [CBCLymphocytes, setCBCLymphocytes] = useState(null);
    const [CBCLymphocytesDate, setCBCLymphocytesDate] = useState(defaultTestDate);
    const [CBCMonocytes, setCBCMonocytes] = useState(null);
    const [CBCMonocytesDate, setCBCMonocytesDate] = useState(defaultTestDate);
    const [CBCPlatelets, setCBCPlatelets] = useState(null);
    const [CBCPlateletsDate, setCBCPlateletsDate] = useState(defaultTestDate);
    const [CBCSegmented, setCBCSegmented] = useState(null);
    const [CBCSegmentedDate, setCBCSegmentedDate] = useState(defaultTestDate);
    const [CBCWBC, setCBCWBC] = useState(null);
    const [CBCWBCDate, setCBCWBCDate] = useState(defaultTestDate);
    const [CBCPlateletCount, setCBCPlateletCount] = useState(null);
    const [CBCPlateletCountDate, setCBCPlateletCountDate] = useState(defaultTestDate);
    const [CBCRBC, setCBCRBC] = useState(null);
    const [CBCRBCDate, setCBCRBCDate] = useState(defaultTestDate);
    const [CBCMCV, setCBCMCV] = useState(null);
    const [CBCMCVDate, setCBCMCVDate] = useState(defaultTestDate);
    const [biochemUric, setBiochemUric] = useState(null);
    const [biochemUricDate, setBiochemUricDate] = useState(defaultTestDate);
    const [biochemCreatinine, setBiochemCreatinine] = useState(null);
    const [biochemCreatinineDate, setBiochemCreatinineDate] = useState(defaultTestDate);
    const [biochemGlucose, setBiochemGlucose] = useState(null);
    const [biochemGlucoseDate, setBiochemGlucoseDate] = useState(defaultTestDate);
    const [lipidCholesterol, setLipidCholesterol] = useState(null);
    const [lipidCholesterolDate, setLipidCholesterolDate] = useState(defaultTestDate);
    const [lipidHDL, setLipidHDL] = useState(null);
    const [lipidHDLDate, setLipidHDLDate] = useState(defaultTestDate);
    const [lipidLDL, setLipidLDL] = useState(null);
    const [lipidLDLDate, setLipidLDLDate] = useState(defaultTestDate);
    const [lipidTriglycerides, setLipidTriglycerides] = useState(null);
    const [lipidTriglyceridesDate, setLipidTriglyceridesDate] = useState(defaultTestDate);
    const [lipidVLDL, setLipidVLDL] = useState(null);
    const [lipidVLDLDate, setLipidVLDLDate] = useState(defaultTestDate);
    const [fecalAntigens, setFecalAntigens] = useState(null);
    const [fecalAntigensText, setFecalAntigensText] = useState(null);
    const [fecalAntigensDate, setFecalAntigensDate] = useState(defaultTestDate);
    const [fecalMononuclear, setFecalMononuclear] = useState(null);
    const [fecalMononuclearDate, setFecalMononuclearDate] = useState(defaultTestDate);
    const [fecalPolymophonuclear, setFecalPolymophonuclear] = useState(null);
    const [fecalPolymophonuclearDate, setFecalPolymophonuclearDate] = useState(defaultTestDate);
    const [fecalBacteria, setFecalBacteria] = useState(null);
    const [fecalBacteriaDate, setFecalBacteriaDate] = useState(defaultTestDate);
    const [fecalErythrocytes, setFecalErythrocytes] = useState(null);
    const [fecalErythrocytesDate, setFecalErythrocytesDate] = useState(defaultTestDate);
    const [fecalLeukocytes, setFecalLeukocytes] = useState(null);
    const [fecalLeukocytesDate, setFecalLeukocytesDate] = useState(defaultTestDate);
    const [fecalOthers, setFecalOthers] = useState(null);
    const [fecalOthersDate, setFecalOthersDate] = useState(defaultTestDate);
    const [fecalCysts, setFecalCysts] = useState(null);
    const [fecalCystsDate, setFecalCystsDate] = useState(defaultTestDate);
    const [fecalTrophozoites, setFecalTrophozoites] = useState(null);
    const [fecalTrophozoitesDate, setFecalTrophozoitesDate] = useState(defaultTestDate);
    const [fecalPH, setFecalPH] = useState(null);
    const [fecalPHDate, setFecalPHDate] = useState(defaultTestDate);
    const [fecalReducers, setFecalReducers] = useState(null);
    const [fecalReducersDate, setFecalReducersDate] = useState(defaultTestDate);
    const [fecalOccult, setFecalOccult] = useState(null);
    const [fecalOccultDate, setFecalOccultDate] = useState(defaultTestDate);
    const [fecalColor, setFecalColor] = useState(null);
    const [fecalColorDate, setFecalColorDate] = useState(defaultTestDate);
    const [fecalObservations, setFecalObservations] = useState(null);
    const [fecalObservationsDate, setFecalObservationsDate] = useState(defaultTestDate);
    const [fecalConsistency, setFecalConsistency] = useState(null);
    const [fecalConsistencyDate, setFecalConsistencyDate] = useState(defaultTestDate);
    const [pregnancyHemogravindex, setPregnancyHemogravindex] = useState(null);
    const [pregnancyHemogravindexText, setPregnancyHemogravindexText] = useState(null);
    const [pregnancyHemogravindexDate, setPregnancyHemogravindexDate] = useState(defaultTestDate);
    const [pregnancyGravindex, setPregnancyGravindex] = useState(null);
    const [pregnancyGravindexText, setPregnancyGravindexText] = useState(null);
    const [pregnancyGravindexDate, setPregnancyGravindexDate] = useState(defaultTestDate);
    const [microbiologyPilori, setMicrobiologyPilori] = useState(null);
    const [microbiologyPiloriText, setMicrobiologyPiloriText] = useState(null);
    const [microbiologyPiloriDate, setMicrobiologyPiloriDate] = useState(defaultTestDate);
    const [microbiologyMalaria, setMicrobiologyMalaria] = useState(null);
    const [microbiologyMalariaText, setMicrobiologyMalariaText] = useState(null);
    const [microbiologyMalariaDate, setMicrobiologyMalariaDate] = useState(defaultTestDate);
    const [serologyStrep, setSerologyStrep] = useState(null);
    const [serologyStrepText, setSerologyStrepText] = useState(null);
    const [serologyStrepDate, setSerologyStrepDate] = useState(defaultTestDate);
    const [serologyRheumatoid, setSerologyRheumatoid] = useState(null);
    const [serologyRheumatoidText, setSerologyRheumatoidText] = useState(null);
    const [serologyRheumatoidDate, setSerologyRheumatoidDate] = useState(defaultTestDate);
    const [serologyOthers, setSerologyOthers] = useState(null);
    const [serologyOthersText, setSerologyOthersText] = useState(null);
    const [serologyOthersDate, setSerologyOthersDate] = useState(defaultTestDate);
    const [serologyProtein, setSerologyProtein] = useState(null);
    const [serologyProteinText, setSerologyProteinText] = useState(null);
    const [serologyProteinDate, setSerologyProteinDate] = useState(defaultTestDate);
    const [serologyVDRL, setSerologyVDRL] = useState(null);
    const [serologyVDRLText, setSerologyVDRLText] = useState(null);
    const [serologyVDRLDate, setSerologyVDRLDate] = useState(defaultTestDate);
    const [serologyVIH, setSerologyVIH] = useState(null);
    const [serologyVIHText, setSerologyVIHText] = useState(null);
    const [serologyVIHDate, setSerologyVIHDate] = useState(defaultTestDate);
    const [serologyVSG, setSerologyVSG] = useState(null);
    const [serologyVSGDate, setSerologyVSGDate] = useState(defaultTestDate);
    const [bloodType, setBloodType] = useState('A+');
    const [bloodTypeDate, setBloodTypeDate] = useState(defaultTestDate);
    const [RHFactor, setRHFactor] = useState(null);
    const [RHFactorText, setRHFactorText] = useState(defaultTestDate);
    const [RHFactorDate, setRHFactorDate] = useState(defaultTestDate);

    const patientId = props.navigation.getParam('patientId');
    const visitId = props.navigation.getParam('visitId');
    const language = props.navigation.getParam('language', 'en');
    const userName = props.navigation.getParam('userName');

    const submit = async () => {
        database.addEvent({
            id: uuid(),
            patient_id: patientId,
            visit_id: visitId,
            event_type: EventTypes.LabTests,
            event_metadata: JSON.stringify({
                doctor: userName,
                CBCImmature,
                CBCImmatureDate,
                CBCMCHC,
                CBCMCHCDate,
                CBCMCH,
                CBCMCHDate,
                CBCBasophils,
                CBCBasophilsDate,
                CBCEosinophils,
                CBCEosinophilsDate,
                CBCHematocrit,
                CBCHematocritDate,
                CBCLymphocytes,
                CBCLymphocytesDate,
                CBCMonocytes,
                CBCMonocytesDate,
                CBCPlatelets,
                CBCPlateletsDate,
                CBCSegmented,
                CBCSegmentedDate,
                CBCWBC,
                CBCWBCDate,
                CBCPlateletCount,
                CBCPlateletCountDate,
                CBCRBC,
                CBCRBCDate,
                CBCMCV,
                CBCMCVDate,
                biochemUric,
                biochemUricDate,
                biochemCreatinine,
                biochemCreatinineDate,
                biochemGlucose,
                biochemGlucoseDate,
                lipidCholesterol,
                lipidCholesterolDate,
                lipidHDL,
                lipidHDLDate,
                lipidLDL,
                lipidLDLDate,
                lipidTriglycerides,
                lipidTriglyceridesDate,
                lipidVLDL,
                lipidVLDLDate,
                fecalAntigens,
                fecalAntigensText,
                fecalAntigensDate,
                fecalMononuclear,
                fecalMononuclearDate,
                fecalPolymophonuclear,
                fecalPolymophonuclearDate,
                fecalBacteria,
                fecalBacteriaDate,
                fecalErythrocytes,
                fecalErythrocytesDate,
                fecalLeukocytes,
                fecalLeukocytesDate,
                fecalOthers,
                fecalOthersDate,
                fecalCysts,
                fecalCystsDate,
                fecalTrophozoites,
                fecalTrophozoitesDate,
                fecalPH,
                fecalPHDate,
                fecalReducers,
                fecalReducersDate,
                fecalOccult,
                fecalOccultDate,
                fecalColor,
                fecalColorDate,
                fecalObservations,
                fecalObservationsDate,
                fecalConsistency,
                fecalConsistencyDate,
                pregnancyHemogravindex,
                pregnancyHemogravindexText,
                pregnancyHemogravindexDate,
                pregnancyGravindex,
                pregnancyGravindexText,
                pregnancyGravindexDate,
                microbiologyPilori,
                microbiologyPiloriText,
                microbiologyPiloriDate,
                microbiologyMalaria,
                microbiologyMalariaText,
                microbiologyMalariaDate,
                serologyStrep,
                serologyStrepText,
                serologyStrepDate,
                serologyRheumatoid,
                serologyRheumatoidText,
                serologyRheumatoidDate,
                serologyOthers,
                serologyOthersText,
                serologyOthersDate,
                serologyProtein,
                serologyProteinText,
                serologyProteinDate,
                serologyVDRL,
                serologyVDRLText,
                serologyVDRLDate,
                serologyVIH,
                serologyVIHText,
                serologyVIHDate,
                serologyVSG,
                serologyVSGDate,
                bloodType,
                bloodTypeDate,
                RHFactor,
                RHFactorText,
                RHFactorDate,
            })
        }).then(() => {
            props.navigation.navigate('NewVisit')
        })
    };

    const formRow = (field, action, textField, textAction, dateField, dateAction, prompt) => {

        return (
            <View style={[styles.responseRow, { padding: 0 }]}>
                <View style={[styles.responseRow]}>
                    {symbolRadioButtons({ field, action, prompt: LocalizedStrings[language][prompt], language })}
                </View>
                {field ?
                    <View style={[styles.responseRow, { padding: 0 }]}>
                        <TextInput
                            placeholder={LocalizedStrings[language].details}
                            style={styles.inputs}
                            onChangeText={(text) => textAction(text)}
                            value={textField}
                        />
                    </View> : null}
                {field ? datePicker({ future: true, placeholder: LocalizedStrings[language].date, date: dateField, action: dateAction, language }) : null}

            </View>)

    }

    return (
        <ScrollView>
            <LinearGradient colors={['#31BBF3', '#4D7FFF']} style={styles.containerLeft}>
                <View style={[styles.inputsContainer, { alignItems: 'flex-start' }]}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignSelf: 'stretch', }}>
                        <Text style={[styles.text, { fontSize: 16, fontWeight: 'bold' }]}>{LocalizedStrings[language].labTests}</Text>
                    </View>
                    <View style={[styles.responseRow, { paddingVertical: 0 }]}>
                        <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].CBCImmature}</Text>
                    </View>
                    <View style={[styles.responseRow, { padding: 0 }]}>
                        <TextInput
                            style={styles.inputs}
                            onChangeText={(text) => setCBCImmature(text)}
                            value={CBCImmature}
                            keyboardType={'numeric'}
                        />
                    </View>

                    <View>{CBCImmature ? datePicker({ future: true, placeholder: LocalizedStrings[language].date, date: CBCImmatureDate, action: setCBCImmatureDate, language }) : null}</View>

                    <View style={[styles.responseRow, { paddingVertical: 0 }]}>
                        <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].CBCMCHC}</Text>
                    </View>
                    <View style={[styles.responseRow, { padding: 0 }]}>
                        <TextInput
                            style={styles.inputs}
                            onChangeText={(text) => setCBCMCHC(text)}
                            value={CBCMCHC}
                            keyboardType={'numeric'}
                        />
                    </View>
                    <View>{CBCMCHC ? datePicker({ future: true, placeholder: LocalizedStrings[language].date, date: CBCMCHCDate, action: setCBCMCHCDate, language }) : null}</View>

                    <View style={[styles.responseRow, { paddingVertical: 0 }]}>
                        <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].CBCMCH}</Text>
                    </View>
                    <View style={[styles.responseRow, { padding: 0 }]}>
                        <TextInput
                            style={styles.inputs}
                            onChangeText={(text) => setCBCMCH(text)}
                            value={CBCMCH}
                            keyboardType={'numeric'}
                        />
                    </View>
                    <View>{CBCMCH ? datePicker({ future: true, placeholder: LocalizedStrings[language].date, date: CBCMCHDate, action: setCBCMCHDate, language }) : null}</View>

                    <View style={[styles.responseRow, { paddingVertical: 0 }]}>
                        <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].CBCBasophils}</Text>
                    </View>
                    <View style={[styles.responseRow, { padding: 0 }]}>
                        <TextInput
                            style={styles.inputs}
                            onChangeText={(text) => setCBCBasophils(text)}
                            value={CBCBasophils}
                            keyboardType={'numeric'}
                        />
                    </View>
                    <View>{CBCBasophils ? datePicker({ future: true, placeholder: LocalizedStrings[language].date, date: CBCBasophilsDate, action: setCBCBasophilsDate, language }) : null}</View>


                    <View style={[styles.responseRow, { paddingVertical: 0 }]}>
                        <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].CBCEosinophils}</Text>
                    </View>
                    <View style={[styles.responseRow, { padding: 0 }]}>
                        <TextInput
                            style={styles.inputs}
                            onChangeText={(text) => setCBCEosinophils(text)}
                            value={CBCEosinophils}
                            keyboardType={'numeric'}
                        />
                    </View>
                    <View>{CBCEosinophils ? datePicker({ future: true, placeholder: LocalizedStrings[language].date, date: CBCEosinophilsDate, action: setCBCEosinophilsDate, language }) : null}</View>

                    <View style={[styles.responseRow, { paddingVertical: 0 }]}>
                        <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].CBCHematocrit}</Text>
                    </View>
                    <View style={[styles.responseRow, { padding: 0 }]}>
                        <TextInput
                            style={styles.inputs}
                            onChangeText={(text) => setCBCHematocrit(text)}
                            value={CBCHematocrit}
                            keyboardType={'numeric'}
                        />
                    </View>
                    <View>{CBCHematocrit ? datePicker({ future: true, placeholder: LocalizedStrings[language].date, date: CBCHematocritDate, action: setCBCHematocritDate, language }) : null}</View>

                    <View style={[styles.responseRow, { paddingVertical: 0 }]}>
                        <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].CBCHemoglobin}</Text>
                    </View>
                    <View style={[styles.responseRow, { padding: 0 }]}>
                        <TextInput
                            style={styles.inputs}
                            onChangeText={(text) => setCBCHemoglobin(text)}
                            value={CBCHemoglobin}
                            keyboardType={'numeric'}
                        />
                    </View>
                    <View>{CBCHemoglobin ? datePicker({ future: true, placeholder: LocalizedStrings[language].date, date: CBCHemoglobinDate, action: setCBCHemoglobinDate, language }) : null}</View>

                    <View style={[styles.responseRow, { paddingVertical: 0 }]}>
                        <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].CBCLymphocytes}</Text>
                    </View>
                    <View style={[styles.responseRow, { padding: 0 }]}>
                        <TextInput
                            style={styles.inputs}
                            onChangeText={(text) => setCBCLymphocytes(text)}
                            value={CBCLymphocytes}
                            keyboardType={'numeric'}
                        />
                    </View>
                    <View>{CBCLymphocytes ? datePicker({ future: true, placeholder: LocalizedStrings[language].date, date: CBCLymphocytesDate, action: setCBCLymphocytesDate, language }) : null}</View>

                    <View style={[styles.responseRow, { paddingVertical: 0 }]}>
                        <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].CBCMonocytes}</Text>
                    </View>
                    <View style={[styles.responseRow, { padding: 0 }]}>
                        <TextInput
                            style={styles.inputs}
                            onChangeText={(text) => setCBCMonocytes(text)}
                            value={CBCMonocytes}
                            keyboardType={'numeric'}
                        />
                    </View>
                    <View>{CBCMonocytes ? datePicker({ future: true, placeholder: LocalizedStrings[language].date, date: CBCMonocytesDate, action: setCBCMonocytesDate, language }) : null}</View>

                    <View style={[styles.responseRow, { paddingVertical: 0 }]}>
                        <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].CBCPlatelets}</Text>
                    </View>
                    <View style={[styles.responseRow, { padding: 0 }]}>
                        <TextInput
                            style={styles.inputs}
                            onChangeText={(text) => setCBCPlatelets(text)}
                            value={CBCPlatelets}
                            keyboardType={'numeric'}
                        />
                    </View>
                    <View>{CBCPlatelets ? datePicker({ future: true, placeholder: LocalizedStrings[language].date, date: CBCPlateletsDate, action: setCBCPlateletsDate, language }) : null}</View>

                    <View style={[styles.responseRow, { paddingVertical: 0 }]}>
                        <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].CBCSegmented}</Text>
                    </View>
                    <View style={[styles.responseRow, { padding: 0 }]}>
                        <TextInput
                            style={styles.inputs}
                            onChangeText={(text) => setCBCSegmented(text)}
                            value={CBCSegmented}
                            keyboardType={'numeric'}
                        />
                    </View>
                    <View>{CBCSegmented ? datePicker({ future: true, placeholder: LocalizedStrings[language].date, date: CBCSegmentedDate, action: setCBCSegmentedDate, language }) : null}</View>

                    <View style={[styles.responseRow, { paddingBottom: 0 }]}>
                        <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].CBCWBC}</Text>
                    </View>
                    <View style={[styles.responseRow, { padding: 0 }]}>
                        <TextInput
                            style={styles.inputs}
                            onChangeText={(text) => setCBCWBC(text)}
                            value={CBCWBC}
                            keyboardType={'numeric'}
                        />
                    </View>
                    <View>{CBCWBC ? datePicker({ future: true, placeholder: LocalizedStrings[language].date, date: CBCWBCDate, action: setCBCWBCDate, language }) : null}</View>

                    <View style={[styles.responseRow, { paddingVertical: 0 }]}>
                        <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].CBCPlateletCount}</Text>
                    </View>
                    <View style={[styles.responseRow, { padding: 0 }]}>
                        <TextInput
                            style={styles.inputs}
                            onChangeText={(text) => setCBCPlateletCount(text)}
                            value={CBCPlateletCount}
                            keyboardType={'numeric'}
                        />
                    </View>
                    <View>{CBCPlateletCount ? datePicker({ future: true, placeholder: LocalizedStrings[language].date, date: CBCPlateletCountDate, action: setCBCPlateletCountDate, language }) : null}</View>

                    <View style={[styles.responseRow, { paddingVertical: 0 }]}>
                        <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].CBCRBC}</Text>
                    </View>
                    <View style={[styles.responseRow, { padding: 0 }]}>
                        <TextInput
                            style={styles.inputs}
                            onChangeText={(text) => setCBCRBC(text)}
                            value={CBCRBC}
                            keyboardType={'numeric'}
                        />
                    </View>
                    <View>{CBCRBC ? datePicker({ future: true, placeholder: LocalizedStrings[language].date, date: CBCRBCDate, action: setCBCRBCDate, language }) : null}</View>

                    <View style={[styles.responseRow, { paddingVertical: 0 }]}>
                        <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].CBCMCV}</Text>
                    </View>
                    <View style={[styles.responseRow, { padding: 0 }]}>
                        <TextInput
                            style={styles.inputs}
                            onChangeText={(text) => setCBCMCV(text)}
                            value={CBCMCV}
                            keyboardType={'numeric'}
                        />
                    </View>
                    <View>{CBCMCV ? datePicker({ future: true, placeholder: LocalizedStrings[language].date, date: CBCMCVDate, action: setCBCMCVDate, language }) : null}</View>

                    <View style={[styles.responseRow, { paddingVertical: 0 }]}>
                        <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].biochemUric}</Text>
                    </View>
                    <View style={[styles.responseRow, { padding: 0 }]}>
                        <TextInput
                            style={styles.inputs}
                            onChangeText={(text) => setBiochemUric(text)}
                            value={biochemUric}
                            keyboardType={'numeric'}
                        />
                    </View>
                    <View>{biochemUric ? datePicker({ future: true, placeholder: LocalizedStrings[language].date, date: biochemUricDate, action: setBiochemUricDate, language }) : null}</View>


                    <View style={[styles.responseRow, { paddingVertical: 0 }]}>
                        <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].biochemCreatinine}</Text>
                    </View>
                    <View style={[styles.responseRow, { padding: 0 }]}>
                        <TextInput
                            style={styles.inputs}
                            onChangeText={(text) => setBiochemCreatinine(text)}
                            value={biochemCreatinine}
                            keyboardType={'numeric'}
                        />
                    </View>
                    <View>{biochemCreatinine ? datePicker({ future: true, placeholder: LocalizedStrings[language].date, date: biochemCreatinineDate, action: setBiochemCreatinineDate, language }) : null}</View>

                    <View style={[styles.responseRow, { paddingVertical: 0 }]}>
                        <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].biochemGlucose}</Text>
                    </View>
                    <View style={[styles.responseRow, { padding: 0 }]}>
                        <TextInput
                            style={styles.inputs}
                            onChangeText={(text) => setBiochemGlucose(text)}
                            value={biochemGlucose}
                            keyboardType={'numeric'}
                        />
                    </View>
                    <View>{biochemGlucose ? datePicker({ future: true, placeholder: LocalizedStrings[language].date, date: biochemGlucoseDate, action: setBiochemGlucoseDate, language }) : null}</View>

                    <View style={[styles.responseRow, { paddingVertical: 0 }]}>
                        <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].lipidCholesterol}</Text>
                    </View>
                    <View style={[styles.responseRow, { padding: 0 }]}>
                        <TextInput
                            style={styles.inputs}
                            onChangeText={(text) => setLipidCholesterol(text)}
                            value={lipidCholesterol}
                        />
                    </View>
                    <View>{lipidCholesterol ? datePicker({ future: true, placeholder: LocalizedStrings[language].date, date: lipidCholesterolDate, action: setLipidCholesterolDate, language }) : null}</View>

                    <View style={[styles.responseRow, { paddingVertical: 0 }]}>
                        <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].lipidHDL}</Text>
                    </View>
                    <View style={[styles.responseRow, { padding: 0 }]}>
                        <TextInput
                            style={styles.inputs}
                            onChangeText={(text) => setLipidHDL(text)}
                            value={lipidHDL}
                        />
                    </View>
                    <View>{lipidHDL ? datePicker({ future: true, placeholder: LocalizedStrings[language].date, date: lipidHDLDate, action: setLipidHDLDate, language }) : null}</View>

                    <View style={[styles.responseRow, { paddingVertical: 0 }]}>
                        <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].lipidLDL}</Text>
                    </View>
                    <View style={[styles.responseRow, { padding: 0 }]}>
                        <TextInput
                            style={styles.inputs}
                            onChangeText={(text) => setLipidLDL(text)}
                            value={lipidLDL}
                        />
                    </View>
                    <View>{lipidLDL ? datePicker({ future: true, placeholder: LocalizedStrings[language].date, date: lipidLDLDate, action: setLipidLDLDate, language }) : null}</View>

                    <View style={[styles.responseRow, { paddingBottom: 0 }]}>
                        <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].lipidTriglycerides}</Text>
                    </View>
                    <View style={[styles.responseRow, { padding: 0 }]}>
                        <TextInput
                            style={styles.inputs}
                            onChangeText={(text) => setLipidTriglycerides(text)}
                            value={lipidTriglycerides}
                        />
                    </View>
                    <View>{lipidTriglycerides ? datePicker({ future: true, placeholder: LocalizedStrings[language].date, date: lipidTriglyceridesDate, action: setLipidTriglyceridesDate, language }) : null}</View>

                    <View style={[styles.responseRow, { paddingVertical: 0 }]}>
                        <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].lipidVLDL}</Text>
                    </View>
                    <View style={[styles.responseRow, { padding: 0 }]}>
                        <TextInput
                            style={styles.inputs}
                            onChangeText={(text) => setLipidVLDL(text)}
                            value={lipidVLDL}
                        />
                    </View>
                    <View>{lipidVLDL ? datePicker({ future: true, placeholder: LocalizedStrings[language].date, date: lipidVLDLDate, action: setLipidVLDLDate, language }) : null}</View>

                    {formRow(fecalAntigens, setFecalAntigens, fecalAntigensText, setFecalAntigensText, fecalAntigensDate, setFecalAntigensDate, 'fecalAntigens')}

                    <View style={[styles.responseRow, { paddingVertical: 0 }]}>
                        <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].fecalMononuclear}</Text>
                    </View>
                    <View style={[styles.responseRow, { padding: 0 }]}>
                        <TextInput
                            style={styles.inputs}
                            onChangeText={(text) => setFecalMononuclear(text)}
                            value={fecalMononuclear}
                            keyboardType={'numeric'}
                        />
                    </View>
                    <View>{fecalMononuclear ? datePicker({ future: true, placeholder: LocalizedStrings[language].date, date: fecalMononuclearDate, action: setFecalMononuclearDate, language }) : null}</View>

                    <View style={[styles.responseRow, { paddingVertical: 0 }]}>
                        <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].fecalPolymophonuclear}</Text>
                    </View>
                    <View style={[styles.responseRow, { padding: 0 }]}>
                        <TextInput
                            style={styles.inputs}
                            onChangeText={(text) => setFecalPolymophonuclear(text)}
                            value={fecalPolymophonuclear}
                            keyboardType={'numeric'}
                        />
                    </View>
                    <View>{fecalPolymophonuclear ? datePicker({ future: true, placeholder: LocalizedStrings[language].date, date: fecalPolymophonuclearDate, action: setFecalPolymophonuclearDate, language }) : null}</View>

                    <View style={[styles.responseRow, { paddingVertical: 0 }]}>
                        <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].fecalBacteria}</Text>
                    </View>
                    <View style={[styles.responseRow, { padding: 0 }]}>
                        <TextInput
                            style={styles.inputs}
                            onChangeText={(text) => setFecalBacteria(text)}
                            value={fecalBacteria}
                        />
                    </View>
                    <View>{fecalBacteria ? datePicker({ future: true, placeholder: LocalizedStrings[language].date, date: fecalBacteriaDate, action: setFecalBacteriaDate, language }) : null}</View>

                    <View style={[styles.responseRow, { paddingVertical: 0 }]}>
                        <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].fecalErythrocytes}</Text>
                    </View>
                    <View style={[styles.responseRow, { padding: 0 }]}>
                        <TextInput
                            style={styles.inputs}
                            onChangeText={(text) => setFecalErythrocytes(text)}
                            value={fecalErythrocytes}
                        />
                    </View>
                    <View>{fecalErythrocytes ? datePicker({ future: true, placeholder: LocalizedStrings[language].date, date: fecalErythrocytesDate, action: setFecalErythrocytesDate, language }) : null}</View>

                    <View style={[styles.responseRow, { paddingVertical: 0 }]}>
                        <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].fecalLeukocytes}</Text>
                    </View>
                    <View style={[styles.responseRow, { padding: 0 }]}>
                        <TextInput
                            style={styles.inputs}
                            onChangeText={(text) => setFecalLeukocytes(text)}
                            value={fecalLeukocytes}
                        />
                    </View>
                    <View>{fecalLeukocytes ? datePicker({ future: true, placeholder: LocalizedStrings[language].date, date: fecalLeukocytesDate, action: setFecalLeukocytesDate, language }) : null}</View>

                    <View style={[styles.responseRow, { paddingVertical: 0 }]}>
                        <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].fecalOthers}</Text>
                    </View>
                    <View style={[styles.responseRow, { padding: 0 }]}>
                        <TextInput
                            style={styles.inputs}
                            onChangeText={(text) => setFecalOthers(text)}
                            value={fecalOthers}
                        />
                    </View>
                    <View>{fecalOthers ? datePicker({ future: true, placeholder: LocalizedStrings[language].date, date: fecalOthersDate, action: setFecalOthersDate, language }) : null}</View>

                    <View style={[styles.responseRow, { paddingVertical: 0 }]}>
                        <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].fecalCysts}</Text>
                    </View>
                    <View style={[styles.responseRow, { padding: 0 }]}>
                        <TextInput
                            style={styles.inputs}
                            onChangeText={(text) => setFecalCysts(text)}
                            value={fecalCysts}
                        />
                    </View>
                    <View>{fecalCysts ? datePicker({ future: true, placeholder: LocalizedStrings[language].date, date: fecalCystsDate, action: setFecalCystsDate, language }) : null}</View>

                    <View style={[styles.responseRow, { paddingVertical: 0 }]}>
                        <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].fecalTrophozoites}</Text>
                    </View>
                    <View style={[styles.responseRow, { padding: 0 }]}>
                        <TextInput
                            style={styles.inputs}
                            onChangeText={(text) => setFecalTrophozoites(text)}
                            value={fecalTrophozoites}
                        />
                    </View>
                    <View>{fecalTrophozoites ? datePicker({ future: true, placeholder: LocalizedStrings[language].date, date: fecalTrophozoitesDate, action: setFecalTrophozoitesDate, language }) : null}</View>

                    <View style={[styles.responseRow, { paddingVertical: 0 }]}>
                        <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].fecalPH}</Text>
                    </View>
                    <View style={[styles.responseRow, { padding: 0 }]}>
                        <TextInput
                            style={styles.inputs}
                            onChangeText={(text) => setFecalPH(text)}
                            value={fecalPH}
                        />
                    </View>
                    <View>{fecalPH ? datePicker({ future: true, placeholder: LocalizedStrings[language].date, date: fecalPHDate, action: setFecalPHDate, language }) : null}</View>

                    <View style={[styles.responseRow, { paddingVertical: 0 }]}>
                        <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].fecalReducers}</Text>
                    </View>
                    <View style={[styles.responseRow, { padding: 0 }]}>
                        <TextInput
                            style={styles.inputs}
                            onChangeText={(text) => setFecalReducers(text)}
                            value={fecalReducers}
                        />
                    </View>
                    <View>{fecalReducers ? datePicker({ future: true, placeholder: LocalizedStrings[language].date, date: fecalReducersDate, action: setFecalReducersDate, language }) : null}</View>

                    <View style={[styles.responseRow, { paddingVertical: 0 }]}>
                        <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].fecalOccult}</Text>
                    </View>
                    <View style={[styles.responseRow, { padding: 0 }]}>
                        <TextInput
                            style={styles.inputs}
                            onChangeText={(text) => setFecalOccult(text)}
                            value={fecalOccult}
                        />
                    </View>
                    <View>{fecalOccult ? datePicker({ future: true, placeholder: LocalizedStrings[language].date, date: fecalOccultDate, action: setFecalOccultDate, language }) : null}</View>

                    <View style={[styles.responseRow, { paddingVertical: 0 }]}>
                        <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].fecalColor}</Text>
                    </View>
                    <View style={[styles.responseRow, { padding: 0 }]}>
                        <TextInput
                            style={styles.inputs}
                            onChangeText={(text) => setFecalColor(text)}
                            value={fecalColor}
                        />
                    </View>
                    <View>{fecalColor ? datePicker({ future: true, placeholder: LocalizedStrings[language].date, date: fecalColorDate, action: setFecalColorDate, language }) : null}</View>

                    <View style={[styles.responseRow, { paddingVertical: 0 }]}>
                        <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].fecalObservations}</Text>
                    </View>
                    <View style={[styles.responseRow, { padding: 0 }]}>
                        <TextInput
                            style={styles.inputs}
                            onChangeText={(text) => setFecalObservations(text)}
                            value={fecalObservations}
                        />
                    </View>
                    <View>{fecalObservations ? datePicker({ future: true, placeholder: LocalizedStrings[language].date, date: fecalObservationsDate, action: setFecalObservationsDate, language }) : null}</View>

                    <View style={[styles.responseRow, { paddingVertical: 0 }]}>
                        <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].fecalConsistency}</Text>
                    </View>
                    <View style={[styles.responseRow, { padding: 0 }]}>
                        <TextInput
                            style={styles.inputs}
                            onChangeText={(text) => setFecalConsistency(text)}
                            value={fecalConsistency}
                        />
                    </View>
                    <View>{fecalConsistency ? datePicker({ future: true, placeholder: LocalizedStrings[language].date, date: fecalConsistencyDate, action: setFecalConsistencyDate, language }) : null}</View>

                    {formRow(pregnancyHemogravindex, setPregnancyHemogravindex, pregnancyHemogravindexText, setPregnancyHemogravindexText, pregnancyHemogravindexDate, setPregnancyHemogravindexDate, 'pregnancyHemogravindex')}
                    {formRow(pregnancyGravindex, setPregnancyGravindex, pregnancyGravindexText, setPregnancyGravindexText, pregnancyGravindexDate, setPregnancyGravindexDate, 'pregnancyGravindex')}
                    {formRow(microbiologyPilori, setMicrobiologyPilori, microbiologyPiloriText, setMicrobiologyPiloriText, microbiologyPiloriDate, setMicrobiologyPiloriDate, 'microbiologyPilori')}
                    {formRow(microbiologyMalaria, setMicrobiologyMalaria, microbiologyMalariaText, setMicrobiologyMalariaText, microbiologyMalariaDate, setMicrobiologyMalariaDate, 'microbiologyMalaria')}
                    {formRow(serologyStrep, setSerologyStrep, serologyStrepText, setSerologyStrepText, serologyStrepDate, setSerologyStrepDate, 'serologyStrep')}
                    {formRow(serologyRheumatoid, setSerologyRheumatoid, serologyRheumatoidText, setSerologyRheumatoidText, serologyRheumatoidDate, setSerologyRheumatoidDate, 'serologyRheumatoid')}
                    {formRow(serologyOthers, setSerologyOthers, serologyOthersText, setSerologyOthersText, serologyOthersDate, setSerologyOthersDate, 'serologyOthers')}
                    {formRow(serologyProtein, setSerologyProtein, serologyProteinText, setSerologyProteinText, serologyProteinDate, setSerologyProteinDate, 'serologyProtein')}
                    {formRow(serologyVDRL, setSerologyVDRL, serologyVDRLText, setSerologyVDRLText, serologyVDRLDate, setSerologyVDRLDate, 'serologyVDRL')}
                    {formRow(serologyVIH, setSerologyVIH, serologyVIHText, setSerologyVIHText, serologyVIHDate, setSerologyVIHDate, 'serologyVIH')}

                    <View style={[styles.responseRow, { paddingVertical: 0 }]}>
                        <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].serologyVSG}</Text>
                    </View>
                    <View style={[styles.responseRow, { padding: 0 }]}>
                        <TextInput
                            style={styles.inputs}
                            onChangeText={(text) => setSerologyVSG(text)}
                            value={serologyVSG}
                        />
                    </View>
                    <View>{serologyVSG ? datePicker({ future: true, placeholder: LocalizedStrings[language].date, date: serologyVSGDate, action: setSerologyVSGDate, language }) : null}</View>

                    <View style={[styles.responseRow, { paddingVertical: 0 }]}>
                        <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].bloodType}</Text>
                    </View>
                    <View style={[styles.responseRow, { paddingVertical: 0 }]}>
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
                    </View>

                    <View>{bloodType ? datePicker({ future: true, placeholder: LocalizedStrings[language].date, date: bloodTypeDate, action: setBloodTypeDate, language }) : null}</View>

                    {formRow(RHFactor, setRHFactor, RHFactorText, setRHFactorText, RHFactorDate, setRHFactorDate, 'RHFactor')}

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

export default LabTests;
