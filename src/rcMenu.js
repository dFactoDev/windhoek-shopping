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
      },
      () => {
        // ensures that when menu opened, location list is filtered again according to current category selection
        this.props.changeFilter(this.props.currentFilter);
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
      
      let menuContent;
      
      switch(this.props.statusMenuLoad) {
        case 0: 
          menuContent = <div> Loading, please wait...</div>
          break;
        case 1:
          menuContent = 
            <div>
              <CategoryFilter 
                categories={this.props.categories} 
                changeFilter={this.props.changeFilter}
                currentFilter={this.props.currentFilter}/> 
              <LocationList filteredLocations={this.props.filteredLocations}/>
            </div>
          break;
        case 2:
          menuContent = <div> Error loading. Please refresh.</div>
          break;
      }
      return (
        <div className="menu menu--open">
          <span
            onClick={this.toggleMenu}
            className="menu__toggle fas fa-caret-left"
            >
          </span>
            {menuContent}
        </div>
      );
    }


  }

}

export default Menu;