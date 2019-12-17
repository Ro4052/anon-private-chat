import React from "react";
import { useSelector } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import { Loader } from "semantic-ui-react";

import { isPageError, Error } from "./errors";
import Dashboard from "./Dashboard";
import ChatRoom from "./ChatRoom";

export default function App() {
  const isPageLoading = useSelector(state => state.chat.isPageLoading);
  const chatError = useSelector(state => state.chat.chatError);

  if (isPageLoading) return <Loader active inverted content="Loading..." />;
  if (isPageError(chatError)) return <Error error={chatError} />;

  return (
    <Switch>
      <Route exact path="/dash" component={Dashboard} />
      <Route path="/chat/*" component={ChatRoom} />
      <Redirect to="/dash" />
    </Switch>
  );
}
