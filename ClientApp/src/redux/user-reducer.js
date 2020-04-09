import { of, from } from "rxjs";
import { filter, mapTo, switchMap, delay, catchError } from "rxjs/operators";
import { ofType } from "redux-observable";
import axios from "axios";

import { getUserId, removeUserId } from "../sessionStore";
import { getActionSteps } from "./redux-utils";

import { INIT_CHAT } from "./chat-reducer";

export const CLEAR_STORE = "CLEAR_STORE";
const UPDATE_USERNAME = getActionSteps("UPDATE_USERNAME");
const CLEAR_UPDATE_USERNAME_STATUS = "POST_REQUEST_USERNAME_STATUS";

const initialState = {
  username: null,
  isUsernameLoading: false,
  showUsernameUpdateSuccess: false,
  showUsernameUpdateFailure: false,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case CLEAR_STORE: {
      return initialState;
    }
    case INIT_CHAT.success: {
      return { ...state, username: action.username };
    }
    case UPDATE_USERNAME.request: {
      return { ...state, isUsernameLoading: true };
    }
    case UPDATE_USERNAME.success: {
      return {
        ...state,
        isUsernameLoading: false,
        username: action.username,
        showUsernameUpdateSuccess: true,
      };
    }
    case UPDATE_USERNAME.failure: {
      return {
        ...state,
        isUsernameLoading: false,
        showUsernameUpdateFailure: true,
      };
    }
    case CLEAR_UPDATE_USERNAME_STATUS: {
      return {
        ...state,
        showUsernameUpdateSuccess: false,
        showUsernameUpdateFailure: false,
      };
    }
    default: {
      return state;
    }
  }
}

export const updateUsernameEpic = action$ =>
  action$.pipe(
    ofType(UPDATE_USERNAME.request),
    switchMap(({ username }) =>
      from(
        axios.post("/api/update-username", { id: getUserId(), username })
      ).pipe(mapTo({ type: UPDATE_USERNAME.success, username }))
    ),
    catchError(() => of({ type: UPDATE_USERNAME.failure }))
  );

export const updateUsernameCompleteEpic = action$ =>
  action$.pipe(
    filter(
      action =>
        action.type === UPDATE_USERNAME.success ||
        action.type === UPDATE_USERNAME.failure
    ),
    delay(3000),
    mapTo({ type: CLEAR_UPDATE_USERNAME_STATUS })
  );

export const clearStore = () => {
  removeUserId();
  return { type: CLEAR_STORE };
};

export const updateUsername = username => ({
  type: UPDATE_USERNAME.request,
  username,
});
