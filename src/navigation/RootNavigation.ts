import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import Login from '../components/Login';
import PatientList from '../components/PatientList';
import NewPatient from '../components/NewPatient';
import PatientView from '../components/PatientView';
import NewVisit from '../components/NewVisit';
import Covid19Form from '../components/Covid19Form';
import EditPatient from '../components/EditPatient';
import OpenTextEvent from '../components/OpenTextEvent';
import EditOpenTextEvent from '../components/EditOpenTextEvent';
import Vitals from '../components/Vitals';
import VisitList from '../components/VisitList';
import EventList from '../components/EventList';
import EditVitals from '../components/EditVitals';
import PrescriptionList from '../components/PrescriptionList';
import MedicalHistory from '../components/nv_events/MedicalHistory';
import VitalSigns from '../components/nv_events/VitalSigns';
import ClinicalEvaluation from '../components/nv_events/ClinicalEvaluation';
import MedicalPathologies from '../components/nv_events/MedicalPathologies';
import PatientDetails from '../components/nv_events/PatientDetails';
import Medicines from '../components/nv_events/Medicines';
import SnapshotList from '../components/SnapshotList';
import PsychologicalPathologies from '../components/nv_events/PsychologicalPathologies';
import HouseholdEnvironment from '../components/nv_events/HouseholdEnvironment';
import LabOrders from '../components/nv_events/LabOrders';
import LabTests from '../components/nv_events/LabTests';
import DentalTreatment from '../components/nv_events/DentalTreatment';
import UrineTests from '../components/nv_events/UrineTests';
import PAPResults from '../components/nv_events/PAPResults';
import Ultrasound from '../components/nv_events/Ultrasound';
import DentalOrigin from '../components/nv_events/DentalOrigin';
import FamilyPlanning from '../components/nv_events/FamilyPlanning';
import ProgramTrainings from '../components/nv_events/ProgramTrainings';
import XrayOrders from '../components/nv_events/XrayOrders';
import XrayResults from '../components/nv_events/XrayResults';
import Optometry from '../components/nv_events/Optometry';
import AccidentReport from '../components/nv_events/AccidentReport';
import EditMedicines from '../components/edit_events/EditMedicines';

