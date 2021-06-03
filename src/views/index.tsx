import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { isVscodeWebview } from "./utils/env";

window.vscodeRef = isVscodeWebview ? window.acquireVsCodeApi() : undefined;

ReactDOM.render(<App />, document.getElementById("app"));
