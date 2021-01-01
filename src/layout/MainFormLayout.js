import React, {useContext} from 'react';

import {Form, SearchBar} from '../components';
import {InventoryContext} from '../context/InventoryContext';

function MainForm() {
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
                                          suppliers: res.suppliers
                                      })}/>

            {showForm && <Form.FormGroupInventoryQuantity/>}
        </>
    );
}

export default MainForm;
