import { Select } from "antd";
import React from "react";
import { HTTP_METHODS, HTTP_METHODS_VALUES } from "../../../constants";

interface Props {
  value?: HTTP_METHODS_VALUES;
  onChange?: (value: HTTP_METHODS_VALUES) => void;
}

export default function MethodSelect(props: Props) {
  return (
    <Select
      value={props.value || HTTP_METHODS.GET}
      onChange={(method) => props.onChange?.(method)}
    >
      {Object.entries(HTTP_METHODS).map(([key, value]) => (
        <Select.Option key={value} value={value}>
          {key}
        </Select.Option>
      ))}
    </Select>
  );
}
