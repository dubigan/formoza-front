import axios from 'axios';
import { GET_CATALOGS } from './types';
import { handleErrors } from './errors';
import { getCatalogsFromData, catalogsUrl } from '../components/common/Catalogs';

export const getCatalogs = () => async dispatch => {
  try {
    const res = await axios.post(catalogsUrl);

    console.log('Catalogs.getCatalogs', res.data);
    dispatch({
      type: GET_CATALOGS,
      payload: getCatalogsFromData(res.data),
    });
  } catch (err) {
    console.log('getCatalogs', err);
    handleErrors(err, dispatch);
  }
};
