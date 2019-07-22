import React from 'react';
import { shallow } from 'enzyme';
import Home from '../Components/Home/Home';
import CustomNavbar from '../Components/CustomNavbar/CustomNavbar';

describe('Home component', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<Home />);
    expect(wrapper.find('div.home-page').exists()).toBe(true);
  });

  it('renders a CustomNavbar', () => {
    const wrapper = shallow(<Home />);
    expect(wrapper.find(CustomNavbar).exists()).toBe(true);
  });

  it('renders three showcase containers', () => {
    const wrapper = shallow(<Home />);
    expect(wrapper.find('div.showcase-container').length).toEqual(3);
  });

  it('renders the mini character overview', () => {
    const wrapper = shallow(<Home />);
    expect(wrapper.find('div.mini-char-overview').exists()).toBe(true);
  });

  it('renders the battle showcase', () => {
    const wrapper = shallow(<Home />);
    expect(wrapper.find('div.battle-showcase').exists()).toBe(true);
  });

  it('renders the explore showcase', () => {
    const wrapper = shallow(<Home />);
    expect(wrapper.find('div.explore-showcase').exists()).toBe(true);
  });
});