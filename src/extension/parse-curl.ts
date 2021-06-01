import * as vscode from "vscode";
import {
  ParseCurlActionMessage,
  SendToWebviewMessage,
} from "../interface/message";
import { parseCurlCommand } from "./utils/curl-parser";

export async function parseCurl(
  { id, payload }: ParseCurlActionMessage,
  panel: vscode.WebviewPanel
) {
  let message: SendToWebviewMessage | null = null;

  try {
    const result = parseCurlCommand(payload);
    message = {
      success: true,
      id,
      data: result,
    };
  } catch (e) {
    message = {
      success: false,
      id,
      error: { message: `Parse Curl Failed` },
    };
  }

  panel.webview.postMessage(message);
}
