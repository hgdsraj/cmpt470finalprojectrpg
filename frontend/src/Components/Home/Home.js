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
import Goblin from "../../Assets/goblin.png";
import Zombie from "../../Assets/zombie.png";
import Imp from "../../Assets/imp.png";
import GrassMap from '../../Assets/grass_map.png';
import BluePotion from '../../Assets/blue_potion.png';

class Home extends React.Component {
  render () {
    return (
      <div className="home-page page-container">
        <CustomNavbar />
        <div className="home-page-content container">
          <div className="content home-page-centered-content container">
            <div className="mini-char-overview showcase-container container">
              <h2>Hello, *Character Name*!</h2>
              <h5>Here there will be a mini character overview</h5>
            </div>
            <div className="battle-showcase showcase-container container">
              <h3>Battle</h3>
              <div className="battle-content">
                <h4>Battle the following NPCs to level up your character in combat</h4>
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
            <div className="explore-showcase showcase-container container">
              <h3>Explore</h3>
              <div className="explore-content">
                <h4>Explore the following maps to find new items and complete quests</h4>
                <div className="explore-maps card-container">
                  <Card className="explore-map-card card">
                    <CardImg className="explore-map-cardimg cardimg" src={GrassMap}/>
                    <CardBody className="explore-map-cardbody cardbody">
                      <CardTitle className="explore-map-title cardtitle cardtext-color">Map</CardTitle>
                      <CardText className="explore-map-text cardtext cardtext-color">Some text about this map</CardText>
                      <Button color="primary" className="explore-map-button cardbutton">Explore</Button>
                    </CardBody>
                  </Card>
                </div>
                <h4>Visit the shop to purchase items that you may find useful</h4>
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Home;