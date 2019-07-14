import React from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import Login from '../Login/Login';
import Signup from '../Signup/Signup';

function App() {
  return (
    <Router>
      <Route exact path="/" component={Login} />
      <Route path="/signup" component={Signup} />
    </Router>
  );
}

export default App;
