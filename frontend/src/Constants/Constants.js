// When necessary, we can break out the constants in this file to specific constants files for each component

const NUMERIC_CONSTANTS = {
  MINIMUM_USERNAME_LENGTH: 4,
  MINIMUM_PASSWORD_LENGTH: 8,
  HTTP_STATUS_CODE_200: 200,
  HTTP_STATUS_CODE_403: 403,
  HTTP_STATUS_CODE_404: 404,
  HTTP_STATUS_CODE_500: 500
};

const MSG_STRING_CONSTANTS = {
  USERNAME_TOO_SHORT_ALERT_MSG: 'Username needs to be 4 characters long',
  USERNAME_TAKEN_ALERT_MSG: 'This username is taken',
  PASSWORD_TOO_SHORT_ALERT_MSG: 'Password needs to be 8 characters long',
  SIGNUP_UNSUCCESSFUL_POPOVER_MSG: 'Sign up unsuccessful',
  SIGNUP_USERNAME_TAKEN_POPOVER_MSG: 'There is already a user with that username, please choose a different one',
  LOGIN_UNSUCCESSFUL_POPOVER_MSG: 'Login unsuccessful',
  LOGIN_UNSUCCESSFUL_403_POPOVER_MSG: 'It appears you have entered an incorrect username or password! Please check your credentials and try again',
  LOGIN_UNSUCCESSFUL_404_POPOVER_MSG: 'We couldn\'t find an account with that username in our database!',
  LOGIN_UNSUCCESSFUL_500_POPOVER_MSG: 'Sorry! We\'re having some issues on the server-side. Hopefully we can get these sorted out shortly!',
  UNEXPECTED_ERROR_MSG: 'An unexpected error occurred',
  LOGIN_WELCOME_MSG: 'Welcome to RPG470!',
  USERNAME_LABEL_MSG: 'Username',
  PASSWORD_LABEL_MSG: 'Password',
  FULL_NAME_LABEL: 'Full name',
  LOGIN_NO_ACCOUNT_MSG: 'Don\'t have an account?',
  LOGIN_BUTTON_MSG: 'Log in',
  SIGNUP_BUTTON_MSG: 'Sign up',
  SIGNUP_SIGNUP_HEADER_MSG: 'Sign up!',
  SIGNUP_BACK_TO_LOGIN_MSG: 'Log in instead'
};

const URL_CONSTANTS = {
  DEVELOPMENT: {
    POST_API_USERS_LOGIN: 'http://localhost:8000/api/users/login',
    POST_API_USERS_CREATE: 'http://localhost:8000/api/users/create',
    GET_API_USERS_USERNAME: 'http://localhost:8000/api/users/'
  },
  PRODUCTION: {
    // TODO: Production URLs
  }
}

export {
  NUMERIC_CONSTANTS,
  MSG_STRING_CONSTANTS,
  URL_CONSTANTS
}
