import {shallow} from 'enzyme';

import React from 'react';
import ModalConfirm from './ModalConfirm';
// import FormButton from '../Form/FormButton';
import {enumSubmitConfirmTypes} from '../../enums/enumSubmitConfirmTypes';

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
