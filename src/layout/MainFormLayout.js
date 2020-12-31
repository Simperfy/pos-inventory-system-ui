import React, { useContext } from 'react';

import SearchBar from '../components/SearchBar';
import FormGroup from '../components/FormGroup';

import { InventoryContext } from '../context/InventoryContext';

function MainForm() {
  const {state: {showForm} } = useContext(InventoryContext);
  return (
    <>
      <SearchBar />

      { showForm && <FormGroup />}
    </>
  );
}

export default MainForm;
