import React, { FC } from 'react';

interface FormFieldErrorProps {
  value?: string;
  show?: boolean;
}

const FormFieldError: FC<FormFieldErrorProps> = ({
  value,
  show = false,
}) => (
  <div className="form-field__error">
    {show && value}
  </div>
);

export default FormFieldError;
