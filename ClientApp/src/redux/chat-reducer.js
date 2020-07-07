import { from, of } from "rxjs";
import {
  switchMap,
  mapTo,
  map,
  catchError,
  tap,
  skip,
  filter,
} from "rxjs/operators";
import { ofType } from "redux-observable";
import axios from "axios";

import { CLEAR_STORE } from "./user-reducer";
import { getUserId, setUserId } from "../sessionStore";
import history from "../history";
import { connect } from "../sockets";
import * as errors from "../error-types";
import { getActionSteps } from "./redux-utils";
import { sendMessageNotification } from "../notifications";
import { formatKeys } from "../utils";

const CREATE_CHAT = getActionSteps("CREATE_CHAT");
export const INIT_CHAT = getActionSteps("INIT_CHAT");
const INVALID_CHAT_ID = "INVALID_CHAT_ID";
const NEW_MESSAGE = "NEW_MESSAGE";

const initialState = {
  isPageLoading: false,
  isChatInitialised: false,
  messages: [],
  pageError: null,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case CLEAR_STORE: {
      return initialState;
    }
    case CREATE_CHAT.request: {
      return { ...state, isPageLoading: true };
    }
    case CREATE_CHAT.success: {
      return { ...state, isPageLoading: false };
    }
    case CREATE_CHAT.failure: {
      return {
        ...state,
        isPageLoading: false,
        pageError: errors.CHAT_CREATE_ERROR,
      };
    }
    case INIT_CHAT.request: {
      return { ...state, isPageLoading: true, isChatInitialised: false };
    }
    case INIT_CHAT.success: {
      return {
        ...state,
        isPageLoading: false,
        isChatInitialised: true,
      };
    }
    case INIT_CHAT.failure: {
      return {
        ...state,
        isPageLoading: false,
        isChatInitialised: false,
        pageError: action.error,
      };
    }
    case INVALID_CHAT_ID: {
      return { ...state, pageError: errors.INVALID_CHAT_ID_ERROR };
    }
    case NEW_MESSAGE: {
      return { ...state, messages: [...state.messages, action.msg] };
    }
    default: {
      return state;
    }
  }
}

export const createChatEpic = action$ =>
  action$.pipe(
    ofType(CREATE_CHAT.request),
    switchMap(() => from(axios.post("/api/create-chat"))),
    tap(({ data }) => history.push(`/chat/${data}`)),
    mapTo({ type: CREATE_CHAT.success }),
    catchError(() => of({ type: CREATE_CHAT.failure }))
  );

export const initChatEpic = action$ =>
  action$.pipe(
    ofType(INIT_CHAT.request),
    switchMap(({ chatId }) =>
      from(
        axios.post("/api/init-chat", {
          userId: getUserId(),
          chatId,
        })
      )
    ),
    map(({ data }) => formatKeys(data)),
    tap(({ id }) => {
      setUserId(id);
      connect(id);
    }),
    map(({ username }) => ({
      type: INIT_CHAT.success,
      username,
    })),
    catchError(e =>
      of({
        type: INIT_CHAT.failure,
        error:
          e.response.status === 404
            ? errors.INVALID_CHAT_ID_ERROR
            : errors.UNKNOWN_ERROR,
      })
    )
  );

export const newMessageEpic = action$ =>
  action$.pipe(
    ofType(NEW_MESSAGE),
    filter(({ msg }) => !msg.isMine),
    tap(sendMessageNotification),
    skip()
  );

export const createChat = () => ({
  type: CREATE_CHAT.request,
});

export const invalidChatId = () => ({
  type: INVALID_CHAT_ID,
});

export const initChat = chatId => ({
  type: INIT_CHAT.request,
  chatId,
});

export const newMessage = msg => ({
  type: NEW_MESSAGE,
  msg,
});
