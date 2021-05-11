import RequestTable from "@/components/common/RequestTable";
import { useTypedDispatch, useTypedSelector } from "@/store";
import { REQUEST_ACTION } from "@/store/request/action";
import type { RequestRecordItem } from "@/store/request/reducer";
import React, { useState } from "react";

export default function Params() {
  const params = useTypedSelector((state) => state.request.request.params);
  const [values, setValues] = useState<RequestRecordItem[]>(params);
  const dispath = useTypedDispatch();

  const handleChange = (values: RequestRecordItem[]) => {
    setValues(values);
    dispath({
      type: REQUEST_ACTION.UPDATE,
      payload: { request: { params: values } },
    });
  };
  return (
    <>
      <RequestTable values={values} onChange={handleChange} />
    </>
  );
}
