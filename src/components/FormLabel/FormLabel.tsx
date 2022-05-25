import React, { FC, ReactNode, useState } from 'react';
import getClassList from '../../utils/getClassList';

interface FormLabelProps {
  text: string;
  hint?: ReactNode;
  required?: boolean;
  mode?: 'field' | 'checkbox';
  children: ReactNode;
}

const FormLabel: FC<FormLabelProps> = ({
  text,
  hint,
  required = false,
  mode = 'field',
  children,
}) => {
  const [hintActive, setHintActive] = useState(false);

  const mods: string[] = [];
  if (required) mods.push('required');
  if (mode) mods.push(`for_${mode}`);
  if (hint) mods.push('with_hint');
  const labelClassList = getClassList('form-label', mods);

  const hintMods: string[] = [];
  if (hintActive) hintMods.push('active');
  const hintClassList = getClassList('form-label__hint', hintMods);

  return (
    <label className={labelClassList}>
      {mode === 'checkbox' && children}
      <div
        className="form-label__wrapper"
        onMouseEnter={() => {
          if (hint) setHintActive(true);
        }}
        onMouseLeave={() => {
          if (hint) setHintActive(false);
        }}
      >
        {!!hint && (
          <div className={hintClassList}>
            <div className="form-label__hint-inner">
              {hint}
            </div>
          </div>
        )}
        <span className="form-label__text">
          {text}
        </span>
      </div>
      {mode === 'field' && children}
    </label>
  );
};

export default FormLabel;
