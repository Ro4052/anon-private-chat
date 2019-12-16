import { combineReducers } from "redux";
import { combineEpics } from "redux-observable";

import user, { initEpic, updateUsernameEpic } from "./user-reducer";
import message from "./message-reducer";

export const rootReducer = combineReducers({
  user,
  message
});

export const rootEpic = combineEpics(initEpic, updateUsernameEpic);
