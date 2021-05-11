import { Tabs } from "antd";
import React from "react";
import styles from "./index.module.css";
import Params from "./Params";

export default function RequestPanel() {
  return (
    <Tabs animated={false} className={styles.container}>
      <Tabs.TabPane tab="Params" key="params">
        <Params />
      </Tabs.TabPane>
      <Tabs.TabPane tab="Headers" key="headers"></Tabs.TabPane>
      <Tabs.TabPane tab="Cookies" key="cookies"></Tabs.TabPane>
      <Tabs.TabPane tab="Body" key="body">
        1
      </Tabs.TabPane>
    </Tabs>
  );
}
