import { REQUEST_BODY_TYPE } from "@/constants";
import { useTypedDispatch, useTypedSelector } from "@/store";
import { REQUEST_ACTION } from "@/store/request/action";
import Editor, { useMonaco } from "@monaco-editor/react";
import React, { useEffect, useRef } from "react";

export default function Raw() {
  const body = useTypedSelector((state) => state.request.request.body);
  const { lang, value } = body[REQUEST_BODY_TYPE.RAW];
  const dispatch = useTypedDispatch();
  const monaco = useMonaco();
  const editorRef = useRef(null);

  useEffect(() => {
    if (!monaco) return;
    monaco.editor.setModelLanguage(
      monaco.editor.getModel("http://http-client/body.json"),
      lang
    );
  }, [monaco, lang]);

  const handleContentChange = (value: string | undefined) => {
    dispatch({
      type: REQUEST_ACTION.UPDATE_BODY,
      payload: {
        [REQUEST_BODY_TYPE.RAW]: {
          value,
          lang,
        },
      },
    });
  };

  const handleEditorMounted = (editor: any) => (editorRef.current = editor);

  return (
    <Editor
      path="http://http-client/body.json"
      options={{
        minimap: { enabled: false },
      }}
      onChange={handleContentChange}
      onMount={handleEditorMounted}
      defaultLanguage={lang}
      defaultValue={value}
    />
  );
}
