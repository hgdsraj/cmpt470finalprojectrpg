import React from 'react';
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Table,
  Button
} from 'reactstrap';
import './Home.scss';
import CustomNavbar from "../CustomNavbar/CustomNavbar";
import {
  MSG_STRING_CONSTANTS
} from '../../Constants/Constants';
import PrincessAvatar from '../../Assets/princess_avatar.png';
import Goblin from '../../Assets/goblin.png';
import Zombie from '../../Assets/zombie.png';
import Imp from '../../Assets/imp.png';
import GrassMap from '../../Assets/grass_map.png';
import BluePotion from '../../Assets/blue_potion.png';

class Home extends React.Component {
  // TODO: fetch character data and map to mini character display component
  renderMiniCharacterOverview = () => {
    let characterName = 'character_name_here';
    let characterAvatar = PrincessAvatar;
    return (
      <div className="mini-char-overview showcase-container container">
        <h2>{MSG_STRING_CONSTANTS.HOME_MINI_CHAR_OVERVIEW_HEADER_MSG + `${characterName}!`}</h2>
        <div className="mini-char-overview-content">
          <Card className="mini-char-overview-card">
            <div className="mini-char-overview-wrapper">
              <div className="mini-char-overview-intro overview-intro">
                <CardImg className="mini-char-overview-cardimg cardimg" src={characterAvatar}/>
                <CardBody className="mini-char-overview-cardbody cardbody">
                  <CardTitle className="mini-char-overview-cardtitle cardtitle cardtext-color">{characterName}</CardTitle>
                  <CardSubtitle className="mini-char-overview-cardsubtitle cardsubtitle">{MSG_STRING_CONSTANTS.LEVEL_MSG + "1"}</CardSubtitle>
                  <CardText className="mini-char-overview-cardtext cardtext cardtext-color">Here is some text about the character</CardText>
                </CardBody>
              </div>
              <div className="mini-char-overview-stats overview-stats">
                <Table>
                  <thead>
                  <tr>
                    <th>{MSG_STRING_CONSTANTS.HOME_MINI_CHAR_OVERVIEW_STAT_MSG}</th>
                    <th>{MSG_STRING_CONSTANTS.HOME_MINI_CHAR_OVERVIEW_VALUE_MSG}</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td>{MSG_STRING_CONSTANTS.HOME_MINI_CHAR_OVERVIEW_HEALTH_STAT_MSG}</td>
                    <td>25/25</td>
                  </tr>
                  <tr>
                    <td>{MSG_STRING_CONSTANTS.HOME_MINI_CHAR_OVERVIEW_ATTACK_STAT_MSG}</td>
                    <td>5</td>
                  </tr>
                  <tr>
                    <td>{MSG_STRING_CONSTANTS.HOME_MINI_CHAR_OVERVIEW_DEFENSE_STAT_MSG}</td>
                    <td>4</td>
                  </tr>
                  </tbody>
                </Table>
              </div>
              <div className="overview-clear" />
            </div>
          </Card>
        </div>
      </div>
    );
  }

