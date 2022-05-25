import React, { ReactNode } from 'react';
import {
  Form,
  Formik,
  Field,
  FieldArray,
  FormikErrors,
  FormikHelpers,
} from 'formik';
import ReactDatePicker, { registerLocale } from 'react-datepicker';
import ru from 'date-fns/locale/ru';
import ReactInputMask from 'react-input-mask';
import FormField from '../FormField/FormField';
import FormLabel from '../FormLabel/FormLabel';
import convertDate from '../../utils/convertDate';
import {
  Passenger,
  PassengerErrors,
  TicketFormErrors,
  TicketFormSelectOption,
  TicketFormValues,
  DocumentTypes,
} from '../../types/TicketForm';
import FormFieldWrapper from '../FormFieldWrapper/FormFieldWrapper';
import FormCheckbox from '../FormField/FormCheckbox';
import FormFieldError from '../FormField/FormFieldError';
import getClassList from '../../utils/getClassList';
import ModifyPassengersButton from '../ModifyPassengersButton/ModifyPassengersButton';
import FormButton from '../FormButton/FormButton';
import FormButtons from '../FormButtons/FormButtons';
import TicketService from '../../service/TicketService';
import verifyAge from '../../utils/verifyAge';
import {
  dateValidator,
  documentNumberValidator,
  emailValidator,
  FCsValidator,
  phoneNumberValidator,
  requiredValidator,
  SNILSValidator,
} from './validators';
import {
  countriesList,
  documentTypesList,
  gendersList,
  tariffList,
} from './lists';
import { documentNumberHint, phoneNumberHint, SNILSNumberHint } from './hints';
import FieldsGroup from '../FieldsGroup/FieldsGroup';
import FormHint from '../FormHint/FormHint';

registerLocale('ru', ru);

const passengerBase: Passenger = {
  isFSS: false,
  SNILS: '',
  surname: '',
  firstName: '',
  patronymic: '',
  gender: '',
  birthDate: null,
  country: 'Россия',
  documentType: DocumentTypes.PASSPORT_RU,
  documentNumber: '',
  tariff: 'full',
  sendNotifications: true,
  email: '',
  phoneNumber: '',
};

const mapOptionsList = (options: TicketFormSelectOption[]): ReactNode[] => options.map(({ value, label }) => (
  <option
    key={value}
    value={value}
  >
    {label}
  </option>
));

