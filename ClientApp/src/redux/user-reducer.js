import { of, from } from "rxjs";
import { delay, switchMap, map, tap, mapTo } from "rxjs/operators";
import { ofType } from "redux-observable";
import axios from "axios";

import { getActionSteps } from "./utils";
import { getUserId, setUserId } from "../sessionStore";

const UPDATE_USERNAME = getActionSteps("UPDATE_USERNAME");
const INIT = getActionSteps("INIT");

const initialState = {
  username: null,
  isPageLoading: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case INIT.request: {
      return { ...state, isPageLoading: true };
    }
    case INIT.success: {
      return { ...state, isPageLoading: false };
    }
    default: {
      return state;
    }
  }
}

export const initEpic = action$ =>
  action$.pipe(
    ofType(INIT.request),
    switchMap(() => {
      const existingId = getUserId();
      return existingId
        ? of(existingId)
        : from(axios.get("/init").then(res => res.data));
    }),
    tap(id => setUserId(id)),
    map(id => ({ type: INIT.success, id }))
  );

export const updateUsernameEpic = action$ =>
  action$.pipe(
    ofType(UPDATE_USERNAME.request),
    tap(name => console.log(`New username: ${name}`)),
    delay(1000),
    mapTo({ type: UPDATE_USERNAME.success })
  );

export const init = () => ({
  type: INIT.request
});
