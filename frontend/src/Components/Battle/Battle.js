import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  ListGroup,
  ListGroupItem,
  Progress,
  Card,
  CardImg,
  Table,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText
} from 'reactstrap';
import {
  STRINGS
} from '../../Constants/BattleConstants';
import CustomNavbar from '../CustomNavbar/CustomNavbar';
import './Battle.scss';
import PrincessAvatar from '../../Assets/princess_avatar.png';
import Goblin from "../../Assets/goblin.png";
import CreateCharacter from "../CreateCharacter/CreateCharacter";

function CharacterCard(props) {
  const character = props.character;
  const healthValue = Math.round(character.currentHealth / character.maxHealth * 100);
  return (
    <Card className="battle-character-card">
      <div className="char-overview-wrapper">
        <div className="char-overview-intro-flex-container overview-intro-flex-container">
          <div className="char-overview-intro overview-intro">
            <Progress className="battle-char-health-bar health-bar" value={healthValue} color="danger" />
            <CardImg className="char-overview-cardimg cardimg"
                     src={character.avatar}/>
            <CardBody className="char-overview-cardbody cardbody">
              <CardTitle className="char-overview-cardtitle cardtitle cardtext-color">{character.name}</CardTitle>
              <CardSubtitle className="char-overview-cardsubtitle cardsubtitle">{STRINGS.BATTLE_LEVEL_MSG + character.level.toString()}</CardSubtitle>
              <CardText className="char-overview-cardtext cardtext cardtext-color">{character.text}</CardText>
            </CardBody>
          </div>
        </div>
        <div className="char-overview-stats overview-stats">
          <Table>
            <thead>
            <tr>
              <th>{STRINGS.BATTLE_STAT_MSG}</th>
              <th>{STRINGS.BATTLE_VALUE_MSG}</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>{STRINGS.BATTLE_ATTACK_STAT_MSG}</td>
              <td>{character.attack}</td>
            </tr>
            <tr>
              <td>{STRINGS.BATTLE_DEFENSE_STAT_MSG}</td>
              <td>{character.defense}</td>
            </tr>
            <tr>
              <td>{STRINGS.BATTLE_MAGIC_ATTACK_STAT_MSG}</td>
              <td>{character.magicAttack}</td>
            </tr>
            <tr>
              <td>{STRINGS.BATTLE_MAGIC_DEFENSE_STAT_MSG}</td>
              <td>{character.magicDefense}</td>
            </tr>
            </tbody>
          </Table>
        </div>
        <div className="overview-clear"/>
      </div>
    </Card>
  );
}

CharacterCard.propTypes = {
  character: PropTypes.object,
};

function NpcCard(props) {
  const npc = props.npc;
  const healthValue = Math.round(npc.currentHealth / npc.maxHealth * 100);
  return (
    <Card className="battle-npc-card">
      <div className="char-overview-wrapper">
        <div className="char-overview-intro-flex-container overview-intro-flex-container">
          <div className="char-overview-intro overview-intro">
            <Progress className="battle-npc-health-bar health-bar" value={healthValue} color="danger" />
            <CardImg className="char-overview-cardimg cardimg"
                     src={npc.avatar}/>
            <CardBody className="char-overview-cardbody cardbody">
              <CardTitle className="char-overview-cardtitle cardtitle cardtext-color">{npc.name}</CardTitle>
              <CardSubtitle className="char-overview-cardsubtitle cardsubtitle">{STRINGS.BATTLE_LEVEL_MSG + npc.level.toString()}</CardSubtitle>
              <CardText className="char-overview-cardtext cardtext cardtext-color">{npc.text}</CardText>
            </CardBody>
          </div>
        </div>
        <div className="char-overview-stats overview-stats">
          <Table>
            <thead>
            <tr>
              <th>{STRINGS.BATTLE_STAT_MSG}</th>
              <th>{STRINGS.BATTLE_VALUE_MSG}</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>{STRINGS.BATTLE_ATTACK_STAT_MSG}</td>
              <td>{npc.attack}</td>
            </tr>
            <tr>
              <td>{STRINGS.BATTLE_DEFENSE_STAT_MSG}</td>
              <td>{npc.defense}</td>
            </tr>
            <tr>
              <td>{STRINGS.BATTLE_MAGIC_ATTACK_STAT_MSG}</td>
              <td>{npc.magicAttack}</td>
            </tr>
            <tr>
              <td>{STRINGS.BATTLE_MAGIC_DEFENSE_STAT_MSG}</td>
              <td>{npc.magicDefense}</td>
            </tr>
            </tbody>
          </Table>
        </div>
        <div className="overview-clear"/>
      </div>
    </Card>
  );
}

NpcCard.propTypes = {
  npc: PropTypes.object
};

