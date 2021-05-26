import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { applyMiddleware, compose, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import { RequestState } from "./request/reducer";
import rootReducers from "./root.reducers";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducers,
  composeEnhancers(applyMiddleware(thunkMiddleware))
);

export type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export function useRequestSelector(selector: (state: RequestState) => any): any;
export function useRequestSelector(): RequestState;
export function useRequestSelector(selector?: any) {
  const activeState = useSelector(
    (state: RootState) => state.request.requestList[state.request.index]
  );
  return selector ? selector(activeState) : activeState;
}

export const useTypedDispatch = () => useDispatch<AppDispatch>();

store.subscribe(() => {
  console.log("state:", store.getState());
  window.vscodeRef?.setState(store.getState());
});

export default store;
