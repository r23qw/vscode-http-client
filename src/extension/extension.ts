import * as vscode from "vscode";
import { SendToExtensionMessage } from "../interface/request-message";
import { handleRequest } from "./request";
import { getPanel } from "./webview";

export function activate(context: vscode.ExtensionContext) {
  let currentPanel: vscode.WebviewPanel | undefined = undefined;

  const openClientCommand = () => {
    if (currentPanel !== undefined) {
      currentPanel.reveal();
      return;
    }
    currentPanel = getPanel(context);
    currentPanel.onDidDispose(
      () => {
        currentPanel = undefined;
      },
      null,
      context.subscriptions
    );
    currentPanel.webview.onDidReceiveMessage(
      (message: SendToExtensionMessage) => {
        if (message.type === "request") {
          handleRequest(message.payload, currentPanel as vscode.WebviewPanel);
        }
      }
    );
  };

  let disposable = vscode.commands.registerCommand(
    "http-client.OpenHttpClient",
    openClientCommand
  );

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
