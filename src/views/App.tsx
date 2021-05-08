import { ConfigProvider } from "antd";
import "antd/dist/antd.css";
import React from "react";
import { Provider } from "react-redux";
import "./common.css";
import Request from "./components/Request";
import store from "./store";

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <ConfigProvider componentSize="large">
        <Request />
      </ConfigProvider>
    </Provider>
  );
}
export default App;
