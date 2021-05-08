import { Select } from "antd";
import React, { useState } from "react";
import { HTTP_METHODS } from "../../../constants";

interface Props {
  value?: string;
  onChange?: (value: string) => void;
}

export default function MethodSelect(props: Props) {
  const { value = HTTP_METHODS.GET } = props;
  const [method, setMethod] = useState(value);
  const handleChange = () => {
    setMethod(value);
  };
  return (
    <Select value={method} onChange={handleChange}>
      {Object.entries(HTTP_METHODS).map(([key, value]) => (
        <Select.Option key={value} value={value}>
          {key}
        </Select.Option>
      ))}
    </Select>
  );
}
