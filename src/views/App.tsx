import { ConfigProvider } from "antd";
import "antd/dist/antd.min.css";
import React from "react";
import { Provider } from "react-redux";
import styles from "./App.module.css";
import "./common.css";
import Request from "./components/Request";
import store from "./store";

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <ConfigProvider componentSize="middle">
        <div className={styles.container}>
          <Request />
        </div>
      </ConfigProvider>
    </Provider>
  );
}
export default App;
