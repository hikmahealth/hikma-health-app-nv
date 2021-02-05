import React, { useState } from 'react';
import {
    View, Text, TextInput, ScrollView, Button, TouchableOpacity
} from 'react-native';

import { database } from "../../storage/Database";
import { v4 as uuid } from 'uuid';
import styles from '../Style';
import { EventTypes } from '../../enums/EventTypes';
import LinearGradient from 'react-native-linear-gradient';
import { datePicker } from '../Covid19Form'
import { LocalizedStrings } from '../../enums/LocalizedStrings';

const formatTextDisplay = (field, dateField) => {
    if (!!field && !!dateField) {
        return (field + '   ' + dateField)
    }
    return null

}

const formatDisplay = (field, dateField, language) => {
    if (!!field && !!dateField) {
        return field ? (LocalizedStrings[language].positive + '   ' + dateField) : LocalizedStrings[language].negative
    }
    return null
}

const radioButtons = (props) => {
    return (
        <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between' }}>
            <Text style={{ color: '#FFFFFF', flex: 1, flexDirection: 'column', flexWrap: 'wrap' }}>{props.prompt}</Text>
            <View>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => props.action(!props.field)}>
                        <View style={styles.outerRadioButton}>
                            {props.field ? <View style={styles.selectedRadioButton} /> : null}
                        </View>
                    </TouchableOpacity>
                    <Text style={{ color: '#FFFFFF' }}>+</Text>

                    <TouchableOpacity onPress={() => {
                        props.field === null ? props.action(false) : props.action(!props.field)
                    }
                    }>
                        <View style={styles.outerRadioButton}>
                            {(!props.field && props.field !== null) ? <View style={styles.selectedRadioButton} /> : null}
                        </View>
                    </TouchableOpacity>
                    <Text style={{ color: '#FFFFFF' }}>-</Text>
                </View>
            </View>
        </View>
    )
}

