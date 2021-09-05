import {
  GET_CLIENTS_LIST,
  EDIT_CLIENT_BTN,
  GET_CLIENT,
  SAVE_CLIENT,
  CREATE_CLIENT_BTN,
  CHANGE_CLIENT,
  CHANGE_PHONE,
  DEL_PHONE,
  ADD_PHONE,
  SEARCH_CLIENTS_INPUT_CHANGE,
  NEW_ORDER_BTN,
  STOP_LOADING,
  START_LOADING,
} from '../actions/types.js';

const initialState = {
  searchClients: '',
  loading: false,
  clients: [],
  client: {
    id: '',
    phones: [''],
    first_name: '',
    last_name: '',
    email: '',
    comment: '',
    orders: [],
  },
};

export default function (state = initialState, action) {
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
    case GET_CLIENTS_LIST:
      return {
        ...state,
        clients: action.payload,
      };

    case SEARCH_CLIENTS_INPUT_CHANGE:
      //console.log(action.payload);
      if (action.payload.value !== undefined) {
        return {
          ...state,
          searchClients: action.payload.value,
        };
      }
      //console.log('search_clients_input_change.query', action.payload.query);

      if (action.payload.query === undefined || action.payload.query === state.searchClients) {
        return {
          ...state,
          clients: action.payload.clients,
        };
      }
      return state;

    case EDIT_CLIENT_BTN:
      return {
        ...state,
        redirect: action.payload.redirect,
      };

    case GET_CLIENT:
      //console.log(action.payload);
      // const client = action.payload;
      // if (client.id === null) {
      //     client.phones = [state.searchClients];
      // }
      return {
        ...state,
        client: action.payload,
      };

    case SAVE_CLIENT:
      return {
        ...state,
        client: action.payload,
      };

    case CREATE_CLIENT_BTN:
      const phones = [state.searchClients];
      console.log('create_client_btn', phones);

      return {
        ...state,
        // client: {
        //     id: '',
        //     phones: phones,
        //     first_name: '',
        //     last_name: '',
        //     email: '',
        //     comment: '',
        //     orders: [],
        // },
        client: {
          ...initialState.client,
          phones: phones,
        },
      };

    case CHANGE_CLIENT:
      //console.log(action);
      return {
        ...state,
        client: {
          ...state.client,
          [action.payload.name]: action.payload.value,
        },
      };

    case CHANGE_PHONE: {
      const index = +action.payload.name.split('-')[1];
      //console.log(index);
      const phones = state.client.phones;
      phones[index] = action.payload.value;
      return {
        ...state,
        client: {
          ...state.client,
          phones: phones,
        },
      };
    }

    case DEL_PHONE: {
      //console.log(action.payload);
      const phones = state.client.phones;
      if (phones.length > 1) phones.splice(action.payload, 1);
      //console.log(phones);
      //const index = action.payload;
      //phones.splice(index, 1);
      //console.log(phones);
      return {
        ...state,
        client: {
          ...state.client,
          phones: phones,
        },
      };
    }

    case ADD_PHONE: {
      const phones = state.client.phones;
      //console.log(phones);
      //console.log(action.payload);
      //phones.push(action.payload);
      phones.push('');
      return {
        ...state,
        client: {
          ...state.client,
          phones: phones,
        },
      };
    }

    case NEW_ORDER_BTN:

    default:
      return state;
  }
}
