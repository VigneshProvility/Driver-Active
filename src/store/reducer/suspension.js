import {SUSPENSION_REDUCER_INFO} from "../../util/reducer";

const initialState = {
    suspensionList: [],
};


export const suspensionReducer = (state = initialState, action) => {
    switch (action.type) {
        case SUSPENSION_REDUCER_INFO.NEW_SUSPENSION:
            return {suspensionList: action.payload};
        case SUSPENSION_REDUCER_INFO.DELETE_SUSPENSION:
            return [];
        default:
            return state;
    }
}
