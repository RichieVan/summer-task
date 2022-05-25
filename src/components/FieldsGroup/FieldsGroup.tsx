import React, { FC, PropsWithChildren, ReactNode } from 'react';

interface FieldsGroupProps {
  heading?: string;
  showDivider?: boolean;
  additionalHeaderContent?: ReactNode;
}

const FieldsGroup: FC<PropsWithChildren<FieldsGroupProps>> = ({
  heading = '',
  showDivider = false,
  children,
  additionalHeaderContent,
}) => (
  <div className="fields-group">
    {showDivider && <hr />}
    <div className="fields-group__header">
      <h2 className="fields-group__heading">{heading}</h2>
      {additionalHeaderContent}
    </div>
    {children}
  </div>
);

export default FieldsGroup;
