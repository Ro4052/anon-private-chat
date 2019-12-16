import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import { Loader } from "semantic-ui-react";

import Dashboard from "./Dashboard";
import ChatRoom from "./ChatRoom";
import { init } from "../redux/user-reducer";

export default function App() {
  const isPageLoading = useSelector(state => state.user.isPageLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(init());
  }, [dispatch]);

  return isPageLoading ? (
    <Loader active inverted content="Loading..." />
  ) : (
    <Switch>
      <Route exact path="/dash" component={Dashboard} />
      <Route path="/chat/*" component={ChatRoom} />
      <Redirect to="/dash" />
    </Switch>
  );
}
