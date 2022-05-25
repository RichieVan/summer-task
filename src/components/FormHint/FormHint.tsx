import React, { FC, PropsWithChildren } from 'react';

const FormHint: FC<PropsWithChildren<{}>> = ({
  children,
}) => (
  <p className="form-helper-text">
    {children}
  </p>
);

export default FormHint;
