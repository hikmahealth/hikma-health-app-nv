import React, { useState, useEffect } from 'react';
import {
    View, Text, TextInput, ScrollView, Button
} from 'react-native';

import { database } from "../../storage/Database";
import { v4 as uuid } from 'uuid';
import styles from '../Style';
import { EventTypes } from '../../enums/EventTypes';
import LinearGradient from 'react-native-linear-gradient';
import { LocalizedStrings } from '../../enums/LocalizedStrings';

const PatientDetails = (props) => {
    const [medicalNum, setMedicalNum] = useState(null);
    const [dentalNum, setDentalNum] = useState(null);
    const [optometryNum, setOptometryNum] = useState(null);
    const [community, setCommunity] = useState(null);
    const [zone, setZone] = useState(null);
    const [block, setBlock] = useState(null);
    const [lot, setLot] = useState(null);
    const [emergencyPhone, setEmergencyPhone] = useState(null);
    const [mother, setMother] = useState(null);
    const [motherPhone, setMotherPhone] = useState(null);
    const [father, setFather] = useState(null);
    const [fatherPhone, setFatherPhone] = useState(null);
    const [partner, setPartner] = useState(null);
    const [partnerPhone, setPartnerPhone] = useState(null);
    const [employer, setEmployer] = useState(null);
    const [insurance, setInsurance] = useState(null);

    const patientId = props.navigation.getParam('patientId');
    const language = props.navigation.getParam('language', 'en');
    const userName = props.navigation.getParam('userName');

    useEffect(() => {
        database.getLatestPatientEventByType(patientId, EventTypes.PatientDetails).then((response: any) => {
            if (response.length > 0) {
                const responseObj = JSON.parse(response)

                setMedicalNum(responseObj.medicalNum)
                setDentalNum(responseObj.dentalNum)
                setOptometryNum(responseObj.optometryNum)
                setCommunity(responseObj.community)
                setZone(responseObj.zone)
                setBlock(responseObj.block)
                setLot(responseObj.lot)
                setEmergencyPhone(responseObj.emergencyPhone)
                setMother(responseObj.mother)
                setMotherPhone(responseObj.motherPhone)
                setFather(responseObj.father)
                setFatherPhone(responseObj.fatherPhone)
                setPartner(responseObj.partner)
                setPartnerPhone(responseObj.partnerPhone)
                setEmployer(responseObj.employer)
                setInsurance(responseObj.insurance)
            }
        })
    }, [])

    const submit = async () => {
        database.addEvent({
            id: uuid(),
            patient_id: patientId,
            visit_id: null,
            event_type: EventTypes.PatientDetails,
            event_metadata: JSON.stringify({
                doctor: userName,
                medicalNum,
                dentalNum,
                optometryNum,
                patientId,
                community,
                zone,
                block,
                lot,
                emergencyPhone,
                mother,
                motherPhone,
                father,
                fatherPhone,
                partner,
                partnerPhone,
                employer,
                insurance,
            })
        }).then(() => {
            props.navigation.navigate('PatientView')
        })
    };

    return (
        <ScrollView>
            <LinearGradient colors={['#31BBF3', '#4D7FFF']} style={styles.containerLeft}>
                <View style={[styles.inputsContainer, { alignItems: 'flex-start' }]}>

                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignSelf: 'stretch', }}>
                        <Text style={[styles.text, { fontSize: 16, fontWeight: 'bold' }]}>{LocalizedStrings[language].patientDetails}</Text>
                    </View>
                    <View style={[styles.responseRow, { paddingBottom: 0 }]}>
                        <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].medicalNum}</Text>
                    </View>
                    <View style={[styles.responseRow, { padding: 0 }]}>
                        <TextInput
                            style={styles.inputs}
                            onChangeText={(text) => setMedicalNum(text)}
                            value={medicalNum}
                            keyboardType="numeric"
                        />
                    </View>
                    <View style={[styles.responseRow, { paddingVertical: 0 }]}>
                        <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].dentalNum}</Text>
                    </View>
                    <View style={[styles.responseRow, { padding: 0 }]}>
                        <TextInput
                            style={styles.inputs}
                            onChangeText={(text) => setDentalNum(text)}
                            value={dentalNum}
                            keyboardType="numeric"
                        />
                    </View>
                    <View style={[styles.responseRow, { paddingVertical: 0 }]}>
                        <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].optometryNum}</Text>
                    </View>
                    <View style={[styles.responseRow, { padding: 0 }]}>
                        <TextInput
                            style={styles.inputs}
                            onChangeText={(text) => setOptometryNum(text)}
                            value={optometryNum}
                            keyboardType="numeric"
                        />
                    </View>
                    <View style={[styles.responseRow, { paddingVertical: 0 }]}>
                        <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].community}</Text>
                    </View>
                    <View style={[styles.responseRow, { padding: 0 }]}>
                        <TextInput
                            style={styles.inputs}
                            onChangeText={(text) => setCommunity(text)}
                            value={community}
                        />
                    </View>


                    <View style={[styles.responseRow, { paddingVertical: 0 }]}>
                        <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].zone}</Text>
                    </View>
                    <View style={[styles.responseRow, { padding: 0 }]}>
                        <TextInput
                            style={styles.inputs}
                            onChangeText={(text) => setZone(text)}
                            value={zone}
                        />
                    </View>
                    <View style={[styles.responseRow, { paddingVertical: 0 }]}>
                        <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].block}</Text>
                    </View>
                    <View style={[styles.responseRow, { padding: 0 }]}>
                        <TextInput
                            style={styles.inputs}
                            onChangeText={(text) => setBlock(text)}
                            value={block}
                        />
                    </View>
                    <View style={[styles.responseRow, { paddingVertical: 0 }]}>
                        <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].lot}</Text>
                    </View>
                    <View style={[styles.responseRow, { paddingTop: 0, paddingHorizontal: 0 }]}>
                        <TextInput
                            style={styles.inputs}
                            onChangeText={(text) => setLot(text)}
                            value={lot}
                        />
                    </View>

                    <View style={[styles.responseRow, { paddingVertical: 0 }]}>
                        <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].emergencyPhone}</Text>
                    </View>
                    <View style={[styles.responseRow, { paddingTop: 0, paddingHorizontal: 0 }]}>
                        <TextInput
                            style={styles.inputs}
                            onChangeText={(text) => setEmergencyPhone(text)}
                            value={emergencyPhone}
                            keyboardType="numeric"
                        />
                    </View>
                    <View style={[styles.responseRow, { paddingVertical: 0 }]}>
                        <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].mother}</Text>
                    </View>
                    <View style={[styles.responseRow, { paddingTop: 0, paddingHorizontal: 0 }]}>
                        <TextInput
                            style={styles.inputs}
                            onChangeText={(text) => setMother(text)}
                            value={mother}
                        />
                    </View>
                    <View style={[styles.responseRow, { paddingVertical: 0 }]}>
                        <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].motherPhone}</Text>
                    </View>
                    <View style={[styles.responseRow, { paddingTop: 0, paddingHorizontal: 0 }]}>
                        <TextInput
                            style={styles.inputs}
                            onChangeText={(text) => setMotherPhone(text)}
                            value={motherPhone}
                            keyboardType="numeric"
                        />
                    </View>
                    <View style={[styles.responseRow, { paddingVertical: 0 }]}>
                        <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].father}</Text>
                    </View>
                    <View style={[styles.responseRow, { paddingTop: 0, paddingHorizontal: 0 }]}>
                        <TextInput
                            style={styles.inputs}
                            onChangeText={(text) => setFather(text)}
                            value={father}
                        />
                    </View>
                    <View style={[styles.responseRow, { paddingVertical: 0 }]}>
                        <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].fatherPhone}</Text>
                    </View>
                    <View style={[styles.responseRow, { paddingTop: 0, paddingHorizontal: 0 }]}>
                        <TextInput
                            style={styles.inputs}
                            onChangeText={(text) => setFatherPhone(text)}
                            value={fatherPhone}
                            keyboardType="numeric"
                        />
                    </View>
                    <View style={[styles.responseRow, { paddingVertical: 0 }]}>
                        <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].partner}</Text>
                    </View>
                    <View style={[styles.responseRow, { paddingTop: 0, paddingHorizontal: 0 }]}>
                        <TextInput
                            style={styles.inputs}
                            onChangeText={(text) => setPartner(text)}
                            value={partner}
                        />
                    </View>
                    <View style={[styles.responseRow, { paddingVertical: 0 }]}>
                        <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].partnerPhone}</Text>
                    </View>
                    <View style={[styles.responseRow, { paddingTop: 0, paddingHorizontal: 0 }]}>
                        <TextInput
                            style={styles.inputs}
                            onChangeText={(text) => setPartnerPhone(text)}
                            value={partnerPhone}
                            keyboardType="numeric"
                        />
                    </View>
                    <View style={[styles.responseRow, { paddingVertical: 0 }]}>
                        <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].employer}</Text>
                    </View>
                    <View style={[styles.responseRow, { paddingTop: 0, paddingHorizontal: 0 }]}>
                        <TextInput
                            style={styles.inputs}
                            onChangeText={(text) => setEmployer(text)}
                            value={employer}
                        />
                    </View>
                    <View style={[styles.responseRow, { paddingVertical: 0 }]}>
                        <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].insurance}</Text>
                    </View>
                    <View style={[styles.responseRow, { paddingTop: 0, paddingHorizontal: 0 }]}>
                        <TextInput
                            style={styles.inputs}
                            onChangeText={(text) => setInsurance(text)}
                            value={insurance}
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

export default PatientDetails;
