import React, { useState, useEffect, useRef } from "react";
import { View, Text, Image as Image, TextInput, FlatList, TouchableOpacity, ImageBackground, Keyboard, Picker, Modal, TouchableHighlight, Button, ScrollView } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import { database } from "../storage/Database";
import { DatabaseSync } from "../storage/Sync";
import { ImageSync } from '../storage/ImageSync';
import styles from './Style';
import { iconHash } from '../services/hash'
import { LocalizedStrings } from '../enums/LocalizedStrings';
import { icons } from '../enums/Icons';
import DatePicker from "react-native-datepicker";

const PatientList = (props) => {
  const databaseSync: DatabaseSync = new DatabaseSync();
  const imageSync: ImageSync = new ImageSync();
  const email = props.navigation.state.params.email;
  const password = props.navigation.state.params.password;
  const clinicId = props.navigation.state.params.clinicId;
  const instanceUrl = props.navigation.state.params.instanceUrl;
  const [userId, setUserId] = useState(props.navigation.state.params.userId);
  const [list, setList] = useState([]);
  const [patientCount, setPatientCount] = useState(0);
  const [givenName, setGivenName] = useState('');
  const [surname, setSurname] = useState('');
  const [patientIdNv, setPatientIdNv] = useState('');
  const [male, setMale] = useState(null);
  const [medicalNum, setMedicalNum] = useState('');
  const [dentalNum, setDentalNum] = useState('');
  const [optometryNum, setOptometryNum] = useState('');
  const [community, setCommunity] = useState('');
  const [zone, setZone] = useState('');
  const [block, setBlock] = useState('');
  const [lot, setLot] = useState('');
  const [bloodType, setBloodType] = useState('');
  const [visitDate, setVisitDate] = useState('');
  const [dob, setDob] = useState('');
  const [minAge, setMinAge] = useState<number>(0);
  const [maxAge, setMaxAge] = useState<number>(0);

  const [modalVisible, setModalVisible] = useState(false);
  const [language, setLanguage] = useState(props.navigation.getParam('language', 'sp'));
  const [searchIconFunction, setSearchIconFunction] = useState(false)
  const search = useRef(null);

  const today = new Date();

  useEffect(() => {
    searchPatients()
  }, [props.navigation.state.params.reloadPatientsToggle, language])

  useEffect(() => {
    if (!!props.navigation.getParam('imagesSynced')) {
      props.navigation.state.params.imagesSynced.then(() => {
        reloadPatients()
      })
    }

    if (!!props.navigation.getParam('language') && language !== props.navigation.getParam('language')) {
      setLanguage(props.navigation.getParam('language'));
    }
  }, [props])

  const keyExtractor = (item, index) => index.toString()

  const reloadPatients = () => {
    database.getPatients().then(patients => {
      setList(patients);
      setGivenName('');
      setSurname('');
      setMale(null);
      setMinAge(0);
      setMaxAge(0);
      setMedicalNum('');
      setDentalNum('');
      setOptometryNum('');
      setCommunity('');
      setZone('');
      setBlock('');
      setLot('');
      setBloodType('');
      setVisitDate('');
    })
    database.getPatientCount().then(number => setPatientCount(number))
  }


  const radioButtons = (props) => {
    return (
      <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between', height: 40, alignItems: 'center' }}>
        <Text style={{ flex: 1, flexDirection: 'column', flexWrap: 'wrap' }}>{props.prompt}</Text>
        <View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => setMale(!male)}>
              <View style={[styles.outerRadioButton, { borderColor: 'black' }]}>
                {male ? <View style={styles.selectedRadioButton} /> : null}
              </View>
            </TouchableOpacity>
            <Text>M</Text>

            <TouchableOpacity onPress={() => {
              male === null ? setMale(false) : setMale(!male)
            }
            }>
              <View style={[styles.outerRadioButton, { borderColor: 'black' }]}>
                {(!male && male !== null) ? <View style={styles.selectedRadioButton} /> : null}
              </View>
            </TouchableOpacity>
            <Text>F</Text>
          </View>
        </View>
      </View>
    )
  }

  const searchPatients = () => {
    const currentYear = new Date().getFullYear()
    if (patientIdNv.length > 0 || givenName.length > 0 || surname.length > 0 || maxAge > 0 || dob.length > 0 || male !== null ||
      medicalNum.length > 0 || dentalNum.length > 0 || optometryNum.length > 0 || community.length > 0 || zone.length > 0 || block.length > 0 || lot.length > 0 ||
      bloodType.length > 0 || visitDate.length > 0) {
      const givenNameLC = givenName.toLowerCase();
      const surnameLC = surname.toLowerCase();

      let gender = null
      if (male !== null) {
        gender = male ? 'M' : 'F'
      }
      const minYear = (maxAge > 0 && maxAge >= minAge) ? currentYear - maxAge : null;
      const maxYear = (maxAge > 0 && maxAge >= minAge) ? currentYear - minAge : null;

      database.searchPatients(patientIdNv, givenNameLC, surnameLC, gender, minYear, maxYear, dob, medicalNum,
        dentalNum, optometryNum, community, zone, block, lot, bloodType, visitDate).then(patients => {
          setList(patients);
          setPatientCount(patients.length)
        })
    } else {
      reloadPatients()
    }
    setSearchIconFunction(false)
  }

  const LanguageToggle = () => {
    return (
      <Picker
        selectedValue={language}
        onValueChange={value => setLanguage(value)}
        style={styles.picker}
      >
        <Picker.Item value='en' label='en' />
        {/* <Picker.Item value='ar' label='ar' /> */}
        <Picker.Item value='sp' label='sp' />
      </Picker>
    )
  }

  const agePicker = () => {
    let ages = []
    let i = 0;
    for (i; i < 110; i++) {
      ages.push(<Picker.Item key={i} value={i} label={i.toString()} />)
    }
    return ages;
  }

  const logout = () => {
    setUserId('')
    props.navigation.navigate('Home', { logout: true })
  }

  const displayName = (item) => {
    if (!!item.given_name.content[language] && !!item.surname.content[language]) {
      return <Text>{`${item.given_name.content[language]} ${item.surname.content[language]}`}</Text>
    } else {
      item.given_name.content[Object.keys(item.given_name.content)[0]]
      return <Text>{`${item.given_name.content[Object.keys(item.given_name.content)[0]]} ${item.surname.content[Object.keys(item.surname.content)[0]]}`}</Text>
    }
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => props.navigation.navigate('PatientView',
      {
        language: language,
        patient: item,
        reloadPatientsToggle: props.navigation.state.params.reloadPatientsToggle,
        clinicId: clinicId,
        userId: userId
      }
    )}>
      <View style={styles.cardContent}>
        {!!item.image_timestamp ?
          <ImageBackground source={{ uri: `${imageSync.imgURI(item.id)}/${item.image_timestamp}.jpg` }} style={{ width: 100, height: 100, justifyContent: 'center' }}>
            <View style={styles.hexagon}>
              <View style={styles.hexagonBefore} />
              <View style={styles.hexagonAfter} />
            </View>
          </ImageBackground> :
          <Image source={icons[iconHash(item.id)]} style={{ width: 100, height: 100, justifyContent: 'center' }} />}
        <View style={{ flexShrink: 1, marginLeft: 20 }}>
          {displayName(item)}
          <View
            style={{
              marginVertical: 5,
              borderBottomColor: 'black',
              borderBottomWidth: 1,
            }}
          />
          <Text style={{ flexWrap: 'wrap' }}>{`${LocalizedStrings[language].dob}:  ${item.date_of_birth}`}</Text>
          <Text>{`${LocalizedStrings[language].sex}:  ${item.sex}`}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )

  return (
    <LinearGradient colors={['#31BBF3', '#4D7FFF']} style={styles.main}>
      <View style={styles.listContainer}>
        <View style={styles.searchBar}>
          <TextInput
            style={styles.searchInput}
            placeholderTextColor='#FFFFFF'
            placeholder={LocalizedStrings[language].patientSearch}
            onChangeText={(text) => setGivenName(text)}
            onEndEditing={searchPatients}
            onFocus={() => setSearchIconFunction(true)}
            value={givenName}
            ref={search}
          />
          <TouchableOpacity onPress={() => {
            if (searchIconFunction) {
              searchPatients()
              Keyboard.dismiss()
            } else {
              search.current.focus()
              setSearchIconFunction(true)
            }
          }}>
            <Image source={require('../images/search.jpg')} style={{ width: 30, height: 30 }} />
          </TouchableOpacity>
        </View>

        <View style={[styles.searchBar, { marginTop: 0, justifyContent: 'space-around' }]}>
          <Text style={styles.text}>{patientCount} {LocalizedStrings[language].patients}</Text>
          <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
            <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].advancedFilters}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => reloadPatients()}>
            <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].clearFilters}</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.searchBar, { marginTop: 0, justifyContent: 'center' }]}>
          {LanguageToggle()}
          <TouchableOpacity onPress={async () => {
            await databaseSync.performSync(instanceUrl, email, password, language)
            await imageSync.syncPhotos(instanceUrl, email, password)
            reloadPatients()
          }}
            style={{ marginLeft: 50, marginRight: 100 }}>
            <Image source={require('../images/sync.png')} style={{ width: 30, height: 30 }} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => logout()}>
            <Image source={require('../images/logout.png')} style={{ width: 30, height: 30 }} />
          </TouchableOpacity>
        </View>
        <View style={styles.scroll}>
          <FlatList
            keyExtractor={keyExtractor}
            data={list}
            renderItem={(item) => renderItem(item)}
          />
        </View>

        <View style={{ position: 'absolute', bottom: 20, right: 20 }}>
          <Button
            color={'#F77824'}
            title={LocalizedStrings[language].newPatient}
            onPress={() => props.navigation.navigate('NewPatient',
              {
                reloadPatientsToggle: props.navigation.state.params.reloadPatientsToggle,
                language: language
              }
            )} />
        </View>
      </View>
      <Modal
        animationType="fade"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.leftView}>
            <View style={[styles.modalView, { alignItems: 'stretch', justifyContent: 'space-between', flex: 1 }]}>
              <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>

                <TouchableHighlight
                  onPress={() => {
                    setModalVisible(!modalVisible);
                    setSearchIconFunction(true)
                  }}
                >
                  <Image source={require('../images/close.png')} style={{ width: 15, height: 15 }} />
                </TouchableHighlight>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <TextInput
                  style={styles.searchModalInput}
                  placeholder={LocalizedStrings[language].firstName + '(s)'}
                  onChangeText={(text) => setGivenName(text)}
                  value={givenName}
                />
                <TextInput
                  style={styles.searchModalInput}
                  placeholder={LocalizedStrings[language].surname + '(s)'}
                  onChangeText={(text) => setSurname(text)}
                  value={surname}
                />
              </View>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <TextInput
                  style={styles.searchModalInput}
                  placeholder={LocalizedStrings[language].patientId}
                  onChangeText={(text) => setPatientIdNv(text)}
                  value={patientIdNv}
                />
                <DatePicker
                  style={[styles.searchModalInput, { paddingLeft: 10 }]}
                  date={dob}
                  mode="date"
                  placeholder={LocalizedStrings[language].dob}
                  format="YYYY-MM-DD"
                  minDate="1900-05-01"
                  maxDate={today.toISOString().split('T')[0]}
                  confirmBtnText={LocalizedStrings[language].confirm}
                  cancelBtnText={LocalizedStrings[language].cancel}
                  customStyles={{
                    dateInput: {
                      alignItems: 'flex-start',
                      borderWidth: 0
                    }
                  }}
                  androidMode='spinner'
                  onDateChange={(date) => {
                    setDob(date)
                  }}
                />
              </View>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View>
                  {radioButtons({ prompt: LocalizedStrings[language].gender })}
                </View>

                <DatePicker
                  style={[styles.searchModalInput, { paddingLeft: 10 }]}
                  date={visitDate}
                  mode="date"
                  placeholder={LocalizedStrings[language].visitDate}
                  format="YYYY-MM-DD"
                  minDate="1900-05-01"
                  maxDate={today.toISOString().split('T')[0]}
                  confirmBtnText={LocalizedStrings[language].confirm}
                  cancelBtnText={LocalizedStrings[language].cancel}
                  customStyles={{
                    dateInput: {
                      alignItems: 'flex-start',
                      borderWidth: 0
                    }
                  }}
                  androidMode='spinner'
                  onDateChange={(date) => {
                    setVisitDate(date)
                  }}
                />
              </View>


              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <TextInput
                  style={styles.searchModalInput}
                  placeholder={LocalizedStrings[language].medicalNum}
                  onChangeText={(text) => setMedicalNum(text)}
                  value={medicalNum}
                />
                <TextInput
                  style={styles.searchModalInput}
                  placeholder={LocalizedStrings[language].dentalNum}
                  onChangeText={(text) => setDentalNum(text)}
                  value={dentalNum}
                />
              </View>


              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <TextInput
                  style={styles.searchModalInput}
                  placeholder={LocalizedStrings[language].optometryNum}
                  onChangeText={(text) => setOptometryNum(text)}
                  value={optometryNum}
                />
                <TextInput
                  style={styles.searchModalInput}
                  placeholder={LocalizedStrings[language].community}
                  onChangeText={(text) => setCommunity(text)}
                  value={community}
                />
              </View>


              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <TextInput
                  style={styles.searchModalInput}
                  placeholder={LocalizedStrings[language].zone}
                  onChangeText={(text) => setZone(text)}
                  value={zone}
                />
                <TextInput
                  style={styles.searchModalInput}
                  placeholder={LocalizedStrings[language].block}
                  onChangeText={(text) => setBlock(text)}
                  value={block}
                />
              </View>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <TextInput
                  style={styles.searchModalInput}
                  placeholder={LocalizedStrings[language].lot}
                  onChangeText={(text) => setLot(text)}
                  value={lot}
                />
                <Picker
                  selectedValue={bloodType}
                  onValueChange={value => setBloodType(value)}
                  style={{ width: 150, height: 40 }}
                >
                  <Picker.Item value='' label={LocalizedStrings[language].bloodType} />
                  <Picker.Item value='A+' label='A+' />
                  <Picker.Item value='B+' label='B+' />
                  <Picker.Item value='AB+' label='AB+' />
                  <Picker.Item value='O+' label='O+' />
                  <Picker.Item value='A-' label='A-' />
                  <Picker.Item value='B-' label='B-' />
                  <Picker.Item value='AB-' label='AB-' />
                  <Picker.Item value='O-' label='O-' />
                </Picker>
              </View>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ paddingTop: 15, paddingRight: 5 }}>{LocalizedStrings[language].minAge}</Text>
                <Picker
                  selectedValue={minAge}
                  onValueChange={value => setMinAge(value)}
                  style={{
                    height: 50,
                    width: 90
                  }}
                >
                  {agePicker()}
                </Picker>
                <Text style={{ paddingTop: 15, paddingRight: 5, paddingLeft: 5 }}>{LocalizedStrings[language].maxAge}</Text>
                <Picker
                  selectedValue={maxAge}
                  onValueChange={value => setMaxAge(value)}
                  style={{
                    height: 50,
                    width: 90
                  }}
                >
                  {agePicker()}
                </Picker>
              </View>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Button
                  title={LocalizedStrings[language].clearFilters}
                  color={'red'}
                  onPress={() => {
                    reloadPatients()
                  }}
                >
                </Button>
                <Button
                  title={LocalizedStrings[language].search}
                  onPress={() => {
                    Keyboard.dismiss()
                    setModalVisible(!modalVisible);
                    searchPatients()
                  }}>
                </Button>
              </View>
            </View>
          </View>
        </ScrollView>
      </Modal>
    </LinearGradient>
  )
}

export default PatientList;