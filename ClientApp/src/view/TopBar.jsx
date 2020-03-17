import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button } from "semantic-ui-react";

import { clearStore } from "../redux/user-reducer";
import styles from "./TopBar.module.css";

export default function TopBar() {
  const username = useSelector(state => state.user.username);
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <div className={styles.container}>
      <div className={styles.usernameHolder}>
        <span className={styles.nameTag}>You:</span> {username}
      </div>
      <Button
        negative
        onClick={() => {
          dispatch(clearStore());
          history.push("/dash");
        }}
      >
        Leave Chat
      </Button>
    </div>
  );
}
