import { combineReducers } from "redux";
import { authReducer } from "./reducer/auth-reducer";
import {profileReducer} from "./reducer/profile";
import {ratingReducer} from "./reducer/rating";
import {suspensionReducer} from "./reducer/suspension";

const rootReducer = combineReducers({
    auth: authReducer,
    profile: profileReducer,
    rating: ratingReducer,
    suspension: suspensionReducer
});

export default rootReducer;
