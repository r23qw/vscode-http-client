export type SendToWebviewMessage =
  | { success: true; result: object | null }
  | { success: false; error: Error | null };

export interface SendToExtensionMessage {
  type: "request";
  payload: object;
}
