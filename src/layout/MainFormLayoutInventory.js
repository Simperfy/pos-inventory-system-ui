import React, {useContext} from 'react';

import {Form, SearchBar} from '../components';
import {InventoryContext} from '../context/InventoryContext';
import formTypes from '../util/enumFormTypes';

function MainFormLayoutInventory() {
    const {
        state: {
            showForm, showSearchResults,
            searchResults, formType
        }, handleSearchBarChange,
        handleSearchBarFocus,
        handleSearchBarBlur,
        handleSearchBarItemClick
    } = useContext(InventoryContext);

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
                                          formType: res.kiloAble ? formTypes.inventoryPerSack : formTypes.inventoryPerQuantity
                                      })}/>

            {(showForm && formType === formTypes.inventoryPerQuantity) && <Form.FormGroupInventoryQuantity/>}
            {(showForm && formType === formTypes.inventoryPerSack) && <Form.FormGroupInventorySack/>}
        </>
    );
}

export default MainFormLayoutInventory;
