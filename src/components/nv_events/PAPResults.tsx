import React, { useState, useEffect } from 'react';
import {
    View, Text, Image, TextInput, TouchableOpacity, ScrollView, Button
} from 'react-native';

import { database } from "../../storage/Database";
import { v4 as uuid } from 'uuid';
import styles from '../Style';
import { EventTypes } from '../../enums/EventTypes';
import LinearGradient from 'react-native-linear-gradient';
import { datePicker, radioButtons } from '../Covid19Form'
import { LocalizedStrings } from '../../enums/LocalizedStrings';

const formatDisplay = (field, textField, dateField, language) => {
    if (field == null) {
        return null
    }
    if (!!field && textField == null) {
        return field
    }
    return field ? (textField + '   ' + dateField) : LocalizedStrings[language].no

}

export const PAPResultsDisplay = (metadataObj, language) => {

    return (
        <View>
            <Text>{LocalizedStrings[language].doctor}: {metadataObj.doctor} </Text>
            <Text>{LocalizedStrings[language].adequateCyto}: {formatDisplay(metadataObj.adequateCyto, metadataObj.adequateCytoText, metadataObj.adequateCytoDate, language)} </Text>
            <Text>{LocalizedStrings[language].incompleteCyto}: {formatDisplay(metadataObj.incompleteCyto, metadataObj.incompleteCytoText, metadataObj.incompleteCytoDate, language)}</Text>
            <Text>{LocalizedStrings[language].cellularityCyto}: {formatDisplay(metadataObj.cellularityCyto, metadataObj.cellularityCytoText, metadataObj.cellularityCytoDate, language)}</Text>
            <Text>{LocalizedStrings[language].fixationCyto}: {formatDisplay(metadataObj.fixationCyto, metadataObj.fixationCytoText, metadataObj.fixationCytoDate, language)}</Text>
            <Text>{LocalizedStrings[language].hemorrhageCyto}: {formatDisplay(metadataObj.hemorrhageCyto, metadataObj.hemorrhageCytoText, metadataObj.hemorrhageCytoDate, language)}</Text>
            <Text>{LocalizedStrings[language].exudateCyto}: {formatDisplay(metadataObj.exudateCyto, metadataObj.exudateCytoText, metadataObj.exudateCytoDate, language)}</Text>
            <Text>{LocalizedStrings[language].endocervicalCyto}: {formatDisplay(metadataObj.endocervicalCyto, metadataObj.endocervicalCytoText, metadataObj.endocervicalCytoDate, language)}</Text>
            <Text>{LocalizedStrings[language].inadequateCyto}: {formatDisplay(metadataObj.inadequateCyto, metadataObj.inadequateCytoText, metadataObj.inadequateCytoDate, language)}</Text>
            <Text>{LocalizedStrings[language].bleedingCyto}: {formatDisplay(metadataObj.bleedingCyto, metadataObj.bleedingCytoText, metadataObj.bleedingCytoDate, language)}</Text>
            <Text>{LocalizedStrings[language].fixationInadequateCyto}: {formatDisplay(metadataObj.fixationInadequateCyto, metadataObj.fixationInadequateCytoText, metadataObj.fixationInadequateCytoDate, language)}</Text>
            <Text>{LocalizedStrings[language].squamous}: {formatDisplay(metadataObj.squamous, metadataObj.squamousText, metadataObj.squamousDate, language)}</Text>
            <Text>{LocalizedStrings[language].USSquamous}: {formatDisplay(metadataObj.USSquamous, metadataObj.USSquamousText, metadataObj.USSquamousDate, language)}</Text>
            <Text>{LocalizedStrings[language].HSquamous}: {formatDisplay(metadataObj.HSquamous, metadataObj.HSquamousText, metadataObj.HSquamousDate, language)}</Text>
            <Text>{LocalizedStrings[language].lgsil}: {formatDisplay(metadataObj.lgsil, metadataObj.lgsilText, metadataObj.lgsilDate, language)}</Text>
            <Text>{LocalizedStrings[language].cellularLgsil}: {formatDisplay(metadataObj.cellularLgsil, metadataObj.cellularLgsilText, metadataObj.cellularLgsilDate, language)}</Text>
            <Text>{LocalizedStrings[language].dysplasiaLgsil}: {formatDisplay(metadataObj.dysplasiaLgsil, metadataObj.dysplasiaLgsilText, metadataObj.dysplasiaLgsilDate, language)}</Text>
            <Text>{LocalizedStrings[language].hgsil}: {formatDisplay(metadataObj.hgsil, metadataObj.hgsilText, metadataObj.hgsilDate, language)}</Text>
            <Text>{LocalizedStrings[language].cinHgsil}: {formatDisplay(metadataObj.cinHgsil, metadataObj.cinHgsilText, metadataObj.cinHgsilDate, language)}</Text>
            <Text>{LocalizedStrings[language].dysplasiaHgsil}: {formatDisplay(metadataObj.dysplasiaHgsil, metadataObj.dysplasiaHgsilText, metadataObj.dysplasiaHgsilDate, language)}</Text>
            <Text>{LocalizedStrings[language].carcinomaHgsil}: {formatDisplay(metadataObj.carcinomaHgsil, metadataObj.carcinomaHgsilText, metadataObj.carcinomaHgsilDate, language)}</Text>
            <Text>{LocalizedStrings[language].negIntraepithelial}: {formatDisplay(metadataObj.negIntraepithelial, metadataObj.negIntraepithelialText, metadataObj.negIntraepithelialDate, language)}</Text>
            <Text>{LocalizedStrings[language].aisCarcinoma}: {formatDisplay(metadataObj.aisCarcinoma, metadataObj.aisCarcinomaText, metadataObj.aisCarcinomaDate, language)}</Text>
            <Text>{LocalizedStrings[language].invasiveCarcinoma}: {formatDisplay(metadataObj.invasiveCarcinoma, metadataObj.invasiveCarcinomaText, metadataObj.invasiveCarcinomaDate, language)}</Text>
            <Text>{LocalizedStrings[language].agcCarcinoma}: {formatDisplay(metadataObj.agcCarcinoma, metadataObj.agcCarcinomaText, metadataObj.agcCarcinomaDate, language)}</Text>
            <Text>{LocalizedStrings[language].endocervicalCarcinoma}: {formatDisplay(metadataObj.endocervicalCarcinoma, metadataObj.endocervicalCarcinomaText, metadataObj.endocervicalCarcinomaDate, language)}</Text>
            <Text>{LocalizedStrings[language].endometrialCarcinoma}: {formatDisplay(metadataObj.endometrialCarcinoma, metadataObj.endometrialCarcinomaText, metadataObj.endometrialCarcinomaDate, language)}</Text>
            <Text>{LocalizedStrings[language].neoplasiaCarcinoma}: {formatDisplay(metadataObj.neoplasiaCarcinoma, metadataObj.neoplasiaCarcinomaText, metadataObj.neoplasiaCarcinomaDate, language)}</Text>
            <Text>{LocalizedStrings[language].nosCarcinoma}: {formatDisplay(metadataObj.nosCarcinoma, metadataObj.nosCarcinomaText, metadataObj.nosCarcinomaDate, language)}</Text>
            <Text>{LocalizedStrings[language].iscc}: {formatDisplay(metadataObj.iscc, metadataObj.isccText, metadataObj.isccDate, language)}</Text>
            <Text>{LocalizedStrings[language].atrophy}: {formatDisplay(metadataObj.atrophy, metadataObj.atrophyText, metadataObj.atrophyDate, language)}</Text>
            <Text>{LocalizedStrings[language].coccoid}: {formatDisplay(metadataObj.coccoid, metadataObj.coccoidText, metadataObj.coccoidDate, language)}</Text>
            <Text>{LocalizedStrings[language].regenerative}: {formatDisplay(metadataObj.regenerative, metadataObj.regenerativeText, metadataObj.regenerativeDate, language)}</Text>
            <Text>{LocalizedStrings[language].candida}: {formatDisplay(metadataObj.candida, metadataObj.candidaText, metadataObj.candidaDate, language)}</Text>
            <Text>{LocalizedStrings[language].bv}: {formatDisplay(metadataObj.bv, metadataObj.bvText, metadataObj.bvDate, language)}</Text>
            <Text>{LocalizedStrings[language].herpes}: {formatDisplay(metadataObj.herpes, metadataObj.herpesText, metadataObj.herpesDate, language)}</Text>
            <Text>{LocalizedStrings[language].inflammation}: {formatDisplay(metadataObj.inflammation, metadataObj.inflammationText, metadataObj.inflammationDate, language)}</Text>
            <Text>{LocalizedStrings[language].trichomonas}: {formatDisplay(metadataObj.trichomonas, metadataObj.trichomonasText, metadataObj.trichomonasDate, language)}</Text>
            <Text>{LocalizedStrings[language].other}: {formatDisplay(metadataObj.other, metadataObj.other, metadataObj.hgsilDate, language)}</Text>

        </View>)
}

