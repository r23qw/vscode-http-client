import { useTypedDispatch, useTypedSelector } from "@/store";
import { REQUEST_ACTION } from "@/store/request/action";
import { Tabs } from "antd";
import React from "react";
import styles from "./RequestTabs.module.css";

export default function RequestTabs() {
  const request = useTypedSelector((state) => state.request);
  const list = request.requestList;
  const index = request.index;
  const id = list[index].id;
  const dispatch = useTypedDispatch();

  const handleChange = (key: string) => {
    dispatch({
      type: REQUEST_ACTION.CHANGE_REQUEST_TAB,
      payload: { id: key },
    });
  };

  const handleEdit = (key: any, action: "add" | "remove") => {
    if (action !== "remove") return;
    dispatch({
      type: REQUEST_ACTION.DELETE_REQUEST,
      payload: { id: key },
    });
  };

  return (
    <Tabs
      className={styles.tabs}
      hideAdd
      activeKey={id}
      type="editable-card"
      onChange={handleChange}
      onEdit={handleEdit}
    >
      {list.map((tab) => (
        <Tabs.TabPane tab={`Request ${tab.id.slice(0, 4)}`} key={tab.id} />
      ))}
    </Tabs>
  );
}
