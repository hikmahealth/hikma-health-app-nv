import React, { useState, useEffect } from 'react';
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

export const XrayOrderDisplay = (metadataObj, language) => {
    return (
        <View>
            <Text>{LocalizedStrings[language].doctor}: {metadataObj.doctor} </Text>
            <Text>{LocalizedStrings[language].hipAntero}: {formatDisplay(metadataObj.hipAntero, language)} </Text>
            <Text>{LocalizedStrings[language].hipLateral}: {formatDisplay(metadataObj.hipLateral, language)} </Text>
            <Text>{LocalizedStrings[language].hipPosterior}: {formatDisplay(metadataObj.hipPosterior, language)} </Text>
            <Text>{LocalizedStrings[language].retrogradeCystogram}: {formatDisplay(metadataObj.retrogradeCystogram, language)} </Text>
            <Text>{LocalizedStrings[language].cranialAntero}: {formatDisplay(metadataObj.cranialAntero, language)} </Text>
            <Text>{LocalizedStrings[language].cranialLateral}: {formatDisplay(metadataObj.cranialLateral, language)} </Text>
            <Text>{LocalizedStrings[language].cranialPosterior}: {formatDisplay(metadataObj.cranialPosterior, language)} </Text>
            <Text>{LocalizedStrings[language].femurAntero}: {formatDisplay(metadataObj.femurAntero, language)} </Text>
            <Text>{LocalizedStrings[language].femurLateral}: {formatDisplay(metadataObj.femurLateral, language)} </Text>
            <Text>{LocalizedStrings[language].femurPosterior}: {formatDisplay(metadataObj.femurPosterior, language)} </Text>
            <Text>{LocalizedStrings[language].footAntero}: {formatDisplay(metadataObj.footAntero, language)} </Text>
            <Text>{LocalizedStrings[language].standingLateral}: {formatDisplay(metadataObj.standingLateral, language)} </Text>
            <Text>{LocalizedStrings[language].standingOblique}: {formatDisplay(metadataObj.standingOblique, language)} </Text>
            <Text>{LocalizedStrings[language].footPosterior}: {formatDisplay(metadataObj.footPosterior, language)} </Text>
            <Text>{LocalizedStrings[language].ivPyelogram}: {formatDisplay(metadataObj.ivPyelogram, language)} </Text>
            <Text>{LocalizedStrings[language].kneeAntero}: {formatDisplay(metadataObj.kneeAntero, language)} </Text>
            <Text>{LocalizedStrings[language].kneeLateral}: {formatDisplay(metadataObj.kneeLateral, language)} </Text>
            <Text>{LocalizedStrings[language].kneePosterior}: {formatDisplay(metadataObj.kneePosterior, language)} </Text>
            <Text>{LocalizedStrings[language].tibiaAntero}: {formatDisplay(metadataObj.tibiaAntero, language)} </Text>
            <Text>{LocalizedStrings[language].tibiaLateral}: {formatDisplay(metadataObj.tibiaLateral, language)} </Text>
            <Text>{LocalizedStrings[language].tibiaPosterior}: {formatDisplay(metadataObj.tibiaPosterior, language)} </Text>
            <Text>{LocalizedStrings[language].ankleAntero}: {formatDisplay(metadataObj.ankleAntero, language)} </Text>
            <Text>{LocalizedStrings[language].ankleLateral}: {formatDisplay(metadataObj.ankleLateral, language)} </Text>
            <Text>{LocalizedStrings[language].anklePosterior}: {formatDisplay(metadataObj.anklePosterior, language)} </Text>
            <Text>{LocalizedStrings[language].chestAntero}: {formatDisplay(metadataObj.chestAntero, language)} </Text>
            <Text>{LocalizedStrings[language].chestLateral}: {formatDisplay(metadataObj.chestLateral, language)} </Text>
            <Text>{LocalizedStrings[language].chestPosterior}: {formatDisplay(metadataObj.chestPosterior, language)} </Text>
        </View>)
}

