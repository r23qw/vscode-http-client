import {
  HTTP_METHODS,
  HTTP_METHODS_VALUES,
  LANGUAGE,
  RequestLanguageList,
  REQUEST_BODY_TYPE,
} from "@/constants";
import { ValueOf, ValueOfSelectList } from "@/utils/type";
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
      [REQUEST_BODY_TYPE.RAW]: {
        lang: ValueOfSelectList<typeof RequestLanguageList>;
        value: string;
      };
    };
  };
  response: {
    lang: ValueOf<typeof LANGUAGE>;
    data: string;
    headers: Record<string, string | string[]>;
    status: number | null;
    statusText: string;
  };
};
let previouseState = getPreviouseState("request");
let inititalState: RequestState =
  previouseState !== undefined
    ? (previouseState as RequestState)
    : {
        url: "",
        method: HTTP_METHODS.GET,
        request: {
          params: [],
          headers: [],
          body: {
            type: REQUEST_BODY_TYPE.RAW,
            [REQUEST_BODY_TYPE.FORM_DATA]: [],
            [REQUEST_BODY_TYPE.X_WWW_FORM_URLENCODED]: [],
            [REQUEST_BODY_TYPE.RAW]: {
              lang: LANGUAGE.JSON,
              value: "",
            },
          },
        },
        response: {
          lang: LANGUAGE.PLAIN_TEXT,
          data: "",
          headers: {},
          status: null,
          statusText: "",
        },
      };

export default function (
  state = inititalState,
  action: Action<REQUEST_ACTION> & {
    payload: REQUEST_ACTION extends REQUEST_ACTION.UPDATE_REQUEST_BODY
      ? Partial<RequestState["request"]["body"]>
      : Partial<RequestState>;
  }
): RequestState {
  switch (action.type) {
    case REQUEST_ACTION.UPDATE: {
      return { ...state, ...action.payload };
    }
    case REQUEST_ACTION.UPDATE_REQUEST_BODY: {
      const request = state.request;
      return {
        ...state,
        request: { ...request, body: { ...request.body, ...action.payload } },
      };
    }
    case REQUEST_ACTION.UPDATE_RESPONSE: {
      return {
        ...state,
        response: {
          ...state.response,
          ...action.payload,
        },
      };
    }
    default:
      return state;
  }
}
