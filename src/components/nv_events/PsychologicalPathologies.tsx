import React, { useState, useEffect } from 'react';
import {
    View, Text, Image, TextInput, TouchableOpacity, ScrollView
} from 'react-native';

import { database } from "../../storage/Database";
import { v4 as uuid } from 'uuid';
import styles from '../Style';
import { EventTypes } from '../../enums/EventTypes';
import LinearGradient from 'react-native-linear-gradient';
import { radioButtons } from '../Covid19Form'
import { LocalizedStrings } from '../../enums/LocalizedStrings';

export const PsychologicalPathologiesDisplay = (metadataObj, language) => {
    return (
        <View>
            <Text>Psychological Pathologies have been saved</Text>
            {/* TODO!! */}
        </View>)
}

const PsychologicalPathologies = (props) => {
    const [anxiety, setAnxiety] = useState(false);
    const [anxietyText, setAnxietyText] = useState(null);
    const [nuclearFamily, setNuclearFamily] = useState(false);
    const [nuclearFamilyText, setNuclearFamilyText] = useState(null);
    const [selfEsteem, setSelfEsteem] = useState(false);
    const [selfEsteemText, setSelfEsteemText] = useState(null);
    const [attentionDeficit, setAttentionDeficit] = useState(false);
    const [attentionDeficitText, setAttentionDeficitText] = useState(null);
    const [depression, setDepression] = useState(false);
    const [depressionText, setDepressionText] = useState(null);
    const [grief, setGrief] = useState(false);
    const [griefText, setGriefText] = useState(null);
    const [stress, setStress] = useState(false);
    const [stressText, setStressText] = useState(null);
    const [disfunctionalFamily, setDisfunctionalFamily] = useState(false);
    const [disfunctionalFamilyText, setDisfunctionalFamilyText] = useState(null);
    const [hyperactivity, setHyperactivity] = useState(false);
    const [hyperactivityText, setHyperactivityText] = useState(null);
    const [inappropriatePlay, setInappropriatePlay] = useState(false);
    const [inappropriatePlayText, setInappropriatePlayText] = useState(null);
    const [languageProblems, setLanguageProblems] = useState(false);
    const [languageProblemsText, setLanguageProblemsText] = useState(null);
    const [behavioralProblems, setBehavioralProblems] = useState(false);
    const [behavioralProblemsText, setBehavioralProblemsText] = useState(null);
    // Left off on refactoring variable names HERE
    const [neckPain, setNeckPain] = useState(false);
    const [neckPainText, setNeckPainText] = useState(null);
    const [cervicovaginitis, setCervicovaginitis] = useState(false);
    const [cervicovaginitisText, setCervicovaginitisText] = useState(null);
    const [sciaticPain, setSciaticPain] = useState(false);
    const [sciaticPainText, setSciaticPainText] = useState(null);
    const [cholesterol, setCholesterol] = useState(false);
    const [cholesterolText, setCholesterolText] = useState(null);
    const [infantColic, setInfantColic] = useState(false);
    const [infantColicText, setInfantColicText] = useState(null);
    const [conjunctivitis, setConjunctivitis] = useState(false);
    const [conjunctivitisText, setConjunctivitisText] = useState(null);
    const [covid, setCovid] = useState(false);
    const [covidText, setCovidText] = useState(null);
    const [malnourishment, setMalnourishment] = useState(false);
    const [malnourishmentText, setMalnourishmentText] = useState(null);
    const [migraines, setMigraines] = useState(false);
    const [migrainesText, setMigrainesText] = useState(null);
    const [other, setOther] = useState(null);



    const patientId = props.navigation.getParam('patientId');
    const visitId = props.navigation.getParam('visitId');
    const language = props.navigation.getParam('language', 'en');
    const userName = props.navigation.getParam('userName');

    const submit = async () => {
        database.addEvent({
            id: uuid(),
            patient_id: patientId,
            visit_id: visitId,
            event_type: EventTypes.MedicalPathologies,
            event_metadata: JSON.stringify({
                doctor: userName,
                miscarriages: anxiety,
                miscarriagesNumber: anxietyText,
                foodAllergies: nuclearFamily,
                foodAllergiesText: nuclearFamilyText,
                animalAllergies: selfEsteem,
                animalAllergiesText: selfEsteemText,
                atmosphereAllergies: attentionDeficit,
                atmosphereAllergiesText: attentionDeficitText,
                insectAllergies: depression,
                insectAllergiesText: depressionText,
                latexAllergies: grief,
                latexAllergiesText: griefText,
                medicineAllergies: stress,
                medicineAllergiesText: stressText,
                otherAllergies: disfunctionalFamily,
                otherAllergiesText: disfunctionalFamilyText,
                tonsillitis: hyperactivity,
                tonsillitisText: hyperactivityText,
                anemic: inappropriatePlay,
                anemicText: inappropriatePlayText,
                arthritis: languageProblems,
                arthritisText: languageProblemsText,
                asthma: behavioralProblems,
                asthmaText: behavioralProblemsText,
                neckPain,
                neckPainText,
                cervicovaginitis,
                cervicovaginitisText,
                sciaticPain,
                sciaticPainText,
                cholesterol,
                cholesterolText,
                infantColic,
                infantColicText,
                conjunctivitis,
                conjunctivitisText,
                covid,
                covidText,
                malnourishment,
                malnourishmentText,
                migraines,
                other,
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

                    <View style={[styles.responseRow]}>
                        {radioButtons({ field: anxiety, action: setAnxiety, prompt: LocalizedStrings[language].miscarriages, language })}
                    </View>
                    {anxiety ?
                        <View style={[styles.responseRow, { padding: 0 }]}>
                            <TextInput
                                style={styles.inputs}
                                onChangeText={(text) => setAnxietyText(text)}
                                value={anxietyText}
                                keyboardType='numeric'
                            />
                        </View> : null
                    }
                    {formRow(nuclearFamily, setNuclearFamily, nuclearFamilyText, setNuclearFamilyText, 'foodAllergies')}
                    {formRow(selfEsteem, setSelfEsteem, selfEsteemText, setSelfEsteemText, 'animalAllergies')}
                    {formRow(attentionDeficit, setAttentionDeficit, attentionDeficitText, setAttentionDeficitText, 'atmosphereAllergies')}
                    {formRow(depression, setDepression, depressionText, setDepressionText, 'insectAllergies')}
                    {formRow(grief, setGrief, griefText, setGriefText, 'latexAllergies')}
                    {formRow(stress, setStress, stressText, setStressText, 'medicineAllergies')}
                    {formRow(disfunctionalFamily, setDisfunctionalFamily, disfunctionalFamilyText, setDisfunctionalFamilyText, 'otherAllergies')}
                    {formRow(hyperactivity, setHyperactivity, hyperactivityText, setHyperactivityText, 'tonsillitis')}
                    {formRow(inappropriatePlay, setInappropriatePlay, inappropriatePlayText, setInappropriatePlayText, 'anemic')}
                    {formRow(languageProblems, setLanguageProblems, languageProblemsText, setLanguageProblemsText, 'arthritis')}
                    {formRow(behavioralProblems, setBehavioralProblems, behavioralProblemsText, setBehavioralProblemsText, 'asthma')}
                    {formRow(neckPain, setNeckPain, neckPainText, setNeckPainText, 'neckPain')}
                    {formRow(cervicovaginitis, setCervicovaginitis, cervicovaginitisText, setCervicovaginitisText, 'cervicovaginitis')}

                    {formRow(sciaticPain, setSciaticPain, sciaticPainText, setSciaticPainText, 'sciaticPain')}
                    {formRow(cholesterol, setCholesterol, cholesterolText, setCholesterolText, 'cholesterol')}
                    {formRow(infantColic, setInfantColic, infantColicText, setInfantColicText, 'infantColic')}
                    {formRow(conjunctivitis, setConjunctivitis, conjunctivitisText, setConjunctivitisText, 'conjunctivitis')}
                    {formRow(covid, setCovid, covidText, setCovidText, 'covid')}
                    {formRow(malnourishment, setMalnourishment, malnourishmentText, setMalnourishmentText, 'malnourishment')}
                    {formRow(migraines, setMigraines, migrainesText, setMigrainesText, 'migraines')}
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
                    <TouchableOpacity onPress={() => submit()}>
                        <Image source={require('../../images/login.png')} style={{ width: 75, height: 75 }} />
                    </TouchableOpacity>
                </View>
            </LinearGradient>
        </ScrollView>
    );
};

export default PsychologicalPathologies;
