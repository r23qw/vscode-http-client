import { Menu } from "antd";
import React, { useEffect } from "react";

export default function NewMenu() {
  useEffect(() => {});
  const handleMenuClick = ({ key }: any) => {
    if (key !== "curl") {
    }
  };

  return (
    <>
      <Menu onClick={handleMenuClick}>
        <Menu.Item key="curl">import by bash curl</Menu.Item>
      </Menu>
    </>
  );
}
