import React, { FC, MouseEvent, ReactNode } from 'react';

interface ModifyPassengersButtonProps {
  type?: 'add' | 'remove';
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  children?: ReactNode;
}

const ModifyPassengersButton: FC<ModifyPassengersButtonProps> = ({
  type = 'add',
  onClick,
  disabled = false,
  children,
}) => (
  <button
    className={`edit-passengers edit-passengers_${type}`}
    type="button"
    disabled={disabled}
    onClick={onClick}
  >
    <i className="edit-passengers__icon" />
    <span className="edit-passengers__label">
      {children}
    </span>
  </button>
);

export default ModifyPassengersButton;
