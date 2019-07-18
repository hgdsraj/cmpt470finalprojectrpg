import React from 'react';
import {
  Button,
  Form,
  FormGroup,
  Input,
  Label
} from 'reactstrap';
import {
  MSG_STRING_CONSTANTS
} from '../../Constants/Constants';

class CreateCharacter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      characterName: '',
      remainingStatPoints: 10
    };
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

  render () {
    return (
      <div className="create-character-page page-container">
        <div className="full-viewport centered content create-character-centered-content container">
          <h1 className="create-character-header-text">Create a Character</h1>
          <Form onSubmit={this.handleCreateCharacter}>
            <FormGroup className="create-character-form-group">
              <Label for="charactername" className="create-character-form-label form-label">{MSG_STRING_CONSTANTS.USERNAME_LABEL_MSG}</Label>
              <Input type="charactername" id="charactername" onChange={this.handleChangeCharacterName}/>
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
    );
  }
}

export default CreateCharacter;