const rootNavigator = createStackNavigator(
  {
    Home: {
      screen: Login,
      navigationOptions: () => ({
        title: `Login`,
        header: null,
      })
    },
    PatientList: {
      screen: PatientList,
      navigationOptions: () => ({
        title: `PatientList`,
        header: null,
      })
    },
    NewPatient: {
      screen: NewPatient,
      navigationOptions: () => ({
        title: `NewPatient`,
        header: null,
      })
    },
    PatientView: {
      screen: PatientView,
      navigationOptions: () => ({
        title: `PatientView`,
        header: null,
      })
    },
    EditPatient: {
      screen: EditPatient,
      navigationOptions: () => ({
        title: `EditPatient`,
        header: null,
      })
    },
    NewVisit: {
      screen: NewVisit,
      navigationOptions: () => ({
        title: `NewVisit`,
        header: null,
      })
    },
    Covid19Form: {
      screen: Covid19Form,
      navigationOptions: () => ({
        title: `Covid19Form`,
        header: null
      })
    },
    OpenTextEvent: {
      screen: OpenTextEvent,
      navigationOptions: () => ({
        title: `OpenTextEvent`,
        header: null
      })
    },
    EditOpenTextEvent: {
      screen: EditOpenTextEvent,
      navigationOptions: () => ({
        title: `EditOpenTextEvent`,
        header: null
      })
    },
    Vitals: {
      screen: Vitals,
      navigationOptions: () => ({
        title: `Vitals`,
        header: null
      })
    },
    EditVitals: {
      screen: EditVitals,
      navigationOptions: () => ({
        title: `EditVitals`,
        header: null
      })
    },
    VisitList: {
      screen: VisitList,
      navigationOptions: () => ({
        title: `VisitList`,
        header: null
      })
    },
    EventList: {
      screen: EventList,
      navigationOptions: () => ({
        title: `EventList`,
        header: null
      })
    },
    PrescriptionList: {
      screen: PrescriptionList,
      navigationOptions: () => ({
        title: `PrescriptionList`,
        header: null
      })
    },
    MedicalHistory: {
      screen: MedicalHistory,
      navigationOptions: () => ({
        title: `MedicalHistory`,
        header: null
      })
    },
    VitalSigns: {
      screen: VitalSigns,
      navigationOptions: () => ({
        title: `VitalSigns`,
        header: null
      })
    },
    ClinicalEvaluation: {
      screen: ClinicalEvaluation,
      navigationOptions: () => ({
        title: `ClinicalEvaluation`,
        header: null
      })
    },
    MedicalPathologies: {
      screen: MedicalPathologies,
      navigationOptions: () => ({
        title: 'MedicalPathologies',
        header: null
      })
    },
    PatientDetails: {
      screen: PatientDetails,
      navigationOptions: () => ({
        title: 'PatientDetails',
        header: null
      })
    },
    Medicines: {
      screen: Medicines,
      navigationOptions: () => ({
        title: 'Medicines',
        header: null
      })
    },
    EditMedicines: {
      screen: EditMedicines,
      navigationOptions: () => ({
        title: 'EditMedicines',
        header: null
      })
    },
    PsychologicalPathologies: {
      screen: PsychologicalPathologies,
      navigationOptions: () => ({
        title: 'PsychologicalPathologies',
        header: null
      })
    },
    HouseholdEnvironment: {
      screen: HouseholdEnvironment,
      navigationOptions: () => ({
        title: 'HouseholdEnvironment',
        header: null
      })
    },
    LabOrders: {
      screen: LabOrders,
      navigationOptions: () => ({
        title: 'LabOrders',
        header: null
      })
    },
    LabTests: {
      screen: LabTests,
      navigationOptions: () => ({
        title: 'LabTests',
        header: null
      })
    },
    SnapshotList: {
      screen: SnapshotList,
      navigationOptions: () => ({
        title: 'SnapshotList',
        header: null
      })
    },
    UrineTests: {
      screen: UrineTests,
      navigationOptions: () => ({
        title: 'UrineTests',
        header: null
      })
    },
    PAPResults: {
      screen: PAPResults,
      navigationOptions: () => ({
        title: 'PAPResults',
        header: null
      })
    },
    Ultrasound: {
      screen: Ultrasound,
      navigationOptions: () => ({
        title: 'Ultrasound',
        header: null
      })
    },
    FamilyPlanning: {
      screen: FamilyPlanning,
      navigationOptions: () => ({
        title: 'FamilyPlanning',
        header: null
      })
    },
    DentalOrigin: {
      screen: DentalOrigin,
      navigationOptions: () => ({
        title: 'Ultrasound',
        header: null
      })
    },
    DentalTreatment: {
      screen: DentalTreatment,
      navigationOptions: () => ({
        title: 'DentalTreatment',
        header: null
      })
    },
    ProgramTrainings: {
      screen: ProgramTrainings,
      navigationOptions: () => ({
        title: 'ProgramTrainings',
        header: null
      })
    },
    XrayOrders: {
      screen: XrayOrders,
      navigationOptions: () => ({
        title: 'XrayOrders',
        header: null
      })
    },
    XrayResults: {
      screen: XrayResults,
      navigationOptions: () => ({
        title: 'XrayResults',
        header: null
      })
    },
    Optometry: {
      screen: Optometry,
      navigationOptions: () => ({
        title: 'Optometry',
        header: null
      })
    },
    AccidentReport: {
      screen: AccidentReport,
      navigationOptions: () => ({
        title: 'AccidentReport',
        header: null
      })
    },
  },
  {
    initialRouteName: 'Home'
  });

export default createAppContainer(rootNavigator);