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
    let response = await fetch('http://localhost:8000/api/users/create', {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
        fullname: this.state.fullname
      })
    });
    if (response.status !== 200) {
      this.handleOpenSignupPopover(response.status);
      return;
    } else {
      this.handleCloseSignupPopover();
      this.setState({
        lastSignupStatus: 200
      });
    }
    let body = await response.json();
    console.log(body);
    // TODO: Redirect to create character page (once it is built)
  }

  checkIfUsernameExists = async (username) => {
    return await fetch(`http://localhost:8000/api/users/${username}`).status === 200;
  }

  // Small util function to handle clicks outside of the popover
  handleClick = (event) => {
    if (this.popover.contains(event.target)) {
      return;
    }
    this.handleCloseSignupPopover();
  }

  handleChangeUsername = (event) => {
    let username = event.target.value;
    this.setState({
      username: username,
      isUsernameTaken: username ? !this.checkIfUsernameExists(event.target.value) : false,
      isUsernameLongEnough: username ? username.length >= 4 : false
    });
  }

  handleChangePassword = (event) => {
    let password = event.target.value;
    this.setState({
      password: password,
      isPasswordLongEnough: password.length >= 8
    });
  }

  handleChangeFullname = (event) => {
    this.setState({
      fullname: event.target.value
    });
  }

  handleOpenSignupPopover = (signupStatus) => {
    this.setState({
      isSignupPopoverOpen: true,
      lastSignupStatus: signupStatus
    });
  }

  handleCloseSignupPopover = () => {
    this.setState({
      isSignupPopoverOpen: false
    });
  }

  renderUsernameAlertList = () => {
    let messages = [];
    if (!this.state.isUsernameLongEnough) {
      messages.push("Username needs to be 4 characters long");
    } else if (this.state.isUsernameTaken) {
      messages.push("This username is taken");
    } else {
      return null;
    }
    return (
      <AlertList messages={messages} isErrorAlertList={true} />
    );
  }

  renderPasswordAlertList = () => {
    let messages = [];
    if (!this.state.isPasswordLongEnough) {
      messages.push("Password needs to be 8 characters long");
    } else {
      return null;
    }
    return (
      <AlertList messages={messages} isErrorAlertList={true} />
    );
  }

  renderSignupPopover = () => {
    let signupPopoverHeaderMessage = 'Sign up unsuccessful';
    let signupPopoverBodyMessage;
    if (this.state.lastSignupStatus === 500) {
      signupPopoverBodyMessage = 'There is already a user with that username, please choose a different one';
    } else {
      signupPopoverBodyMessage = 'An unexpected error occurred';
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
          <h1>Sign up!</h1>
          <Form onSubmit={this.handleSignup}>
            <FormGroup className="signup-form-group">
              <Label for="username" className="form-label signup-form-label">Username</Label>
              <Input type="username" id="username" onChange={this.handleChangeUsername} />
              {this.renderUsernameAlertList()}
            </FormGroup>
            <FormGroup className="signup-form-group">
              <Label for="password" className="form-label signup-form-label">Password</Label>
              <Input type="password" id="password" onChange={this.handleChangePassword} />
              {this.renderPasswordAlertList()}
            </FormGroup>
            <FormGroup className="login-form-group">
              <Label for="fullname" className="form-label signup-form-label">Full Name</Label>
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
                Sign up
              </Button>
              {this.renderSignupPopover()}
              <Link to="/">
                <Button color="primary" className="back-to-login-button">
                    Log in instead
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