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
        'id1': 'cafes',
        'id2': 'restaurants',
        'id3': 'coffe'
      },
      locations: {
        'id1': 'Cafe1',
        'id2': 'Restaurant2',
        'id3': 'Coffe Shop'
      }
    }
  }
  
  componentDidMount() {
    fetchPlaces(['4bf58dd8d48988d127951735', '52f2ab2ebcbc57f1066b8b32' ]).then(
      (json) => console.log(json)
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
