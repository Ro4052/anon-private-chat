import { createStore, applyMiddleware } from "redux";
import { createEpicMiddleware } from "redux-observable";
import thunkMiddleware from "redux-thunk";

import { rootReducer, rootEpic } from "./root";

const epicMiddleware = createEpicMiddleware();
const store = createStore(
  rootReducer,
  applyMiddleware(epicMiddleware, thunkMiddleware)
);
const dispatch = store.dispatch;

epicMiddleware.run(rootEpic);

export { store, dispatch };
