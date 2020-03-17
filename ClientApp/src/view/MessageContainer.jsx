import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { Button, Icon } from "semantic-ui-react";

import Message from "./Message";
import styles from "./MessageContainer.module.css";

export default function MessageContainer() {
  const containerRef = useRef();
  const messageBottomRef = useRef();
  const messages = useSelector(state => state.chat.messages);

  const [showUnread, setShowUnread] = useState(false);
  const [showToBottom, setShowToBottom] = useState(false);

  useEffect(() => {
    const element = containerRef.current;
    const scrollListener = () => {
      const messagesBottom = messageBottomRef.current.getBoundingClientRect()
        .bottom;
      const containerBottom = element.getBoundingClientRect().bottom;

      if (messagesBottom > containerBottom && !showToBottom) {
        setShowToBottom(true);
        setShowUnread(false);
      } else if (messagesBottom <= containerBottom && showToBottom) {
        setShowToBottom(false);
        setShowUnread(false);
      }
    };
    element.addEventListener("scroll", scrollListener);

    return () => element.removeEventListener("scroll", scrollListener);
  }, [showToBottom]);

  useEffect(() => {
    if (messages.slice(-1)[0]?.isMine || !showToBottom) {
      messageBottomRef.current.scrollIntoView();
    }
  }, [messages, showToBottom]);

  useEffect(() => {
    if (!messages.slice(-1)[0]?.isMine) {
      setShowUnread(true);
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
            icon={
              <Icon
                name="angle double down"
                size="large"
                color={showUnread ? "yellow" : "grey"}
              />
            }
            onClick={() => messageBottomRef.current.scrollIntoView()}
          />
        </div>
      )}
    </>
  );
}
