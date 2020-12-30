import React from 'react';
import ModalLayout from '../layout/ModalLayout';
import FormButtonCancel from './FormButtonCancel';
import FormButtonConfirm from './FormButtonConfirm';

import { InventoryContext } from '../context/InventoryContext';

import './ModalConfirm.css';

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
                {this.context.state.confirmItems.map((ci) => (
                  <div
                    key={ci.id}
                    className="d-flex justify-content-between confirm-item"
                  >
                    <span className="confirm-item-text">
                      {ci.quantity} x {ci.item}
                    </span>
                    <span className="confirm-item-info">{ci.info}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="d-flex justify-content-between">
              <FormButtonConfirm
                handleConfirm={() =>
                  this.context.setState({ showConfirmModal: false })
                }
                style={{ fontSize: '1rem', margin: 0 }}
              />
              <FormButtonCancel
                handleCancel={() =>
                  this.context.setState({ showConfirmModal: false })
                }
                style={{ fontSize: '1rem', margin: 0 }}
                solid
              />
            </div>
          </div>
        </ModalLayout>
      </>
    );
  }
}

export default ModalConfirm;
