import { DocumentTypes, TicketFormSelectOption } from '../../types/TicketForm';

export const countriesList: TicketFormSelectOption[] = [
  {
    value: 'Russia',
    label: 'Россия',
  },
  {
    value: 'Belarus',
    label: 'Беларусь',
  },
  {
    value: 'Kazakhstan',
    label: 'Казахстан',
  },
  {
    value: 'Other',
    label: 'Другое',
  },
];

export const gendersList: TicketFormSelectOption[] = [
  {
    value: '',
    label: 'не выбрано',
  },
  {
    value: 'male',
    label: 'Мужской',
  },
  {
    value: 'female',
    label: 'Женский',
  },
];

export const documentTypesList: TicketFormSelectOption[] = [
  {
    value: DocumentTypes.PASSPORT_RU,
    label: 'Паспорт РФ',
  },
  {
    value: DocumentTypes.PASSPORT_INTERNATIONAL,
    label: 'Заграничный паспорт РФ',
  },
  {
    value: DocumentTypes.BIRTH_CERTIFICATE,
    label: 'Свидетельство о рождении',
  },
];

export const tariffList: TicketFormSelectOption[] = [
  {
    value: 'full',
    label: 'Полный',
  },
  {
    value: 'child',
    label: 'Детский',
  },
];
