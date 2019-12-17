import axios from "axios";
import history from "../history";

import { getActionSteps } from "./utils";

const CREATE_CHAT = getActionSteps("CREATE_CHAT");

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
      return { ...state, isPageLoading: false, chatError: action.error };
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
    .catch(error => dispatch({ type: CREATE_CHAT.failure, err: error }));
};
