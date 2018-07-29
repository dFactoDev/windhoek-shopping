import React, { Component } from 'react';
import * as constants from './constants';

const google = window.google;

class Map extends Component {
  constructor(props) {
    super(props);

    this.locationsWithMarkers;
    this.googleMap;
    
  }

  initMap = () => {
    const map = new google.maps.Map(this.refs.map, {
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
    return map;
  }

  initMarkers = (locations) => {
    Object.keys(locations).forEach (
      (locationId) => {
        let currentLocation = locations[locationId];
        let currentMarker = new google.maps.Marker({
          position: { 
            lat: currentLocation.lat,
            lng: currentLocation.lng
          },
          title: currentLocation.name
        });
        currentMarker.addListener('click', () => {
          this.props.changeLocation(locationId);
        });
        currentMarker.setIcon('http://maps.google.com/mapfiles/ms/icons/blue-dot.png')
        locations[locationId].googleMapMarker = currentMarker;
      }
    );
    return locations;
  }

  clearAllMarkers(locationsWithMarkers) {
    for(let key of Object.keys(locationsWithMarkers)) {
      locationsWithMarkers[key].googleMapMarker.setMap(null);
    }
  }

  addFilteredMarkers(locationsWithMarkers, filteredLocations, map) {
    for(let filterKey of Object.keys(filteredLocations)) {
      locationsWithMarkers[filterKey].googleMapMarker.setMap(map);
    }
  }

  shouldComponentUpdate(nextProps) {
    // This method is used to detect props changes and call Google API accordingly, but always returns false because API takes care of map rendering, not React.

    if(this.props.locations !== nextProps.locations) {
      this.locationsWithMarkers = this.initMarkers(nextProps.locations);
    }

    if(this.props.filteredLocations !== nextProps.filteredLocations) {
      if(this.locationsWithMarkers) {
        this.clearAllMarkers(this.locationsWithMarkers);
        this.addFilteredMarkers(
            this.locationsWithMarkers, 
            nextProps.filteredLocations,
            this.googleMap
          );
      }
    }

    if(this.props.previousLocation !== nextProps.previousLocation) {
      this.locationsWithMarkers[nextProps.previousLocation].googleMapMarker
      .setIcon('http://maps.google.com/mapfiles/ms/icons/blue-dot.png');
    }

    if(this.props.currentLocation !== nextProps.currentLocation) {
      this.locationsWithMarkers[nextProps.currentLocation].googleMapMarker
      .setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png');
    }

    return false;
  }

  componentDidMount() {
    this.googleMap = this.initMap();
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