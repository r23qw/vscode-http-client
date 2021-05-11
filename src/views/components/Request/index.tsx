import React, { useLayoutEffect, useRef, useState } from "react";
import SplitPane from "react-split-pane";
import BasicInfo from "./BasicInfo";
import styles from "./index.module.css";
import RequestPanel from "./RequestPanel";
import ResponsePanel from "./ResponsePanel";

export default function Request() {
  const ref = useRef<HTMLDivElement>(null);
  const [maxSize, setMaxSize] = useState(600);

  useLayoutEffect(() => {
    const height = ref.current!.offsetHeight;
    setMaxSize(height - 50);
  });

  return (
    <div className={styles.layout}>
      <BasicInfo />
      <div ref={ref} className={styles.container}>
        <SplitPane
          split="horizontal"
          minSize={200}
          maxSize={maxSize}
          defaultSize="50%"
        >
          <RequestPanel />
          <ResponsePanel />
        </SplitPane>
      </div>
    </div>
  );
}
