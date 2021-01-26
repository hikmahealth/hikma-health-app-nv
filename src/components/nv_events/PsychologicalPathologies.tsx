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

export const PsychologicalPathologiesDisplay = (metadataObj, language) => {
    return (
        <View>
            <Text>{LocalizedStrings[language].doctor}: {metadataObj.doctor} </Text>
            <Text>{LocalizedStrings[language].anxiety}: {formatDisplay(metadataObj.anxiety, metadataObj.anxietyText, language)} </Text>
            <Text>{LocalizedStrings[language].nuclearFamily}: {formatDisplay(metadataObj.nuclearFamily, metadataObj.nuclearFamilyText, language)} </Text>
            <Text>{LocalizedStrings[language].selfEsteem}: {formatDisplay(metadataObj.selfEsteem, metadataObj.selfEsteemText, language)}</Text>
            <Text>{LocalizedStrings[language].attentionDeficit}: {formatDisplay(metadataObj.attentionDeficit, metadataObj.attentionDeficitText, language)}</Text>
            <Text>{LocalizedStrings[language].depression}: {formatDisplay(metadataObj.depression, metadataObj.depressionText, language)}</Text>
            <Text>{LocalizedStrings[language].grief}: {formatDisplay(metadataObj.grief, metadataObj.griefText, language)}</Text>
            <Text>{LocalizedStrings[language].stress}: {formatDisplay(metadataObj.stress, metadataObj.stressText, language)}</Text>
            <Text>{LocalizedStrings[language].disfunctionalFamily}: {formatDisplay(metadataObj.disfunctionalFamily, metadataObj.disfunctionalFamilyText, language)}</Text>
            <Text>{LocalizedStrings[language].hyperactivity}: {formatDisplay(metadataObj.hyperactivity, metadataObj.hyperactivityText, language)}</Text>
            <Text>{LocalizedStrings[language].inappropriatePlay}: {formatDisplay(metadataObj.inappropriatePlay, metadataObj.inappropriatePlayText, language)}</Text>
            <Text>{LocalizedStrings[language].languageProblems}: {formatDisplay(metadataObj.languageProblems, metadataObj.languageProblemsText, language)}</Text>
            <Text>{LocalizedStrings[language].behavioralProblems}: {formatDisplay(metadataObj.behavioralProblems, metadataObj.behavioralProblemsText, language)}</Text>
            <Text>{LocalizedStrings[language].schoolProblems}: {formatDisplay(metadataObj.schoolProblems, metadataObj.schoolProblemsText, language)}</Text>
            <Text>{LocalizedStrings[language].psychosis}: {formatDisplay(metadataObj.psychosis, metadataObj.psychosisText, language)}</Text>
            <Text>{LocalizedStrings[language].suicidal}: {formatDisplay(metadataObj.suicidal, metadataObj.suicidalText, language)}</Text>
            <Text>{LocalizedStrings[language].personalityDisorders}: {formatDisplay(metadataObj.personalityDisorders, metadataObj.personalityDisordersText, language)}</Text>
            <Text>{LocalizedStrings[language].trauma}: {formatDisplay(metadataObj.trauma, metadataObj.traumaText, language)}</Text>
            <Text>{LocalizedStrings[language].psychologicalEvaluations}: {formatDisplay(metadataObj.psychologicalEvaluations, metadataObj.psychologicalEvaluationsText, language)}</Text>
            <Text>{LocalizedStrings[language].domesticViolenceFamily}: {formatDisplay(metadataObj.domesticViolenceFamily, metadataObj.domesticViolenceFamilyText, language)}</Text>
            <Text>{LocalizedStrings[language].domesticViolenceSpouse}: {formatDisplay(metadataObj.domesticViolenceSpouse, metadataObj.domesticViolenceSpouseText, language)}</Text>
            <Text>{LocalizedStrings[language].referralHospital}: {formatDisplay(metadataObj.referralHospital, metadataObj.referralHospitalText, language)}</Text>
            <Text>{LocalizedStrings[language].other}: {formatDisplay(metadataObj.other, null, language)}</Text>
        </View>)
}

