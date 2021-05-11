import Editor from "@monaco-editor/react";
import React from "react";
import BodyType from './BodyType';

export default function Body() {
  return <>
    <BodyType />
    <Editor
      height="90vh"
      defaultLanguage="javascript"
      defaultValue="// some comment"
   />
  </>;
}