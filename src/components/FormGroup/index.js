import React from 'react';

import './style.css';

function FormGroup() {
  return (
    <div className="row">
      <div className="col-md-6">
        <div className="d-flex flex-column main-form">
          <div className="form-item">
            <p>Item: Item 1</p>
            <span className="item-barcode">5fe2ff51ab328745dc231241</span>
          </div>

          <div className="form-item">
            <label htmlFor="item-label">Qty:</label>
            <input
              type="text"
              id="item-label"
              name="quantity"
              placeholder="1 pc(s)"
            />
          </div>

          <div className="form-item">
            <label htmlFor="supplier-label">Supplier:</label>
            <select name="supplier" id="supplier-label">
              <option value="1">Supplier 1</option>
              <option value="2">Supplier 2</option>
              <option value="3">Supplier 3</option>
              <option value="4">Supplier 4</option>
            </select>
          </div>

          <div className="form-btn-group">
            <button type="button" className="add-item">
              ADD
            </button>
            <button type="button" className="cancel-item">
              Cancel
            </button>
          </div>
        </div>
      </div>

      <div className="col-md-6">
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
      </div>
    </div>
  );
}

export default FormGroup;
