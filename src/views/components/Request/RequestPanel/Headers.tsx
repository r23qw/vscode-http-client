import RequestTable from "@/components/common/RequestTable";
import { useTypedDispatch, useTypedSelector } from "@/store";
import { REQUEST_ACTION } from "@/store/request/action";
import type { RequestRecordItem } from "@/store/request/reducer";
import React, { useState } from "react";

export default function Headers() {
  const request = useTypedSelector((state) => state.request.request);
  const [values, setValues] = useState<RequestRecordItem[]>(request.headers);
  const dispath = useTypedDispatch();

  const handleChange = (headers: RequestRecordItem[]) => {
    setValues(headers);
    dispath({
      type: REQUEST_ACTION.UPDATE,
      payload: { request: { ...request, headers} },
    });
  };
  return (
    <>
      <RequestTable values={values} onChange={handleChange} />
    </>
  );
}
