import React from 'react';
import {
  Button,
  InputGroup,
  Input
} from 'reactstrap';
import "./Login.scss";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    }
  }

  handleChangeUsername (event) {
    console.log(event);
  }

  handleChangePassword (event) {
    console.log(event);
  }

  render () {
    return (
      <div className="login-page">
        <header className="login-header">
          <h1>Welcome to RPG470!</h1>
          <InputGroup className="login-input-group username">
            <Input placeholder="Username" onChange={this.handleChangeUsername}/>
          </InputGroup>
          <InputGroup className="login-input-group password">
            <Input placeholder="Password" onChange={this.handleChangePassword}/>
          </InputGroup>
          <Button onClick={this.login}/>
        </header>
      </div>
    );
  }
}

export default Login;