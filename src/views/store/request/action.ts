import { RequestState } from "@/store/request/reducer";
import { message } from "antd";
import type React from "react";
import type { Action } from "redux";
import type { ThunkDispatch } from "redux-thunk";
import { postMessage } from "../../utils/postMessage";

export enum REQUEST_ACTION {
  CREATE_REQUEST = "REQUEST/CREATE_REQUEST",
  CHANGE_REQUEST_TAB = "REQUEST/CHANGE_REQUEST_TAB",
  DELETE_REQUEST = "REQUEST/DELETE_REQUEST",
  UPDATE_REQUEST = "REQUEST/UPDATE_REQUEST",
  UPDATE_REQUEST_LOADING = "REQUEST/UPDATE_REQUEST_LOADING",
  UPDATE_REQUEST_BODY = "REQUEST/UPDATE_REQUEST_BODY",
  UPDATE_RESPONSE = "REQUEST/UPDATE_RESPONSE",
}

export const sendRequest = (
  state: RequestState,
  setLoading: React.Dispatch<boolean>
) => {
  return (
    dispatch: ThunkDispatch<
      RequestState,
      { payload: Partial<RequestState> },
      Action<REQUEST_ACTION.UPDATE_RESPONSE>
    >
  ) => {
    setLoading(true);
    return postMessage({
      type: "request",
      payload: state,
    })
      .then((result) => {
        if (result.success) {
          dispatch({
            type: REQUEST_ACTION.UPDATE_RESPONSE,
            payload: result.data,
          });
        } else {
          message.error(result.error?.message || "unknown error");
        }
      })
      .finally(() => setLoading(false));
  };
};
