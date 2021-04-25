import { Button } from "antd";
import "antd/dist/antd.css";
import React from "react";
import style from "./App.css";
import "./common.css";

function App(): JSX.Element {
  const handleClick = () => {
    fetch(
      "https://www.baidu.com/sugrec?prod=pc_his&from=pc_web&json=1&sid=33821_33849_33675_26350_33607&hisdata=%5B%7B%22time%22%3A1615369937%2C%22kw%22%3A%22vue%20router%22%7D%5D&_t=1619336186922&req=2&csor=0",
      {
        headers: {
          accept: "application/json, text/javascript, */*; q=0.01",
          "accept-language": "en,zh-CN;q=0.9,zh;q=0.8,und;q=0.7",
          "sec-ch-ua":
            '" Not A;Brand";v="99", "Chromium";v="90", "Google Chrome";v="90"',
          "sec-ch-ua-mobile": "?0",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
        },
        referrer: "https://www.baidu.com/",
        referrerPolicy: "unsafe-url",
        body: null,
        method: "GET",
        mode: "cors",
        credentials: "include",
      }
    );
  };
  return (
    <h3 className={style.title}>
      <Button type="primary" onClick={handleClick}>
        test
      </Button>
    </h3>
  );
}
export default App;
