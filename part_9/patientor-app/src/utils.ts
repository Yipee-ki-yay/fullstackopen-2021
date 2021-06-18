/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewPatient, Gender, NewEntry, Discharge, Diagnose, HealthCheckRating, SickLeave } from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name');
  }

  return name;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
      throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
      throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

const parseDiagnosisCode = (diagnosisCode: any): Array<Diagnose["code"]> => {
  if (!diagnosisCode) return diagnosisCode;

  if (!Array.isArray(diagnosisCode)) {
    throw new Error("Incorrect diagnosisCode");
  }

  const validDiagnosisCodes = diagnosisCode.every((code: any) =>
    isString(code)
  );

  if (validDiagnosisCodes) {
    return diagnosisCode;
  } else {
    throw new Error("Incorrect diagnosisCode");
  }
};

const isHealthCheckRating = (rating: any): rating is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(rating);
};

const parseHealthCheckRating = (rating: any): HealthCheckRating => {
  if (
    rating === "undefined" ||
    rating === null ||
    !isHealthCheckRating(rating)
  ) {
    throw new Error("Incorrect or missing health check rating: " + rating);
  }
  return rating;
};

const parseDischargeCriteria = (criteria: unknown): string => {
  if (!criteria || !isString(criteria)) {
    throw new Error("Incorrect or missing discharge criteria");
  }
  return criteria;
};

const parseDischarge = (discharge: any): Discharge => {
  if (
    !discharge ||
    (Object.keys(discharge).length === 0 && discharge.constructor === Object)
  ) {
    return discharge;
  } else {
    if (!discharge.date) {
      throw new Error("Incorrect or missing discharge-date");
    }
    if (!discharge.criteria) {
      throw new Error("Incorrect or missing discharge-criteria");
    }
    const dischargeDate = parseDate(discharge.date);
    const dischargeCriteria = parseDischargeCriteria(discharge.criteria);

    return {
      date: dischargeDate,
      criteria: dischargeCriteria,
    };
  }
};

const parseEmployerName = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error("Incorrect or missing employername");
  }
  return name;
};

const parseSickLeave = (sickleave: any): SickLeave => {
  if (
    !sickleave ||
    (Object.keys(sickleave).length === 0 && sickleave.constructor === Object)
  ) {
    return sickleave;
  } else {
    if (!sickleave.startDate) {
      throw new Error("Incorrect or missing start date for sickleave");
    }
    if (!sickleave.endDate) {
      throw new Error("Incorrect or missing end date for sickleave");
    }
    const startDate = parseDate(sickleave.startDate);
    const endDate = parseDate(sickleave.endDate);

    return {
      startDate,
      endDate,
    };
  }
};

type Fields = { name : unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown };

export const toNewPatient = ({name, dateOfBirth, ssn, gender, occupation}: Fields): NewPatient => {
  const newEntry: NewPatient = {
    name: parseName(name),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseName(ssn),
    gender: parseGender(gender),
    occupation: parseName(occupation),
    entries: [],
  };

  return newEntry;
};

type EntryFields = { type: unknown, description : unknown, date: unknown, specialist: unknown, 
  diagnosisCodes?: unknown, healthCheckRating?: unknown, discharge?: unknown, employerName?: unknown, sickLeave?: unknown };

export const toNewEntry = ({type, description, date, specialist, diagnosisCodes, 
  healthCheckRating, discharge, employerName, sickLeave}: EntryFields): NewEntry | undefined | void => {
  const baseEntry = {
    description: parseName(description),
    date: parseDate(date),
    specialist: parseName(specialist),
    diagnosisCodes: parseDiagnosisCode(diagnosisCodes)
  };

  switch (type) {
    case "Hospital":
      return {
        ...baseEntry,
        type: type,
        discharge: parseDischarge(discharge),
      };
    case "HealthCheck":
      return {
        ...baseEntry,
        type: type,
        healthCheckRating: parseHealthCheckRating(
          healthCheckRating
        ),
      };
    case "OccupationalHealthcare":
      return {
        ...baseEntry,
        type: type,
        employerName: parseEmployerName(employerName),
        sickLeave: parseSickLeave(sickLeave),
      };
  }
};
