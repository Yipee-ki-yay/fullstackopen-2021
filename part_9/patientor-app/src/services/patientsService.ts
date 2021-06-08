// import diaryData from '../../data/diaries';
import patients from '../../data/patients';
import { NonSensitivePatient, Patient } from '../types';
// const diaries: Array<DiaryEntry> = diaryData as Array<DiaryEntry>;

const getEntries = (): Array<Patient> => {
  return patients;
};

const getNonSensitivePatient = (): NonSensitivePatient [] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id, 
    name, 
    dateOfBirth, 
    gender, 
    occupation,
  }));
};

const addEntry = () => {
  return null;
};

export default {
  getEntries,
  addEntry,
  getNonSensitivePatient
};