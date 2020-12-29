import React, { useState, useEffect } from 'react';
import {
    View, Text, Image, TextInput, TouchableOpacity, ScrollView
} from 'react-native';

import { database } from "../../storage/Database";
import { v4 as uuid } from 'uuid';
import styles from '../Style';
import { EventTypes } from '../../enums/EventTypes';
import LinearGradient from 'react-native-linear-gradient';
import { datePicker, radioButtons } from '../Covid19Form'
import { LocalizedStrings } from '../../enums/LocalizedStrings';

export const MedicalPathologiesDisplay = (metadataObj, language) => {

    return (
        <View>
            <Text>{LocalizedStrings[language].doctor}: {metadataObj.doctor} </Text>
            <Text>{LocalizedStrings[language].miscarriages}: {metadataObj.miscarriages ? metadataObj.miscarriagesNumber : LocalizedStrings[language].false} </Text>
            <Text>{LocalizedStrings[language].foodAllergies}: {metadataObj.foodAllergies ? metadataObj.foodAllergiesText : LocalizedStrings[language].false} </Text>
            <Text>{LocalizedStrings[language].animalAllergies}: {metadataObj.animalAllergies ? metadataObj.animalAllergiesText : LocalizedStrings[language].false}</Text>
            <Text>{LocalizedStrings[language].atmosphereAllergies}: {metadataObj.atmosphereAllergies ? metadataObj.atmosphereAllergiesText : LocalizedStrings[language].false}</Text>
            <Text>{LocalizedStrings[language].insectAllergies}: {metadataObj.insectAllergies ? metadataObj.insectAllergiesText : LocalizedStrings[language].false}</Text>
            <Text>{LocalizedStrings[language].latexAllergies}: {metadataObj.latexAllergies ? metadataObj.latexAllergiesText : LocalizedStrings[language].false}</Text>
            <Text>{LocalizedStrings[language].medicineAllergies}: {metadataObj.medicineAllergies ? metadataObj.medicineAllergiesText : LocalizedStrings[language].false}</Text>
            <Text>{LocalizedStrings[language].otherAllergies}: {metadataObj.otherAllergies ? metadataObj.otherAllergiesText : LocalizedStrings[language].false}</Text>
            <Text>{LocalizedStrings[language].tonsillitis}: {metadataObj.tonsillitis ? metadataObj.tonsillitisText : LocalizedStrings[language].false}</Text>
            <Text>{LocalizedStrings[language].anemic}: {metadataObj.anemic ? metadataObj.anemicText : LocalizedStrings[language].false}</Text>
            <Text>{LocalizedStrings[language].arthritis}: {metadataObj.arthritis ? metadataObj.arthritisText : LocalizedStrings[language].false}</Text>
            <Text>{LocalizedStrings[language].asthma}: {metadataObj.asthma ? metadataObj.asthmaText : LocalizedStrings[language].false}</Text>
            <Text>{LocalizedStrings[language].neckPain}: {metadataObj.neckPain ? metadataObj.neckPainText : LocalizedStrings[language].false}</Text>
            <Text>{LocalizedStrings[language].cervicovaginitis}: {metadataObj.cervicovaginitis ? metadataObj.cervicovaginitisText : LocalizedStrings[language].false}</Text>

            <Text>{LocalizedStrings[language].cSection}: {metadataObj.cSection}</Text>

            <Text>{LocalizedStrings[language].sciaticPain}: {metadataObj.sciaticPain ? metadataObj.sciaticPainText : LocalizedStrings[language].false}</Text>
            <Text>{LocalizedStrings[language].cholesterol}: {metadataObj.cholesterol ? metadataObj.cholesterolText : LocalizedStrings[language].false}</Text>
            <Text>{LocalizedStrings[language].infantColic}: {metadataObj.infantColic ? metadataObj.infantColicText : LocalizedStrings[language].false}</Text>
            <Text>{LocalizedStrings[language].conjunctivitis}: {metadataObj.conjunctivitis ? metadataObj.conjunctivitisText : LocalizedStrings[language].false}</Text>
            <Text>{LocalizedStrings[language].covid}: {metadataObj.covid ? metadataObj.covidText : LocalizedStrings[language].false}</Text>
            <Text>{LocalizedStrings[language].malnourishment}: {metadataObj.malnourishment ? metadataObj.malnourishmentText : LocalizedStrings[language].false}</Text>
            <Text>{LocalizedStrings[language].migraines}: {metadataObj.migraines ? metadataObj.migrainesText : LocalizedStrings[language].false}</Text>
            <Text>{LocalizedStrings[language].diarrhea}: {metadataObj.diarrhea ? metadataObj.diarrheaText : LocalizedStrings[language].false}</Text>
            <Text>{LocalizedStrings[language].ecocardiogram}: {metadataObj.ecocardiogram ? metadataObj.ecocardiogramText : LocalizedStrings[language].false}</Text>
            <Text>{LocalizedStrings[language].electrocardiogram}: {metadataObj.electrocardiogram ? metadataObj.electrocardiogramText : LocalizedStrings[language].false}</Text>

            <Text>{LocalizedStrings[language].pregnant}: {metadataObj.pregnant ? LocalizedStrings[language].true : LocalizedStrings[language].false }</Text>
            <Text>{LocalizedStrings[language].pregnancies}: {metadataObj.pregnancies}</Text>

            <Text>{LocalizedStrings[language].chikungunya}: {metadataObj.chikungunya ? metadataObj.chikungunyaText : LocalizedStrings[language].false}</Text>
            <Text>{LocalizedStrings[language].dengue}: {metadataObj.dengue ? metadataObj.dengueText : LocalizedStrings[language].false}</Text>
            <Text>{LocalizedStrings[language].malaria}: {metadataObj.malaria ? metadataObj.malariaText : LocalizedStrings[language].false}</Text>
            <Text>{LocalizedStrings[language].otherMosquito}: {metadataObj.otherMosquito ? metadataObj.otherMosquitoText : LocalizedStrings[language].false}</Text>
            <Text>{LocalizedStrings[language].zika}: {metadataObj.zika ? metadataObj.zikaText : LocalizedStrings[language].false}</Text>
            <Text>{LocalizedStrings[language].copd}: {metadataObj.copd ? metadataObj.copdText : LocalizedStrings[language].false}</Text>
            <Text>{LocalizedStrings[language].gastritis}: {metadataObj.gastritis ? metadataObj.gastritisText : LocalizedStrings[language].false}</Text>
            <Text>{LocalizedStrings[language].scabies}: {metadataObj.scabies ? metadataObj.scabiesText : LocalizedStrings[language].false}</Text>
            <Text>{LocalizedStrings[language].lastPAP}: {metadataObj.lastPAP}</Text>

            <Text>{LocalizedStrings[language].vaginalFluid}: {metadataObj.vaginalFluid ? metadataObj.vaginalFluidText : LocalizedStrings[language].false}</Text>
            <Text>{LocalizedStrings[language].hypertension}: {metadataObj.hypertension ? metadataObj.hypertensionText : LocalizedStrings[language].false}</Text>
            <Text>{LocalizedStrings[language].hypothyroidism}: {metadataObj.hypothyroidism ? metadataObj.hypothyroidismText : LocalizedStrings[language].false}</Text>
            <Text>{LocalizedStrings[language].bacterialResp}: {metadataObj.bacterialResp ? metadataObj.bacterialRespText : LocalizedStrings[language].false}</Text>
            <Text>{LocalizedStrings[language].viralResp}: {metadataObj.miscarriaviralRespges ? metadataObj.viralRespText : LocalizedStrings[language].false}</Text>
            <Text>{LocalizedStrings[language].uti}: {metadataObj.uti ? metadataObj.utiText : LocalizedStrings[language].false}</Text> 
            <Text>{LocalizedStrings[language].renalFailure}: {metadataObj.renalFailure ? metadataObj.renalFailureText : LocalizedStrings[language].false}</Text>
            <Text>{LocalizedStrings[language].breastfeeding}: {metadataObj.breastfeeding ? metadataObj.breastfeedingText : LocalizedStrings[language].false}</Text>
            <Text>{LocalizedStrings[language].lumbago}: {metadataObj.lumbago ? metadataObj.lumbagoText : LocalizedStrings[language].false}</Text>
            <Text>{LocalizedStrings[language].menopause}: {metadataObj.menopause ? metadataObj.menopauseText : LocalizedStrings[language].false}</Text>
            <Text>{LocalizedStrings[language].nausea}: {metadataObj.nausea ? metadataObj.nauseaText : LocalizedStrings[language].false}</Text>
            <Text>{LocalizedStrings[language].nephrolithiasisRenal}: {metadataObj.nephrolithiasisRenal ? metadataObj.nephrolithiasisRenalText : LocalizedStrings[language].false}</Text>
            <Text>{LocalizedStrings[language].diabeticNeuropathy}: {metadataObj.diabeticNeuropathy ? metadataObj.diabeticNeuropathyText : LocalizedStrings[language].false}</Text>
            <Text>{LocalizedStrings[language].obesity}: {metadataObj.obesity ? metadataObj.obesityText : LocalizedStrings[language].false}</Text>
            <Text>{LocalizedStrings[language].osteoarthritis}: {metadataObj.osteoarthritis ? metadataObj.osteoarthritisText : LocalizedStrings[language].false}</Text>
            <Text>{LocalizedStrings[language].otitis}: {metadataObj.otitis ? metadataObj.otitisText : LocalizedStrings[language].false}</Text>
            <Text>{LocalizedStrings[language].paralysis}: {metadataObj.paralysis ? metadataObj.paralysisText : LocalizedStrings[language].false}</Text>
            <Text>{LocalizedStrings[language].parasites}: {metadataObj.parasites ? metadataObj.parasitesText : LocalizedStrings[language].false}</Text>
            <Text>{LocalizedStrings[language].skinHealthy}: {metadataObj.skinHealthy ? metadataObj.skinHealthyText : LocalizedStrings[language].false}</Text>
            <Text>{LocalizedStrings[language].skinUlcers}: {metadataObj.skinUlcers ? metadataObj.skinUlcersText : LocalizedStrings[language].false}</Text>
            <Text>{LocalizedStrings[language].skinInfected}: {metadataObj.skinInfected ? metadataObj.skinInfectedText : LocalizedStrings[language].false}</Text>
            <Text>{LocalizedStrings[language].lice}: {metadataObj.lice ? metadataObj.liceText : LocalizedStrings[language].false}</Text>
            <Text>{LocalizedStrings[language].postnatalVisit}: {metadataObj.postnatalVisit ? LocalizedStrings[language].true : LocalizedStrings[language].false }</Text>
            <Text>{LocalizedStrings[language].prenatalVisit}: {metadataObj.prenatalVisit  ? LocalizedStrings[language].true : LocalizedStrings[language].false }</Text>

            <Text>{LocalizedStrings[language].eyeProb}: {metadataObj.eyeProb ? metadataObj.eyeProbText : LocalizedStrings[language].false}</Text>
            <Text>{LocalizedStrings[language].emotionalProb}: {metadataObj.emotionalProb ? metadataObj.emotionalProbText : LocalizedStrings[language].false}</Text>
            <Text>{LocalizedStrings[language].gynecologicalProb}: {metadataObj.gynecologicalProb ? metadataObj.gynecologicalProbText : LocalizedStrings[language].false}</Text>
            <Text>{LocalizedStrings[language].parkinsons}: {metadataObj.parkinsons ? metadataObj.parkinsonsText : LocalizedStrings[language].false}</Text>
            <Text>{LocalizedStrings[language].epilepsy}: {metadataObj.epilepsy ? metadataObj.epilepsyText : LocalizedStrings[language].false}</Text>
            <Text>{LocalizedStrings[language].neurologicalProb}: {metadataObj.neurologicalProb ? metadataObj.neurologicalProbText : LocalizedStrings[language].false}</Text>
            <Text>{LocalizedStrings[language].therapistReferred}: {metadataObj.therapistReferred ? metadataObj.therapistReferredText : LocalizedStrings[language].false}</Text>
            <Text>{LocalizedStrings[language].developmentallyDelayed}: {metadataObj.developmentallyDelayed ? metadataObj.developmentallyDelayedText : LocalizedStrings[language].false}</Text>
            <Text>{LocalizedStrings[language].vitamins}: {metadataObj.vitamins ? metadataObj.vitaminsText : LocalizedStrings[language].false}</Text>
            <Text>{LocalizedStrings[language].lastMenstruation}: {metadataObj.lastMenstruation}</Text>

            <Text>{LocalizedStrings[language].hiv}: {metadataObj.hiv ? metadataObj.hivText : LocalizedStrings[language].false}</Text>
            <Text>{LocalizedStrings[language].vomiting}: {metadataObj.vomiting ? metadataObj.vomitingText : LocalizedStrings[language].false}</Text>
            <Text>{LocalizedStrings[language].other}: {metadataObj.other}</Text>

        </View>)
}

