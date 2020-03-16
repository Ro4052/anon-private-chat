import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { Button } from "semantic-ui-react";

import Message from "./Message";
import styles from "./MessageContainer.module.css";

export default function MessageContainer() {
  const containerRef = useRef();
  const messageBottomRef = useRef();
  const messages = useSelector(state => state.chat.messages);

  const [showToBottom, setShowToBottom] = useState(false);

  useEffect(() => {
    const element = containerRef.current;
    const scrollListener = () => {
      const messagesBottom = messageBottomRef.current.getBoundingClientRect()
        .bottom;
      const containerBottom = element.getBoundingClientRect().bottom;

      if (messagesBottom > containerBottom && !showToBottom)
        setShowToBottom(true);
      else if (messagesBottom <= containerBottom && showToBottom)
        setShowToBottom(false);
    };
    element.addEventListener("scroll", scrollListener);

    return () => element.removeEventListener("scroll", scrollListener);
  }, [showToBottom]);

  useEffect(() => {
    if (messages.slice(-1)[0]?.isMine) {
      messageBottomRef.current.scrollIntoView();
    }
  }, [messages]);

  return (
    <>
      <div ref={containerRef} className={styles.messageContainer}>
        {messages.map((msg, i) => (
          <Message key={i} {...msg} />
        ))}
        <div ref={messageBottomRef} />
      </div>
      {showToBottom && (
        <div className={styles.toBottomContainer}>
          <Button
            circular
            icon="angle double down"
            size="large"
            onClick={() => messageBottomRef.current.scrollIntoView()}
          />
        </div>
      )}
    </>
  );
}
