// When necessary, we can break out the constants in this file to specific constants files for each component

const NUMERIC_CONSTANTS = {
  MINIMUM_USERNAME_LENGTH: 4,
  MINIMUM_PASSWORD_LENGTH: 8,
  HTTP_STATUS_CODE_200: 200,
  HTTP_STATUS_CODE_201: 201,
  HTTP_STATUS_CODE_403: 403,
  HTTP_STATUS_CODE_404: 404,
  HTTP_STATUS_CODE_409: 409,
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
  SIGNUP_BACK_TO_LOGIN_MSG: 'Log in instead',
  NAVBAR_NAV_BRAND_MSG: 'RPG470',
  NAVBAR_NAV_HOME_MSG: 'Home',
  NAVBAR_NAV_BATTLE_MSG: 'Battle',
  NAVBAR_NAV_EXPLORE_MSG: 'Explore',
  NAVBAR_NAV_CHARACTER_MSG: 'Character',
  NAVBAR_NAV_LOG_OUT_BUTTON_MSG: 'Log out',
  NAVBAR_NAV_EXPLORE_DROPDOWN_MAP_MSG: 'Map',
  NAVBAR_NAV_EXPLORE_DROPDOWN_SHOP_MSG: 'Shop',
  NAVBAR_NAV_EXPLORE_DROPDOWN_QUESTS_MSG: 'Quests',
  NAVBAR_NAV_CHARACTER_DROPDOWN_OVERVIEW_MSG: 'Overview',
  NAVBAR_NAV_CHARACTER_DROPDOWN_INVENTORY_MSG: 'Inventory',
  NAVBAR_NAV_CHARACTER_DROPDOWN_ASSIGNSTATS_MSG: 'Assign stats',
  HOME_MINI_CHAR_OVERVIEW_HEADER_MSG: 'Hello, ',
  HOME_BATTLE_SHOWCASE_TITLE_MSG: 'Battle',
  HOME_BATTLE_SHOWCASE_SUBTITLE_MSG: 'Battle the following NPCs to level up your character in combat',
  HOME_EXPLORE_SHOWCASE_TITLE_MSG: 'Explore',
  HOME_EXPLORE_SHOWCASE_MAP_SUBTITLE_MSG: 'Explore the following maps to find new items and complete quests',
  HOME_EXPLORE_SHOWCASE_SHOP_SUBTITLE_MSG: 'Or visit the shop to purchase items that you may find useful'
};

const URL_CONSTANTS = {
  POST_API_USERS_LOGIN: '/api/users/login',
  POST_API_USERS_CREATE: '/api/users/create',
  GET_API_USERS_USERNAME: '/api/users/'
};

export {
  NUMERIC_CONSTANTS,
  MSG_STRING_CONSTANTS,
  URL_CONSTANTS
}
