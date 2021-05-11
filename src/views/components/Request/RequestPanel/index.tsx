import { Tabs } from "antd";
import React from "react";
import Body from './Body';
import Headers from './Headers';
import styles from "./index.module.css";
import Params from "./Params";

export default function RequestPanel() {
  return (
    <Tabs animated={false} className={styles.container}>
      <Tabs.TabPane tab="Params" key="params">
        <Params />
      </Tabs.TabPane>
      <Tabs.TabPane tab="Headers" key="headers">
        <Headers />
      </Tabs.TabPane>
      <Tabs.TabPane tab="Body" key="body">
        <Body/>
      </Tabs.TabPane>
    </Tabs>
  );
}
