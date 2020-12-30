import React from 'react';

import MainLayout from '../layout/MainLayout';
import MainFormLayout from '../layout/MainFormLayout';
import PendingItems from '../components/PendingItems';

import './InventoryPage.css';

class Inventory extends React.Component {
  render() {
    return (
      <>
        <MainLayout>
          <div className="container-fluid">
            <div className="row h-100 pb-4">
              <div className="col-md-8">
                <MainFormLayout></MainFormLayout>
              </div>
              <div className="col-md-4">
                <PendingItems />
              </div>
            </div>
          </div>
        </MainLayout>
      </>
    );
  }
}

export default Inventory;
