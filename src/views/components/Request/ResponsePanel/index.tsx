import { Tabs } from "antd";
import ErrorBoundary from "antd/lib/alert/ErrorBoundary";
import React from "react";
import Cookies from "./Cookies";
import Headers from "./Headers";
import styles from "./index.module.css";
import ResponseBody from "./ResponseBody";

export default function ResponsePanel() {
  return (
    <Tabs animated={false} className={styles.container}>
      <Tabs.TabPane tab="Body" key="body">
        <ErrorBoundary>
          <ResponseBody />
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
