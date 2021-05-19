import { Tabs } from "antd";
import ErrorBoundary from "antd/lib/alert/ErrorBoundary";
import React from "react";
import Body from "./Body";
import Cookies from "./Cookies";
import Headers from "./Headers";
import styles from "./index.module.css";

export default function ResponsePanel() {
  return (
    <Tabs animated={false} className={styles.container}>
      <Tabs.TabPane tab="Body" key="1">
        <ErrorBoundary>
          <Body />
        </ErrorBoundary>
      </Tabs.TabPane>
      <Tabs.TabPane tab="Headers" key="3">
        <Headers />
      </Tabs.TabPane>
      <Tabs.TabPane tab="Cookies" key="2">
        <Cookies />
      </Tabs.TabPane>
    </Tabs>
  );
}
