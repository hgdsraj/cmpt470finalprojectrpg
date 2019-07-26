import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  Card,
  CardImg,
  Table
} from 'reactstrap';
import {
  NUMBERS,
  STRINGS
} from '../../Constants/CreateCharacterConstants';
import {
  GLOBAL_URLS
} from '../../Constants/GlobalConstants';
import CustomNavbar from '../CustomNavbar/CustomNavbar';
import './CreateCharacter.scss';
import PrincessAvatar from '../../Assets/princess_avatar.png';

function AssignStatsTable(props) {
  const assignStatsTableRows = props.stats.map((stat, index) => {
    return (
      <tr key={index} className="stats-table-row">
        <td className="stat-label">{stat.name}</td>
        <td className="stat-value">
          <p className="stat-value-p">
            <Button
              id={props.statIds[index][0]}
              className="stat-value-button stat-value-subtract"
              color="danger"
              onClick={props.buttonOnClick}
              disabled={stat.isSubtractButtonDisabled}
            >
              {STRINGS.CREATE_CHARACTER_SUBTRACT_STAT_BUTTON_MSG}
            </Button>
            {stat.value}
            <Button
              id={props.statIds[index][1]}
              className="stat-value-button stat-value-add"
              color="success"
              onClick={props.buttonOnClick}
              disabled={stat.isAddButtonDisabled}
            >
              {STRINGS.CREATE_CHARACTER_ADD_STAT_BUTTON_MSG}
            </Button>
          </p>
        </td>
      </tr>
    );
  });

  return (
    <FormGroup className="create-character-avatar-form-group">
      <Label className="create-character-form-label form-label">
        {`${STRINGS.CREATE_CHARACTER_ASSIGN_STATS_POINTS_MSG_ROOT}${props.remainingStatPoints}${STRINGS.CREATE_CHARACTER_ASSIGN_STATS_POINTS_MSG_END}`}
      </Label>
      <div className="create-character-assign-stats-card-wrapper">
        <Card className="create-character-assign-stats-card">
          <Table className="create-character-assign-stats-table">
            <thead>
            <tr>
              <th>{STRINGS.CREATE_CHARACTER_ASSIGN_STATS_STAT_MSG}</th>
              <th>{STRINGS.CREATE_CHARACTER_ASSIGN_STATS_VALUE_MSG}</th>
            </tr>
            </thead>
            <tbody>
            {assignStatsTableRows}
            </tbody>
          </Table>
        </Card>
      </div>
    </FormGroup>
  );
}

AssignStatsTable.propTypes = {
  buttonOnClick: PropTypes.func,
  remainingStatPoints: PropTypes.number,
  stats: PropTypes.array,
  statIds: PropTypes.array
};

function AvatarSelect(props) {
  const avatars = props.avatars.map((avatar, index) => {
    const avatarInputId = avatar.toLowerCase();
    return (
      <FormGroup key={index} className="create-character-avatar-form-group" check>
        <Card className="create-character-avatar-card">
          <CardImg src={PrincessAvatar}/>
        </Card>
        <div className="create-character-avatar-label-wrapper">
          <Input id={avatarInputId} type="radio" name="avatar-select" onChange={props.onChange}/>
          <Label className="create-character-avatar-form-label form-label" check>
            {' '}
            {avatar}
          </Label>
        </div>
      </FormGroup>
    );
  });

  return (
    <FormGroup className="create-character-avatar-form-group" tag="avatar-select">
      <legend className="create-character-avatar-legend">{STRINGS.CREATE_CHARACTER_AVATAR_SELECT_AVATAR_MSG}</legend>
      <div className="create-character-avatar-card-container card-container">
        {avatars}
      </div>
    </FormGroup>
  );
}

AvatarSelect.propTypes = {
  avatars: PropTypes.array
};

