import { DocumentTypes } from '../../types/TicketForm';

export const documentNumberValidator = (value: string, documentType: string): string => {
  if (!value) return 'Обязательное поле';
  if (
    (documentType === DocumentTypes.PASSPORT_RU && !/^\d{4} \d{6}$/.test(value))
    || (documentType === DocumentTypes.PASSPORT_INTERNATIONAL && !/^\d{2} \d{7}$/.test(value))
    || (documentType === DocumentTypes.BIRTH_CERTIFICATE && !/^[XVIxvi]{3}-[А-Яа-я]{2} \d{6}$/.test(value))
  ) {
    return 'Неправильный формат номера';
  }
  return '';
};

export const SNILSValidator = (value: string): string => {
  if (!value) return 'Обязательное поле';
  if (!/^\d{3}-\d{3}-\d{3} \d{2}$/.test(value)) {
    return 'Неправильный формат номера';
  }
  return '';
};

export const FCsValidator = (value: string): string => {
  if (!value) return 'Обязательное поле';
  if (!/^[А-Яа-я-]+$/.test(value)) return 'Недопустимые символы';
  return '';
};

export const requiredValidator = (value: any): string => {
  if (!value) return 'Обязательное поле';
  return '';
};

export const dateValidator = (value: Date | null, min: Date, max: Date): string => {
  if (!value) return 'Обязательное поле';
  if (value > max || value < min) return 'Недопустимая дата';
  return '';
};

export const emailValidator = (value?: string): string => {
  if (!value) return 'Обязательное поле';
  if (!/^[A-Z\d._%+-]+@[A-Z\d.-]+\.[A-Z]{2,4}$/i.test(value)) return 'Неверный формат';
  return '';
};

export const phoneNumberValidator = (value?: string): string => {
  if (!value) return 'Обязательное поле';
  if (!/^\+7-\d{3}-\d{2}-\d{2}-\d{3}$/.test(value)) return 'Неверный формат';
  return '';
};
