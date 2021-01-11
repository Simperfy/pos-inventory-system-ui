import React from 'react';
import ModalLayout from '../../containers/ModalLayout';

import './ModalConfirm.css';
import FormButton from '../Form/FormButton';
import {enumSubmitConfirmTypes} from '../../enums/enumSubmitConfirmTypes';

function ModalConfirm({confirmItems, handleSubmitConfirm, setState, submitConfirmType}) {
  return (
    <>
      <ModalLayout>
        <div className="d-flex flex-column h-100 w-100 px-3 confirm-item-container justify-content-between">
          <div>
            <h4>Adding Items to {submitConfirmType === enumSubmitConfirmTypes.INVENTORY_SUBMIT ? 'inventory' : 'sales'}:</h4>
            <div className="confirm-item-scrollable">
              {confirmItems.map((ci) => (
                <div
                  key={ci.id}
                  className="d-flex justify-content-between confirm-item"
                >
                  <span className="confirm-item-text">
                    {ci.leftText}
                  </span>
                  <span className="confirm-item-info">
                    {ci.rightText}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="d-flex justify-content-between">
            <FormButton
              color="green"
              text="Confirm"
              solid
              handleClick={handleSubmitConfirm}
              style={{fontSize: '1rem', margin: 0}}
            />
            <FormButton
              color="red"
              text="Cancel"
              solid
              handleClick={() => setState({isConfirming: false})}
              style={{fontSize: '1rem', margin: 0}}
            />
          </div>
        </div>
      </ModalLayout>
    </>
  );
}

export default ModalConfirm;
