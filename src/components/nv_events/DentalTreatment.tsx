import React, { useState } from 'react';
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

export const DentalTreatmentDisplay = (metadataObj, language) => {
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

const DentalTreatment = (props) => {
    const [toothbrush, setToothbrush] = useState(false);
    const [toothbrushText, setToothbrushText] = useState(null);
    const [consult, setConsult] = useState(false);
    const [consultText, setConsultText] = useState(null);
    const [extraction, setExtraction] = useState(false);
    const [extractionText, setExtractionText] = useState(false);

    const [fluoride, setFluoride] = useState(null);
    const [fluorideText, setFluorideText] = useState(null);
    const [floss, setFloss] = useState(false);
    const [flossText, setFlossText] = useState(false);

    const [cleaningFirst, setCleaningFirst] = useState(false);
    const [cleaningFirstText, setCleaningFirstText] = useState(null);
    const [cleaningFirstYear, setCleaningFirstYear] = useState(false);
    const [cleaningFirstYearText, setCleaningFirstYearText] = useState(null);
    const [cleaningSecond, setCleaningSecond] = useState(false);
    const [cleaningSecondText, setCleaningSecondText] = useState(null);
    const [toothpaste, setToothpaste] = useState(false);
    const [toothpasteText, setToothpasteText] = useState(null);
    const [xray, setXray] = useState(false);
    const [xrayText, setXrayText] = useState(null);
    const [amalgamaRestoration, setAmalgamaRestoration] = useState(false);
    const [amalgamaRestorationText, setAmalgamaRestorationText] = useState(null);
    const [metalRestoration, setMetalRestoration] = useState(false);
    const [metalRestorationText, setMetalRestorationText] = useState(null);
    const [ionomeroRestoration, setIonomeroRestoration] = useState(false);
    const [ionomeroRestorationText, setIonomeroRestorationText] = useState(null);
    const [mriRestoration, setMriRestoration] = useState(false);
    const [mriRestorationText, setMriRestorationText] = useState(null);
    const [spaceRestoration, setSpaceRestoration] = useState(false);
    const [spaceRestorationText, setSpaceRestorationText] = useState(null);
    const [resinRestoration, setResinRestoration] = useState(false);
    const [resinRestorationText, setResinRestorationText] = useState(null);
    const [zoeRestoration, setZoeRestoration] = useState(false);
    const [zoeRestorationText, setZoeRestorationText] = useState(null);
    const [acetateRestoration, setAcetateRestoration] = useState(false);
    const [acetateRestorationText, setAcetateRestorationText] = useState(null);
    const [pulpotomyRestoration, setPulpotomyRestoration] = useState(false);
    const [pulpotomyRestorationText, setPulpotomyRestorationText] = useState(null);
    const [sdFluoride, setSdFluoride] = useState(false);
    const [sdFluorideText, setSdFluorideText] = useState(null);
    const [sealant, setSealant] = useState(false);
    const [sealantText, setSealantText] = useState(null);
    const [teaching, setTeaching] = useState(null);
    const [teachingText, setTeachingText] = useState(null);
    const [impression, setImpression] = useState(null);
    const [impressionText, setImpressionText] = useState(null);

    const patientId = props.navigation.getParam('patientId');
    const visitId = props.navigation.getParam('visitId');
    const language = props.navigation.getParam('language', 'en');
    const userName = props.navigation.getParam('userName');

    const submit = async () => {
        database.addEvent({
            id: uuid(),
            patient_id: patientId,
            visit_id: visitId,
            event_type: EventTypes.PsychologicalPathologies,
            event_metadata: JSON.stringify({
                doctor: userName,
                toothbrush,
                toothbrushText,
                consult,
                consultText,
                extraction,
                extractionText,
                fluoride,
                fluorideText,
                floss,
                flossText,
                cleaningFirst,
                cleaningFirstText,
                cleaningFirstYear,
                cleaningFirstYearText,
                cleaningSecond,
                cleaningSecondText,
                toothpaste,
                toothpasteText,
                xray,
                xrayText,
                amalgamaRestoration,
                amalgamaRestorationText,
                metalRestoration,
                metalRestorationText,
                ionomeroRestoration,
                ionomeroRestorationText,
                mriRestoration,
                mriRestorationText,
                spaceRestoration,
                spaceRestorationText,
                resinRestoration,
                resinRestorationText,
                zoeRestoration,
                zoeRestorationText,
                acetateRestoration,
                acetateRestorationText,
                pulpotomyRestoration,
                pulpotomyRestorationText,
                sdFluoride,
                sdFluorideText,
                sealant,
                sealantText,
                teaching,
                teachingText,
                impression,
                impressionText
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
                        {radioButtons({ field: toothbrush, action: setToothbrush, prompt: LocalizedStrings[language].miscarriages, language })}
                    </View>
                    {toothbrush ?
                        <View style={[styles.responseRow, { padding: 0 }]}>
                            <TextInput
                                style={styles.inputs}
                                onChangeText={(text) => setToothbrushText(text)}
                                value={toothbrushText}
                                keyboardType='numeric'
                            />
                        </View> : null
                    }
                    {formRow(consult, setConsult, consultText, setConsultText, 'consult')}
                    {formRow(extraction, setExtraction, extractionText, setExtractionText, 'extraction')}
                    {formRow(fluoride, setFluoride, fluorideText, setFluorideText, 'fluoride')}
                    {formRow(floss, setFloss, flossText, setFlossText, 'floss')}
                    {formRow(cleaningFirst, setCleaningFirst, cleaningFirstText, setCleaningFirstText, 'cleaningFirst')}
                    {formRow(cleaningFirstYear, setCleaningFirstYear, cleaningFirstYearText, setCleaningFirstYearText, 'cleaningFirstYear')}
                    {formRow(cleaningSecond, setCleaningSecond, cleaningSecondText, setCleaningSecondText, 'cleaningSecond')}
                    {formRow(toothpaste, setToothpaste, toothpasteText, setToothpasteText, 'toothpaste')}
                    {formRow(xray, setXray, xrayText, setXrayText, 'xray')}
                    {formRow(amalgamaRestoration, setAmalgamaRestoration, amalgamaRestorationText, setAmalgamaRestorationText, 'amalgamaRestoration')}
                    {formRow(metalRestoration, setMetalRestoration, metalRestorationText, setMetalRestorationText, 'metalRestoration')}
                    {formRow(ionomeroRestoration, setIonomeroRestoration, ionomeroRestorationText, setIonomeroRestorationText, 'ionomeroRestoration')}
                    {formRow(mriRestoration, setMriRestoration, mriRestorationText, setMriRestorationText, 'mriRestoration')}

                    {formRow(spaceRestoration, setSpaceRestoration, spaceRestorationText, setSpaceRestorationText, 'spaceRestoration')}
                    {formRow(resinRestoration, setResinRestoration, resinRestorationText, setResinRestorationText, 'resinRestoration')}
                    {formRow(zoeRestoration, setZoeRestoration, zoeRestorationText, setZoeRestorationText, 'zoeRestoration')}
                    {formRow(acetateRestoration, setAcetateRestoration, acetateRestorationText, setAcetateRestorationText, 'acetateRestoration')}
                    {formRow(pulpotomyRestoration, setPulpotomyRestoration, pulpotomyRestorationText, setPulpotomyRestorationText, 'pulpotomyRestoration')}
                    {formRow(sdFluoride, setSdFluoride, sdFluorideText, setSdFluorideText, 'sdFluoride')}
                    {formRow(sealant, setSealant, sealantText, setSealantText, 'sealant')}
                    {formRow(teaching, setTeaching, teachingText, setTeachingText, 'sealant')}
                    {formRow(impression, setImpression, impressionText, setImpressionText, 'sealant')}

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

export default DentalTreatment;
