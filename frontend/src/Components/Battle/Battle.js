import React from 'react';
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

class Battle extends React.Component {

  renderBattleCardContainer = () => {
    const mockNPCData = {
      title: 'Goblin',
      level: 1,
      text: 'Here is some text about the Goblin',
      avatar: Goblin,
      currentHealth: 25,
      maxHealth: 25,
      attack: 5,
      defense: 4,
      magicAttack: 4,
      magicDefense: 3
    };

    const mockCharacterData = {
      name: 'Annabelle',
      avatar: PrincessAvatar,
      level: 1,
      text: 'Here is some text about the character',
      currentHealth: 25,
      maxHealth: 25,
      attack: 5,
      defense: 4,
      magicAttack: 4,
      magicDefense: 3
    };

    // TODO: not sure about the const or if it's even necessary to have this outside battle-card-container
    const characterCard = () => {
      return (
        <Card className="battle-character-card">
          <div className="char-overview-wrapper">
            <div className="char-overview-intro-flex-container overview-intro-flex-container">
              <div className="char-overview-intro overview-intro">
                <Progress className="battle-char-health-bar health-bar" value="45" color="danger" />
                <CardImg className="char-overview-cardimg cardimg"
                         src={mockCharacterData.avatar}/>
                <CardBody className="char-overview-cardbody cardbody">
                  <CardTitle className="char-overview-cardtitle cardtitle cardtext-color">{mockCharacterData.name}</CardTitle>
                  <CardSubtitle className="char-overview-cardsubtitle cardsubtitle">{STRINGS.BATTLE_LEVEL_MSG + mockCharacterData.level.toString()}</CardSubtitle>
                  <CardText className="char-overview-cardtext cardtext cardtext-color">{mockCharacterData.text}</CardText>
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
                  <td>{mockCharacterData.attack}</td>
                </tr>
                <tr>
                  <td>{STRINGS.BATTLE_DEFENSE_STAT_MSG}</td>
                  <td>{mockCharacterData.defense}</td>
                </tr>
                <tr>
                  <td>{STRINGS.BATTLE_MAGIC_ATTACK_STAT_MSG}</td>
                  <td>{mockCharacterData.magicAttack}</td>
                </tr>
                <tr>
                  <td>{STRINGS.BATTLE_MAGIC_DEFENSE_STAT_MSG}</td>
                  <td>{mockCharacterData.magicDefense}</td>
                </tr>
                </tbody>
              </Table>
            </div>
            <div className="overview-clear"/>
          </div>
        </Card>
      );
    };

    // TODO: not sure about the const
    const npcCard = () => {
      return (
        <Card className="battle-npc-card">
          <div className="char-overview-wrapper">
            <div className="char-overview-intro-flex-container overview-intro-flex-container">
              <div className="char-overview-intro overview-intro">
                <Progress className="battle-npc-health-bar health-bar" value="75" color="danger" />
                <CardImg className="char-overview-cardimg cardimg"
                         src={mockNPCData.avatar}/>
                <CardBody className="char-overview-cardbody cardbody">
                  <CardTitle className="char-overview-cardtitle cardtitle cardtext-color">{mockNPCData.title}</CardTitle>
                  <CardSubtitle className="char-overview-cardsubtitle cardsubtitle">{STRINGS.BATTLE_LEVEL_MSG + mockNPCData.level.toString()}</CardSubtitle>
                  <CardText className="char-overview-cardtext cardtext cardtext-color">{mockNPCData.text}</CardText>
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
                  <td>{mockNPCData.attack}</td>
                </tr>
                <tr>
                  <td>{STRINGS.BATTLE_DEFENSE_STAT_MSG}</td>
                  <td>{mockNPCData.defense}</td>
                </tr>
                <tr>
                  <td>{STRINGS.BATTLE_MAGIC_ATTACK_STAT_MSG}</td>
                  <td>{mockNPCData.magicAttack}</td>
                </tr>
                <tr>
                  <td>{STRINGS.BATTLE_MAGIC_DEFENSE_STAT_MSG}</td>
                  <td>{mockNPCData.magicDefense}</td>
                </tr>
                </tbody>
              </Table>
            </div>
            <div className="overview-clear"/>
          </div>
        </Card>
      );
    };

    return (
      <div className="battle-card-container container">
        {characterCard()}
        {npcCard()}
      </div>
    );
  };
  render() {
    return (
      <div className="battle-page page-container">
        <CustomNavbar/>
         {/*TODO: Change CSS such that we don't need this full-viewport-with-navbar class - use flexbox page-containers instead*/}
        <div className="battle-centered-content full-viewport-with-navbar centered content container">
          <div className="battle-viewport-width">
            <h1 className="battle-header-text">{STRINGS.BATTLE_HEADER_MSG}</h1>
            <div className="battle-container container">
              {this.renderBattleCardContainer()}
              <h3 className="battle-container-header-text">{STRINGS.BATTLE_CONTAINER_HEADER_MSG}</h3>
              <div className="battle-buttons-container container">
                {/*TODO: maybe make these into dropdowns, each with their own respective selections*/}
                {/*TODO: OR make these into modals that contain all available attacks or items or whatever*/}
                <Button className="attack-button battle-button" color="danger">{STRINGS.BATTLE_BUTTON_ATTACK}</Button>{' '}
                <Button className="magic-button battle-button" color="primary">{STRINGS.BATTLE_BUTTON_MAGIC}</Button>{' '}
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

export default Battle;