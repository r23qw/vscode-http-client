import axios from "axios";
import * as vscode from "vscode";
import { SendToWebviewMessage } from "../interface/request-message";

export async function handleRequest(request: any, panel: vscode.WebviewPanel) {
  let message: SendToWebviewMessage | null = null;

  try {
    const { data, status, statusText, headers } = await axios({
      url: request.url,
    });
    message = {
      success: true,
      result: {
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
