/* eslint react/jsx-props-no-spreading: 0 */

import React, { FC, ReactNode } from 'react';
import {
  Field,
  useField,
  FieldAttributes,
} from 'formik';
import ReactDatePicker, { ReactDatePickerProps } from 'react-datepicker';
import getClassList from '../../utils/getClassList';
import FormLabel from '../FormLabel/FormLabel';
import FormFieldError from './FormFieldError';

interface FormFieldProps {
  label?: string;
  labelHint?: ReactNode;
}

const FormDatetimeField: FC<Omit<FieldAttributes<FormFieldProps>, 'onChange'> & ReactDatePickerProps> = ({
  label = '',
  labelHint,
  ...inputProps
}) => {
  const [field, meta] = useField(inputProps.name);
  const { required, disabled } = inputProps;

  const inputMods: string[] = [];
  if (meta.error) {
    inputMods.push('with_error');
  }
  const inputClassName = getClassList('form-field__input', inputMods);

  return (
    <div className="form-field">
      <FormLabel
        text={label}
        hint={labelHint}
        required={required}
      >
        <Field
          {...field}
          {...inputProps}
          as={ReactDatePicker}
          className={inputClassName}
        />
      </FormLabel>
      <FormFieldError
        value={meta.error}
        show={!disabled}
      />
    </div>
  );
};

export default FormDatetimeField;
