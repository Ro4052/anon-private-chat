import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Input } from "semantic-ui-react";

import { sendMessage } from "../sockets";
import useChatRoom from "../hooks/useChatRoom";
import Message from "./Message";
import styles from "./ChatRoom.module.css";

export default function ChatRoom() {
  const messages = useSelector(state => state.chat.messages);
  const [inputContent, setInputContent] = useState("");
  useChatRoom();

  function handleChange(e) {
    if (e.target.value.length <= 400) setInputContent(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    sendMessage(inputContent);
    setInputContent("");
  }

  return (
    <div className={styles.chatContainer}>
      <div className={styles.messageContainer}>
        {messages.map((msg, i) => (
          <Message key={i} {...msg} />
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <Input
          className={styles.chatInput}
          fluid
          autoFocus
          action={{
            icon: "send",
            color: "teal",
            inverted: true,
            disabled: inputContent.length < 1
          }}
          placeholder="Type a message..."
          onChange={handleChange}
          value={inputContent}
        />
      </form>
    </div>
  );
}
