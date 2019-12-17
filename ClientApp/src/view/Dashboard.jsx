import React from "react";
import { useDispatch } from "react-redux";
import { Message, Input, Button } from "semantic-ui-react";

import { createChat } from "../redux/chat-reducer";
import styles from "./Dashboard.module.css";

export default function Dashboard() {
  const dispatch = useDispatch();

  return (
    <div className={styles.dashboardContainer}>
      <Message info floating content="Enter a chat ID or create a room" />
      <Input
        action={{ icon: "angle double right", color: "green", inverted: true }}
        placeholder="Chat ID"
      />
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
