import React, { useEffect } from "react";

import { disconnect } from "../../sockets";
import InvalidChatId from "./InvalidChatId";
import UnknownError from "./UnkownError";

const errors = {
  INVALID_CHAT_ID_ERROR: <InvalidChatId />
};

export function Error({ error }) {
  useEffect(() => disconnect(), []);

  return errors[error] || <UnknownError />;
}
