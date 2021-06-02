import type { RequestRecordItem } from "@/store/request/reducer";
import CloseOutlined from "@ant-design/icons/CloseOutlined";
import { Checkbox, Input } from "antd";
import React from "react";
import styles from "./RequestTableRow.module.css";

interface RequestTableRowProps {
  value: RequestRecordItem;
  isLast: boolean;
  onChange: (value: RequestRecordItem) => void;
  onDelete: (value: RequestRecordItem) => void;
}

export default function RequestTableRow(props: RequestTableRowProps) {
  const handleChange = (state: Partial<RequestRecordItem>) => {
    props.onChange({ ...props.value, ...state });
  };
  return (
    <tr className={styles.row}>
      <td>
        {props.isLast !== true && (
          <>
            <CloseOutlined
              title="delete"
              className={styles.icon}
              onClick={() => props.onDelete(props.value)}
            />
            <Checkbox
              className={styles.checkbox}
              checked={props.value.checked}
              onChange={(e) => handleChange({ checked: e.target.checked })}
            />
          </>
        )}
      </td>
      <td>
        <Input
          onChange={(e) => handleChange({ key: e.target.value })}
          value={props.value.key}
          placeholder="Key"
          className={styles.input}
        />
      </td>
      <td>
        <Input
          onChange={(e) => handleChange({ value: e.target.value })}
          value={props.value.value}
          placeholder="Value"
          className={styles.input}
        />
      </td>
    </tr>
  );
}
