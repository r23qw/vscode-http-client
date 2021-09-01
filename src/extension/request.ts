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
  const headers: Record<string, string> = {};
  state.request.headers.forEach(({ key, value, checked }) => {
    if (checked) {
      headers[key] = value;
    }
  });
  const config: AxiosRequestConfig = {
    url: url.href,
    method: state.method,
    headers,
    params: state.request.params,
    validateStatus: () => true,
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
    const type = state.request.body.type;
    // @ts-ignore
    let body = state.request.body[type];
    let data;
    if (type === "X_WWW_FORM_URLENCODED") {
      data = body
        .map((i: { key: string; value: string }) => `${i.key}=${i.value}`)
        .join("&");
    }
    if (type === "RAW") {
      data = body.value;
    }
    if (data) {
      config.data = data;
    }
  }
  return config;
};

export async function handleRequest(
  { id, payload }: RequestActionMessage,
  panel: vscode.WebviewPanel
) {
  let message: SendToWebviewMessage | null = null;

  try {
    const config = getRequestConfig(payload);
    let { data, status, statusText, headers } = await axios(config);
    try {
      data = JSON.stringify(data);
    } catch (e) {}
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
    message = {
      success: false,
      id,
      error: { message: e.message },
    };
  }

  panel.webview.postMessage(message);
}
