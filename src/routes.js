import React from "react";
import { Switch, Route } from "react-router-dom";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Main from "./components/Main/Main";

export default (
  <Switch>
    <Route exact path="/" component={Login} />
    <Route path="/register" component={Register} />
    <Route path="/home" component={Main} />
  </Switch>
);
