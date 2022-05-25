import React from 'react';
import TicketForm from '../TicketForm/TicketForm';
import TicketInfo from '../TicketInfo/TicketInfo';

const TicketReservation = () => (
  <div className="ticket-reservation">
    <div className="row">
      <div className="col-9">
        <div className="ticket-reservation__form">
          <TicketForm />
        </div>
      </div>
      <div className="col-3">
        <div className="ticket-reservation__info">
          <TicketInfo />
        </div>
      </div>
    </div>
  </div>
);

export default TicketReservation;
