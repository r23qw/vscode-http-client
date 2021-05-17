import type { RequestState } from "../views/store/request/reducer";

export type SendToWebviewMessage =
  | { success: true; response: object | null }
  | { success: false; error: Error | null };

export interface SendToExtensionMessage {
  type: "request";
  payload: RequestState;
}
