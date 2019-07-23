import React from 'react';
import {shallow} from 'enzyme';
import Signup from '../Components/Signup/Signup';

describe('Signup component', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<Signup/>);
    expect(wrapper.find('.signup-page').exists()).toBe(true);
  });

  it('renders three form groups', () => {
    const wrapper = shallow(<Signup/>);
    expect(wrapper.find('.signup-form-group').length).toEqual(3);
  });

  it('renders a label for username, password, and fullname', () => {
    const wrapper = shallow(<Signup/>);
    expect(wrapper.find('.signup-form-label').length).toEqual(3);
  });

  it('renders a username input', () => {
    const wrapper = shallow(<Signup/>);
    expect(wrapper.find('#username').length).toEqual(1);
  });

  it('renders a password input', () => {
    const wrapper = shallow(<Signup/>);
    expect(wrapper.find('#password').length).toEqual(1);
  });

  it('renders a fullname input', () => {
    const wrapper = shallow(<Signup/>);
    expect(wrapper.find('#fullname').length).toEqual(1);
  });

  // TODO: Test username input checking
  describe('Username input', () => {
    it('responds to a change event by updating Signup component state', () => {
      const wrapper = shallow(<Signup/>);
      wrapper.find('#username').simulate('change', {target: {name: 'username', value: 'newusername'}});
      expect(wrapper.state('username')).toEqual('newusername');
    });
  });

  // TODO: Test password input checking
  describe('Password input', () => {
    it('responds to a change event by updating Signup component state', () => {
      const wrapper = shallow(<Signup/>);
      wrapper.find('#password').simulate('change', {target: {name: 'password', value: 'newpassword'}});
      expect(wrapper.state('password')).toEqual('newpassword');
    });
  });

  describe('Fullname input', () => {
    it('responds to a change event by updating Signup component state', () => {
      const wrapper = shallow(<Signup/>);
      wrapper.find('#fullname').simulate('change', {target: {name: 'fullname', value: 'New Fullname'}});
      expect(wrapper.state('fullname')).toEqual('New Fullname');
    });
  });
});