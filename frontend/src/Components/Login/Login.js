import React from 'react';
import {
  Button,
  Form,
  FormGroup,
  Label,
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

  handleLogin = () => {
    console.log('we got here');
  }

  handleChangeUsername = (event) => {
    this.setState({
      username: event.target.value
    });
  }

  handleChangePassword = (event) => {
    this.setState({
      password: event.target.value
    });
  }

  render () {
    return (
      <div className="login-page">
        <header className="login-header">
          <h1>Welcome to RPG470!</h1>
          <Form onSubmit={this.handleLogin}>
            <FormGroup>
              <Label for="username" className="login-form-label">Username</Label>
              <Input type="username" id="username" onChange={this.handleChangeUsername}/>
            </FormGroup>
            <FormGroup>
              <Label for="password" className="login-form-label">Password</Label>
              <Input type="password" id="password" onChange={this.handleChangePassword}/>
            </FormGroup>
            <Button color="primary">
              Play RPG470
            </Button>
          </Form>
        </header>
      </div>
    );
  }
}

export default Login;