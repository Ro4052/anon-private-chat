import { combineReducers } from "redux";

import user, { updateUsernameEpic } from "./user-reducer";
import message from "./message-reducer";

export const rootReducer = combineReducers({
  user,
  message
});

export const rootEpic = updateUsernameEpic;
