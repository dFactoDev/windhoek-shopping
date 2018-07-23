import React, { Component } from 'react';
import CategoryFilter from './rcCategoryFilter';
import LocationList from './rcLocationList';

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

    if (this.state.isClosed) {
      return (
        <div className="menu menu--close">
          <span
            onClick={this.toggleMenu}
            className="menu__toggle fas fa-bars"
            >
          </span>
        </div>
      );
    }
    else {
      return (
        <div className="menu menu--open">
          <span
            onClick={this.toggleMenu}
            className="menu__toggle fas fa-caret-left"
            >
          </span>
          <CategoryFilter categories={this.props.categories}/>
          <LocationList locations={this.props.locations}/>
        </div>
      );
    }


  }

}

export default Menu;