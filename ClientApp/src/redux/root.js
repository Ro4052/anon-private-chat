import { combineReducers } from "redux";

import user, { updateUsernameEpic } from "./user-reducer";
import chat from "./chat-reducer";

export const rootReducer = combineReducers({
  user,
  chat
});

export const rootEpic = updateUsernameEpic;
