import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { invalidChatId, initChat } from "../redux/chat-reducer";

const isValidId = id =>
  id.match(
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i
  );

export default function useChatRoom() {
  const dispatch = useDispatch();
  const isChatInitialised = useSelector(state => state.chat.isChatInitialised);

  useEffect(() => {
    const chatId = window.location.pathname.replace("/chat/", "");
    if (!isValidId(chatId)) dispatch(invalidChatId());
    else if (!isChatInitialised) dispatch(initChat(chatId));
  }, [dispatch, isChatInitialised]);
}
