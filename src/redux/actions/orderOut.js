import axios from 'axios';
import {
  BTN_ORDER_OUT_CLICK,
  HANDLE_ORDER_OUT,
  CLOSE_ORDER_OUT_DIALOG,
  CHANGE_DATE_OUT,
} from './types';
import { setUpdate } from './update';
import { handleErrors } from './errors';
import { createMessage } from './messages';

export const changeDate = (name, date) => dispatch => {
  //console.log('changeDate', date.toLocaleDateString('ru'));
  dispatch({
    type: CHANGE_DATE_OUT,
    payload: date.toISOString(),
  });
};

export const btnOrderOutClick = order => dispatch => {
  //console.log('btnOrderOutClick', order);

  dispatch({
    type: BTN_ORDER_OUT_CLICK,
    payload: {
      show: true,
      order: order,
    },
  });
};

export const handleOrderOut = (confirm, id = null, date = new Date()) => async dispatch => {
  dispatch({
    type: CLOSE_ORDER_OUT_DIALOG,
  });
  //console.log('handleOrderOut.confirm', confirm);

  if (!(confirm && id)) return;
  try {
    const res = await axios.post('/sc/api/order/order_out/', {
      order_pk: id,
      date: date,
    });
    dispatch({
      type: HANDLE_ORDER_OUT,
      payload: res.data.order,
    });
    dispatch(createMessage({ msg: 'Оборудование выдано, заказ закрыт' }));
    dispatch(setUpdate(true));
  } catch (err) {
    handleErrors(err, dispatch);
  }
};
