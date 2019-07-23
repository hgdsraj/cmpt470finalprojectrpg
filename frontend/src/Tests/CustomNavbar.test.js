import React from 'react';
import {shallow} from 'enzyme';
import {NavbarBrand} from 'reactstrap';
import CustomNavbar from '../Components/CustomNavbar/CustomNavbar';

describe('CustomNavbar component', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<CustomNavbar/>);
    expect(wrapper.find('div.app-navbar-wrapper').exists()).toBe(true);
    expect(wrapper.find('div.app-navbar').exists()).toBe(true);
  });

  it('renders a NavbarBrand', () => {
    const wrapper = shallow(<CustomNavbar/>);
    expect(wrapper.find(NavbarBrand).exists()).toBe(true);
  });
});