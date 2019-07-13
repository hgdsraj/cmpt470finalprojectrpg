import React from 'react';
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button
} from 'reactstrap';
import './Signup.scss';

class Signup extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      fullname: '',
    }
  }

  handleChangeUsername = (event) => {

  }

  handleChangePassword = (event) => {

  }

  handleChangeFullname = (event) => {

  }

  handleSignup = (event) => {
    event.preventDefault();
  }

  render () {
    return (
      <div className="signup-page">
        <header className="header signup-header">
          <h1>Sign up!</h1>
          <Form>
            <FormGroup className="signup-form-group">
              <Label for="username" className="form-label signup-form-label">Username</Label>
              <Input type="username" id="username" onChange={this.handleChangeUsername}/>
            </FormGroup>
            <FormGroup className="signup-form-group">
              <Label for="password" className="form-label signup-form-label">Password</Label>
              <Input type="password" id="password" onChange={this.handleChangePassword}/>
            </FormGroup>
            <FormGroup className="login-form-group">
              <Label for="fullname" className="form-label signup-form-label">Full Name</Label>
              <Input type="fullname" id="fullname" onChange={this.handleChangeFullname}/>
            </FormGroup>
            <Button color="primary" className="signup-button">
              Sign up
            </Button>
          </Form>
        </header>
      </div>
    )
  }
}

export default Signup;