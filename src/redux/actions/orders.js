import axios from 'axios';
import {
  GET_ERRORS,
  SET_INITIAL_ORDERS_FILTER,
  GET_ORDERS_LIST,
  START_LOADING,
  STOP_LOADING,
  BTN_ORDERS_FILTER_CLICK,
  BTN_ORDERS_SORT_CLICK,
  SEARCH_ORDERS,
} from './types';
import { createMessage } from './messages';
import { handleErrors } from './errors';
import { redirect } from '../components/common/common.tsx';
import { sortBy, getSortedBy } from '../components/orders/sort';
import { setUpdate } from './update';
import store from '../store';

export const getOrdersList = (url, query) => async dispatch => {
  try {
    dispatch({
      type: START_LOADING,
    });

    //let res = await axios.post(catalogsUrl);
    //const catalogs = res.data;
    //console.log('getOrdersList.catalogs', catalogs);

    const res = await axios.post(url, { query });
    redirect(res.data);
    const orders = res.data.orders;
    console.log('getOrdersList.orders', orders);
    query = res.data.query;
    //console.log('getOrdersList.query', query);
    //console.log('getOrderList.query', query);
    //console.log('getOrderList.orders', orders);

    dispatch({
      type: GET_ORDERS_LIST,
      payload: {
        orders,
        query,
        //catalogs,
      },
    });
  } catch (err) {
    console.log(err);
    handleErrors(err, dispatch);
  } finally {
    dispatch({
      type: STOP_LOADING,
    });
    dispatch(setUpdate(false));
  }
};

export const btnOrdersFilterClick = e => dispatch => {
  //console.log('btnOrdersFilterClick', e.target.value);

  dispatch({
    type: BTN_ORDERS_FILTER_CLICK,
    payload: e.target.value,
  });
};

export const btnOrdersSortClick = e => dispatch => {
  const sorted_by = getSortedBy(store.getState().orders.sorted_by, e.target.id);
  const orders = store.getState().orders.orders;
  sortBy(orders, sorted_by, store.getState().catalogs);

  dispatch({
    type: BTN_ORDERS_SORT_CLICK,
    payload: {
      sorted_by,
      orders,
    },
  });
};

export const searchOrders = e => dispatch => {
  dispatch({
    type: SEARCH_ORDERS,
    payload: e.target.value,
  });
};

export const btnOrderClick = (url, cmd, id) => async dispatch => {
  try {
    const res = await axios.post(url, { cmd: cmd, order_pk: id });
    //console.log('btnOrderClick', res.data);

    redirect(res.data);
  } catch (err) {
    //console.log('btnOrderClick', err);
    handleErrors(err, dispatch);
  }
};

export const btnClientEditClick = (id, url) => async dispatch => {
  //console.log('btnClientEditClick', this);

  try {
    const res = await axios.post(url, { cmd: 'client_edit', client_pk: id });
    //console.log('btnOrderClick', res.data);

    redirect(res.data);
  } catch (err) {
    //console.log('btnOrderClick', err);
    handleErrors(err, dispatch);
  }
};

export const setInitialFilter = options => dispatch => {
  dispatch({
    type: SET_INITIAL_ORDERS_FILTER,
    payload: options,
  });
};
