import React from "react";
import SplitPane from "react-split-pane";
import BasicInfo from "./BasicInfo";
import styles from "./index.module.css";
import RequestPanel from "./RequestPanel";
import ResponsePanel from "./ResponsePanel";

export default function Request() {
  return (
    <div className={styles.layout}>
      <BasicInfo />
      <div className={styles.container}>
        <SplitPane split="horizontal" minSize={50} defaultSize="50%">
          <RequestPanel />
          <ResponsePanel />
        </SplitPane>
      </div>
    </div>
  );
}
