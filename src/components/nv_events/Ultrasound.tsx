import React, { useState } from 'react';
import {
    View, Text, TextInput, ScrollView, Button, TouchableOpacity
} from 'react-native';

import { database } from "../../storage/Database";
import { v4 as uuid } from 'uuid';
import styles from '../Style';
import { EventTypes } from '../../enums/EventTypes';
import LinearGradient from 'react-native-linear-gradient';
import { datePicker, radioButtons } from '../Covid19Form'
import { LocalizedStrings } from '../../enums/LocalizedStrings';

const formatDateDisplay = (field, dateField) => {
    if (!!field && !!dateField) {
        return (field + '   ' + dateField)
    }
    return null
}
const formatDisplay = (field, language) => {
    if (!!field) {
        return LocalizedStrings[language].yes
    }
    if (field == null) {
        return null
    }
    return LocalizedStrings[language].no
}

export const UltrasoundDisplay = (metadataObj, language) => {
    return (
        <View>
            <Text>{LocalizedStrings[language].doctor}: {metadataObj.doctor} </Text>
            <Text>{LocalizedStrings[language].abdominal}: {formatDisplay(metadataObj.abdominal, language)}</Text>
            <Text>{LocalizedStrings[language].joints}: {formatDisplay(metadataObj.joints, language)}</Text>
            <Text>{LocalizedStrings[language].neck}: {formatDisplay(metadataObj.neck, language)}</Text>
            <Text>{LocalizedStrings[language].doppler}: {formatDisplay(metadataObj.doppler, language)}</Text>
            <Text>{LocalizedStrings[language].breast}: {formatDisplay(metadataObj.breast, language)}</Text>
            <Text>{LocalizedStrings[language].firstOB}: {formatDisplay(metadataObj.firstOB, language)}</Text>
            <Text>{LocalizedStrings[language].secondOB}: {formatDisplay(metadataObj.secondOB, language)}</Text>
            <Text>{LocalizedStrings[language].thirdOB}: {formatDisplay(metadataObj.thirdOB, language)}</Text>
            <Text>{LocalizedStrings[language].softTissues}: {formatDisplay(metadataObj.softTissues, language)}</Text>
            <Text>{LocalizedStrings[language].pelvic}: {formatDisplay(metadataObj.pelvic, language)}</Text>
            <Text>{LocalizedStrings[language].prostate}: {formatDisplay(metadataObj.prostate, language)}</Text>
            <Text>{LocalizedStrings[language].renal}: {formatDisplay(metadataObj.renal, language)}</Text>
            <Text>{LocalizedStrings[language].testicular}: {formatDisplay(metadataObj.testicular, language)}</Text>
            <Text>{LocalizedStrings[language].other}: {formatDisplay(metadataObj.other, language)}</Text>

            <Text>{LocalizedStrings[language].goiter}: {formatDateDisplay(metadataObj.goiter, metadataObj.goiterDate)} </Text>
            <Text>{LocalizedStrings[language].wrappedCord}: {formatDateDisplay(metadataObj.wrappedCord, metadataObj.wrappedCordDate)} </Text>
            <Text>{LocalizedStrings[language].cholelithiasis}: {formatDateDisplay(metadataObj.cholelithiasis, metadataObj.cholelithiasisDate)} </Text>
            <Text>{LocalizedStrings[language].prostate1}: {formatDateDisplay(metadataObj.prostate1, metadataObj.prostate1Date)} </Text>
            <Text>{LocalizedStrings[language].prostate2}: {formatDateDisplay(metadataObj.prostate2, metadataObj.prostate2Date)} </Text>
            <Text>{LocalizedStrings[language].prostate3}: {formatDateDisplay(metadataObj.prostate3, metadataObj.prostate3Date)} </Text>
            <Text>{LocalizedStrings[language].prostate4}: {formatDateDisplay(metadataObj.prostate4, metadataObj.prostate4Date)} </Text>
            <Text>{LocalizedStrings[language].endometrialThickening}: {formatDateDisplay(metadataObj.endometrialThickening, metadataObj.endometrialThickeningDate)} </Text>
            <Text>{LocalizedStrings[language].splenomegaly}: {formatDateDisplay(metadataObj.splenomegaly, metadataObj.splenomegalyDate)} </Text>
            <Text>{LocalizedStrings[language].mildHepatic}: {formatDateDisplay(metadataObj.mildHepatic, metadataObj.mildHepaticDate)} </Text>
            <Text>{LocalizedStrings[language].moderateHepatic}: {formatDateDisplay(metadataObj.moderateHepatic, metadataObj.moderateHepaticDate)} </Text>
            <Text>{LocalizedStrings[language].severeHepatic}: {formatDateDisplay(metadataObj.severeHepatic, metadataObj.severeHepaticDate)} </Text>
            <Text>{LocalizedStrings[language].hepatomegaly}: {formatDateDisplay(metadataObj.hepatomegaly, metadataObj.hepatomegalyDate)} </Text>
            <Text>{LocalizedStrings[language].cirrhosis}: {formatDateDisplay(metadataObj.cirrhosis, metadataObj.cirrhosisDate)} </Text>
            <Text>{LocalizedStrings[language].venousInsufficiency}: {formatDateDisplay(metadataObj.venousInsufficiency, metadataObj.venousInsufficiencyDate)} </Text>
            <Text>{LocalizedStrings[language].mildRenal}: {formatDateDisplay(metadataObj.mildRenal, metadataObj.mildRenalDate)} </Text>
            <Text>{LocalizedStrings[language].moderateRenal}: {formatDateDisplay(metadataObj.moderateRenal, metadataObj.moderateRenalDate)} </Text>
            <Text>{LocalizedStrings[language].severeRenal}: {formatDateDisplay(metadataObj.severeRenal, metadataObj.severeRenalDate)} </Text>
            <Text>{LocalizedStrings[language].nephrolithiasis}: {formatDateDisplay(metadataObj.nephrolithiasis, metadataObj.nephrolithiasisDate)} </Text>
            <Text>{LocalizedStrings[language].complexMasses}: {formatDateDisplay(metadataObj.complexMasses, metadataObj.complexMassesDate)} </Text>
            <Text>{LocalizedStrings[language].benignNodules}: {formatDateDisplay(metadataObj.benignNodules, metadataObj.benignNodulesDate)} </Text>
            <Text>{LocalizedStrings[language].malignantNodules}: {formatDateDisplay(metadataObj.malignantNodules, metadataObj.malignantNodulesDate)} </Text>
            <Text>{LocalizedStrings[language].thyroidNodules}: {formatDateDisplay(metadataObj.thyroidNodules, metadataObj.thyroidNodulesDate)} </Text>
            <Text>{LocalizedStrings[language].normalUltrasound}: {formatDateDisplay(metadataObj.normalUltrasound, metadataObj.normalUltrasoundDate)} </Text>
            <Text>{LocalizedStrings[language].polycysticOvaries}: {formatDateDisplay(metadataObj.polycysticOvaries, metadataObj.polycysticOvariesDate)} </Text>
            <Text>{LocalizedStrings[language].simpleOvarianCysts}: {formatDateDisplay(metadataObj.simpleOvarianCysts, metadataObj.simpleOvarianCystsDate)} </Text>
        </View>)
}

