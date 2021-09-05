import { GET_ORDER, SAVE_ORDER, CHANGE_ORDER_DATE } from '../actions/types';

import item from './order/item';
import services from './order/services';
import payments from './order/payments';

const initialState = {
  client: {
    first_name: '',
    phones: [],
  },
  item: {
    id: null,
    item_type: null,
    manufacturer: null,
    ser_num: '',
    name: '',
    comment: '',
  },
  order: {
    id: null,
    discount: 0,
    mnts: [],
    payments: [],
  },
};

export default function (state = initialState, action) {
  state = item(state, action);
  state = services(state, action);
  state = payments(state, action);

  switch (action.type) {
    case GET_ORDER:
      // let order = action.payload;
      // if (order.id === null || order.id === undefined) {
      //     order.id = 0;
      //     order.item.id = 0;
      // }
      return {
        ...state,
        order: action.payload.order,
        item: action.payload.item,
        client: action.payload.client,
      };

    case CHANGE_ORDER_DATE:
      return {
        ...state,
        order: {
          ...state.order,
          [action.payload.name]: action.payload.value,
        },
      };

    case SAVE_ORDER:
      return {
        ...state,
        order: action.payload.order,
        item: action.payload.item,
      };
  }

  return state;
}
