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

const formatDisplay = (field, dateField, language) => {
    if (!!field && !!dateField) {
        return (field + '   ' + dateField)
    }
    return null

}

export const UltrasoundDisplay = (metadataObj, language) => {
    return (
        <View>
            <Text>{LocalizedStrings[language].doctor}: {metadataObj.doctor} </Text>
            <Text>{LocalizedStrings[language].abdominal}: {metadataObj.abdominal ? LocalizedStrings[language].yes : LocalizedStrings[language].no}</Text>
            <Text>{LocalizedStrings[language].joints}: {metadataObj.joints ? LocalizedStrings[language].yes : LocalizedStrings[language].no}</Text>
            <Text>{LocalizedStrings[language].neck}: {metadataObj.neck ? LocalizedStrings[language].yes : LocalizedStrings[language].no}</Text>
            <Text>{LocalizedStrings[language].doppler}: {metadataObj.doppler ? LocalizedStrings[language].yes : LocalizedStrings[language].no}</Text>
            <Text>{LocalizedStrings[language].breast}: {metadataObj.breast ? LocalizedStrings[language].yes : LocalizedStrings[language].no}</Text>
            <Text>{LocalizedStrings[language].firstOB}: {metadataObj.firstOB ? LocalizedStrings[language].yes : LocalizedStrings[language].no}</Text>
            <Text>{LocalizedStrings[language].secondOB}: {metadataObj.secondOB ? LocalizedStrings[language].yes : LocalizedStrings[language].no}</Text>
            <Text>{LocalizedStrings[language].thirdOB}: {metadataObj.thirdOB ? LocalizedStrings[language].yes : LocalizedStrings[language].no}</Text>
            <Text>{LocalizedStrings[language].softTissues}: {metadataObj.softTissues ? LocalizedStrings[language].yes : LocalizedStrings[language].no}</Text>
            <Text>{LocalizedStrings[language].pelvic}: {metadataObj.pelvic ? LocalizedStrings[language].yes : LocalizedStrings[language].no}</Text>
            <Text>{LocalizedStrings[language].prostate}: {metadataObj.prostate ? LocalizedStrings[language].yes : LocalizedStrings[language].no}</Text>
            <Text>{LocalizedStrings[language].renal}: {metadataObj.renal ? LocalizedStrings[language].yes : LocalizedStrings[language].no}</Text>
            <Text>{LocalizedStrings[language].testicular}: {metadataObj.testicular ? LocalizedStrings[language].yes : LocalizedStrings[language].no}</Text>
            <Text>{LocalizedStrings[language].other}: {metadataObj.other ? LocalizedStrings[language].yes : LocalizedStrings[language].no}</Text>

            <Text>{LocalizedStrings[language].goiter}: {formatDisplay(metadataObj.goiter, metadataObj.goiterDate, language)} </Text>
            <Text>{LocalizedStrings[language].wrappedCord}: {formatDisplay(metadataObj.wrappedCord, metadataObj.wrappedCordDate, language)} </Text>
            <Text>{LocalizedStrings[language].cholelithiasis}: {formatDisplay(metadataObj.cholelithiasis, metadataObj.cholelithiasisDate, language)} </Text>
            <Text>{LocalizedStrings[language].prostate1}: {formatDisplay(metadataObj.prostate1, metadataObj.prostate1Date, language)} </Text>
            <Text>{LocalizedStrings[language].prostate2}: {formatDisplay(metadataObj.prostate2, metadataObj.prostate2Date, language)} </Text>
            <Text>{LocalizedStrings[language].prostate3}: {formatDisplay(metadataObj.prostate3, metadataObj.prostate3Date, language)} </Text>
            <Text>{LocalizedStrings[language].endometrialThickening}: {formatDisplay(metadataObj.endometrialThickening, metadataObj.endometrialThickeningDate, language)} </Text>
            <Text>{LocalizedStrings[language].splenomegaly}: {formatDisplay(metadataObj.splenomegaly, metadataObj.splenomegalyDate, language)} </Text>
            <Text>{LocalizedStrings[language].mildHepatic}: {formatDisplay(metadataObj.mildHepatic, metadataObj.mildHepaticDate, language)} </Text>
            <Text>{LocalizedStrings[language].moderateHepatic}: {formatDisplay(metadataObj.moderateHepatic, metadataObj.moderateHepaticDate, language)} </Text>
            <Text>{LocalizedStrings[language].severeHepatic}: {formatDisplay(metadataObj.severeHepatic, metadataObj.severeHepaticDate, language)} </Text>
            <Text>{LocalizedStrings[language].hepatomegaly}: {formatDisplay(metadataObj.hepatomegaly, metadataObj.hepatomegalyDate, language)} </Text>
            <Text>{LocalizedStrings[language].cirrhosis}: {formatDisplay(metadataObj.cirrhosis, metadataObj.cirrhosisDate, language)} </Text>
            <Text>{LocalizedStrings[language].venousInsufficiency}: {formatDisplay(metadataObj.venousInsufficiency, metadataObj.venousInsufficiencyDate, language)} </Text>
            <Text>{LocalizedStrings[language].mildRenal}: {formatDisplay(metadataObj.mildRenal, metadataObj.mildRenalDate, language)} </Text>
            <Text>{LocalizedStrings[language].moderateRenal}: {formatDisplay(metadataObj.moderateRenal, metadataObj.moderateRenalDate, language)} </Text>
            <Text>{LocalizedStrings[language].severeRenal}: {formatDisplay(metadataObj.severeRenal, metadataObj.severeRenalDate, language)} </Text>
            <Text>{LocalizedStrings[language].nephrolithiasis}: {formatDisplay(metadataObj.nephrolithiasis, metadataObj.nephrolithiasisDate, language)} </Text>
            <Text>{LocalizedStrings[language].complexMasses}: {formatDisplay(metadataObj.complexMasses, metadataObj.complexMassesDate, language)} </Text>
            <Text>{LocalizedStrings[language].benignNodules}: {formatDisplay(metadataObj.benignNodules, metadataObj.benignNodulesDate, language)} </Text>
            <Text>{LocalizedStrings[language].malignantNodules}: {formatDisplay(metadataObj.malignantNodules, metadataObj.malignantNodulesDate, language)} </Text>
            <Text>{LocalizedStrings[language].thyroidNodules}: {formatDisplay(metadataObj.thyroidNodules, metadataObj.thyroidNodulesDate, language)} </Text>
            <Text>{LocalizedStrings[language].normalUltrasound}: {formatDisplay(metadataObj.normalUltrasound, metadataObj.normalUltrasoundDate, language)} </Text>
            <Text>{LocalizedStrings[language].polycysticOvaries}: {formatDisplay(metadataObj.polycysticOvaries, metadataObj.polycysticOvariesDate, language)} </Text>
            <Text>{LocalizedStrings[language].simpleOvarianCysts}: {formatDisplay(metadataObj.simpleOvarianCysts, metadataObj.simpleOvarianCystsDate, language)} </Text>
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

                    <View style={[styles.responseRow]}>
                        {radioButtons({ field: softTissues, action: setSoftTissues, prompt: LocalizedStrings[language].softTissues, language })}
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
