import {AUTH_REDUCER_INFO} from "../../util/reducer";

const initialState = { authenticated: false };

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_REDUCER_INFO.LOGIN:
            return { ...state, authenticated: true, auth: action.payload };
        case AUTH_REDUCER_INFO.LOGOUT:
            return { ...state, authenticated: false };
        default:
            return state;
    }
};
