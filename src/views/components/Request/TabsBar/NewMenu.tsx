import { Menu, Modal } from "antd";
import React, { useState } from "react";

export default function NewMenu() {
  const [visible, setVisible] = useState(false);

  const handleMenuClick = ({ key }: any) => {
    if (key === "curl") {
      setVisible(true);
    }
  };

  const handleConfirm = () => {
    setVisible(false);
  };
  const handleCancel = () => {
    setVisible(false);
  };
  return (
    <>
      <Menu onClick={handleMenuClick}>
        <Menu.Item key="curl">import by bash curl</Menu.Item>
      </Menu>
      <Modal
        title="import request by bash curl"
        visible={visible}
        onOk={handleConfirm}
        onCancel={handleCancel}
      >
        test
      </Modal>
    </>
  );
}
