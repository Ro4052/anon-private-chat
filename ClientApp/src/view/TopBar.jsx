import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button } from "semantic-ui-react";

import { clearStore } from "../redux/user-reducer";
import DynamicInput from "./DynamicInput";
import styles from "./TopBar.module.css";

export default function TopBar() {
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <div className={styles.container}>
      <div className={styles.usernameHolder}>
        <span className={styles.nameTag}>You:</span>{" "}
        <DynamicInput
          usernameSelector={state => state.user.username}
          labelClass={styles.username}
          formClass={styles.usernameForm}
        />
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
