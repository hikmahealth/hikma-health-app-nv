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
        return LocalizedStrings[language].yes
    }
    return field ? textField : LocalizedStrings[language].no

}

export const DentalTreatmentDisplay = (metadataObj, language) => {
    return (
        <View>
            <Text>{LocalizedStrings[language].doctor}: {metadataObj.doctor} </Text>
            <Text>{LocalizedStrings[language].toothbrush}: {formatDisplay(metadataObj.toothbrush, metadataObj.toothbrushText, language)} </Text>
            <Text>{LocalizedStrings[language].consult}: {formatDisplay(metadataObj.consult, metadataObj.consultText, language)} </Text>
            <Text>{LocalizedStrings[language].extraction}: {formatDisplay(metadataObj.extraction, metadataObj.extractionText, language)}</Text>
            <Text>{LocalizedStrings[language].fluoride}: {formatDisplay(metadataObj.fluoride, metadataObj.fluorideText, language)}</Text>
            <Text>{LocalizedStrings[language].floss}: {formatDisplay(metadataObj.floss, metadataObj.flossText, language)}</Text>
            <Text>{LocalizedStrings[language].cleaningFirst}: {formatDisplay(metadataObj.cleaningFirst, metadataObj.cleaningFirstText, language)}</Text>
            <Text>{LocalizedStrings[language].cleaningFirstYear}: {formatDisplay(metadataObj.cleaningFirstYear, metadataObj.cleaningFirstYearText, language)}</Text>
            <Text>{LocalizedStrings[language].cleaningSecond}: {formatDisplay(metadataObj.cleaningSecond, metadataObj.cleaningSecondText, language)}</Text>
            <Text>{LocalizedStrings[language].toothpaste}: {formatDisplay(metadataObj.toothpaste, metadataObj.toothpasteText, language)}</Text>
            <Text>{LocalizedStrings[language].xray}: {formatDisplay(metadataObj.xray, metadataObj.xrayText, language)}</Text>
            <Text>{LocalizedStrings[language].amalgamaRestoration}: {formatDisplay(metadataObj.amalgamaRestoration, metadataObj.amalgamaRestorationText, language)}</Text>
            <Text>{LocalizedStrings[language].metalRestoration}: {formatDisplay(metadataObj.metalRestoration, metadataObj.metalRestorationText, language)}</Text>
            <Text>{LocalizedStrings[language].ionomeroRestoration}: {formatDisplay(metadataObj.ionomeroRestoration, metadataObj.ionomeroRestorationText, language)}</Text>
            <Text>{LocalizedStrings[language].mriRestoration}: {formatDisplay(metadataObj.mriRestoration, metadataObj.mriRestorationText, language)}</Text>
            <Text>{LocalizedStrings[language].spaceRestoration}: {formatDisplay(metadataObj.spaceRestoration, metadataObj.spaceRestorationText, language)}</Text>
            <Text>{LocalizedStrings[language].resinRestoration}: {formatDisplay(metadataObj.resinRestoration, metadataObj.resinRestorationText, language)}</Text>
            <Text>{LocalizedStrings[language].zoeRestoration}: {formatDisplay(metadataObj.zoeRestoration, metadataObj.zoeRestorationText, language)}</Text>
            <Text>{LocalizedStrings[language].acetateRestoration}: {formatDisplay(metadataObj.acetateRestoration, metadataObj.acetateRestorationText, language)}</Text>
            <Text>{LocalizedStrings[language].pulpotomyRestoration}: {formatDisplay(metadataObj.pulpotomyRestoration, metadataObj.pulpotomyRestorationText, language)}</Text>
            <Text>{LocalizedStrings[language].sdFluoride}: {formatDisplay(metadataObj.sdFluoride, metadataObj.sdFluorideText, language)}</Text>
            <Text>{LocalizedStrings[language].sealant}: {formatDisplay(metadataObj.sealant, metadataObj.sealantText, language)}</Text>
            <Text>{LocalizedStrings[language].teaching}: {formatDisplay(metadataObj.teaching, metadataObj.teachingText, language)}</Text>
            <Text>{LocalizedStrings[language].impression}: {formatDisplay(metadataObj.impression, metadataObj.impressionText, language)}</Text>
            <Text>{LocalizedStrings[language].other}: {formatDisplay(metadataObj.other, metadataObj.otherText, language)}</Text>
        </View>)
}

