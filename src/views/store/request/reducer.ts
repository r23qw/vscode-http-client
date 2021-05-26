import {
  HTTP_METHODS,
  HTTP_METHODS_VALUES,
  LANGUAGE,
  RequestLanguageList,
  REQUEST_BODY_TYPE,
} from "@/constants";
import { ValueOf, ValueOfSelectList } from "@/utils/type";
import { Action } from "redux";
import { getID } from "utils/uuid";
import { getPreviouseState } from "../helper";
import { REQUEST_ACTION } from "./action";

export type RequestRecordItem = {
  id: string;
  key: string;
  value: string;
  checked: boolean;
};

export type RequestState = {
  id: string;
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

const createRequest = (): RequestState => {
  return {
    id: getID(),
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
};
interface inititalState {
  index: number;
  requestList: RequestState[];
}
let previouseState = getPreviouseState("request");
let inititalState: inititalState =
  previouseState !== undefined
    ? (previouseState as inititalState)
    : { index: 0, requestList: [createRequest()] };

export default function (
  state = inititalState,
  action: Action<REQUEST_ACTION> & {
    payload?: any;
  }
): inititalState {
  switch (action.type) {
    case REQUEST_ACTION.CREATE_REQUEST: {
      state.requestList = [...state.requestList, createRequest()];
      state.index = state.requestList.length - 1;
      return { ...state };
    }
    case REQUEST_ACTION.CHANGE_REQUEST_TAB: {
      return { ...state, ...action.payload };
    }
    case REQUEST_ACTION.DELETE_REQUEST: {
      const pos: number = action.payload.index;
      let index = state.index;
      if (state.requestList.length === 1) {
        state.requestList = [createRequest()];
        index === 0;
      } else {
        state.requestList.splice(pos, 1);
        index =
          pos < index
            ? index - 1
            : Math.min(index, state.requestList.length - 1);
      }

      return { index, requestList: [...state.requestList] };
    }
    case REQUEST_ACTION.UPDATE_REQUEST: {
      let target = state.requestList[state.index];
      state.requestList[state.index] = { ...target, ...action.payload };
      return state;
    }
    case REQUEST_ACTION.UPDATE_REQUEST_BODY: {
      let target = state.requestList[state.index];
      state.requestList[state.index] = {
        ...target,
        request: {
          ...target.request,
          body: {
            ...target.request.body,
            ...action.payload,
          },
        },
      };
      return state;
    }
    case REQUEST_ACTION.UPDATE_RESPONSE: {
      let target = state.requestList[state.index];
      target.response = { ...target.response, ...action.payload };
      return state;
    }
    default:
      return state;
  }
}
