import React, { useState } from 'react';
import {
  View, Text, TextInput, ScrollView, Button
} from 'react-native';

import { database } from "../../storage/Database";
import { v4 as uuid } from 'uuid';
import styles from '../Style';
import { EventTypes } from '../../enums/EventTypes';
import LinearGradient from 'react-native-linear-gradient';
import { datePicker, radioButtons } from '../Covid19Form'
import { LocalizedStrings } from '../../enums/LocalizedStrings';

export const ClinicalEvaluationDisplay = (metadataObj, language) => {
  return (
    <View>
      <Text>{LocalizedStrings[language].visitDate}: {metadataObj.visitDate} </Text>
      <Text>{LocalizedStrings[language].doctor}: {metadataObj.doctor} </Text>
      <Text>{LocalizedStrings[language].reason}: {metadataObj.reason}</Text>
      <Text>{LocalizedStrings[language].observations}: {metadataObj.observations}</Text>
      <Text>{LocalizedStrings[language].medications}: {metadataObj.medications}</Text>
      <Text>{LocalizedStrings[language].breastExam}: {metadataObj.breastExam ? LocalizedStrings[language].true : LocalizedStrings[language].no}</Text>
      <Text>{LocalizedStrings[language].diagnosis}: {metadataObj.diagnosis}</Text>
      <Text>{LocalizedStrings[language].treatment}: {metadataObj.treatment}</Text>
      <Text>{LocalizedStrings[language].communityVisit}: {metadataObj.communityVisit ? metadataObj.communityVisitDate : LocalizedStrings[language].no}</Text>
      <Text>{LocalizedStrings[language].promoterVisit}: {metadataObj.promoterVisit ? metadataObj.promoterVisitDate : LocalizedStrings[language].no}</Text>
      <Text>{LocalizedStrings[language].refusal}: {metadataObj.refusal ? metadataObj.refusalDate : LocalizedStrings[language].no}</Text>
      <Text>{LocalizedStrings[language].nextVisitDate}: {metadataObj.nextVisitDate}</Text>
      <Text>{LocalizedStrings[language].nextVisitReason}: {metadataObj.nextVisitReason}</Text>
    </View>)
}

