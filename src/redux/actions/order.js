import axios from 'axios';
import { SAVE_ORDER, GET_ORDER, CHANGE_DISCOUNT, CHANGE_ORDER_DATE } from './types';
import { handleErrors } from './errors';
import { createMessage } from './messages';
import { setUpdate } from './update';

export const getOrder = () => async dispatch => {
  try {
    const res = await axios.post('/sc/api/order/new/', { get: '' });
    //console.log('getOrder', res.data.order);
    dispatch({
      type: GET_ORDER,
      payload: res.data,
    });
  } catch (err) {
    handleErrors(err, dispatch);
  } finally {
    dispatch(setUpdate(false));
  }
};

export const changeDiscount = e => dispatch => {
  dispatch({
    type: CHANGE_DISCOUNT,
    payload: {
      name: e.target.name,
      value: e.target.value,
    },
  });
};

export const saveOrder = (item, order) => async dispatch => {
  try {
    console.log('saveOrder.order', order);
    const res = await axios.post('/sc/api/order/new/', { save: true, item, order });
    //console.log('saveOrder response', res);
    dispatch({
      type: SAVE_ORDER,
      payload: {
        order: res.data.order,
        item: res.data.item,
      },
    });
    dispatch(createMessage({ msg: 'Информация о заказе сохранена' }));
  } catch (err) {
    handleErrors(err, dispatch);
  }
};

export const changeOrderDate = (name, value) => dispatch => {
  //console.log('changeOrderDate', name, value.toISOString());

  dispatch({
    type: CHANGE_ORDER_DATE,
    payload: {
      name,
      value: value.toISOString(),
    },
  });
};
