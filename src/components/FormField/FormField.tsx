/* eslint react/jsx-props-no-spreading: 0 */

import React, { FC, ReactNode } from 'react';
import {
  Field,
  FastField,
  useField,
  FieldAttributes,
} from 'formik';
import getClassList from '../../utils/getClassList';
import FormLabel from '../FormLabel/FormLabel';
import FormFieldError from './FormFieldError';

interface FormFieldProps {
  label?: string;
  labelHint?: ReactNode;
  isFast?: boolean;
}

const FormField: FC<FieldAttributes<FormFieldProps>> = ({
  label = '',
  labelHint,
  isFast = false,
  ...inputProps
}) => {
  const [field, meta] = useField(inputProps);

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
        {isFast ? (
          <FastField {...field} {...inputProps} className={inputClassName} />
        ) : (
          <Field {...field} {...inputProps} className={inputClassName} />
        )}
      </FormLabel>
      <FormFieldError
        value={meta.error}
        show={!disabled}
      />
    </div>
  );
};

export default FormField;
