import { Input, Menu, Modal } from "antd";
import React from "react";

export default function NewMenu() {
  const handleMenuClick = ({ key }: any) => {
    if (key !== "curl") return;
    Modal.confirm({
      icon: null,
      content: <Input />,
      onOk() {},
    });
  };

  return (
    <>
      <Menu onClick={handleMenuClick}>
        <Menu.Item key="curl">import by bash curl</Menu.Item>
      </Menu>
    </>
  );
}
