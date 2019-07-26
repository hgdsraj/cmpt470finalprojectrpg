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
} from '../../Constants/BattleConstants';
import {
  GLOBAL_URLS
} from '../../Constants/GlobalConstants';
import CustomNavbar from '../CustomNavbar/CustomNavbar';
import './Battle.scss';
import PrincessAvatar from '../../Assets/princess_avatar.png';

class Battle extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     characterName: '',
  //     remainingStatPoints: 10,
  //     avatarSelection: '',
  //     stats: [
  //       {
  //         name: 'Stamina',
  //         value: 12,
  //         isAddButtonDisabled: false,
  //         isSubtractButtonDisabled: true
  //       },
  //       {
  //         name: 'Strength',
  //         value: 10,
  //         isAddButtonDisabled: false,
  //         isSubtractButtonDisabled: true
  //       },
  //       {
  //         name: 'Agility',
  //         value: 10,
  //         isAddButtonDisabled: false,
  //         isSubtractButtonDisabled: true
  //       },
  //       {
  //         name: 'Wisdom',
  //         value: 11,
  //         isAddButtonDisabled: false,
  //         isSubtractButtonDisabled: true
  //       },
  //       {
  //         name: 'Charisma',
  //         value: 11,
  //         isAddButtonDisabled: false,
  //         isSubtractButtonDisabled: true
  //       }
  //     ]
  //   };
  // }
  //
  render() {
    return (
      <div className="battle-page page-container">
        <CustomNavbar/>
         {/*TODO: Change CSS such that we don't need this full-viewport-with-navbar class - use flexbox page-containers instead*/}
        <div className="battle-centered-content full-viewport-with-navbar centered content container">
          <div className="battle-viewport-width">
            <h1 className="battle-header-text">{STRINGS.CREATE_CHARACTER_HEADER_MSG}</h1>
            {/*<Form onSubmit={this.handleCreateCharacter}>*/}
            {/*  <FormGroup className="battle-form-group">*/}
            {/*    <Label for="charactername" className="battle-form-label form-label">*/}
            {/*      {STRINGS.CREATE_CHARACTER_CHARACTER_NAME_MSG}*/}
            {/*    </Label>*/}
            {/*    <Input type="charactername" id="charactername"*/}
            {/*           onChange={this.handleChangeCharacterName}/>*/}
            {/*  </FormGroup>*/}
            {/*  <AvatarSelect*/}
            {/*    avatars={STRINGS.CREATE_CHARACTER_AVATAR_NAMES}*/}
            {/*    onChange={this.handleChangeAvatarSelection}*/}
            {/*  />*/}
            {/*  <AssignStatsTable*/}
            {/*    stats={this.state.stats}*/}
            {/*    remainingStatPoints={this.state.remainingStatPoints}*/}
            {/*    statIds={STRINGS.CREATE_CHARACTER_STAT_IDS}*/}
            {/*    buttonOnClick={this.handleAddOrSubtractStat}*/}
            {/*  />*/}
            {/*  <Button*/}
            {/*    color="primary"*/}
            {/*    id="create"*/}
            {/*    className="create-button"*/}
            {/*    disabled={this.state.remainingStatPoints > 0 || !this.state.characterName || !this.state.avatarSelection}*/}
            {/*  >*/}
            {/*    {STRINGS.CREATE_CHARACTER_CREATE_BUTTON_MSG}*/}
            {/*  </Button>*/}
            {/*</Form>*/}
          </div>
        </div>
      </div>
    );
  }
}

export default Battle;