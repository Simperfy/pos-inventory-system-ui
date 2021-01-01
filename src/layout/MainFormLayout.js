import React, { useContext } from 'react';

import {Form, SearchBar} from '../components';
import { InventoryContext } from '../context/InventoryContext';

function MainForm() {
  const {state: {showForm} } = useContext(InventoryContext);
  return (
    <>
      <SearchBar.SearchBarGroup />

      { showForm && <Form.FormGroup />}
    </>
  );
}

export default MainForm;
