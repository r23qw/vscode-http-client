import { HTTP_METHODS, HTTP_METHODS_VALUES } from "@/constants";
import { ValueOf } from "@/utils/type";
import { Action } from "redux";
import { getPreviouseState } from "../helper";
import { REQUEST_ACTION } from "./action";

export type RequestRecordItem = {
  id: number;
  key: string;
  value: string;
  checked: boolean;
};

export type RequestState = {
  url: string;
  method: HTTP_METHODS_VALUES;
  request: {
    params: RequestRecordItem[];
    headers: RequestRecordItem[];
  };
  response: null | object;
};

const inititalState: RequestState = (getPreviouseState(
  "request"
) as RequestState) || {
  url: "",
  method: HTTP_METHODS.GET,
  request: {
    params: [],
    headers: [],
  },
  response: null,
};

export default function (
  state = inititalState,
  action: Action<ValueOf<typeof REQUEST_ACTION>> & {
    payload: Partial<RequestState>;
  }
): RequestState {
  switch (action.type) {
    case REQUEST_ACTION.UPDATE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
