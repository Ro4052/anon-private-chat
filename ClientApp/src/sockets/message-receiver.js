import { dispatch } from "../redux";

import { newMessage } from "../redux/chat-reducer";
import { formatKeys } from "../utils";

export default function handleMessage(msg) {
  const message = formatKeys(msg);
  dispatch(newMessage(message));
}
