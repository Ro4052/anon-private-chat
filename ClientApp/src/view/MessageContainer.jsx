import React, { useRef, useEffect } from "react";
import { useSelector } from "react-redux";

import Message from "./Message";
import styles from "./MessageContainer.module.css";

export default function MessageContainer() {
  const messageBottomRef = useRef();
  const messages = useSelector(state => state.chat.messages);

  useEffect(() => {
    messageBottomRef.current.scrollIntoView();
  }, [messages]);

  return (
    <div className={styles.messageContainer}>
      {messages.map((msg, i) => (
        <Message key={i} {...msg} />
      ))}
      <div ref={messageBottomRef} />
    </div>
  );
}
