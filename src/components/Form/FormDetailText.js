import React from 'react';

function FormDetailText({price, discount, subTotal, discountTotal, total}) {
  return (
    <div className="d-flex flex-column details-form">
      <p>
        Price: ₱{price} <span>(per item)</span>
      </p>
      <p className="saturate-red">
        Discount: -₱{discount} <span>(per item)</span>
      </p>
      <br />
      <p className="saturate-green">Subtotal: ₱{subTotal}</p>
      <p className="saturate-red">Discount: -₱{discountTotal}</p>
      <p style={{textDecoration: total <= 0 ? 'line-through' : 'none'}}>Total: ₱{total}</p>
    </div>
  );
}

export default FormDetailText;
