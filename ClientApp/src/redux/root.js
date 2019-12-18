import { combineReducers } from "redux";
import { combineEpics } from "redux-observable";

import user, { updateUsernameEpic } from "./user-reducer";
import chat, { createChatEpic, initChatEpic } from "./chat-reducer";

export const rootReducer = combineReducers({
  user,
  chat
});

export const rootEpic = combineEpics(
  updateUsernameEpic,
  createChatEpic,
  initChatEpic
);
