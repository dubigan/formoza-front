import { GET_CATALOGS } from '../actions/types';

const initialState = {
  item_types: [],
  manufacturers: [],
  mnt_types: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_CATALOGS:
      return {
        ...state,
        item_types: action.payload.item_types,
        manufacturers: action.payload.manufacturers,
        mnt_types: action.payload.mnt_types,
      };

    default:
      return state;
  }
}
