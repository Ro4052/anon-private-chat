import { delay, tap, mapTo } from "rxjs/operators";
import { ofType } from "redux-observable";

import { getActionSteps } from "./utils";

const UPDATE_USERNAME = getActionSteps("UPDATE_USERNAME");

const initialState = {
  username: null
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    default: {
      return state;
    }
  }
}

export const updateUsernameEpic = action$ =>
  action$.pipe(
    ofType(UPDATE_USERNAME.request),
    delay(1000),
    tap(name => console.log(name)),
    mapTo({ type: UPDATE_USERNAME.success })
  );
