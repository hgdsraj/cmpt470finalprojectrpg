import React from 'react';
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Button
} from 'reactstrap';
import './Home.scss';
import CustomNavbar from "../CustomNavbar/CustomNavbar";
import {
  MSG_STRING_CONSTANTS
} from '../../Constants/Constants';
import Goblin from '../../Assets/goblin.png';
import Zombie from '../../Assets/zombie.png';
import Imp from '../../Assets/imp.png';
import GrassMap from '../../Assets/grass_map.png';
import BluePotion from '../../Assets/blue_potion.png';

class Home extends React.Component {
  renderMiniCharacterOverview = () => {
    let characterName = 'character_name_here';
    return (
      <div className="mini-char-overview showcase-container container">
        <h2>{MSG_STRING_CONSTANTS.HOME_MINI_CHAR_OVERVIEW_HEADER_MSG + `${characterName}!`}</h2>
        <h5>Here there will be a mini character overview</h5> {/* TODO: Create the mini character overview */}
      </div>
    );
  }

  renderBattleShowcase = () => {
    return (
      <div className="battle-showcase showcase-container container">
        <h3>{MSG_STRING_CONSTANTS.HOME_BATTLE_SHOWCASE_TITLE_MSG}</h3>
        <div className="battle-content">
          <h4>{MSG_STRING_CONSTANTS.HOME_BATTLE_SHOWCASE_SUBTITLE_MSG}</h4>
          <div className="battle-npcs card-container">
            <Card className="battle-npc-card card">
              <CardImg className="battle-npc-cardimg cardimg" src={Goblin}/>
              <CardBody className="battle-npc-cardbody cardbody">
                <div className="battle-npc-cardtitle-wrapper cardtitle-wrapper">
                  <CardTitle className="battle-npc-cardtitle cardtitle cardtext-color">Goblin</CardTitle>
                  <CardSubtitle className="battle-npc-cardsubtitle cardsubtitle">Level 1</CardSubtitle>
                </div>
                <CardText className="battle-npc-cardtext cardtext cardtext-color">Some text about the goblin</CardText>
                <Button color="primary" className="battle-npc-button cardbutton">Fight</Button>
              </CardBody>
            </Card>
            <Card className="battle-npc-card card">
              <CardImg className="battle-npc-cardimg cardimg" src={Zombie}/>
              <CardBody className="battle-npc-cardbody cardbody">
                <div className="battle-npc-cardtitle-wrapper cardtitle-wrapper">
                  <CardTitle className="battle-npc-cardtitle cardtitle cardtext-color">Zombie</CardTitle>
                  <CardSubtitle className="battle-npc-cardsubtitle cardsubtitle">Level 2</CardSubtitle>
                </div>
                <CardText className="battle-npc-cardtext cardtext cardtext-color">Some text about this NPC</CardText>
                <Button color="primary" className="battle-npc-button cardbutton">Fight</Button>
              </CardBody>
            </Card>
            <Card className="battle-npc-card card">
              <CardImg className="battle-npc-cardimg cardimg" src={Imp}/>
              <CardBody className="battle-npc-cardbody cardbody">
                <div className="battle-npc-cardtitle-wrapper cardtitle-wrapper">
                  <CardTitle className="battle-npc-cardtitle cardtitle cardtext-color">Imp</CardTitle>
                  <CardSubtitle className="battle-npc-cardsubtitle cardsubtitle">Level 3</CardSubtitle>
                </div>
                <CardText className="battle-npc-text cardtext cardtext-color">Some text about this NPC</CardText>
                <Button color="primary" className="battle-npc-button cardbutton">Fight</Button>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  renderExploreShowcase = () => {
    return (
      <div className="explore-showcase showcase-container container">
        <h3>{MSG_STRING_CONSTANTS.HOME_EXPLORE_SHOWCASE_TITLE_MSG}</h3>
        <div className="explore-content">
          <h4>{MSG_STRING_CONSTANTS.HOME_EXPLORE_SHOWCASE_MAP_SUBTITLE_MSG}</h4>
          <div className="explore-maps card-container">
            <Card className="explore-map-card card">
              <CardImg className="explore-map-cardimg cardimg" src={GrassMap}/>
              <CardBody className="explore-map-cardbody cardbody">
                <CardTitle className="explore-map-title cardtitle cardtext-color">Map</CardTitle>
                <CardText className="explore-map-text cardtext cardtext-color">Some text about this map</CardText>
                <Button color="primary" className="explore-map-button cardbutton">Explore</Button>
              </CardBody>
            </Card>
            <Card className="explore-map-card card">
              <CardImg className="explore-map-cardimg cardimg" src={GrassMap}/>
              <CardBody className="explore-map-cardbody cardbody">
                <CardTitle className="explore-map-title cardtitle cardtext-color">Map</CardTitle>
                <CardText className="explore-map-text cardtext cardtext-color">Some text about this map</CardText>
                <Button color="primary" className="explore-map-button cardbutton">Explore</Button>
              </CardBody>
            </Card>
            <Card className="explore-map-card card">
              <CardImg className="explore-map-cardimg cardimg" src={GrassMap}/>
              <CardBody className="explore-map-cardbody cardbody">
                <CardTitle className="explore-map-title cardtitle cardtext-color">Map</CardTitle>
                <CardText className="explore-map-text cardtext cardtext-color">Some text about this map</CardText>
                <Button color="primary" className="explore-map-button cardbutton">Explore</Button>
              </CardBody>
            </Card>
          </div>
          <h4>{MSG_STRING_CONSTANTS.HOME_EXPLORE_SHOWCASE_SHOP_SUBTITLE_MSG}</h4>
          <div className="explore-shop card-container">
            <Card className="explore-shop-card card">
              <CardImg className="explore-shop-cardimg cardimg" src={BluePotion}/>
              <CardBody className="explore-shop-cardbody cardbody">
                <div className="explore-shop-cardtitle-wrapper cardtitle-wrapper">
                  <CardTitle className="explore-shop-cardtitle cardtitle cardtext-color">Potion</CardTitle>
                  <CardSubtitle className="explore-shop-cardsubtitle cardsubtitle">Costs 5 gold</CardSubtitle>
                </div>
                <CardText className="explore-shop-text cardtext cardtext-color">Some text about this item</CardText>
                <Button color="primary" className="explore-shop-button cardbutton">Purchase</Button>
              </CardBody>
            </Card>
            <Card className="explore-shop-card card">
              <CardImg className="explore-shop-cardimg cardimg" src={BluePotion}/>
              <CardBody className="explore-shop-cardbody cardbody">
                <div className="explore-shop-cardtitle-wrapper cardtitle-wrapper">
                  <CardTitle className="explore-shop-cardtitle cardtitle cardtext-color">Potion</CardTitle>
                  <CardSubtitle className="explore-shop-cardsubtitle cardsubtitle">Costs 5 gold</CardSubtitle>
                </div>
                <CardText className="explore-shop-text cardtext cardtext-color">Some text about this item</CardText>
                <Button color="primary" className="explore-shop-button cardbutton">Purchase</Button>
              </CardBody>
            </Card>
            <Card className="explore-shop-card card">
              <CardImg className="explore-shop-cardimg cardimg" src={BluePotion}/>
              <CardBody className="explore-shop-cardbody cardbody">
                <div className="explore-shop-cardtitle-wrapper cardtitle-wrapper">
                  <CardTitle className="explore-shop-cardtitle cardtitle cardtext-color">Potion</CardTitle>
                  <CardSubtitle className="explore-shop-cardsubtitle cardsubtitle">Costs 5 gold</CardSubtitle>
                </div>
                <CardText className="explore-shop-text cardtext cardtext-color">Some text about this item</CardText>
                <Button color="primary" className="explore-shop-button cardbutton">Purchase</Button>
              </CardBody>
            </Card>
            <Card className="explore-shop-card card">
              <CardImg className="explore-shop-cardimg cardimg" src={BluePotion}/>
              <CardBody className="explore-shop-cardbody cardbody">
                <div className="explore-shop-cardtitle-wrapper cardtitle-wrapper">
                  <CardTitle className="explore-shop-cardtitle cardtitle cardtext-color">Potion</CardTitle>
                  <CardSubtitle className="explore-shop-cardsubtitle cardsubtitle">Costs 5 gold</CardSubtitle>
                </div>
                <CardText className="explore-shop-text cardtext cardtext-color">Some text about this item</CardText>
                <Button color="primary" className="explore-shop-button cardbutton">Purchase</Button>
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