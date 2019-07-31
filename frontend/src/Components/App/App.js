import React from 'react';
import {HashRouter as Router, Route, Redirect} from 'react-router-dom';
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

  async componentDidMount() {
    await this.handleAuthenticate();
  }

  handleRenderProtectedPage = (page) => {
    if (this.state.isAuthenticated) {
      return page;
    } else {
      return <Redirect to="/login"/>
    }
  };

  handleRenderLoginOrSignupPage = (page) => {
    if (this.state.isAuthenticated) {
      return <Redirect to="/"/>;
    } else {
      return page;
    }
  };

  handleAuthenticate = async () => {
    const response = await fetch(GLOBAL_URLS.GET_API_USERS_LOGGED_IN);
    this.setState({
      isAuthenticated: response.status !== GLOBAL_NUMBERS.HTTP_STATUS_CODE_403
    });
  };

  render() {
    return (
      <Router>
        <Route exact path="/" component={() => this.handleRenderProtectedPage(<Home />)}/>
        <Route path="/login" component={() => this.handleRenderLoginOrSignupPage(<Login handleAuthenticate={this.handleAuthenticate}/>)}/>
        <Route path="/signup" component={() => this.handleRenderLoginOrSignupPage(<Signup handleAuthenticate={this.handleAuthenticate}/>)}/>
        <Route path="/createcharacter" component={() => this.handleRenderProtectedPage(<CreateCharacter />)}/>
        <Route path="/battle" component={() => this.handleRenderProtectedPage(<Battle />)}/>
      </Router>
    );
  }
}

export default App;
