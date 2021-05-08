import { Button, Input } from "antd";
import React from "react";
import styles from "./index.module.css";
import MethodSelect from "./MethodSelect";

export default function URLInput() {
  const handleClick = () => {};
  return (
    <div className={styles.container}>
      <MethodSelect />
      <Input placeholder="input request url" />
      <Button type="primary" onClick={handleClick}>
        Send
      </Button>
    </div>
  );
}
