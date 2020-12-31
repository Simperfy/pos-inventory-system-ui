import React from 'react';

import ModalLayout from '../layout/ModalLayout';
import { InventoryContext } from '../context/InventoryContext';
import FormButton from './FormButton';
import { ReactComponent as LoopIcon } from '../assets/icons/loop.svg';

import './ModalLoading.css';

class ModalLoading extends React.Component {
  static contextType = InventoryContext;

  constructor(props) {
    super(props);
    this.state = {
      texts: ['Please wait', 'Please wait.', 'Please wait..', 'Please wait...'],
      counter: 0,
    };
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState((prevState, props) => {
        if (prevState.counter++ > 2) prevState.counter = 0;
        return { counter: prevState.counter };
      });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <>
        <ModalLayout>
          <div className="d-flex flex-column h-75 w-100 px-3 confirm-item-container justify-content-center align-items-center text-center">
            <div>
              <LoopIcon className="spin-img" width="16rem" />
              <h2>{this.state.texts[this.state.counter]}</h2>
            </div>
          </div>
        </ModalLayout>
      </>
    );
  }
}

export default ModalLoading;
