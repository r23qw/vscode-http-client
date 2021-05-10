/// <reference types="@types/vscode" />
declare module "*.css" {
  const styles: Record<string, string>;
  export default styles;
}

interface Window {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
  vscode: vscode;
  acquireVsCodeApi: () => vscode;
}
