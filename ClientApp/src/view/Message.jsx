import React from "react";
import { Label } from "semantic-ui-react";
import cx from "classnames";

import { getDefaultedUserName, getStatusMessageText } from "../utils";
import styles from "./Message.module.css";

export default function Message({ className, msg }) {
  const defaultedUsername = getDefaultedUserName(msg.user, msg.isMine);

  return msg.type === "MSG" ? (
    <UserMessage
      className={className}
      defaultedUsername={defaultedUsername}
      msg={msg}
    />
  ) : (
    <StatusMessage
      className={className}
      defaultedUsername={defaultedUsername}
      msg={msg}
    />
  );
}

function UserMessage({ className, defaultedUsername, msg }) {
  return (
    <div
      className={cx(
        className,
        styles.baseMessage,
        msg.isMine ? styles.myUserMessage : styles.otherUserMessage
      )}
    >
      <p className={styles.username}>{defaultedUsername}</p>
      <p>{msg.msg}</p>
    </div>
  );
}

function StatusMessage({ className, msg, defaultedUsername }) {
  const statusText = getStatusMessageText(msg, defaultedUsername);

  return (
    <Label
      color={msg.isMine ? "yellow" : null}
      className={cx(className, styles.statusLabel)}
    >
      {statusText}
    </Label>
  );
}
