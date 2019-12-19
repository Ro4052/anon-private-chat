import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { isValidGuid } from "../utils";
import { invalidChatId, initChat } from "../redux/chat-reducer";

export default function useChatRoom() {
  const dispatch = useDispatch();
  const isChatInitialised = useSelector(state => state.chat.isChatInitialised);

  useEffect(() => {
    const chatId = window.location.pathname.replace("/chat/", "");
    if (!isValidGuid(chatId)) dispatch(invalidChatId());
    else if (!isChatInitialised) dispatch(initChat(chatId));
  }, [dispatch, isChatInitialised]);
}
