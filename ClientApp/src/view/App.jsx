import React from "react";
import { useSelector } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import { Loader } from "semantic-ui-react";

import Dashboard from "./Dashboard";
import ChatRoom from "./ChatRoom";

export default function App() {
  const isPageLoading = useSelector(state => state.chat.isPageLoading);

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
