import { REQUEST_BODY_TYPE } from "@/constants";
import { useTypedDispatch, useTypedSelector } from "@/store";
import { REQUEST_ACTION } from "@/store/request/action";
import React from "react";
import BodyType from "./BodyType";
import FormData from "./FormData";
import styles from "./index.module.css";
import None from "./None";
import Raw from "./Raw";
import XwwFormUrlEncoded from "./XWwwFormUrlEncoded";

export default function Body() {
  const body = useTypedSelector((state) => state.request.request.body);
  const dispath = useTypedDispatch();

  const handleTypeChange = (type: REQUEST_BODY_TYPE) => {
    dispath({ type: REQUEST_ACTION.UPDATE_BODY, payload: { type } });
  };
  const getClass = (type: REQUEST_BODY_TYPE) =>
    body.type === type ? "" : styles.hidden;

  return (
    <div className={styles.container}>
      <BodyType value={body.type} onChange={handleTypeChange} />
      <div className={styles.content}>
        <div className={getClass(REQUEST_BODY_TYPE.NONE)}>
          <None />
        </div>
        <div className={getClass(REQUEST_BODY_TYPE.FORM_DATA)}>
          <FormData />
        </div>
        <div className={getClass(REQUEST_BODY_TYPE.X_WWW_FORM_URLENCODED)}>
          <XwwFormUrlEncoded />
        </div>
        <div className={getClass(REQUEST_BODY_TYPE.RAW)}>
          <Raw />
        </div>
      </div>
    </div>
  );
}
