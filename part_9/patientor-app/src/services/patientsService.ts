// import diaryData from '../../data/diaries';
import patients from '../../data/patients';
// import { NonSensitivePatient, Patient, NewPatient, PublicPatient } from '../types';
import { Patient, NewPatient, PublicPatient, NewEntry, Entry } from '../types';
import {v1 as uuid} from 'uuid';
// const diaries: Array<DiaryEntry> = diaryData as Array<DiaryEntry>;

const getEntries = (): Array<Patient> => {
  return patients;
};

const findById = (id: string): Patient | undefined => {
  const patient = patients.find(patient => patient.id === id);
  return patient;
};

const getNonSensitivePatient = (): PublicPatient [] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id, 
    name, 
    dateOfBirth, 
    gender, 
    occupation,
  }));
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...patient
  };

  patients.push(newPatient);
  return newPatient;
};

const addEntry = (patient: Patient, newEntry: NewEntry): Patient => {
  const id: string = uuid();

  const entryToAdd: Entry = {
    ...newEntry,
    id,
  };
  patient.entries.push(entryToAdd);

  return patient;
};

export default {
  getEntries,
  addPatient,
  getNonSensitivePatient,
  findById,
  addEntry,
};