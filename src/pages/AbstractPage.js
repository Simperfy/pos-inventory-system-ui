import React from 'react';
import Api from '../api/Api';
import {ModelStocks} from '../api/models';
import {getRoute} from '../routeConfig';
import enumKiloType from '../enums/enumKiloType';
import formTypes from '../enums/enumFormTypes';

export class AbstractPage extends React.Component {
  constructor(props) {
    if (new.target === AbstractPage) {
      throw new TypeError('Cannot construct PageAbstract instances directly');
    }

    super(props);
    this.pendingItemsCounter = 0;

    this.state = {
      /* Modals*/
      isSuccess: false,
      isFailed: false,
      isLoading: false,
      isConfirming: false,
      /* Forms*/
      pendingItems: [],
      formDetail: {
        price: 0,
        discount: 0,
      },
      mainForm: {
        kiloType: enumKiloType.kilo,
        kiloTypes: [
          {id: 1, value: enumKiloType.kilo, name: 'per kilo'},
          {id: 2, value: enumKiloType.sack, name: 'per sack'},
        ],
        itemText: '',
        itemBarcode: '',
        suppliers: [],
        sacks: [],
        supplierId: '',
        supplierName: '',
        quantity: '',
        kilo: 0,
        discount: 0,
      },
      showForm: false,
      formGroupRef: React.createRef(),
      formType: '',
      searchResults: [],
      showSearchResults: false,
    };
  }

    resetForm = () => {
      this.setState((prevState, props) => ({
        mainForm: {
          kiloType: enumKiloType.kilo,
          kiloTypes: [
            {id: 1, value: enumKiloType.kilo, name: 'per kilo'},
            {id: 2, value: enumKiloType.sack, name: 'per sack'},
          ],
          itemText: '',
          itemBarcode: '',
          suppliers: [],
          sacks: [],
          supplierId: '',
          supplierName: '',
          quantity: '',
          kilo: 0,
        },
        formDetail: {
          price: 0,
          discount: 0,
        },
      }));
    }

    isValidFormInventory = () => {
      const mainForm = this.state.mainForm;
      const nonEmptyFields = [
        'itemText',
        'itemBarcode',
        // 'suppliers',
        'supplierName',
        'quantity',
        // 'kilo',
      ];

      for (const key of Object.keys(mainForm)) {
        if (nonEmptyFields.includes(key) && !mainForm[key]) {
          window.alert(`Invalid "${key.toUpperCase()}" values`);
          return false;
        }
      }

      return true;
    }

    isValidFormSales = () => {
      const mainForm = this.state.mainForm;
      let nonEmptyFields = [
        'itemText',
        'itemBarcode',
      ];


      if ( (mainForm.formType === formTypes.salesPerKilo) && (mainForm.kiloType !== enumKiloType.kilo)) {
        nonEmptyFields = [
          'itemText',
          'itemBarcode',
          'quantity',
          // 'kilo',
        ];
      }

      for (const key of Object.keys(mainForm)) {
        if (nonEmptyFields.includes(key) && !mainForm[key]) {
          window.alert(`Invalid "${key.toUpperCase()}" values`);
          return false;
        }
      }

      return true;
    }

    checkDuplicate = (pi) => {
      const {
        itemBarcode,
        supplierId,
      } = this.state.mainForm;

      return pi.barcode === itemBarcode && pi.supplierId === supplierId;
    }

    filterDuplicate = (pi) => {
      const {
        itemBarcode,
        supplierId,
      } = this.state.mainForm;

      if (pi.barcode !== itemBarcode) return true;
      return pi.barcode === itemBarcode && pi.supplierId !== supplierId;
    }

    removeDuplicate = () => {
      const isDuplicated = this.state.pendingItems.some(this.checkDuplicate);

      if (isDuplicated) {
        const isConfirmed = window.confirm('Item already added, do you want to replace the item?');

        if (isConfirmed) {
          this.setState((prevState, props) => {
            const newPendingItems = prevState.pendingItems.filter(this.filterDuplicate);
            return {pendingItems: newPendingItems};
          });

          return true; // if there's duplicate and already replace, update state
        }

        return false; // if there's duplicate and confirm = no, don't update state
      }

      return true; // if no duplicate update state
    }

    removePendingItem = (id) => {
      this.setState((prevState, props) => ({
        pendingItems: prevState.pendingItems.filter((pi) => pi.id !== id),
      }));
    };

    removeAllPendingItems = () => {
      if (window.confirm('Do you want to remove all items?')) {
        this.setState({pendingItems: []});
      }
    };

    closeForm = () => this.setState({showForm: false});
    showForm = (type) => this.setState({showForm: true, formType: type});

    closeSearchResults = () => this.setState({showSearchResults: false});
    showSearchResults = () => this.setState({showSearchResults: true});

    mapItems = (d) => {
      return {
        id: d._id,
        barcode: d._id,
        name: d.item_name,
        kiloAble: d.kiloable,
        sacks: d.item_kilos.map((ik) => ({sackId: ik.id, sackLabel: ik.label, sackValue: ik.value})),
        suppliers: d.suppliers.map((s) => ({
          id: s.id,
          supplierName: s.supplier_name,
        })),
        price: d.price,
      };
    }