const TicketForm = () => {
  const initialValues: TicketFormValues = {
    passengers: [
      passengerBase,
    ],
  };
  const validationHandler = ({ passengers }: TicketFormValues) => {
    const passengersErrors: PassengerErrors[] = passengers.map(({
      isFSS,
      SNILS,
      firstName,
      surname,
      patronymic,
      gender,
      birthDate,
      country,
      documentType,
      documentNumber,
      sendNotifications,
      email,
      phoneNumber,
    }) => {
      const passengerErrors: PassengerErrors = {};
      if (isFSS) {
        passengerErrors.SNILS = SNILSValidator(SNILS);
      } else {
        passengerErrors.firstName = FCsValidator(firstName);
        passengerErrors.surname = FCsValidator(surname);
        passengerErrors.patronymic = FCsValidator(patronymic);
        passengerErrors.gender = requiredValidator(gender);
        passengerErrors.birthDate = dateValidator(birthDate, new Date('1900-01-01'), new Date());
      }
      passengerErrors.country = requiredValidator(country);
      passengerErrors.documentType = requiredValidator(documentType);
      passengerErrors.documentNumber = documentNumberValidator(documentNumber, documentType);
      if (sendNotifications) {
        const emailValidationResult = emailValidator(email);
        const phoneNumberValidationResult = phoneNumberValidator(phoneNumber);

        if (emailValidationResult && phoneNumberValidationResult) {
          passengerErrors.email = emailValidationResult;
          passengerErrors.phoneNumber = phoneNumberValidationResult;
        } else if (email && emailValidationResult) {
          passengerErrors.email = emailValidationResult;
        } else if (phoneNumber && phoneNumberValidationResult) {
          passengerErrors.phoneNumber = phoneNumberValidationResult;
        }
      }

      const allFieldsValid = Object.values(passengerErrors).reduce(
        (result, value) => !(value || !result),
        true,
      );
      return allFieldsValid ? {} : passengerErrors;
    });

    const formErrors: TicketFormErrors = {};
    const allPassengersValid = passengersErrors.reduce(
      (result, passenger) => !(Object.keys(passenger).length > 0 || !result),
      true,
    );
    if (!allPassengersValid) formErrors.passengers = passengersErrors;

    return formErrors;
  };
  const submitHandler = (
    values: TicketFormValues,
    { setSubmitting }: FormikHelpers<TicketFormValues>,
  ) => {
    TicketService
      .reserveTicket(values)
      .then((result) => console.log(result))
      .catch((error: Error) => alert(error.message))
      .finally(() => setSubmitting(false));
  };

  return (
    <Formik
      initialValues={initialValues}
      validate={validationHandler}
      onSubmit={submitHandler}
    >
      {({
        values,
        isSubmitting,
        setFieldValue,
        isValid,
        errors,
      }) => (
        <Form className="form">
          <FieldArray name="passengers">
            {({ remove, push }) => (
              <div>
                {values.passengers.length > 0
                  && values.passengers.map((
                    {
                      isFSS,
                      country,
                      birthDate,
                      gender,
                      documentType,
                      tariff,
                      sendNotifications,
                    },
                    index,
                  ) => {
                    const birthDateError = errors.passengers ? (errors.passengers as FormikErrors<Passenger>[])[index]?.birthDate : '';
                    const birthDateMods: string[] = [];
                    if (birthDateError) birthDateMods.push('with_error');
                    const birthDateClassList = getClassList('form-field__input', birthDateMods);

                    const disableChildOption = !verifyAge(birthDate, 10);

                    return (
                      <FieldsGroup
                        key={index}
                        heading={`Пассажир №${index + 1}`}
                        showDivider={index > 0}
                        additionalHeaderContent={(
                          <ModifyPassengersButton
                            type="remove"
                            disabled={index === 0 || isSubmitting}
                            onClick={() => {
                              remove(index);
                            }}
                          >
                            Удалить пассажира
                          </ModifyPassengersButton>
                        )}
                      >
                        <FormFieldWrapper bigMargin>
                          <FormCheckbox
                            label="Оформление билета по ФСС"
                            checked={isFSS}
                            onChange={(e) => {
                              setFieldValue(`passengers.${index}.isFSS`, e.target.checked);
                            }}
                          />
                        </FormFieldWrapper>
                        {isFSS && (
                          <div className="row">
                            <div className="col-4">
                              <FormFieldWrapper>
                                <FormField
                                  label="СНИЛС"
                                  labelHint={SNILSNumberHint()}
                                  type="text"
                                  name={`passengers.${index}.SNILS`}
                                  required
                                  validate={SNILSValidator}
                                />
                              </FormFieldWrapper>
                            </div>
                          </div>
                        )}
                        <div className="row">
                          <div className="col-4">
                            <FormFieldWrapper>
                              <FormField
                                label="Фамилия"
                                type="text"
                                name={`passengers.${index}.surname`}
                                disabled={isFSS}
                                required={!isFSS}
                              />
                            </FormFieldWrapper>
                          </div>
                          <div className="col-4">
                            <FormFieldWrapper>
                              <FormField
                                label="Имя"
                                type="text"
                                name={`passengers.${index}.firstName`}
                                disabled={isFSS}
                                required={!isFSS}
                              />
                            </FormFieldWrapper>
                          </div>
                          <div className="col-4">
                            <FormFieldWrapper>
                              <FormField
                                label="Отчество"
                                type="text"
                                name={`passengers.${index}.patronymic`}
                                disabled={isFSS}
                                required={!isFSS}
                              />
                            </FormFieldWrapper>
                          </div>
                          <div className="col-4">
                            <FormFieldWrapper>
                              <FormField
                                label="Пол"
                                name={`passengers.${index}.gender`}
                                as="select"
                                disabled={isFSS}
                                required={!isFSS}
                                value={gender}
                              >
                                {mapOptionsList(gendersList)}
                              </FormField>
                            </FormFieldWrapper>
                          </div>
                          <div className="col-4">
                            <FormFieldWrapper>
                              <FormLabel text="Дата рождения">
                                <Field
                                  as={ReactDatePicker}
                                  className={birthDateClassList}
                                  name={`passengers.${index}.birthDate`}
                                  value={birthDate ? convertDate(birthDate) : ''}
                                  selected={birthDate}
                                  disabled={isFSS}
                                  required={!isFSS}
                                  onChange={(date: Date) => {
                                    setFieldValue(`passengers.${index}.birthDate`, date);
                                    if (verifyAge(birthDate, 10)) {
                                      setFieldValue(`passengers.${index}.tariff`, 'full');
                                    }
                                  }}
                                  minDate={new Date('1900-01-01')}
                                  maxDate={new Date()}
                                  locale="ru"
                                  dateFormat="dd.MM.yyyy"
                                  customInput={(
                                    <ReactInputMask
                                      mask="99.99.9999"
                                      placeholder="__.__.____"
                                    />
                                  )}
                                />
                              </FormLabel>
                              <FormFieldError
                                value={birthDateError}
                                show={!isFSS}
                              />
                            </FormFieldWrapper>
                          </div>
                          <div className="col-4">
                            <FormFieldWrapper>
                              <FormField
                                label="Гражданство"
                                name={`passengers.${index}.country`}
                                as="select"
                                required
                                value={country}
                              >
                                {mapOptionsList(countriesList)}
                              </FormField>
                            </FormFieldWrapper>
                          </div>
                          <div className="col-4">
                            <FormFieldWrapper>
                              <FormField
                                label="Тип документа"
                                name={`passengers.${index}.documentType`}
                                as="select"
                                required
                                value={documentType}
                              >
                                {mapOptionsList(documentTypesList)}
                              </FormField>
                            </FormFieldWrapper>
                          </div>
                          <div className="col-4">
                            <FormFieldWrapper>
                              <FormField
                                label="Номер документа"
                                labelHint={documentNumberHint(documentType)}
                                type="text"
                                name={`passengers.${index}.documentNumber`}
                                required
                              />
                            </FormFieldWrapper>
                          </div>
                          <div className="col-4">
                            <FormFieldWrapper>
                              <FormField
                                label="Тариф"
                                name={`passengers.${index}.tariff`}
                                as="select"
                                required
                                value={tariff}
                              >
                                {mapOptionsList(disableChildOption ? tariffList.filter(({ value }) => value !== 'child') : tariffList)}
                              </FormField>
                            </FormFieldWrapper>
                          </div>
                        </div>
                        <FormFieldWrapper>
                          <FormCheckbox
                            label="Согласен на получение оповещений в случаях чрезвычайных ситуаций на железнодорожном транспорте"
                            checked={sendNotifications}
                            onChange={(e) => {
                              setFieldValue(`passengers.${index}.sendNotifications`, e.target.checked);
                            }}
                          />
                        </FormFieldWrapper>
                        <FormHint>
                          Если вы хотите получать оповещения об
                          изменении движения вашего поезда в случае
                          чрезвычайной ситуации, укажите, пожалуйста,
                          e-mail и/или телефон пассажира.
                          <br />
                          Если не хотите получать оповещения -
                          снимите галочку согласия на оповещения.
                        </FormHint>
                        <div className="row">
                          <div className="col-4">
                            <FormFieldWrapper>
                              <FormField
                                label="Номер телефона"
                                labelHint={phoneNumberHint()}
                                type="text"
                                name={`passengers.${index}.phoneNumber`}
                                disabled={!sendNotifications}
                              />
                            </FormFieldWrapper>
                          </div>
                          <div className="col-4">
                            <FormFieldWrapper>
                              <FormField
                                label="E-mail"
                                type="email"
                                name={`passengers.${index}.email`}
                                disabled={!sendNotifications}
                              />
                            </FormFieldWrapper>
                          </div>
                        </div>
                      </FieldsGroup>
                    );
                  })}
                <FormButtons justify="between">
                  <ModifyPassengersButton
                    type="add"
                    disabled={values.passengers.length >= 5 || isSubmitting}
                    onClick={() => {
                      push(passengerBase);
                    }}
                  >
                    Добавить пассажира
                  </ModifyPassengersButton>
                  <FormButton
                    type="submit"
                    disabled={!isValid || isSubmitting}
                    theme="red"
                  >
                    Зарезервировать места
                  </FormButton>
                </FormButtons>
              </div>
            )}
          </FieldArray>
        </Form>
      )}
    </Formik>
  );
};

export default TicketForm;
