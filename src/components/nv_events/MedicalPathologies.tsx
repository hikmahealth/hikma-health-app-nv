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

const formatDisplay = (field, textField, language) => {
    if (field == null) {
        return null
    }
    if (!!field && textField == null) {
        return field
    }
    return field ? textField : LocalizedStrings[language].no

}

export const MedicalPathologiesDisplay = (metadataObj, language) => {

    return (
        <View>
            <Text>{LocalizedStrings[language].doctor}: {metadataObj.doctor} </Text>
            <Text>{LocalizedStrings[language].miscarriages}: {formatDisplay(metadataObj.miscarriages, metadataObj.miscarriagesNumber, language)} </Text>
            <Text>{LocalizedStrings[language].foodAllergies}: {formatDisplay(metadataObj.foodAllergies, metadataObj.foodAllergiesText, language)} </Text>
            <Text>{LocalizedStrings[language].animalAllergies}: {formatDisplay(metadataObj.animalAllergies, metadataObj.animalAllergiesText, language)}</Text>
            <Text>{LocalizedStrings[language].atmosphereAllergies}: {formatDisplay(metadataObj.atmosphereAllergies, metadataObj.atmosphereAllergiesText, language)}</Text>
            <Text>{LocalizedStrings[language].insectAllergies}: {formatDisplay(metadataObj.insectAllergies, metadataObj.insectAllergiesText, language)}</Text>
            <Text>{LocalizedStrings[language].latexAllergies}: {formatDisplay(metadataObj.latexAllergies, metadataObj.latexAllergiesText, language)}</Text>
            <Text>{LocalizedStrings[language].medicineAllergies}: {formatDisplay(metadataObj.medicineAllergies, metadataObj.medicineAllergiesText, language)}</Text>
            <Text>{LocalizedStrings[language].otherAllergies}: {formatDisplay(metadataObj.otherAllergies, metadataObj.otherAllergiesText, language)}</Text>
            <Text>{LocalizedStrings[language].tonsillitis}: {formatDisplay(metadataObj.tonsillitis, metadataObj.tonsillitisText, language)}</Text>
            <Text>{LocalizedStrings[language].anemic}: {formatDisplay(metadataObj.anemic, metadataObj.anemicText, language)}</Text>
            <Text>{LocalizedStrings[language].arthritis}: {formatDisplay(metadataObj.arthritis, metadataObj.arthritisText, language)}</Text>
            <Text>{LocalizedStrings[language].asthma}: {formatDisplay(metadataObj.asthma, metadataObj.asthmaText, language)}</Text>
            <Text>{LocalizedStrings[language].neckPain}: {formatDisplay(metadataObj.neckPain, metadataObj.neckPainText, language)}</Text>
            <Text>{LocalizedStrings[language].cervicovaginitis}: {formatDisplay(metadataObj.cervicovaginitis, metadataObj.cervicovaginitisText, language)}</Text>

            <Text>{LocalizedStrings[language].cSection}: {formatDisplay(metadataObj.cSection, null, language)}</Text>

            <Text>{LocalizedStrings[language].sciaticPain}: {formatDisplay(metadataObj.sciaticPain, metadataObj.sciaticPainText, language)}</Text>
            <Text>{LocalizedStrings[language].cholesterol}: {formatDisplay(metadataObj.cholesterol, metadataObj.cholesterolText, language)}</Text>
            <Text>{LocalizedStrings[language].infantColic}: {formatDisplay(metadataObj.infantColic, metadataObj.infantColicText, language)}</Text>
            <Text>{LocalizedStrings[language].conjunctivitis}: {formatDisplay(metadataObj.conjunctivitis, metadataObj.conjunctivitisText, language)}</Text>
            <Text>{LocalizedStrings[language].covid}: {formatDisplay(metadataObj.covid, metadataObj.covidText, language)}</Text>
            <Text>{LocalizedStrings[language].malnourishment}: {formatDisplay(metadataObj.malnourishment, metadataObj.malnourishmentText, language)}</Text>
            <Text>{LocalizedStrings[language].migraines}: {formatDisplay(metadataObj.migraines, metadataObj.migrainesText, language)}</Text>
            <Text>{LocalizedStrings[language].diarrhea}: {formatDisplay(metadataObj.diarrhea, metadataObj.diarrheaText, language)}</Text>
            <Text>{LocalizedStrings[language].ecocardiogram}: {formatDisplay(metadataObj.ecocardiogram, metadataObj.ecocardiogramText, language)}</Text>
            <Text>{LocalizedStrings[language].electrocardiogram}: {formatDisplay(metadataObj.electrocardiogram, metadataObj.electrocardiogramText, language)}</Text>

            <Text>{LocalizedStrings[language].pregnant}: {formatDisplay(metadataObj.pregnant, LocalizedStrings[language].true, language)}</Text>
            <Text>{LocalizedStrings[language].pregnancies}: {formatDisplay(metadataObj.pregnancies, null, language)}</Text>

            <Text>{LocalizedStrings[language].chikungunya}: {formatDisplay(metadataObj.chikungunya, metadataObj.chikungunyaText, language)}</Text>
            <Text>{LocalizedStrings[language].dengue}: {formatDisplay(metadataObj.dengue, metadataObj.dengueText, language)}</Text>
            <Text>{LocalizedStrings[language].malaria}: {formatDisplay(metadataObj.malaria, metadataObj.malariaText, language)}</Text>
            <Text>{LocalizedStrings[language].otherMosquito}: {formatDisplay(metadataObj.otherMosquito, metadataObj.otherMosquitoText, language)}</Text>
            <Text>{LocalizedStrings[language].zika}: {formatDisplay(metadataObj.zika, metadataObj.zikaText, language)}</Text>
            <Text>{LocalizedStrings[language].copd}: {formatDisplay(metadataObj.copd, metadataObj.copdText, language)}</Text>
            <Text>{LocalizedStrings[language].gastritis}: {formatDisplay(metadataObj.gastritis, metadataObj.gastritisText, language)}</Text>
            <Text>{LocalizedStrings[language].scabies}: {formatDisplay(metadataObj.scabies, metadataObj.scabiesText, language)}</Text>
            <Text>{LocalizedStrings[language].lastPAP}: {formatDisplay(metadataObj.lastPAP, null, language)}</Text>

            <Text>{LocalizedStrings[language].vaginalFluid}: {formatDisplay(metadataObj.vaginalFluid, metadataObj.vaginalFluidText, language)}</Text>
            <Text>{LocalizedStrings[language].hypertension}: {formatDisplay(metadataObj.hypertension, metadataObj.hypertensionText, language)}</Text>
            <Text>{LocalizedStrings[language].hypothyroidism}: {formatDisplay(metadataObj.hypothyroidism, metadataObj.hypothyroidismText, language)}</Text>
            <Text>{LocalizedStrings[language].bacterialResp}: {formatDisplay(metadataObj.bacterialResp, metadataObj.bacterialRespText, language)}</Text>
            <Text>{LocalizedStrings[language].viralResp}: {formatDisplay(metadataObj.miscarriaviralRespges, metadataObj.viralRespText, language)}</Text>
            <Text>{LocalizedStrings[language].uti}: {formatDisplay(metadataObj.uti, metadataObj.utiText, language)}</Text>
            <Text>{LocalizedStrings[language].renalFailure}: {formatDisplay(metadataObj.renalFailure, metadataObj.renalFailureText, language)}</Text>
            <Text>{LocalizedStrings[language].breastfeeding}: {formatDisplay(metadataObj.breastfeeding, metadataObj.breastfeedingText, language)}</Text>
            <Text>{LocalizedStrings[language].lumbago}: {formatDisplay(metadataObj.lumbago, metadataObj.lumbagoText, language)}</Text>
            <Text>{LocalizedStrings[language].menopause}: {formatDisplay(metadataObj.menopause, metadataObj.menopauseText, language)}</Text>
            <Text>{LocalizedStrings[language].nausea}: {formatDisplay(metadataObj.nausea, metadataObj.nauseaText, language)}</Text>
            <Text>{LocalizedStrings[language].nephrolithiasisRenal}: {formatDisplay(metadataObj.nephrolithiasisRenal, metadataObj.nephrolithiasisRenalText, language)}</Text>
            <Text>{LocalizedStrings[language].diabeticNeuropathy}: {formatDisplay(metadataObj.diabeticNeuropathy, metadataObj.diabeticNeuropathyText, language)}</Text>
            <Text>{LocalizedStrings[language].obesity}: {formatDisplay(metadataObj.obesity, metadataObj.obesityText, language)}</Text>
            <Text>{LocalizedStrings[language].osteoarthritis}: {formatDisplay(metadataObj.osteoarthritis, metadataObj.osteoarthritisText, language)}</Text>
            <Text>{LocalizedStrings[language].otitis}: {formatDisplay(metadataObj.otitis, metadataObj.otitisText, language)}</Text>
            <Text>{LocalizedStrings[language].paralysis}: {formatDisplay(metadataObj.paralysis, metadataObj.paralysisText, language)}</Text>
            <Text>{LocalizedStrings[language].parasites}: {formatDisplay(metadataObj.parasites, metadataObj.parasitesText, language)}</Text>
            <Text>{LocalizedStrings[language].skinHealthy}: {formatDisplay(metadataObj.skinHealthy, metadataObj.skinHealthyText, language)}</Text>
            <Text>{LocalizedStrings[language].skinUlcers}: {formatDisplay(metadataObj.skinUlcers, metadataObj.skinUlcersText, language)}</Text>
            <Text>{LocalizedStrings[language].skinInfected}: {formatDisplay(metadataObj.skinInfected, metadataObj.skinInfectedText, language)}</Text>
            <Text>{LocalizedStrings[language].lice}: {formatDisplay(metadataObj.lice, metadataObj.liceText, language)}</Text>
            <Text>{LocalizedStrings[language].postnatalVisit}: {formatDisplay(metadataObj.postnatalVisit, LocalizedStrings[language].true, language)}</Text>
            <Text>{LocalizedStrings[language].prenatalVisit}: {formatDisplay(metadataObj.prenatalVisit, LocalizedStrings[language].true, language)}</Text>

            <Text>{LocalizedStrings[language].eyeProb}: {formatDisplay(metadataObj.eyeProb, metadataObj.eyeProbText, language)}</Text>
            <Text>{LocalizedStrings[language].emotionalProb}: {formatDisplay(metadataObj.emotionalProb, metadataObj.emotionalProbText, language)}</Text>
            <Text>{LocalizedStrings[language].gynecologicalProb}: {formatDisplay(metadataObj.gynecologicalProb, metadataObj.gynecologicalProbText, language)}</Text>
            <Text>{LocalizedStrings[language].parkinsons}: {formatDisplay(metadataObj.parkinsons, metadataObj.parkinsonsText, language)}</Text>
            <Text>{LocalizedStrings[language].epilepsy}: {formatDisplay(metadataObj.epilepsy, metadataObj.epilepsyText, language)}</Text>
            <Text>{LocalizedStrings[language].neurologicalProb}: {formatDisplay(metadataObj.neurologicalProb, metadataObj.neurologicalProbText, language)}</Text>
            <Text>{LocalizedStrings[language].therapistReferred}: {formatDisplay(metadataObj.therapistReferred, metadataObj.therapistReferredText, language)}</Text>
            <Text>{LocalizedStrings[language].developmentallyDelayed}: {formatDisplay(metadataObj.developmentallyDelayed, metadataObj.developmentallyDelayedText, language)}</Text>
            <Text>{LocalizedStrings[language].vitamins}: {formatDisplay(metadataObj.vitamins, metadataObj.vitaminsText, language)}</Text>
            <Text>{LocalizedStrings[language].lastMenstruation}: {formatDisplay(metadataObj.lastMenstruation, null, language)}</Text>

            <Text>{LocalizedStrings[language].hiv}: {formatDisplay(metadataObj.hiv, metadataObj.hivText, language)}</Text>
            <Text>{LocalizedStrings[language].vomiting}: {formatDisplay(metadataObj.vomiting, metadataObj.vomitingText, language)}</Text>
            <Text>{LocalizedStrings[language].other}: {formatDisplay(metadataObj.other, null, language)}</Text>

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

    useEffect(() => {
        database.getLatestPatientEventByType(patientId, EventTypes.MedicalPathologies).then((response: any) => {
            if (response.length > 0) {
                const responseObj = JSON.parse(response)

                setMiscarriages(responseObj.miscarriages)
                setMiscarriagesNumber(responseObj.miscarriagesNumber)
                setFoodAllergies(responseObj.foodAllergies)
                setFoodAllergiesText(responseObj.foodAllergiesText)
                setAnimalAllergies(responseObj.animalAllergies)
                setAnimalAllergiesText(responseObj.animalAllergiesText)
                setAtmosphereAllergies(responseObj.atmosphereAllergies)
                setAtmosphereAllergiesText(responseObj.atmosphereAllergiesText)
                setInsectAllergies(responseObj.insectAllergies)
                setInsectAllergiesText(responseObj.insectAllergiesText)
                setLatexAllergies(responseObj.latexAllergies)
                setLatexAllergiesText(responseObj.latexAllergiesText)
                setMedicineAllergies(responseObj.medicineAllergies)
                setMedicineAllergiesText(responseObj.medicineAllergiesText)
                setOtherAllergies(responseObj.otherAllergies)
                setOtherAllergiesText(responseObj.otherAllergiesText)
                setTonsillitis(responseObj.tonsillitis)
                setTonsillitisText(responseObj.tonsillitisText)
                setAnemic(responseObj.anemic)
                setAnemicText(responseObj.anemicText)
                setArthritis(responseObj.arthritis)
                setArthritisText(responseObj.arthritisText)
                setAsthma(responseObj.asthma)
                setAsthmaText(responseObj.asthmaText)
                setNeckPain(responseObj.neckPain)
                setNeckPainText(responseObj.neckPainText)
                setCervicovaginitis(responseObj.cervicovaginitis)
                setCervicovaginitisText(responseObj.cervicovaginitisText)
                setCSection(responseObj.cSection)
                setSciaticPain(responseObj.sciaticPain)
                setSciaticPainText(responseObj.sciaticPainText)
                setCholesterol(responseObj.cholesterol)
                setCholesterolText(responseObj.cholesterolText)
                setInfantColic(responseObj.infantColic)
                setInfantColicText(responseObj.infantColicText)
                setConjunctivitis(responseObj.conjunctivitis)
                setConjunctivitisText(responseObj.conjunctivitisText)
                setCovid(responseObj.covid)
                setCovidText(responseObj.covidText)
                setMalnourishment(responseObj.malnourishment)
                setMalnourishmentText(responseObj.malnourishmentText)
                setMigraines(responseObj.migraines)
                setMigrainesText(responseObj.migrainesText)
                setDiarrhea(responseObj.diarrhea)
                setDiarrheaText(responseObj.diarrheaText)
                setEcocardiogram(responseObj.ecocardiogram)
                setEcocardiogramText(responseObj.ecocardiogramText)
                setElectrocardiogram(responseObj.electrocardiogram)
                setElectrocardiogramText(responseObj.electrocardiogramText)
                setPregnant(responseObj.pregnant)
                setPregnancies(responseObj.pregnancies)
                setChikungunya(responseObj.chikungunya)
                setChikungunyaText(responseObj.chikungunyaText)
                setDengue(responseObj.dengue)
                setDengueText(responseObj.dengueText)
                setMalaria(responseObj.malaria)
                setMalariaText(responseObj.malariaText)
                setOtherMosquito(responseObj.otherMosquito)
                setOtherMosquitoText(responseObj.otherMosquitoText)
                setZika(responseObj.zika)
                setZikaText(responseObj.zikaText)
                setCopd(responseObj.copd)
                setCopdText(responseObj.copdText)
                setGastritis(responseObj.gastritis)
                setGastritisText(responseObj.gastritisText)
                setScabies(responseObj.scabies)
                setScabiesText(responseObj.scabiesText)
                setLastPAP(responseObj.lastPAP)
                setVaginalFluid(responseObj.vaginalFluid)
                setVaginalFluidText(responseObj.vaginalFluidText)
                setHypertension(responseObj.hypertension)
                setHypertensionText(responseObj.hypertensionText)
                setHypothyroidism(responseObj.hypothyroidism)
                setHypothyroidismText(responseObj.hypothyroidismText)
                setBacterialResp(responseObj.bacterialResp)
                setBacterialRespText(responseObj.bacterialRespText)
                setViralResp(responseObj.viralResp)
                setViralRespText(responseObj.viralRespText)
                setUti(responseObj.uti)
                setUtiText(responseObj.utiText)
                setRenalFailure(responseObj.renalFailure)
                setRenalFailureText(responseObj.renalFailureText)
                setBreastfeeding(responseObj.breastfeeding)
                setBreastfeedingText(responseObj.breastfeedingText)
                setLumbago(responseObj.lumbago)
                setLumbagoText(responseObj.lumbagoText)
                setMenopause(responseObj.menopause)
                setMenopauseText(responseObj.menopauseText)
                setNausea(responseObj.nausea)
                setNauseaText(responseObj.nauseaText)
                setNephrolithiasisRenal(responseObj.nephrolithiasisRenal)
                setNephrolithiasisRenalText(responseObj.nephrolithiasisRenalText)
                setDiabeticNeuropathy(responseObj.diabeticNeuropathy)
                setDiabeticNeuropathyText(responseObj.diabeticNeuropathyText)
                setObesity(responseObj.obesity)
                setObesityText(responseObj.obesityText)
                setOsteoarthritis(responseObj.osteoarthritis)
                setOsteoarthritisText(responseObj.osteoarthritisText)
                setOtitis(responseObj.otitis)
                setOtitisText(responseObj.otitisText)
                setParalysis(responseObj.paralysis)
                setParalysisText(responseObj.paralysisText)
                setParasites(responseObj.parasites)
                setParasitesText(responseObj.parasitesText)
                setSkinHealthy(responseObj.skinHealthy)
                setSkinHealthyText(responseObj.skinHealthyText)
                setSkinUlcers(responseObj.skinUlcers)
                setSkinUlcersText(responseObj.skinUlcersText)
                setSkinInfected(responseObj.skinInfected)
                setSkinInfectedText(responseObj.skinInfectedText)
                setLice(responseObj.lice)
                setLiceText(responseObj.liceText)
                setPostnatalVisit(responseObj.postnatalVisit)
                setPrenatalVisit(responseObj.prenatalVisit)
                setEyeProb(responseObj.eyeProb)
                setEyeProbText(responseObj.eyeProbText)
                setEmotionalProb(responseObj.emotionalProb)
                setEmotionalProbText(responseObj.emotionalProbText)
                setGynecologicalProb(responseObj.gynecologicalProb)
                setGynecologicalProbText(responseObj.gynecologicalProbText)
                setParkinsons(responseObj.parkinsons)
                setParkinsonsText(responseObj.parkinsonsText)
                setEpilepsy(responseObj.epilepsy)
                setEpilepsyText(responseObj.epilepsyText)
                setNeurologicalProb(responseObj.neurologicalProb)
                setNeurologicalProbText(responseObj.neurologicalProbText)
                setTherapistReferred(responseObj.therapistReferred)
                setTherapistReferredText(responseObj.therapistReferredText)
                setDevelopmentallyDelayed(responseObj.developmentallyDelayed)
                setDevelopmentallyDelayedText(responseObj.developmentallyDelayedText)
                setVitamins(responseObj.vitamins)
                setVitaminsText(responseObj.vitaminsText)
                setLastMenstruation(responseObj.lastMenstruation)
                setHiv(responseObj.hiv)
                setHivText(responseObj.hivText)
                setVomiting(responseObj.vomiting)
                setVomitingText(responseObj.vomitingText)
                setOther(responseObj.other)
            }
        })
    }, [])



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
                    <Button
                        title={LocalizedStrings[language].save}
                        color={'#F77824'}
                        onPress={() => submit()} />
                </View>
            </LinearGradient>
        </ScrollView>
    );
};

export default MedicalPathologies;
