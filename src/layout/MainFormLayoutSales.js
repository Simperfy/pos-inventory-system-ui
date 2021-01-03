import React, {useContext} from 'react';

import {Form, SearchBar} from '../components';
import {SalesContext} from '../context/SalesContext';
import formTypes from '../util/formTypes';

function MainFormLayoutSales() {
    const {
        state: {
            showForm, showSearchResults,
            searchResults, formType
        }, handleSearchBarChange,
        handleSearchBarFocus,
        handleSearchBarBlur,
        handleSearchBarItemClick
    } = useContext(SalesContext);

    return (
        <h1>Main Form layout Sales</h1>
        /*<>
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
                                          formType: res.kiloAble ? formTypes.inventoryPerSack : formTypes.inventoryPerQuantity
                                      })}/>

            {(showForm && formType === formTypes.inventoryPerQuantity) && <Form.FormGroupSalesQuantity/>}
            {(showForm && formType === formTypes.inventoryPerSack) && <Form.FormGroupSalesSack/>}
        </>*/
    );
}

export default MainFormLayoutSales;
