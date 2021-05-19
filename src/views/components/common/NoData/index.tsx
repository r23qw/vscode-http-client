import React from "react";
import styles from "./index.module.css";

interface NoDataProps {
  message?: string;
}
export default function NoData(props: NoDataProps) {
  const message = props.message || "No Data";
  return <div className={styles.text}>{message}</div>;
}
