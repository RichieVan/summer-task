import React, { ChangeEvent, FC } from 'react';
import FormLabel from '../FormLabel/FormLabel';

interface FormCheckboxProps {
  label?: string;
  checked?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const FormCheckbox: FC<FormCheckboxProps> = ({
  label = '',
  checked = false,
  onChange,
}) => (
  <FormLabel
    text={label}
    mode="checkbox"
  >
    <input
      className="form-field__checkbox"
      type="checkbox"
      checked={checked}
      onChange={onChange}
    />
  </FormLabel>
);

export default FormCheckbox;
