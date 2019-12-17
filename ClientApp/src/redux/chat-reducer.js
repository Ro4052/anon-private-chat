import axios from "axios";

import history from "../history";
import * as errors from "../error-types";
import { getActionSteps } from "./utils";

const CREATE_CHAT = getActionSteps("CREATE_CHAT");
const INVALID_CHAT_ID = "INVALID_CHAT_ID";

const initialState = {
  isPageLoading: false,
  messages: [],
  chatError: null
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case CREATE_CHAT.request: {
      return { ...state, isPageLoading: true };
    }
    case CREATE_CHAT.failure: {
      return {
        ...state,
        isPageLoading: false,
        chatError: errors.CHAT_CREATE_ERROR
      };
    }
    case INVALID_CHAT_ID: {
      return { ...state, chatError: errors.INVALID_CHAT_ID_ERROR };
    }
    default: {
      return state;
    }
  }
}

export const createChat = () => dispatch => {
  dispatch({ type: CREATE_CHAT.request });
  axios
    .post("/create-chat")
    .then(({ data }) => history.push(`/chat/${data}`))
    .catch(() => dispatch({ type: CREATE_CHAT.failure }));
};

export const invalidChatId = () => ({
  type: INVALID_CHAT_ID
});
