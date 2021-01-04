import React, {useContext} from 'react';

import {Form, SearchBar} from '../components';
import {SalesContext} from '../context/SalesContext';
import formTypes from '../enums/enumFormTypes';

function MainFormLayoutSales() {
  const {
    state: {
      showForm, showSearchResults,
      searchResults, formType,
    }, handleSearchBarChange,
    handleSearchBarFocus,
    handleSearchBarBlur,
    handleSearchBarItemClick,
  } = useContext(SalesContext);

  return (
    <>
      <SearchBar.SearchBarGroup handleSearchBarChange={handleSearchBarChange}
        handleSearchBarFocus={handleSearchBarFocus}
        handleSearchBarBlur={handleSearchBarBlur}
        showSearchResults={showSearchResults}
        searchResults={searchResults}
        handleSearchBarItemClick={(res) => handleSearchBarItemClick({
          itemText: res.name,
          itemBarcode: res.id,
          suppliers: res.suppliers,
          sacks: res.sacks,
          price: res.price,
          formType: res.kiloAble ? formTypes.salesPerKilo : formTypes.salesPerQuantity,
        })}/>

      {(showForm && formType === formTypes.salesPerQuantity) && <Form.FormGroupSalesQuantity/>}
      {(showForm && formType === formTypes.salesPerKilo) && <Form.FormGroupSalesKilo/>}
    </>
  );
}

export default MainFormLayoutSales;
