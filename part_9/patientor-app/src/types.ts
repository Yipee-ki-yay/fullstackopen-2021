// export type Weather = 'sunny' | 'rainy' | 'cloudy' | 'windy' | 'stormy';

// export type Gender = 'male' | 'female';

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}

export interface Patient {
  id: string | number;
  name: string;
  dateOfBirth: string | number;
  ssn: string | number;
  gender: Gender;
  occupation: string;
}

export type NewPatient = Omit<Patient, 'id'>;

export type NonSensitivePatient = Omit<Patient, 'ssn'>;