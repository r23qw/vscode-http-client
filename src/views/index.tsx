import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

window.vscode = window.acquireVsCodeApi();

ReactDOM.render(<App />, document.getElementById("app"));
