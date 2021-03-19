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

export const XrayResultsDisplay = (metadataObj, language) => {
    return (
        <View>
            <Text>{LocalizedStrings[language].doctor}: {metadataObj.doctor} </Text>
            <Text>{LocalizedStrings[language].arthritis}: {formatDisplay(metadataObj.arthritis, metadataObj.arthritisText, language)} </Text>
            <Text>{LocalizedStrings[language].cardiomegaly}: {formatDisplay(metadataObj.cardiomegaly, metadataObj.cardiomegalyText, language)} </Text>
            <Text>{LocalizedStrings[language].ureteralDuplication}: {formatDisplay(metadataObj.ureteralDuplication, metadataObj.ureteralDuplicationText, language)}</Text>
            <Text>{LocalizedStrings[language].lungDisease}: {formatDisplay(metadataObj.lungDisease, metadataObj.lungDiseaseText, language)}</Text>
            <Text>{LocalizedStrings[language].fibrosis}: {formatDisplay(metadataObj.fibrosis, metadataObj.fibrosisText, language)}</Text>
            <Text>{LocalizedStrings[language].fractures}: {formatDisplay(metadataObj.fractures, metadataObj.fracturesText, language)}</Text>
            <Text>{LocalizedStrings[language].pneumonia}: {formatDisplay(metadataObj.pneumonia, metadataObj.pneumoniaText, language)}</Text>
            <Text>{LocalizedStrings[language].pulmonaryNodule}: {formatDisplay(metadataObj.pulmonaryNodule, metadataObj.pulmonaryNoduleText, language)}</Text>
            <Text>{LocalizedStrings[language].osteoarthritis}: {formatDisplay(metadataObj.osteoarthritis, metadataObj.osteoarthritisText, language)}</Text>
            <Text>{LocalizedStrings[language].osteoporosis}: {formatDisplay(metadataObj.osteoporosis, metadataObj.osteoporosisText, language)}</Text>
            <Text>{LocalizedStrings[language].ectopicKidney}: {formatDisplay(metadataObj.ectopicKidney, metadataObj.ectopicKidneyText, language)}</Text>
            <Text>{LocalizedStrings[language].rinonHerradura}: {formatDisplay(metadataObj.rinonHerradura, metadataObj.rinonHerraduraText, language)}</Text>
            <Text>{LocalizedStrings[language].tumor}: {formatDisplay(metadataObj.tumor, metadataObj.tumorText, language)}</Text>
        </View>)
}

