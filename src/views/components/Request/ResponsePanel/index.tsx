import { Tabs } from "antd";
import React from "react";
import Body from "./Body";
import styles from "./index.module.css";

export default function ResponsePanel() {
  return (
    <Tabs animated={false} className={styles.container}>
      <Tabs.TabPane tab="Body" key="1">
        <Body />
      </Tabs.TabPane>
      <Tabs.TabPane tab="Cookies" key="2"></Tabs.TabPane>
      <Tabs.TabPane tab="Headers" key="3">
        1
      </Tabs.TabPane>
    </Tabs>
  );
}
