import { EDIT_ITEM, SAVE_ITEM } from '../../actions/types';

export default function (state, action) {
  switch (action.type) {
    case EDIT_ITEM:
      switch (action.payload.name) {
        case 'item_type':
          return {
            ...state,
            item: {
              ...state.item,
              item_type: action.payload.value,
            },
          };
        case 'manufacturer':
          return {
            ...state,
            item: {
              ...state.item,
              manufacturer: action.payload.value,
            },
          };
        default:
          return {
            ...state,
            item: {
              ...state.item,
              [action.payload.name]: action.payload.value,
            },
          };
      }
    case SAVE_ITEM:
      return {
        ...state,
        item: action.payload.item,
      };
  }
  return state;
}
