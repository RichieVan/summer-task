import React, { FC, ReactNode } from 'react';
import getClassList from '../../utils/getClassList';

interface FormButtonProps {
  type?: 'button' | 'submit';
  disabled?: boolean;
  theme?: 'default' | 'red';
  children?: ReactNode;
}

const FormButton: FC<FormButtonProps> = ({
  type = 'button',
  disabled = false,
  theme = 'default',
  children,
}) => {
  const mods: string[] = [];
  if (theme === 'red') mods.push('type_red');
  const classList = getClassList('form-button', mods);

  return (
    <button
      className={classList}
      type={type === 'button' ? 'button' : 'submit'}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default FormButton;
