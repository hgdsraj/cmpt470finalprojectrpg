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
import {
  NUMERIC_CONSTANTS,
  MSG_STRING_CONSTANTS,
  URL_CONSTANTS
} from '../../Constants/Constants';
import './Login.scss';

// Login page component
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      lastLoginStatus: 0,
      isUsernameLongEnough: false,
      isPasswordLongEnough: false,
      isLoginPopoverOpen: false
    }
  }

  componentWillMount () {
    document.addEventListener('mousedown', this.handleClick);
  }

  // Login handler, make a request to the login backend and redirect to home page if successful
  // TODO: Add production URLs to constants file
  handleLogin = async (event) => {
    event.preventDefault();
    let response = await fetch(URL_CONSTANTS.DEVELOPMENT.POST_API_USERS_LOGIN, {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    });
    if (response.status !== NUMERIC_CONSTANTS.HTTP_STATUS_CODE_200) {
      this.handleOpenLoginPopover(response.status);
      return;
    } else {
      this.handleCloseLoginPopover();
      this.setState({
        lastLoginStatus: NUMERIC_CONSTANTS.HTTP_STATUS_CODE_200
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
      username: event.target.value,
      isUsernameLongEnough: event.target.value.length >= NUMERIC_CONSTANTS.MINIMUM_USERNAME_LENGTH
    });
  }

  handleChangePassword = (event) => {
    this.setState({
      password: event.target.value,
      isPasswordLongEnough: event.target.value.length >= NUMERIC_CONSTANTS.MINIMUM_PASSWORD_LENGTH
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
    let loginPopoverHeaderMessage = MSG_STRING_CONSTANTS.LOGIN_UNSUCCESSFUL_POPOVER_MSG;
    let loginPopoverBodyMessage;
    if (this.state.lastLoginStatus === NUMERIC_CONSTANTS.HTTP_STATUS_CODE_403) {
      loginPopoverBodyMessage = MSG_STRING_CONSTANTS.LOGIN_UNSUCCESSFUL_403_POPOVER_MSG;
    } else if (this.state.lastLoginStatus === NUMERIC_CONSTANTS.HTTP_STATUS_CODE_404) {
      loginPopoverBodyMessage = MSG_STRING_CONSTANTS.LOGIN_UNSUCCESSFUL_404_POPOVER_MSG;
    } else if (this.state.lastLoginStatus === NUMERIC_CONSTANTS.HTTP_STATUS_CODE_500) {
      loginPopoverBodyMessage = MSG_STRING_CONSTANTS.LOGIN_UNSUCCESSFUL_500_POPOVER_MSG;
    } else {
      loginPopoverBodyMessage = MSG_STRING_CONSTANTS.UNEXPECTED_ERROR_MSG;
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
          <h1 className="login-header-text">{MSG_STRING_CONSTANTS.LOGIN_WELCOME_MSG}</h1>
          <Form onSubmit={this.handleLogin}>
            <FormGroup className="login-form-group">
              <Label for="username" className="form-label login-form-label">{MSG_STRING_CONSTANTS.USERNAME_LABEL_MSG}</Label>
              <Input type="username" id="username" onChange={this.handleChangeUsername}/>
            </FormGroup>
            <FormGroup className="login-form-group">
              <Label for="password" className="form-label login-form-label">{MSG_STRING_CONSTANTS.PASSWORD_LABEL_MSG}</Label>
              <Input type="password" id="password" onChange={this.handleChangePassword}/>
            </FormGroup>
            <Button
              color="primary"
              disabled={!(this.state.isUsernameLongEnough && this.state.isPasswordLongEnough)}
              id="login"
              className="login-button"
            >
              {MSG_STRING_CONSTANTS.LOGIN_BUTTON_MSG}
            </Button>
            {this.renderLoginPopover()}
          </Form>
          <h3 className="signup-message-header">
            {MSG_STRING_CONSTANTS.LOGIN_NO_ACCOUNT_MSG}
            <Link to="/signup">
              <Button color="primary" className="signup-message-button" onClick={this.handleSignup}>
                {MSG_STRING_CONSTANTS.SIGNUP_BUTTON_MSG}
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