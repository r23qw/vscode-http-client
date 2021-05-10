import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { isVscodeWebview } from './utils/env';

const noop = ()=>{}

window.vscode = isVscodeWebview ? window.acquireVsCodeApi() : {getState:noop,setState:noop,postMessage:noop};

ReactDOM.render(<App />, document.getElementById("app"));
