import axios from 'axios';
import {
  GET_CLIENTS_LIST,
  SEARCH_CLIENTS_INPUT_CHANGE,
  EDIT_CLIENT_BTN,
  GET_CLIENT,
  SAVE_CLIENT,
  CREATE_CLIENT_BTN,
  CHANGE_CLIENT,
  CHANGE_PHONE,
  DEL_PHONE,
  ADD_PHONE,
  NEW_ORDER_BTN,
  START_LOADING,
  STOP_LOADING,
} from './types';
import { createMessage } from './messages';
import { handleErrors } from './errors';
import { redirect } from '../components/common/common.tsx';

export const getClientsList = () => async dispatch => {
  dispatch({
    type: START_LOADING,
  });
  try {
    const res = await axios.post('/sc/api/clients/');
    //console.log('getClientsList', res.data);
    redirect(res.data);
    dispatch({
      type: GET_CLIENTS_LIST,
      payload: res.data.clients,
    });
  } catch (err) {
    handleErrors(err, dispatch);
  } finally {
    dispatch({
      type: STOP_LOADING,
    });
  }
};

export const searchClientsInputChange = e => async dispatch => {
  //console.log(e.target.value);
  dispatch({
    type: SEARCH_CLIENTS_INPUT_CHANGE,
    payload: {
      value: e.target.value,
    },
  });
  const letters = /^[A-Za-zА-Яа-яёЁ]+$/;
  const numbers = /^[0-9]+$/;
  let query;
  if (e.target.value.match(letters)) {
    query = { name: e.target.value };
  }
  if (e.target.value.match(numbers)) {
    query = { phone: e.target.value };
  }
  dispatch({
    type: START_LOADING,
  });
  //console.log('searchClientsInputChange.query', query);
  try {
    const res = await axios.post('/sc/api/clients/', query ? query : { name: '' });

    //console.log('searchClientsInputChange.clients', res.data.clients);
    dispatch({
      type: SEARCH_CLIENTS_INPUT_CHANGE,
      payload: {
        clients: res.data.clients,
        query: res.data.query,
      },
    });
  } catch (err) {
    handleErrors(err, dispatch);
  } finally {
    dispatch({
      type: STOP_LOADING,
    });
  }
};

export const editClientBtn = client => async dispatch => {
  try {
    const res = await axios.post('/sc/api/clients/', { client });
    //console.log(res.data);
    redirect(res.data);
    dispatch({
      type: EDIT_CLIENT_BTN,
      payload: res.data,
    });
  } catch (err) {
    handleErrors(err, dispatch);
  }
};

export const createClientBtn = phone => async dispatch => {
  try {
    const res = await axios.post('/sc/api/clients/', { create: phone });
    //console.log(res.data);
    redirect(res.data);
    dispatch({
      type: CREATE_CLIENT_BTN,
      payload: res.data,
    });
  } catch (err) {
    handleErrors(err, dispatch);
  }
};

export const getClient = () => async dispatch => {
  try {
    //client_pk is saved in session
    const res = await axios.post('/sc/api/client/new/');
    console.log(res.data['client']);
    dispatch({
      type: GET_CLIENT,
      payload: res.data['client'],
    });
  } catch (err) {
    handleErrors(err, dispatch);
  }
};

export const saveClient = client => async dispatch => {
  //console.log(client);
  try {
    const res = await axios.post('/sc/api/client/new/', { save: 'true', client });
    dispatch(createMessage({ msg: 'Информация о клиенте сохранена' }));
    dispatch({
      type: SAVE_CLIENT,
      payload: res.data.client,
    });
  } catch (err) {
    handleErrors(err, dispatch);
  }
};

export const changeClient = e => dispatch => {
  //console.log(e.target.name, e.target.value);
  dispatch({
    type: CHANGE_CLIENT,
    payload: {
      name: e.target.name,
      value: e.target.value,
    },
  });
};

export const changePhone = (value, country, e, formattedValue) => dispatch => {
  //console.log('changePhone', e.target.name);
  //const res = e.target.name.split("-");
  dispatch({
    type: CHANGE_PHONE,
    payload: {
      name: e.target.name,
      //value: value.slice(country.dialCode.length),
      value: value,
    },
  });
};

export const delPhone = e => dispatch => {
  //console.log(e.target.name);
  const res = e.target.name.split('-');
  //console.log(res);
  dispatch({
    type: DEL_PHONE,
    payload: Number(res[1]),
  });
};

export const addPhone = () => dispatch => {
  dispatch({
    type: ADD_PHONE,
    //payload: '',
  });
};

export const newOrderBtn = () => async dispatch => {
  try {
    const res = await axios.post('/sc/api/client/new/', { btn_order_new: '' });
    //console.log(res.data);
    redirect(res.data);
    dispatch({
      type: NEW_ORDER_BTN,
      payload: res.data,
    });
  } catch (err) {
    handleErrors(err, dispatch);
  }
};
