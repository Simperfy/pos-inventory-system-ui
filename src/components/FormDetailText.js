import React from 'react';

function FormDetailText() {
  return (
    <div className="d-flex flex-column details-form">
      <p>
        Price: ₱100.00 <span>(per item)</span>
      </p>
      <p className="saturate-red">
        Discount: -₱10.00 <span>(per item)</span>
      </p>
      <br />
      <p className="saturate-green">Subtotal: ₱300.00</p>
      <p className="saturate-red">Discount: -₱30.00</p>
      <p>Total: ₱270.00</p>
    </div>
  );
}

export default FormDetailText;
