import type { RequestState } from "../views/store/request/reducer";

export type SendToWebviewMessage =
  | { success: true; id: string; response: object | null }
  | { success: false; id: string; error: Error | null };

export interface SendToExtensionMessage {
  type: "request";
  payload: RequestState;
}
