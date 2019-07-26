// When necessary, we can break out the constants in this file to specific constants files for each component
const GLOBAL_NUMBERS = {
  MINIMUM_USERNAME_LENGTH: 4,
  MINIMUM_PASSWORD_LENGTH: 8,
  HTTP_STATUS_CODE_200: 200,
  HTTP_STATUS_CODE_201: 201,
  HTTP_STATUS_CODE_403: 403,
  HTTP_STATUS_CODE_404: 404,
  HTTP_STATUS_CODE_409: 409,
  HTTP_STATUS_CODE_500: 500
};

const GLOBAL_STRINGS = {
  USERNAME_TOO_SHORT_ALERT_MSG: 'Username needs to be 4 characters long',
  USERNAME_TAKEN_ALERT_MSG: 'This username is taken',
  PASSWORD_TOO_SHORT_ALERT_MSG: 'Password needs to be 8 characters long',
  UNEXPECTED_ERROR_MSG: 'An unexpected error occurred',
  USERNAME_LABEL_MSG: 'Username',
  PASSWORD_LABEL_MSG: 'Password',
  FULL_NAME_LABEL: 'Full name'
};

const GLOBAL_URLS = {
  POST_API_USERS_LOGIN: '/api/users/login',
  POST_API_USERS_CREATE: '/api/users/create',
  POST_API_CHARACTERS_CREATE: 'api/characters/create',
  GET_API_USERS_EXISTS: '/api/users/exists/',
  GET_API_USERS_LOGGED_IN: '/api/users/logged_in'
};

export {
  GLOBAL_NUMBERS,
  GLOBAL_STRINGS,
  GLOBAL_URLS
}
