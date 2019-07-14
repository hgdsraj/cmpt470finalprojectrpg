import React from 'react';
import {
  Link
} from 'react-router-dom';
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Popover,
  PopoverHeader,
  PopoverBody
} from 'reactstrap';
import './Login.scss';
import { ReactComponent as Clear } from '../../Assets/CloseIcon24px.svg';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      showForbiddenPopover: false
    }
  }

  handleLogin = async (event) => {
    event.preventDefault();
    let response = await fetch('http://localhost:8000/api/users/login', {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    });
    if (response.status !== 200) {
      if (response.status === 403) {
        this.toggleForbiddenPopover();
        return;
      }
      return;
    }
    let body = await response.json();
    console.log(body);
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

  openForbiddenPopover = () => {
    this.setState({
      showForbiddenPopover: true
    });
  }

  closeForbiddenPopover = () => {
    this.setState({
      showForbiddenPopover: false
    });
  }

  render () {
    return (
      <div className="login-page">
        <header className="header login-header">
          <h1 className="login-header-text">Welcome to RPG470!</h1>
          <Form onSubmit={this.handleLogin}>
            <FormGroup className="login-form-group">
              <Label for="username" className="form-label login-form-label">Username</Label>
              <Input type="username" id="username" onChange={this.handleChangeUsername}/>
            </FormGroup>
            <FormGroup className="login-form-group">
              <Label for="password" className="form-label login-form-label">Password</Label>
              <Input type="password" id="password" onChange={this.handleChangePassword}/>
            </FormGroup>
            <Button color="primary" id="login" className="login-button">
              Login
            </Button>
            <Popover placement="bottom" target="login" toggle={this.openForbiddenPopover} isOpen={this.state.showForbiddenPopover}>
              <PopoverHeader className="forbidden-popover-header">
                Login unsuccessful
                <Button className="forbidden-popover-close">
                  <Clear onClick={this.closeForbiddenPopover} />
                </Button>
              </PopoverHeader>
              <PopoverBody>
                It appears you have entered an incorrect username or password! Please check your credentials and try logging in again
              </PopoverBody>
            </Popover>
          </Form>
          <h3 className="signup-message-header">Don't have an account?
            <Link to="/signup">
              <Button color="primary" className="signup-message-button" onClick={this.handleSignup}>
                Sign up
              </Button>
            </Link>
          </h3>
        </header>
      </div>
    );
  }
}

export default Login;