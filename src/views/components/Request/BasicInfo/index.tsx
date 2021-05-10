import { REQUEST_ACTION, sendRequest } from "@/store/request/action";
import { Button, Input } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useStore } from "react-redux";
import styles from "./index.module.css";
import MethodSelect from "./MethodSelect";

export default function URLInput() {
  const store = useStore();
  const dispatch = useDispatch();
  const requestState = store.getState().request;
  
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState(requestState.url);
  const [method,setMethod] = useState(requestState.method)

  useEffect(() => {
    dispatch({
      type: REQUEST_ACTION.UPDATE_REQUEST,
      payload: { url,method },
    });
  },[url,method])

  const handleClick = () => {
    dispatch(sendRequest(store.getState().request, setLoading));
  };
  return (
    <div className={styles.container}>
      <MethodSelect value={method} onChange={method=>setMethod(method)} />
      <Input
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="input request url"
      />
      <Button loading={loading} type="primary" onClick={handleClick}>
        Send
      </Button>
    </div>
  );
}
