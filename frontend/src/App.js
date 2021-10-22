import React, { Component } from 'react';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import UserList from './UserList';
import UserEdit from "./UserEdit";

class App extends Component {
  render() {
    return (
        <Router>
          <Switch>
            <Route path='/' exact={true} component={Home}/>
            <Route path='/users' exact={true} component={UserList}/>
            <Route path='/users/:id' component={UserEdit}/>
          </Switch>
        </Router>
    )
  }
}

export default App;

// import logo from './logo.svg';
// import './App.css';
// import * as React from "react"

// class App extends React.Component {
//   state = {
//     users: []
//   };

//   async componentDidMount() {
//     const response = await fetch('/users');
//     console.log(response);
//     const body = await response.json();
//     this.setState({users: body});
//   }

//   render() {
//     const {users} = this.state;
//     return (
//         <div className="App">
//           <header className="App-header">
//             <img src={logo} className="App-logo" alt="logo" />
//             <div className="App-intro">
//               <h2>Users</h2>
// {              console.log(users)}
//               {users.map(user =>
//                   <div key={user.id}>
//                     {user.email} ({user.password})
//                   </div>
//               )}
//             </div>
//           </header>
//         </div>
//     );
//   }
// }
// export default App;