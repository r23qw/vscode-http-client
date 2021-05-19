import NoData from "@/components/common/NoData";
import SlimTable from "@/components/common/SlimTable";
import { useTypedSelector } from "@/store";
import React from "react";
import setCookieParser from "set-cookie-parser";

export default function Cookies() {
  const response = useTypedSelector((state) => state.request.response);
  const cookies = response.headers?.["set-cookie"];
  let data: Record<string, any> = [];

  if (cookies instanceof Array) {
    const defaultValue = {
      name: "",
      value: "",
      domain: "--",
      path: "/",
      expires: "Session",
      httpOnly: false,
      secure: false,
    };
    data = cookies.map((cookie) => {
      const parsed: Record<string, any> = Object.values(
        setCookieParser(cookie, { map: true })
      )[0];
      if (parsed.expires) parsed.expires = String(parsed.expires);
      return { ...defaultValue, ...parsed };
    });
  }

  const columns = [
    {
      name: "Name",
      key: "name",
      width: "15%",
    },
    {
      name: "Value",
      key: "value",
      width: "20%",
    },
    {
      name: "Domain",
      key: "domain",
      width: "10%",
    },
    {
      name: "Path",
      key: "path",
      width: "10%",
    },
    {
      name: "Expires",
      key: "expires",
      width: "15%",
    },
    {
      name: "HttpOnly",
      key: "httpOnly",
      width: "12%",
    },
    {
      name: "Secure",
      key: "secure",
      width: "10%",
    },
  ];
  if (!cookies) {
    return <NoData />;
  }
  return (
    <SlimTable columns={columns} data={data as Record<string, string>[]} />
  );
}
