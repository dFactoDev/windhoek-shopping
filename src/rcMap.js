import React, { Component } from 'react';
import * as constants from './constants';

const google = window.google;

class Map extends Component {
  constructor(props) {
    super(props);

  };

  componentDidMount() {
    new google.maps.Map(this.refs.map, {
      center: {lat: constants.mapCenterLat, lng: constants.mapCenterLng},
      zoom: constants.mapInitZoom,
      mapTypeId: constants.mapType,
      disableDefaultUI: true,
      zoomControl: true,
      scaleControl: true,
      streetViewControl: false,
      rotateControl: true,
      fullscreenControl: true,
      mapTypeControl: true,
      mapTypeControlOptions: {
        style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
        position: google.maps.ControlPosition.TOP_RIGHT
      },
      styles: [
        {featureType: 'poi',
        stylers: [{visibility: 'off'}]},
        {featureType: 'transit',
        stylers: [{visibility: 'off'}]}
      ]

    });
  }

  render() {
    return (
      <div className="map" ref="map">
        Loading map ...
      </div>
      
    );
  }

}

export default Map;