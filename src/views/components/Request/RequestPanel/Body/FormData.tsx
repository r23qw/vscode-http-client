import RequestTable from "@/components/common/RequestTable";
import { REQUEST_BODY_TYPE } from "@/constants";
import { useTypedDispatch, useTypedSelector } from "@/store";
import { REQUEST_ACTION } from "@/store/request/action";
import type { RequestRecordItem } from "@/store/request/reducer";
import React from "react";

export default function FormData() {
  const body = useTypedSelector((state) => state.request.request.body);
  const dispath = useTypedDispatch();

  const handleChange = (data: RequestRecordItem[]) => {
    dispath({
      type: REQUEST_ACTION.UPDATE_REQUEST_BODY,
      payload: { [REQUEST_BODY_TYPE.FORM_DATA]: data },
    });
  };
  return (
    <RequestTable
      values={body[REQUEST_BODY_TYPE.FORM_DATA]}
      onChange={handleChange}
    />
  );
}
