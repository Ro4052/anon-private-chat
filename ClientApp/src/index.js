import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";

import { store } from "./redux";
import history from "./history";
import App from "./view/App";
import "./index.css";

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
