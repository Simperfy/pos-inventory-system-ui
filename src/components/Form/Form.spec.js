import {shallow} from 'enzyme';

import React from 'react';
import FormButton from './FormButton';
import {FormDetailText} from './FormDetailText';

describe('FormButton Test', () => {
  let wrapper;
  let mockHandleClick;

  beforeEach(() => {
    mockHandleClick = jest.fn(() => null);
    wrapper = shallow(<FormButton text={'lorem ipsum'} handleClick={mockHandleClick} color='red' solid/>);
  });

  it('should find "lorem ipsum" when rendered', () => {
    expect(wrapper.find('button').text()).toContain('lorem ipsum');
  });

  it('should call click function when clicked', () => {
    expect(wrapper.find('button').simulate('click'));
    expect(mockHandleClick.mock.calls.length).toBe(1);
  });

  it('should find red-btn-solid class when rendered', () => {
    expect(wrapper.find('button').hasClass('red-btn-solid')).toEqual(true);
  });
});

describe('FormDetailText Test', () => {
  let wrapper;
  const price = 100;
  const discount = 50;
  const quantity = 10;

  beforeEach(() => {
    wrapper = shallow(<FormDetailText price={price} discount={discount} quantity={quantity}/>);
  });

  it('should find price when rendered', () => {
    expect(wrapper.find('p').someWhere((n) => n.text().includes('Price: ₱100'))).toEqual(true);
  });

  it('should find discount when rendered', () => {
    expect(wrapper.find('p').someWhere((n) => n.text().includes('Discount: -₱50'))).toEqual(true);
  });
});
