import React, { Component } from 'react';
import { CategoryFilter } from './rcStatelessComponents';

class Menu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isClosed : false
    };

  };

  toggleMenu = (e) => { 
    this.setState(
      (state) => {
        return {isClosed: !state.isClosed}
      }
    );
  };

  render() {
    let toggleClass, buttonClass;

    if (this.state.isClosed) {
      buttonClass = "menu__toggle fas fa-caret-right";
      toggleClass = 'menu menu--close';
    }
    else {
      buttonClass = 'menu__toggle fas fa-caret-left';
      toggleClass = 'menu menu--open';
    }

    return (
      <div className={toggleClass}>
        <span
          onClick={this.toggleMenu}
          className={buttonClass}
          >
        </span>
        <CategoryFilter />
      </div>
    );
  }

}

export default Menu;