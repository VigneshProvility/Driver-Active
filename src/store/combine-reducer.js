import { combineReducers } from "redux";
import { authReducer } from "./reducer/auth-reducer";

const rootReducer = combineReducers({
    auth: authReducer
});

export default rootReducer;
