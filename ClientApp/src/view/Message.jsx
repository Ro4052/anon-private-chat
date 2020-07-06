import React from "react";
import { Label } from "semantic-ui-react";
import cx from "classnames";

import styles from "./Message.module.css";

export default function Message({ user, msg, isMine, type }) {
  const defaultedUsername = isMine ? "You" : user ?? "Unnamed user";

  return type === "MSG" ? (
    <UserMessage
      username={user}
      defaultedUsername={defaultedUsername}
      msg={msg}
      isMine={isMine}
    />
  ) : (
    <StatusMessage
      username={user}
      defaultedUsername={defaultedUsername}
      type={type}
      msg={msg}
      isMine={isMine}
    />
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

function StatusMessage({ username, defaultedUsername, type, msg, isMine }) {
  const statusText = {
    JOIN: `${defaultedUsername} joined the chat`,
    LEAVE: `${defaultedUsername} left the chat`,
    UPDATE_USERNAME: `${isMine ? "You" : msg ?? "Unnamed user"} changed ${
      isMine ? "your" : "their"
    } username to ${username}`,
  }[type];

  return (
    <Label color={isMine ? "yellow" : null} className={styles.statusLabel}>
      {statusText}
    </Label>
  );
}
