import { SET_UPDATE } from './types';

export const setUpdate = update => {
  //console.log('setUpdate.action', update);

  return {
    type: SET_UPDATE,
    payload: update,
  };
};
