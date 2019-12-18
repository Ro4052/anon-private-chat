import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button } from "semantic-ui-react";

import { clearStore } from "../../redux/user-reducer";

export default function UnknownError() {
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <>
      <span>Unknown error</span>
      <Button
        primary
        onClick={() => {
          dispatch(clearStore());
          history.push("/dash");
        }}
      >
        Return to Dashboard
      </Button>
    </>
  );
}
