import React, { useState } from "react";
import { Input } from "semantic-ui-react";

import TopBar from "./TopBar";
import MessageContainer from "./MessageContainer";
import { sendMessage } from "../sockets";
import useChatRoom from "../hooks/useChatRoom";
import styles from "./ChatRoom.module.css";

export default function ChatRoom() {
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
      <TopBar />
      <MessageContainer />
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
