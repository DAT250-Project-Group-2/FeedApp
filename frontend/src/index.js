import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { render } from "react-dom";
import PollComponent from "./component/PollComponent";
import UserComponent from "./component/UserComponent";
import Home from "./screens/Home";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AppNavbar from "./component/AppNavbar";
import PollScreen from "./screens/PollScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import CreatePoll from "./screens/CreatePoll";

const FeedApp = () => {
  return (
    <div>
      <AppNavbar />
      <Router>
        <div>
          <Switch>
            <Route path="/polls/:id" component={PollScreen}>
            </Route>
            <Route path="/polls">
              <PollComponent />
            </Route>
            <Route path="/users">
              <UserComponent />
            </Route>
            <Route path="/login">
              <LoginScreen />
            </Route>
            <Route path="/vote">
              <LoginScreen />
            </Route>
            <Route path="/createPoll">
              <CreatePoll />
            </Route>
            <Route path="/register">
              <RegisterScreen />
            </Route>
            <Route path="/profile/:id" component={ProfileScreen}>
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
};

render(<FeedApp />, document.querySelector("#root"));
