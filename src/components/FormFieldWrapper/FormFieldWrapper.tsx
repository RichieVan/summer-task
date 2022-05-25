import React, { FC, ReactNode } from 'react';
import getClassList from '../../utils/getClassList';

interface FormFieldWrapperProps {
  bigMargin?: boolean;
  children?: ReactNode;
}

const FormFieldWrapper: FC<FormFieldWrapperProps> = ({
  bigMargin = false,
  children,
}) => {
  const mods: string[] = [];
  if (bigMargin) mods.push('margin_big');
  const classList = getClassList('form-field-wrapper', mods);

  return (
    <div className={classList}>
      {children}
    </div>
  );
};

export default FormFieldWrapper;
