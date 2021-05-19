import React from "react";
import { Scrollbars } from "react-custom-scrollbars";
import styles from "./index.module.css";

interface KeyValueTableProps {
  values: Record<string, string | string[]>;
}

const ColGroup = () => (
  <colgroup>
    <col width="30%" />
    <col width="70%" />
  </colgroup>
);

export default function KeyValueTable(props: KeyValueTableProps) {
  const TableRows = () => {
    return Object.entries(props.values).map(([key, value], index) => {
      if (value instanceof Array) {
        return value.map((value) => {
          return (
            <tr key={index}>
              <td>{key}</td>
              <td>{value}</td>
            </tr>
          );
        });
      }
      return (
        <tr key={index}>
          <td>{key}</td>
          <td>{value}</td>
        </tr>
      );
    });
  };

  return (
    <div className={styles.container}>
      <header>
        <table className={styles.table}>
          <ColGroup />
          <tbody>
            <tr>
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
            <tbody>{TableRows()}</tbody>
          </table>
        </Scrollbars>
      </section>
    </div>
  );
}
