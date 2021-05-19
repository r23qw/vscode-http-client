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

  const handleChange = (payload: Partial<typeof requestState>) =>
    dispatch({
      type: REQUEST_ACTION.UPDATE,
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
        size="large"
        value={requestState.url}
        onPressEnter={handleClick}
        onChange={(e) => handleChange({ url: e.target.value })}
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
