import React from "react";
import cx from "classnames";

import styles from "./Message.module.css";

export default function Message({ user, msg, isMine }) {
  return (
    <div
      className={cx(
        styles.baseMessage,
        isMine ? styles.myUserMessage : styles.otherUserMessage
      )}
    >
      <p className={styles.username}>
        {isMine ? "You" : user || "Un-named user"}
      </p>
      <p>{msg}</p>
    </div>
  );
}
