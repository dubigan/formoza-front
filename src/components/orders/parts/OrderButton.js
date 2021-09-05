import React from 'react';
import PropTypes from 'prop-types';

export default function OrderButton({ type, className, name, value, onClick, disabled }) {
  return (
    <button
      title={type.tooltip}
      className={className}
      name={name}
      value={value}
      onClick={onClick}
      disabled={disabled}
    >
      {type.label}
    </button>
  );
}

OrderButton.Types = {
  add: { label: '+', tooltip: 'Добавить заказ' },
  edit: { label: '\u2192', tooltip: 'Редактировать заказ' },
  out: { label: '\u21db', tooltip: 'Выдать клиенту' },
};

OrderButton.defaultProps = {
  className: 'oak-btn-primary oak-col',
  name: 'btn_order',
  disabled: '',
};

OrderButton.propTypes = {
  type: PropTypes.object.isRequired,
  value: PropTypes.number,
  onClick: PropTypes.func.isRequired,
};
