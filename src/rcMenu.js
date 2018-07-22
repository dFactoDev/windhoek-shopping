import React, { Component } from 'react';

class Menu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isClosed : false
    }
  };

  render() {
    return (
      <div className='menu menu--open'>
        <button onClick="{this.toggleMenu}">&lt;</button>
      </div>
    );
  }

}

export default Menu;