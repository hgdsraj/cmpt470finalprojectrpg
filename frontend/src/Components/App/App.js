import React from 'react';
import {
  HashRouter as Router,
  Route
} from 'react-router-dom'
import Login from '../Login/Login';
import Signup from '../Signup/Signup';
import Home from '../Home/Home';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false
    };
  }

  handleLogin = () => {
    this.setState({
      isLoggedIn: true
    });
  }

  handleLogout = () => {
    this.setState({
      isLoggedIn: false
    });
  }

  render() {
    const rootUrlComponent = this.state.isLoggedIn ?
      <Home handleAppLogout={this.handleLogout}/> : <Login handleAppLogin={this.handleLogin}/>;
    return (
      <Router>
        <Route exact path="/" component={rootUrlComponent} />
        <Route path="/signup" component={Signup} />
      </Router>
    );
  }
}

export default App;
