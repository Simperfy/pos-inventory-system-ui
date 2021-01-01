import React, { useContext } from 'react';

import {Form} from '../components'
import SearchBar from '../components/SearchBar';
import { InventoryContext } from '../context/InventoryContext';

function MainForm() {
  const {state: {showForm} } = useContext(InventoryContext);
  return (
    <>
      <SearchBar />

      { showForm && <Form.FormGroup />}
    </>
  );
}

export default MainForm;
