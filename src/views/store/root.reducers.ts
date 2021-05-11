import { combineReducers } from "redux";
import requestReducer from "./request/reducer";
import uuidReducer from "./uuid/reducer";

const rootReducers = combineReducers({
  request: requestReducer,
  uuid: uuidReducer,
});

export default rootReducers;
