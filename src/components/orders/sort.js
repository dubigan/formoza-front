import { getValueFromCatalog } from '../common/Catalogs';

const sign = direction => (direction === 'asc' ? 1 : -1);

export const getSortedBy = (prevSortedBy, name) => {
  //const sorted_name = e.target.id;
  console.log('btnSortClick', name);
  let sorted_by = prevSortedBy;

  if (sorted_by.name !== name) {
    sorted_by = {
      name: name,
      direction: 'desc',
    };
  } else {
    const direction = sorted_by.direction === 'desc' ? 'asc' : 'desc';
    sorted_by = {
      ...sorted_by,
      direction: direction,
    };
  }
  return sorted_by;
};

const getValueForField = (order, fieldName, catalogs) => {
  let val;
  switch (fieldName) {
    case 'date_in':
    case 'date_out':
      val = new Date(order[fieldName]);
      break;
    case 'item.name':
      val = order.item.name;
      break;
    case 'item.ser_num':
      val = order.item.name;
      break;
    case 'item.item_type.name':
      val = getValueFromCatalog(catalogs.item_types, order.item.item_type, 'name');
      break;
    case 'item.manufacturer.name':
      val = getValueFromCatalog(catalogs.manufacturers, order.item.manufacturer, 'name');
      break;
    default:
      val = order[fieldName];
  }
  //console.log('getValueForField', val);
  return val;
};

export const sortBy = (orders, query, catalogs = {}) => {
  //console.log('sortBy.orders', orders);
  //console.log('sortBy.query', query);
  //console.log('sortBy.catalogs', catalogs);

  orders.sort((a, b) => {
    //console.log('sortBy.query', query);

    const valA = getValueForField(a, query.name, catalogs);
    const valB = getValueForField(b, query.name, catalogs);
    if (valA > valB) return sign(query.direction);
    if (valA < valB) return -sign(query.direction);
    return 0;
  });
};
