import axios from 'axios';
import { createMessage } from './messages';
import { EDIT_ITEM, SAVE_ITEM, GET_CATALOGS } from './types';
import { handleErrors } from './errors';
import { getCatalogsFromData, catalogsUrl } from '../components/common/Catalogs';

export const editItem = e => dispatch => {
  dispatch({
    type: EDIT_ITEM,
    payload: {
      name: e.target.name,
      value: e.target.value,
    },
  });
};

// export const getTypesAndManufacturers = () => async dispatch => {
//   try {
//     const res = await axios.post(catalogsUrl);

//     console.log('Item.getItemTypes', res.data);
//     dispatch({
//       type: GET_TYPES_AND_MANUFACTURERS,
//       payload: getCatalogsFromData(res.data),
//     });
//   } catch (err) {
//     console.log('getTypesAndManufacturers', err);
//     handleErrors(err, dispatch);
//   }
// };

export const saveItem = item => async dispatch => {
  console.log('saveItem', item);
  try {
    const res = await axios.post('/sc/api/order/new/', { save: true, item });
    //console.log(res.data);
    dispatch({
      type: SAVE_ITEM,
      payload: res.data,
    });
    dispatch(
      createMessage({
        msg: 'Информация об оборудовании сохранена',
      })
    );
  } catch (err) {
    handleErrors(err, dispatch);
  }
};
