import { ADD_PAYMENT, DEL_PAYMENT, CHANGE_PAYMENT } from './types';
//import store from '../store';

export const addPayment = e => dispatch => {
  dispatch({
    type: ADD_PAYMENT,
    payload: '',
  });
};

export const delPayment = e => dispatch => {
  //console.log('delService', e.target.name);

  dispatch({
    type: DEL_PAYMENT,
    payload: {
      name: e.target.name,
    },
  });
};

export const changePayment = (...args) => dispatch => {
  //console.log('changePayment', args);

  let name;
  let value;

  if (args[1] instanceof Date) {
    name = args[0];
    value = args[1].toISOString();
  } else {
    name = args[0].target.name;
    value = args[0].target.value;
  }
  dispatch({
    type: CHANGE_PAYMENT,
    payload: {
      name,
      value,
    },
  });
};
