import { useTypedSelector } from "@/store";
import { REQUEST_ACTION, sendRequest } from "@/store/request/action";
import { Button, Input } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styles from "./index.module.css";
import MethodSelect from "./MethodSelect";

export default function URLInput() {
  const dispatch = useDispatch();
  const requestState = useTypedSelector((state) => state.request);

  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState(requestState.url);
  const [method, setMethod] = useState(requestState.method);

  const handleChange = () => {
    dispatch({
      type: REQUEST_ACTION.UPDATE,
      payload: { url, method },
    });
  };

  const handleClick = () => {
    dispatch(sendRequest(requestState, setLoading));
  };

  return (
    <div className={styles.container}>
      <MethodSelect
        value={method}
        onChange={(method) => {
          setMethod(method);
          handleChange();
        }}
      />
      <Input
        size="large"
        value={url}
        onChange={(e) => {
          setUrl(e.target.value);
          handleChange();
        }}
        placeholder="input request url"
      />
      <Button
        size="large"
        loading={loading}
        type="primary"
        onClick={handleClick}
      >
        Send
      </Button>
    </div>
  );
}
