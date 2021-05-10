import { Select } from "antd";
import React from "react";
import { HTTP_METHODS } from "../../../constants";

interface Props {
  value?: string;
  onChange?: (value: string) => void;
}

export default function MethodSelect(props: Props) {

  return (
    <Select value={props.value || HTTP_METHODS.GET } onChange={method=>props.onChange?.(method)}>
      {Object.entries(HTTP_METHODS).map(([key, value]) => (
        <Select.Option key={value} value={value}>
          {key}
        </Select.Option>
      ))}
    </Select>
  );
}
