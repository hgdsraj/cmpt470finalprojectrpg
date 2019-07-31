import React from 'react';
import {shallow} from 'enzyme';
import Battle from '../Components/Battle/Battle';
import CustomNavbar from "../Components/CustomNavbar/CustomNavbar";

describe('Battle component', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<Battle/>);
    expect(wrapper.find('div.battle-page').exists()).toBe(true);
  });

  it('renders a CustomNavbar', () => {
    const wrapper = shallow(<Battle/>);
    expect(wrapper.find(CustomNavbar).exists()).toBe(true);
  });

  it('renders the battle card container', () => {
    const wrapper = shallow(<Battle/>);
    expect(wrapper.find('div.battle-card-container').exists()).toBe(true);
  });

  it('renders battle buttons container', () => {
    const wrapper = shallow(<Battle/>);
    expect(wrapper.find('div.battle-buttons-container').exists()).toBe(true);
  });

  it('renders battle log container', () => {
    const wrapper = shallow(<Battle/>);
    expect(wrapper.find('div.battle-log-container').exists()).toBe(true);
  });
});