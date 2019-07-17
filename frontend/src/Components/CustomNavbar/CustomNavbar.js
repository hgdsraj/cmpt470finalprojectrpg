import React from 'react';
import './CustomNavbar.scss';
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav, Navbar,
  NavbarBrand,
  NavItem,
  NavLink,
  UncontrolledDropdown
} from 'reactstrap';
import Button from 'reactstrap/es/Button';
import {
  MSG_STRING_CONSTANTS
} from '../../Constants/Constants';

class CustomNavbar extends React.Component {
  render () {
    return (
      <div className="app-navbar-wrapper bg-dark">
        <div className="app-navbar container">
          <Navbar color="dark" expand="md">
            <NavbarBrand className="nav-brand" href="/">{MSG_STRING_CONSTANTS.NAVBAR_NAV_BRAND_MSG}</NavbarBrand>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/">
                  {MSG_STRING_CONSTANTS.NAVBAR_NAV_HOME_MSG}
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/">
                  {MSG_STRING_CONSTANTS.NAVBAR_NAV_BATTLE_MSG}
                </NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  {MSG_STRING_CONSTANTS.NAVBAR_NAV_EXPLORE_MSG}
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    {MSG_STRING_CONSTANTS.NAVBAR_NAV_EXPLORE_DROPDOWN_MAP_MSG}
                  </DropdownItem>
                  <DropdownItem>
                    {MSG_STRING_CONSTANTS.NAVBAR_NAV_EXPLORE_DROPDOWN_SHOP_MSG}
                  </DropdownItem>
                  <DropdownItem>
                    {MSG_STRING_CONSTANTS.NAVBAR_NAV_EXPLORE_DROPDOWN_QUESTS_MSG}
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  {MSG_STRING_CONSTANTS.NAVBAR_NAV_CHARACTER_MSG}
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    {MSG_STRING_CONSTANTS.NAVBAR_NAV_CHARACTER_DROPDOWN_OVERVIEW_MSG}
                  </DropdownItem>
                  <DropdownItem>
                    {MSG_STRING_CONSTANTS.NAVBAR_NAV_CHARACTER_DROPDOWN_INVENTORY_MSG}
                  </DropdownItem>
                  <DropdownItem>
                    {MSG_STRING_CONSTANTS.NAVBAR_NAV_CHARACTER_DROPDOWN_ASSIGNSTATS_MSG}
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <NavItem>
                <Button className="log-out-button" color="danger">
                  <NavLink href="/">
                    {MSG_STRING_CONSTANTS.NAVBAR_NAV_LOG_OUT_BUTTON_MSG}
                  </NavLink>
                </Button>
              </NavItem>
            </Nav>
          </Navbar>
        </div>
      </div>
    )
  }
}

export default CustomNavbar;