import { RequestState } from "@/store/request/reducer";
import { message } from "antd";
import type React from "react";
import type { Action } from "redux";
import type { ThunkDispatch } from "redux-thunk";
import {
  SendToExtensionMessage,
  SendToWebviewMessage,
} from "../../../interface/request-message";

export enum REQUEST_ACTION {
  CREATE_REQUEST = "REQUEST/CREATE_REQUEST",
  CHANGE_REQUEST_TAB = "REQUEST/CHANGE_REQUEST_TAB",
  DELETE_REQUEST = "REQUEST/DELETE_REQUEST",
  UPDATE_REQUEST = "REQUEST/UPDATE_REQUEST",
  UPDATE_REQUEST_BODY = "REQUEST/UPDATE_REQUEST_BODY",
  UPDATE_RESPONSE = "REQUEST/UPDATE_RESPONSE",
}

export const sendRequest = (
  state: RequestState,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  return (
    dispatch: ThunkDispatch<
      RequestState,
      { payload: Partial<RequestState> },
      Action<REQUEST_ACTION.UPDATE_RESPONSE>
    >
  ) => {
    setLoading(true);
    return new Promise<SendToWebviewMessage>((resolve) => {
      const message: SendToExtensionMessage = {
        type: "request",
        payload: state,
      };
      console.log("[to extension]", message);
      window.vscodeRef?.postMessage(message);

      const handleMessage = (message: MessageEvent<SendToWebviewMessage>) => {
        resolve(message.data);
        window.removeEventListener("message", handleMessage);
      };

      window.addEventListener("message", handleMessage);
    })
      .then((result) => {
        if (result.success) {
          dispatch({
            type: REQUEST_ACTION.UPDATE_RESPONSE,
            payload: result.response,
          });
        } else {
          message.error(result.error?.message || "unknown error");
        }
      })
      .finally(() => setLoading(false));
  };
};
