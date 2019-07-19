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
  MSG_STRING_CONSTANTS
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
      stamina: 12,
      strength: 10,
      agility: 10,
      wisdom: 11,
      charisma: 11,
      isSubtractStamButtonDisabled: true,
      isAddStamButtonDisabled: false,
      isSubtractStrButtonDisabled: true,
      isAddStrButtonDisabled: false,
      isSubtractAgiButtonDisabled: true,
      isAddAgiButtonDisabled: false,
      isSubtractWisButtonDisabled: true,
      isAddWisButtonDisabled: false,
      isSubtractCharButtonDisabled: true,
      isAddCharButtonDisabled: false,
    };
  }

  handleAddOrSubtractStat = (event) => {
    // TODO: Refactor to switch case
    const splitTargetId = event.target.id.split('-');
    const operation = splitTargetId[0];
    const stat = splitTargetId[1];
    // TODO: fix this stuff later
    if (operation === MSG_STRING_CONSTANTS.CREATE_CHARACTER_ADD_STAT_MSG) {
      if (stat === MSG_STRING_CONSTANTS.CREATE_CHARACTER_STAT_STAM_MSG) {
        if (this.state.stamina === NUMERIC_CONSTANTS.CREATE_CHARACTER_MAX_STAT_VALUE_STAM) {
          this.setState({
            isAddStamButtonDisabled: true
          });
        } else {
          this.setState({
            stamina: this.state.stamina + 1,
            isAddStamButtonDisabled: false
          });
        }
      } else if (stat === MSG_STRING_CONSTANTS.CREATE_CHARACTER_STAT_STR_MSG) {
        if (this.state.strength === NUMERIC_CONSTANTS.CREATE_CHARACTER_MAX_STAT_VALUE_STR) {
          this.setState({
            isAddStrButtonDisabled: true
          });
        } else {
          this.setState({
            strength: this.state.strength + 1,
            isAddStrButtonDisabled: false
          });
        }
      } else if (stat === MSG_STRING_CONSTANTS.CREATE_CHARACTER_STAT_AGI_MSG) {
        if (this.state.agility === NUMERIC_CONSTANTS.CREATE_CHARACTER_MAX_STAT_VALUE_AGI) {
          this.setState({
            isAddAgiButtonDisabled: true
          });
        } else {
          this.setState({
            agility: this.state.agility + 1,
            isAddAgiButtonDisabled: false
          });
        }
      } else if (stat === MSG_STRING_CONSTANTS.CREATE_CHARACTER_STAT_WIS_MSG) {
        if (this.state.wisdom === NUMERIC_CONSTANTS.CREATE_CHARACTER_MAX_STAT_VALUE_WIS) {
          this.setState({
            isAddWisButtonDisabled: true
          });
        } else {
          this.setState({
            wisdom: this.state.wisdom + 1,
            isAddWisButtonDisabled: false
          });
        }
      } else if (stat === MSG_STRING_CONSTANTS.CREATE_CHARACTER_STAT_CHAR_MSG) {
        if (this.state.charisma === NUMERIC_CONSTANTS.CREATE_CHARACTER_MAX_STAT_VALUE_CHAR) {
          this.setState({
            isAddCharButtonDisabled: true
          });
        } else {
          this.setState({
            charisma: this.state.charisma + 1,
            isAddCharButtonDisabled: false
          });
        }
      }
    } else {
      if (stat === MSG_STRING_CONSTANTS.CREATE_CHARACTER_STAT_STAM_MSG) {
        if (this.state.stamina === NUMERIC_CONSTANTS.CREATE_CHARACTER_MIN_STAT_VALUE_STAM) {
          this.setState({
            isSubtractStamButtonDisabled: true
          });
        } else {
          this.setState({
            stamina: this.state.stamina - 1,
            isSubtractStamButtonDisabled: false
          });
        }
      } else if (stat === MSG_STRING_CONSTANTS.CREATE_CHARACTER_STAT_STR_MSG) {
        if (this.state.strength === NUMERIC_CONSTANTS.CREATE_CHARACTER_MIN_STAT_VALUE_STR) {
          this.setState({
            isSubtractStrButtonDisabled: true
          });
        } else {
          this.setState({
            strength: this.state.strength - 1,
            isSubtractStrButtonDisabled: false
          });
        }
      } else if (stat === MSG_STRING_CONSTANTS.CREATE_CHARACTER_STAT_AGI_MSG) {
        if (this.state.agility === NUMERIC_CONSTANTS.CREATE_CHARACTER_MIN_STAT_VALUE_AGI) {
          this.setState({
            isSubtractAgiButtonDisabled: true
          });
        } else {
          this.setState({
            agility: this.state.agility - 1,
            isSubtractAgiButtonDisabled: false
          });
        }
      } else if (stat === MSG_STRING_CONSTANTS.CREATE_CHARACTER_STAT_WIS_MSG) {
        if (this.state.wisdom === NUMERIC_CONSTANTS.CREATE_CHARACTER_MIN_STAT_VALUE_WIS) {
          this.setState({
            isSubtractWisButtonDisabled: true
          });
        } else {
          this.setState({
            wisdom: this.state.wisdom - 1,
            isSubtractWisButtonDisabled: false
          });
        }
      } else if (stat === MSG_STRING_CONSTANTS.CREATE_CHARACTER_STAT_CHAR_MSG) {
        if (this.state.charisma === NUMERIC_CONSTANTS.CREATE_CHARACTER_MIN_STAT_VALUE_CHAR) {
          this.setState({
            isSubtractCharButtonDisabled: true
          });
        } else {
          this.setState({
            charisma: this.state.charisma - 1,
            isSubtractCharButtonDisabled: false
          });
        }
      }
    }
  }

  handleChangeAvatarSelection = (event) => {
    const avatarSelection = event.target.id;
    this.setState({
      avatarSelection
    });
  }

  handleCreateCharacter = (event) => {
    // TODO: Hit /api/character/create here
    event.preventDefault();
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
                                disabled={this.state.isSubtractStamButtonDisabled}
                              >
                                -
                              </Button>
                              {this.state.stamina}
                              <Button
                                id="add-stamina"
                                className="stat-value-button stat-value-add"
                                color="success"
                                onClick={this.handleAddOrSubtractStat}
                                disabled={this.state.isAddStamButtonDisabled}
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
                                disabled={this.state.isSubtractStrButtonDisabled}
                              >
                                -
                              </Button>
                              {this.state.strength}
                              <Button
                                id="add-strength"
                                className="stat-value-button stat-value-add"
                                color="success"
                                onClick={this.handleAddOrSubtractStat}
                                disabled={this.state.isAddStrButtonDisabled}
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
                                disabled={this.state.isSubtractAgiButtonDisabled}
                              >
                                -
                              </Button>
                              {this.state.agility}
                              <Button
                                id="add-agility"
                                className="stat-value-button stat-value-add"
                                color="success"
                                onClick={this.handleAddOrSubtractStat}
                                disabled={this.state.isAddAgiButtonDisabled}
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
                                disabled={this.state.isSubtractWisButtonDisabled}
                              >
                                -
                              </Button>
                              {this.state.wisdom}
                              <Button
                                id="add-wisdom"
                                className="stat-value-button stat-value-add"
                                color="success"
                                onClick={this.handleAddOrSubtractStat}
                                disabled={this.state.isAddWisButtonDisabled}
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
                                disabled={this.state.isSubtractCharButtonDisabled}
                              >
                                -
                              </Button>
                              {this.state.charisma}
                              <Button
                                id="add-charisma"
                                className="stat-value-button stat-value-add"
                                color="success"
                                onClick={this.handleAddOrSubtractStat}
                                disabled={this.state.isAddCharButtonDisabled}
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