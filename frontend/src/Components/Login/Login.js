import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {Button, Form, FormGroup, Input, Label} from 'reactstrap';
import CustomPopover from '../CustomPopover/CustomPopover';
import {
  STRINGS
} from '../../Constants/LoginConstants';
import {
  GLOBAL_NUMBERS,
  GLOBAL_STRINGS,
  GLOBAL_URLS
} from '../../Constants/GlobalConstants';
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
    };
  }

  componentWillMount() {
    document.addEventListener('mousedown', this.handleClick);
  }

  // Login handler, make a request to the login backend and redirect to home page if successful
  handleLogin = async (event) => {
    event.preventDefault();
    const response = await fetch(GLOBAL_URLS.POST_API_USERS_LOGIN, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    });
    if (response.status !== GLOBAL_NUMBERS.HTTP_STATUS_CODE_200) {
      this.handleOpenLoginPopover(response.status);
      return;
    } else {
      this.handleCloseLoginPopover();
      this.setState({
        lastLoginStatus: GLOBAL_NUMBERS.HTTP_STATUS_CODE_200
      });
    }
    const body = await response.json();
    console.log(body);
    await this.props.handleAuthenticate();
  };

  // Small util function to handle clicks outside of the popover
  handleClick = (event) => {
    if (this.popover.contains(event.target)) {
      return;
    }
    this.handleCloseLoginPopover();
  };

  handleChangeUsername = (event) => {
    const username = event.target.value;
    this.setState({
      username,
      isUsernameLongEnough: username.length >= GLOBAL_NUMBERS.MINIMUM_USERNAME_LENGTH
    });
  };

  handleChangePassword = (event) => {
    const password = event.target.value;
    this.setState({
      password,
      isPasswordLongEnough: password.length >= GLOBAL_NUMBERS.MINIMUM_PASSWORD_LENGTH
    });
  };

  handleOpenLoginPopover = (lastLoginStatus) => {
    this.setState({
      isLoginPopoverOpen: true,
      lastLoginStatus
    });
  };

  handleCloseLoginPopover = () => {
    this.setState({
      isLoginPopoverOpen: false
    });
  };

  renderLoginPopover = () => {
    const loginPopoverHeaderMessage = STRINGS.LOGIN_UNSUCCESSFUL_POPOVER_MSG;
    let loginPopoverBodyMessage;
    if (this.state.lastLoginStatus === GLOBAL_NUMBERS.HTTP_STATUS_CODE_403) {
      loginPopoverBodyMessage = STRINGS.LOGIN_UNSUCCESSFUL_403_POPOVER_MSG;
    } else if (this.state.lastLoginStatus === GLOBAL_NUMBERS.HTTP_STATUS_CODE_404) {
      loginPopoverBodyMessage = STRINGS.LOGIN_UNSUCCESSFUL_404_POPOVER_MSG;
    } else if (this.state.lastLoginStatus === GLOBAL_NUMBERS.HTTP_STATUS_CODE_500) {
      loginPopoverBodyMessage = STRINGS.LOGIN_UNSUCCESSFUL_500_POPOVER_MSG;
    } else {
      loginPopoverBodyMessage = GLOBAL_STRINGS.UNEXPECTED_ERROR_MSG;
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
  };

  render() {
    return (
      <div className="login-page page-container">
        <div className="full-viewport centered content login-centered-content container">
          <h1 className="login-header-text">{STRINGS.LOGIN_WELCOME_MSG}</h1>
          <Form onSubmit={this.handleLogin}>
            <FormGroup className="login-form-group">
              <Label for="username" className="form-label login-form-label">{GLOBAL_STRINGS.USERNAME_LABEL_MSG}</Label>
              <Input type="username" id="username" onChange={this.handleChangeUsername}/>
            </FormGroup>
            <FormGroup className="login-form-group">
              <Label for="password" className="form-label login-form-label">{GLOBAL_STRINGS.PASSWORD_LABEL_MSG}</Label>
              <Input type="password" id="password" onChange={this.handleChangePassword}/>
            </FormGroup>
            <Button
              color="primary"
              disabled={!(this.state.isUsernameLongEnough && this.state.isPasswordLongEnough)}
              id="login"
              className="login-button"
            >
              {STRINGS.LOGIN_BUTTON_MSG}
            </Button>
            {this.renderLoginPopover()}
          </Form>
          <h3 className="signup-message-header">
            {STRINGS.LOGIN_NO_ACCOUNT_MSG}
            <Link to="/signup">
              <Button color="primary" className="signup-message-button" onClick={this.handleSignup}>
                {STRINGS.LOGIN_SIGNUP_BUTTON_MSG}
              </Button>
            </Link>
          </h3>
        </div>
      </div>
    );
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick);
  }
}

Login.propTypes = {
  handleAuthenticate: PropTypes.func
};

export default Login;