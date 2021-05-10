import { HTTP_METHODS } from "@/constants";
import { AnyAction } from "redux";
import { getPreviouseState } from "../helper";
import { REQUEST_ACTION } from "./action";

type ValueOf<T> = T[keyof T];

export type RequestState = {
  url: string;
  method: ValueOf<typeof HTTP_METHODS>;
  response: null | object;
};

const inititalState: RequestState = getPreviouseState("request") || {
  url: "",
  method: HTTP_METHODS.GET,
  response: null,
};

export default function (state = inititalState, action: AnyAction) {
  switch (action.type) {
    case REQUEST_ACTION.UPDATE_REQUEST:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
