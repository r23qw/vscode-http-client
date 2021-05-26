import { Menu } from "antd";
import React from "react";

export default function NewMenu() {
  const handleMenuClick = ({ key }: any) => {
    if (key === "curl") {
      alert("import by curl");
    }
  };
  return (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="curl">import by bash curl</Menu.Item>
    </Menu>
  );
}
