import { Checkbox, Input } from "antd";
import React from "react";
import styles from "./RequestTableRow.module.css";

export default function RequestTableRow() {
  return (
    <tr>
      <td>
        <Checkbox />
      </td>
      <td>
        <Input placeholder="Key" className={styles.input} />
      </td>
      <td>
        <Input placeholder="Value" className={styles.input} />
      </td>
    </tr>
  );
}
