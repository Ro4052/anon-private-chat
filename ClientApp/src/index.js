import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";

import history from "./history";
import App from "./view/App";
import "./index.css";

ReactDOM.render(
  <Router history={history}>
    <App />
  </Router>,
  document.getElementById("root")
);
