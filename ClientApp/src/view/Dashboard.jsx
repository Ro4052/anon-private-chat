import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Message, Input, Button } from "semantic-ui-react";

import { isValidGuid } from "../utils";
import { disconnect } from "../sockets";
import { clearStore } from "../redux/user-reducer";
import { createChat } from "../redux/chat-reducer";
import styles from "./Dashboard.module.css";

export default function Dashboard() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [chatId, setChatId] = useState("");

  useEffect(() => {
    disconnect();
    dispatch(clearStore());
  }, [dispatch]);

  function handleChange(e) {
    if (e.target.value.length <= 36) {
      setChatId(e.target.value);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (chatId.length === 36) history.push(`/chat/${chatId}`);
  }

  return (
    <div className={styles.dashboardContainer}>
      <Message info floating content="Enter a chat ID or create a room" />
      <form onSubmit={handleSubmit}>
        <Input
          fluid
          action={{
            icon: "angle double right",
            color: "green",
            inverted: true,
            disabled: !isValidGuid(chatId)
          }}
          placeholder="Chat ID"
          onChange={handleChange}
          value={chatId}
        />
      </form>
      <Button
        className={styles.createButton}
        inverted
        color="red"
        icon="hand point right outline"
        labelPosition="right"
        content="Create"
        onClick={() => dispatch(createChat())}
      />
    </div>
  );
}
