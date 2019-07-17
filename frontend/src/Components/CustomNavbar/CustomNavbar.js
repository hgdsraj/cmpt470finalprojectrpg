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
} from "reactstrap";
import Button from "reactstrap/es/Button";

class CustomNavbar extends React.Component {
  render () {
    return (
      <div className="rpg-navbar">
        <Navbar color="dark" expand="md">
          <NavbarBrand className="nav-brand" href="/">RPG470</NavbarBrand>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink className="nav-link" href="/">
                Home
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="nav-link" href="/">
                Battle
              </NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle className="nav-link" nav caret>
                Explore
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  Map
                </DropdownItem>
                <DropdownItem>
                  Shop
                </DropdownItem>
                <DropdownItem>
                  Quests
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle className="nav-link" nav caret>
                Character
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  Overview
                </DropdownItem>
                <DropdownItem>
                  Inventory
                </DropdownItem>
                <DropdownItem>
                  Assign stats
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <NavItem>
              <Button className="log-out-button" color="danger">
                <NavLink className="nav-link" href="/">
                  Log out
                </NavLink>
              </Button>
            </NavItem>
          </Nav>
        </Navbar>
      </div>
    )
  }
}

export default CustomNavbar;