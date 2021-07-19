import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import Header from "./Header";
import Search from "../Routes/Search";
import Home from "../Routes/Home";
export default () => (
  <Router>
    <>
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/search" exact component={Search} />
        <Redirect from="*" to="/" />
      </Switch>
    </>
  </Router>
);
