import React from 'react';
import ModalLayout from '../layout/ModalLayout';
import { InventoryContext } from '../context/InventoryContext';
import FormButton from './FormButton';
import { ReactComponent as SuccessIcon } from '../assets/icons/tick.svg';

class ModalSuccess extends React.Component {
  static contextType = InventoryContext;

  render() {
    return (
      <>
        <ModalLayout>
          <div className="d-flex flex-column h-100 w-100 px-3 confirm-item-container justify-content-between align-items-center text-center">
            <div>
              <SuccessIcon width="16rem"/>
              <h2>Success</h2>
            </div>

            <div className="d-flex justify-content-center">
              <FormButton color="blue" solid style={{ margin: 0 }} text="Back to Home" handleClick={() => console.log('home')} />
            </div>
          </div>
        </ModalLayout>
      </>
    );
  }
}

export default ModalSuccess;
