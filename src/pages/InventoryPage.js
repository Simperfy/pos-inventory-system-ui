import React from 'react';

import MainLayout from '../layout/MainLayout';
import MainForm from '../layout/MainFormLayout';

import './InventoryPage.css';

class Inventory extends React.Component {
  render() {
    return (
      <>
        <MainLayout>
          <div className="container-fluid">
            <div className="row h-100 pb-4">
              <div className="col-md-8">
                <MainForm></MainForm>
              </div>
              <div className="col-md-4">
                <div className="pending-items-container px-4">
                  <p>Pending Items</p>
                  <p>Pending Items</p>
                  <p>Pending Items</p>
                </div>
              </div>
            </div>
          </div>
        </MainLayout>
      </>
    );
  }
}

export default Inventory;
