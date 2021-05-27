import { useTypedDispatch } from "@/store";
import { REQUEST_ACTION } from "@/store/request/action";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Input, Menu, Modal } from "antd";
import React, { useState } from "react";
import styles from "./index.module.css";
import RequestTabs from "./RequestTabs";

export default function TabsBar() {
  const dispatch = useTypedDispatch();
  const [visible, setVisible] = useState(false);
  const [curl, setCurl] = useState("");

  const createNewRequest = () => {
    dispatch({ type: REQUEST_ACTION.CREATE_REQUEST });
  };
  const handleMenuClick = ({ key }: any) => {
    if (key === "curl") {
      setVisible(true);
    }
  };
  const createRequestByCurl = () => {
    window.vscodeRef?.postMessage({ type: "parse-curl", payload: curl });
  };

  const NewMenu = () => (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="curl">import by bash curl</Menu.Item>
    </Menu>
  );
  return (
    <div className={styles.container}>
      <RequestTabs />
      <Dropdown.Button
        type="primary"
        onClick={createNewRequest}
        overlay={<NewMenu />}
        icon={<DownOutlined />}
      >
        New
      </Dropdown.Button>
      <Modal
        title="Import by bash curl"
        visible={visible}
        onCancel={() => {
          setVisible(false);
          setCurl("");
        }}
        onOk={createRequestByCurl}
      >
        <Input.TextArea
          placeholder="Paste curl"
          rows={6}
          value={curl}
          onChange={(e) => setCurl(e.target.value)}
        />
      </Modal>
    </div>
  );
}
