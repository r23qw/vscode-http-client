import React from "react";
import { Scrollbars } from "react-custom-scrollbars";
import styles from "./index.module.css";

interface SlimTableProps {
  columns: {
    name: string;
    width: string;
    key: string;
  }[];
  data: Record<string, string>[];
}

export default function SlimTable(props: SlimTableProps) {
  const ColGroup = () => {
    return (
      <colgroup>
        {props.columns.map((item, index) => (
          <col key={index} width={item.width} />
        ))}
      </colgroup>
    );
  };

  return (
    <div className={styles.container}>
      <header>
        <table className={styles.table}>
          <ColGroup />
          <tbody>
            <tr>
              {props.columns.map((column) => (
                <th key={column.name} className={styles.title}>
                  {column.name}
                </th>
              ))}
            </tr>
          </tbody>
        </table>
      </header>
      <section>
        <Scrollbars autoHide>
          <table className={styles.table}>
            <ColGroup />
            <tbody>
              {props.data.map((data, index) => (
                <tr key={index} className={styles.title}>
                  {props.columns.map((column, index) => (
                    <td key={index}>{String(data[column.key])}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </Scrollbars>
      </section>
    </div>
  );
}