const PsychologicalPathologies = (props) => {
    const [anxiety, setAnxiety] = useState(null);
    const [anxietyText, setAnxietyText] = useState(null);
    const [nuclearFamily, setNuclearFamily] = useState(null);
    const [nuclearFamilyText, setNuclearFamilyText] = useState(null);
    const [selfEsteem, setSelfEsteem] = useState(null);
    const [selfEsteemText, setSelfEsteemText] = useState(null);
    const [attentionDeficit, setAttentionDeficit] = useState(null);
    const [attentionDeficitText, setAttentionDeficitText] = useState(null);
    const [depression, setDepression] = useState(null);
    const [depressionText, setDepressionText] = useState(null);
    const [grief, setGrief] = useState(null);
    const [griefText, setGriefText] = useState(null);
    const [stress, setStress] = useState(null);
    const [stressText, setStressText] = useState(null);
    const [disfunctionalFamily, setDisfunctionalFamily] = useState(null);
    const [disfunctionalFamilyText, setDisfunctionalFamilyText] = useState(null);
    const [hyperactivity, setHyperactivity] = useState(null);
    const [hyperactivityText, setHyperactivityText] = useState(null);
    const [inappropriatePlay, setInappropriatePlay] = useState(null);
    const [inappropriatePlayText, setInappropriatePlayText] = useState(null);
    const [languageProblems, setLanguageProblems] = useState(null);
    const [languageProblemsText, setLanguageProblemsText] = useState(null);
    const [behavioralProblems, setBehavioralProblems] = useState(null);
    const [behavioralProblemsText, setBehavioralProblemsText] = useState(null);
    const [schoolProblems, setSchoolProblems] = useState(null);
    const [schoolProblemsText, setSchoolProblemsText] = useState(null);
    const [psychosis, setPsychosis] = useState(null);
    const [psychosisText, setPsychosisText] = useState(null);
    const [suicidal, setSuicidal] = useState(null);
    const [suicidalText, setSuicidalText] = useState(null);
    const [personalityDisorders, setPersonalityDisorders] = useState(null);
    const [personalityDisordersText, setPersonalityDisordersText] = useState(null);
    const [trauma, setTrauma] = useState(null);
    const [traumaText, setTraumaText] = useState(null);
    const [psychologicalEvaluations, setPsychologicalEvaluations] = useState(null);
    const [psychologicalEvaluationsText, setPsychologicalEvaluationsText] = useState(null);
    const [domesticViolenceFamily, setDomesticViolenceFamily] = useState(null);
    const [domesticViolenceFamilyText, setDomesticViolenceFamilyText] = useState(null);
    const [domesticViolenceSpouse, setDomesticViolenceSpouse] = useState(null);
    const [domesticViolenceSpouseText, setDomesticViolenceSpouseText] = useState(null);
    const [referralHospital, setReferralHospital] = useState(null);
    const [referralHospitalText, setReferralHospitalText] = useState(null);
    const [other, setOther] = useState(null);

    const patientId = props.navigation.getParam('patientId');
    const visitId = props.navigation.getParam('visitId');
    const language = props.navigation.getParam('language', 'en');
    const userName = props.navigation.getParam('userName');

    useEffect(() => {
        database.getLatestPatientEventByType(patientId, EventTypes.PsychologicalPathologies).then((response: any) => {
            if (response.length > 0) {
                const responseObj = JSON.parse(response)

                setAnxiety(responseObj.anxiety)
                setAnxietyText(responseObj.anxietyText)
                setNuclearFamily(responseObj.nuclearFamily)
                setNuclearFamilyText(responseObj.nuclearFamilyText)
                setSelfEsteem(responseObj.selfEsteem)
                setSelfEsteemText(responseObj.selfEsteemText)
                setAttentionDeficit(responseObj.attentionDeficit)
                setAttentionDeficitText(responseObj.attentionDeficitText)
                setDepression(responseObj.depression)
                setDepressionText(responseObj.depressionText)
                setGrief(responseObj.grief)
                setGriefText(responseObj.griefText)
                setStress(responseObj.stress)
                setStressText(responseObj.stressText)
                setDisfunctionalFamily(responseObj.disfunctionalFamily)
                setDisfunctionalFamilyText(responseObj.disfunctionalFamilyText)
                setHyperactivity(responseObj.hyperactivity)
                setHyperactivityText(responseObj.hyperactivityText)
                setInappropriatePlay(responseObj.inappropriatePlay)
                setInappropriatePlayText(responseObj.inappropriatePlayText)
                setLanguageProblems(responseObj.languageProblems)
                setLanguageProblemsText(responseObj.languageProblemsText)
                setBehavioralProblems(responseObj.behavioralProblems)
                setBehavioralProblemsText(responseObj.behavioralProblemsText)
                setSchoolProblems(responseObj.schoolProblems)
                setSchoolProblemsText(responseObj.schoolProblemsText)
                setPsychosis(responseObj.psychosis)
                setPsychosisText(responseObj.psychosisText)
                setSuicidal(responseObj.suicidal)
                setSuicidalText(responseObj.suicidalText)
                setPersonalityDisorders(responseObj.personalityDisorders)
                setPersonalityDisordersText(responseObj.personalityDisordersText)
                setTrauma(responseObj.trauma)
                setTraumaText(responseObj.traumaText)
                setPsychologicalEvaluations(responseObj.psychologicalEvaluations)
                setPsychologicalEvaluationsText(responseObj.psychologicalEvaluationsText)
                setDomesticViolenceFamily(responseObj.domesticViolenceFamily)
                setDomesticViolenceFamilyText(responseObj.domesticViolenceFamilyText)
                setDomesticViolenceSpouse(responseObj.domesticViolenceSpouse)
                setDomesticViolenceSpouseText(responseObj.domesticViolenceSpouseText)
                setReferralHospital(responseObj.referralHospital)
                setReferralHospitalText(responseObj.referralHospitalText)
                setOther(responseObj.other)
            }
        })
    }, [])

    const submit = async () => {
        database.addEvent({
            id: uuid(),
            patient_id: patientId,
            visit_id: visitId,
            event_type: EventTypes.PsychologicalPathologies,
            event_metadata: JSON.stringify({
                doctor: userName,
                anxiety,
                anxietyText,
                nuclearFamily,
                nuclearFamilyText,
                selfEsteem,
                selfEsteemText,
                attentionDeficit,
                attentionDeficitText,
                depression,
                depressionText,
                grief,
                griefText,
                stress,
                stressText,
                disfunctionalFamily,
                disfunctionalFamilyText,
                hyperactivity,
                hyperactivityText,
                inappropriatePlay,
                inappropriatePlayText,
                languageProblems,
                languageProblemsText,
                behavioralProblems,
                behavioralProblemsText,
                schoolProblems,
                schoolProblemsText,
                psychosis,
                psychosisText,
                suicidal,
                suicidalText,
                personalityDisorders,
                personalityDisordersText,
                trauma,
                traumaText,
                psychologicalEvaluations,
                psychologicalEvaluationsText,
                domesticViolenceFamily,
                domesticViolenceFamilyText,
                domesticViolenceSpouse,
                domesticViolenceSpouseText,
                referralHospital,
                referralHospitalText,
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
                        {radioButtons({ field: anxiety, action: setAnxiety, prompt: LocalizedStrings[language].anxiety, language })}
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
                    {formRow(nuclearFamily, setNuclearFamily, nuclearFamilyText, setNuclearFamilyText, 'nuclearFamily')}
                    {formRow(selfEsteem, setSelfEsteem, selfEsteemText, setSelfEsteemText, 'selfEsteem')}
                    {formRow(attentionDeficit, setAttentionDeficit, attentionDeficitText, setAttentionDeficitText, 'attentionDeficit')}
                    {formRow(depression, setDepression, depressionText, setDepressionText, 'depression')}
                    {formRow(grief, setGrief, griefText, setGriefText, 'grief')}
                    {formRow(stress, setStress, stressText, setStressText, 'stress')}
                    {formRow(disfunctionalFamily, setDisfunctionalFamily, disfunctionalFamilyText, setDisfunctionalFamilyText, 'disfunctionalFamily')}
                    {formRow(hyperactivity, setHyperactivity, hyperactivityText, setHyperactivityText, 'hyperactivity')}
                    {formRow(inappropriatePlay, setInappropriatePlay, inappropriatePlayText, setInappropriatePlayText, 'inappropriatePlay')}
                    {formRow(languageProblems, setLanguageProblems, languageProblemsText, setLanguageProblemsText, 'languageProblems')}
                    {formRow(behavioralProblems, setBehavioralProblems, behavioralProblemsText, setBehavioralProblemsText, 'behavioralProblems')}
                    {formRow(schoolProblems, setSchoolProblems, schoolProblemsText, setSchoolProblemsText, 'schoolProblems')}
                    {formRow(psychosis, setPsychosis, psychosisText, setPsychosisText, 'psychosis')}

                    {formRow(suicidal, setSuicidal, suicidalText, setSuicidalText, 'suicidal')}
                    {formRow(personalityDisorders, setPersonalityDisorders, personalityDisordersText, setPersonalityDisordersText, 'personalityDisorders')}
                    {formRow(trauma, setTrauma, traumaText, setTraumaText, 'trauma')}
                    {formRow(psychologicalEvaluations, setPsychologicalEvaluations, psychologicalEvaluationsText, setPsychologicalEvaluationsText, 'psychologicalEvaluations')}
                    {formRow(domesticViolenceFamily, setDomesticViolenceFamily, domesticViolenceFamilyText, setDomesticViolenceFamilyText, 'domesticViolenceFamily')}
                    {formRow(domesticViolenceSpouse, setDomesticViolenceSpouse, domesticViolenceSpouseText, setDomesticViolenceSpouseText, 'domesticViolenceSpouse')}
                    {formRow(referralHospital, setReferralHospital, referralHospitalText, setReferralHospitalText, 'referralHospital')}
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
        </ScrollView>
    );
};

export default PsychologicalPathologies;
