import type { RequestRecordItem } from "@/store/request/reducer";
import { getID } from "@/utils/uuid";
import React, { useMemo } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import styles from "./index.module.css";
import RequestTableRow from "./RequestTableRow";

interface RequestTableProps {
  values: RequestRecordItem[];
  onChange: (value: RequestRecordItem[]) => void;
}

const ColGroup = () => (
  <colgroup>
    <col width="10%" />
    <col width="40%" />
    <col width="40%" />
  </colgroup>
);

export default function RequestTable(props: RequestTableProps) {
  const lastedID = useMemo(() => {
    return getID();
  }, [props.values.length]);

  const currentData: RequestRecordItem[] = [
    ...props.values,
    { id: lastedID, checked: true, key: "", value: "" },
  ];

  const handleChange = (item: RequestRecordItem) => {
    const finalData = JSON.parse(
      JSON.stringify(props.values)
    ) as RequestRecordItem[];

    const index = finalData.findIndex((i) => i.id === item.id);

    if (index !== -1) {
      finalData.splice(index, 1, item);
    } else {
      finalData.push(item);
    }
    props.onChange(finalData);
  };

  const handleDelete = (item: RequestRecordItem) => {
    const finalData = JSON.parse(
      JSON.stringify(props.values)
    ) as RequestRecordItem[];

    const index = finalData.findIndex((i) => i.id === item.id);

    if (index === -1) return;

    finalData.splice(index, 1);
    props.onChange(finalData);
  };

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
              {currentData.map((item, index) => (
                <RequestTableRow
                  isLast={index === currentData.length - 1}
                  key={item.id}
                  value={item}
                  onChange={handleChange}
                  onDelete={handleDelete}
                />
              ))}
            </tbody>
          </table>
        </Scrollbars>
      </section>
    </div>
  );
}
