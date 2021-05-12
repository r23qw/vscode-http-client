import { REQUEST_BODY_TYPE } from "@/constants";
import { useTypedDispatch, useTypedSelector } from "@/store";
import { REQUEST_ACTION } from "@/store/request/action";
import Editor from "@monaco-editor/react";
import React from "react";

export default function Raw() {
  const body = useTypedSelector((state) => state.request.request.body);
  const dispatch = useTypedDispatch();

  const handleChange = (value: string | undefined) => {
    dispatch({
      type: REQUEST_ACTION.UPDATE_BODY,
      payload: { [REQUEST_BODY_TYPE.RAW]: value },
    });
  };
  return (
    <Editor
      options={{
        minimap: { enabled: false },
      }}
      onChange={handleChange}
      defaultLanguage="json"
      defaultValue={body[REQUEST_BODY_TYPE.RAW]}
    />
  );
}
