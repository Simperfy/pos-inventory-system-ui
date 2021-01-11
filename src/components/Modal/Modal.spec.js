import {mount, shallow} from 'enzyme';

import React from 'react';
import ModalConfirm from './ModalConfirm';
import {enumSubmitConfirmTypes} from '../../enums/enumSubmitConfirmTypes';
import ModalFailed from './ModalFailed';

describe('ModalConfirm Test', () => {
  let wrapper;
  const confirmItems = [
    {id: 1, leftText: 'sample item', rightText: 100},
  ];

  it('should find "Adding Items to inventory:" when rendered', () => {
    wrapper = shallow(<ModalConfirm confirmItems={confirmItems} submitConfirmType={enumSubmitConfirmTypes.INVENTORY_SUBMIT}/>);

    expect(wrapper.find('h4').text()).toBe('Adding Items to inventory:');
  });

  it('should find "Adding Items to sales:" when rendered', () => {
    wrapper = shallow(<ModalConfirm confirmItems={confirmItems} submitConfirmType={enumSubmitConfirmTypes.SALES_SUBMIT}/>);

    expect(wrapper.find('h4').text()).toBe('Adding Items to sales:');
  });

  it('should find "sample item" when rendered', () => {
    wrapper = shallow(<ModalConfirm confirmItems={confirmItems}/>);

    expect(wrapper.find('.confirm-item-text').text()).toBe('sample item');
  });

  it('should find "100" when rendered', () => {
    wrapper = shallow(<ModalConfirm confirmItems={confirmItems}/>);

    expect(wrapper.find('.confirm-item-info').text()).toBe('100');
  });
});

describe('ModalFailed Test', () => {
  let wrapper;
  let mockHandleClose;
  // let mockHandleClick;

  beforeEach(() => {
    mockHandleClose = jest.fn(() => null); // no need to test this as this is already tested
    // mockHandleClick = jest.fn(() => null);
    // wrapper = render(<ModalFailed handleClose={mockHandleClose} handleClick={mockHandleClick}/>);
    wrapper = mount(<ModalFailed handleClose={mockHandleClose}/>);
  });

  it('should find "Failed" when rendered', () => {
    expect(wrapper.find('h2').text()).toBe('Failed');
  });

  it('should call function from ".modal-close class" when clicked', () => {
    wrapper.find('.modal-close').simulate('click');

    expect(mockHandleClose.mock.calls.length).toBe(1);
  });
});
