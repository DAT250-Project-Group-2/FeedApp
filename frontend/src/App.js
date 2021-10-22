import logo from './logo.svg';
import './App.css';
import * as React from "react"

class App extends React.Component {
  state = {
    users: []
  };

  async componentDidMount() {
    const response = await fetch('/users');
    console.log(response);
    const body = await response.json();
    this.setState({users: body});
  }

  render() {
    const {users} = this.state;
    return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <div className="App-intro">
              <h2>Users</h2>
{              console.log(users)}
              {users.map(user =>
                  <div key={user.id}>
                    {user.email} ({user.password})
                  </div>
              )}
            </div>
          </header>
        </div>
    );
  }
}
export default App;