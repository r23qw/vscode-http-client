import type { AxiosRequestConfig } from "axios";
import axios from "axios";
import * as Url from "url-parse";
import * as vscode from "vscode";
import { SendToWebviewMessage } from "../interface/request-message";
import { RequestState } from "../views/store/request/reducer";

export const getRequestConfig = (state: RequestState): AxiosRequestConfig => {
  const url = new Url(state.url);

  if (!url.protocol) {
    url.set("protocol", "http");
  }

  return {
    url: url.href,
    method: state.method,
  };
};

export async function handleRequest(
  state: RequestState,
  panel: vscode.WebviewPanel
) {
  let message: SendToWebviewMessage | null = null;

  try {
    const { data, status, statusText, headers } = await axios(
      getRequestConfig(state)
    );
    message = {
      success: true,
      response: {
        data,
        status,
        statusText,
        headers,
      },
    };
  } catch (e) {
    message = { success: false, error: e };
  }

  panel.webview.postMessage(message);
}