export const UrineTestsDisplay = (metadataObj, language) => {
    return (
        <View>
            <Text>{LocalizedStrings[language].colorPhysical}: {formatTextDisplay(metadataObj.colorPhysical, metadataObj.colorPhysicalDate)} </Text>
            <Text>{LocalizedStrings[language].aspectsPhysical}: {formatTextDisplay(metadataObj.aspectsPhysical, metadataObj.aspectsPhysicalDate)} </Text>
            <Text>{LocalizedStrings[language].sedimentPhysical}: {formatTextDisplay(metadataObj.sedimentPhysical, metadataObj.sedimentPhysicalDate)} </Text>
            <Text>{LocalizedStrings[language].densityPhysical}: {formatTextDisplay(metadataObj.densityPhysical, metadataObj.densityPhysicalDate)} </Text>

            <Text>{LocalizedStrings[language].proteinsChem}: {formatDisplay(metadataObj.proteinsChem, metadataObj.proteinsChemDate, language)} </Text>
            <Text>{LocalizedStrings[language].hemoglobinChem}: {formatDisplay(metadataObj.hemoglobinChem, metadataObj.hemoglobinChemDate, language)} </Text>
            <Text>{LocalizedStrings[language].ketonicChem}: {formatDisplay(metadataObj.ketonicChem, metadataObj.ketonicChemDate, language)} </Text>

            <Text>{LocalizedStrings[language].pHChem}: {formatTextDisplay(metadataObj.pHChem, metadataObj.pHChemDate)} </Text>
            
            <Text>{LocalizedStrings[language].urobilinogenChem}: {formatDisplay(metadataObj.urobilinogenChem, metadataObj.urobilinogenChemDate, language)} </Text>
            <Text>{LocalizedStrings[language].glucoseChem}: {formatDisplay(metadataObj.glucoseChem, metadataObj.glucoseChemDate, language)} </Text>
            <Text>{LocalizedStrings[language].bilirubinsChem}: {formatDisplay(metadataObj.bilirubinsChem, metadataObj.bilirubinsChemDate, language)} </Text>
            <Text>{LocalizedStrings[language].leukocytesChem}: {formatDisplay(metadataObj.leukocytesChem, metadataObj.leukocytesChemDate, language)} </Text>
            <Text>{LocalizedStrings[language].nitriteChem}: {formatDisplay(metadataObj.nitriteChem, metadataObj.nitriteChemDate, language)} </Text>
            
            <Text>{LocalizedStrings[language].epithelialMicro}: {formatTextDisplay(metadataObj.epithelialMicro, metadataObj.epithelialMicroDate)} </Text>
            <Text>{LocalizedStrings[language].leukocytesMicro}: {formatTextDisplay(metadataObj.leukocytesMicro, metadataObj.leukocytesMicroDate)} </Text>
            <Text>{LocalizedStrings[language].erythrocytesMicro}: {formatTextDisplay(metadataObj.erythrocytesMicro, metadataObj.erythrocytesMicroDate)} </Text>
            <Text>{LocalizedStrings[language].cylindersMicro}: {formatTextDisplay(metadataObj.cylindersMicro, metadataObj.cylindersMicroDate)} </Text>
            <Text>{LocalizedStrings[language].crystalsMicro}: {formatTextDisplay(metadataObj.crystalsMicro, metadataObj.crystalsMicroDate)} </Text>
            <Text>{LocalizedStrings[language].bacteriaMicro}: {formatTextDisplay(metadataObj.bacteriaMicro, metadataObj.bacteriaMicroDate)} </Text>
            <Text>{LocalizedStrings[language].yeastsMicro}: {formatTextDisplay(metadataObj.yeastsMicro, metadataObj.yeastsMicroDate)} </Text>
            <Text>{LocalizedStrings[language].cRenalMicro}: {formatTextDisplay(metadataObj.cRenalMicro, metadataObj.cRenalMicroDate)} </Text>
            <Text>{LocalizedStrings[language].hMucousMicro}: {formatTextDisplay(metadataObj.hMucousMicro, metadataObj.hMucousMicroDate)} </Text>
            <Text>{LocalizedStrings[language].observationsMicro}: {formatTextDisplay(metadataObj.observationsMicro, metadataObj.observationsMicroDate)} </Text>

        </View>)
}

