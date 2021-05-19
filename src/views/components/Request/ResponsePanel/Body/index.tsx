import EditorLanguageSelect from "@/components/common/EditorLanguageSelect";
import NoData from "@/components/common/NoData";
import { LanguageList, ResponseLanguageList } from "@/constants";
import { useTypedDispatch, useTypedSelector } from "@/store";
import { REQUEST_ACTION } from "@/store/request/action";
import type { ValueOfSelectList } from "@/utils/type";
import Editor, { useMonaco } from "@monaco-editor/react";
import { Spin } from "antd";
import React, { useEffect } from "react";
import styles from "./index.module.css";

export default function Body() {
  const response = useTypedSelector((state) => state.request.response);

  const dispatch = useTypedDispatch();
  const monaco = useMonaco();
  const path = "http-client://response-body";

  useEffect(() => {
    if (!monaco) return;
    const model = monaco.editor.getModel(path);
    if (!model) return;
    monaco.editor.setModelLanguage(model, response.lang);
    model.setValue(response.data);
  }, [monaco, response.lang, response.data]);

  const handleLangChange = (lang: ValueOfSelectList<LanguageList>) => {
    dispatch({
      type: REQUEST_ACTION.UPDATE_RESPONSE,
      payload: { lang },
    });
  };

  if (!response.data) {
    return <NoData />;
  }
  return (
    <div className={styles.container}>
      <div className={styles.controller}>
        <EditorLanguageSelect
          value={response.lang}
          languages={ResponseLanguageList}
          onChange={handleLangChange}
        />
      </div>
      <div className={styles["editor-wrapper"]}>
        <Editor
          loading={<Spin />}
          path={path}
          options={{
            minimap: { enabled: false },
          }}
          defaultLanguage={response.lang}
          defaultValue={response.data}
        />
      </div>
    </div>
  );
}
