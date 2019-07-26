import React from 'react';
import {HashRouter as Router, Route} from 'react-router-dom';
import {
  GLOBAL_NUMBERS,
  GLOBAL_URLS
} from '../../Constants/GlobalConstants';
import Login from '../Login/Login';
import Signup from '../Signup/Signup';
import Home from '../Home/Home';
import CreateCharacter from '../CreateCharacter/CreateCharacter';
import Battle from '../Battle/Battle';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false
    };
  }

  handleCheckAuth = async () => {
    const response = await fetch(GLOBAL_URLS.GET_API_USERS_LOGGED_IN, {
    });
    if (response.status === GLOBAL_NUMBERS.HTTP_STATUS_CODE_403) {
      this.setState({
        isAuthenticated: false
      });
    } else {
      this.setState({
        isAuthenticated: true
      });
    }
  };

  render() {
    return (
      <Router>
        <Route exact path="/" component={Home}/>
        <Route path="/login" component={Login}/>
        <Route path="/signup" component={Signup}/>
        <Route path="/createcharacter" component={CreateCharacter}/>
        <Route path="/battle" component={Battle}/>
      </Router>
    );
  }
}

export default App;
