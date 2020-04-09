import React from "react";
import { Label } from "semantic-ui-react";
import cx from "classnames";

import styles from "./Message.module.css";

export default function Message({ user, msg, isMine, isStatusMessage }) {
  const username = isMine ? "You" : user ?? "Unnamed user";

  return isStatusMessage ? (
    <StatusMessage username={username} type={msg} />
  ) : (
    <UserMessage username={username} msg={msg} isMine={isMine} />
  );
}

function UserMessage({ username, msg, isMine }) {
  return (
    <div
      className={cx(
        styles.baseMessage,
        isMine ? styles.myUserMessage : styles.otherUserMessage
      )}
    >
      <p className={styles.username}>{username}</p>
      <p>{msg}</p>
    </div>
  );
}

function StatusMessage({ username, type }) {
  const statusText = {
    JOIN: `${username} joined the chat`,
    LEAVE: `${username} left the chat`,
  }[type];

  return <Label className={styles.statusLabel}>{statusText}</Label>;
}
