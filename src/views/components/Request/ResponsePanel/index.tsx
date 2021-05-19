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
      <Tabs.TabPane tab="Body" key="body">
        <ErrorBoundary>
          <Body />
        </ErrorBoundary>
      </Tabs.TabPane>
      <Tabs.TabPane tab="Headers" key="headers">
        <Headers />
      </Tabs.TabPane>
      <Tabs.TabPane tab="Cookies" key="cookies">
        <Cookies />
      </Tabs.TabPane>
    </Tabs>
  );
}
