import KeyValueTable from "@/components/common/KeyValueTable";
import NoData from "@/components/common/NoData";
import { useRequestSelector } from "@/store";
import React from "react";

export default function Headers() {
  const response = useRequestSelector((state) => state.response);
  if (Object.keys(response.headers).length === 0) {
    return <NoData />;
  }

  return <KeyValueTable values={response.headers} />;
}
