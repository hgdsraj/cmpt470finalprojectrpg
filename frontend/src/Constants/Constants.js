// When necessary, we can break out the constants in this file to specific constants files for each component
const NUMERIC_CONSTANTS = {
  MINIMUM_USERNAME_LENGTH: 4,
  MINIMUM_PASSWORD_LENGTH: 8,
  HTTP_STATUS_CODE_200: 200,
  HTTP_STATUS_CODE_201: 201,
  HTTP_STATUS_CODE_403: 403,
  HTTP_STATUS_CODE_404: 404,
  HTTP_STATUS_CODE_409: 409,
  HTTP_STATUS_CODE_500: 500,
  CREATE_CHARACTER_STAT_INDEX_MAP: {
    'stamina': 0,
    'strength': 1,
    'agility': 2,
    'wisdom': 3,
    'charisma': 4
  },
  CREATE_CHARACTER_MIN_STAT_VALUES: [
    12,
    10,
    10,
    11,
    11
  ],
  CREATE_CHARACTER_MAX_STAT_VALUES: [
    16,
    14,
    14,
    15,
    15
  ]
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
  NAVBAR_NAV_BATTLE_MSG: 'Battle (Coming Soon)',
  NAVBAR_NAV_EXPLORE_MSG: 'Explore (Coming Soon)',
  NAVBAR_NAV_CHARACTER_MSG: 'Character',
  NAVBAR_NAV_LOG_OUT_BUTTON_MSG: 'Log out',
  NAVBAR_NAV_EXPLORE_DROPDOWN_MAP_MSG: 'Map (Coming Soon)',
  NAVBAR_NAV_EXPLORE_DROPDOWN_SHOP_MSG: 'Shop (Coming Soon)',
  NAVBAR_NAV_EXPLORE_DROPDOWN_QUESTS_MSG: 'Quests (Coming Soon)',
  NAVBAR_NAV_CHARACTER_DROPDOWN_OVERVIEW_MSG: 'Overview',
  NAVBAR_NAV_CHARACTER_DROPDOWN_INVENTORY_MSG: 'Inventory',
  NAVBAR_NAV_CHARACTER_DROPDOWN_ASSIGNSTATS_MSG: 'Assign stats (Coming Soon)',
  HOME_MINI_CHAR_OVERVIEW_HEADER_MSG: 'Hello, ',
  HOME_MINI_CHAR_OVERVIEW_STAT_MSG: 'Stat',
  HOME_MINI_CHAR_OVERVIEW_VALUE_MSG: 'Value',
  HOME_MINI_CHAR_OVERVIEW_HEALTH_STAT_MSG: 'Health',
  HOME_MINI_CHAR_OVERVIEW_ATTACK_STAT_MSG: 'Attack',
  HOME_MINI_CHAR_OVERVIEW_DEFENSE_STAT_MSG: 'Defense',
  HOME_BATTLE_SHOWCASE_TITLE_MSG: 'Battle (Coming Soon)',
  HOME_BATTLE_SHOWCASE_SUBTITLE_MSG: 'Battle the following NPCs to level up your character in combat',
  HOME_BATTLE_SHOWCASE_CARD_BUTTON_MSG: 'Fight',
  HOME_EXPLORE_SHOWCASE_TITLE_MSG: 'Explore (Coming Soon)',
  HOME_EXPLORE_SHOWCASE_MAP_SUBTITLE_MSG: 'Explore the following maps to find new items and complete quests',
  HOME_EXPLORE_SHOWCASE_SHOP_SUBTITLE_MSG: 'Or visit the shop to purchase items that you may find useful',
  HOME_EXPLORE_SHOWCASE_MAP_CARD_BUTTON_MSG: 'Explore',
  HOME_EXPLORE_SHOWCASE_SHOP_CARD_BUTTON_MSG: 'Purchase',
  LEVEL_MSG: 'Level ',
  CREATE_CHARACTER_HEADER_MSG: 'Create a character',
  CREATE_CHARACTER_CHARACTER_NAME_MSG: 'Character name',
  CREATE_CHARACTER_ADD_STAT_MSG: 'add',
  CREATE_CHARACTER_SUBTRACT_STAT_MSG: 'subtract',
  CREATE_CHARACTER_STAT_STAM_MSG: 'stamina',
  CREATE_CHARACTER_STAT_STR_MSG: 'strength',
  CREATE_CHARACTER_STAT_AGI_MSG: 'agility',
  CREATE_CHARACTER_STAT_WIS_MSG: 'wisdom',
  CREATE_CHARACTER_STAT_CHAR_MSG: 'charisma',
  CREATE_CHARACTER_AVATAR_SELECT_AVATAR_MSG: 'Avatar',
  CREATE_CHARACTER_AVATAR_NAMES: [
    'Princess',
    'Vampire',
    'Knight',
    'Warrior',
    'Cleric',
    'Hunter'
  ],
  CREATE_CHARACTER_STAT_IDS: [
    [
      'subtract-stamina',
      'add-stamina'
    ],
    [
      'subtract-strength',
      'add-strength'
    ],
    [
      'subtract-agility',
      'add-agility'
    ],
    [
      'subtract-wisdom',
      'add-wisdom'
    ],
    [
      'subtract-charisma',
      'add-charisma'
    ],
  ],
  CREATE_CHARACTER_ADD_STAT_BUTTON_MSG: '+',
  CREATE_CHARACTER_SUBTRACT_STAT_BUTTON_MSG: '-',
  CREATE_CHARACTER_CREATE_BUTTON_MSG: 'Create',
  CREATE_CHARACTER_ASSIGN_STATS_POINTS_MSG_ROOT: 'Assign stats (You have ',
  CREATE_CHARACTER_ASSIGN_STATS_POINTS_MSG_END: 'points left to assign)',
  CREATE_CHARACTER_ASSIGN_STATS_STAT_MSG: 'Stat',
  CREATE_CHARACTER_ASSIGN_STATS_VALUE_MSG: 'Value',
};

const URL_CONSTANTS = {
  POST_API_USERS_LOGIN: '/api/users/login',
  POST_API_USERS_CREATE: '/api/users/create',
  API_CHARACTERS_ROOT: 'api/characters/',
  POST_API_CHARACTERS_CREATE: '/create',
  GET_API_USERS_USERNAME: '/api/users/'
};

export {
  NUMERIC_CONSTANTS,
  MSG_STRING_CONSTANTS,
  URL_CONSTANTS
}
