import { RequestLanguageList } from "@/constants";
import { ValueOfSelectList } from "@/utils/type";
import { Select } from "antd";
import React from "react";

interface EditorLanguageSelectProps {
  value: ValueOfSelectList<typeof RequestLanguageList>;
  onChange: (value: ValueOfSelectList<typeof RequestLanguageList>) => void;
}

export default function EditorLanguageSelect(props: EditorLanguageSelectProps) {
  return (
    <Select
      style={{ width: "100px" }}
      size="small"
      value={props.value}
      onChange={(lang) => props.onChange(lang)}
    >
      {RequestLanguageList.map(({ name, value }) => (
        <Select.Option key={value} value={value}>
          {name}
        </Select.Option>
      ))}
    </Select>
  );
}
