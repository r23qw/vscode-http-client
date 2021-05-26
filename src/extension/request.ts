import type { AxiosRequestConfig } from "axios";
import axios from "axios";
import * as querystring from "querystring";
import * as Url from "url-parse";
import * as vscode from "vscode";
import { SendToWebviewMessage } from "../interface/request-message";
import { HTTP_METHODS } from "../views/constants";
import { RequestState } from "../views/store/request/reducer";

export const getRequestConfig = (state: RequestState): AxiosRequestConfig => {
  const url = new Url(state.url);

  if (!url.protocol) {
    url.set("protocol", "http");
  }

  const config: AxiosRequestConfig = {
    url: url.href,
    method: state.method,
    headers: state.request.headers,
    params: state.request.params,
    paramsSerializer: function (params: any) {
      const param: Record<string, string> = {};
      params.forEach((i: any) => {
        if (!i.checked) {
          return;
        }
        param[i.key] = i.value;
      });
      return querystring.stringify(param);
    },
  };
  if (
    ![HTTP_METHODS.GET, HTTP_METHODS.DELETE, HTTP_METHODS.OPTIONS].includes(
      state.method
    )
  ) {
    config.data = state.request.body;
  }
  return config;
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
      id: state.id,
      response: {
        data,
        status,
        statusText,
        headers,
      },
    };
  } catch (e) {
    message = { success: false, id: state.id, error: e };
  }

  panel.webview.postMessage(message);
}
