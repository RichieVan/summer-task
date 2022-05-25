import React, { ReactNode } from 'react';
import { DocumentTypes } from '../../types/TicketForm';

export const phoneNumberHint = (): ReactNode => (
  <>
    <div><b>Формат номера:</b></div>
    <div>
      &quot;+7-___-__-__-___&quot; где
      <br />
      &quot;_&quot; - число от 0 до 9
    </div>
  </>
);

export const SNILSNumberHint = (): ReactNode => (
  <>
    <div><b>Формат номера СНИЛС:</b></div>
    <div>
      &quot;+___-___-___ __&quot; где
      <br />
      &quot;_&quot; - число от 0 до 9
    </div>
  </>
);

export const documentNumberHint = (type: DocumentTypes): ReactNode => {
  if (type === DocumentTypes.PASSPORT_RU) {
    return (
      <>
        <div><b>Формат паспортного номера:</b></div>
        <div>
          &quot;____ ______&quot; где
          <br />
          &quot;_&quot; - число от 0 до 9
        </div>
      </>
    );
  }

  if (type === DocumentTypes.PASSPORT_INTERNATIONAL) {
    return (
      <>
        <div><b>Формат паспортного номера:</b></div>
        <div>
          &quot;__ _______&quot; где
          <br />
          &quot;_&quot; - число от 0 до 9
        </div>
      </>
    );
  }

  return (
    <>
      <div><b>Формат номера:</b></div>
      <div>
        &quot;XXX-АА_999999&quot; где
        <br />
        &quot;X&quot; - латинская цифра X, V или I,
        <br />
        &quot;А&quot; - буква кириллицы от А до Я,
        <br />
        &quot;9&quot; - число от 0 до 9,
        <br />
        &quot;_&quot; - пробел
      </div>
    </>
  );
};
