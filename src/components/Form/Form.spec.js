import {shallow} from 'enzyme';

import React from 'react';
import FormButton from './FormButton';

describe('Renders FormButton', () => {
  let wrapper;
  let mockHandleClick;

  beforeEach(() => {
    mockHandleClick = jest.fn(() => null);
    wrapper = shallow(<FormButton text={'lorem ipsum'} handleClick={mockHandleClick} color='red' solid/>);
  });

  it('renders text', () => {
    expect(wrapper.find('button').text()).toContain('lorem ipsum');
  });

  it('calls click function', () => {
    expect(wrapper.find('button').simulate('click'));
    expect(mockHandleClick.mock.calls.length).toBe(1);
  });

  it('has solid red button class', () => {
    expect(wrapper.find('button').hasClass('red-btn-solid')).toEqual(true);
  });
});

// describe();
