export enum DocumentTypes {
  PASSPORT_RU = 'PASSPORT_RU',
  PASSPORT_INTERNATIONAL = 'PASSPORT_INTERNATIONAL',
  BIRTH_CERTIFICATE = 'BIRTH_CERTIFICATE',
}

export interface Passenger {
  isFSS: boolean;
  SNILS: string;
  surname: string;
  firstName: string;
  patronymic: string;
  gender: '' | 'male' | 'female';
  birthDate: Date | null;
  country: string;
  documentType: DocumentTypes;
  documentNumber: string;
  tariff: 'full' | 'child';
  sendNotifications: boolean;
  email: string;
  phoneNumber: string;
}

export interface TicketFormValues {
  passengers: Passenger[];
}

export type PassengerErrors = {
  [K in keyof Passenger]?: string;
};

export interface TicketFormErrors {
  passengers?: PassengerErrors[];
}

export interface TicketFormSelectOption {
  value: string;
  label: string;
}
