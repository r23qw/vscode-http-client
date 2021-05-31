import type { RequestState } from "../views/store/request/reducer";

export type SendToWebviewMessage =
  | { success: true; id: string; data: object | null }
  | { success: false; id: string; error: Error | null };

export type RequestActionMessage = {
  id: string;
  type: "request";
  payload: RequestState;
};

export type ParseCurlActionMessage = {
  id: string;
  type: "parse-curl";
  payload: string;
};

export type SendToExtensionMessage =
  | RequestActionMessage
  | ParseCurlActionMessage;
