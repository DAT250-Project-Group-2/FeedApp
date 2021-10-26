import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import PollComponent from "./component/PollComponent";
import UserComponent from "./component/UserComponent";
import PollScreen from "./screens/PollScreen";
import AppNavbar from "./component/AppNavbar";

export default function App() {
    return (
        <div>

        <Router>
            <div>
            <AppNavbar /> 
            <br/>
                {/* <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/users">Users</Link>
                        </li>
                        <li>
                            <Link to="/polls">Polls</Link>
                        </li>
                    </ul>
                </nav> */}

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

function Home() {
    return <h2 className="text-center">Home</h2>;
}


