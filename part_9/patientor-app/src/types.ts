// export type Weather = 'sunny' | 'rainy' | 'cloudy' | 'windy' | 'stormy';

export type Gender = 'male' | 'female';

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

export type NonSensitivePatient = Omit<Patient, 'ssn'>;