const DentalTreatment = (props) => {
    const [toothbrush, setToothbrush] = useState(null);
    const [toothbrushText, setToothbrushText] = useState(null);
    const [consult, setConsult] = useState(null);
    const [consultText, setConsultText] = useState(null);
    const [extraction, setExtraction] = useState(null);
    const [extractionText, setExtractionText] = useState(null);
    const [fluoride, setFluoride] = useState(null);
    const [fluorideText, setFluorideText] = useState(null);
    const [floss, setFloss] = useState(null);
    const [flossText, setFlossText] = useState(null);
    const [cleaningFirst, setCleaningFirst] = useState(null);
    const [cleaningFirstText, setCleaningFirstText] = useState(null);
    const [cleaningFirstYear, setCleaningFirstYear] = useState(null);
    const [cleaningFirstYearText, setCleaningFirstYearText] = useState(null);
    const [cleaningSecond, setCleaningSecond] = useState(null);
    const [cleaningSecondText, setCleaningSecondText] = useState(null);
    const [toothpaste, setToothpaste] = useState(null);
    const [toothpasteText, setToothpasteText] = useState(null);
    const [xray, setXray] = useState(null);
    const [xrayText, setXrayText] = useState(null);
    const [amalgamaRestoration, setAmalgamaRestoration] = useState(null);
    const [amalgamaRestorationText, setAmalgamaRestorationText] = useState(null);
    const [metalRestoration, setMetalRestoration] = useState(null);
    const [metalRestorationText, setMetalRestorationText] = useState(null);
    const [ionomeroRestoration, setIonomeroRestoration] = useState(null);
    const [ionomeroRestorationText, setIonomeroRestorationText] = useState(null);
    const [mriRestoration, setMriRestoration] = useState(null);
    const [mriRestorationText, setMriRestorationText] = useState(null);
    const [spaceRestoration, setSpaceRestoration] = useState(null);
    const [spaceRestorationText, setSpaceRestorationText] = useState(null);
    const [resinRestoration, setResinRestoration] = useState(null);
    const [resinRestorationText, setResinRestorationText] = useState(null);
    const [zoeRestoration, setZoeRestoration] = useState(null);
    const [zoeRestorationText, setZoeRestorationText] = useState(null);
    const [acetateRestoration, setAcetateRestoration] = useState(null);
    const [acetateRestorationText, setAcetateRestorationText] = useState(null);
    const [pulpotomyRestoration, setPulpotomyRestoration] = useState(null);
    const [pulpotomyRestorationText, setPulpotomyRestorationText] = useState(null);
    const [sdFluoride, setSdFluoride] = useState(null);
    const [sdFluorideText, setSdFluorideText] = useState(null);
    const [sealant, setSealant] = useState(null);
    const [sealantText, setSealantText] = useState(null);
    const [teaching, setTeaching] = useState(null);
    const [teachingText, setTeachingText] = useState(null);
    const [impression, setImpression] = useState(null);
    const [impressionText, setImpressionText] = useState(null);
    const [other, setOther] = useState(null);
    const [otherText, setOtherText] = useState(null);

    const patientId = props.navigation.getParam('patientId');
    const visitId = props.navigation.getParam('visitId');
    const language = props.navigation.getParam('language', 'en');
    const userName = props.navigation.getParam('userName');

    const submit = async () => {
        database.addEvent({
            id: uuid(),
            patient_id: patientId,
            visit_id: visitId,
            event_type: EventTypes.DentalTreatment,
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
                impressionText,
                other,
                otherText
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
                        <Text style={[styles.text, { fontSize: 16, fontWeight: 'bold' }]}>{LocalizedStrings[language].dentalTreatment}</Text>
                    </View>
                    {formRow(toothbrush, setToothbrush, toothbrushText, setToothbrushText, 'sealant')}
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
                    {formRow(teaching, setTeaching, teachingText, setTeachingText, 'teaching')}
                    {formRow(impression, setImpression, impressionText, setImpressionText, 'impression')}
                    {formRow(other, setOther, otherText, setOtherText, 'other')}

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
