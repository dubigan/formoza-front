import { combineReducers } from 'redux';
import clients from './clients';
import orders from './orders';
import order from './order';
import errors from './errors';
import catalogs from './catalogs';
import messages from './messages';
import update from './update';
import orderOut from './orderOut';

export default combineReducers({
  catalogs,
  clients,
  orders,
  order,
  errors,
  messages,
  update,
  orderOut,
});
