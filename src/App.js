import React, { Component } from 'react';
import './App.css';
import Menu from './rcMenu';
import Map from './rcMap';

class App extends Component {
  render() {
    return (
      <div className="row">
        <Menu />
        <Map />
      </div>
    );
  }
}

export default App;