const PAPResults = (props) => {
    let defaultTestDate = new Date().toISOString().split('T')[0]

    const [adequateCyto, setAdequateCyto] = useState(null);
    const [adequateCytoText, setAdequateCytoText] = useState(null);
    const [adequateCytoDate, setAdequateCytoDate] = useState(defaultTestDate);
    const [incompleteCyto, setIncompleteCyto] = useState(null);
    const [incompleteCytoText, setIncompleteCytoText] = useState(null);
    const [incompleteCytoDate, setIncompleteCytoDate] = useState(defaultTestDate);
    const [cellularityCyto, setCellularityCyto] = useState(null);
    const [cellularityCytoText, setCellularityCytoText] = useState(null);
    const [cellularityCytoDate, setCellularityCytoDate] = useState(defaultTestDate);
    const [fixationCyto, setFixationCyto] = useState(null);
    const [fixationCytoText, setFixationCytoText] = useState(null);
    const [fixationCytoDate, setFixationCytoDate] = useState(defaultTestDate);
    const [hemorrhageCyto, setHemorrhageCyto] = useState(null);
    const [hemorrhageCytoText, setHemorrhageCytoText] = useState(null);
    const [hemorrhageCytoDate, setHemorrhageCytoDate] = useState(defaultTestDate);
    const [exudateCyto, setExudateCyto] = useState(null);
    const [exudateCytoText, setExudateCytoText] = useState(null);
    const [exudateCytoDate, setExudateCytoDate] = useState(defaultTestDate);
    const [endocervicalCyto, setEndocervicalCyto] = useState(null);
    const [endocervicalCytoText, setEndocervicalCytoText] = useState(null);
    const [endocervicalCytoDate, setEndocervicalCytoDate] = useState(defaultTestDate);
    const [inadequateCyto, setInadequateCyto] = useState(null);
    const [inadequateCytoText, setInadequateCytoText] = useState(null);
    const [inadequateCytoDate, setInadequateCytoTextDate] = useState(defaultTestDate);
    const [bleedingCyto, setBleedingCyto] = useState(null);
    const [bleedingCytoText, setBleedingCytoText] = useState(null);
    const [bleedingCytoDate, setBleedingCytoDate] = useState(defaultTestDate);
    const [fixationInadequateCyto, setFixationInadequateCyto] = useState(null);
    const [fixationInadequateCytoText, setFixationInadequateCytoText] = useState(null);
    const [fixationInadequateCytoDate, setFixationInadequateCytoDate] = useState(defaultTestDate);
    const [squamous, setSquamous] = useState(null);
    const [squamousText, setSquamousText] = useState(null);
    const [squamousDate, setSquamousDate] = useState(defaultTestDate);
    const [USSquamous, setUSSquamous] = useState(null);
    const [USSquamousText, setUSSquamousText] = useState(null);
    const [USSquamousDate, setUSSquamousDate] = useState(defaultTestDate);
    const [HSquamous, setHSquamous] = useState(null);
    const [HSquamousText, setHSquamousText] = useState(null);
    const [HSquamousDate, setHSquamousDate] = useState(defaultTestDate);

    const [lgsil, setLgsil] = useState(null);
    const [lgsilText, setLgsilText] = useState(null);
    const [lgsilDate, setLgsilDate] = useState(defaultTestDate);
    const [cellularLgsil, setCellularLgsil] = useState(null);
    const [cellularLgsilText, setCellularLgsilText] = useState(null);
    const [cellularLgsilDate, setCellularLgsilDate] = useState(defaultTestDate);
    const [dysplasiaLgsil, setDysplasiaLgsil] = useState(null);
    const [dysplasiaLgsilText, setDysplasiaLgsilText] = useState(null);
    const [dysplasiaLgsilDate, setDysplasiaLgsilDate] = useState(defaultTestDate);
    const [hgsil, setHgsil] = useState(null);
    const [hgsilText, setHgsilText] = useState(null);
    const [hgsilDate, setHgsilDate] = useState(defaultTestDate);
    const [cinHgsil, setCinHgsil] = useState(null);
    const [cinHgsilText, setCinHgsilText] = useState(null);
    const [cinHgsilDate, setCinHgsilDate] = useState(defaultTestDate);
    const [dysplasiaHgsil, setDysplasiaHgsil] = useState(null);
    const [dysplasiaHgsilText, setDysplasiaHgsilText] = useState(null);
    const [dysplasiaHgsilDate, setDysplasiaHgsilDate] = useState(defaultTestDate);
    const [carcinomaHgsil, setCarcinomaHgsil] = useState(null);
    const [carcinomaHgsilText, setCarcinomaHgsilText] = useState(null);
    const [carcinomaHgsilDate, setCarcinomaHgsilDate] = useState(defaultTestDate);
    const [negIntraepithelial, setNegIntraepithelial] = useState(null);
    const [negIntraepithelialText, setNegIntraepithelialText] = useState(null);
    const [negIntraepithelialDate, setNegIntraepithelialDate] = useState(defaultTestDate);
    const [aisCarcinoma, setAisCarcinoma] = useState(null);
    const [aisCarcinomaText, setAisCarcinomaText] = useState(null);
    const [aisCarcinomaDate, setAisCarcinomaDate] = useState(defaultTestDate);
    const [invasiveCarcinoma, setInvasiveCarcinoma] = useState(null);
    const [invasiveCarcinomaText, setInvasiveCarcinomaText] = useState(null);
    const [invasiveCarcinomaDate, setInvasiveCarcinomaDate] = useState(defaultTestDate);

    const [agcCarcinoma, setAgcCarcinoma] = useState(null);
    const [agcCarcinomaText, setAgcCarcinomaText] = useState(null);
    const [agcCarcinomaDate, setAgcCarcinomaDate] = useState(defaultTestDate);
    const [endocervicalCarcinoma, setEndocervicalCarcinoma] = useState(null);
    const [endocervicalCarcinomaText, setEndocervicalCarcinomaText] = useState(null);
    const [endocervicalCarcinomaDate, setEndocervicalCarcinomaDate] = useState(defaultTestDate);
    const [endometrialCarcinoma, setEndometrialCarcinoma] = useState(null);
    const [endometrialCarcinomaText, setEndometrialCarcinomaText] = useState(null);
    const [endometrialCarcinomaDate, setEndometrialCarcinomaDate] = useState(defaultTestDate);
    const [neoplasiaCarcinoma, setNeoplasiaCarcinoma] = useState(null);
    const [neoplasiaCarcinomaText, setNeoplasiaCarcinomaText] = useState(null);
    const [neoplasiaCarcinomaDate, setNeoplasiaCarcinomaDate] = useState(defaultTestDate);
    const [nosCarcinoma, setNosCarcinoma] = useState(null);
    const [nosCarcinomaText, setNosCarcinomaText] = useState(null);
    const [nosCarcinomaDate, setNosCarcinomaDate] = useState(defaultTestDate);
    const [iscc, setIscc] = useState(null);
    const [isccText, setIsccText] = useState(null);
    const [isccDate, setIsccDate] = useState(defaultTestDate);
    const [atrophy, setAtrophy] = useState(null);
    const [atrophyText, setAtrophyText] = useState(null);
    const [atrophyDate, setAtrophyDate] = useState(defaultTestDate);
    const [coccoid, setCoccoid] = useState(null);
    const [coccoidText, setCoccoidText] = useState(null);
    const [coccoidDate, setCoccoidDate] = useState(defaultTestDate);

    const [regenerative, setRegenerative] = useState(null);
    const [regenerativeText, setRegenerativeText] = useState(null);
    const [regenerativeDate, setRegenerativeDate] = useState(defaultTestDate);
    const [candida, setCandida] = useState(null);
    const [candidaText, setCandidaText] = useState(null);
    const [candidaDate, setCandidaDate] = useState(defaultTestDate);
    const [bv, setBv] = useState(null);
    const [bvText, setBvText] = useState(null);
    const [bvDate, setBvDate] = useState(defaultTestDate);
    const [herpes, setHerpes] = useState(null);
    const [herpesText, setHerpesText] = useState(null);
    const [herpesDate, setHerpesDate] = useState(defaultTestDate);
    const [inflammation, setInflammation] = useState(null);
    const [inflammationText, setInflammationText] = useState(null);
    const [inflammationDate, setInflammationDate] = useState(defaultTestDate);
    const [trichomonas, setTrichomonas] = useState(null);
    const [trichomonasText, setTrichomonasText] = useState(null);
    const [trichomonasDate, setTrichomonasDate] = useState(defaultTestDate);

    const [other, setOther] = useState(null);
    const [otherDate, setOtherDate] = useState(defaultTestDate);


    const patientId = props.navigation.getParam('patientId');
    const visitId = props.navigation.getParam('visitId');
    const language = props.navigation.getParam('language', 'en');
    const userName = props.navigation.getParam('userName');

    const submit = async () => {
        database.addEvent({
            id: uuid(),
            patient_id: patientId,
            visit_id: visitId,
            event_type: EventTypes.PAPResults,
            event_metadata: JSON.stringify({
                doctor: userName,
                adequateCyto,
                adequateCytoText,
                adequateCytoDate,
                incompleteCyto,
                incompleteCytoText,
                incompleteCytoDate,
                cellularityCyto,
                cellularityCytoText,
                cellularityCytoDate,
                fixationCyto,
                fixationCytoText,
                fixationCytoDate,
                hemorrhageCyto,
                hemorrhageCytoText,
                hemorrhageCytoDate,
                exudateCyto,
                exudateCytoText,
                exudateCytoDate,
                endocervicalCyto,
                endocervicalCytoText,
                endocervicalCytoDate,
                inadequateCyto,
                inadequateCytoText,
                inadequateCytoDate,
                bleedingCyto,
                bleedingCytoText,
                bleedingCytoDate,
                fixationInadequateCyto,
                fixationInadequateCytoText,
                fixationInadequateCytoDate,
                squamous,
                squamousText,
                squamousDate,
                USSquamous,
                USSquamousText,
                USSquamousDate,
                HSquamous,
                HSquamousText,
                HSquamousDate,
                lgsil,
                lgsilText,
                lgsilDate,
                cellularLgsil,
                cellularLgsilText,
                cellularLgsilDate,
                dysplasiaLgsil,
                dysplasiaLgsilText,
                dysplasiaLgsilDate,
                hgsil,
                hgsilText,
                hgsilDate,
                cinHgsil,
                cinHgsilText,
                cinHgsilDate,
                dysplasiaHgsil,
                dysplasiaHgsilText,
                dysplasiaHgsilDate,
                carcinomaHgsil,
                carcinomaHgsilText,
                carcinomaHgsilDate,
                negIntraepithelial,
                negIntraepithelialText,
                negIntraepithelialDate,
                aisCarcinoma,
                aisCarcinomaText,
                aisCarcinomaDate,
                invasiveCarcinoma,
                invasiveCarcinomaText,
                invasiveCarcinomaDate,
                agcCarcinoma,
                agcCarcinomaText,
                agcCarcinomaDate,
                endocervicalCarcinoma,
                endocervicalCarcinomaText,
                endocervicalCarcinomaDate,
                endometrialCarcinoma,
                endometrialCarcinomaText,
                endometrialCarcinomaDate,
                neoplasiaCarcinoma,
                neoplasiaCarcinomaText,
                neoplasiaCarcinomaDate,
                nosCarcinoma,
                nosCarcinomaText,
                nosCarcinomaDate,
                iscc,
                isccText,
                isccDate,
                atrophy,
                atrophyText,
                atrophyDate,
                coccoid,
                coccoidText,
                coccoidDate,
                regenerative,
                regenerativeText,
                regenerativeDate,
                candida,
                candidaText,
                candidaDate,
                bv,
                bvText,
                bvDate,
                herpes,
                herpesText,
                herpesDate,
                inflammation,
                inflammationText,
                inflammationDate,
                trichomonas,
                trichomonasText,
                trichomonasDate,
                other,
                otherDate
            })
        }).then(() => {
            props.navigation.navigate('NewVisit')
        })
    };

    const formRow = (field, action, textField, textAction, dateField, dateAction, prompt) => {

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
                {field ? datePicker({ future: true, placeholder: LocalizedStrings[language].date, date: dateField, action: dateAction, language }) : null}

            </View>)

    }

    return (
        <ScrollView>
            <LinearGradient colors={['#31BBF3', '#4D7FFF']} style={styles.containerLeft}>
                <View style={[styles.inputsContainer, { alignItems: 'flex-start' }]}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignSelf: 'stretch', }}>
                        <Text style={[styles.text, { fontSize: 16, fontWeight: 'bold' }]}>{LocalizedStrings[language].PAPResults}</Text>
                    </View>
                    {formRow(adequateCyto, setAdequateCyto, adequateCytoText, setAdequateCytoText, adequateCytoDate, setAdequateCytoDate, 'adequateCyto')}
                    {formRow(incompleteCyto, setIncompleteCyto, incompleteCytoText, setIncompleteCytoText, incompleteCytoDate, setIncompleteCytoDate, 'incompleteCyto')}
                    {formRow(cellularityCyto, setCellularityCyto, cellularityCytoText, setCellularityCytoText, cellularityCytoDate, setCellularityCytoDate, 'cellularityCyto')}
                    {formRow(fixationCyto, setFixationCyto, fixationCytoText, setFixationCytoText, fixationCytoDate, setFixationCytoDate, 'fixationCyto')}
                    {formRow(hemorrhageCyto, setHemorrhageCyto, hemorrhageCytoText, setHemorrhageCytoText, hemorrhageCytoDate, setHemorrhageCytoDate, 'hemorrhageCyto')}
                    {formRow(exudateCyto, setExudateCyto, exudateCytoText, setExudateCytoText, exudateCytoDate, setExudateCytoDate, 'exudateCyto')}
                    {formRow(endocervicalCyto, setEndocervicalCyto, endocervicalCytoText, setEndocervicalCytoText, endocervicalCytoDate, setEndocervicalCytoDate, 'endocervicalCyto')}
                    {formRow(inadequateCyto, setInadequateCyto, inadequateCytoText, setInadequateCytoText, inadequateCytoDate, setInadequateCytoTextDate, 'inadequateCyto')}
                    {formRow(bleedingCyto, setBleedingCyto, bleedingCytoText, setBleedingCytoText, bleedingCytoDate, setBleedingCytoDate, 'bleedingCyto')}
                    {formRow(fixationInadequateCyto, setFixationInadequateCyto, fixationInadequateCytoText, setFixationInadequateCytoText, fixationInadequateCytoDate, setFixationInadequateCytoDate, 'fixationInadequateCyto')}
                    {formRow(squamous, setSquamous, squamousText, setSquamousText, squamousDate, setSquamousDate, 'squamous')}
                    {formRow(USSquamous, setUSSquamous, USSquamousText, setUSSquamousText, USSquamousDate, setUSSquamousDate, 'USSquamous')}
                    {formRow(HSquamous, setHSquamous, HSquamousText, setHSquamousText, HSquamousDate, setHSquamousDate, 'HSquamous')}
                    {formRow(lgsil, setLgsil, lgsilText, setLgsilText, lgsilDate, setLgsilDate, 'lgsil')}
                    {formRow(cellularLgsil, setCellularLgsil, cellularLgsilText, setCellularLgsilText, cellularLgsilDate, setCellularLgsilDate, 'cellularLgsil')}
                    {formRow(dysplasiaLgsil, setDysplasiaLgsil, dysplasiaLgsilText, setDysplasiaLgsilText, dysplasiaLgsilDate, setDysplasiaLgsilDate, 'dysplasiaLgsil')}
                    {formRow(hgsil, setHgsil, hgsilText, setHgsilText, hgsilDate, setHgsilDate, 'hgsil')}
                    {formRow(cinHgsil, setCinHgsil, cinHgsilText, setCinHgsilText, cinHgsilDate, setCinHgsilDate, 'cinHgsil')}
                    {formRow(dysplasiaHgsil, setDysplasiaHgsil, dysplasiaHgsilText, setDysplasiaHgsilText, dysplasiaHgsilDate, setDysplasiaHgsilDate, 'dysplasiaHgsil')}
                    {formRow(carcinomaHgsil, setCarcinomaHgsil, carcinomaHgsilText, setCarcinomaHgsilText, carcinomaHgsilDate, setCarcinomaHgsilDate, 'carcinomaHgsil')}
                    {formRow(negIntraepithelial, setNegIntraepithelial, negIntraepithelialText, setNegIntraepithelialText, negIntraepithelialDate, setNegIntraepithelialDate, 'negIntraepithelial')}
                    {formRow(aisCarcinoma, setAisCarcinoma, aisCarcinomaText, setAisCarcinomaText, aisCarcinomaDate, setAisCarcinomaDate, 'aisCarcinoma')}
                    {formRow(invasiveCarcinoma, setInvasiveCarcinoma, invasiveCarcinomaText, setInvasiveCarcinomaText, invasiveCarcinomaDate, setInvasiveCarcinomaDate, 'invasiveCarcinoma')}

                    {formRow(agcCarcinoma, setAgcCarcinoma, agcCarcinomaText, setAgcCarcinomaText, agcCarcinomaDate, setAgcCarcinomaDate, 'agcCarcinoma')}
                    {formRow(endocervicalCarcinoma, setEndocervicalCarcinoma, endocervicalCarcinomaText, setEndocervicalCarcinomaText, endocervicalCarcinomaDate, setEndocervicalCarcinomaDate, 'endocervicalCarcinoma')}
                    {formRow(endometrialCarcinoma, setEndometrialCarcinoma, endometrialCarcinomaText, setEndometrialCarcinomaText, endometrialCarcinomaDate, setEndometrialCarcinomaDate, 'endometrialCarcinoma')}
                    {formRow(neoplasiaCarcinoma, setNeoplasiaCarcinoma, neoplasiaCarcinomaText, setNeoplasiaCarcinomaText, neoplasiaCarcinomaDate, setNeoplasiaCarcinomaDate, 'neoplasiaCarcinoma')}
                    {formRow(nosCarcinoma, setNosCarcinoma, nosCarcinomaText, setNosCarcinomaText, nosCarcinomaDate, setNosCarcinomaDate, 'nosCarcinoma')}
                    {formRow(iscc, setIscc, isccText, setIsccText, isccDate, setIsccDate, 'iscc')}
                    {formRow(atrophy, setAtrophy, atrophyText, setAtrophyText, atrophyDate, setAtrophyDate, 'atrophy')}
                    {formRow(coccoid, setCoccoid, coccoidText, setCoccoidText, coccoidDate, setCoccoidDate, 'coccoid')}
                    {formRow(regenerative, setRegenerative, regenerativeText, setRegenerativeText, regenerativeDate, setRegenerativeDate, 'regenerative')}
                    {formRow(candida, setCandida, candidaText, setCandidaText, candidaDate, setCandidaDate, 'candida')}
                    {formRow(bv, setBv, bvText, setBvText, bvDate, setBvDate, 'bv')}
                    {formRow(herpes, setHerpes, herpesText, setHerpesText, herpesDate, setHerpesDate, 'herpes')}
                    {formRow(inflammation, setInflammation, inflammationText, setInflammationText, inflammationDate, setInflammationDate, 'inflammation')}
                    {formRow(trichomonas, setTrichomonas, trichomonasText, setTrichomonasText, trichomonasDate, setTrichomonasDate, 'trichomonas')}

                    <View style={[styles.responseRow, { paddingBottom: 0 }]}>
                        <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].other}</Text>
                    </View>
                    <View style={[styles.responseRow, { padding: 0 }]}>
                        <TextInput
                            style={styles.inputs}
                            onChangeText={(text) => setOther(text)}
                            value={other}
                        />
                    </View>
                    {other ? datePicker({ future: true, placeholder: LocalizedStrings[language].date, date: otherDate, action: setOtherDate, language }) : null}

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

export default PAPResults;
