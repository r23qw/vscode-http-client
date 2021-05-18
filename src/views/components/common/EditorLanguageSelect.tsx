import { LanguageList } from "@/constants";
import { ValueOfSelectList } from "@/utils/type";
import { Select } from "antd";
import React from "react";

interface EditorLanguageSelectProps {
  languages: LanguageList;
  value: ValueOfSelectList<LanguageList>;
  onChange: (value: ValueOfSelectList<LanguageList>) => void;
}

export default function EditorLanguageSelect(props: EditorLanguageSelectProps) {
  return (
    <Select
      style={{ width: "100px" }}
      size="small"
      value={props.value}
      onChange={(lang) => props.onChange(lang)}
    >
      {props.languages.map(({ name, value }) => (
        <Select.Option key={value} value={value}>
          {name}
        </Select.Option>
      ))}
    </Select>
  );
}
