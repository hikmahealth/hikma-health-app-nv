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
    if (!!field) {
        return LocalizedStrings[language].yes
    }
    if (field === null) {
        return null
    }
    return LocalizedStrings[language].no
}

export const DentalOriginDisplay = (metadataObj, language) => {
    return (
        <View>
            <Text>{LocalizedStrings[language].doctor}: {metadataObj.doctor} </Text>
            <Text>{LocalizedStrings[language].bernabe}: {formatDisplay(metadataObj.bernabe, language)} </Text>
            <Text>{LocalizedStrings[language].canon}: {formatDisplay(metadataObj.canon, language)} </Text>
            <Text>{LocalizedStrings[language].clubLaEsperanza}: {formatDisplay(metadataObj.clubLaEsperanza, language)} </Text>
            <Text>{LocalizedStrings[language].elShaddai}: {formatDisplay(metadataObj.elShaddai, language)} </Text>
            <Text>{LocalizedStrings[language].hogar}: {formatDisplay(metadataObj.hogar, language)} </Text>
            <Text>{LocalizedStrings[language].jinotepe}: {formatDisplay(metadataObj.jinotepe, language)} </Text>
            <Text>{LocalizedStrings[language].laHermosa}: {formatDisplay(metadataObj.laHermosa, language)} </Text>
            <Text>{LocalizedStrings[language].leonDeJuda}: {formatDisplay(metadataObj.leonDeJuda, language)} </Text>
            <Text>{LocalizedStrings[language].losNinn}: {formatDisplay(metadataObj.losNinn, language)} </Text>
            <Text>{LocalizedStrings[language].luzVida}: {formatDisplay(metadataObj.luzVida, language)} </Text>
            <Text>{LocalizedStrings[language].manantialDeVida}: {formatDisplay(metadataObj.manantialDeVida, language)} </Text>
            <Text>{LocalizedStrings[language].maranatha}: {formatDisplay(metadataObj.maranatha, language)} </Text>
            <Text>{LocalizedStrings[language].matagalpa}: {formatDisplay(metadataObj.matagalpa, language)} </Text>
            <Text>{LocalizedStrings[language].monteDeSion}: {formatDisplay(metadataObj.monteDeSion, language)} </Text>
            <Text>{LocalizedStrings[language].nuevaJerusalen}: {formatDisplay(metadataObj.nuevaJerusalen, language)} </Text>
            <Text>{LocalizedStrings[language].obreroLevitico}: {formatDisplay(metadataObj.obreroLevítico, language)} </Text>
            <Text>{LocalizedStrings[language].posoltegaJoseLara}: {formatDisplay(metadataObj.posoltegaJoseLara, language)} </Text>
            <Text>{LocalizedStrings[language].riosDeAguaViva}: {formatDisplay(metadataObj.riosDeAguaViva, language)} </Text>
            <Text>{LocalizedStrings[language].rivas}: {formatDisplay(metadataObj.rivas, language)} </Text>
            <Text>{LocalizedStrings[language].verboSur}: {formatDisplay(metadataObj.verboSur, language)} </Text>
            <Text>{LocalizedStrings[language].jubileeHouseCommunity}: {formatDisplay(metadataObj.jubileeHouseCommunity, language)} </Text>
            <Text>{LocalizedStrings[language].otherFeedingCenter}: {metadataObj.otherFeedingCenter} </Text>
      </View>)
}

