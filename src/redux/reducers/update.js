import { SET_UPDATE } from "../actions/types";

const initialState = {
    update: false,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_UPDATE:
            //console.log('setUpdate.reducer', action);

            return { update: action.payload };
        default:
            return state;
    }
}
