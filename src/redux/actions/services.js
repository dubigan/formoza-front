import { ADD_SERVICE, DEL_SERVICE, CHANGE_SERVICE } from './types';
import store from '../store';

export const addService = e => dispatch => {
  dispatch({
    type: ADD_SERVICE,
    payload: '',
  });
};

export const delService = e => dispatch => {
  //console.log('delService', e.target.name);

  dispatch({
    type: DEL_SERVICE,
    payload: {
      name: e.target.name,
    },
  });
};

export const changeService = e => dispatch => {
  dispatch({
    type: CHANGE_SERVICE,
    payload: {
      name: e.target.name,
      value: e.target.value,
      catalogs: store.getState().catalogs,
    },
  });
};
