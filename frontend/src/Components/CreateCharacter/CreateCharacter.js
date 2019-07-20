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

class CreateCharacter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      characterName: '',
      remainingStatPoints: 10,
      avatarSelection: '',
      stamina: {
        value: 12,
        isAddButtonDisabled: false,
        isSubtractButtonDisabled: true
      },
      strength: {
        value: 10,
        isAddButtonDisabled: false,
        isSubtractButtonDisabled: true
      },
      agility: {
        value: 10,
        isAddButtonDisabled: false,
        isSubtractButtonDisabled: true
      },
      wisdom: {
        value: 10,
        isAddButtonDisabled: false,
        isSubtractButtonDisabled: true
      },
      charisma: {
        value: 10,
        isAddButtonDisabled: false,
        isSubtractButtonDisabled: true
      }
    };
  }

  // TODO: figure out if there is a way to reduce the copy paste in the stat operation handlers
  handleAddStamina = () => {
    const stamina = {...this.state.stamina};
    if (stamina.value === NUMERIC_CONSTANTS.CREATE_CHARACTER_MAX_STAT_VALUE_STAM - 1) {
      stamina.isAddButtonDisabled = true;
    }
    stamina.value++;
    stamina.isSubtractButtonDisabled = false;
    this.setState({
      stamina
    });
  }

  handleAddStrength = () => {
    const strength = {...this.state.strength};
    if (strength.value === NUMERIC_CONSTANTS.CREATE_CHARACTER_MAX_STAT_VALUE_STR - 1) {
      strength.isAddButtonDisabled = true;
    }
    strength.value++;
    strength.isSubtractButtonDisabled = false;
    this.setState({
      strength
    });
  }

  handleAddAgility = () => {
    const agility = {...this.state.agility};
    if (agility.value === NUMERIC_CONSTANTS.CREATE_CHARACTER_MAX_STAT_VALUE_AGI - 1) {
      agility.isAddButtonDisabled = true;
    }
    agility.value++;
    agility.isSubtractButtonDisabled = false;
    this.setState({
      agility
    });
  }

  handleAddWisdom = () => {
    const wisdom = {...this.state.wisdom};
    if (wisdom.value === NUMERIC_CONSTANTS.CREATE_CHARACTER_MAX_STAT_VALUE_WIS - 1) {
      wisdom.isAddButtonDisabled = true;
    }
    wisdom.value++;
    wisdom.isSubtractButtonDisabled = false;
    this.setState({
      wisdom
    });
  }

  handleAddCharisma = () => {
    const charisma = {...this.state.charisma};
    if (charisma.value === NUMERIC_CONSTANTS.CREATE_CHARACTER_MAX_STAT_VALUE_CHAR - 1) {
      charisma.isAddButtonDisabled = true;
    }
    charisma.value++;
    charisma.isSubtractButtonDisabled = false;
    this.setState({
      charisma
    });
  }

  handleSubtractStamina = () => {
    const stamina = {...this.state.stamina};
    if (stamina.value === NUMERIC_CONSTANTS.CREATE_CHARACTER_MIN_STAT_VALUE_STAM + 1) {
      stamina.isSubtractButtonDisabled = true;
    }
    stamina.value--;
    stamina.isAddButtonDisabled = false;
    this.setState({
      stamina
    });
  }

  handleSubtractStrength = () => {
    const strength = {...this.state.strength};
    if (strength.value === NUMERIC_CONSTANTS.CREATE_CHARACTER_MIN_STAT_VALUE_STR + 1) {
      strength.isSubtractButtonDisabled = true;
    }
    strength.value--;
    strength.isAddButtonDisabled = false;
    this.setState({
      strength
    });
  }

  handleSubtractAgility = () => {
    const agility = {...this.state.agility};
    if (agility.value === NUMERIC_CONSTANTS.CREATE_CHARACTER_MIN_STAT_VALUE_AGI + 1) {
      agility.isSubtractButtonDisabled = true;
    }
    agility.value--;
    agility.isAddButtonDisabled = false;
    this.setState({
      agility
    });
  }

  handleSubtractWisdom = () => {
    const wisdom = {...this.state.wisdom};
    if (wisdom.value === NUMERIC_CONSTANTS.CREATE_CHARACTER_MIN_STAT_VALUE_WIS + 1) {
      wisdom.isSubtractButtonDisabled = true;
    }
    wisdom.value--;
    wisdom.isAddButtonDisabled = false;
    this.setState({
      wisdom
    });
  }

  handleSubtractCharisma = () => {
    const charisma = {...this.state.charisma};
    if (charisma.value === NUMERIC_CONSTANTS.CREATE_CHARACTER_MIN_STAT_VALUE_CHAR + 1) {
      charisma.isSubtractButtonDisabled = true;
    }
    charisma.value--;
    charisma.isAddButtonDisabled = false;
    this.setState({
      charisma
    });
  }

  handleAddOrSubtractStat = (event) => {
    const splitTargetId = event.target.id.split('-');
    const operation = splitTargetId[0];
    const stat = splitTargetId[1];
    switch (stat) {
      case MSG_STRING_CONSTANTS.CREATE_CHARACTER_STAT_STAM_MSG:
        if (operation === MSG_STRING_CONSTANTS.CREATE_CHARACTER_ADD_STAT_MSG) {
          this.handleAddStamina();
        } else {
          this.handleSubtractStamina();
        }
        break;
      case MSG_STRING_CONSTANTS.CREATE_CHARACTER_STAT_STR_MSG:
        if (operation === MSG_STRING_CONSTANTS.CREATE_CHARACTER_ADD_STAT_MSG) {
          this.handleAddStrength();
        } else {
          this.handleSubtractStrength();
        }
        break;
      case MSG_STRING_CONSTANTS.CREATE_CHARACTER_STAT_AGI_MSG:
        if (operation === MSG_STRING_CONSTANTS.CREATE_CHARACTER_ADD_STAT_MSG) {
          this.handleAddAgility();
        } else {
          this.handleSubtractAgility();
        }
        break;
      case MSG_STRING_CONSTANTS.CREATE_CHARACTER_STAT_WIS_MSG:
        if (operation === MSG_STRING_CONSTANTS.CREATE_CHARACTER_ADD_STAT_MSG) {
          this.handleAddWisdom();
        } else {
          this.handleSubtractWisdom();
        }
        break;
      case MSG_STRING_CONSTANTS.CREATE_CHARACTER_STAT_CHAR_MSG:
        if (operation === MSG_STRING_CONSTANTS.CREATE_CHARACTER_ADD_STAT_MSG) {
          this.handleAddCharisma();
        } else {
          this.handleSubtractCharisma();
        }
        break;
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
    const response = await fetch(URL_CONSTANTS.POST_API_CHARACTERS_CREATE, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name: this.state.characterName
      })
    });
  }

  handleChangeCharacterName = (event) => {
    const characterName = event.target.value;
    this.setState({
      characterName
    });
  }

  // NOTE: For avatar label names, keep them to one word, no more than 10 characters
  render () {
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
              <FormGroup className="create-character-avatar-form-group" tag="avatar-select">
                <legend className="create-character-avatar-legend">Avatar</legend>
                <div className="create-character-avatar-card-container card-container">
                  <FormGroup className="create-character-avatar-form-group" check>
                    <Card className="create-character-avatar-card">
                      <CardImg src={PrincessAvatar} />
                    </Card>
                    <div className="create-character-avatar-label-wrapper">
                      <Input id="princess" type="radio" name="avatar-select" onChange={this.handleChangeAvatarSelection}/>
                      <Label className="create-character-avatar-form-label form-label" check>
                        {' '}
                        Princess
                      </Label>
                    </div>
                  </FormGroup>
                  <FormGroup className="create-character-avatar-form-group" check>
                    <Card className="create-character-avatar-card">
                      <CardImg src={PrincessAvatar} />
                    </Card>
                    <div className="create-character-avatar-label-wrapper">
                      <Input id="vampire" type="radio" name="avatar-select" onChange={this.handleChangeAvatarSelection}/>
                      <Label className="create-character-avatar-form-label form-label" check>
                        {' '}
                        Vampire
                      </Label>
                    </div>
                  </FormGroup>
                  <FormGroup className="create-character-avatar-form-group" check>
                    <Card className="create-character-avatar-card">
                      <CardImg src={PrincessAvatar} />
                    </Card>
                    <div className="create-character-avatar-label-wrapper">
                      <Input id="knight" type="radio" name="avatar-select" onChange={this.handleChangeAvatarSelection}/>
                      <Label className="create-character-avatar-form-label form-label" check>
                        {' '}
                        Knight
                      </Label>
                    </div>
                  </FormGroup>
                  <FormGroup className="create-character-avatar-form-group" check>
                    <Card className="create-character-avatar-card">
                      <CardImg src={PrincessAvatar} />
                    </Card>
                    <div className="create-character-avatar-label-wrapper">
                      <Input id="warrior" type="radio" name="avatar-select" onChange={this.handleChangeAvatarSelection}/>
                      <Label className="create-character-avatar-form-label form-label" check>
                        {' '}
                        Warrior
                      </Label>
                    </div>
                  </FormGroup>
                  <FormGroup className="create-character-avatar-form-group" check>
                    <Card className="create-character-avatar-card">
                      <CardImg src={PrincessAvatar} />
                    </Card>
                    <div className="create-character-avatar-label-wrapper">
                      <Input id="cleric" type="radio" name="avatar-select" onChange={this.handleChangeAvatarSelection}/>
                      <Label className="create-character-avatar-form-label form-label" check>
                        {' '}
                        Cleric
                      </Label>
                    </div>
                  </FormGroup>
                  <FormGroup className="create-character-avatar-form-group" check>
                    <Card className="create-character-avatar-card">
                      <CardImg src={PrincessAvatar} />
                    </Card>
                    <div className="create-character-avatar-label-wrapper">
                      <Input id="hunter" type="radio" name="avatar-select" onChange={this.handleChangeAvatarSelection}/>
                      <Label className="create-character-avatar-form-label form-label" check>
                        {' '}
                        Hunter
                      </Label>
                    </div>
                  </FormGroup>
                </div>
              </FormGroup>

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
                                disabled={this.state.stamina.isSubtractButtonDisabled}
                              >
                                -
                              </Button>
                              {this.state.stamina.value}
                              <Button
                                id="add-stamina"
                                className="stat-value-button stat-value-add"
                                color="success"
                                onClick={this.handleAddOrSubtractStat}
                                disabled={this.state.stamina.isAddButtonDisabled}
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
                                disabled={this.state.strength.isSubtractButtonDisabled}
                              >
                                -
                              </Button>
                              {this.state.strength.value}
                              <Button
                                id="add-strength"
                                className="stat-value-button stat-value-add"
                                color="success"
                                onClick={this.handleAddOrSubtractStat}
                                disabled={this.state.strength.isAddButtonDisabled}
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
                                disabled={this.state.agility.isSubtractButtonDisabled}
                              >
                                -
                              </Button>
                              {this.state.agility.value}
                              <Button
                                id="add-agility"
                                className="stat-value-button stat-value-add"
                                color="success"
                                onClick={this.handleAddOrSubtractStat}
                                disabled={this.state.agility.isAddButtonDisabled}
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
                                disabled={this.state.wisdom.isSubtractButtonDisabled}
                              >
                                -
                              </Button>
                              {this.state.wisdom.value}
                              <Button
                                id="add-wisdom"
                                className="stat-value-button stat-value-add"
                                color="success"
                                onClick={this.handleAddOrSubtractStat}
                                disabled={this.state.wisdom.isAddButtonDisabled}
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
                                disabled={this.state.charisma.isSubtractButtonDisabled}
                              >
                                -
                              </Button>
                              {this.state.charisma.value}
                              <Button
                                id="add-charisma"
                                className="stat-value-button stat-value-add"
                                color="success"
                                onClick={this.handleAddOrSubtractStat}
                                disabled={this.state.charisma.isAddButtonDisabled}
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