import { AnyAction } from "redux";
import { getPreviouseState } from "../helper";
import { UUID_ACTION } from "./action";

type UUIDState = { id: number };

const inititalState: UUIDState = (getPreviouseState("uuid") as UUIDState) || {
  id: 0,
};

export default function (state = inititalState, action: AnyAction): UUIDState {
  switch (action.type) {
    case UUID_ACTION.GET_ID:
      return { id: state.id++ };
    default:
      return state;
  }
}
