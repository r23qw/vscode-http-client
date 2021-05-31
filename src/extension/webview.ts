import * as path from "path";
import * as vscode from "vscode";
import { SendToExtensionMessage } from "../interface/message";
import { parseCurl } from "./parse-curl";
import { handleRequest } from "./request";

export function getPanel(
  context: vscode.ExtensionContext,
  scriptUrl: vscode.Uri
) {
  const panel = vscode.window.createWebviewPanel(
    "HttpClient",
    "Http Client",
    vscode.ViewColumn.One,
    {
      enableScripts: true,
      retainContextWhenHidden: true,
      localResourceRoots: [
        vscode.Uri.file(path.join(context.extensionPath, "dist")),
      ],
    }
  );

  panel.webview.html = getWebviewContent(panel, scriptUrl);

  return panel;
}

function getWebviewContent(
  panel: vscode.WebviewPanel,
  scriptUrl: vscode.Uri,
  previouseState?: object
) {
  return /*html*/ `
      <!DOCTYPE html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Http Client</title>
        </head>
        <body>
          <div id="app"></div>
          ${
            previouseState
              ? `
                <script>
                  window.HTTP_CLIENT = {
                    previouseState: "${encodeURI(
                      JSON.stringify(previouseState)
                    )}"
                  }
                </script>
          `
              : ""
          }
          
          <script src="${panel.webview.asWebviewUri(scriptUrl)}"></script>
        </body>
      </html>
    `;
}

export class HttpClientSerializer implements vscode.WebviewPanelSerializer {
  scriptUrl: vscode.Uri;
  currentPanel: { current: vscode.WebviewPanel | undefined };
  constructor(
    scriptUrl: vscode.Uri,
    currentPanel: { current: vscode.WebviewPanel | undefined }
  ) {
    this.scriptUrl = scriptUrl;
    this.currentPanel = currentPanel;
  }
  async deserializeWebviewPanel(webviewPanel: vscode.WebviewPanel, state: any) {
    webviewPanel.webview.html = getWebviewContent(
      webviewPanel,
      this.scriptUrl,
      state
    );
    this.currentPanel.current = webviewPanel;
    initialPanel(this.currentPanel);
  }
}

export function initialPanel(currentPanel: {
  current: vscode.WebviewPanel | undefined;
}) {
  currentPanel.current?.onDidDispose(() => {
    currentPanel.current = undefined;
  }, null);

  currentPanel.current?.webview.onDidReceiveMessage(
    (message: SendToExtensionMessage) => {
      if (message.type === "request") {
        handleRequest(message, currentPanel.current as vscode.WebviewPanel);
      }
      if (message.type === "parse-curl") {
        parseCurl(message, currentPanel.current as vscode.WebviewPanel);
      }
    }
  );
}
