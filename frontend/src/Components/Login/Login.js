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

function LoginPopover(props) {
  let loginPopoverMessage = '';
  if (props.status === 403) {
    loginPopoverMessage = 'It appears you have entered an incorrect username or password! Please check your credentials and try again';
  } else if (props.status === 404) {
    loginPopoverMessage = 'We couldn\'t find an account with that username in our database!';
  } else if (props.status === 500) {
    loginPopoverMessage = 'Sorry! We\'re having some issues on the server-side. Hopefully we can get these sorted out shortly!';
  }
  return (
    <Popover placement="bottom" target="login" isOpen={props.isLoginPopoverOpen}>
      <PopoverHeader className="login-popover-header">
        Login unsuccessful
        <Button className="login-popover-close">
          <Clear onClick={props.closeLoginPopover} />
        </Button>
      </PopoverHeader>
      <PopoverBody className="login-popover-body">
        {loginPopoverMessage}
      </PopoverBody>
    </Popover>
  )
}

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      isLoginPopoverOpen: false,
      lastLoginStatus: 0
    }
  }

  componentWillMount () {
    document.addEventListener('mousedown', this.handleClick);
  }

  // Login handler, make a request to the login backend and redirect to home page if successful
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
      this.openLoginPopover(response.status);
      return;
    } else {
      this.closeLoginPopover();
      this.setState({
        lastLoginStatus: 200
      });
    }
    let body = await response.json();
    console.log(body);
  }

  // Small util function to handle clicks outside of the popover
  handleClick = (event) => {
    if (this.popover.contains(event.target)) {
      return;
    }
    this.closeLoginPopover();
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

  openLoginPopover = (loginStatus) => {
    this.setState({
      isLoginPopoverOpen: true,
      lastLoginStatus: loginStatus
    });
  }

  closeLoginPopover = () => {
    this.setState({
      isLoginPopoverOpen: false
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
            <div ref={popover => this.popover = popover}>
              <LoginPopover
                status={this.state.lastLoginStatus} 
                isLoginPopoverOpen={this.state.isLoginPopoverOpen} 
                closeLoginPopover={this.closeLoginPopover} 
              />
            </div>
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

  componentWillUnmount () {
    document.removeEventListener('mousedown', this.handleClick);
  }
}

export default Login;