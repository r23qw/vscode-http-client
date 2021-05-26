import { REQUEST_BODY_TYPE } from "@/constants";
import { useRequestSelector, useTypedDispatch } from "@/store";
import { REQUEST_ACTION } from "@/store/request/action";
import Editor, { useMonaco } from "@monaco-editor/react";
import { Spin } from "antd";
import React, { useEffect } from "react";

export default function Raw() {
  const request = useRequestSelector();
  const body = request.request.body;
  const { lang, value } = body[REQUEST_BODY_TYPE.RAW];
  const dispatch = useTypedDispatch();
  const monaco = useMonaco();
  const path = `http-client://request-body/${request.id}`;

  useEffect(() => {
    if (!monaco) return;
    const model = monaco.editor.getModel(path);
    if (!model) return;
    monaco.editor.setModelLanguage(model, lang);
  }, [monaco, lang]);

  const handleContentChange = (value: string | undefined) => {
    dispatch({
      type: REQUEST_ACTION.UPDATE_REQUEST_BODY,
      payload: {
        [REQUEST_BODY_TYPE.RAW]: {
          value,
          lang,
        },
      },
    });
  };

  return (
    <Editor
      path={path}
      loading={<Spin />}
      options={{
        minimap: { enabled: false },
      }}
      onChange={handleContentChange}
      defaultLanguage={lang as string}
      defaultValue={value}
    />
  );
}
