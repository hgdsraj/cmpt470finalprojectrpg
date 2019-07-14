import React from 'react';
import {
  Link
} from 'react-router-dom';
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import CustomPopover from '../CustomPopover/CustomPopover';
import './Login.scss';

// Login page component
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
  // TODO: How do we handle hitting URLs in production? We may need a url constants file
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
      this.handleOpenLoginPopover(response.status);
      return;
    } else {
      this.handleCloseLoginPopover();
      this.setState({
        lastLoginStatus: 200
      });
    }
    let body = await response.json();
    console.log(body);
    // TODO: Redirect to home page (once it is built)
  }

  // Small util function to handle clicks outside of the popover
  handleClick = (event) => {
    if (this.popover.contains(event.target)) {
      return;
    }
    this.handleCloseLoginPopover();
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

  handleOpenLoginPopover = (loginStatus) => {
    this.setState({
      isLoginPopoverOpen: true,
      lastLoginStatus: loginStatus
    });
  }

  handleCloseLoginPopover = () => {
    this.setState({
      isLoginPopoverOpen: false
    });
  }

  renderLoginPopover = () => {
    let loginPopoverHeaderMessage = 'Login unsuccessful';
    let loginPopoverBodyMessage;
    if (this.state.lastLoginStatus === 403) {
      loginPopoverBodyMessage = 'It appears you have entered an incorrect username or password! Please check your credentials and try again';
    } else if (this.state.lastLoginStatus === 404) {
      loginPopoverBodyMessage = 'We couldn\'t find an account with that username in our database!';
    } else if (this.state.lastLoginStatus === 500) {
      loginPopoverBodyMessage = 'Sorry! We\'re having some issues on the server-side. Hopefully we can get these sorted out shortly!';
    } else {
      loginPopoverBodyMessage = 'An unexpected error occurred'
    }

    return (
      <div ref={popover => this.popover = popover}>
        <CustomPopover
          placement="bottom"
          target="login"
          isOpen={this.state.isLoginPopoverOpen}
          hasCloseButton={true}
          isErrorPopover={true}
          handleClose={this.handleCloseLoginPopover}
          headerMessage={loginPopoverHeaderMessage}
          bodyMessage={loginPopoverBodyMessage}
        />
      </div>
    );
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
            {this.renderLoginPopover()}
          </Form>
          <h3 className="signup-message-header">
            Don't have an account?
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