const Ultrasound = (props) => {
    let defaultTestDate = new Date().toISOString().split('T')[0]

    const [abdominal, setAbdominal] = useState(null);
    const [joints, setJoints] = useState(null);
    const [neck, setNeck] = useState(null);
    const [doppler, setDoppler] = useState(null);
    const [breast, setBreast] = useState(null);
    const [firstOB, setFirstOB] = useState(null);
    const [secondOB, setSecondOB] = useState(null);
    const [thirdOB, setThirdOB] = useState(null);
    const [softTissues, setSoftTissues] = useState(null);
    const [pelvic, setPelvic] = useState(null);
    const [prostate, setProstate] = useState(null);
    const [renal, setRenal] = useState(null);
    const [testicular, setTesticular] = useState(null);
    const [other, setOther] = useState(null);

    const [goiter, setGoiter] = useState(null);
    const [goiterDate, setGoiterDate] = useState(defaultTestDate);
    const [wrappedCord, setWrappedCord] = useState(null);
    const [wrappedCordDate, setWrappedCordDate] = useState(defaultTestDate);
    const [cholelithiasis, setCholelithiasis] = useState(null);
    const [cholelithiasisDate, setCholelithiasisDate] = useState(defaultTestDate);
    const [prostate1, setProstate1] = useState(null);
    const [prostate1Date, setProstate1Date] = useState(defaultTestDate);
    const [prostate2, setProstate2] = useState(null);
    const [prostate2Date, setProstate2Date] = useState(defaultTestDate);
    const [prostate3, setProstate3] = useState(null);
    const [prostate3Date, setProstate3Date] = useState(defaultTestDate);
    const [prostate4, setProstate4] = useState(null);
    const [prostate4Date, setProstate4Date] = useState(defaultTestDate);
    const [endometrialThickening, setEndometrialThickening] = useState(null);
    const [endometrialThickeningDate, setEndometrialThickeningDate] = useState(defaultTestDate);
    const [splenomegaly, setSplenomegaly] = useState(null);
    const [splenomegalyDate, setSplenomegalyDate] = useState(defaultTestDate);
    const [mildHepatic, setMildHepatic] = useState(null);
    const [mildHepaticDate, setMildHepaticDate] = useState(defaultTestDate);
    const [moderateHepatic, setModerateHepatic] = useState(null);
    const [moderateHepaticDate, setModerateHepaticDate] = useState(defaultTestDate);
    const [severeHepatic, setSevereHepatic] = useState(null);
    const [severeHepaticDate, setSevereHepaticDate] = useState(defaultTestDate);
    const [hepatomegaly, setHepatomegaly] = useState(null);
    const [hepatomegalyDate, setHepatomegalyDate] = useState(defaultTestDate);
    const [cirrhosis, setCirrhosis] = useState(null);
    const [cirrhosisDate, setCirrhosisDate] = useState(defaultTestDate);
    const [venousInsufficiency, setVenousInsufficiency] = useState(null);
    const [venousInsufficiencyDate, setVenousInsufficiencyDate] = useState(defaultTestDate);
    const [mildRenal, setMildRenal] = useState(null);
    const [mildRenalDate, setMildRenalDate] = useState(defaultTestDate);
    const [moderateRenal, setModerateRenal] = useState(null);
    const [moderateRenalDate, setModerateRenalDate] = useState(defaultTestDate);
    const [severeRenal, setSevereRenal] = useState(null);
    const [severeRenalDate, setSevereRenalDate] = useState(defaultTestDate);
    const [nephrolithiasis, setNephrolithiasis] = useState(null);
    const [nephrolithiasisDate, setNephrolithiasisDate] = useState(defaultTestDate);
    const [complexMasses, setComplexMasses] = useState(null);
    const [complexMassesDate, setComplexMassesDate] = useState(defaultTestDate);
    const [benignNodules, setBenignNodules] = useState(null);
    const [beningNodulesDate, setBenignNodulesDate] = useState(defaultTestDate);
    const [malignantNodules, setMalignantNodules] = useState(null);
    const [malignantNodulesDate, setMalignantNodulesDate] = useState(defaultTestDate);
    const [thyroidNodules, setThyroidNodules] = useState(null);
    const [thyroidNodulesDate, setThyroidNodulesDate] = useState(defaultTestDate);
    const [normalUltrasound, setNormalUltrasound] = useState(null);
    const [normalUltrasoundDate, setNormalUltrasoundDate] = useState(defaultTestDate);
    const [polycysticOvaries, setPolycysticOvaries] = useState(null);
    const [polycysticOvariesDate, setPolycysticOvariesDate] = useState(defaultTestDate);
    const [simpleOvarianCysts, setSimpleOvarianCysts] = useState(null);
    const [simpleOvarianCystsDate, setSimpleOvarianCystsDate] = useState(defaultTestDate);

    const patientId = props.navigation.getParam('patientId');
    const visitId = props.navigation.getParam('visitId');
    const language = props.navigation.getParam('language', 'en');
    const userName = props.navigation.getParam('userName');

    const submit = async () => {
        database.addEvent({
            id: uuid(),
            patient_id: patientId,
            visit_id: visitId,
            event_type: EventTypes.Ultrasound,
            event_metadata: JSON.stringify({
                doctor: userName,
                abdominal,
                joints,
                neck,
                doppler,
                breast,
                firstOB,
                secondOB,
                thirdOB,
                softTissues,
                other,
                goiter,
                goiterDate,
                wrappedCord,
                wrappedCordDate,
                cholelithiasis,
                cholelithiasisDate,
                prostate1,
                prostate1Date,
                prostate2,
                prostate2Date,
                prostate3,
                prostate3Date,
                prostate4,
                prostate4Date,
                endometrialThickening,
                endometrialThickeningDate,
                splenomegaly,
                splenomegalyDate,
                mildHepatic,
                mildHepaticDate,
                moderateHepatic,
                moderateHepaticDate,
                severeHepatic,
                severeHepaticDate,
                hepatomegaly,
                hepatomegalyDate,
                cirrhosis,
                cirrhosisDate,
                venousInsufficiency,
                venousInsufficiencyDate,
                mildRenal,
                mildRenalDate,
                moderateRenal,
                moderateRenalDate,
                severeRenal,
                severeRenalDate,
                nephrolithiasis,
                nephrolithiasisDate,
                complexMasses,
                complexMassesDate,
                benignNodules,
                beningNodulesDate,
                malignantNodules,
                malignantNodulesDate,
                thyroidNodules,
                thyroidNodulesDate,
                normalUltrasound,
                normalUltrasoundDate,
                polycysticOvaries,
                polycysticOvariesDate,
                simpleOvarianCysts,
                simpleOvarianCystsDate,
            })
        }).then(() => {
            props.navigation.navigate('NewVisit')
        })
    };

    return (
        <ScrollView>
            <LinearGradient colors={['#31BBF3', '#4D7FFF']} style={styles.containerLeft}>
                <View style={[styles.inputsContainer, { alignItems: 'flex-start' }]}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignSelf: 'stretch', }}>
                        <Text style={[styles.text, { fontSize: 16, fontWeight: 'bold' }]}>{LocalizedStrings[language].ultrasound}</Text>
                    </View>
                    <View style={[styles.responseRow]}>
                        {radioButtons({ field: abdominal, action: setAbdominal, prompt: LocalizedStrings[language].abdominal, language })}
                    </View>

                    <View style={[styles.responseRow]}>
                        {radioButtons({ field: joints, action: setJoints, prompt: LocalizedStrings[language].joints, language })}
                    </View>

                    <View style={[styles.responseRow]}>
                        {radioButtons({ field: neck, action: setNeck, prompt: LocalizedStrings[language].neck, language })}
                    </View>

                    <View style={[styles.responseRow]}>
                        {radioButtons({ field: doppler, action: setDoppler, prompt: LocalizedStrings[language].doppler, language })}
                    </View>

                    <View style={[styles.responseRow]}>
                        {radioButtons({ field: breast, action: setBreast, prompt: LocalizedStrings[language].breast, language })}
                    </View>

                    <View style={[styles.responseRow]}>
                        {radioButtons({ field: firstOB, action: setFirstOB, prompt: LocalizedStrings[language].firstOB, language })}
                    </View>

                    <View style={[styles.responseRow]}>
                        {radioButtons({ field: secondOB, action: setSecondOB, prompt: LocalizedStrings[language].secondOB, language })}
                    </View>

                    <View style={[styles.responseRow]}>
                        {radioButtons({ field: thirdOB, action: setThirdOB, prompt: LocalizedStrings[language].thirdOB, language })}
                    </View>

                    <View style={[styles.responseRow]}>
                        {radioButtons({ field: softTissues, action: setSoftTissues, prompt: LocalizedStrings[language].softTissues, language })}
                    </View>


                    <View style={[styles.responseRow]}>
                        {radioButtons({ field: pelvic, action: setPelvic, prompt: LocalizedStrings[language].pelvic, language })}
                    </View>

                    <View style={[styles.responseRow]}>
                        {radioButtons({ field: prostate, action: setProstate, prompt: LocalizedStrings[language].prostate, language })}
                    </View>

                    <View style={[styles.responseRow]}>
                        {radioButtons({ field: renal, action: setRenal, prompt: LocalizedStrings[language].renal, language })}
                    </View>

                    <View style={[styles.responseRow]}>
                        {radioButtons({ field: testicular, action: setTesticular, prompt: LocalizedStrings[language].testicular, language })}
                    </View>

                    <View style={[styles.responseRow]}>
                        {radioButtons({ field: other, action: setOther, prompt: LocalizedStrings[language].other, language })}
                    </View>

                    <View style={[styles.responseRow, { paddingVertical: 0 }]}>
                        <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].goiter}</Text>
                    </View>
                    <View style={[styles.responseRow, { padding: 0 }]}>
                        <TextInput
                            style={styles.inputs}
                            onChangeText={(text) => setGoiter(text)}
                            value={goiter}
                        />
                    </View>

                    <View>{goiter ? datePicker({ future: true, placeholder: LocalizedStrings[language].date, date: goiterDate, action: setGoiterDate, language }) : null}</View>

                    <View style={[styles.responseRow, { paddingVertical: 0 }]}>
                        <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].wrappedCord}</Text>
                    </View>
                    <View style={[styles.responseRow, { padding: 0 }]}>
                        <TextInput
                            style={styles.inputs}
                            onChangeText={(text) => setWrappedCord(text)}
                            value={wrappedCord}
                        />
                    </View>
                    <View>{wrappedCord ? datePicker({ future: true, placeholder: LocalizedStrings[language].date, date: wrappedCordDate, action: setWrappedCordDate, language }) : null}</View>

                    <View style={[styles.responseRow, { paddingVertical: 0 }]}>
                        <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].cholelithiasis}</Text>
                    </View>
                    <View style={[styles.responseRow, { padding: 0 }]}>
                        <TextInput
                            style={styles.inputs}
                            onChangeText={(text) => setCholelithiasis(text)}
                            value={cholelithiasis}
                        />
                    </View>
                    <View>{cholelithiasis ? datePicker({ future: true, placeholder: LocalizedStrings[language].date, date: cholelithiasisDate, action: setCholelithiasisDate, language }) : null}</View>

                    <View style={[styles.responseRow, { paddingVertical: 0 }]}>
                        <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].prostate1}</Text>
                    </View>
                    <View style={[styles.responseRow, { padding: 0 }]}>
                        <TextInput
                            style={styles.inputs}
                            onChangeText={(text) => setProstate1(text)}
                            value={prostate1}
                        />
                    </View>
                    <View>{prostate1 ? datePicker({ future: true, placeholder: LocalizedStrings[language].date, date: prostate1Date, action: setProstate1Date, language }) : null}</View>


                    <View style={[styles.responseRow, { paddingVertical: 0 }]}>
                        <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].prostate2}</Text>
                    </View>
                    <View style={[styles.responseRow, { padding: 0 }]}>
                        <TextInput
                            style={styles.inputs}
                            onChangeText={(text) => setProstate2(text)}
                            value={prostate2}
                        />
                    </View>
                    <View>{prostate2 ? datePicker({ future: true, placeholder: LocalizedStrings[language].date, date: prostate2Date, action: setProstate2Date, language }) : null}</View>

                    <View style={[styles.responseRow, { paddingVertical: 0 }]}>
                        <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].prostate3}</Text>
                    </View>
                    <View style={[styles.responseRow, { padding: 0 }]}>
                        <TextInput
                            style={styles.inputs}
                            onChangeText={(text) => setProstate3(text)}
                            value={prostate3}
                        />
                    </View>
                    <View>{prostate3 ? datePicker({ future: true, placeholder: LocalizedStrings[language].date, date: prostate3Date, action: setProstate3Date, language }) : null}</View>

                    <View style={[styles.responseRow, { paddingVertical: 0 }]}>
                        <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].prostate4}</Text>
                    </View>
                    <View style={[styles.responseRow, { padding: 0 }]}>
                        <TextInput
                            style={styles.inputs}
                            onChangeText={(text) => setProstate4(text)}
                            value={prostate4}
                        />
                    </View>
                    <View>{prostate4 ? datePicker({ future: true, placeholder: LocalizedStrings[language].date, date: prostate4Date, action: setProstate4Date, language }) : null}</View>

                    <View style={[styles.responseRow, { paddingVertical: 0 }]}>
                        <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].endometrialThickening}</Text>
                    </View>
                    <View style={[styles.responseRow, { padding: 0 }]}>
                        <TextInput
                            style={styles.inputs}
                            onChangeText={(text) => setEndometrialThickening(text)}
                            value={endometrialThickening}
                        />
                    </View>
                    <View>{endometrialThickening ? datePicker({ future: true, placeholder: LocalizedStrings[language].date, date: endometrialThickeningDate, action: setEndometrialThickeningDate, language }) : null}</View>

                    <View style={[styles.responseRow, { paddingVertical: 0 }]}>
                        <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].splenomegaly}</Text>
                    </View>
                    <View style={[styles.responseRow, { padding: 0 }]}>
                        <TextInput
                            style={styles.inputs}
                            onChangeText={(text) => setSplenomegaly(text)}
                            value={splenomegaly}
                        />
                    </View>
                    <View>{splenomegaly ? datePicker({ future: true, placeholder: LocalizedStrings[language].date, date: splenomegalyDate, action: setSplenomegalyDate, language }) : null}</View>

                    <View style={[styles.responseRow, { paddingVertical: 0 }]}>
                        <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].mildHepatic}</Text>
                    </View>
                    <View style={[styles.responseRow, { padding: 0 }]}>
                        <TextInput
                            style={styles.inputs}
                            onChangeText={(text) => setMildHepatic(text)}
                            value={mildHepatic}
                        />
                    </View>
                    <View>{mildHepatic ? datePicker({ future: true, placeholder: LocalizedStrings[language].date, date: mildHepaticDate, action: setMildHepaticDate, language }) : null}</View>

                    <View style={[styles.responseRow, { paddingBottom: 0 }]}>
                        <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].moderateHepatic}</Text>
                    </View>
                    <View style={[styles.responseRow, { padding: 0 }]}>
                        <TextInput
                            style={styles.inputs}
                            onChangeText={(text) => setModerateHepatic(text)}
                            value={moderateHepatic}
                        />
                    </View>
                    <View>{moderateHepatic ? datePicker({ future: true, placeholder: LocalizedStrings[language].date, date: moderateHepaticDate, action: setModerateHepaticDate, language }) : null}</View>

                    <View style={[styles.responseRow, { paddingVertical: 0 }]}>
                        <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].severeHepatic}</Text>
                    </View>
                    <View style={[styles.responseRow, { padding: 0 }]}>
                        <TextInput
                            style={styles.inputs}
                            onChangeText={(text) => setSevereHepatic(text)}
                            value={severeHepatic}
                        />
                    </View>
                    <View>{severeHepatic ? datePicker({ future: true, placeholder: LocalizedStrings[language].date, date: severeHepaticDate, action: setSevereHepaticDate, language }) : null}</View>

                    <View style={[styles.responseRow, { paddingVertical: 0 }]}>
                        <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].hepatomegaly}</Text>
                    </View>
                    <View style={[styles.responseRow, { padding: 0 }]}>
                        <TextInput
                            style={styles.inputs}
                            onChangeText={(text) => setHepatomegaly(text)}
                            value={hepatomegaly}
                        />
                    </View>
                    <View>{hepatomegaly ? datePicker({ future: true, placeholder: LocalizedStrings[language].date, date: hepatomegalyDate, action: setHepatomegalyDate, language }) : null}</View>

                    <View style={[styles.responseRow, { paddingVertical: 0 }]}>
                        <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].cirrhosis}</Text>
                    </View>
                    <View style={[styles.responseRow, { padding: 0 }]}>
                        <TextInput
                            style={styles.inputs}
                            onChangeText={(text) => setCirrhosis(text)}
                            value={cirrhosis}
                        />
                    </View>
                    <View>{cirrhosis ? datePicker({ future: true, placeholder: LocalizedStrings[language].date, date: cirrhosisDate, action: setCirrhosisDate, language }) : null}</View>

                    <View style={[styles.responseRow, { paddingVertical: 0 }]}>
                        <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].venousInsufficiency}</Text>
                    </View>
                    <View style={[styles.responseRow, { padding: 0 }]}>
                        <TextInput
                            style={styles.inputs}
                            onChangeText={(text) => setVenousInsufficiency(text)}
                            value={venousInsufficiency}
                        />
                    </View>
                    <View>{venousInsufficiency ? datePicker({ future: true, placeholder: LocalizedStrings[language].date, date: venousInsufficiencyDate, action: setVenousInsufficiencyDate, language }) : null}</View>


                    <View style={[styles.responseRow, { paddingVertical: 0 }]}>
                        <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].mildRenal}</Text>
                    </View>
                    <View style={[styles.responseRow, { padding: 0 }]}>
                        <TextInput
                            style={styles.inputs}
                            onChangeText={(text) => setMildRenal(text)}
                            value={mildRenal}
                        />
                    </View>
                    <View>{mildRenal ? datePicker({ future: true, placeholder: LocalizedStrings[language].date, date: mildRenalDate, action: setMildRenalDate, language }) : null}</View>

                    <View style={[styles.responseRow, { paddingVertical: 0 }]}>
                        <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].moderateRenal}</Text>
                    </View>
                    <View style={[styles.responseRow, { padding: 0 }]}>
                        <TextInput
                            style={styles.inputs}
                            onChangeText={(text) => setModerateRenal(text)}
                            value={moderateRenal}
                        />
                    </View>
                    <View>{moderateRenal ? datePicker({ future: true, placeholder: LocalizedStrings[language].date, date: moderateRenalDate, action: setModerateRenalDate, language }) : null}</View>

                    <View style={[styles.responseRow, { paddingVertical: 0 }]}>
                        <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].severeRenal}</Text>
                    </View>
                    <View style={[styles.responseRow, { padding: 0 }]}>
                        <TextInput
                            style={styles.inputs}
                            onChangeText={(text) => setSevereRenal(text)}
                            value={severeRenal}
                        />
                    </View>
                    <View>{severeRenal ? datePicker({ future: true, placeholder: LocalizedStrings[language].date, date: severeRenalDate, action: setSevereRenalDate, language }) : null}</View>

                    <View style={[styles.responseRow, { paddingVertical: 0 }]}>
                        <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].nephrolithiasis}</Text>
                    </View>
                    <View style={[styles.responseRow, { padding: 0 }]}>
                        <TextInput
                            style={styles.inputs}
                            onChangeText={(text) => setNephrolithiasis(text)}
                            value={nephrolithiasis}
                        />
                    </View>
                    <View>{nephrolithiasis ? datePicker({ future: true, placeholder: LocalizedStrings[language].date, date: nephrolithiasisDate, action: setNephrolithiasisDate, language }) : null}</View>

                    <View style={[styles.responseRow, { paddingVertical: 0 }]}>
                        <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].complexMasses}</Text>
                    </View>
                    <View style={[styles.responseRow, { padding: 0 }]}>
                        <TextInput
                            style={styles.inputs}
                            onChangeText={(text) => setComplexMasses(text)}
                            value={complexMasses}
                        />
                    </View>
                    <View>{complexMasses ? datePicker({ future: true, placeholder: LocalizedStrings[language].date, date: complexMassesDate, action: setComplexMassesDate, language }) : null}</View>

                    <View style={[styles.responseRow, { paddingBottom: 0 }]}>
                        <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].benignNodules}</Text>
                    </View>
                    <View style={[styles.responseRow, { padding: 0 }]}>
                        <TextInput
                            style={styles.inputs}
                            onChangeText={(text) => setBenignNodules(text)}
                            value={benignNodules}
                        />
                    </View>
                    <View>{benignNodules ? datePicker({ future: true, placeholder: LocalizedStrings[language].date, date: beningNodulesDate, action: setBenignNodulesDate, language }) : null}</View>

                    <View style={[styles.responseRow, { paddingVertical: 0 }]}>
                        <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].malignantNodules}</Text>
                    </View>
                    <View style={[styles.responseRow, { padding: 0 }]}>
                        <TextInput
                            style={styles.inputs}
                            onChangeText={(text) => setMalignantNodules(text)}
                            value={malignantNodules}
                        />
                    </View>
                    <View>{malignantNodules ? datePicker({ future: true, placeholder: LocalizedStrings[language].date, date: malignantNodulesDate, action: setMalignantNodulesDate, language }) : null}</View>

                    <View style={[styles.responseRow, { paddingVertical: 0 }]}>
                        <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].thyroidNodules}</Text>
                    </View>
                    <View style={[styles.responseRow, { padding: 0 }]}>
                        <TextInput
                            style={styles.inputs}
                            onChangeText={(text) => setThyroidNodules(text)}
                            value={thyroidNodules}
                        />
                    </View>
                    <View>{thyroidNodules ? datePicker({ future: true, placeholder: LocalizedStrings[language].date, date: thyroidNodulesDate, action: setThyroidNodulesDate, language }) : null}</View>

                    <View style={[styles.responseRow, { paddingVertical: 0 }]}>
                        <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].normalUltrasound}</Text>
                    </View>
                    <View style={[styles.responseRow, { padding: 0 }]}>
                        <TextInput
                            style={styles.inputs}
                            onChangeText={(text) => setNormalUltrasound(text)}
                            value={normalUltrasound}
                        />
                    </View>
                    <View>{normalUltrasound ? datePicker({ future: true, placeholder: LocalizedStrings[language].date, date: normalUltrasoundDate, action: setNormalUltrasoundDate, language }) : null}</View>

                    <View style={[styles.responseRow, { paddingVertical: 0 }]}>
                        <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].polycysticOvaries}</Text>
                    </View>
                    <View style={[styles.responseRow, { padding: 0 }]}>
                        <TextInput
                            style={styles.inputs}
                            onChangeText={(text) => setPolycysticOvaries(text)}
                            value={polycysticOvaries}
                        />
                    </View>
                    <View>{polycysticOvaries ? datePicker({ future: true, placeholder: LocalizedStrings[language].date, date: polycysticOvariesDate, action: setPolycysticOvariesDate, language }) : null}</View>

                    <View style={[styles.responseRow, { paddingVertical: 0 }]}>
                        <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].simpleOvarianCysts}</Text>
                    </View>
                    <View style={[styles.responseRow, { padding: 0 }]}>
                        <TextInput
                            style={styles.inputs}
                            onChangeText={(text) => setSimpleOvarianCysts(text)}
                            value={simpleOvarianCysts}
                        />
                    </View>
                    <View>{simpleOvarianCysts ? datePicker({ future: true, placeholder: LocalizedStrings[language].date, date: simpleOvarianCystsDate, action: setSimpleOvarianCystsDate, language }) : null}</View>

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

export default Ultrasound;
