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
      selectedFilter: '',
      selectedLocation: '',
      previousLocation: ''
    }
  }
  
  // Filters out locations which do not match passed in category
  filterLocations = (categoryId) => {

    let locations = this.state.locations;
    let filtered = {};

    //if no category specified, return locations unfiltered.
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
        selectedFilter: categoryId
      }
    );
  }

  changeLocation = (locationId) => {
    this.setState( (state) => {
      return {
        selectedLocation: locationId,
        previousLocation: state.selectedLocation
      };
    });
  }

  componentDidMount() {
    // set status to 'loading' to display on UI
    this.setState ( {statusMenuLoad: 1});

    let categories = Object.keys(this.state.categories);

    auxFunc.fetchPlaces(categories)
      .then( places => auxFunc.addGoogleAddresses(places))
      .then( placesWithAddr => auxFunc.addFQDetails(placesWithAddr))
      .then( placesWithDetails => {
          this.setState({ 
            locations: placesWithDetails,
            statusMenuLoad: 0 
          })
      })
      .catch( err => this.setState( {statusMenuLoad: 2}))
  }



  render() {
    return (
      <div className="row">
        <Menu 
          categories={this.state.categories} 
          filteredLocations={this.state.filteredLocations}
          statusMenuLoad={this.state.statusMenuLoad}
          changeFilter={this.changeFilter}
          selectedFilter={this.state.selectedFilter}
          selectedLocation={this.state.selectedLocation}
          changeLocation={this.changeLocation}
        />
        <Map 
          filteredLocations={this.state.filteredLocations}
          locations={this.state.locations}
          selectedLocation={this.state.selectedLocation}
          previousLocation={this.state.previousLocation}
          changeLocation={this.changeLocation}
        />
      </div>
    );
  }
}

export default App;
