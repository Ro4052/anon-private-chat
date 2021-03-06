import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button } from "semantic-ui-react";

import { clearStore } from "../../redux/user-reducer";
import styles from "./Error.module.css";

export default function UnknownError() {
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <div className={styles.container}>
      <div>Oops! Looks like something went wrong :(</div>
      <Button
        primary
        onClick={() => {
          dispatch(clearStore());
          history.push("/dash");
        }}
      >
        Return to Dashboard
      </Button>
    </div>
  );
}
