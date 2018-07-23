import React, { Component } from 'react';
import './App.css';
import Menu from './rcMenu';
import Map from './rcMap';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: {
        'id1': 'cafes',
        'id2': 'restaurants',
        'id3': 'coffe'
      }
    }
  }
  
  render() {
    return (
      <div className="row">
        <Menu categories={this.state.categories}/>
        <Map />
      </div>
    );
  }
}

export default App;
