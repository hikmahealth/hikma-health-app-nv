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

const formatTextDisplay = (field, textField, language) => {
    if (field !== null) {
        if (!!textField) {
            return field ? (LocalizedStrings[language].yes + '   ' + textField) : LocalizedStrings[language].no
        } else {
            return field ? (LocalizedStrings[language].yes) : LocalizedStrings[language].no
        }
    }
    return null
}

export const AccidentReportDisplay = (metadataObj, language) => {
    return (
        <View>
            <Text>{LocalizedStrings[language].doctor}: {metadataObj.doctor} </Text>
            <Text>{LocalizedStrings[language].accidentWork}: {formatTextDisplay(metadataObj.accidentWork, metadataObj.accidentWorkText, language)} </Text>
            <Text>{LocalizedStrings[language].description}: {metadataObj.description} </Text>
            <Text>{LocalizedStrings[language].trauma}: {formatTextDisplay(metadataObj.trauma, metadataObj.traumaText, language)} </Text>
            <Text>{LocalizedStrings[language].traumaDetails}: {metadataObj.traumaDetails} </Text>
            <Text>{LocalizedStrings[language].referralSpecialist}: {formatTextDisplay(metadataObj.referralSpecialist, metadataObj.referralSpecialistText, language)} </Text>
            <Text>{LocalizedStrings[language].followUpVisit}: {formatTextDisplay(metadataObj.followUpVisit, metadataObj.followUpVisitDate, language)} </Text>
            <Text>{LocalizedStrings[language].other}: {metadataObj.other} </Text>
        </View>)
}

const AccidentReport = (props) => {
    const [accidentWork, setAccidentWork] = useState(null);
    const [accidentWorkText, setAccidentWorkText] = useState(null);
    const [description, setDescription] = useState(null);
    const [trauma, setTrauma] = useState(null);
    const [traumaText, setTraumaText] = useState(null);
    const [traumaDetails, setTraumaDetails] = useState(null);
    const [referralSpecialist, setReferralSpecialist] = useState(null);
    const [referralSpecialistText, setReferralSpecialistText] = useState(null);
    const [followUpVisit, setFollowUpVisit] = useState(null);
    const [followUpVisitDate, setFollowUpVisitDate] = useState(null);
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
            event_type: EventTypes.AccidentReport,
            event_metadata: JSON.stringify({
                doctor: userName,
                accidentWork,
                accidentWorkText,
                description,
                trauma,
                traumaText,
                traumaDetails,
                referralSpecialist,
                referralSpecialistText,
                followUpVisit,
                followUpVisitDate,
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
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

            <LinearGradient colors={['#31BBF3', '#4D7FFF']} style={styles.containerLeft}>
                <View style={[styles.inputsContainer, { alignItems: 'flex-start' }]}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignSelf: 'stretch',}}>
                        <Text style={[styles.text, {fontSize: 16, fontWeight: 'bold'}]}>{LocalizedStrings[language].accidentReport}</Text>
                    </View>
                    {formRow(accidentWork, setAccidentWork, accidentWorkText, setAccidentWorkText, 'accidentWork')}

                    <View style={[styles.responseRow, { paddingVertical: 0 }]}>
                        <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].description}</Text>
                    </View>
                    <View style={[styles.responseRow, { padding: 0 }]}>
                        <TextInput
                            style={styles.inputs}
                            onChangeText={(text) => setDescription(text)}
                            value={description}
                        />
                    </View>

                    {formRow(trauma, setTrauma, traumaText, setTraumaText, 'trauma')}

                    <View style={[styles.responseRow, { paddingVertical: 0 }]}>
                        <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].traumaDetails}</Text>
                    </View>
                    <View style={[styles.responseRow, { padding: 0 }]}>
                        <TextInput
                            style={styles.inputs}
                            onChangeText={(text) => setTraumaDetails(text)}
                            value={traumaDetails}
                        />
                    </View>

                    {formRow(referralSpecialist, setReferralSpecialist, referralSpecialistText, setReferralSpecialistText, 'referralSpecialist')}


                    <View style={[styles.responseRow]}>
                        {radioButtons({ field: followUpVisit, action: setFollowUpVisit, prompt: LocalizedStrings[language].followUpVisit, language })}
                    </View>
                    <View>{followUpVisit ? datePicker({ future: true, placeholder: LocalizedStrings[language].date, date: followUpVisitDate, action: setFollowUpVisitDate, language }) : null}</View>


                    <View style={[styles.responseRow, { paddingVertical: 0 }]}>
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

export default AccidentReport;
