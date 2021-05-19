import KeyValueTable from "@/components/common/KeyValueTable";
import NoData from "@/components/common/NoData";
import { useTypedSelector } from "@/store";
import React from "react";

export default function Headers() {
  const response = useTypedSelector((state) => state.request.response);
  if (Object.keys(response.headers).length === 0) {
    return <NoData />;
  }

  return <KeyValueTable values={response.headers} />;
}
