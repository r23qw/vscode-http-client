import type { RequestRecordItem } from "@/store/request/reducer";
import { Checkbox, Input } from "antd";
import React from "react";
import styles from "./RequestTableRow.module.css";

interface RequestTableRowProps {
  value: RequestRecordItem;
  onChange: (value: RequestRecordItem) => void;
}

export default function RequestTableRow(props: RequestTableRowProps) {
  const handleChange = (state: object) => {
    props.onChange({ ...props.value, ...state });
  };
  return (
    <tr>
      <td>
        <Checkbox
          value={props.value.checked}
          onChange={(checked) => handleChange({ checked })}
        />
      </td>
      <td>
        <Input
          onChange={(key) => handleChange({ key })}
          value={props.value.key}
          placeholder="Key"
          className={styles.input}
        />
      </td>
      <td>
        <Input
          onChange={(value) => handleChange({ value })}
          value={props.value.value}
          placeholder="Value"
          className={styles.input}
        />
      </td>
    </tr>
  );
}
