import { RequestState } from "@/store/request/reducer";
import { message } from "antd";
import type React from "react";
import type { Dispatch } from "redux";
import {
  SendToExtensionMessage,
  SendToWebviewMessage,
} from "../../../interface/request-message";

export enum REQUEST_ACTION {
  UPDATE_REQUEST,
}

export const sendRequest = (
  state: RequestState,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  return (dispatch: Dispatch) => {
    setLoading(true);
    return new Promise<SendToWebviewMessage>((resolve, reject) => {
      const message: SendToExtensionMessage = {
        type: "request",
        payload: state,
      };

      window.vscode.postMessage(message);

      const handleMessage = (message: MessageEvent<SendToWebviewMessage>) => {
        resolve(message.data);
        window.removeEventListener("message", handleMessage);
      };
      window.addEventListener("message", handleMessage);
    })
      .then((result) => {
        if (result.success) {
          dispatch({ type: REQUEST_ACTION.UPDATE_REQUEST, payload: result });
        } else {
          message.error(result.error?.message || "unknown error");
        }
      })
      .finally(() => setLoading(false));
  };
};
