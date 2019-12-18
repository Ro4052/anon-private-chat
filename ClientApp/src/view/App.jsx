import React from "react";
import { useSelector } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import { Loader } from "semantic-ui-react";

import { Error } from "./errors";
import Dashboard from "./Dashboard";
import ChatRoom from "./ChatRoom";

export default function App() {
  const isPageLoading = useSelector(state => state.chat.isPageLoading);
  const chatPageError = useSelector(state => state.chat.pageError);

  if (isPageLoading) return <Loader active inverted content="Loading..." />;
  if (chatPageError) return <Error error={chatPageError} />;

  return (
    <Switch>
      <Route exact path="/dash" component={Dashboard} />
      <Route path="/chat/*" component={ChatRoom} />
      <Redirect to="/dash" />
    </Switch>
  );
}
