import React from 'react';
import ModalLayout from '../../layout/ModalLayout';
import { InventoryContext } from '../../context/InventoryContext';
import FormButton from '../Form/FormButton';
import { ReactComponent as FailedIcon } from '../../assets/icons/exclamation-mark.svg';

class ModalFailed extends React.Component {
  static contextType = InventoryContext;

  render() {
    return (
      <>
        <ModalLayout handleClose={this.props.handleClose}>
          <div className="d-flex flex-column h-75 w-100 px-3 confirm-item-container justify-content-between align-items-center text-center">
            <div>
              <FailedIcon width="16rem" />
              <h2>Failed</h2>
            </div>

            <div className="d-flex justify-content-center">
              <FormButton
                style={{ margin: 0 }}
                text="Try again"
                color="red"
                solid
                handleClick={this.props.handleClick}
              />
            </div>
          </div>
        </ModalLayout>
      </>
    );
  }
}

export default ModalFailed;
