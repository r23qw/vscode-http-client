import { combineReducers } from "redux";
import requestReducer from "./request/reducer";

const rootReducers = combineReducers({ request: requestReducer });

export default rootReducers;
