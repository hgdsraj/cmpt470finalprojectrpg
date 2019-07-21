import React from 'react';
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
  NUMERIC_CONSTANTS,
  MSG_STRING_CONSTANTS,
  URL_CONSTANTS
} from '../../Constants/Constants';
import CustomNavbar from '../CustomNavbar/CustomNavbar';
import './CreateCharacter.scss';
import PrincessAvatar from '../../Assets/princess_avatar.png';

function AssignStatsTable(props) {
  return (
    <FormGroup className="create-character-avatar-form-group">
      <Label className="create-character-form-label form-label">
        Assign stats (You have {props.remainingStatPoints} points left to assign)
      </Label>
      <div className="create-character-assign-stats-card-wrapper">
        <Card className="create-character-assign-stats-card">
          <Table className="create-character-assign-stats-table">
            <thead>
            <tr>
              <th>Stat</th>
              <th>Value</th>
            </tr>
            </thead>
          </Table>
        </Card>
      </div>
    </FormGroup>
  );
}

function AvatarSelect(props) {
  const avatars = props.avatars.map((avatar, index) => {
    const avatarInputId = avatar.toLowerCase();
    return (
      <FormGroup key={index} className="create-character-avatar-form-group" check>
        <Card className="create-character-avatar-card">
          <CardImg src={PrincessAvatar} />
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
      <legend className="create-character-avatar-legend">Avatar</legend>
      <div className="create-character-avatar-card-container card-container">
        {avatars}
      </div>
    </FormGroup>
  )
}

class CreateCharacter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      characterName: '',
      remainingStatPoints: 10,
      avatarSelection: '',
      stats: [
        {
          value: 12,
          isAddButtonDisabled: false,
          isSubtractButtonDisabled: true
        },
        {
          value: 10,
          isAddButtonDisabled: false,
          isSubtractButtonDisabled: true
        },
        {
          value: 10,
          isAddButtonDisabled: false,
          isSubtractButtonDisabled: true
        },
        {
          value: 11,
          isAddButtonDisabled: false,
          isSubtractButtonDisabled: true
        },
        {
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
        if (stat.value < NUMERIC_CONSTANTS.CREATE_CHARACTER_MAX_STAT_VALUES[index]) {
          stat.isAddButtonDisabled = false;
        }
      });
    }
    this.setState({
      stats
    });
  }

  handleAddOrSubtractStat = (event) => {
    const splitTargetId = event.target.id.split('-');
    const operation = splitTargetId[0];
    const statIndex = NUMERIC_CONSTANTS.CREATE_CHARACTER_STAT_INDEX_MAP[splitTargetId[1]];
    if (operation === 'add') {
      const stat = {...this.state.stats[statIndex]};
      if (stat.value === NUMERIC_CONSTANTS.CREATE_CHARACTER_MAX_STAT_VALUES[statIndex] - 1) {
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
      if (stat.value === NUMERIC_CONSTANTS.CREATE_CHARACTER_MIN_STAT_VALUES[statIndex] + 1) {
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
  }

  handleChangeAvatarSelection = (event) => {
    const avatarSelection = event.target.id;
    this.setState({
      avatarSelection
    });
  }

  handleCreateCharacter = async (event) => {
    event.preventDefault();
    // TODO: get the username from the session cookie once it is implemented
    const response = await fetch(`${URL_CONSTANTS.API_CHARACTERS_ROOT}/anothernewuser/${URL_CONSTANTS.POST_API_CHARACTERS_CREATE}`, {
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
  }

  handleChangeCharacterName = (event) => {
    const characterName = event.target.value;
    this.setState({
      characterName
    });
  }

  // NOTE: For avatar label names, keep them to one word, no more than 10 characters
  render () {
    // Define avatar names here
    const avatars = ['Princess', 'Vampire', 'Knight', 'Warrior', 'Cleric', 'Hunter'];

    return (
      <div className="create-character-page page-container">
        <CustomNavbar />
        {/* TODO: Change CSS such that we don't need this full-viewport-with-navbar class - use flexbox page-containers instead */}
        <div className="create-character-centered-content full-viewport-with-navbar centered content container">
          <div className="create-character-viewport-width">
            <h1 className="create-character-header-text">Create a Character</h1>
            <Form onSubmit={this.handleCreateCharacter}>
              <FormGroup className="create-character-form-group">
                <Label for="charactername" className="create-character-form-label form-label">Character name</Label>
                <Input type="charactername" id="charactername" onChange={this.handleChangeCharacterName}/>
              </FormGroup>
              <AvatarSelect avatars={avatars} onChange={this.handleChangeAvatarSelection} />

              <FormGroup className="create-character-avatar-form-group">
                <Label className="create-character-form-label form-label">
                  Assign stats (You have {this.state.remainingStatPoints} points left to assign)
                </Label>
                <div className="create-character-assign-stats-card-wrapper">
                  <Card className="create-character-assign-stats-card">
                    <Table className="create-character-assign-stats-table">
                      <thead>
                        <tr>
                          <th>Stat</th>
                          <th>Value</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="stats-table-row">
                          <td className="stat-label">Stamina</td>
                          <td className="stat-value">
                            <p className="stat-value-p">
                              <Button
                                id="subtract-stamina"
                                className="stat-value-button stat-value-subtract"
                                color="danger"
                                onClick={this.handleAddOrSubtractStat}
                                disabled={this.state.stats[0].isSubtractButtonDisabled}
                              >
                                -
                              </Button>
                              {this.state.stats[0].value}
                              <Button
                                id="add-stamina"
                                className="stat-value-button stat-value-add"
                                color="success"
                                onClick={this.handleAddOrSubtractStat}
                                disabled={this.state.stats[0].isAddButtonDisabled}
                              >
                                +
                              </Button>
                            </p>
                          </td>
                        </tr>
                        <tr className="stats-table-row">
                          <td className="stat-label">Strength</td>
                          <td className="stat-value">
                            <p className="stat-value-p">
                              <Button
                                id="subtract-strength"
                                className="stat-value-button stat-value-subtract"
                                color="danger"
                                onClick={this.handleAddOrSubtractStat}
                                disabled={this.state.stats[1].isSubtractButtonDisabled}
                              >
                                -
                              </Button>
                              {this.state.stats[1].value}
                              <Button
                                id="add-strength"
                                className="stat-value-button stat-value-add"
                                color="success"
                                onClick={this.handleAddOrSubtractStat}
                                disabled={this.state.stats[1].isAddButtonDisabled}
                              >
                                +
                              </Button>
                            </p>
                          </td>
                        </tr>
                        <tr className="stats-table-row">
                          <td className="stat-label">Agility</td>
                          <td className="stat-value">
                            <p className="stat-value-p">
                              <Button
                                id="subtract-agility"
                                className="stat-value-button stat-value-subtract"
                                color="danger"
                                onClick={this.handleAddOrSubtractStat}
                                disabled={this.state.stats[2].isSubtractButtonDisabled}
                              >
                                -
                              </Button>
                              {this.state.stats[2].value}
                              <Button
                                id="add-agility"
                                className="stat-value-button stat-value-add"
                                color="success"
                                onClick={this.handleAddOrSubtractStat}
                                disabled={this.state.stats[2].isAddButtonDisabled}
                              >
                                +
                              </Button>
                            </p>
                          </td>
                        </tr>
                        <tr className="stats-table-row">
                          <td className="stat-label">Wisdom</td>
                          <td className="stat-value">
                            <p className="stat-value-p">
                              <Button
                                id="subtract-wisdom"
                                className="stat-value-button stat-value-subtract"
                                color="danger"
                                onClick={this.handleAddOrSubtractStat}
                                disabled={this.state.stats[3].isSubtractButtonDisabled}
                              >
                                -
                              </Button>
                              {this.state.stats[3].value}
                              <Button
                                id="add-wisdom"
                                className="stat-value-button stat-value-add"
                                color="success"
                                onClick={this.handleAddOrSubtractStat}
                                disabled={this.state.stats[3].isAddButtonDisabled}
                              >
                                +
                              </Button>
                            </p>
                          </td>
                        </tr>
                        <tr className="stats-table-row">
                          <td className="stat-label">Charisma</td>
                          <td className="stat-value">
                            <p className="stat-value-p">
                              <Button
                                id="subtract-charisma"
                                className="stat-value-button stat-value-subtract"
                                color="danger"
                                onClick={this.handleAddOrSubtractStat}
                                disabled={this.state.stats[4].isSubtractButtonDisabled}
                              >
                                -
                              </Button>
                              {this.state.stats[4].value}
                              <Button
                                id="add-charisma"
                                className="stat-value-button stat-value-add"
                                color="success"
                                onClick={this.handleAddOrSubtractStat}
                                disabled={this.state.stats[4].isAddButtonDisabled}
                              >
                                +
                              </Button>
                            </p>
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </Card>
                </div>
              </FormGroup>

              <Button
                color="primary"
                id="create"
                className="create-button"
              >
                Create
              </Button>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateCharacter;