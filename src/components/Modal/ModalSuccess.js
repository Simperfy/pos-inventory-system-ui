import React from 'react';
import ModalLayout from '../../layout/ModalLayout';
import FormButton from '../Form/FormButton';
import {ReactComponent as SuccessIcon} from '../../assets/icons/tick.svg';

function ModalSuccess({handleClick}) {
  return (
    <>
      <ModalLayout>
        <div className="d-flex flex-column h-100 w-100 px-3 confirm-item-container justify-content-between align-items-center text-center">
          <div>
            <SuccessIcon width="16rem"/>
            <h2>Success</h2>
          </div>

          <div className="d-flex justify-content-center">
            <FormButton color="blue" solid style={{margin: 0}} text="Back to Home" handleClick={handleClick} />
          </div>
        </div>
      </ModalLayout>
    </>
  );
}

export default ModalSuccess;
