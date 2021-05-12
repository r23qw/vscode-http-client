import RequestTable from "@/components/common/RequestTable";
import { useTypedDispatch, useTypedSelector } from "@/store";
import { REQUEST_ACTION } from "@/store/request/action";
import type { RequestRecordItem } from "@/store/request/reducer";
import React from "react";

export default function Params() {
  const request = useTypedSelector((state) => state.request.request);
  const dispath = useTypedDispatch();

  const handleChange = (params: RequestRecordItem[]) => {
    dispath({
      type: REQUEST_ACTION.UPDATE,
      payload: { request: { ...request, params } },
    });
  };
  return <RequestTable values={request.params} onChange={handleChange} />;
}
