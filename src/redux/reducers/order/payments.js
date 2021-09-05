import { ADD_PAYMENT, DEL_PAYMENT, CHANGE_PAYMENT } from '../../actions/types';

const emptyPayment = () => {
  return {
    date: new Date().toISOString(),
    value: 0,
  };
};

export default function (state, action) {
  let name, index, payments;
  switch (action.type) {
    case ADD_PAYMENT: {
      payments = state.order.payments;
      payments.push(new emptyPayment());
      //console.log('addPayment.reducer.payments', payments);
      return {
        ...state,
        order: {
          ...state.order,
          payments,
        },
      };
    }

    case DEL_PAYMENT:
      //console.log("Service removed");
      name = action.payload.name;
      index = +name.slice(name.lastIndexOf('-') + 1, name.length);
      //console.log('delPayment.reducer.index', index);

      payments = state.order.payments;
      if (payments.length > 0) payments.splice(index, 1);
      //console.log('delService.reducer.payments', payments);

      return {
        ...state,
        order: {
          ...state.order,
          payments,
        },
      };

    case CHANGE_PAYMENT:
      name = action.payload.name;
      index = +name.slice(name.lastIndexOf('-') + 1, name.length);
      name = name.slice(0, name.lastIndexOf('-'));
      payments = state.order.payments;
      payments[index][name] = action.payload.value;
      return {
        ...state,
        order: {
          ...state.order,
          payments,
        },
      };
  }
  return state;
}
