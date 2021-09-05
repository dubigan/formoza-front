import { GET_ERRORS } from './types';
import store from '../store';

export const handleErrors = (err, dispatch = null) => {
  console.log('handleErrors', err);
  const errors = err.response
    ? {
        msg: err.response.data,
        status: err.response.status,
      }
    : {
        msg: err.message,
        status: 400,
      };
  //console.log('handleErrors', errors);
  store.dispatch({
    type: GET_ERRORS,
    payload: errors,
  });
};
