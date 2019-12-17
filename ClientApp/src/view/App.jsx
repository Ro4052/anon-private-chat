import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Dashboard from "./Dashboard";
import ChatRoom from "./ChatRoom";

export default function App() {
  return (
    <Switch>
      <Route exact path="/dash" component={Dashboard} />
      <Route path="/chat/*" component={ChatRoom} />
      <Redirect to="/dash" />
    </Switch>
  );
}