const DentalOrigin = (props) => {

    const [bernabe, setBernabe] = useState(null);
    const [canon, setCanon] = useState(null);
    const [clubLaEsperanza, setClubLaEsperanza] = useState(null);
    const [elShaddai, setElShaddai] = useState(null);
    const [hogar, setHogar] = useState(null);
    const [jinotepe, setJinotepe] = useState(null);
    const [laHermosa, setLaHermosa] = useState(null);
    const [leonDeJuda, setLeonDeJuda] = useState(null);
    const [losNinn, setLosNinn] = useState(null);
    const [luzVida, setLuzVida] = useState(null);
    const [manantialDeVida, setManantialDeVida] = useState(null);
    const [maranatha, setMaranatha] = useState(null);
    const [matagalpa, setMatagalpa] = useState(null);
    const [monteDeSion, setMonteDeSion] = useState(null);
    const [nuevaJerusalen, setNuevaJerusalen] = useState(null);
    const [obreroLevitico, setObreroLevitico] = useState(null);
    const [posoltegaJoseLara, setPosoltegaJoseLara] = useState(null);
    const [riosDeAguaViva, setRiosDeAguaViva] = useState(null);
    const [rivas, setRivas] = useState(null);
    const [verboSur, setVerboSur] = useState(null);
    const [jubileeHouseCommunity, setJubileeHouseCommunity] = useState(null);
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
                bernabe,
                canon,
                clubLaEsperanza,
                elShaddai,
                hogar,
                jinotepe,
                laHermosa,
                leonDeJuda,
                losNinn,
                luzVida,
                manantialDeVida,
                maranatha,
                matagalpa,
                monteDeSion,
                nuevaJerusalen,
                obreroLevitico,
                posoltegaJoseLara,
                riosDeAguaViva,
                rivas,
                verboSur,
                jubileeHouseCommunity,
                otherFeedingCenter,
            })
        }).then(() => {
            props.navigation.navigate('NewVisit')
        })
    };

    return (
        <ScrollView>
            <LinearGradient colors={['#31BBF3', '#4D7FFF']} style={styles.containerLeft}>
                <View style={[styles.inputsContainer, { alignItems: 'flex-start' }]}>
                    <View style={[styles.responseRow]}>
                        {radioButtons({ field: bernabe, action: setBernabe, prompt: LocalizedStrings[language].bernabe, language })}
                    </View>
                    <View style={[styles.responseRow]}>
                        {radioButtons({ field: canon, action: setCanon, prompt: LocalizedStrings[language].canon, language })}
                    </View>
                    <View style={[styles.responseRow]}>
                        {radioButtons({ field: clubLaEsperanza, action: setClubLaEsperanza, prompt: LocalizedStrings[language].clubLaEsperanza, language })}
                    </View>
                    <View style={[styles.responseRow]}>
                        {radioButtons({ field: elShaddai, action: setElShaddai, prompt: LocalizedStrings[language].elShaddai, language })}
                    </View>
                    <View style={[styles.responseRow]}>
                        {radioButtons({ field: hogar, action: setHogar, prompt: LocalizedStrings[language].hogar, language })}
                    </View>
                    <View style={[styles.responseRow]}>
                        {radioButtons({ field: jinotepe, action: setJinotepe, prompt: LocalizedStrings[language].jinotepe, language })}
                    </View>
                    <View style={[styles.responseRow]}>
                        {radioButtons({ field: laHermosa, action: setLaHermosa, prompt: LocalizedStrings[language].laHermosa, language })}
                    </View>
                    <View style={[styles.responseRow]}>
                        {radioButtons({ field: leonDeJuda, action: setLeonDeJuda, prompt: LocalizedStrings[language].leonDeJuda, language })}
                    </View>
                    <View style={[styles.responseRow]}>
                        {radioButtons({ field: losNinn, action: setLosNinn, prompt: LocalizedStrings[language].losNinn, language })}
                    </View>
                    <View style={[styles.responseRow]}>
                        {radioButtons({ field: luzVida, action: setLuzVida, prompt: LocalizedStrings[language].luzVida, language })}
                    </View>
                    <View style={[styles.responseRow]}>
                        {radioButtons({ field: manantialDeVida, action: setManantialDeVida, prompt: LocalizedStrings[language].manantialDeVida, language })}
                    </View>
                    <View style={[styles.responseRow]}>
                        {radioButtons({ field: maranatha, action: setMaranatha, prompt: LocalizedStrings[language].maranatha, language })}
                    </View>
                    <View style={[styles.responseRow]}>
                        {radioButtons({ field: matagalpa, action: setMatagalpa, prompt: LocalizedStrings[language].matagalpa, language })}
                    </View>
                    <View style={[styles.responseRow]}>
                        {radioButtons({ field: monteDeSion, action: setMonteDeSion, prompt: LocalizedStrings[language].monteDeSion, language })}
                    </View>
                    <View style={[styles.responseRow]}>
                        {radioButtons({ field: nuevaJerusalen, action: setNuevaJerusalen, prompt: LocalizedStrings[language].nuevaJerusalen, language })}
                    </View>
                    <View style={[styles.responseRow]}>
                        {radioButtons({ field: obreroLevitico, action: setObreroLevitico, prompt: LocalizedStrings[language].obreroLevitico, language })}
                    </View>
                    <View style={[styles.responseRow]}>
                        {radioButtons({ field: posoltegaJoseLara, action: setPosoltegaJoseLara, prompt: LocalizedStrings[language].posoltegaJoseLara, language })}
                    </View>
                    <View style={[styles.responseRow]}>
                        {radioButtons({ field: riosDeAguaViva, action: setRiosDeAguaViva, prompt: LocalizedStrings[language].riosDeAguaViva, language })}
                    </View>
                    <View style={[styles.responseRow]}>
                        {radioButtons({ field: rivas, action: setRivas, prompt: LocalizedStrings[language].rivas, language })}
                    </View>
                    <View style={[styles.responseRow]}>
                        {radioButtons({ field: verboSur, action: setVerboSur, prompt: LocalizedStrings[language].verboSur, language })}
                    </View>
                    <View style={[styles.responseRow]}>
                        {radioButtons({ field: jubileeHouseCommunity, action: setJubileeHouseCommunity, prompt: LocalizedStrings[language].jubileeHouseCommunity, language })}
                    </View>
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
