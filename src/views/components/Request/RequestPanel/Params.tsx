import RequestTable from "@/components/common/RequestTable";
import type { RequestRecordItem } from "@/store/request/reducer";
import React, { useState } from "react";

export default function Params() {
  const [values, setValues] = useState<RequestRecordItem[]>([]);
  return (
    <>
      <RequestTable values={values} onChange={(values) => setValues(values)} />
    </>
  );
}
