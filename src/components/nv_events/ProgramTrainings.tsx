import React, { useState, useEffect } from 'react';
import {
    View, Text, TextInput, ScrollView, Button
} from 'react-native';

import { database } from "../../storage/Database";
import { v4 as uuid } from 'uuid';
import styles from '../Style';
import { EventTypes } from '../../enums/EventTypes';
import LinearGradient from 'react-native-linear-gradient';
import { radioButtons } from '../Covid19Form'
import { LocalizedStrings } from '../../enums/LocalizedStrings';

const formatDisplay = (field, textField, language) => {
    if (field == null) {
        return null
    }
    if (!!field && textField == null) {
        return field
    }
    return field ? textField : LocalizedStrings[language].no

}

export const ProgramTrainingsDisplay = (metadataObj, language) => {
    return (
        <View>
            <Text>{LocalizedStrings[language].doctor}: {metadataObj.doctor} </Text>
            <Text>{LocalizedStrings[language].asthmaSubject}: {formatDisplay(metadataObj.asthmaSubject, metadataObj.asthmaSubjectText, language)} </Text>
            <Text>{LocalizedStrings[language].pregnancySubject}: {formatDisplay(metadataObj.pregnancySubject, metadataObj.pregnancySubjectText, language)} </Text>
            <Text>{LocalizedStrings[language].dispensarizados1Subject}: {formatDisplay(metadataObj.dispensarizados1Subject, metadataObj.dispensarizados1SubjectText, language)}</Text>
            <Text>{LocalizedStrings[language].dispensarizados2Subject}: {formatDisplay(metadataObj.dispensarizados2Subject, metadataObj.dispensarizados2SubjectText, language)}</Text>
            <Text>{LocalizedStrings[language].dispensarizados3Subject}: {formatDisplay(metadataObj.dispensarizados3Subject, metadataObj.dispensarizados3SubjectText, language)}</Text>
            <Text>{LocalizedStrings[language].dispensarizados4Subject}: {formatDisplay(metadataObj.dispensarizados4Subject, metadataObj.dispensarizados4SubjectText, language)}</Text>
            <Text>{LocalizedStrings[language].breastfeedingSubject}: {formatDisplay(metadataObj.breastfeedingSubject, metadataObj.breastfeedingSubjectText, language)}</Text>
            <Text>{LocalizedStrings[language].girlsGroupSubject}: {formatDisplay(metadataObj.girlsGroupSubject, metadataObj.girlsGroupSubjectText, language)}</Text>
            <Text>{LocalizedStrings[language].lbgtqSubject}: {formatDisplay(metadataObj.lbgtqSubject, metadataObj.lbgtqSubjectText, language)}</Text>
            <Text>{LocalizedStrings[language].boysOlderSubject}: {formatDisplay(metadataObj.boysOlderSubject, metadataObj.boysOlderSubjectText, language)}</Text>
            <Text>{LocalizedStrings[language].boysYoungerSubject}: {formatDisplay(metadataObj.boysYoungerSubject, metadataObj.boysYoungerSubjectText, language)}</Text>
            <Text>{LocalizedStrings[language].newMothersSubject}: {formatDisplay(metadataObj.newMothersSubject, metadataObj.newMothersSubjectText, language)}</Text>
            <Text>{LocalizedStrings[language].familyPlanningSubject}: {formatDisplay(metadataObj.familyPlanningSubject, metadataObj.familyPlanningSubjectText, language)}</Text>
            <Text>{LocalizedStrings[language].toddlerMothersSubject}: {formatDisplay(metadataObj.toddlerMothersSubject, metadataObj.toddlerMothersSubjectText, language)}</Text>
            <Text>{LocalizedStrings[language].healthPromotersSubject}: {formatDisplay(metadataObj.healthPromotersSubject, metadataObj.healthPromotersSubjectText, language)}</Text>
            <Text>{LocalizedStrings[language].hivSubject}: {formatDisplay(metadataObj.hivSubject, metadataObj.hivSubjectText, language)}</Text>
            <Text>{LocalizedStrings[language].otherSubject}: {formatDisplay(metadataObj.otherSubject, metadataObj.otherSubjectText, language)}</Text>
        </View>)
}

