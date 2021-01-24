import React, {useContext} from 'react';

import {Form, SearchBar} from '../components';
import {InventoryContext} from '../context/InventoryContext';
import formTypes from '../enums/enumFormTypes';

function MainFormLayoutInventory() {
  const {
    state: {
      showForm, showSearchResults,
      searchResults, formType,
    }, handleSearchBarChange,
    handleSearchBarFocus,
    handleSearchBarBlur,
    handleSearchBarItemClick,
  } = useContext(InventoryContext);

  return (
    <>
      <SearchBar.SearchBarGroup handleSearchBarChange={handleSearchBarChange}
        handleSearchBarFocus={handleSearchBarFocus}
        handleSearchBarBlur={handleSearchBarBlur}
        showSearchResults={showSearchResults}
        searchResults={searchResults}
        handleSearchBarItemClick={(res) => handleSearchBarItemClick(res)}
        checkIfOutOfStock={false}
      />

      {(showForm && formType === formTypes.inventoryPerQuantity) && <Form.FormGroupInventoryQuantity/>}
      {/* {(showForm && formType === formTypes.inventoryPerSack) && <Form.FormGroupInventorySack/>}*/}
    </>
  );
}

export default MainFormLayoutInventory;
