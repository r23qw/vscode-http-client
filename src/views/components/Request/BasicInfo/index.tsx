import { useRequestSelector } from "@/store";
import { REQUEST_ACTION, sendRequest } from "@/store/request/action";
import { Button, Input } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styles from "./index.module.css";
import MethodSelect from "./MethodSelect";

export default function BaseInfo() {
  const dispatch = useDispatch();
  const requestState = useRequestSelector();
  const [loading, setLoading] = useState(false);
  const handleChange = (payload: Partial<typeof requestState>) =>
    dispatch({
      type: REQUEST_ACTION.UPDATE_REQUEST,
      payload,
    });

  const handleClick = () => {
    dispatch(sendRequest(requestState, setLoading));
  };

  return (
    <div className={styles.container}>
      <MethodSelect
        value={requestState.method}
        onChange={(method) => handleChange({ method })}
      />
      <Input
        value={requestState.url}
        onPressEnter={handleClick}
        onChange={(e) => handleChange({ url: e.target.value })}
        placeholder="input request url"
      />
      <Button loading={loading} type="primary" onClick={handleClick}>
        Send
      </Button>
    </div>
  );
}
