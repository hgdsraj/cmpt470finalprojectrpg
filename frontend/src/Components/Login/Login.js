import React from 'react';
import {
  InputGroup,
  Input
} from 'reactstrap';
import "./Login.scss";

class Login extends React.Component {
  render () {
    return (
      <div className="login-page">
        <header className="login-header">
          <h1>Welcome to RPG470!</h1>
          <InputGroup className="login-input-group username">
            <Input placeholder="Username"/>
          </InputGroup>
          <InputGroup className="login-input-group password">
            <Input placeholder="Password"/>
          </InputGroup>
        </header>
      </div>
    );
  }
}

export default Login;