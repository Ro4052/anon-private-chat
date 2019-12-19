import { dispatch } from "../redux";

import { newMessage } from "../redux/chat-reducer";

export default function handleMessage(msg) {
  const message = formatMessageKeys(msg);
  dispatch(newMessage(message));
}

function formatMessageKeys(msg) {
  const formattedMsg = {};
  Object.entries(msg).forEach(([key, value]) => {
    formattedMsg[key.charAt(0).toLowerCase() + key.slice(1)] = value;
  });

  return formattedMsg;
}
