import { createStore, applyMiddleware, compose } from "redux";
import { createEpicMiddleware } from "redux-observable";
import thunkMiddleware from "redux-thunk";

import { rootReducer, rootEpic } from "./root";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const epicMiddleware = createEpicMiddleware();
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(epicMiddleware, thunkMiddleware))
);
const dispatch = store.dispatch;

epicMiddleware.run(rootEpic);

export { store, dispatch };
