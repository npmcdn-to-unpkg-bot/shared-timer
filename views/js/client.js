import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, hashHistory } from "react-router";

import CreateTimer from "./components/CreateTimer";
import Layout from "./components/Layout";
import Login from "./components/Login";

const app = document.getElementById('app');

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={Layout}>
      <IndexRoute component={Login}></IndexRoute>
      <Route path="CreateTimer" name="CreateTimer" component={CreateTimer}></Route>
    </Route>
  </Router>,
app);
