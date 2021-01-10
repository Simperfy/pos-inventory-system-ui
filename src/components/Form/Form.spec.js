import {shallow} from 'enzyme';

import React from 'react';
import FormButton from './FormButton';

describe('FormButton Test', () => {
  let wrapper;
  let mockHandleClick;

  beforeEach(() => {
    mockHandleClick = jest.fn(() => null);
    wrapper = shallow(<FormButton text={'lorem ipsum'} handleClick={mockHandleClick} color='red' solid/>);
  });

  it('should contain lorem ipsum when rendered', () => {
    expect(wrapper.find('button').text()).toContain('lorem ipsum');
  });

  it('should call click function when clicked', () => {
    expect(wrapper.find('button').simulate('click'));
    expect(mockHandleClick.mock.calls.length).toBe(1);
  });

  it('should have solid red button class when rendered', () => {
    expect(wrapper.find('button').hasClass('red-btn-solid')).toEqual(true);
  });
});

