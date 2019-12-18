import React from "react";

import InvalidChatId from "./InvalidChatId";
import UnknownError from "./UnkownError";

const errors = {
  INVALID_CHAT_ID_ERROR: <InvalidChatId />
};

export function Error({ error }) {
  return errors[error] || <UnknownError />;
}
