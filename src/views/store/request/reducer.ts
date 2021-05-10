import { HTTP_METHODS } from "@/constants";
import { AnyAction } from "redux";
import { REQUEST_ACTION } from "./action";

type ValueOf<T> = T[keyof T];

export type RequestState = {
  url: string;
  method: ValueOf<typeof HTTP_METHODS>;
  result: null | object;
};

const inititalState: RequestState = {
  url: "",
  method: HTTP_METHODS.GET,
  result: null,
};

export default function (state = inititalState, action: AnyAction) {
  switch (action.type) {
    case REQUEST_ACTION.UPDATE_REQUEST:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
