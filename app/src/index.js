import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

if (!String.prototype.trim) {
  String.prototype.trim = function() {
    return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
  };
}

var render = Component => (
  <Router>
    <Switch>
      <Route path="/" extact component={Component} />
    </Switch>
  </Router>
);
var root = document.getElementById("root");
ReactDOM.render(render(App), root);

registerServiceWorker();
