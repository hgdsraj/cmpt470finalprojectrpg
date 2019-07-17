import React from 'react';
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Button
} from 'reactstrap';
import './Home.scss';
import CustomNavbar from "../CustomNavbar/CustomNavbar";
import Goblin from "../../Assets/goblin.png";
import Zombie from "../../Assets/zombie.png";
import Imp from "../../Assets/imp.png";

class Home extends React.Component {
  render () {
    return (
      <div className="home-page page-container">
        <CustomNavbar />
        <div className="home-page-content container">
          <div className="content home-page-centered-content container">
            <br/>
            <h2>Hello, *Character Name*!</h2>
            <div className="mini-char-overview">
              <h5>Here there will be a mini character overview</h5>
            </div>
            <br/>
            <div className="battle-showcase container">
              <h3>Battle</h3>
              <div className="battle-content">
                <h4>Battle the following NPCs to level up your character in combat</h4>
                <div className="battle-npcs">
                  <Card className="battle-npc-card">
                    <CardImg className="battle-npc-cardimg" src={Goblin}/>
                    <CardBody className="battle-npc-cardbody">
                      <CardTitle className="battle-npc-title">NPC 1</CardTitle>
                      <CardText className="battle-npc-text">Some text about this NPC</CardText>
                      <Button color="primary" className="battle-npc-button">Fight</Button>
                    </CardBody>
                  </Card>
                  <Card className="battle-npc-card">
                    <CardImg className="battle-npc-cardimg" src={Zombie}/>
                    <CardBody className="battle-npc-cardbody">
                      <CardTitle className="battle-npc-title">NPC 2</CardTitle>
                      <CardText className="battle-npc-text">Some text about this NPC</CardText>
                      <Button color="primary" className="battle-npc-button">Fight</Button>
                    </CardBody>
                  </Card>
                  <Card className="battle-npc-card">
                    <CardImg className="battle-npc-cardimg" src={Imp}/>
                    <CardBody className="battle-npc-cardbody">
                      <CardTitle className="battle-npc-title">NPC 3</CardTitle>
                      <CardText className="battle-npc-text">Some text about this NPC</CardText>
                      <Button color="primary" className="battle-npc-button">Fight</Button>
                    </CardBody>
                  </Card>
                </div>
              </div>
            </div>
            <br/>
            <div className="explore-showcase container">
              <h3>Explore</h3>
              <div className="explore-content container">
                <h4>Explore the following maps to find new items and complete quests</h4>
                <h4>Visit the shop to purchase items that you may find useful</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Home;