const UrineTests = (props) => {
    let defaultTestDate = new Date().toISOString().split('T')[0]

    const [colorPhysical, setColorPhysical] = useState(null);
    const [colorPhysicalDate, setColorPhysicalDate] = useState(defaultTestDate);

    const [aspectsPhysical, setAspectsPhysical] = useState(null);
    const [aspectsPhysicalDate, setAspectsPhysicalDate] = useState(defaultTestDate);
    const [sedimentPhysical, setSedimentPhysical] = useState(null);
    const [sedimentPhysicalDate, setSedimentPhysicalDate] = useState(defaultTestDate);
    const [densityPhysical, setDensityPhysical] = useState(null);
    const [densityPhysicalDate, setDensityPhysicalDate] = useState(defaultTestDate);

    const [proteinsChem, setProteinsChem] = useState(null);
    const [proteinsChemDate, setProteinsChemDate] = useState(defaultTestDate);
    const [hemoglobinChem, setHemoglobinChem] = useState(null);
    const [hemoglobinChemDate, setHemoglobinChemDate] = useState(defaultTestDate);
    const [ketonicChem, setKetonicChem] = useState(null);
    const [ketonicChemDate, setKetonicChemDate] = useState(defaultTestDate);
    const [pHChem, setPHChem] = useState(null);
    const [pHChemDate, setPHChemDate] = useState(defaultTestDate);
    const [urobilinogenChem, setUrobilinogenChem] = useState(null);
    const [urobilinogenChemDate, setUrobilinogenChemDate] = useState(defaultTestDate);
    const [glucoseChem, setGlucoseChem] = useState(null);
    const [glucoseChemDate, setGlucoseChemDate] = useState(defaultTestDate);
    const [bilirubinsChem, setBilirubinsChem] = useState(null);
    const [bilirubinsChemDate, setBilirubinsChemDate] = useState(defaultTestDate);
    const [leukocytesChem, setLeukocytesChem] = useState(null);
    const [leukocytesChemDate, setLeukocytesChemDate] = useState(defaultTestDate);
    const [nitriteChem, setNitriteChem] = useState(null);
    const [nitriteChemDate, setNitriteChemDate] = useState(defaultTestDate);

    const [epithelialMicro, setEpithelialMicro] = useState(null);
    const [epithelialMicroDate, setEpithelialMicroDate] = useState(defaultTestDate);
    const [leukocytesMicro, setLeukocytesMicro] = useState(null);
    const [leukocytesMicroDate, setLeukocytesMicroDate] = useState(defaultTestDate);
    const [erythrocytesMicro, setErythrocytesMicro] = useState(null);
    const [erythrocytesMicroDate, setErythrocytesMicroDate] = useState(defaultTestDate);
    const [cylindersMicro, setCylindersMicro] = useState(null);
    const [cylindersMicroDate, setCylindersMicroDate] = useState(defaultTestDate);
    const [crystalsMicro, setCrystalsMicro] = useState(null);
    const [crystalsMicroDate, setCrystalsMicroDate] = useState(defaultTestDate);
    const [bacteriaMicro, setBacteriaMicro] = useState(null);
    const [bacteriaMicroDate, setBacteriaMicroDate] = useState(defaultTestDate);
    const [yeastsMicro, setYeastsMicro] = useState(null);
    const [yeastsMicroDate, setYeastsMicroDate] = useState(defaultTestDate);
    const [cRenalMicro, setCRenalMicro] = useState(null);
    const [cRenalMicroDate, setCRenalMicroDate] = useState(defaultTestDate);
    const [hMucousMicro, setHMucousMicro] = useState(null);
    const [hMucousMicroDate, setHMucousMicroDate] = useState(defaultTestDate);
    const [observationsMicro, setObservationsMicro] = useState(null);
    const [observationsMicroDate, setObservationsMicroDate] = useState(defaultTestDate);

    const patientId = props.navigation.getParam('patientId');
    const visitId = props.navigation.getParam('visitId');
    const language = props.navigation.getParam('language', 'en');
    const userName = props.navigation.getParam('userName');

    const submit = async () => {
        database.addEvent({
            id: uuid(),
            patient_id: patientId,
            visit_id: visitId,
            event_type: EventTypes.UrineTests,
            event_metadata: JSON.stringify({
                doctor: userName,
                colorPhysical,
                colorPhysicalDate,
                aspectsPhysical,
                aspectsPhysicalDate,
                sedimentPhysical,
                sedimentPhysicalDate,
                densityPhysical,
                densityPhysicalDate,
                proteinsChem,
                proteinsChemDate,
                hemoglobinChem,
                hemoglobinChemDate,
                ketonicChem,
                ketonicChemDate,
                pHChem,
                pHChemDate,
                urobilinogenChem,
                urobilinogenChemDate,
                glucoseChem,
                glucoseChemDate,
                bilirubinsChem,
                bilirubinsChemDate,
                leukocytesChem,
                leukocytesChemDate,
                nitriteChem,
                nitriteChemDate,
                epithelialMicro,
                epithelialMicroDate,
                leukocytesMicro,
                leukocytesMicroDate,
                erythrocytesMicro,
                erythrocytesMicroDate,
                cylindersMicro,
                cylindersMicroDate,
                crystalsMicro,
                crystalsMicroDate,
                bacteriaMicro,
                bacteriaMicroDate,
                yeastsMicro,
                yeastsMicroDate,
                cRenalMicro,
                cRenalMicroDate,
                hMucousMicro,
                hMucousMicroDate,
                observationsMicro,
                observationsMicroDate,
            })
        }).then(() => {
            props.navigation.navigate('NewVisit')
        })
    };

    return (
        <ScrollView>
            <LinearGradient colors={['#31BBF3', '#4D7FFF']} style={styles.containerLeft}>
                <View style={[styles.inputsContainer, { alignItems: 'flex-start' }]}>

                    <View style={[styles.responseRow, { paddingVertical: 0 }]}>
                        <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].colorPhysical}</Text>
                    </View>
                    <View style={[styles.responseRow, { padding: 0 }]}>
                        <TextInput
                            style={styles.inputs}
                            onChangeText={(text) => setColorPhysical(text)}
                            value={colorPhysical}
                        />
                    </View>

                    <View>{colorPhysical ? datePicker({ future: true, placeholder: LocalizedStrings[language].date, date: colorPhysicalDate, action: setColorPhysicalDate, language }) : null}</View>

                    <View style={[styles.responseRow, { paddingVertical: 0 }]}>
                        <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].aspectsPhysical}</Text>
                    </View>
                    <View style={[styles.responseRow, { padding: 0 }]}>
                        <TextInput
                            style={styles.inputs}
                            onChangeText={(text) => setAspectsPhysical(text)}
                            value={aspectsPhysical}
                        />
                    </View>
                    <View>{aspectsPhysical ? datePicker({ future: true, placeholder: LocalizedStrings[language].date, date: aspectsPhysicalDate, action: setAspectsPhysicalDate, language }) : null}</View>

                    <View style={[styles.responseRow, { paddingVertical: 0 }]}>
                        <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].sedimentPhysical}</Text>
                    </View>
                    <View style={[styles.responseRow, { padding: 0 }]}>
                        <TextInput
                            style={styles.inputs}
                            onChangeText={(text) => setSedimentPhysical(text)}
                            value={sedimentPhysical}
                        />
                    </View>
                    <View>{sedimentPhysical ? datePicker({ future: true, placeholder: LocalizedStrings[language].date, date: sedimentPhysicalDate, action: setSedimentPhysicalDate, language }) : null}</View>

                    <View style={[styles.responseRow, { paddingVertical: 0 }]}>
                        <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].densityPhysical}</Text>
                    </View>
                    <View style={[styles.responseRow, { padding: 0 }]}>
                        <TextInput
                            style={styles.inputs}
                            onChangeText={(text) => setDensityPhysical(text)}
                            value={densityPhysical}
                        />
                    </View>
                    <View>{densityPhysical ? datePicker({ future: true, placeholder: LocalizedStrings[language].date, date: densityPhysicalDate, action: setDensityPhysicalDate, language }) : null}</View>

                    <View style={[styles.responseRow]}>
                        {radioButtons({ field: proteinsChem, action: setProteinsChem, prompt: LocalizedStrings[language].proteinsChem, language })}
                    </View>
                    <View>{proteinsChem ? datePicker({ future: true, placeholder: LocalizedStrings[language].date, date: proteinsChemDate, action: setProteinsChemDate, language }) : null}</View>

                    <View style={[styles.responseRow]}>
                        {radioButtons({ field: hemoglobinChem, action: setHemoglobinChem, prompt: LocalizedStrings[language].hemoglobinChem, language })}
                    </View>
                    <View>{hemoglobinChem ? datePicker({ future: true, placeholder: LocalizedStrings[language].date, date: hemoglobinChemDate, action: setHemoglobinChemDate, language }) : null}</View>

                    <View style={[styles.responseRow]}>
                        {radioButtons({ field: ketonicChem, action: setKetonicChem, prompt: LocalizedStrings[language].ketonicChem, language })}
                    </View>
                    <View>{ketonicChem ? datePicker({ future: true, placeholder: LocalizedStrings[language].date, date: ketonicChemDate, action: setKetonicChemDate, language }) : null}</View>

                    <View style={[styles.responseRow, { paddingVertical: 0 }]}>
                        <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].pHChem}</Text>
                    </View>
                    <View style={[styles.responseRow, { padding: 0 }]}>
                        <TextInput
                            style={styles.inputs}
                            onChangeText={(text) => setPHChem(text)}
                            value={pHChem}
                            keyboardType={'numeric'}
                        />
                    </View>
                    <View>{pHChem ? datePicker({ future: true, placeholder: LocalizedStrings[language].date, date: pHChemDate, action: setPHChemDate, language }) : null}</View>

                    <View style={[styles.responseRow]}>
                        {radioButtons({ field: urobilinogenChem, action: setUrobilinogenChem, prompt: LocalizedStrings[language].urobilinogenChem, language })}
                    </View>
                    <View>{urobilinogenChem ? datePicker({ future: true, placeholder: LocalizedStrings[language].date, date: urobilinogenChemDate, action: setUrobilinogenChemDate, language }) : null}</View>

                    <View style={[styles.responseRow]}>
                        {radioButtons({ field: glucoseChem, action: setGlucoseChem, prompt: LocalizedStrings[language].glucoseChem, language })}
                    </View>
                    <View>{glucoseChem ? datePicker({ future: true, placeholder: LocalizedStrings[language].date, date: glucoseChemDate, action: setGlucoseChemDate, language }) : null}</View>

                    <View style={[styles.responseRow]}>
                        {radioButtons({ field: bilirubinsChem, action: setBilirubinsChem, prompt: LocalizedStrings[language].bilirubinsChem, language })}
                    </View>
                    <View>{bilirubinsChem ? datePicker({ future: true, placeholder: LocalizedStrings[language].date, date: bilirubinsChemDate, action: setBilirubinsChemDate, language }) : null}</View>

                    <View style={[styles.responseRow]}>
                        {radioButtons({ field: leukocytesChem, action: setLeukocytesChem, prompt: LocalizedStrings[language].leukocytesChem, language })}
                    </View>
                    <View>{leukocytesChem ? datePicker({ future: true, placeholder: LocalizedStrings[language].date, date: leukocytesChemDate, action: setLeukocytesChemDate, language }) : null}</View>

                    <View style={[styles.responseRow]}>
                        {radioButtons({ field: nitriteChem, action: setNitriteChem, prompt: LocalizedStrings[language].nitriteChem, language })}
                    </View>
                    <View>{nitriteChem ? datePicker({ future: true, placeholder: LocalizedStrings[language].date, date: nitriteChemDate, action: setNitriteChemDate, language }) : null}</View>

                    <View style={[styles.responseRow, { paddingVertical: 0 }]}>
                        <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].epithelialMicro}</Text>
                    </View>
                    <View style={[styles.responseRow, { padding: 0 }]}>
                        <TextInput
                            style={styles.inputs}
                            onChangeText={(text) => setEpithelialMicro(text)}
                            value={epithelialMicro}
                        />
                    </View>
                    <View>{epithelialMicro ? datePicker({ future: true, placeholder: LocalizedStrings[language].date, date: epithelialMicroDate, action: setEpithelialMicroDate, language }) : null}</View>

                    <View style={[styles.responseRow, { paddingVertical: 0 }]}>
                        <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].leukocytesMicro}</Text>
                    </View>
                    <View style={[styles.responseRow, { padding: 0 }]}>
                        <TextInput
                            style={styles.inputs}
                            onChangeText={(text) => setLeukocytesMicro(text)}
                            value={leukocytesMicro}
                        />
                    </View>
                    <View>{leukocytesMicro ? datePicker({ future: true, placeholder: LocalizedStrings[language].date, date: leukocytesMicroDate, action: setLeukocytesMicroDate, language }) : null}</View>

                    <View style={[styles.responseRow, { paddingVertical: 0 }]}>
                        <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].erythrocytesMicro}</Text>
                    </View>
                    <View style={[styles.responseRow, { padding: 0 }]}>
                        <TextInput
                            style={styles.inputs}
                            onChangeText={(text) => setErythrocytesMicro(text)}
                            value={erythrocytesMicro}
                        />
                    </View>
                    <View>{erythrocytesMicro ? datePicker({ future: true, placeholder: LocalizedStrings[language].date, date: erythrocytesMicroDate, action: setErythrocytesMicroDate, language }) : null}</View>

                    <View style={[styles.responseRow, { paddingVertical: 0 }]}>
                        <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].cylindersMicro}</Text>
                    </View>
                    <View style={[styles.responseRow, { padding: 0 }]}>
                        <TextInput
                            style={styles.inputs}
                            onChangeText={(text) => setCylindersMicro(text)}
                            value={cylindersMicro}
                        />
                    </View>
                    <View>{cylindersMicro ? datePicker({ future: true, placeholder: LocalizedStrings[language].date, date: cylindersMicroDate, action: setCylindersMicroDate, language }) : null}</View>

                    <View style={[styles.responseRow, { paddingVertical: 0 }]}>
                        <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].crystalsMicro}</Text>
                    </View>
                    <View style={[styles.responseRow, { padding: 0 }]}>
                        <TextInput
                            style={styles.inputs}
                            onChangeText={(text) => setCrystalsMicro(text)}
                            value={crystalsMicro}
                        />
                    </View>
                    <View>{crystalsMicro ? datePicker({ future: true, placeholder: LocalizedStrings[language].date, date: crystalsMicroDate, action: setCrystalsMicroDate, language }) : null}</View>

                    <View style={[styles.responseRow, { paddingBottom: 0 }]}>
                        <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].bacteriaMicro}</Text>
                    </View>
                    <View style={[styles.responseRow, { padding: 0 }]}>
                        <TextInput
                            style={styles.inputs}
                            onChangeText={(text) => setBacteriaMicro(text)}
                            value={bacteriaMicro}
                        />
                    </View>
                    <View>{bacteriaMicro ? datePicker({ future: true, placeholder: LocalizedStrings[language].date, date: bacteriaMicroDate, action: setBacteriaMicroDate, language }) : null}</View>

                    <View style={[styles.responseRow, { paddingVertical: 0 }]}>
                        <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].yeastsMicro}</Text>
                    </View>
                    <View style={[styles.responseRow, { padding: 0 }]}>
                        <TextInput
                            style={styles.inputs}
                            onChangeText={(text) => setYeastsMicro(text)}
                            value={yeastsMicro}
                        />
                    </View>
                    <View>{yeastsMicro ? datePicker({ future: true, placeholder: LocalizedStrings[language].date, date: yeastsMicroDate, action: setYeastsMicroDate, language }) : null}</View>

                    <View style={[styles.responseRow, { paddingVertical: 0 }]}>
                        <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].cRenalMicro}</Text>
                    </View>
                    <View style={[styles.responseRow, { padding: 0 }]}>
                        <TextInput
                            style={styles.inputs}
                            onChangeText={(text) => setCRenalMicro(text)}
                            value={cRenalMicro}
                        />
                    </View>
                    <View>{cRenalMicro ? datePicker({ future: true, placeholder: LocalizedStrings[language].date, date: cRenalMicroDate, action: setCRenalMicroDate, language }) : null}</View>

                    <View style={[styles.responseRow, { paddingVertical: 0 }]}>
                        <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].hMucousMicro}</Text>
                    </View>
                    <View style={[styles.responseRow, { padding: 0 }]}>
                        <TextInput
                            style={styles.inputs}
                            onChangeText={(text) => setHMucousMicro(text)}
                            value={hMucousMicro}
                        />
                    </View>
                    <View>{hMucousMicro ? datePicker({ future: true, placeholder: LocalizedStrings[language].date, date: hMucousMicroDate, action: setHMucousMicroDate, language }) : null}</View>

                    <View style={[styles.responseRow, { paddingVertical: 0 }]}>
                        <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].observationsMicro}</Text>
                    </View>
                    <View style={[styles.responseRow, { padding: 0 }]}>
                        <TextInput
                            style={styles.inputs}
                            onChangeText={(text) => setObservationsMicro(text)}
                            value={observationsMicro}
                        />
                    </View>
                    <View>{observationsMicro ? datePicker({ future: true, placeholder: LocalizedStrings[language].date, date: observationsMicroDate, action: setObservationsMicroDate, language }) : null}</View>

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

export default UrineTests;