const ClinicalEvaluation = (props) => {
  const [reason, setReason] = useState(null);
  const [observations, setObservations] = useState(null);
  const [medications, setMedications] = useState(null);
  const [breastExam, setBreastExam] = useState(null);
  const [diagnosis, setDiagnosis] = useState(null);

  const [treatment, setTreatment] = useState(null);
  const [communityVisit, setCommunityVisit] = useState(null);
  const [communityVisitDate, setCommunityVisitDate] = useState('');
  const [promoterVisit, setPromoterVisit] = useState(null);
  const [promoterVisitDate, setPromoterVisitDate] = useState('');
  const [refusal, setRefusal] = useState(null);
  const [refusalDate, setRefusalDate] = useState('');
  const [nextVisitDate, setNextVisitDate] = useState('');
  const [nextVisitReason, setNextVisitReason] = useState(null);

  const patientId = props.navigation.getParam('patientId');
  const visitId = props.navigation.getParam('visitId');
  const language = props.navigation.getParam('language', 'en');
  const visitDate = props.navigation.getParam('visitDate');
  const userName = props.navigation.getParam('userName');

  const submit = async () => {
    database.addEvent({
      id: uuid(),
      patient_id: patientId,
      visit_id: visitId,
      event_type: EventTypes.Evaluation,
      event_metadata: JSON.stringify({
        doctor: userName,
        visitDate,
        reason,
        observations,
        medications,
        breastExam,
        diagnosis,
        treatment,
        communityVisit,
        communityVisitDate,
        promoterVisit,
        promoterVisitDate,
        refusal,
        refusalDate,
        nextVisitDate,
        nextVisitReason
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
            <Text style={[styles.text, { fontSize: 16, fontWeight: 'bold' }]}>{LocalizedStrings[language].clinicalEvaluation}</Text>
          </View>

          <View style={[styles.responseRow, { paddingBottom: 0 }]}>
            <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].visitDate}: {visitDate}</Text>
          </View>
          <View style={[styles.responseRow, { paddingBottom: 0 }]}>
            <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].doctor}: {userName}</Text>
          </View>

          <View style={[styles.responseRow, { paddingBottom: 0 }]}>
            <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].reason}</Text>
          </View>
          <View style={[styles.responseRow, { padding: 0 }]}>
            <TextInput
              style={styles.inputs}
              onChangeText={(text) => setReason(text)}
              value={reason}
            />
          </View>
          <View style={[styles.responseRow, { paddingVertical: 0 }]}>
            <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].observations}</Text>
          </View>
          <View style={[styles.responseRow, { padding: 0 }]}>
            <TextInput
              style={styles.inputs}
              onChangeText={(text) => setObservations(text)}
              value={observations}
            />
          </View>
          <View style={[styles.responseRow, { paddingVertical: 0 }]}>
            <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].medications}</Text>
          </View>
          <View style={[styles.responseRow, { padding: 0 }]}>
            <TextInput
              style={styles.inputs}
              onChangeText={(text) => setMedications(text)}
              value={medications}
            />
          </View>
          <View style={[styles.responseRow]}>
            {radioButtons({ field: breastExam, action: setBreastExam, prompt: LocalizedStrings[language].breastExam, language })}
          </View>

          <View style={[styles.responseRow, { paddingVertical: 0 }]}>
            <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].diagnosis}</Text>
          </View>
          <View style={[styles.responseRow, { padding: 0 }]}>
            <TextInput
              style={styles.inputs}
              onChangeText={(text) => setDiagnosis(text)}
              value={diagnosis}
            />
          </View>

          <View style={[styles.responseRow, { paddingVertical: 0 }]}>
            <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].treatment}</Text>
          </View>
          <View style={[styles.responseRow, { padding: 0 }]}>
            <TextInput
              style={styles.inputs}
              onChangeText={(text) => setTreatment(text)}
              value={treatment}
            />
          </View>

          <View style={[styles.responseRow]}>
            {radioButtons({ field: communityVisit, action: setCommunityVisit, prompt: LocalizedStrings[language].communityVisit, language })}
          </View>
          <View>{communityVisit ? datePicker({ placeholder: LocalizedStrings[language].date, date: communityVisitDate, action: setCommunityVisitDate, language }) : null}</View>

          <View style={[styles.responseRow]}>
            {radioButtons({ field: promoterVisit, action: setPromoterVisit, prompt: LocalizedStrings[language].promoterVisit, language })}
          </View>
          <View>{promoterVisit ? datePicker({ placeholder: LocalizedStrings[language].date, date: promoterVisitDate, action: setPromoterVisitDate, language }) : null}</View>


          <View style={[styles.responseRow]}>
            {radioButtons({ field: refusal, action: setRefusal, prompt: LocalizedStrings[language].refusal, language })}
          </View>
          <View>{refusal ? datePicker({ placeholder: LocalizedStrings[language].date, date: refusalDate, action: setRefusalDate, language }) : null}</View>

          <View style={[styles.responseRow, { paddingVertical: 0 }]}>
            <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].nextVisitDate}</Text>
          </View>
          <View>{datePicker({ placeholder: LocalizedStrings[language].nextVisit, date: nextVisitDate, action: setNextVisitDate, future: true, language })}</View>

          <View style={[styles.responseRow, { paddingVertical: 0 }]}>
            <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].nextVisitReason}</Text>
          </View>
          <View style={[styles.responseRow, { paddingHorizontal: 0, paddingTop: 0 }]}>
            <TextInput
              style={styles.inputs}
              onChangeText={(text) => setNextVisitReason(text)}
              value={nextVisitReason}
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

export default ClinicalEvaluation;
