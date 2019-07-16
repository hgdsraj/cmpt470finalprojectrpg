import React from 'react';
import {
  Link
} from 'react-router-dom';
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button
} from 'reactstrap';
import CustomPopover from '../CustomPopover/CustomPopover';
import AlertList from '../AlertList/AlertList';
import {
  NUMERIC_CONSTANTS,
  MSG_STRING_CONSTANTS,
  URL_CONSTANTS
} from '../../Constants/Constants';
import './Signup.scss';

class Signup extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      fullname: '',
      isUsernameTaken: true,
      isUsernameLongEnough: false,
      isPasswordLongEnough: false,
      isSignupPopoverOpen: false,
      lastSignupStatus: 0
    }
  }

  componentWillMount () {
    document.addEventListener('mousedown', this.handleClick);
  }

  // Signup handler, hit the create new user backend and redirect to the create character page if successful
  handleSignup = async (event) => {
    event.preventDefault();
    let response = await fetch(URL_CONSTANTS.DEVELOPMENT.POST_API_USERS_CREATE, {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
        fullname: this.state.fullname
      })
    });
    if (response.status !== NUMERIC_CONSTANTS.HTTP_STATUS_CODE_201) {
      this.handleOpenSignupPopover(response.status);
      return;
    } else {
      this.handleCloseSignupPopover();
      this.setState({
        lastSignupStatus: NUMERIC_CONSTANTS.HTTP_STATUS_CODE_201
      });
    }
    let body = await response.json();
    console.log(body);
    // TODO: Redirect to create character page (once it is built)
  }

  checkIfUsernameExists = async (username) => {
    let rootUrl = URL_CONSTANTS.DEVELOPMENT.GET_API_USERS_USERNAME;
    let response = await fetch(`${rootUrl}${username}`);
    return response.status === NUMERIC_CONSTANTS.HTTP_STATUS_CODE_200;
  }

  // Small util function to handle clicks outside of the popover
  handleClick = (event) => {
    if (this.popover.contains(event.target)) {
      return;
    }
    this.handleCloseSignupPopover();
  }

  handleChangeUsername = async (event) => {
    const username = event.target.value;
    let isUsernameTaken = false;
    if (username) {
      isUsernameTaken = await this.checkIfUsernameExists(username);
    }
    this.setState({
      username,
      isUsernameTaken,
      isUsernameLongEnough: username ? username.length >= NUMERIC_CONSTANTS.MINIMUM_USERNAME_LENGTH : false
    });
  }

  handleChangePassword = (event) => {
    const password = event.target.value;
    this.setState({
      password,
      isPasswordLongEnough: password.length >= NUMERIC_CONSTANTS.MINIMUM_PASSWORD_LENGTH
    });
  }

  handleChangeFullname = (event) => {
    const fullname = event.target.value;
    this.setState({
      fullname
    });
  }

  handleOpenSignupPopover = (lastSignupStatus) => {
    this.setState({
      isSignupPopoverOpen: true,
      lastSignupStatus
    });
  }

  handleCloseSignupPopover = () => {
    this.setState({
      isSignupPopoverOpen: false
    });
  }

  renderUsernameAlertList = () => {
    const messages = [];
    if (!this.state.isUsernameLongEnough) {
      messages.push(MSG_STRING_CONSTANTS.USERNAME_TOO_SHORT_ALERT_MSG);
    } else if (this.state.isUsernameTaken) {
      messages.push(MSG_STRING_CONSTANTS.USERNAME_TAKEN_ALERT_MSG);
    } else {
      return null;
    }
    return (
      <AlertList messages={messages} isErrorAlertList={true} />
    );
  }

  renderPasswordAlertList = () => {
    const messages = [];
    if (!this.state.isPasswordLongEnough) {
      messages.push(MSG_STRING_CONSTANTS.PASSWORD_TOO_SHORT_ALERT_MSG);
    } else {
      return null;
    }
    return (
      <AlertList messages={messages} isErrorAlertList={true} />
    );
  }

  renderSignupPopover = () => {
    const signupPopoverHeaderMessage = MSG_STRING_CONSTANTS.SIGNUP_UNSUCCESSFUL_POPOVER_MSG;
    let signupPopoverBodyMessage;
    if (this.state.lastSignupStatus === NUMERIC_CONSTANTS.HTTP_STATUS_CODE_409) {
      signupPopoverBodyMessage = MSG_STRING_CONSTANTS.SIGNUP_USERNAME_TAKEN_POPOVER_MSG;
    } else {
      signupPopoverBodyMessage = MSG_STRING_CONSTANTS.UNEXPECTED_ERROR_MSG;
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
  } 

  render () {
    return (
      <div className="signup-page">
        <header className="header signup-header">
          <h1>{MSG_STRING_CONSTANTS.SIGNUP_SIGNUP_HEADER_MSG}</h1>
          <Form onSubmit={this.handleSignup}>
            <FormGroup className="signup-form-group">
              <Label for="username" className="form-label signup-form-label">{MSG_STRING_CONSTANTS.USERNAME_LABEL_MSG}</Label>
              <Input type="username" id="username" onChange={this.handleChangeUsername} />
              {this.renderUsernameAlertList()}
            </FormGroup>
            <FormGroup className="signup-form-group">
              <Label for="password" className="form-label signup-form-label">{MSG_STRING_CONSTANTS.PASSWORD_LABEL_MSG}</Label>
              <Input type="password" id="password" onChange={this.handleChangePassword} />
              {this.renderPasswordAlertList()}
            </FormGroup>
            <FormGroup className="signup-form-group">
              <Label for="fullname" className="form-label signup-form-label">{MSG_STRING_CONSTANTS.FULL_NAME_LABEL}</Label>
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
                {MSG_STRING_CONSTANTS.SIGNUP_BUTTON_MSG}
              </Button>
              {this.renderSignupPopover()}
              <Link to="/">
                <Button color="primary" className="back-to-login-button">
                  {MSG_STRING_CONSTANTS.SIGNUP_BACK_TO_LOGIN_MSG}
                </Button>
              </Link>
            </div>
          </Form>
        </header>
      </div>
    )
  }

  componentWillUnmount () {
    document.removeEventListener('mousedown', this.handleClick);
  }
}

export default Signup;