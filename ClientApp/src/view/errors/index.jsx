import React from "react";

import { INVALID_CHAT_ID_ERROR } from "../../error-types";
import InvalidChatId from "./InvalidChatId";

const pageErrors = [INVALID_CHAT_ID_ERROR];

const errors = {
  INVALID_CHAT_ID_ERROR: <InvalidChatId />
};

export function Error({ error }) {
  return errors[error] || <span>{error}</span>;
}

export function isPageError(error) {
  return pageErrors.includes(error);
}
