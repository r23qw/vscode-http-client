import { ConfigProvider } from "antd";
import React from "react";
import { Provider } from "react-redux";
import styles from "./App.module.css";
import "./common.css";
import Request from "./components/Request";
import store from "./store";

export enum ThemeKind {
  dark = "vscode-dark",
  light = "vscode-light",
  contrast = "vscode-high-contrast",
}

const themeKind: ThemeKind = document.body.dataset.vscodeThemeKind as ThemeKind;

[ThemeKind.dark, ThemeKind.contrast].includes(themeKind)
  ? require("antd/dist/antd.dark.min.css")
  : require("antd/dist/antd.min.css");

const themeKindMap = {
  [ThemeKind.dark]: "vs-dark",
  [ThemeKind.light]: "vs",
  [ThemeKind.contrast]: "hc-black",
};

const theme = themeKindMap[themeKind];
export const ThemeKindContext = React.createContext({ themeKind, theme });

function App(): JSX.Element {
  return (
    <ThemeKindContext.Provider value={{ themeKind, theme }}>
      <Provider store={store}>
        <ConfigProvider componentSize="middle">
          <div className={styles.container}>
            <Request />
          </div>
        </ConfigProvider>
      </Provider>
    </ThemeKindContext.Provider>
  );
}
export default App;
