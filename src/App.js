import React, { Component } from 'react';
import './App.css';
import Menu from './rcMenu';
import Map from './rcMap';
import * as auxFunc from './auxFunctions';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: {
        '4bf58dd8d48988d127951735': 'Arts & Crafts',
        '4bf58dd8d48988d103951735': 'Clothing',
        '4bf58dd8d48988d10c951735': 'Cosmetics',
        '4bf58dd8d48988d1f8941735': 'Furniture & Home',
        '4bf58dd8d48988d1fd941735': 'Malls',
        '4bf58dd8d48988d118951735': 'Groceries',
        '4bf58dd8d48988d186941735': 'Liquor',
        '4f04afc02fb6e1c99f3db0bc': 'Mobile Phones',
        '4bf58dd8d48988d10f951735': 'Pharmacy',
        '4bf58dd8d48988d1ff941735': 'Miscellaneous'
      },
      locations: {},
      filteredLocations: {},
      statusMenuLoad: 0,
      currentFilter: '',
      currentLocation: '',
      previousLocation: ''
    }
  }
  
  filterLocations = (categoryId) => {

    let locations = this.state.locations;
    let filtered = {};

    if(!categoryId || categoryId === '0') {
      filtered = Object.assign(filtered, locations);
    }
    else {
      for (let id in locations) {
        if (categoryId === locations[id].categoryId) {
          filtered[id] = locations[id];
        }
      }
    }
    return filtered;
  }

  changeFilter = (categoryId) => {

    let newState = this.filterLocations(categoryId);
    this.setState({ 
        filteredLocations: newState,
        currentFilter: categoryId
      }
    );
  }

  changeLocation = (locationId) => {
    this.setState( (state) => {
      return {
        currentLocation: locationId,
        previousLocation: state.currentLocation
      };
    });
  }

  componentDidMount() {
    this.setState ( {statusMenuLoad: 1});

    auxFunc.fetchPlaces(Object.keys(this.state.categories))
      .then( arrPlaces => auxFunc.venuesArrToObj(arrPlaces) )
      .then( objPlaces => {
        auxFunc.getGoogleAddresses(objPlaces)
          .then( addresses => auxFunc.addAddresses(addresses, objPlaces))
          .then( locations => this.setState( { locations: locations,
                                              statusMenuLoad: 0 })
          )
      })
      .catch( (err) => {
        this.setState( {statusMenuLoad: 2})
      }); 
  }

  render() {
    return (
      <div className="row">
        <Map 
          filteredLocations={this.state.filteredLocations}
          locations={this.state.locations}
          currentLocation={this.state.currentLocation}
          previousLocation={this.state.previousLocation}
          changeLocation={this.changeLocation}
        />
        <Menu 
          categories={this.state.categories} 
          filteredLocations={this.state.filteredLocations}
          statusMenuLoad={this.state.statusMenuLoad}
          changeFilter={this.changeFilter}
          currentFilter={this.state.currentFilter}
          currentLocation={this.state.currentLocation}
          changeLocation={this.changeLocation}
        />
      </div>
    );
  }
}

export default App;
