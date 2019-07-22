import React from 'react';
import { shallow } from 'enzyme';
import {
  Form
} from 'reactstrap';
import CreateCharacter from '../Components/CreateCharacter/CreateCharacter';
import CustomNavbar from "../Components/CustomNavbar/CustomNavbar";

describe('CreateCharacter component', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<CreateCharacter />);
    expect(wrapper.find('div.create-character-page').exists()).toBe(true);
  });

  it('renders a CustomNavbar', () => {
    const wrapper = shallow(<CreateCharacter />);
    expect(wrapper.find(CustomNavbar).exists()).toBe(true);
  });

  it('renders a create character form', () => {
    const wrapper = shallow(<CreateCharacter />);
    expect(wrapper.find(Form).exists()).toBe(true);
  });
});