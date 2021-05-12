import {
  HTTP_METHODS,
  HTTP_METHODS_VALUES,
  REQUEST_BODY_TYPE,
} from "@/constants";
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
    body: {
      type: REQUEST_BODY_TYPE;
      [REQUEST_BODY_TYPE.FORM_DATA]: RequestRecordItem[];
      [REQUEST_BODY_TYPE.X_WWW_FORM_URLENCODED]: RequestRecordItem[];
      [REQUEST_BODY_TYPE.RAW]: string;
    };
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
    body: {
      type: REQUEST_BODY_TYPE.RAW,
      [REQUEST_BODY_TYPE.FORM_DATA]: [],
      [REQUEST_BODY_TYPE.X_WWW_FORM_URLENCODED]: [],
      [REQUEST_BODY_TYPE.RAW]: "",
    },
  },
  response: null,
};

export default function (
  state = inititalState,
  action: Action<REQUEST_ACTION> & {
    payload: Partial<RequestState>;
  }
): RequestState {
  switch (action.type) {
    case REQUEST_ACTION.UPDATE:
      return { ...state, ...action.payload };
    case REQUEST_ACTION.UPDATE_BODY:
      const request = state.request;
      return {
        ...state,
        request: { ...request, body: { ...request.body, ...action.payload } },
      };
    default:
      return state;
  }
}
