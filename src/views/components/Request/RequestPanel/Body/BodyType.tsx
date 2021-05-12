import { REQUEST_BODY_TYPE } from "@/constants";
import { Radio } from "antd";
import React from "react";

interface BodyTypeProps {
  value: REQUEST_BODY_TYPE;
  onChange: (value: REQUEST_BODY_TYPE) => void;
}

export default function BodyType(props: BodyTypeProps) {
  return (
    <Radio.Group
      value={props.value}
      onChange={(e) => props.onChange(e.target.value)}
    >
      <Radio value={REQUEST_BODY_TYPE.NONE}>none</Radio>
      {/* <Radio value={REQUEST_BODY_TYPE.FORM_DATA}>form data</Radio> */}
      <Radio value={REQUEST_BODY_TYPE.X_WWW_FORM_URLENCODED}>
        x-www-form-urlencoded
      </Radio>
      <Radio value={REQUEST_BODY_TYPE.RAW}>raw</Radio>
    </Radio.Group>
  );
}
