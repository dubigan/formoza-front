import React from 'react';
import { getBoolValFromOptions } from '../ordersFunctions';
import OrderButton from './OrderButton';

export const OrderButtons = ({ order, callbacks, options }) => {
  const withButtons = getBoolValFromOptions(options, 'withButtons');
  if (withButtons) {
    return (
      <>
        <OrderButton
          type={OrderButton.Types.add}
          value={order.id}
          onClick={callbacks.btnOrderRepeat}
          disabled={order.date_out !== null ? '' : 'disable'}
        />
        <OrderButton
          type={OrderButton.Types.edit}
          value={order.id}
          onClick={callbacks.btnOrderEdit}
        />
        <OrderButton
          type={OrderButton.Types.out}
          value={order.id}
          onClick={callbacks.btnOrderOut}
          disabled={order.date_out !== null ? 'disable' : ''}
        />
      </>
    );
  } else {
    return <></>;
  }
};

export const TdWithOrderButtons = props => {
  const withButtons = getBoolValFromOptions(props.options, 'withButtons');
  if (withButtons)
    return (
      //<div className="row">
      <td className="order-buttons-container">
        <OrderButtons order={props.order} options={props.options} callbacks={props.callbacks} />
      </td>
      //</div>
    );
  return <></>;
};
