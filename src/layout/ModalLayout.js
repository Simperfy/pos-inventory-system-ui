import React from 'react';

import Row from 'react-bootstrap/Row';

import CloseBtn from '../assets/icons/close.svg';
import './ModalLayout.css';

function ModalLayout({ handleClose, children }) {
  return (
    <>
      <div className="modal-overlay" />
      <div className="modal-container">
        <Row className="flex-column align-items-center justify-content-between h-100">
          {handleClose && (
            <a href="/#" className="modal-close" onClick={() => handleClose()}>
              <img src={CloseBtn} style={{ width: 36 }} alt="close button" />
            </a>
          )}

          {children}
        </Row>
      </div>
    </>
  );
}

export default ModalLayout;