class Battle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      winner: '',
      // TODO: get character and npc data and assign it (mock data for now)
      CharacterData: {
        name: 'Annabelle',
        avatar: PrincessAvatar,
        level: 2,
        text: 'Here is some text about the character',
        currentHealth: 25,
        maxHealth: 25,
        attack: 8,
        defense: 4,
        magicAttack: 7,
        magicDefense: 7
      },
      NPCData: {
        name: 'Goblin',
        level: 1,
        text: 'Here is some text about the Goblin',
        avatar: Goblin,
        currentHealth: 25,
        maxHealth: 25,
        attack: 5,
        defense: 4,
        magicAttack: 12,
        magicDefense: 3
      }
    }
  };

  // TODO: expand this method (or make more helper methods) to allow for different attack types, accuracy calculations,
  //  critical hits (this is just the basic method for now)
  handleAttack = () => {
    let damage = this.state.CharacterData.attack - this.state.NPCData.defense;
    if (damage < 0) {
      damage = 0;
    }
    this.calculateAndSetNewNPCHealth(damage);
    // TODO: add delay
    this.npcAttack();
  };

  // TODO: will expand same as attack method
  handleMagicAttack = () => {
    let damage = this.state.CharacterData.magicAttack - this.state.NPCData.magicDefense;
    if (damage < 0) {
      damage = 0;
    }
    this.calculateAndSetNewNPCHealth(damage);
    // TODO: add delay
    this.npcAttack();
  };

  npcAttack = () => {
    const attackType = Math.round(Math.random()); // generates 0 or 1
    let damage = 0;
    if (attackType === 0) {   // Normal attack
      damage = this.state.NPCData.attack - this.state.CharacterData.defense;
    } else {                  // Magic attack
      damage = this.state.NPCData.magicAttack - this.state.CharacterData.magicDefense;
    }
    if (damage < 0) {
      damage = 0;
    }
    this.calculateAndSetNewCharacterHealth(damage);
  };

  calculateAndSetNewNPCHealth = (damage) => {
    let newNPCHealth = this.state.NPCData.currentHealth - damage;
    if (newNPCHealth < 0) {
      newNPCHealth = 0;
    }
    this.setState(prevState => ({
      NPCData: {
        ...prevState.NPCData,     // keep all other key-value pairs
        currentHealth: newNPCHealth
      }
    }));
    if (newNPCHealth === 0) {
      this.setState(prevState => ({
        winner: prevState.CharacterData.name
      }));
    }
    // TODO: create battle log component and log stuff like this in there
    console.log('You hit the npc for ', damage, ' damage leaving them with ', newNPCHealth, ' health');
  };

  calculateAndSetNewCharacterHealth = (damage) => {
    let newCharacterHealth = this.state.CharacterData.currentHealth - damage;
    if (newCharacterHealth < 0) {
      newCharacterHealth = 0;
    }
    this.setState(prevState => ({
      CharacterData: {
        ...prevState.CharacterData,     // keep all other key-value pairs
        currentHealth: newCharacterHealth
      }
    }));
    if (newCharacterHealth === 0) {
      this.setState(prevState => ({
        winner: prevState.NPCData.name
      }));
    }
    // TODO: create battle log component and log stuff like this in there
    console.log('The npc hit you for ', damage, ' damage leaving you with ', newCharacterHealth, ' health');
  };

  render() {
    return (
      <div className="battle-page page-container">
        <CustomNavbar handleLogout={this.props.handleUnauthenticate}/>
         {/*TODO: Change CSS such that we don't need this full-viewport-with-navbar class - use flexbox page-containers instead*/}
        <div className="battle-centered-content full-viewport-with-navbar centered content container">
          <div className="battle-viewport-width">
            <h1 className="battle-header-text">{STRINGS.BATTLE_HEADER_MSG}</h1>
            <div className="battle-container container">
              <div className="battle-card-container container">
                <CharacterCard character={this.state.CharacterData}/>
                <NpcCard npc={this.state.NPCData}/>
              </div>
              <h3 className="battle-container-header-text">{STRINGS.BATTLE_CONTAINER_HEADER_MSG}</h3>
              <div className="battle-buttons-container container">
                {/*TODO: maybe make these into dropdowns, each with their own respective selections*/}
                {/*TODO: OR make these into modals that contain all available attacks or items or whatever*/}
                <Button
                    className="attack-button battle-button"
                    color="danger"
                    onClick={this.handleAttack}
                >
                  {STRINGS.BATTLE_BUTTON_ATTACK}
                </Button>
                <Button
                    className="magic-button battle-button"
                    color="primary"
                    onClick={this.handleMagicAttack}
                >
                  {STRINGS.BATTLE_BUTTON_MAGIC}
                </Button>
                <Button className="inventory-button battle-button" color="success">{STRINGS.BATTLE_BUTTON_INVENTORY}</Button>{' '}
                <Button className="escape-button battle-button" color="warning">{STRINGS.BATTLE_BUTTON_ESCAPE}</Button>{' '}
              </div>
              <div className="battle-log-container container">
                <h3 className="battle-log-container-header-text">{STRINGS.BATTLE_LOG_CONTAINER_HEADER_MSG}</h3>
                <ListGroup className="battle-log">
                  {/*TODO: build a battle log, below is temporary just for mockup purposes*/}
                  <ListGroupItem>List ordered such that most recent actions go on top</ListGroupItem>
                  <ListGroupItem>Goblin hits you for 4 damage</ListGroupItem>
                  <ListGroupItem>You hit goblin for 5 damage</ListGroupItem>
                  <ListGroupItem>Goblin attacks you but misses!</ListGroupItem>
                  <ListGroupItem>You cast fireball at the Goblin for 3 damage</ListGroupItem>
                  <ListGroupItem>Goblin hits you for 4 damage</ListGroupItem>
                </ListGroup>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Battle.propTypes = {
  handleUnauthenticate: PropTypes.func
};

export default Battle;