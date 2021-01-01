import React from 'react';
import ModalLayout from '../layout/ModalLayout';

import { InventoryContext } from '../context/InventoryContext';

import './ModalConfirm.css';
import FormButton from './FormButton';

class ModalConfirm extends React.Component {
  static contextType = InventoryContext;

  render() {
    return (
      <>
        <ModalLayout>
          <div className="d-flex flex-column h-100 w-100 px-3 confirm-item-container justify-content-between">
            <div>
              <h4>Adding Items to inventory:</h4>
              <div className="confirm-item-scrollable">
                {this.props.confirmItems.map((ci) => (
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
                handleClick={this.context.handleSubmitConfirm}
                style={{ fontSize: '1rem', margin: 0 }}
              />
              <FormButton
                color="red"
                text="Cancel"
                solid
                handleClick={() =>
                  this.context.setState({ showConfirmModal: false })
                }
                style={{ fontSize: '1rem', margin: 0 }}
              />
            </div>
          </div>
        </ModalLayout>
      </>
    );
  }
}

export default ModalConfirm;