const XrayResults = (props) => {
    const [arthritis, setArthritis] = useState(null);
    const [arthritisText, setArthritisText] = useState(null);
    const [cardiomegaly, setCardiomegaly] = useState(null);
    const [cardiomegalyText, setCardioMegalyText] = useState(null);
    const [ureteralDuplication, setUreteralDuplication] = useState(null);
    const [ureteralDuplicationText, setUreteralDuplicationText] = useState(null);
    const [lungDisease, setLungDisease] = useState(null);
    const [lungDiseaseText, setLungDiseaseText] = useState(null);
    const [fibrosis, setFibrosis] = useState(null);
    const [fibrosisText, setFibrosisText] = useState(null);
    const [fractures, setFractures] = useState(null);
    const [fracturesText, setFracturesText] = useState(null);
    const [pneumonia, setPneumonia] = useState(null);
    const [pneumoniaText, setPneumoniaText] = useState(null);
    const [pulmonaryNodule, setPulmonaryNodule] = useState(null);
    const [pulmonaryNoduleText, setPulmonaryNoduleText] = useState(null);
    const [osteoarthritis, setOsteoarthritis] = useState(null);
    const [osteoarthritisText, setOsteoarthritisText] = useState(null);
    const [osteoporosis, setOsteoporosis] = useState(null);
    const [osteoporosisText, setOsteoporosisText] = useState(null);
    const [ectopicKidney, setEctopicKidney] = useState(null);
    const [ectopicKidneyText, setEctopicKidneyText] = useState(null);
    const [rinonHerradura, setRinonHerradura] = useState(null);
    const [rinonHerraduraText, setRinonHerraduraText] = useState(null);
    const [tumor, setTumor] = useState(null);
    const [tumorText, setTumorText] = useState(null);

    const patientId = props.navigation.getParam('patientId');
    const visitId = props.navigation.getParam('visitId');
    const language = props.navigation.getParam('language', 'en');
    const userName = props.navigation.getParam('userName');

    useEffect(() => {
        database.getLatestPatientEventByType(patientId, EventTypes.XrayResults).then((response: any) => {
            if (response.length > 0) {
                const responseObj = JSON.parse(response)

                setArthritis(responseObj.arthritis)
                setArthritisText(responseObj.arthritisText)
                setCardiomegaly(responseObj.cardiomegaly)
                setCardioMegalyText(responseObj.cardiomegalyText)
                setUreteralDuplication(responseObj.ureteralDuplication)
                setUreteralDuplicationText(responseObj.ureteralDuplicationText)
                setLungDisease(responseObj.lungDisease)
                setLungDiseaseText(responseObj.lungDiseaseText)
                setFibrosis(responseObj.fibrosis)
                setFibrosisText(responseObj.fibrosisText)
                setFractures(responseObj.fractures)
                setFracturesText(responseObj.fracturesText)
                setPneumonia(responseObj.pneumonia)
                setPneumoniaText(responseObj.pneumoniaText)
                setPulmonaryNodule(responseObj.pulmonaryNodule)
                setPulmonaryNoduleText(responseObj.pulmonaryNoduleText)
                setOsteoarthritis(responseObj.osteoarthritis)
                setOsteoarthritisText(responseObj.osteoarthritisText)
                setOsteoporosis(responseObj.osteoporosis)
                setOsteoporosisText(responseObj.osteoporosisText)
                setEctopicKidney(responseObj.ectopicKidney)
                setEctopicKidneyText(responseObj.ectopicKidneyText)
                setRinonHerradura(responseObj.rinonHerradura)
                setRinonHerraduraText(responseObj.rinonHerraduraText)
                setTumor(responseObj.tumor)
                setTumorText(responseObj.tumorText)
            }
        })
    }, [])

    const submit = async () => {
        database.addEvent({
            id: uuid(),
            patient_id: patientId,
            visit_id: visitId,
            event_type: EventTypes.XrayResults,
            event_metadata: JSON.stringify({
                doctor: userName,
                arthritis,
                arthritisText,
                cardiomegaly,
                cardiomegalyText,
                ureteralDuplication,
                ureteralDuplicationText,
                lungDisease,
                lungDiseaseText,
                fibrosis,
                fibrosisText,
                fractures,
                fracturesText,
                pneumonia,
                pneumoniaText,
                pulmonaryNodule,
                pulmonaryNoduleText,
                osteoarthritis,
                osteoarthritisText,
                osteoporosis,
                osteoporosisText,
                ectopicKidney,
                ectopicKidneyText,
                rinonHerradura,
                rinonHerraduraText,
                tumor,
                tumorText,
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
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <LinearGradient colors={['#31BBF3', '#4D7FFF']} style={styles.containerLeft}>
                <View style={[styles.inputsContainer, { alignItems: 'flex-start' }]}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignSelf: 'stretch', }}>
                        <Text style={[styles.text, { fontSize: 16, fontWeight: 'bold' }]}>{LocalizedStrings[language].xrayResults}</Text>
                    </View>
                    {formRow(arthritis, setArthritis, arthritisText, setArthritisText, 'arthritis')}
                    {formRow(cardiomegaly, setCardiomegaly, cardiomegalyText, setCardioMegalyText, 'cardiomegaly')}
                    {formRow(ureteralDuplication, setUreteralDuplication, ureteralDuplicationText, setUreteralDuplicationText, 'ureteralDuplication')}
                    {formRow(lungDisease, setLungDisease, lungDiseaseText, setLungDiseaseText, 'lungDisease')}
                    {formRow(fibrosis, setFibrosis, fibrosisText, setFibrosisText, 'fibrosis')}
                    {formRow(fractures, setFractures, fracturesText, setFracturesText, 'fractures')}
                    {formRow(pneumonia, setPneumonia, pneumoniaText, setPneumoniaText, 'pneumonia')}
                    {formRow(pulmonaryNodule, setPulmonaryNodule, pulmonaryNoduleText, setPulmonaryNoduleText, 'pulmonaryNodule')}
                    {formRow(osteoarthritis, setOsteoarthritis, osteoarthritisText, setOsteoarthritisText, 'osteoarthritis')}
                    {formRow(osteoporosis, setOsteoporosis, osteoporosisText, setOsteoporosisText, 'osteoporosis')}
                    {formRow(ectopicKidney, setEctopicKidney, ectopicKidneyText, setEctopicKidneyText, 'ectopicKidney')}
                    {formRow(rinonHerradura, setRinonHerradura, rinonHerraduraText, setRinonHerraduraText, 'rinonHerradura')}
                    {formRow(tumor, setTumor, tumorText, setTumorText, 'tumor')}
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

export default XrayResults;
