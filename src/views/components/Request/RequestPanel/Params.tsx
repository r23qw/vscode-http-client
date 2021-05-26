import RequestTable from "@/components/common/RequestTable";
import { useRequestSelector, useTypedDispatch } from "@/store";
import { REQUEST_ACTION } from "@/store/request/action";
import type { RequestRecordItem } from "@/store/request/reducer";
import React from "react";

export default function Params() {
  const request = useRequestSelector((state) => state.request);
  const dispath = useTypedDispatch();

  const handleChange = (params: RequestRecordItem[]) => {
    dispath({
      type: REQUEST_ACTION.UPDATE_REQUEST,
      payload: { request: { ...request, params } },
    });
  };
  return <RequestTable values={request.params} onChange={handleChange} />;
}
