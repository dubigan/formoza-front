import { calcTotal } from '../common/common.tsx';

const getValNameOrEmpty = (val, name = 'name') => (val ? val[name] : '');

const findById = (arr, id) => arr.find(el => +el.id === +id);

export const getBoolValFromOptions = (options, name) => options[name];

export const getNameById = (arr, id, name = 'name') => {
  //const item_type = item_types.find(type => +type.id === +order.item.item_type);
  return getValNameOrEmpty(findById(arr, id), name);
};

export const getOrderSum = order => calcTotal(order.mnts, 'summa', order.discount);

export const getOrderPayments = order => calcTotal(order.payments, 'value');
