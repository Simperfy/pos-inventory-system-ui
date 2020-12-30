import React from 'react';

import PendingItems from '../components/PendingItems';

import FormButtonPrimary from '../components/FormButtonPrimary';

function PendingItemsLayout() {
  return (
    <div className="pending-items-container px-4 d-flex flex-column justify-content-between">
      <div>
        <PendingItems />
      </div>
      <FormButtonPrimary
        style={{ padding: 0, width: '100%' }}
        text="Submit Inventory"
        handleAdd={() => console.log('submit')}
      />
    </div>
  );
}

export default PendingItemsLayout;
