import addLeadZero from './addLeadZero';

const convertDate = (date: Date): string => {
  const day = addLeadZero(date.getDate());
  const month = addLeadZero(date.getMonth() + 1);
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
};

export default convertDate;
