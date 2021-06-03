import { LANGUAGE, REQUEST_BODY_TYPE } from "@/constants";
import { useTypedDispatch } from "@/store";
import { REQUEST_ACTION } from "@/store/request/action";
import { RequestState } from "@/store/request/reducer";
import { isFormUrlEncodedContentType, isJSONContentType } from "@/utils/helper";
import DownOutlined from "@ant-design/icons/DownOutlined";
import { Dropdown, Input, Menu, message, Modal } from "antd";
import React, { useState } from "react";
import { postMessage } from "utils/postMessage";
import { getID } from "utils/uuid";
import styles from "./index.module.css";
import RequestTabs from "./RequestTabs";

export default function TabsBar() {
  const dispatch = useTypedDispatch();
  const [visible, setVisible] = useState(false);
  const [curl, setCurl] = useState("");

  const createNewRequest = () => {
    dispatch({ type: REQUEST_ACTION.CREATE_REQUEST });
  };
  const handleMenuClick = ({ key }: any) => {
    if (key === "curl") {
      setVisible(true);
    }
  };
  const createRequestByCurl = () => {
    postMessage({ type: "parse-curl", payload: curl }).then((result) => {
      if (!result.success) {
        message.error(result.error?.message || "unknown error");
        return;
      }
      const data = result.data as any;
      console.log(data);

      const body: Partial<RequestState["request"]["body"]> = {};
      if (isFormUrlEncodedContentType(data.headers)) {
        body[REQUEST_BODY_TYPE.X_WWW_FORM_URLENCODED] = data.data
          .split("&")
          .map((i: string) => {
            const [key = "", value = ""] = i.split("=");
            return {
              id: getID(),
              checked: true,
              key,
              value,
            };
          });
      } else {
        body[REQUEST_BODY_TYPE.RAW] = {
          lang: isJSONContentType(data.headers)
            ? LANGUAGE.JSON
            : LANGUAGE.PLAIN_TEXT,
          value: data.data,
        };
      }

      dispatch({
        type: REQUEST_ACTION.CREATE_REQUEST,
        payload: {
          url: data.urlWithoutQuery,
          method: data.method,
          request: {
            params: [...new URLSearchParams(new URL(data.url).search)].map(
              ([key, value]) => ({
                id: getID(),
                key,
                value,
                checked: true,
              })
            ),
            headers: Object.entries(data.headers).map(([key, value]) => ({
              id: getID(),
              key,
              value,
              checked: true,
            })),
            body,
          },
        },
      });
      setVisible(false);
      setCurl("");
    });
  };

  const NewMenu = () => (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="curl">import by bash curl</Menu.Item>
    </Menu>
  );
  return (
    <div className={styles.container}>
      <RequestTabs />
      <Dropdown.Button
        type="primary"
        onClick={createNewRequest}
        overlay={<NewMenu />}
        icon={<DownOutlined />}
      >
        New
      </Dropdown.Button>
      <Modal
        title="Import by bash curl"
        visible={visible}
        onCancel={() => {
          setVisible(false);
          setCurl("");
        }}
        onOk={createRequestByCurl}
      >
        <Input.TextArea
          placeholder="Paste curl"
          rows={6}
          value={curl}
          onChange={(e) => setCurl(e.target.value)}
        />
      </Modal>
    </div>
  );
}