const XrayOrders = (props) => {

    const [hipAntero, setHipAntero] = useState(null);
    const [hipLateral, setHipLateral] = useState(null);
    const [hipPosterior, setHipPosterior] = useState(null);
    const [retrogradeCystogram, setRetrogradeCystogram] = useState(null);
    const [cranialAntero, setCranialAntero] = useState(null);
    const [cranialLateral, setCranialLateral] = useState(null);
    const [cranialPosterior, setCranialPosterior] = useState(null);
    const [femurAntero, setFemurAntero] = useState(null);
    const [femurLateral, setFemurLateral] = useState(null);
    const [femurPosterior, setFemurPosterior] = useState(null);
    const [footAntero, setFootAntero] = useState(null);
    const [standingLateral, setStandingLateral] = useState(null);
    const [standingOblique, setStandingOblique] = useState(null);
    const [footPosterior, setFootPosterior] = useState(null);
    const [ivPyelogram, setIvPyelogram] = useState(null);
    const [kneeAntero, setKneeAntero] = useState(null);
    const [kneeLateral, setKneeLateral] = useState(null);
    const [kneePosterior, setKneePosterior] = useState(null);
    const [tibiaAntero, setTibiaAntero] = useState(null);
    const [tibiaLateral, setTibiaLateral] = useState(null);
    const [tibiaPosterior, setTibiaPosterior] = useState(null);
    const [ankleAntero, setAnkleAntero] = useState(null);
    const [ankleLateral, setAnkleLateral] = useState(null);
    const [anklePosterior, setAnklePosterior] = useState(null);
    const [chestAntero, setChestAntero] = useState(null);
    const [chestLateral, setChestLateral] = useState(null);
    const [chestPosterior, setChestPosterior] = useState(null);

    const patientId = props.navigation.getParam('patientId');
    const visitId = props.navigation.getParam('visitId');
    const language = props.navigation.getParam('language', 'en');
    const userName = props.navigation.getParam('userName');

    useEffect(() => {
        database.getLatestPatientEventByType(patientId, EventTypes.XrayOrders).then((response: any) => {
            if (response.length > 0) {
                const responseObj = JSON.parse(response)

                setHipAntero(responseObj.hipAntero)
                setHipLateral(responseObj.hipLateral)
                setHipPosterior(responseObj.hipPosterior)
                setRetrogradeCystogram(responseObj.retrogradeCystogram)
                setCranialAntero(responseObj.cranialAntero)
                setCranialLateral(responseObj.cranialLateral)
                setCranialPosterior(responseObj.cranialPosterior)
                setFemurAntero(responseObj.femurAntero)
                setFemurLateral(responseObj.femurLateral)
                setFemurPosterior(responseObj.femurPosterior)
                setFootAntero(responseObj.footAntero)
                setStandingLateral(responseObj.standingLateral)
                setStandingOblique(responseObj.standingOblique)
                setFootPosterior(responseObj.footPosterior)
                setIvPyelogram(responseObj.ivPyelogram)
                setKneeAntero(responseObj.kneeAntero)
                setKneeLateral(responseObj.kneeLateral)
                setKneePosterior(responseObj.kneePosterior)
                setTibiaAntero(responseObj.tibiaAntero)
                setTibiaLateral(responseObj.tibiaLateral)
                setTibiaPosterior(responseObj.tibiaPosterior)
                setAnkleAntero(responseObj.ankleAntero)
                setAnkleLateral(responseObj.ankleLateral)
                setAnklePosterior(responseObj.anklePosterior)
                setChestAntero(responseObj.chestAntero)
                setChestLateral(responseObj.chestLateral)
                setChestPosterior(responseObj.chestPosterior)
            }
        })
    }, [])

    const submit = async () => {
        database.addEvent({
            id: uuid(),
            patient_id: patientId,
            visit_id: visitId,
            event_type: EventTypes.XrayOrders,
            event_metadata: JSON.stringify({
                doctor: userName,
                hipAntero,
                hipLateral,
                hipPosterior,
                retrogradeCystogram,
                cranialAntero,
                cranialLateral,
                cranialPosterior,
                femurAntero,
                femurLateral,
                femurPosterior,
                footAntero,
                standingLateral,
                standingOblique,
                footPosterior,
                ivPyelogram,
                kneeAntero,
                kneeLateral,
                kneePosterior,
                tibiaAntero,
                tibiaLateral,
                tibiaPosterior,
                ankleAntero,
                ankleLateral,
                anklePosterior,
                chestAntero,
                chestLateral,
                chestPosterior,
            })
        }).then(() => {
            props.navigation.navigate('NewVisit')
        })
    };

    return (
        <ScrollView>
            <LinearGradient colors={['#31BBF3', '#4D7FFF']} style={styles.containerLeft}>
                <View style={[styles.inputsContainer, { alignItems: 'flex-start' }]}>


                    <View style={[styles.responseRow]}>{radioButtons({ field: hipAntero, action: setHipAntero, prompt: LocalizedStrings[language].hipAntero, language })}</View>
                    <View style={[styles.responseRow]}>{radioButtons({ field: hipLateral, action: setHipLateral, prompt: LocalizedStrings[language].hipLateral, language })}</View>
                    <View style={[styles.responseRow]}>{radioButtons({ field: hipPosterior, action: setHipPosterior, prompt: LocalizedStrings[language].hipPosterior, language })}</View>
                    <View style={[styles.responseRow]}>{radioButtons({ field: retrogradeCystogram, action: setRetrogradeCystogram, prompt: LocalizedStrings[language].retrogradeCystogram, language })}</View>
                    <View style={[styles.responseRow]}>{radioButtons({ field: cranialAntero, action: setCranialAntero, prompt: LocalizedStrings[language].cranialAntero, language })}</View>
                    <View style={[styles.responseRow]}>{radioButtons({ field: cranialLateral, action: setCranialLateral, prompt: LocalizedStrings[language].cranialLateral, language })}</View>
                    <View style={[styles.responseRow]}>{radioButtons({ field: cranialPosterior, action: setCranialPosterior, prompt: LocalizedStrings[language].cranialPosterior, language })}</View>
                    <View style={[styles.responseRow]}>{radioButtons({ field: femurAntero, action: setFemurAntero, prompt: LocalizedStrings[language].femurAntero, language })}</View>
                    <View style={[styles.responseRow]}>{radioButtons({ field: femurLateral, action: setFemurLateral, prompt: LocalizedStrings[language].femurLateral, language })}</View>
                    <View style={[styles.responseRow]}>{radioButtons({ field: femurPosterior, action: setFemurPosterior, prompt: LocalizedStrings[language].femurPosterior, language })}</View>
                    <View style={[styles.responseRow]}>{radioButtons({ field: footAntero, action: setFootAntero, prompt: LocalizedStrings[language].footAntero, language })}</View>
                    <View style={[styles.responseRow]}>{radioButtons({ field: standingLateral, action: setStandingLateral, prompt: LocalizedStrings[language].standingLateral, language })}</View>
                    <View style={[styles.responseRow]}>{radioButtons({ field: standingOblique, action: setStandingOblique, prompt: LocalizedStrings[language].standingOblique, language })}</View>
                    <View style={[styles.responseRow]}>{radioButtons({ field: footPosterior, action: setFootPosterior, prompt: LocalizedStrings[language].footPosterior, language })}</View>
                    <View style={[styles.responseRow]}>{radioButtons({ field: ivPyelogram, action: setIvPyelogram, prompt: LocalizedStrings[language].ivPyelogram, language })}</View>
                    <View style={[styles.responseRow]}>{radioButtons({ field: kneeAntero, action: setKneeAntero, prompt: LocalizedStrings[language].kneeAntero, language })}</View>
                    <View style={[styles.responseRow]}>{radioButtons({ field: kneeLateral, action: setKneeLateral, prompt: LocalizedStrings[language].kneeLateral, language })}</View>
                    <View style={[styles.responseRow]}>{radioButtons({ field: kneePosterior, action: setKneePosterior, prompt: LocalizedStrings[language].kneePosterior, language })}</View>
                    <View style={[styles.responseRow]}>{radioButtons({ field: tibiaAntero, action: setTibiaAntero, prompt: LocalizedStrings[language].tibiaAntero, language })}</View>
                    <View style={[styles.responseRow]}>{radioButtons({ field: tibiaLateral, action: setTibiaLateral, prompt: LocalizedStrings[language].tibiaLateral, language })}</View>
                    <View style={[styles.responseRow]}>{radioButtons({ field: tibiaPosterior, action: setTibiaPosterior, prompt: LocalizedStrings[language].tibiaPosterior, language })}</View>
                    <View style={[styles.responseRow]}>{radioButtons({ field: ankleAntero, action: setAnkleAntero, prompt: LocalizedStrings[language].ankleAntero, language })}</View>
                    <View style={[styles.responseRow]}>{radioButtons({ field: ankleLateral, action: setAnkleLateral, prompt: LocalizedStrings[language].ankleLateral, language })}</View>
                    <View style={[styles.responseRow]}>{radioButtons({ field: anklePosterior, action: setAnklePosterior, prompt: LocalizedStrings[language].anklePosterior, language })}</View>
                    <View style={[styles.responseRow]}>{radioButtons({ field: chestAntero, action: setChestAntero, prompt: LocalizedStrings[language].chestAntero, language })}</View>
                    <View style={[styles.responseRow]}>{radioButtons({ field: chestLateral, action: setChestLateral, prompt: LocalizedStrings[language].chestLateral, language })}</View>
                    <View style={[styles.responseRow]}>{radioButtons({ field: chestPosterior, action: setChestPosterior, prompt: LocalizedStrings[language].chestPosterior, language })}</View>

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

export default XrayOrders;
