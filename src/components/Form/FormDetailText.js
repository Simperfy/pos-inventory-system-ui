import React from 'react';
import {connect} from 'react-redux';

export const FormDetailText = ({price, discount, quantity}) => {
  const subTotal = quantity * price;
  const discountTotal = quantity * (isNaN(discount) ? 0 : discount);
  const total = subTotal - discountTotal;

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
};

export default connect((state) => ({
  price: state.price,
  discount: state.discount,
  quantity: state.quantity,
}), {})(FormDetailText);
