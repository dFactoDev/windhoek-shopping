import React, { Component } from 'react';

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
    let buttonText, toggleClass;

    if (this.state.isClosed) {
      buttonText = ">";
      toggleClass = 'menu menu--close';
    }
    else {
      buttonText = "<";
      toggleClass = 'menu menu--open';
    }

    return (
      <div className={toggleClass}>
        <button 
          onClick={this.toggleMenu}
          className='menu__toggle'
          >{buttonText}
        </button>
      </div>
    );
  }

}

export default Menu;