    handleSearchBarChange = (e) => {
      const val = e.target.value;

      if (val) {
        Api.getItems(this.context.state.jwt, {item_name_contains: val}).then(({data}) => {
          console.log('data');
          console.log(data);
          this.props.updateSearchResults(data);
          /* data = data.map(this.mapItems);
          this.setState({searchResults: data});*/
          this.showSearchResults();
        });
      } else if (!val && this.state.searchResults.length > 0) {
        this.showSearchResults();
      } else {
        this.closeSearchResults();
      }
    };

    handleSearchBarFocus = (e) => {
      const val = e.target.value;
      if (!val) {
        Api.getItems(this.context.state.jwt, {_limit: 10}).then(({data}) => {
          this.props.updateSearchResults(data);
          /* data = data.map(this.mapItems);
          this.setState({searchResults: data});*/
          this.showSearchResults();
        });
      } else if (val && this.state.searchResults.length > 0 && !this.state.showSearchResults) this.showSearchResults();
    }

    handleSearchBarBlur = (e) => {
      setTimeout(() => this.closeSearchResults(), 100);
    }

    handleSubmitConfirm = (e) => {
      console.log('submit');
      this.setState({isConfirming: false, isLoading: true});

      const jwt = this.context.state.jwt;
      const id = this.context.state.user.id;
      const pendingItems = this.props.pendingItems; // coming from redux

      ModelStocks.createBatch(jwt, id, pendingItems)
          .then((data) =>
            setTimeout(() => this.setState({isSuccess: true, pendingItems: []}), 1000),
          (err) => setTimeout(() => this.setState({isFailed: true}), 1000));
    }

    handleSupplierSelectChange = (e) => {
      this.setState((prevState, props) => {
        const supplierName = prevState.mainForm.suppliers.find((s)=>s.id === e.target.value).supplierName;

        return {
          mainForm: {...prevState.mainForm, supplierId: e.target.value, supplierName: supplierName},
        };
      });
    }

    handleQuantityInputChange = (e) => {
      let quantity = parseInt(e.target.value);
      quantity = isNaN(quantity) ? 0 : quantity;

      this.setState((prevState, props) => {
        let discount = quantity <= 0 ? 0 : prevState.formDetail.discount;
        if (isNaN(discount) || !discount) discount = 0;

        return {
          mainForm: {...prevState.mainForm, quantity: quantity},
          formDetail: {
            price: prevState.formDetail.price,
            discount: discount,
          },
        };
      },
      );
    }

    handleKiloInputChange = (e) => {
      let kilo = parseInt(e.target.value);
      kilo = isNaN(kilo) ? 0 : kilo;

      this.setState((prevState, props) => ({
        mainForm: {...prevState.mainForm, kilo: kilo},
      }));
    }

    handleDiscountInputChange = (e) => {
      let discount = parseFloat(e.target.value);
      discount = isNaN(discount) ? 0 : discount;

      if (this.state.mainForm.quantity <= 0) return;
      if (discount >= this.state.formDetail.price) discount = this.state.formDetail.price;
      this.setState((prevState, props) => ({
        formDetail: {...prevState.formDetail, discount: discount},
      }));
    }

    handleSackSelectChange = (e) => {
      const id = e.target.value; // id if using the redux
      const kilo = this.props.sacks.find((s) => s.id === id).value;

      this.props.updateSackSelectedIdAndKilo(id);

      this.setState((prevState, props) => ({
        mainForm: {...prevState.mainForm, kilo: kilo},
      }));
    }

    handleModalSuccessClick = (e) => {
      this.props.history.push(getRoute('selection'));
    }

    handleModalFailedClose = (e) => {
      e.preventDefault();
      // this.handleSubmitConfirm();
      this.setState({isFailed: false, isLoading: false});
    }

    handleModalFailedClick = (e) => {
      this.setState({isFailed: false, isLoading: false});
      setTimeout(() => this.handleSubmitConfirm(), 250);
    }

    addOpacityBlur = () => {
      const fGRef = this.state.formGroupRef.current;
      if (fGRef) {
        fGRef.classList.remove('form-group-container');
        setTimeout(() => fGRef.classList.add('form-group-container'), 100);
      }
    }

    handleItemTypeSelectChange = (e) => {
      const kiloType = parseInt(e.target.value);

      if (kiloType === enumKiloType.kilo) {
        this.props.resetQuantity();
      }
      this.setState((prevState, props) => ({mainForm: {...prevState.mainForm, kiloType: kiloType, kilo: kiloType === enumKiloType.kilo ? 0 : prevState.mainForm?.sacks[0]?.sackValue || 0}}));
    }

    providerFunctions = () => {
      return {
        state: this.state,
        setState: this.setState.bind(this),
        addPendingItems: this.addPendingItems,
        removePendingItem: this.removePendingItem,
        removeAllPendingItems: this.removeAllPendingItems,
        closeForm: this.closeForm,
        showForm: this.showForm,
        handleSearchBarChange: this.handleSearchBarChange,
        handleSearchBarItemClick: this.handleSearchBarItemClick,
        handleSearchBarFocus: this.handleSearchBarFocus,
        handleSearchBarBlur: this.handleSearchBarBlur,
        handleSubmitConfirm: this.handleSubmitConfirm,
        handleSupplierSelectChange: this.handleSupplierSelectChange,
        handleQuantityInputChange: this.handleQuantityInputChange,
        handleSackSelectChange: this.handleSackSelectChange,
        handleDiscountInputChange: this.handleDiscountInputChange,
        handleItemTypeSelectChange: this.handleItemTypeSelectChange,
        handleKiloInputChange: this.handleKiloInputChange,
      };
    }
}
