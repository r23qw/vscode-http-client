import * as path from "path";
import * as vscode from "vscode";

export function getPanel(context: vscode.ExtensionContext) {
  function getWebviewContent(panel: vscode.WebviewPanel) {
    return /*html*/ `
      <!DOCTYPE html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Http Client</title>
        </head>
        <body>
          <div id="app"></div>
          <script src="${panel.webview.asWebviewUri(
            vscode.Uri.file(
              path.join(context.extensionPath, "dist/views/bundle.js")
            )
          )}"></script>
        </body>
      </html>
    `;
  }

  const panel = vscode.window.createWebviewPanel(
    "Http Client",
    "Http Client",
    vscode.ViewColumn.One,
    {
      enableScripts: true,
      localResourceRoots: [
        vscode.Uri.file(path.join(context.extensionPath, "dist")),
      ],
    }
  );

  panel.webview.html = getWebviewContent(panel);

  return panel;
}