class CreateCharacter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      characterName: '',
      remainingStatPoints: 10,
      avatarSelection: '',
      stats: [
        {
          name: 'Stamina',
          value: 12,
          isAddButtonDisabled: false,
          isSubtractButtonDisabled: true
        },
        {
          name: 'Strength',
          value: 10,
          isAddButtonDisabled: false,
          isSubtractButtonDisabled: true
        },
        {
          name: 'Agility',
          value: 10,
          isAddButtonDisabled: false,
          isSubtractButtonDisabled: true
        },
        {
          name: 'Wisdom',
          value: 11,
          isAddButtonDisabled: false,
          isSubtractButtonDisabled: true
        },
        {
          name: 'Charisma',
          value: 11,
          isAddButtonDisabled: false,
          isSubtractButtonDisabled: true
        }
      ]
    };
  }

  handleCheckRemainingStatPoints = () => {
    const stats = Array.from(this.state.stats);
    if (this.state.remainingStatPoints === 0) {
      stats.forEach(stat => {
        stat.isAddButtonDisabled = true;
      });
    } else {
      stats.forEach((stat, index) => {
        if (stat.value < NUMBERS.CREATE_CHARACTER_MAX_STAT_VALUES[index]) {
          stat.isAddButtonDisabled = false;
        }
      });
    }
    this.setState({
      stats
    });
  };

  handleAddOrSubtractStat = (event) => {
    const splitTargetId = event.target.id.split('-');
    const operation = splitTargetId[0];
    const statIndex = NUMBERS.CREATE_CHARACTER_STAT_INDEX_MAP[splitTargetId[1]];
    if (operation === 'add') {
      const stat = {...this.state.stats[statIndex]};
      if (stat.value === NUMBERS.CREATE_CHARACTER_MAX_STAT_VALUES[statIndex] - 1) {
        stat.isAddButtonDisabled = true;
      }
      stat.value++;
      stat.isSubtractButtonDisabled = false;
      const stats = Array.from(this.state.stats);
      stats[statIndex] = stat;
      this.setState({
        remainingStatPoints: this.state.remainingStatPoints - 1,
        stats,
      }, this.handleCheckRemainingStatPoints);
    } else {
      const stat = {...this.state.stats[statIndex]};
      if (stat.value === NUMBERS.CREATE_CHARACTER_MIN_STAT_VALUES[statIndex] + 1) {
        stat.isSubtractButtonDisabled = true;
      }
      stat.value--;
      stat.isAddButtonDisabled = false;
      const stats = Array.from(this.state.stats);
      stats[statIndex] = stat;
      this.setState({
        remainingStatPoints: this.state.remainingStatPoints + 1,
        stats
      }, this.handleCheckRemainingStatPoints);
    }
  };

  handleChangeAvatarSelection = (event) => {
    const avatarSelection = event.target.id;
    this.setState({
      avatarSelection
    });
  };

  handleCreateCharacter = async (event) => {
    event.preventDefault();
    // TODO: get the username from the session cookie once it is implemented
    // NOTE: anothernewuser is just a placeholder user name for now. REMOVE THIS ASAP!
    const response = await fetch(`${GLOBAL_URLS.POST_API_CHARACTERS_CREATE}`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name: this.state.characterName,
        stamina: this.state.stats[0].value,
        strength: this.state.stats[1].value,
        agility: this.state.stats[2].value,
        wisdom: this.state.stats[3].value,
        charisma: this.state.stats[4].value
      })
    });
    const body = await response.json();
    console.log(body);
    // TODO: redirect to home page (implement after cookies/sessions is properly hooked up)
  };

  handleChangeCharacterName = (event) => {
    const characterName = event.target.value;
    this.setState({
      characterName
    });
  };

  render() {
    return (
      <div className="create-character-page page-container">
        <CustomNavbar/>
        {/* TODO: Change CSS such that we don't need this full-viewport-with-navbar class - use flexbox page-containers instead */}
        <div className="create-character-centered-content full-viewport-with-navbar centered content container">
          <div className="create-character-viewport-width">
            <h1 className="create-character-header-text">{STRINGS.CREATE_CHARACTER_HEADER_MSG}</h1>
            <Form onSubmit={this.handleCreateCharacter}>
              <FormGroup className="create-character-form-group">
                <Label for="charactername" className="create-character-form-label form-label">
                  {STRINGS.CREATE_CHARACTER_CHARACTER_NAME_MSG}
                </Label>
                <Input type="charactername" id="charactername"
                       onChange={this.handleChangeCharacterName}/>
              </FormGroup>
              <AvatarSelect
                avatars={STRINGS.CREATE_CHARACTER_AVATAR_NAMES}
                onChange={this.handleChangeAvatarSelection}
              />
              <AssignStatsTable
                stats={this.state.stats}
                remainingStatPoints={this.state.remainingStatPoints}
                statIds={STRINGS.CREATE_CHARACTER_STAT_IDS}
                buttonOnClick={this.handleAddOrSubtractStat}
              />
              <Button
                color="primary"
                id="create"
                className="create-button"
                disabled={this.state.remainingStatPoints > 0 || !this.state.characterName || !this.state.avatarSelection}
              >
                {STRINGS.CREATE_CHARACTER_CREATE_BUTTON_MSG}
              </Button>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateCharacter;