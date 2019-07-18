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
      avatarSelection: 0
    };
  }

  handleChangeAvatarSelection = () => {

  }

  handleCreateCharacter = () => {
    // TODO: Hit /api/character/create here
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
                <Label for="charactername" className="create-character-form-label form-label">{MSG_STRING_CONSTANTS.USERNAME_LABEL_MSG}</Label>
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
                      <Input type="radio" name="radio1" />
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
                      <Input type="radio" name="radio1" />
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
                      <Input type="radio" name="radio1" />
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
                      <Input type="radio" name="radio1" />
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
                      <Input type="radio" name="radio1" />
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
                      <Input type="radio" name="radio1" />
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
                  Assign stats
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
                      <tr className="stats-table-row">
                        <td className="stat-label">Stamina</td>
                        <td className="stat-value">
                            <p className="stat-value-p">
                              <Button className="stat-value-button stat-value-subtract" color="danger">-</Button>
                              12
                              <Button className="stat-value-button stat-value-add" color="success">+</Button>
                            </p>
                        </td>
                      </tr>
                      <tr>
                        <td className="stat-label">Strength</td>
                        <td>
                          <p className="stat-value-p">
                            <Button className="stat-value-button stat-value-subtract" color="danger">-</Button>
                            10
                            <Button className="stat-value-button stat-value-add" color="success">+</Button>
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td className="stat-label">Agility</td>
                        <td>
                          <p className="stat-value-p">
                            <Button className="stat-value-button stat-value-subtract" color="danger">-</Button>
                            10
                            <Button className="stat-value-button stat-value-add" color="success">+</Button>
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td className="stat-label">Wisdom</td>
                        <td>
                          <p className="stat-value-p">
                            <Button className="stat-value-button stat-value-subtract" color="danger">-</Button>
                            11
                            <Button className="stat-value-button stat-value-add" color="success">+</Button>
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td className="stat-label">Charisma</td>
                        <td>
                          <p className="stat-value-p">
                            <Button className="stat-value-button stat-value-subtract" color="danger">-</Button>
                            11
                            <Button className="stat-value-button stat-value-add" color="success">+</Button>
                          </p>
                        </td>
                      </tr>
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