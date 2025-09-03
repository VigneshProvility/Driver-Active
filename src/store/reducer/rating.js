import {RATING_REDUCER_INFO} from "../../util/reducer";

const initialState = {
    ratingInfo: null,
};


export const ratingReducer = (state = initialState, action) => {
    switch (action.type) {
        case RATING_REDUCER_INFO.NEW_RATING:
            return {ratingInfo: action.payload};
        case RATING_REDUCER_INFO.DELETE_RATING:
            return {};
        case RATING_REDUCER_INFO.RESET_RATING:
            return {ratingInfo: {companyRating: 0, driverRating: 0}};
        default:
            return state;
    }
}
