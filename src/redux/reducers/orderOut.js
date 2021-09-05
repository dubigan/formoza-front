import {
  BTN_ORDER_OUT_CLICK,
  HANDLE_ORDER_OUT,
  CLOSE_ORDER_OUT_DIALOG,
  CHANGE_DATE_OUT,
} from '../actions/types';

const initialState = {
  show: false,
  order: null,
  date: new Date(),
};

export default function (state = initialState, action) {
  switch (action.type) {
    case BTN_ORDER_OUT_CLICK:
      return {
        show: action.payload.show,
        order: action.payload.order,
      };

    case CLOSE_ORDER_OUT_DIALOG:
      return {
        ...state,
        show: false,
      };

    case CHANGE_DATE_OUT:
      return {
        ...state,
        date: action.payload,
      };

    case HANDLE_ORDER_OUT:
      return state;

    default:
      return state;
  }
}
