import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PollComponent from "./component/PollComponent";
import UserComponent from "./component/UserComponent";
import AppNavbar from "./component/AppNavbar";
import Home from "./screens/Home";

export default function App() {
    return (
        <div>

        <Router>
            <div>
            <AppNavbar /> 
            <br/>
                {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
                <Switch>
                    <Route path="/polls">
                        <PollComponent />
                    </Route>
                    <Route path="/users">
                        <UserComponent />
                    </Route>
                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>
            </div>
        </Router>
        {/* <PollScreen /> */}
        </div>
    );
}


