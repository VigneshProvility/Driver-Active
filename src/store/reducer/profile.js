import {PROFILE_REDUCER_INFO} from "../../util/reducer";

const initialState = {
    driverInfo: null,
};


export const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case PROFILE_REDUCER_INFO.NEW_PROFILE:
            return {driverInfo: action.payload};
        case PROFILE_REDUCER_INFO.DELETE_PROFILE:
            return {}
        default:
            return state;
    }
}