const ProgramTrainings = (props) => {
    const [asthmaSubject, setAsthmaSubject] = useState(null);
    const [asthmaSubjectText, setAsthmaSubjectText] = useState(null);
    const [pregnancySubject, setPregnancySubject] = useState(null);
    const [pregnancySubjectText, setPregnancySubjectText] = useState(null);
    const [dispensarizados1Subject, setDispensarizados1Subject] = useState(null);
    const [dispensarizados1SubjectText, setDispensarizados1SubjectText] = useState(null);
    const [dispensarizados2Subject, setDispensarizados2Subject] = useState(null);
    const [dispensarizados2SubjectText, setDispensarizados2SubjectText] = useState(null);
    const [dispensarizados3Subject, setDispensarizados3Subject] = useState(null);
    const [dispensarizados3SubjectText, setDispensarizados3SubjectText] = useState(null);
    const [dispensarizados4Subject, setDispensarizados4Subject] = useState(null);
    const [dispensarizados4SubjectText, setDispensarizados4SubjectText] = useState(null);
    const [breastfeedingSubject, setBreastfeedingSubject] = useState(null);
    const [breastfeedingSubjectText, setBreastfeedingSubjectText] = useState(null);
    const [girlsGroupSubject, setGirlsGroupSubject] = useState(null);
    const [girlsGroupSubjectText, setGirlsGroupSubjectText] = useState(null);
    const [lbgtqSubject, setLbgtqSubject] = useState(null);
    const [lbgtqSubjectText, setLbgtqSubjectText] = useState(null);
    const [boysOlderSubject, setBoysOlderSubject] = useState(null);
    const [boysOlderSubjectText, setBoysOlderSubjectText] = useState(null);
    const [boysYoungerSubject, setBoysYoungerSubject] = useState(null);
    const [boysYoungerSubjectText, setBoysYoungerSubjectText] = useState(null);
    const [newMothersSubject, setNewMothersSubject] = useState(null);
    const [newMothersSubjectText, setNewMothersSubjectText] = useState(null);
    const [familyPlanningSubject, setFamilyPlanningSubject] = useState(null);
    const [familyPlanningSubjectText, setFamilyPlanningSubjectText] = useState(null);
    const [toddlerMothersSubject, setToddlerMothersSubject] = useState(null);
    const [toddlerMothersSubjectText, setToddlerMothersSubjectText] = useState(null);
    const [healthPromotersSubject, setHealthPromotersSubject] = useState(null);
    const [healthPromotersSubjectText, setHealthPromotersSubjectText] = useState(null);
    const [hivSubject, setHivSubject] = useState(null);
    const [hivSubjectText, setHivSubjectText] = useState(null);
    const [otherSubject, setOtherSubject] = useState(null);
    const [otherSubjectText, setOtherSubjectText] = useState(null);

    const patientId = props.navigation.getParam('patientId');
    const visitId = props.navigation.getParam('visitId');
    const language = props.navigation.getParam('language', 'en');
    const userName = props.navigation.getParam('userName');

    useEffect(() => {
        database.getLatestPatientEventByType(patientId, EventTypes.ProgramTrainings).then((response: any) => {
            if (response.length > 0) {
                const responseObj = JSON.parse(response)

                setAsthmaSubject(responseObj.asthmaSubject)
                setAsthmaSubjectText(responseObj.asthmaSubjectText)
                setPregnancySubject(responseObj.pregnancySubject)
                setPregnancySubjectText(responseObj.pregnancySubjectText)
                setDispensarizados1Subject(responseObj.dispensarizados1Subject)
                setDispensarizados1SubjectText(responseObj.dispensarizados1SubjectText)
                setDispensarizados2Subject(responseObj.dispensarizados2Subject)
                setDispensarizados2SubjectText(responseObj.dispensarizados2SubjectText)
                setDispensarizados3Subject(responseObj.dispensarizados3Subject)
                setDispensarizados3SubjectText(responseObj.dispensarizados3SubjectText)
                setDispensarizados4Subject(responseObj.dispensarizados4Subject)
                setDispensarizados4SubjectText(responseObj.dispensarizados4SubjectText)
                setBreastfeedingSubject(responseObj.breastfeedingSubject)
                setBreastfeedingSubjectText(responseObj.breastfeedingSubjectText)
                setGirlsGroupSubject(responseObj.girlsGroupSubject)
                setGirlsGroupSubjectText(responseObj.girlsGroupSubjectText)
                setLbgtqSubject(responseObj.lbgtqSubject)
                setLbgtqSubjectText(responseObj.lbgtqSubjectText)
                setBoysOlderSubject(responseObj.boysOlderSubject)
                setBoysOlderSubjectText(responseObj.boysOlderSubjectText)
                setBoysYoungerSubject(responseObj.boysYoungerSubject)
                setBoysYoungerSubjectText(responseObj.boysYoungerSubjectText)
                setNewMothersSubject(responseObj.newMothersSubject)
                setNewMothersSubjectText(responseObj.newMothersSubjectText)
                setFamilyPlanningSubject(responseObj.familyPlanningSubject)
                setFamilyPlanningSubjectText(responseObj.familyPlanningSubjectText)
                setToddlerMothersSubject(responseObj.toddlerMothersSubject)
                setToddlerMothersSubjectText(responseObj.toddlerMothersSubjectText)
                setHealthPromotersSubject(responseObj.healthPromotersSubject)
                setHealthPromotersSubjectText(responseObj.healthPromotersSubjectText)
                setHivSubject(responseObj.hivSubject)
                setHivSubjectText(responseObj.hivSubjectText)
                setOtherSubject(responseObj.otherSubject)
                setOtherSubjectText(responseObj.otherSubjectText)
            }
        })
    }, [])

    const submit = async () => {
        database.addEvent({
            id: uuid(),
            patient_id: patientId,
            visit_id: visitId,
            event_type: EventTypes.ProgramTrainings,
            event_metadata: JSON.stringify({
                doctor: userName,
                asthmaSubject,
                asthmaSubjectText,
                pregnancySubject,
                pregnancySubjectText,
                dispensarizados1Subject,
                dispensarizados1SubjectText,
                dispensarizados2Subject,
                dispensarizados2SubjectText,
                dispensarizados3Subject,
                dispensarizados3SubjectText,
                dispensarizados4Subject,
                dispensarizados4SubjectText,
                breastfeedingSubject,
                breastfeedingSubjectText,
                girlsGroupSubject,
                girlsGroupSubjectText,
                lbgtqSubject,
                lbgtqSubjectText,
                boysOlderSubject,
                boysOlderSubjectText,
                boysYoungerSubject,
                boysYoungerSubjectText,
                newMothersSubject,
                newMothersSubjectText,
                familyPlanningSubject,
                familyPlanningSubjectText,
                toddlerMothersSubject,
                toddlerMothersSubjectText,
                healthPromotersSubject,
                healthPromotersSubjectText,
                hivSubject,
                hivSubjectText,
                otherSubject,
                otherSubjectText,
            })
        }).then(() => {
            props.navigation.navigate('NewVisit')
        })
    };

    const formRow = (field, action, textField, textAction, prompt) => {

        return (
            <View style={[styles.responseRow, { padding: 0 }]}>
                <View style={[styles.responseRow]}>
                    {radioButtons({ field, action, prompt: LocalizedStrings[language][prompt], language })}
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
            </View>)

    }

    return (
        <ScrollView>
            <LinearGradient colors={['#31BBF3', '#4D7FFF']} style={styles.containerLeft}>
                <View style={[styles.inputsContainer, { alignItems: 'flex-start' }]}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignSelf: 'stretch', }}>
                        <Text style={[styles.text, { fontSize: 16, fontWeight: 'bold' }]}>{LocalizedStrings[language].programTrainings}</Text>
                    </View>
                    {formRow(asthmaSubject, setAsthmaSubject, asthmaSubjectText, setAsthmaSubjectText, 'asthmaSubject')}
                    {formRow(pregnancySubject, setPregnancySubject, pregnancySubjectText, setPregnancySubjectText, 'pregnancySubject')}
                    {formRow(dispensarizados1Subject, setDispensarizados1Subject, dispensarizados1SubjectText, setDispensarizados1SubjectText, 'dispensarizados1Subject')}
                    {formRow(dispensarizados2Subject, setDispensarizados2Subject, dispensarizados2SubjectText, setDispensarizados2SubjectText, 'dispensarizados2Subject')}
                    {formRow(dispensarizados3Subject, setDispensarizados3Subject, dispensarizados3SubjectText, setDispensarizados3SubjectText, 'dispensarizados3Subject')}
                    {formRow(dispensarizados4Subject, setDispensarizados4Subject, dispensarizados4SubjectText, setDispensarizados4SubjectText, 'dispensarizados4Subject')}
                    {formRow(breastfeedingSubject, setBreastfeedingSubject, breastfeedingSubjectText, setBreastfeedingSubjectText, 'breastfeedingSubject')}
                    {formRow(girlsGroupSubject, setGirlsGroupSubject, girlsGroupSubjectText, setGirlsGroupSubjectText, 'girlsGroupSubject')}
                    {formRow(lbgtqSubject, setLbgtqSubject, lbgtqSubjectText, setLbgtqSubjectText, 'lbgtqSubject')}
                    {formRow(boysOlderSubject, setBoysOlderSubject, boysOlderSubjectText, setBoysOlderSubjectText, 'boysOlderSubject')}
                    {formRow(boysYoungerSubject, setBoysYoungerSubject, boysYoungerSubjectText, setBoysYoungerSubjectText, 'boysYoungerSubject')}
                    {formRow(newMothersSubject, setNewMothersSubject, newMothersSubjectText, setNewMothersSubjectText, 'newMothersSubject')}
                    {formRow(familyPlanningSubject, setFamilyPlanningSubject, familyPlanningSubjectText, setFamilyPlanningSubjectText, 'familyPlanningSubject')}
                    {formRow(toddlerMothersSubject, setToddlerMothersSubject, toddlerMothersSubjectText, setToddlerMothersSubjectText, 'toddlerMothersSubject')}
                    {formRow(healthPromotersSubject, setHealthPromotersSubject, healthPromotersSubjectText, setHealthPromotersSubjectText, 'healthPromotersSubject')}
                    {formRow(hivSubject, setHivSubject, hivSubjectText, setHivSubjectText, 'hivSubject')}
                    {formRow(otherSubject, setOtherSubject, otherSubjectText, setOtherSubjectText, 'otherSubject')}
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

export default ProgramTrainings;
