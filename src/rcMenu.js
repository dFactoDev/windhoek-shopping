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
    
    let menuContent = 
      <div role='menu'>
        <CategoryFilter 
          categories={this.props.categories} 
          changeFilter={this.props.changeFilter}
          selectedFilter={this.props.selectedFilter}/> 
        <LocationList 
          filteredLocations={this.props.filteredLocations}
          selectedLocation={this.props.selectedLocation}
          changeLocation={this.props.changeLocation}/>
      </div>;
    
    if (this.state.isClosed) {
      return (
        <div>
          <span
            title="toggle menu"
            role="button"
            onClick={this.toggleMenu}
            className="menu__toggle fas fa-bars"
            >
          </span>
          {menuContent}
        </div>
      );
    }
    else {
           
      switch(this.props.statusMenuLoad) {
        case 1: 
          menuContent = <div> Loading, please wait...</div>
          break;
        case 2:
          menuContent = <div> Error loading. Please refresh.</div>
          break;
        default:
          break;
      }
      return (
        <div className="menu menu--open">
          <span
            title="toggle menu"
            role="button"
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