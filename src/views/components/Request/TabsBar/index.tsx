import { useTypedDispatch } from "@/store";
import { REQUEST_ACTION } from "@/store/request/action";
import { DownOutlined } from "@ant-design/icons";
import { Button, Dropdown } from "antd";
import React from "react";
import styles from "./index.module.css";
import NewMenu from "./NewMenu";
import RequestTabs from "./RequestTabs";

export default function TabsBar() {
  const dispatch = useTypedDispatch();
  const createNewRequest = () => {
    dispatch({ type: REQUEST_ACTION.CREATE_REQUEST });
  };

  return (
    <div className={styles.container}>
      <RequestTabs />
      <Dropdown overlay={NewMenu}>
        <Button
          className={styles.button}
          onClick={createNewRequest}
          type="primary"
        >
          New <DownOutlined />
        </Button>
      </Dropdown>
    </div>
  );
}
