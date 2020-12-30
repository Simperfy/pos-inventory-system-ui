import React from 'react';
import ModalLayout from '../layout/ModalLayout';
import { InventoryContext } from '../context/InventoryContext';
import FormButton from './FormButton';
import { ReactComponent as FailedIcon } from '../assets/icons/exclamation-mark.svg';

class ModalFailed extends React.Component {
  static contextType = InventoryContext;

  render() {
    return (
      <>
        <ModalLayout handleClose={() => console.log('close')}>
          <div className="d-flex flex-column h-75 w-100 px-3 confirm-item-container justify-content-between align-items-center text-center">
            <div>
              <FailedIcon width="16rem" />
              <h2>Failed</h2>
            </div>

            <div className="d-flex justify-content-center">
              <FormButton
                danger
                style={{ margin: 0 }}
                text="Back to Home"
                handleClick={() => console.log('home')}
              />
            </div>
          </div>
        </ModalLayout>
      </>
    );
  }
}

export default ModalFailed;
