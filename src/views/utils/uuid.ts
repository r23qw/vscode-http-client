import store from "@/store";
import { UUID_ACTION } from "@/store/uuid/action";
export const getID = () => {
  store.dispatch({ type: UUID_ACTION.GET_ID });
  return store.getState().uuid.id;
};
