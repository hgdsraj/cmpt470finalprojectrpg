import React from 'react';
import {shallow} from 'enzyme';
import {Form} from 'reactstrap';
import Login from '../Components/Login/Login';

describe('Login component', () => {

  it('renders without crashing', () => {
    const wrapper = shallow(<Login/>);
    expect(wrapper.find('div.login-page').exists()).toBe(true);
  });

  it('renders a form', () => {
    const wrapper = shallow(<Login/>);
    expect(wrapper.find(Form).exists()).toBe(true);
  });

  it('renders two form groups', () => {
    const wrapper = shallow(<Login/>);
    expect(wrapper.find('.login-form-group').length).toEqual(2);
  });

  it('renders a label for username and password', () => {
    const wrapper = shallow(<Login/>);
    expect(wrapper.find('.login-form-label').length).toEqual(2);
  });

  it('renders a username input', () => {
    const wrapper = shallow(<Login/>);
    expect(wrapper.find('#username').length).toEqual(1);
  });

  it('renders a password input', () => {
    const wrapper = shallow(<Login/>);
    expect(wrapper.find('#password').length).toEqual(1);
  });

  // TODO: test username input checking
  describe('Username input', () => {
    it('responds to a change event by updating Login component state', () => {
      const wrapper = shallow(<Login/>);
      wrapper.find('#username').simulate('change', {target: {name: 'username', value: 'newusername'}});
      expect(wrapper.state('username')).toEqual('newusername');
    });
  });

  // TODO: test password input checking
  describe('Password input', () => {
    it('responds to a change event by updating Login component state', () => {
      const wrapper = shallow(<Login/>);
      wrapper.find('#password').simulate('change', {target: {name: 'password', value: 'newpassword'}});
      expect(wrapper.state('password')).toEqual('newpassword');
    });
  });
});