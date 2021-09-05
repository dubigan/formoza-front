import {
  GET_ORDERS_LIST,
  SET_INITIAL_ORDERS_FILTER,
  START_LOADING,
  STOP_LOADING,
  // BTN_ORDER_OUT_CLICK,
  // HANDLE_ORDER_OUT,
  // CLOSE_ORDER_OUT_DIALOG,
  BTN_ORDERS_FILTER_CLICK,
  BTN_ORDERS_SORT_CLICK,
  SEARCH_ORDERS,
} from '../actions/types';

// import { getSortedBy, sortBy } from '../components/orders/sort';
// import store from '../store';

// const getDefaultSortedBy = () => {
//   return {
//     name: 'date_in',
//     direction: 'desc',
//   };
// };

const initialState = {
  search: '',
  filter: 'in_service',
  loading: false,
  showOutDialog: false,
  orderOut: undefined,
  orders: [],
  sorted_by: { name: 'date_in', direction: 'desc' },
};

export default function (state = initialState, action) {
  let orders;
  switch (action.type) {
    case STOP_LOADING:
      return {
        ...state,
        loading: false,
      };
    case START_LOADING:
      return {
        ...state,
        loading: true,
      };

    case GET_ORDERS_LIST:
      orders = action.payload.orders;
      let prepared_orders = orders;
      const query = action.payload.query;
      //const catalogs = action.payload.catalogs;
      //sortBy(orders, query.sorted_by, catalogs);
      if (state.clientId === undefined) {
        if (query.ser_num === state.search)
          return {
            ...state,
            orders: prepared_orders,
            //update: false,
            //catalogs,
          };
      } else if (orders.length > 0) {
        prepared_orders = orders.filter(order => +order.client.id === +this.props.clientId);
        //console.log("getOrderList.data", orders);
      } else {
        prepared_orders = [];
      }

      return {
        ...state,
        orders: prepared_orders,
        //update: false,
        //catalogs,
      };

    // case BTN_ORDER_OUT_CLICK:
    //   return {
    //     ...state,
    //     showOutDialog: action.payload.showOutDialog,
    //     orderOut: action.payload.orderOut,
    //   };

    // case CLOSE_ORDER_OUT_DIALOG:
    //   return {
    //     ...state,
    //     showOutDialog: false,
    //   };

    // case HANDLE_ORDER_OUT:
    //   //const orderOut = action.payload;
    //   //   orders = state.orders.map(order => {
    //   //     if (order.id !== orderOut.id) return order;
    //   //   });

    //   return {
    //     ...state,
    //     //orders: [],
    //     //update: true,
    //   };

    case BTN_ORDERS_FILTER_CLICK:
      return {
        ...state,
        filter: action.payload,
      };

    case BTN_ORDERS_SORT_CLICK:
      return {
        ...state,
        sorted_by: action.payload.sorted_by,
        orders: action.payload.orders,
      };

    case SEARCH_ORDERS:
      return {
        ...state,
        search: action.payload,
      };

    case SET_INITIAL_ORDERS_FILTER:
      const options = action.payload;
      const withFilter = !options ? true : options.withFilter;
      const filter = withFilter ? 'in_service' : 'all';
      return {
        ...state,
        filter,
      };

    default:
      return state;
  }
}
