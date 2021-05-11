import type { RequestRecordItem } from "@/store/request/reducer";
import React, { useState } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import styles from "./index.module.css";
import RequestTableRow from "./RequestTableRow";

interface RequestTableProps {
  values: RequestRecordItem[];
  onChange: (value: RequestRecordItem[]) => void;
}

const ColGroup = () => (
  <colgroup>
    <col width="6%" />
    <col width="42%" />
    <col width="42%" />
  </colgroup>
);

export default function RequestTable(props: RequestTableProps) {
  const [data, setData] = useState(props.values);
  const currentData: RequestRecordItem[] = [
    ...data,
    { checked: true, key: "", value: "" },
  ];

  return (
    <div className={styles.container}>
      <header>
        <table className={styles.table}>
          <ColGroup />
          <tbody>
            <tr>
              <th></th>
              <th className={styles.title}>KEY</th>
              <th className={styles.title}>VALUE</th>
            </tr>
          </tbody>
        </table>
      </header>
      <section>
        <Scrollbars autoHide>
          <table className={styles.table}>
            <ColGroup />
            <tbody>
              {currentData.map((item) => (
                <RequestTableRow
                  value={item}
                  onChange={(value) => Object.assign(item, value)}
                />
              ))}
            </tbody>
          </table>
        </Scrollbars>
      </section>
    </div>
  );
}
