import { EditorLanguage, LanguageList } from "@/constants";
import { Select } from "antd";
import React from "react";

interface EditorLanguageSelectProps {
  value: EditorLanguage;
  onChange: (value: EditorLanguage) => void;
}

export default function EditorLanguageSelect(props: EditorLanguageSelectProps) {
  return (
    <Select
      style={{ width: "100px" }}
      size="small"
      value={props.value}
      onChange={(lang) => props.onChange(lang)}
    >
      {LanguageList.map(({ name, value }) => (
        <Select.Option key={value} value={value}>
          {name}
        </Select.Option>
      ))}
    </Select>
  );
}
