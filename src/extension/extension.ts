import * as path from "path";
import * as vscode from "vscode";
import { getPanel, HttpClientSerializer, initialPanel } from "./webview";

export function activate(context: vscode.ExtensionContext) {
  let currentPanel: { current: vscode.WebviewPanel | undefined } = {
    current: undefined,
  };
  const scriptUrl = vscode.Uri.file(
    path.join(context.extensionPath, "dist/app.js")
  );

  const openHttpClientCommand = () => {
    if (currentPanel.current !== undefined) {
      currentPanel.current.reveal();
    } else {
      currentPanel.current = getPanel(context, scriptUrl);
    }
    initialPanel(currentPanel);
  };

  let disposable = vscode.commands.registerCommand(
    "http-client.OpenHttpClient",
    openHttpClientCommand
  );

  context.subscriptions.push(disposable);

  // restore webview
  vscode.window.registerWebviewPanelSerializer(
    "HttpClient",
    new HttpClientSerializer(scriptUrl, currentPanel)
  );
}

// this method is called when your extension is deactivated
export function deactivate() {}
