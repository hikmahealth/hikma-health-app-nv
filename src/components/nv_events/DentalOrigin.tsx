import React, { useState } from 'react';
import {
    View, Text, TextInput, ScrollView, Button, Picker
} from 'react-native';

import { database } from "../../storage/Database";
import { v4 as uuid } from 'uuid';
import styles from '../Style';
import { EventTypes } from '../../enums/EventTypes';
import LinearGradient from 'react-native-linear-gradient';
import { radioButtons } from '../Covid19Form'
import { LocalizedStrings } from '../../enums/LocalizedStrings';

const formatDisplay = (field, language) => {
    if (field == null) {
        return null
    }
    return field ? LocalizedStrings[language].yes : LocalizedStrings[language].no
}

export const DentalOriginDisplay = (metadataObj, language) => {
    return (
        <View>
            <Text>{LocalizedStrings[language].doctor}: {metadataObj.doctor} </Text>
            {!!metadataObj.otherFeedingCenter && metadataObj.feedingCenter == 'Other' ? <Text>{LocalizedStrings[language].otherFeedingCenter}: {metadataObj.otherFeedingCenter} </Text> : <Text>{LocalizedStrings[language].feedingCenter}: {metadataObj.feedingCenter} </Text>}
        </View>)
}

const DentalOrigin = (props) => {

    const [feedingCenter, setFeedingCenter] = useState(null);
    const [otherFeedingCenter, setOtherFeedingCenter] = useState(null);

    const patientId = props.navigation.getParam('patientId');
    const visitId = props.navigation.getParam('visitId');
    const language = props.navigation.getParam('language', 'en');
    const userName = props.navigation.getParam('userName');

    const submit = async () => {
        database.addEvent({
            id: uuid(),
            patient_id: patientId,
            visit_id: visitId,
            event_type: EventTypes.DentalOrigin,
            event_metadata: JSON.stringify({
                doctor: userName,
                feedingCenter,
                otherFeedingCenter,
            })
        }).then(() => {
            props.navigation.navigate('NewVisit')
        })
    };

    const OriginPicker = () => {
        return (
            <Picker
                selectedValue={feedingCenter}
                onValueChange={value => setFeedingCenter(value)}
                style={[styles.picker, { width: 200 }]}
            >
                <Picker.Item value='' label={LocalizedStrings[language].feedingCenter} />
                <Picker.Item value={LocalizedStrings[language].bernabe} label={LocalizedStrings[language].bernabe} />
                <Picker.Item value={LocalizedStrings[language].canon} label={LocalizedStrings[language].canon} />
                <Picker.Item value={LocalizedStrings[language].clubLaEsperanza} label={LocalizedStrings[language].clubLaEsperanza} />
                <Picker.Item value={LocalizedStrings[language].elShaddai} label={LocalizedStrings[language].elShaddai} />
                <Picker.Item value={LocalizedStrings[language].hogar} label={LocalizedStrings[language].hogar} />
                <Picker.Item value={LocalizedStrings[language].jinotepe} label={LocalizedStrings[language].jinotepe} />
                <Picker.Item value={LocalizedStrings[language].laHermosa} label={LocalizedStrings[language].laHermosa} />
                <Picker.Item value={LocalizedStrings[language].leonDeJuda} label={LocalizedStrings[language].leonDeJuda} />
                <Picker.Item value={LocalizedStrings[language].losNinn} label={LocalizedStrings[language].losNinn} />
                <Picker.Item value={LocalizedStrings[language].luzVida} label={LocalizedStrings[language].luzVida} />
                <Picker.Item value={LocalizedStrings[language].manantialDeVida} label={LocalizedStrings[language].manantialDeVida} />
                <Picker.Item value={LocalizedStrings[language].maranatha} label={LocalizedStrings[language].maranatha} />
                <Picker.Item value={LocalizedStrings[language].matagalpa} label={LocalizedStrings[language].matagalpa} />
                <Picker.Item value={LocalizedStrings[language].monteDeSion} label={LocalizedStrings[language].monteDeSion} />
                <Picker.Item value={LocalizedStrings[language].nuevaJerusalen} label={LocalizedStrings[language].nuevaJerusalen} />
                <Picker.Item value={LocalizedStrings[language].obreroLevitico} label={LocalizedStrings[language].obreroLevitico} />
                <Picker.Item value={LocalizedStrings[language].posoltegaJoseLara} label={LocalizedStrings[language].posoltegaJoseLara} />
                <Picker.Item value={LocalizedStrings[language].riosDeAguaViva} label={LocalizedStrings[language].riosDeAguaViva} />
                <Picker.Item value={LocalizedStrings[language].rivas} label={LocalizedStrings[language].rivas} />
                <Picker.Item value={LocalizedStrings[language].verboSur} label={LocalizedStrings[language].verboSur} />
                <Picker.Item value={LocalizedStrings[language].jubileeHouseCommunity} label={LocalizedStrings[language].jubileeHouseCommunity} />
                <Picker.Item value='Other' label={LocalizedStrings[language].other} />

            </Picker>
        )
    }

    const showOtherFeedingCenter = () => {
        if (feedingCenter == 'Other') {
            return (
                <View style={styles.responseRow}>
                    <View style={[styles.responseRow, { paddingVertical: 0 }]}>
                        <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].otherFeedingCenter}</Text>
                    </View>
                    <View style={[styles.responseRow, { padding: 0 }]}>
                        <TextInput
                            style={styles.inputs}
                            onChangeText={(text) => setOtherFeedingCenter(text)}
                            value={otherFeedingCenter}
                        />
                    </View>
                </View>)
        } else {
            return null
        }
    }

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <LinearGradient colors={['#31BBF3', '#4D7FFF']} style={styles.containerLeft}>
                <View style={[styles.inputsContainer, { alignItems: 'flex-start' }]}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignSelf: 'stretch', }}>
                        <Text style={[styles.text, { fontSize: 16, fontWeight: 'bold' }]}>{LocalizedStrings[language].dentalOrigin}</Text>
                    </View>
                    <View style={styles.responseRow}>
                        {OriginPicker()}
                    </View>
                    {showOtherFeedingCenter()}
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

export default DentalOrigin;
