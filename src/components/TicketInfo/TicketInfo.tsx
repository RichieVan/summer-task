import React from 'react';

const TicketInfo = () => (
  <div className="ticket-info">
    <div className="ticket-info__wrapper">
      <div className="ticket-info__header">
        <h2 className="ticket-info__heading">Ваш выбор</h2>
      </div>
      <div className="ticket-info__train-list">
        <div className="train-info">
          <h3 className="train-info__heading">Поезда</h3>
          <div className="train-info__label">
            <span className="train-info__direction">Туда</span>
            <span className="train-info__travel-time">В пути 12 ч. 15 м.</span>
          </div>
          <div className="train-info__desc">
            <i className="train-info__icon" />
            <div className="train-info__desc-inner">
              <span className="train-info__number">№045Я</span>
              <span className="train-info__type">ФПК</span>
            </div>
          </div>
          <div className="train-info__routes">
            <div className="train-info__route">
              <div className="train-info__route-name">Иваново - С-Петер-Гл</div>
              <div className="train-info__station">Ярославль-Главный</div>
              <div className="train-info__destination">
                <span className="train-info__destination-time">20:38</span>
                <span className="train-info__destination-timezone">МСК</span>
                <span className="train-info__destination-date">12.09.2019</span>
              </div>
            </div>
            <div className="train-info__route">
              <div className="train-info__to">
                <i className="train-info__to-icon" />
                <span>в пути 12 ч. 15 м.</span>
              </div>
              <div className="train-info__station">Санкт-Петербург-Главн.</div>
              <div className="train-info__destination">
                <span className="train-info__destination-time">08:53</span>
                <span className="train-info__destination-timezone">МСК</span>
                <span className="train-info__destination-date">13.09.2019</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="ticket-info__result">
        <div className="ticket-result">
          <div className="ticket-result__total">
            <span>от</span>
            <span className="ticket-result__price">2 234 ₽</span>
          </div>
          <div className="ticket-result__about">
            <span className="ticket-result__about-legend">Важно</span>
            <p className="ticket-result__about-text">
              Указана примерная стоимость на одного пассажира по тарифу &quot;Полный&quot;!
              Она может отличаться от суммы после резервирования мест.
              <br />
              <br />
              После резервирования вы можете отказаться от оплаты.
            </p>
          </div>
          <ul className="ticket-result__options">
            <li className="ticket-result__option">
              <span className="ticket-result__option-name">Страхование НС</span>
              <span className="ticket-result__option-price">150 ₽</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
);

export default TicketInfo;
