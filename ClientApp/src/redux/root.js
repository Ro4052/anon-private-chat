import { combineReducers } from "redux";
import { combineEpics } from "redux-observable";

import user, {
  updateUsernameEpic,
  updateUsernameCompleteEpic,
} from "./user-reducer";
import chat, {
  createChatEpic,
  initChatEpic,
  newMessageEpic,
} from "./chat-reducer";

export const rootReducer = combineReducers({
  user,
  chat,
});

export const rootEpic = combineEpics(
  updateUsernameEpic,
  updateUsernameCompleteEpic,
  createChatEpic,
  initChatEpic,
  newMessageEpic
);
