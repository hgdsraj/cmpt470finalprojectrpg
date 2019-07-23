import React from 'react';
import {HashRouter as Router, Route} from 'react-router-dom';
import Login from '../Login/Login';
import Signup from '../Signup/Signup';
import Home from '../Home/Home';
import CreateCharacter from '../CreateCharacter/CreateCharacter';

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
  };

  handleLogout = () => {
    this.setState({
      isLoggedIn: false
    });
  };

  render() {
    return (
      <Router>
        <Route exact path="/" component={Home}/>
        <Route path="/login" component={Login}/>
        <Route path="/signup" component={Signup}/>
        <Route path="/createcharacter" component={CreateCharacter}/>
      </Router>
    );
  }
}

export default App;
