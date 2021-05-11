import RequestTable from "@/components/common/RequestTable";
import { useTypedDispatch, useTypedSelector } from "@/store";
import { REQUEST_ACTION } from "@/store/request/action";
import type { RequestRecordItem } from "@/store/request/reducer";
import React, { useState } from "react";

export default function Params() {
  const request = useTypedSelector((state) => state.request.request);
  const [values, setValues] = useState<RequestRecordItem[]>(request.params);
  const dispath = useTypedDispatch();

  const handleChange = (params: RequestRecordItem[]) => {
    setValues(params);
    dispath({
      type: REQUEST_ACTION.UPDATE,
      payload: { request: { ...request, params} },
    });
  };
  return (
    <>
      <RequestTable values={values} onChange={handleChange} />
    </>
  );
}
