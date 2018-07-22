import React, { Component } from 'react';

class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isClosed : false
    }
  };

  render() {
    return (
      <div className="map">Loading map ...</div>
    );
  }

}

export default Map;