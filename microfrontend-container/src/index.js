import React from "react";
import ReactDOM from "react-dom";

import App from "components/Container";
import "base.css";

function renderReactApp(Application) {
  ReactDOM.render(<Application />, document.querySelector("#root"));
}

renderReactApp(App);
