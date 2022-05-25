import React, { FC, PropsWithChildren } from 'react';
import getClassList from '../../utils/getClassList';

interface FormButtonsProps {
  justify?: 'start' | 'end' | 'between';
}

const FormButtons: FC<PropsWithChildren<FormButtonsProps>> = ({
  justify = 'end',
  children,
}) => {
  const classList = getClassList('form-buttons', [`justify_${justify}`]);

  return (
    <div className={classList}>
      {children}
    </div>
  );
};

export default FormButtons;