const MedicalPathologies = (props) => {
    const [miscarriages, setMiscarriages] = useState(null);
    const [miscarriagesNumber, setMiscarriagesNumber] = useState(null);
    const [foodAllergies, setFoodAllergies] = useState(null);
    const [foodAllergiesText, setFoodAllergiesText] = useState(null);
    const [animalAllergies, setAnimalAllergies] = useState(null);
    const [animalAllergiesText, setAnimalAllergiesText] = useState(null);
    const [atmosphereAllergies, setAtmosphereAllergies] = useState(null);
    const [atmosphereAllergiesText, setAtmosphereAllergiesText] = useState(null);
    const [insectAllergies, setInsectAllergies] = useState(null);
    const [insectAllergiesText, setInsectAllergiesText] = useState(null);
    const [latexAllergies, setLatexAllergies] = useState(null);
    const [latexAllergiesText, setLatexAllergiesText] = useState(null);
    const [medicineAllergies, setMedicineAllergies] = useState(null);
    const [medicineAllergiesText, setMedicineAllergiesText] = useState(null);
    const [otherAllergies, setOtherAllergies] = useState(null);
    const [otherAllergiesText, setOtherAllergiesText] = useState(null);
    const [tonsillitis, setTonsillitis] = useState(null);
    const [tonsillitisText, setTonsillitisText] = useState(null);
    const [anemic, setAnemic] = useState(null);
    const [anemicText, setAnemicText] = useState(null);
    const [arthritis, setArthritis] = useState(null);
    const [arthritisText, setArthritisText] = useState(null);
    const [asthma, setAsthma] = useState(null);
    const [asthmaText, setAsthmaText] = useState(null);
    const [neckPain, setNeckPain] = useState(null);
    const [neckPainText, setNeckPainText] = useState(null);
    const [cervicovaginitis, setCervicovaginitis] = useState(null);
    const [cervicovaginitisText, setCervicovaginitisText] = useState(null);

    const [cSection, setCSection] = useState(null);

    const [sciaticPain, setSciaticPain] = useState(null);
    const [sciaticPainText, setSciaticPainText] = useState(null);
    const [cholesterol, setCholesterol] = useState(null);
    const [cholesterolText, setCholesterolText] = useState(null);
    const [infantColic, setInfantColic] = useState(null);
    const [infantColicText, setInfantColicText] = useState(null);
    const [conjunctivitis, setConjunctivitis] = useState(null);
    const [conjunctivitisText, setConjunctivitisText] = useState(null);
    const [covid, setCovid] = useState(null);
    const [covidText, setCovidText] = useState(null);
    const [malnourishment, setMalnourishment] = useState(null);
    const [malnourishmentText, setMalnourishmentText] = useState(null);
    const [migraines, setMigraines] = useState(null);
    const [migrainesText, setMigrainesText] = useState(null);
    const [diarrhea, setDiarrhea] = useState(null);
    const [diarrheaText, setDiarrheaText] = useState(null);
    const [ecocardiogram, setEcocardiogram] = useState(null);
    const [ecocardiogramText, setEcocardiogramText] = useState(null);
    const [electrocardiogram, setElectrocardiogram] = useState(null);
    const [electrocardiogramText, setElectrocardiogramText] = useState(null);

    const [pregnant, setPregnant] = useState(null);
    const [pregnancies, setPregnancies] = useState(null);

    const [chikungunya, setChikungunya] = useState(null);
    const [chikungunyaText, setChikungunyaText] = useState(null);
    const [dengue, setDengue] = useState(null);
    const [dengueText, setDengueText] = useState(null);
    const [malaria, setMalaria] = useState(null);
    const [malariaText, setMalariaText] = useState(null);
    const [otherMosquito, setOtherMosquito] = useState(null);
    const [otherMosquitoText, setOtherMosquitoText] = useState(null);
    const [zika, setZika] = useState(null);
    const [zikaText, setZikaText] = useState(null);
    const [copd, setCopd] = useState(null);
    const [copdText, setCopdText] = useState(null);
    const [gastritis, setGastritis] = useState(null);
    const [gastritisText, setGastritisText] = useState(null);
    const [scabies, setScabies] = useState(null);
    const [scabiesText, setScabiesText] = useState(null);

    const [lastPAP, setLastPAP] = useState('');

    const [vaginalFluid, setVaginalFluid] = useState(null);
    const [vaginalFluidText, setVaginalFluidText] = useState(null);
    const [hypertension, setHypertension] = useState(null);
    const [hypertensionText, setHypertensionText] = useState(null);
    const [hypothyroidism, setHypothyroidism] = useState(null);
    const [hypothyroidismText, setHypothyroidismText] = useState(null);
    const [bacterialResp, setBacterialResp] = useState(null);
    const [bacterialRespText, setBacterialRespText] = useState(null);
    const [viralResp, setViralResp] = useState(null);
    const [viralRespText, setViralRespText] = useState(null);
    const [uti, setUti] = useState(null);
    const [utiText, setUtiText] = useState(null);
    const [renalFailure, setRenalFailure] = useState(null);
    const [renalFailureText, setRenalFailureText] = useState(null);
    const [breastfeeding, setBreastfeeding] = useState(null);
    const [breastfeedingText, setBreastfeedingText] = useState(null);
    const [lumbago, setLumbago] = useState(null);
    const [lumbagoText, setLumbagoText] = useState(null);
    const [menopause, setMenopause] = useState(null);
    const [menopauseText, setMenopauseText] = useState(null);
    const [nausea, setNausea] = useState(null);
    const [nauseaText, setNauseaText] = useState(null);
    const [nephrolithiasisRenal, setNephrolithiasisRenal] = useState(null);
    const [nephrolithiasisRenalText, setNephrolithiasisRenalText] = useState(null);
    const [diabeticNeuropathy, setDiabeticNeuropathy] = useState(null);
    const [diabeticNeuropathyText, setDiabeticNeuropathyText] = useState(null);
    const [obesity, setObesity] = useState(null);
    const [obesityText, setObesityText] = useState(null);
    const [osteoarthritis, setOsteoarthritis] = useState(null);
    const [osteoarthritisText, setOsteoarthritisText] = useState(null);
    const [otitis, setOtitis] = useState(null);
    const [otitisText, setOtitisText] = useState(null);
    const [paralysis, setParalysis] = useState(null);
    const [paralysisText, setParalysisText] = useState(null);
    const [parasites, setParasites] = useState(null);
    const [parasitesText, setParasitesText] = useState(null);
    const [skinHealthy, setSkinHealthy] = useState(null);
    const [skinHealthyText, setSkinHealthyText] = useState(null);
    const [skinUlcers, setSkinUlcers] = useState(null);
    const [skinUlcersText, setSkinUlcersText] = useState(null);
    const [skinInfected, setSkinInfected] = useState(null);
    const [skinInfectedText, setSkinInfectedText] = useState(null);
    const [lice, setLice] = useState(null);
    const [liceText, setLiceText] = useState(null);

    const [postnatalVisit, setPostnatalVisit] = useState(null);
    const [prenatalVisit, setPrenatalVisit] = useState(null);

    const [eyeProb, setEyeProb] = useState(null);
    const [eyeProbText, setEyeProbText] = useState(null);
    const [emotionalProb, setEmotionalProb] = useState(null);
    const [emotionalProbText, setEmotionalProbText] = useState(null);
    const [gynecologicalProb, setGynecologicalProb] = useState(null);
    const [gynecologicalProbText, setGynecologicalProbText] = useState(null);
    const [parkinsons, setParkinsons] = useState(null);
    const [parkinsonsText, setParkinsonsText] = useState(null);
    const [epilepsy, setEpilepsy] = useState(null);
    const [epilepsyText, setEpilepsyText] = useState(null);
    const [neurologicalProb, setNeurologicalProb] = useState(null);
    const [neurologicalProbText, setNeurologicalProbText] = useState(null);
    const [therapistReferred, setTherapistReferred] = useState(null);
    const [therapistReferredText, setTherapistReferredText] = useState(null);
    const [developmentallyDelayed, setDevelopmentallyDelayed] = useState(null);
    const [developmentallyDelayedText, setDevelopmentallyDelayedText] = useState(null);
    const [vitamins, setVitamins] = useState(null);
    const [vitaminsText, setVitaminsText] = useState(null);

    const [lastMenstruation, setLastMenstruation] = useState('');

    const [hiv, setHiv] = useState(null);
    const [hivText, setHivText] = useState(null);
    const [vomiting, setVomiting] = useState(null);
    const [vomitingText, setVomitingText] = useState(null);
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
            event_type: EventTypes.MedicalPathologies,
            event_metadata: JSON.stringify({
                doctor: userName,
                miscarriages,
                miscarriagesNumber,
                foodAllergies,
                foodAllergiesText,
                animalAllergies,
                animalAllergiesText,
                atmosphereAllergies,
                atmosphereAllergiesText,
                insectAllergies,
                insectAllergiesText,
                latexAllergies,
                latexAllergiesText,
                medicineAllergies,
                medicineAllergiesText,
                otherAllergies,
                otherAllergiesText,
                tonsillitis,
                tonsillitisText,
                anemic,
                anemicText,
                arthritis,
                arthritisText,
                asthma,
                asthmaText,
                neckPain,
                neckPainText,
                cervicovaginitis,
                cervicovaginitisText,
                cSection,
                sciaticPain,
                sciaticPainText,
                cholesterol,
                cholesterolText,
                infantColic,
                infantColicText,
                conjunctivitis,
                conjunctivitisText,
                covid,
                covidText,
                malnourishment,
                malnourishmentText,
                migraines,
                migrainesText,
                diarrhea,
                diarrheaText,
                ecocardiogram,
                ecocardiogramText,
                electrocardiogram,
                electrocardiogramText,
                pregnant,
                pregnancies,
                chikungunya,
                chikungunyaText,
                dengue,
                dengueText,
                malaria,
                malariaText,
                otherMosquito,
                otherMosquitoText,
                zika,
                zikaText,
                copd,
                copdText,
                gastritis,
                gastritisText,
                scabies,
                scabiesText,
                lastPAP,
                vaginalFluid,
                vaginalFluidText,
                hypertension,
                hypertensionText,
                hypothyroidism,
                hypothyroidismText,
                bacterialResp,
                bacterialRespText,
                viralResp,
                viralRespText,
                uti,
                utiText,
                renalFailure,
                renalFailureText,
                breastfeeding,
                breastfeedingText,
                lumbago,
                lumbagoText,
                menopause,
                menopauseText,
                nausea,
                nauseaText,
                nephrolithiasisRenal,
                nephrolithiasisRenalText,
                diabeticNeuropathy,
                diabeticNeuropathyText,
                obesity,
                obesityText,
                osteoarthritis,
                osteoarthritisText,
                otitis,
                otitisText,
                paralysis,
                paralysisText,
                parasites,
                parasitesText,
                skinHealthy,
                skinHealthyText,
                skinUlcers,
                skinUlcersText,
                skinInfected,
                skinInfectedText,
                lice,
                liceText,
                postnatalVisit,
                prenatalVisit,
                eyeProb,
                eyeProbText,
                emotionalProb,
                emotionalProbText,
                gynecologicalProb,
                gynecologicalProbText,
                parkinsons,
                parkinsonsText,
                epilepsy,
                epilepsyText,
                neurologicalProb,
                neurologicalProbText,
                therapistReferred,
                therapistReferredText,
                developmentallyDelayed,
                developmentallyDelayedText,
                vitamins,
                vitaminsText,
                lastMenstruation,
                hiv,
                hivText,
                vomiting,
                vomitingText,
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
        <ScrollView>
            <LinearGradient colors={['#31BBF3', '#4D7FFF']} style={styles.containerLeft}>
                <View style={[styles.inputsContainer, { alignItems: 'flex-start' }]}>

                    <View style={[styles.responseRow]}>
                        {radioButtons({ field: miscarriages, action: setMiscarriages, prompt: LocalizedStrings[language].miscarriages, language })}
                    </View>
                    {miscarriages ?
                        <View style={[styles.responseRow, { padding: 0 }]}>
                            <TextInput
                                style={styles.inputs}
                                onChangeText={(text) => setMiscarriagesNumber(text)}
                                value={miscarriagesNumber}
                                keyboardType='numeric'
                            />
                        </View> : null
                    }
                    {formRow(foodAllergies, setFoodAllergies, foodAllergiesText, setFoodAllergiesText, 'foodAllergies')}
                    {formRow(animalAllergies, setAnimalAllergies, animalAllergiesText, setAnimalAllergiesText, 'animalAllergies')}
                    {formRow(atmosphereAllergies, setAtmosphereAllergies, atmosphereAllergiesText, setAtmosphereAllergiesText, 'atmosphereAllergies')}
                    {formRow(insectAllergies, setInsectAllergies, insectAllergiesText, setInsectAllergiesText, 'insectAllergies')}
                    {formRow(latexAllergies, setLatexAllergies, latexAllergiesText, setLatexAllergiesText, 'latexAllergies')}
                    {formRow(medicineAllergies, setMedicineAllergies, medicineAllergiesText, setMedicineAllergiesText, 'medicineAllergies')}
                    {formRow(otherAllergies, setOtherAllergies, otherAllergiesText, setOtherAllergiesText, 'otherAllergies')}
                    {formRow(tonsillitis, setTonsillitis, tonsillitisText, setTonsillitisText, 'tonsillitis')}
                    {formRow(anemic, setAnemic, anemicText, setAnemicText, 'anemic')}
                    {formRow(arthritis, setArthritis, arthritisText, setArthritisText, 'arthritis')}
                    {formRow(asthma, setAsthma, asthmaText, setAsthmaText, 'asthma')}
                    {formRow(neckPain, setNeckPain, neckPainText, setNeckPainText, 'neckPain')}
                    {formRow(cervicovaginitis, setCervicovaginitis, cervicovaginitisText, setCervicovaginitisText, 'cervicovaginitis')}
                    <View style={[styles.responseRow, { paddingBottom: 0 }]}>
                        <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].cSection}</Text>
                    </View>

                    <View style={[styles.responseRow, { padding: 0 }]}>
                        <TextInput
                            style={styles.inputs}
                            onChangeText={(text) => setCSection(text)}
                            value={cSection}
                            keyboardType='numeric'
                        />
                    </View>
                    {formRow(sciaticPain, setSciaticPain, sciaticPainText, setSciaticPainText, 'sciaticPain')}
                    {formRow(cholesterol, setCholesterol, cholesterolText, setCholesterolText, 'cholesterol')}
                    {formRow(infantColic, setInfantColic, infantColicText, setInfantColicText, 'infantColic')}
                    {formRow(conjunctivitis, setConjunctivitis, conjunctivitisText, setConjunctivitisText, 'conjunctivitis')}
                    {formRow(covid, setCovid, covidText, setCovidText, 'covid')}
                    {formRow(malnourishment, setMalnourishment, malnourishmentText, setMalnourishmentText, 'malnourishment')}
                    {formRow(migraines, setMigraines, migrainesText, setMigrainesText, 'migraines')}
                    {formRow(diarrhea, setDiarrhea, diarrheaText, setDiarrheaText, 'diarrhea')}
                    {formRow(ecocardiogram, setEcocardiogram, ecocardiogramText, setEcocardiogramText, 'ecocardiogram')}
                    {formRow(electrocardiogram, setElectrocardiogram, electrocardiogramText, setElectrocardiogramText, 'electrocardiogram')}
                    <View style={[styles.responseRow]}>
                        {radioButtons({ field: pregnant, action: setPregnant, prompt: LocalizedStrings[language].pregnant, language })}
                    </View>
                    <View style={[styles.responseRow, { paddingBottom: 0 }]}>
                        <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].pregnancies}</Text>
                    </View>
                    <View style={[styles.responseRow, { padding: 0 }]}>
                        <TextInput
                            style={styles.inputs}
                            onChangeText={(text) => setPregnancies(text)}
                            value={pregnancies}
                            keyboardType='numeric'
                        />
                    </View>
                    {formRow(chikungunya, setChikungunya, chikungunyaText, setChikungunyaText, 'chikungunya')}
                    {formRow(dengue, setDengue, dengueText, setDengueText, 'dengue')}
                    {formRow(malaria, setMalaria, malariaText, setMalariaText, 'malaria')}
                    {formRow(otherMosquito, setOtherMosquito, otherMosquitoText, setOtherMosquitoText, 'otherMosquito')}
                    {formRow(zika, setZika, zikaText, setZikaText, 'zika')}
                    {formRow(copd, setCopd, copdText, setCopdText, 'copd')}
                    {formRow(gastritis, setGastritis, gastritisText, setGastritisText, 'gastritis')}
                    {formRow(scabies, setScabies, scabiesText, setScabiesText, 'scabies')}
                    <View style={[styles.responseRow, { paddingVertical: 0 }]}>
                        <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].lastPAP}</Text>
                    </View>
                    {datePicker({ placeholder: LocalizedStrings[language].date, date: lastPAP, action: setLastPAP, language })}
                    {formRow(vaginalFluid, setVaginalFluid, vaginalFluidText, setVaginalFluidText, 'vaginalFluid')}
                    {formRow(hypertension, setHypertension, hypertensionText, setHypertensionText, 'hypertension')}
                    {formRow(hypothyroidism, setHypothyroidism, hypothyroidismText, setHypothyroidismText, 'hypothyroidism')}
                    {formRow(bacterialResp, setBacterialResp, bacterialRespText, setBacterialRespText, 'bacterialResp')}
                    {formRow(viralResp, setViralResp, viralRespText, setViralRespText, 'viralResp')}
                    {formRow(uti, setUti, utiText, setUtiText, 'uti')}
                    {formRow(renalFailure, setRenalFailure, renalFailureText, setRenalFailureText, 'renalFailure')}
                    {formRow(breastfeeding, setBreastfeeding, breastfeedingText, setBreastfeedingText, 'breastfeeding')}
                    {formRow(lumbago, setLumbago, lumbagoText, setLumbagoText, 'lumbago')}
                    {formRow(menopause, setMenopause, menopauseText, setMenopauseText, 'menopause')}
                    {formRow(nausea, setNausea, nauseaText, setNauseaText, 'nausea')}
                    {formRow(nephrolithiasisRenal, setNephrolithiasisRenal, nephrolithiasisRenalText, setNephrolithiasisRenalText, 'nephrolithiasisRenal')}
                    {formRow(diabeticNeuropathy, setDiabeticNeuropathy, diabeticNeuropathyText, setDiabeticNeuropathyText, 'diabeticNeuropathy')}
                    {formRow(obesity, setObesity, obesityText, setObesityText, 'obesity')}
                    {formRow(osteoarthritis, setOsteoarthritis, osteoarthritisText, setOsteoarthritisText, 'osteoarthritis')}
                    {formRow(otitis, setOtitis, otitisText, setOtitisText, 'otitis')}
                    {formRow(paralysis, setParalysis, paralysisText, setParalysisText, 'paralysis')}
                    {formRow(parasites, setParasites, parasitesText, setParasitesText, 'parasites')}
                    {formRow(skinHealthy, setSkinHealthy, skinHealthyText, setSkinHealthyText, 'skinHealthy')}
                    {formRow(skinUlcers, setSkinUlcers, skinUlcersText, setSkinUlcersText, 'skinUlcers')}
                    {formRow(skinInfected, setSkinInfected, skinInfectedText, setSkinInfectedText, 'skinInfected')}
                    {formRow(lice, setLice, liceText, setLiceText, 'lice')}
                    <View style={[styles.responseRow]}>
                        {radioButtons({ field: postnatalVisit, action: setPostnatalVisit, prompt: LocalizedStrings[language].postnatalVisit, language })}
                    </View>
                    <View style={[styles.responseRow]}>
                        {radioButtons({ field: prenatalVisit, action: setPrenatalVisit, prompt: LocalizedStrings[language].prenatalVisit, language })}
                    </View>
                    {formRow(eyeProb, setEyeProb, eyeProbText, setEyeProbText, 'eyeProb')}
                    {formRow(emotionalProb, setEmotionalProb, emotionalProbText, setEmotionalProbText, 'emotionalProb')}
                    {formRow(gynecologicalProb, setGynecologicalProb, gynecologicalProbText, setGynecologicalProbText, 'gynecologicalProb')}
                    {formRow(parkinsons, setParkinsons, parkinsonsText, setParkinsonsText, 'parkinsons')}
                    {formRow(epilepsy, setEpilepsy, epilepsyText, setEpilepsyText, 'epilepsy')}
                    {formRow(neurologicalProb, setNeurologicalProb, neurologicalProbText, setNeurologicalProbText, 'neurologicalProb')}
                    {formRow(therapistReferred, setTherapistReferred, therapistReferredText, setTherapistReferredText, 'therapistReferred')}
                    {formRow(developmentallyDelayed, setDevelopmentallyDelayed, developmentallyDelayedText, setDevelopmentallyDelayedText, 'developmentallyDelayed')}
                    {formRow(vitamins, setVitamins, vitaminsText, setVitaminsText, 'vitamins')}
                    <View style={[styles.responseRow, { paddingVertical: 0 }]}>
                        <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].lastMenstruation}</Text>
                    </View>
                    {datePicker({ placeholder: LocalizedStrings[language].date, date: lastMenstruation, action: setLastMenstruation, language })}
                    {formRow(hiv, setHiv, hivText, setHivText, 'hiv')}
                    {formRow(vomiting, setVomiting, vomitingText, setVomitingText, 'vomiting')}
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
                </View>
                <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => submit()}>
                        <Image source={require('../../images/login.png')} style={{ width: 75, height: 75 }} />
                    </TouchableOpacity>
                </View>
            </LinearGradient>
        </ScrollView>
    );
};

export default MedicalPathologies;
