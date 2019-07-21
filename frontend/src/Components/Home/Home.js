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

  renderMiniCharacterOverview = () => {
    // TODO: fetch character data and map to mini character display component instead of using mock data
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

    return (
      <div className="mini-char-overview showcase-container container">
        <h2>{MSG_STRING_CONSTANTS.HOME_MINI_CHAR_OVERVIEW_HEADER_MSG + `${mockCharacterData.name}!`}</h2>
        <div className="mini-char-overview-content">
          <Card className="mini-char-overview-card">
            <div className="mini-char-overview-wrapper">
              <div className="mini-char-overview-intro-flex-container overview-intro-flex-container">
                <div className="mini-char-overview-intro overview-intro">
                  <CardImg className="mini-char-overview-cardimg cardimg" src={mockCharacterData.avatar}/>
                  <CardBody className="mini-char-overview-cardbody cardbody">
                    <CardTitle className="mini-char-overview-cardtitle cardtitle cardtext-color">{mockCharacterData.name}</CardTitle>
                    <CardSubtitle className="mini-char-overview-cardsubtitle cardsubtitle">{MSG_STRING_CONSTANTS.LEVEL_MSG + mockCharacterData.level.toString()}</CardSubtitle>
                    <CardText className="mini-char-overview-cardtext cardtext cardtext-color">{mockCharacterData.text}</CardText>
                  </CardBody>
                </div>
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
                    <td>{mockCharacterData.currentHealth}/{mockCharacterData.maxHealth}</td>
                  </tr>
                  <tr>
                    <td>{MSG_STRING_CONSTANTS.HOME_MINI_CHAR_OVERVIEW_ATTACK_STAT_MSG}</td>
                    <td>{mockCharacterData.attack}</td>
                  </tr>
                  <tr>
                    <td>{MSG_STRING_CONSTANTS.HOME_MINI_CHAR_OVERVIEW_DEFENSE_STAT_MSG}</td>
                    <td>{mockCharacterData.defense}</td>
                  </tr>
                  <tr>
                    <td>{MSG_STRING_CONSTANTS.HOME_MINI_CHAR_OVERVIEW_MAGIC_ATTACK_STAT_MSG}</td>
                    <td>{mockCharacterData.magicAttack}</td>
                  </tr>
                  <tr>
                    <td>{MSG_STRING_CONSTANTS.HOME_MINI_CHAR_OVERVIEW_MAGIC_DEFENSE_STAT_MSG}</td>
                    <td>{mockCharacterData.magicDefense}</td>
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
    // TODO: fetch NPCs to battle (near level) and map them to cards instead of using mock data
    const mockNPCs = [
      {
        npcTitle: 'Goblin',
        npcLevel: 1,
        npcText: 'Some text about the goblin',
        npcImgSrc: Goblin
      },
      {
        npcTitle: 'Zombie',
        npcLevel: 2,
        npcText: 'Some text about the zombie',
        npcImgSrc: Zombie
      },
      {
        npcTitle: 'Imp',
        npcLevel: 3,
        npcText: 'Some text about the imp',
        npcImgSrc: Imp
      }
    ];

    const npcCards = mockNPCs.map((npcData, index) => {
      return (
        <Card key={index} className="battle-npc-card">
          <CardImg className="battle-npc-cardimg cardimg" src={npcData.npcImgSrc}/>
          <CardBody className="battle-npc-cardbody cardbody">
            <div className="battle-npc-cardtitle-wrapper cardtitle-wrapper">
              <CardTitle className="battle-npc-cardtitle cardtitle cardtext-color">{npcData.npcTitle}</CardTitle>
              <CardSubtitle className="battle-npc-cardsubtitle cardsubtitle">{MSG_STRING_CONSTANTS.LEVEL_MSG + npcData.npcLevel.toString()}</CardSubtitle>
            </div>
            <CardText className="battle-npc-cardtext cardtext cardtext-color">{npcData.npcText}</CardText>
            <Button color="primary" className="battle-npc-button cardbutton">{MSG_STRING_CONSTANTS.HOME_BATTLE_SHOWCASE_CARD_BUTTON_MSG}</Button>
          </CardBody>
        </Card>
      );
    });

    return (
      <div className="battle-showcase showcase-container container">
        <h3>{MSG_STRING_CONSTANTS.HOME_BATTLE_SHOWCASE_TITLE_MSG}</h3>
        <div className="battle-content">
          <h4>{MSG_STRING_CONSTANTS.HOME_BATTLE_SHOWCASE_SUBTITLE_MSG}</h4>
          <div className="battle-npcs card-container">
            {npcCards}
          </div>
        </div>
      </div>
    );
  }

  renderExploreShowcase = () => {
    // TODO: Fetch explore maps and map them to map cards instead of using mock data
    const mockMaps = [
      {
        mapTitle: 'Grasslands',
        mapText: 'Some text about this map',
        mapImgSrc: GrassMap
      },
      {
        mapTitle: 'Grasslands',
        mapText: 'Some text about this map',
        mapImgSrc: GrassMap
      },
      {
        mapTitle: 'Grasslands',
        mapText: 'Some text about this map',
        mapImgSrc: GrassMap
      }
    ];

    const exploreMapCards = mockMaps.map((mapData, index) => {
      return (
        <Card key={index} className="explore-map-card">
          <CardImg className="explore-map-cardimg cardimg" src={mapData.mapImgSrc}/>
          <CardBody className="explore-map-cardbody cardbody">
            <CardTitle className="explore-map-title cardtitle cardtext-color">{mapData.mapTitle}</CardTitle>
            <CardText className="explore-map-text cardtext cardtext-color">{mapData.mapText}</CardText>
            <Button color="primary" className="explore-map-button cardbutton">{MSG_STRING_CONSTANTS.HOME_EXPLORE_SHOWCASE_MAP_CARD_BUTTON_MSG}</Button>
          </CardBody>
        </Card>
      );
    });

    // TODO: Fetch explore shop items and map them to shop item cards instead of using mock data
    const mockShopItems = [
      {
        shopItemTitle: 'Potion',
        shopItemSubtitle: 'Costs 5 gold',
        shopItemText: 'Some text about this item',
        shopItemImgSrc: BluePotion
      },
      {
        shopItemTitle: 'Potion',
        shopItemSubtitle: 'Costs 5 gold',
        shopItemText: 'Some text about this item',
        shopItemImgSrc: BluePotion
      },
      {
        shopItemTitle: 'Potion',
        shopItemSubtitle: 'Costs 5 gold',
        shopItemText: 'Some text about this item',
        shopItemImgSrc: BluePotion
      },
      {
        shopItemTitle: 'Potion',
        shopItemSubtitle: 'Costs 5 gold',
        shopItemText: 'Some text about this item',
        shopItemImgSrc: BluePotion
      }
    ];

    const exploreShopItemCards = mockShopItems.map((shopItemData, index) => {
      return (
        <Card key={index} className="explore-shop-card">
          <CardImg className="explore-shop-cardimg cardimg" src={shopItemData.shopItemImgSrc}/>
          <CardBody className="explore-shop-cardbody cardbody">
            <div className="explore-shop-cardtitle-wrapper cardtitle-wrapper">
              <CardTitle className="explore-shop-cardtitle cardtitle cardtext-color">{shopItemData.shopItemTitle}</CardTitle>
              <CardSubtitle className="explore-shop-cardsubtitle cardsubtitle">{shopItemData.shopItemSubtitle}</CardSubtitle>
            </div>
            <CardText className="explore-shop-text cardtext cardtext-color">{shopItemData.shopItemText}</CardText>
            <Button color="primary" className="explore-shop-button cardbutton">{MSG_STRING_CONSTANTS.HOME_EXPLORE_SHOWCASE_SHOP_CARD_BUTTON_MSG}</Button>
          </CardBody>
        </Card>
      );
    });

    return (
      <div className="explore-showcase showcase-container container">
        <h3>{MSG_STRING_CONSTANTS.HOME_EXPLORE_SHOWCASE_TITLE_MSG}</h3>
        <div className="explore-content">
          <h4>{MSG_STRING_CONSTANTS.HOME_EXPLORE_SHOWCASE_MAP_SUBTITLE_MSG}</h4>
          <div className="explore-maps card-container">
            {exploreMapCards}
          </div>
          <h4>{MSG_STRING_CONSTANTS.HOME_EXPLORE_SHOWCASE_SHOP_SUBTITLE_MSG}</h4>
          <div className="explore-shop card-container">
            {exploreShopItemCards}
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