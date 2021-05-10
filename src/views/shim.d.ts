declare module "*.css" {
  const styles: Record<string, string>;
  export default styles;
}

interface Window {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
  HTTP_CLIENT: { previouseState: any };
  vscode: vscode;
  acquireVsCodeApi: () => vscode;
}