  renderBattleShowcase = () => {
    // TODO: fetch NPCs to battle (near level) and map them to cards

    return (
      <div className="battle-showcase showcase-container container">
        <h3>{MSG_STRING_CONSTANTS.HOME_BATTLE_SHOWCASE_TITLE_MSG}</h3>
        <div className="battle-content">
          <h4>{MSG_STRING_CONSTANTS.HOME_BATTLE_SHOWCASE_SUBTITLE_MSG}</h4>
          <div className="battle-npcs card-container">
            <Card className="battle-npc-card">
              <CardImg className="battle-npc-cardimg cardimg" src={Goblin}/>
              <CardBody className="battle-npc-cardbody cardbody">
                <div className="battle-npc-cardtitle-wrapper cardtitle-wrapper">
                  <CardTitle className="battle-npc-cardtitle cardtitle cardtext-color">Goblin</CardTitle>
                  <CardSubtitle className="battle-npc-cardsubtitle cardsubtitle">{MSG_STRING_CONSTANTS.LEVEL_MSG + "1"}</CardSubtitle>
                </div>
                <CardText className="battle-npc-cardtext cardtext cardtext-color">Some text about the goblin</CardText>
                <Button color="primary" className="battle-npc-button cardbutton">{MSG_STRING_CONSTANTS.HOME_BATTLE_SHOWCASE_CARD_BUTTON_MSG}</Button>
              </CardBody>
            </Card>
            <Card className="battle-npc-card">
              <CardImg className="battle-npc-cardimg cardimg" src={Zombie}/>
              <CardBody className="battle-npc-cardbody cardbody">
                <div className="battle-npc-cardtitle-wrapper cardtitle-wrapper">
                  <CardTitle className="battle-npc-cardtitle cardtitle cardtext-color">Zombie</CardTitle>
                  <CardSubtitle className="battle-npc-cardsubtitle cardsubtitle">{MSG_STRING_CONSTANTS.LEVEL_MSG + "2"}</CardSubtitle>
                </div>
                <CardText className="battle-npc-cardtext cardtext cardtext-color">Some text about the zombie</CardText>
                <Button color="primary" className="battle-npc-button cardbutton">{MSG_STRING_CONSTANTS.HOME_BATTLE_SHOWCASE_CARD_BUTTON_MSG}</Button>
              </CardBody>
            </Card>
            <Card className="battle-npc-card">
              <CardImg className="battle-npc-cardimg cardimg" src={Imp}/>
              <CardBody className="battle-npc-cardbody cardbody">
                <div className="battle-npc-cardtitle-wrapper cardtitle-wrapper">
                  <CardTitle className="battle-npc-cardtitle cardtitle cardtext-color">Imp</CardTitle>
                  <CardSubtitle className="battle-npc-cardsubtitle cardsubtitle">{MSG_STRING_CONSTANTS.LEVEL_MSG + "3"}</CardSubtitle>
                </div>
                <CardText className="battle-npc-text cardtext cardtext-color">Some text about the imp</CardText>
                <Button color="primary" className="battle-npc-button cardbutton">{MSG_STRING_CONSTANTS.HOME_BATTLE_SHOWCASE_CARD_BUTTON_MSG}</Button>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  renderExploreShowcase = () => {
    // TODO: Fetch explore maps and map them to map cards
    // TODO: Fetch explore shop items and map them to shop item cards

    return (
      <div className="explore-showcase showcase-container container">
        <h3>{MSG_STRING_CONSTANTS.HOME_EXPLORE_SHOWCASE_TITLE_MSG}</h3>
        <div className="explore-content">
          <h4>{MSG_STRING_CONSTANTS.HOME_EXPLORE_SHOWCASE_MAP_SUBTITLE_MSG}</h4>
          <div className="explore-maps card-container">
            <Card className="explore-map-card">
              <CardImg className="explore-map-cardimg cardimg" src={GrassMap}/>
              <CardBody className="explore-map-cardbody cardbody">
                <CardTitle className="explore-map-title cardtitle cardtext-color">Map</CardTitle>
                <CardText className="explore-map-text cardtext cardtext-color">Some text about this map</CardText>
                <Button color="primary" className="explore-map-button cardbutton">{MSG_STRING_CONSTANTS.HOME_EXPLORE_SHOWCASE_MAP_CARD_BUTTON_MSG}</Button>
              </CardBody>
            </Card>
            <Card className="explore-map-card">
              <CardImg className="explore-map-cardimg cardimg" src={GrassMap}/>
              <CardBody className="explore-map-cardbody cardbody">
                <CardTitle className="explore-map-title cardtitle cardtext-color">Map</CardTitle>
                <CardText className="explore-map-text cardtext cardtext-color">Some text about this map</CardText>
                <Button color="primary" className="explore-map-button cardbutton">{MSG_STRING_CONSTANTS.HOME_EXPLORE_SHOWCASE_MAP_CARD_BUTTON_MSG}</Button>
              </CardBody>
            </Card>
            <Card className="explore-map-card">
              <CardImg className="explore-map-cardimg cardimg" src={GrassMap}/>
              <CardBody className="explore-map-cardbody cardbody">
                <CardTitle className="explore-map-title cardtitle cardtext-color">Map</CardTitle>
                <CardText className="explore-map-text cardtext cardtext-color">Some text about this map</CardText>
                <Button color="primary" className="explore-map-button cardbutton">{MSG_STRING_CONSTANTS.HOME_EXPLORE_SHOWCASE_MAP_CARD_BUTTON_MSG}</Button>
              </CardBody>
            </Card>
          </div>
          <h4>{MSG_STRING_CONSTANTS.HOME_EXPLORE_SHOWCASE_SHOP_SUBTITLE_MSG}</h4>
          <div className="explore-shop card-container">
            <Card className="explore-shop-card">
              <CardImg className="explore-shop-cardimg cardimg" src={BluePotion}/>
              <CardBody className="explore-shop-cardbody cardbody">
                <div className="explore-shop-cardtitle-wrapper cardtitle-wrapper">
                  <CardTitle className="explore-shop-cardtitle cardtitle cardtext-color">Potion</CardTitle>
                  <CardSubtitle className="explore-shop-cardsubtitle cardsubtitle">Costs 5 gold</CardSubtitle>
                </div>
                <CardText className="explore-shop-text cardtext cardtext-color">Some text about this item</CardText>
                <Button color="primary" className="explore-shop-button cardbutton">{MSG_STRING_CONSTANTS.HOME_EXPLORE_SHOWCASE_SHOP_CARD_BUTTON_MSG}</Button>
              </CardBody>
            </Card>
            <Card className="explore-shop-card">
              <CardImg className="explore-shop-cardimg cardimg" src={BluePotion}/>
              <CardBody className="explore-shop-cardbody cardbody">
                <div className="explore-shop-cardtitle-wrapper cardtitle-wrapper">
                  <CardTitle className="explore-shop-cardtitle cardtitle cardtext-color">Potion</CardTitle>
                  <CardSubtitle className="explore-shop-cardsubtitle cardsubtitle">Costs 5 gold</CardSubtitle>
                </div>
                <CardText className="explore-shop-text cardtext cardtext-color">Some text about this item</CardText>
                <Button color="primary" className="explore-shop-button cardbutton">{MSG_STRING_CONSTANTS.HOME_EXPLORE_SHOWCASE_SHOP_CARD_BUTTON_MSG}</Button>
              </CardBody>
            </Card>
            <Card className="explore-shop-card">
              <CardImg className="explore-shop-cardimg cardimg" src={BluePotion}/>
              <CardBody className="explore-shop-cardbody cardbody">
                <div className="explore-shop-cardtitle-wrapper cardtitle-wrapper">
                  <CardTitle className="explore-shop-cardtitle cardtitle cardtext-color">Potion</CardTitle>
                  <CardSubtitle className="explore-shop-cardsubtitle cardsubtitle">Costs 5 gold</CardSubtitle>
                </div>
                <CardText className="explore-shop-text cardtext cardtext-color">Some text about this item</CardText>
                <Button color="primary" className="explore-shop-button cardbutton">{MSG_STRING_CONSTANTS.HOME_EXPLORE_SHOWCASE_SHOP_CARD_BUTTON_MSG}</Button>
              </CardBody>
            </Card>
            <Card className="explore-shop-card">
              <CardImg className="explore-shop-cardimg cardimg" src={BluePotion}/>
              <CardBody className="explore-shop-cardbody cardbody">
                <div className="explore-shop-cardtitle-wrapper cardtitle-wrapper">
                  <CardTitle className="explore-shop-cardtitle cardtitle cardtext-color">Potion</CardTitle>
                  <CardSubtitle className="explore-shop-cardsubtitle cardsubtitle">Costs 5 gold</CardSubtitle>
                </div>
                <CardText className="explore-shop-text cardtext cardtext-color">Some text about this item</CardText>
                <Button color="primary" className="explore-shop-button cardbutton">{MSG_STRING_CONSTANTS.HOME_EXPLORE_SHOWCASE_SHOP_CARD_BUTTON_MSG}</Button>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  render () {
    return (
      <div className="home-page page-container">
        <CustomNavbar />
        <div className="home-page-content content container">
          {this.renderMiniCharacterOverview()}
          {this.renderBattleShowcase()}
          {this.renderExploreShowcase()}
        </div>
      </div>
    )
  }
}

export default Home;