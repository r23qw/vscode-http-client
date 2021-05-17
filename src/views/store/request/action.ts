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
  UPDATE = "REQUEST/UPDATE",
  UPDATE_BODY = "REQUEST/UPDATE_BODY",
}

export const sendRequest = (
  state: RequestState,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  return (
    dispatch: ThunkDispatch<
      RequestState,
      { payload: Partial<RequestState> },
      Action<REQUEST_ACTION.UPDATE>
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
        console.log("recieve", message);
        resolve(message.data);
        window.removeEventListener("message", handleMessage);
      };

      window.addEventListener("message", handleMessage);
    })
      .then((result) => {
        if (result.success) {
          dispatch({
            type: REQUEST_ACTION.UPDATE,
            payload: { response: result.response },
          });
        } else {
          message.error(result.error?.message || "unknown error");
        }
      })
      .finally(() => setLoading(false));
  };
};
