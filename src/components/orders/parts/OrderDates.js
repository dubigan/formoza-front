import React from 'react';
import DateTimePicker from 'react-datetime-picker';
import '../../css/DateTimePicker.css';
//import '../../css/Calendar.css';
import OrderButton from './OrderButton';

export const OrderDate = ({ date, name, onChange }) => {
  //console.log('OrderDate.props', props);

  const getDate = () => {
    if (date) {
      //console.log('OrderDates.getDate', date);

      if (date instanceof Date) return date;

      return new Date(date);
    }
    return new Date();
  };

  return (
    <div className="datetime-container">
      <DateTimePicker
        className="oak-form-control"
        calendarClassName="border"
        format="dd.MM.yyyy, HH:mm"
        locale="ru"
        maxDate={new Date()}
        minDate={new Date('1996', 1, 14)} // formoza was founded about 07.02.1996
        name={name}
        // showYearDropdown={true}
        onChange={onChange.bind(null, name)}
        value={getDate()}
      />
    </div>
  );
};

const ButtonOut = ({ order, onClick }) => {
  return (
    <OrderButton
      type={OrderButton.Types.out}
      //className="oak-btn-primary"
      value={order.id}
      onClick={onClick.bind(null, order)}
    />
  );
};

export const OrderDates = ({ order, onChange, btnOrderOutClick }) => {
  return (
    <div className="dates-container">
      <div className="oak-row">
        <label>Дата поступления</label>
      </div>
      <div className="oak-row">
        <OrderDate name="date_in" date={order.date_in} onChange={onChange} />
        {order.date_out ? '' : <ButtonOut order={order} onClick={btnOrderOutClick} />}
      </div>
      {order.date_out ? (
        <>
          <div className="oak-row">
            <label>Дата выдачи</label>
          </div>
          <div className="oak-row">
            <OrderDate name="date_out" date={order.date_out} onChange={onChange} />
          </div>
        </>
      ) : (
        ''
      )}
    </div>
  );
};
