import {
  SendToExtensionMessage,
  SendToWebviewMessage,
} from "../../interface/message";
import { getID } from "./uuid";

const taskList: {
  id: string;
  resolve: (payload: SendToWebviewMessage) => any;
}[] = [];

window.addEventListener(
  "message",
  ({ data }: MessageEvent<SendToWebviewMessage>) => {
    const index = taskList.findIndex((task) => task.id === data.id);
    if (index === -1) return;
    taskList[index].resolve(data);
    taskList.splice(index, 1);
  }
);

export const postMessage = (
  message: Omit<SendToExtensionMessage, "id">
): Promise<SendToWebviewMessage> => {
  const id = getID();
  let resolve: (value: SendToWebviewMessage) => void = () => 0;
  let promise = new Promise<SendToWebviewMessage>((res) => {
    resolve = res;
  });
  window.vscodeRef?.postMessage({
    id,
    type: message.type,
    payload: message.payload,
  });
  taskList.push({ id, resolve });
  return promise;
};
