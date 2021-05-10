import { Tabs } from 'antd';
import React from "react";
import styles from './index.module.css';

export default function RequestPanel() {
  return <Tabs className={styles.container}>
    <Tabs.TabPane tab="Params" key="1">
      Params
    </Tabs.TabPane>
     <Tabs.TabPane tab="Headers" key="2">
      
    </Tabs.TabPane>
    <Tabs.TabPane tab="Body" key="3">
      1
    </Tabs.TabPane>
  </Tabs>;
}
