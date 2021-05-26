import RequestTable from "@/components/common/RequestTable";
import { useRequestSelector, useTypedDispatch } from "@/store";
import { REQUEST_ACTION } from "@/store/request/action";
import type { RequestRecordItem } from "@/store/request/reducer";
import React from "react";

export default function Headers() {
  const request = useRequestSelector((state) => state.request);
  const dispath = useTypedDispatch();

  const handleChange = (headers: RequestRecordItem[]) => {
    dispath({
      type: REQUEST_ACTION.UPDATE_REQUEST,
      payload: { request: { ...request, headers } },
    });
  };
  return <RequestTable values={request.headers} onChange={handleChange} />;
}
