const NUMBERS = {
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

const STRINGS = {
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
  CREATE_CHARACTER_ASSIGN_STATS_POINTS_MSG_END: ' points left to assign)',
  CREATE_CHARACTER_ASSIGN_STATS_STAT_MSG: 'Stat',
  CREATE_CHARACTER_ASSIGN_STATS_VALUE_MSG: 'Value'
};

export {
  NUMBERS,
  STRINGS
}