import * as path from "path";
import * as vscode from "vscode";

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
          <script>
            window.HTTP_CLIENT = {
              previouseState: ${JSON.stringify(previouseState)}
            }
          </script>
          <script src="${panel.webview.asWebviewUri(scriptUrl)}"></script>
        </body>
      </html>
    `;
}

export class HttpClientSerializer implements vscode.WebviewPanelSerializer {
  scriptUrl: vscode.Uri;
  constructor(scriptUrl: vscode.Uri) {
    this.scriptUrl = scriptUrl;
  }
  async deserializeWebviewPanel(webviewPanel: vscode.WebviewPanel, state: any) {
    // `state` is the state persisted using `setState` inside the webview
    console.log(`Got state: ${state}`);
    console.log(state);
    // Restore the content of our webview.
    //
    // Make sure we hold on to the `webviewPanel` passed in here and
    // also restore any event listeners we need on it.
    webviewPanel.webview.html = getWebviewContent(
      webviewPanel,
      this.scriptUrl,
      state
    );
  }
}
