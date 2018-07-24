import React, { Component } from 'react';
import './App.css';
import Menu from './rcMenu';
import Map from './rcMap';
import { fetchPlaces } from './auxFunctions';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: {
        '4bf58dd8d48988d127951735': 'Arts & Crafts',
        '52f2ab2ebcbc57f1066b8b32': 'Baby',
        '4bf58dd8d48988d114951735': 'Books',
        '4bf58dd8d48988d103951735': 'Clothing',
        '4bf58dd8d48988d10c951735': 'Cosmetics',
        '4bf58dd8d48988d122951735': 'Electronics',
        '4bf58dd8d48988d1f8941735': 'Furniture & Home',
        '52f2ab2ebcbc57f1066b8b1b': 'Souvenirs',
        '4bf58dd8d48988d1fd941735': 'Malls'
      },
      locations: []
    }
  }
  
  componentDidMount() {
    fetchPlaces(Object.keys(this.state.categories)).then(
      (places) => {
        this.setState( {locations: places})
      }
    )
  }

  render() {
    return (
      <div className="row">
        <Menu 
          categories={this.state.categories} 
          locations={this.state.locations}
        />
        <Map />
      </div>
    );
  }
}

export default App;
