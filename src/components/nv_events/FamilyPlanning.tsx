import React, { useState, useEffect } from 'react';
import {
    View, Text, TextInput, ScrollView, Button, Picker
} from 'react-native';

import { database } from "../../storage/Database";
import { v4 as uuid } from 'uuid';
import styles from '../Style';
import { EventTypes } from '../../enums/EventTypes';
import LinearGradient from 'react-native-linear-gradient';
import { datePicker, radioButtons } from '../Covid19Form'
import { LocalizedStrings } from '../../enums/LocalizedStrings';

const formatIUDDisplay = (field, type, dateField, language) => {
    if (field !== null) {
        if (!!dateField && !!type) {
            return field ? (LocalizedStrings[language].yes + '   ' + type + '   ' + dateField) : LocalizedStrings[language].no
        } else {
            return field ? (LocalizedStrings[language].yes) : LocalizedStrings[language].no
        }
    }
    return null
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

const formatDisplay = (field, language) => {
    if (!!field) {
        return LocalizedStrings[language].yes
    }
    if (field === null) {
        return null
    }
    return LocalizedStrings[language].no
}

export const FamilyPlanningDisplay = (metadataObj, language) => {
    return (
        <View>
            <Text>{LocalizedStrings[language].doctor}: {metadataObj.doctor} </Text>
            <Text>{LocalizedStrings[language].ageSexualRelations}: {metadataObj.ageSexualRelations} </Text>
            <Text>{LocalizedStrings[language].numberChildren}: {metadataObj.numberChildren} </Text>
            <Text>{LocalizedStrings[language].moreChildren}: {formatDisplay(metadataObj.moreChildren, language)} </Text>
            <Text>{LocalizedStrings[language].abnormalBleeding}: {formatDisplay(metadataObj.abnormalBleeding, language)} </Text>
            <Text>{LocalizedStrings[language].varicose}: {formatDisplay(metadataObj.varicose, language)} </Text>
            <Text>{LocalizedStrings[language].tubalSterilization}: {formatDateDisplay(metadataObj.tubalSterilization, metadataObj.tubalSterilizationDate, language)} </Text>
            <Text>{LocalizedStrings[language].vasectomySterilization}: {formatDateDisplay(metadataObj.vasectomySterilization, metadataObj.vasectomySterilizationDate, language)} </Text>
            <Text>{LocalizedStrings[language].stdType}: {formatDateDisplay(metadataObj.stdType, metadataObj.stdTypeText, language)} </Text>
            <Text>{LocalizedStrings[language].injection}: {formatDateDisplay(metadataObj.injection, metadataObj.injectionDate, language)} </Text>
            <Text>{LocalizedStrings[language].iudBC}: {formatIUDDisplay(metadataObj.iudBC, metadataObj.iudBCType, metadataObj.iudBCDate, language)} </Text>
            <Text>{LocalizedStrings[language].implantBC}: {formatDateDisplay(metadataObj.implantBC, metadataObj.implantBCDate, language)} </Text>
            <Text>{LocalizedStrings[language].pillsBC}: {formatDateDisplay(metadataObj.pillsBC, metadataObj.pillsBCDate, language)} </Text>
            <Text>{LocalizedStrings[language].condoms}: {formatDisplay(metadataObj.condoms, language)} </Text>
            <Text>{LocalizedStrings[language].sexOrientation}: {metadataObj.sexOrientation} </Text>
            <Text>{LocalizedStrings[language].married}: {formatDateDisplay(metadataObj.married, metadataObj.marriedText, language)} </Text>
            <Text>{LocalizedStrings[language].permanentPartner}: {formatDateDisplay(metadataObj.permanentPartner, metadataObj.permanentPartnerText, language)} </Text>
        </View>)
}

const FamilyPlanning = (props) => {

    const [ageSexualRelations, setAgeSexualRelations] = useState(null);
    const [numberChildren, setNumberChildren] = useState(null);
    const [moreChildren, setMoreChildren] = useState(null);
    const [abnormalBleeding, setAbnormalBleeding] = useState(null);
    const [varicose, setVaricose] = useState(null);
    const [tubalSterilization, setTubalSterilization] = useState(null);
    const [tubalSterilizationDate, setTubalSterilizationDate] = useState('');
    const [vasectomySterilization, setVasectomySterilization] = useState(null);
    const [vasectomySterilizationDate, setVasectomySterilizationDate] = useState('');
    const [stdType, setStdType] = useState(null);
    const [stdTypeText, setStdTypeText] = useState('');
    const [injection, setInjection] = useState(null);
    const [injectionDate, setInjectionDate] = useState('');
    const [iudBC, setIudBC] = useState(null);
    const [iudBCType, setIudBCType] = useState('post aborto');
    const [iudBCDate, setIudBCDate] = useState('');
    const [implantBC, setImplantBC] = useState(null);
    const [implantBCDate, setImplantBCDate] = useState('');
    const [pillsBC, setPillsBC] = useState(null);
    const [pillsBCDate, setPillsBCDate] = useState('');
    const [condoms, setCondoms] = useState(null);
    const [sexOrientation, setSexOrientation] = useState(null);
    const [married, setMarried] = useState(null);
    const [marriedText, setMarriedText] = useState('');
    const [permanentPartner, setPermanentPartner] = useState(null);
    const [permanentPartnerText, setPermanentPartnerText] = useState(null);

    const patientId = props.navigation.getParam('patientId');
    const visitId = props.navigation.getParam('visitId');
    const language = props.navigation.getParam('language', 'en');
    const userName = props.navigation.getParam('userName');

    useEffect(() => {
        database.getLatestPatientEventByType(patientId, EventTypes.FamilyPlanning).then((response: any) => {
            if (response.length > 0) {
                const responseObj = JSON.parse(response)

                setAgeSexualRelations(responseObj.ageSexualRelations)
                setNumberChildren(responseObj.numberChildren)
                setMoreChildren(responseObj.moreChildren)
                setAbnormalBleeding(responseObj.abnormalBleeding)
                setVaricose(responseObj.varicose)
                setTubalSterilization(responseObj.tubalSterilization)
                setTubalSterilizationDate(responseObj.tubalSterilizationDate)
                setVasectomySterilization(responseObj.vasectomySterilization)
                setVasectomySterilizationDate(responseObj.vasectomySterilizationDate)
                setStdType(responseObj.stdType)
                setStdTypeText(responseObj.stdTypeText)
                setInjection(responseObj.injection)
                setInjectionDate(responseObj.injectionDate)
                setIudBC(responseObj.iudBC)
                setIudBCType(responseObj.iudBCType)
                setIudBCDate(responseObj.iudBCDate)
                setImplantBC(responseObj.implantBC)
                setImplantBCDate(responseObj.implantBCDate)
                setPillsBC(responseObj.pillsBC)
                setPillsBCDate(responseObj.pillsBCDate)
                setCondoms(responseObj.condoms)
                setSexOrientation(responseObj.sexOrientation)
                setMarried(responseObj.married)
                setMarriedText(responseObj.marriedText)
                setPermanentPartner(responseObj.permanentPartner)
                setPermanentPartnerText(responseObj.permanentPartnerText)

            }
        })
    }, [])

    const submit = async () => {
        database.addEvent({
            id: uuid(),
            patient_id: patientId,
            visit_id: visitId,
            event_type: EventTypes.FamilyPlanning,
            event_metadata: JSON.stringify({
                doctor: userName,
                ageSexualRelations,
                numberChildren,
                moreChildren,
                abnormalBleeding,
                varicose,
                tubalSterilization,
                tubalSterilizationDate,
                vasectomySterilization,
                vasectomySterilizationDate,
                stdType,
                stdTypeText,
                injection,
                injectionDate,
                iudBC,
                iudBCType,
                iudBCDate,
                implantBC,
                implantBCDate,
                pillsBC,
                pillsBCDate,
                condoms,
                sexOrientation,
                married,
                marriedText,
                permanentPartner,
                permanentPartnerText,
            })
        }).then(() => {
            props.navigation.navigate('NewVisit')
        })
    };

    return (
        <ScrollView>
            <LinearGradient colors={['#31BBF3', '#4D7FFF']} style={styles.containerLeft}>
                <View style={[styles.inputsContainer, { alignItems: 'flex-start' }]}>
                    <View style={[styles.responseRow, { paddingVertical: 0 }]}>
                        <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].ageSexualRelations}</Text>
                    </View>
                    <View style={[styles.responseRow, { padding: 0 }]}>
                        <TextInput
                            style={styles.inputs}
                            onChangeText={(text) => setAgeSexualRelations(text)}
                            value={ageSexualRelations}
                            keyboardType={'numeric'}
                        />
                    </View>
                    <View style={[styles.responseRow, { paddingVertical: 0 }]}>
                        <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].numberChildren}</Text>
                    </View>
                    <View style={[styles.responseRow, { padding: 0 }]}>
                        <TextInput
                            style={styles.inputs}
                            onChangeText={(text) => setNumberChildren(text)}
                            value={numberChildren}
                            keyboardType={'numeric'}

                        />
                    </View>

                    <View style={[styles.responseRow]}>
                        {radioButtons({ field: moreChildren, action: setMoreChildren, prompt: LocalizedStrings[language].moreChildren, language })}
                    </View>
                    <View style={[styles.responseRow]}>
                        {radioButtons({ field: abnormalBleeding, action: setAbnormalBleeding, prompt: LocalizedStrings[language].abnormalBleeding, language })}
                    </View>
                    <View style={[styles.responseRow]}>
                        {radioButtons({ field: varicose, action: setVaricose, prompt: LocalizedStrings[language].varicose, language })}
                    </View>

                    <View style={[styles.responseRow]}>
                        {radioButtons({ field: tubalSterilization, action: setTubalSterilization, prompt: LocalizedStrings[language].tubalSterilization, language })}
                    </View>
                    <View>{tubalSterilization ? datePicker({ future: true, placeholder: LocalizedStrings[language].date, date: tubalSterilizationDate, action: setTubalSterilizationDate, language }) : null}</View>
                    <View style={[styles.responseRow]}>
                        {radioButtons({ field: vasectomySterilization, action: setVasectomySterilization, prompt: LocalizedStrings[language].vasectomySterilization, language })}
                    </View>
                    <View>{vasectomySterilization ? datePicker({ future: true, placeholder: LocalizedStrings[language].date, date: vasectomySterilizationDate, action: setVasectomySterilizationDate, language }) : null}</View>

                    <View style={[styles.responseRow]}>
                        {radioButtons({ field: stdType, action: setStdType, prompt: LocalizedStrings[language].stdType, language })}
                    </View>
                    {stdType ?
                        <View style={[styles.responseRow, { padding: 0 }]}>
                            <TextInput
                                placeholder={LocalizedStrings[language].details}
                                style={styles.inputs}
                                onChangeText={(text) => setStdTypeText(text)}
                                value={stdTypeText}
                            />
                        </View> : null}

                    <View style={[styles.responseRow]}>
                        {radioButtons({ field: injection, action: setInjection, prompt: LocalizedStrings[language].injection, language })}
                    </View>
                    <View>{injection ? datePicker({ future: true, placeholder: LocalizedStrings[language].date, date: injectionDate, action: setInjectionDate, language }) : null}</View>

                    <View style={[styles.responseRow]}>
                        {radioButtons({ field: iudBC, action: setIudBC, prompt: LocalizedStrings[language].iudBC, language })}
                    </View>
                    {iudBC ? <Picker
                        selectedValue={iudBCType}
                        onValueChange={value => setIudBCType(value)}
                        style={[styles.picker, { width: 100 }]}
                    >
                        <Picker.Item value='post aborto' label='post aborto' />
                        <Picker.Item value='post pacenta' label='post pacenta' />
                        <Picker.Item value='transcesarea' label='transcesarea' />
                        <Picker.Item value='intervalo' label='intervalo' />

                    </Picker> : null}
                    {iudBC ? datePicker({ future: true, placeholder: LocalizedStrings[language].date, date: iudBCDate, action: setIudBCDate, language }) : null}

                    <View style={[styles.responseRow]}>
                        {radioButtons({ field: implantBC, action: setImplantBC, prompt: LocalizedStrings[language].implantBC, language })}
                    </View>
                    <View>{implantBC ? datePicker({ future: true, placeholder: LocalizedStrings[language].date, date: implantBCDate, action: setImplantBCDate, language }) : null}</View>
                    <View style={[styles.responseRow]}>
                        {radioButtons({ field: pillsBC, action: setPillsBC, prompt: LocalizedStrings[language].pillsBC, language })}
                    </View>
                    <View>{pillsBC ? datePicker({ future: true, placeholder: LocalizedStrings[language].date, date: pillsBCDate, action: setPillsBCDate, language }) : null}</View>
                    <View style={[styles.responseRow]}>
                        {radioButtons({ field: condoms, action: setCondoms, prompt: LocalizedStrings[language].condoms, language })}
                    </View>
                    <View style={[styles.responseRow, { paddingVertical: 0 }]}>
                        <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].sexOrientation}</Text>
                    </View>
                    <View style={[styles.responseRow, { padding: 0 }]}>
                        <TextInput
                            style={styles.inputs}
                            onChangeText={(text) => setSexOrientation(text)}
                            value={sexOrientation}
                        />
                    </View>

                    <View style={[styles.responseRow]}>
                        {radioButtons({ field: married, action: setMarried, prompt: LocalizedStrings[language].married, language })}
                    </View>
                    {married ?
                        <View style={[styles.responseRow, { padding: 0 }]}>
                            <TextInput
                                placeholder={LocalizedStrings[language].details}
                                style={styles.inputs}
                                onChangeText={(text) => setMarriedText(text)}
                                value={marriedText}
                            />
                        </View> : null}

                    <View style={[styles.responseRow]}>
                        {radioButtons({ field: permanentPartner, action: setPermanentPartner, prompt: LocalizedStrings[language].permanentPartner, language })}
                    </View>
                    {permanentPartner ?
                        <View style={[styles.responseRow, { padding: 0 }]}>
                            <TextInput
                                placeholder={LocalizedStrings[language].details}
                                style={styles.inputs}
                                onChangeText={(text) => setPermanentPartnerText(text)}
                                value={permanentPartnerText}
                            />
                        </View> : null}
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

export default FamilyPlanning;
