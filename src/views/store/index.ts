import { applyMiddleware, compose, createStore, Middleware } from "redux";
import thunkMiddleware from "redux-thunk";
import rootReducers from "./root.reducers";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const setStateMiddleware: Middleware = ({ getState }) => {
  return (next) => (action) => {
    const returnValue = next(action);
    window?.vscode.setState(getState());
    return returnValue;
  };
};

const store = createStore(
  rootReducers,
  composeEnhancers(applyMiddleware(thunkMiddleware, setStateMiddleware))
);

export default store;
