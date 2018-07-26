import React, { Component } from 'react';
import './App.css';
import Menu from './rcMenu';
import Map from './rcMap';
import { fetchPlaces, venuesArrToObj } from './auxFunctions';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: {
        '4bf58dd8d48988d127951735': 'Arts & Crafts',
        '4bf58dd8d48988d114951735': 'Books',
        '4bf58dd8d48988d103951735': 'Clothing',
        '4bf58dd8d48988d10c951735': 'Cosmetics',
        '4bf58dd8d48988d122951735': 'Electronics',
        '4bf58dd8d48988d1f8941735': 'Furniture & Home',
        '4bf58dd8d48988d1fd941735': 'Malls'
      },
      locations: {},
      filteredLocations: {},
      statusMenuLoad: 0,
      statusMapLoad: 0,
      currentFilter: ''
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
    });
  }

  componentDidMount() {
    this.setState ( {statusMenuLoad: 0});
    fetchPlaces(Object.keys(this.state.categories))
      .then( (places) => {
        const locations = venuesArrToObj(places);
        this.setState( { locations: locations, statusMenuLoad: 1 });
      })
      .catch( (err) => {
        this.setState( {statusMenuLoad: 2})
      });
  }

  render() {
    return (
      <div className="row">
        <Menu 
          categories={this.state.categories} 
          filteredLocations={this.state.filteredLocations}
          statusMenuLoad={this.state.statusMenuLoad}
          changeFilter={this.changeFilter}
          currentFilter={this.state.currentFilter}
        />
        <Map statusMapLoad={this.state.statusMapLoad}/>
      </div>
    );
  }
}

export default App;
