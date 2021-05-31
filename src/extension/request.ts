import type { AxiosRequestConfig } from "axios";
import axios from "axios";
import * as querystring from "querystring";
import * as Url from "url-parse";
import * as vscode from "vscode";
import {
  RequestActionMessage,
  SendToWebviewMessage,
} from "../interface/message";
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
  { id, payload }: RequestActionMessage,
  panel: vscode.WebviewPanel
) {
  let message: SendToWebviewMessage | null = null;

  try {
    const { data, status, statusText, headers } = await axios(
      getRequestConfig(payload)
    );
    message = {
      success: true,
      id,
      data: {
        data,
        status,
        statusText,
        headers,
      },
    };
  } catch (e) {
    message = { success: false, id, error: e };
  }

  panel.webview.postMessage(message);
}
