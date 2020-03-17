import React from "react";
import { Button } from "semantic-ui-react";

import styles from "./TopBar.module.css";

export default function TopBar() {
  return (
    <div className={styles.container}>
      <div className={styles.usernameHolder}>
        <span className={styles.nameTag}>You:</span> placeholder
      </div>
      <Button negative>Leave Chat</Button>
    </div>
  );
}
