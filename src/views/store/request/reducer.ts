import { AnyAction } from "redux";
import { HTTP_METHODS } from "../../constants";
import { REQUEST_ACTION } from "./action";

const inititalState = {
  url: "",
  method: HTTP_METHODS.GET,
};

export default function (state = inititalState, action: AnyAction) {
  switch (action.type) {
    case REQUEST_ACTION.UPDATE_URL:
      return { ...state, url: action.payload };
    case REQUEST_ACTION.UPDATE_METHOD:
      return { ...state, method: action.payload };
    default:
      return state;
  }
}
