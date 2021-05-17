import { RESPONSE_BODY_TYPE } from "@/constants";
import { Radio } from "antd";
import React from "react";

interface BodyTypeProps {
  value: RESPONSE_BODY_TYPE;
  onChange: (value: RESPONSE_BODY_TYPE) => void;
}

export default function ResquestBodyType(props: BodyTypeProps) {
  return (
    <Radio.Group
      value={props.value}
      onChange={(e) => props.onChange(e.target.value)}
    >
      <Radio value={RESPONSE_BODY_TYPE.JSON}>json</Radio>
      <Radio value={RESPONSE_BODY_TYPE.PLAIN_TEXT}>plaintext</Radio>
      {/* <Radio value={REQUEST_BODY_TYPE.FORM_DATA}>form data</Radio> */}
      <Radio value={RESPONSE_BODY_TYPE.HTML}>html</Radio>
    </Radio.Group>
  );
}
