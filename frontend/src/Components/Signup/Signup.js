import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {Button, Form, FormGroup, Input, Label} from 'reactstrap';
import CustomPopover from '../CustomPopover/CustomPopover';
import AlertList from '../AlertList/AlertList';
import {
  STRINGS
} from '../../Constants/SignupConstants';
import {
  GLOBAL_NUMBERS,
  GLOBAL_STRINGS,
  GLOBAL_URLS
} from '../../Constants/GlobalConstants';
import './Signup.scss';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      fullname: '',
      isUsernameTaken: true,
      isUsernameLongEnough: false,
      isPasswordLongEnough: false,
      isSignupPopoverOpen: false,
      lastSignupStatus: 0
    };
  }

  componentWillMount() {
    document.addEventListener('mousedown', this.handleClick);
  }

  // Signup handler, hit the create new user backend and redirect to the create character page if successful
  handleSignup = async (event) => {
    event.preventDefault();
    const response = await fetch(GLOBAL_URLS.POST_API_USERS_CREATE, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
        fullname: this.state.fullname
      })
    });
    if (response.status !== GLOBAL_NUMBERS.HTTP_STATUS_CODE_201) {
      this.handleOpenSignupPopover(response.status);
      return;
    } else {
      this.handleCloseSignupPopover();
      this.setState({
        lastSignupStatus: GLOBAL_NUMBERS.HTTP_STATUS_CODE_201
      });
    }
    const body = await response.json();
    console.log(body);

    // After signup, automatically log the user in, and redirect to create character page
    await fetch(GLOBAL_URLS.POST_API_USERS_LOGIN, {
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
    this.props.handleAuthenticate();
  };

  checkIfUsernameExists = async (username) => {
    let rootUrl = GLOBAL_URLS.GET_API_USERS_EXISTS;
    let response = await fetch(`${rootUrl}${username}`, {
      headers: {
        'Accept': 'application/json'
      }
    });
    return response.status === GLOBAL_NUMBERS.HTTP_STATUS_CODE_200;
  };

  // Small util function to handle clicks outside of the popover
  handleClick = (event) => {
    if (this.popover.contains(event.target)) {
      return;
    }
    this.handleCloseSignupPopover();
  };

  handleChangeUsername = async (event) => {
    const username = event.target.value;
    let isUsernameTaken = false;
    if (username) {
      isUsernameTaken = await this.checkIfUsernameExists(username);
    }
    this.setState({
      username,
      isUsernameTaken,
      isUsernameLongEnough: username ? username.length >= GLOBAL_NUMBERS.MINIMUM_USERNAME_LENGTH : false
    });
  };

  handleChangePassword = (event) => {
    const password = event.target.value;
    this.setState({
      password,
      isPasswordLongEnough: password.length >= GLOBAL_NUMBERS.MINIMUM_PASSWORD_LENGTH
    });
  };

  handleChangeFullname = (event) => {
    const fullname = event.target.value;
    this.setState({
      fullname
    });
  };

  handleOpenSignupPopover = (lastSignupStatus) => {
    this.setState({
      isSignupPopoverOpen: true,
      lastSignupStatus
    });
  };

  handleCloseSignupPopover = () => {
    this.setState({
      isSignupPopoverOpen: false
    });
  };

  renderUsernameAlertList = () => {
    const messages = [];
    if (!this.state.isUsernameLongEnough) {
      messages.push(GLOBAL_STRINGS.USERNAME_TOO_SHORT_ALERT_MSG);
    } else if (this.state.isUsernameTaken) {
      messages.push(GLOBAL_STRINGS.USERNAME_TAKEN_ALERT_MSG);
    } else {
      return null;
    }
    return (
      <AlertList messages={messages} isErrorAlertList={true}/>
    );
  };

  renderPasswordAlertList = () => {
    const messages = [];
    if (!this.state.isPasswordLongEnough) {
      messages.push(GLOBAL_STRINGS.PASSWORD_TOO_SHORT_ALERT_MSG);
    } else {
      return null;
    }
    return (
      <AlertList messages={messages} isErrorAlertList={true}/>
    );
  };

  renderSignupPopover = () => {
    const signupPopoverHeaderMessage = STRINGS.SIGNUP_UNSUCCESSFUL_POPOVER_MSG;
    let signupPopoverBodyMessage;
    if (this.state.lastSignupStatus === GLOBAL_NUMBERS.HTTP_STATUS_CODE_409) {
      signupPopoverBodyMessage = STRINGS.SIGNUP_USERNAME_TAKEN_POPOVER_MSG;
    } else {
      signupPopoverBodyMessage = GLOBAL_STRINGS.UNEXPECTED_ERROR_MSG;
    }

    return (
      <div ref={popover => this.popover = popover}>
        <CustomPopover
          placement="bottom"
          target="signup"
          isOpen={this.state.isSignupPopoverOpen}
          hasCloseButton={true}
          isErrorPopover={true}
          handleClose={this.handleCloseSignupPopover}
          headerMessage={signupPopoverHeaderMessage}
          bodyMessage={signupPopoverBodyMessage}
        />
      </div>
    );
  };

  render() {
    return (
      <div className="signup-page page-container">
        <div className="full-viewport centered content signup-centered-content container">
          <h1>{STRINGS.SIGNUP_SIGNUP_HEADER_MSG}</h1>
          <Form onSubmit={this.handleSignup}>
            <FormGroup className="signup-form-group">
              <Label for="username" className="form-label signup-form-label">{GLOBAL_STRINGS.USERNAME_LABEL_MSG}</Label>
              <Input type="username" id="username" onChange={this.handleChangeUsername} />
              {this.renderUsernameAlertList()}
            </FormGroup>
            <FormGroup className="signup-form-group">
              <Label for="password" className="form-label signup-form-label">{GLOBAL_STRINGS.PASSWORD_LABEL_MSG}</Label>
              <Input type="password" id="password" onChange={this.handleChangePassword} />
              {this.renderPasswordAlertList()}
            </FormGroup>
            <FormGroup className="signup-form-group">
              <Label for="fullname" className="form-label signup-form-label">{GLOBAL_STRINGS.FULL_NAME_LABEL}</Label>
              <Input type="fullname" id="fullname" onChange={this.handleChangeFullname} />
            </FormGroup>
            <div className="signup-button-row">
              <Button
                color="primary"
                disabled={this.state.isUsernameTaken ||
                !(this.state.isUsernameLongEnough && this.state.isPasswordLongEnough)}
                id="signup"
                className="signup-button"
              >
                {STRINGS.SIGNUP_SIGNUP_BUTTON_MSG}
              </Button>
              {this.renderSignupPopover()}
              <Link to="/">
                <Button color="primary" className="back-to-login-button">
                  {STRINGS.SIGNUP_BACK_TO_LOGIN_MSG}
                </Button>
              </Link>
            </div>
          </Form>
        </div>
      </div>
    );
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick);
  }
}

Signup.propTypes = {
  handleAuthenticate: PropTypes.func
};

export default Signup;
