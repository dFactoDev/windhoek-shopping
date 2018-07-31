import React, { Component } from 'react';
import * as constants from './constants';

const google = window.google;

class Map extends Component {
  constructor(props) {
    super(props);

    this.extendedLocations;
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

  initInfoWindows = (locations) => {
    for(let locationId in locations) {
      let currentLocation = locations[locationId];
      let currentInfoWin = new google.maps.InfoWindow({
        content: `<div style="color: black">${currentLocation.address}</div>`
      });
      locations[locationId].googleInfoWin = currentInfoWin;
    }
    return locations;
  }

  shouldComponentUpdate(nextProps) {

    if(this.props.locations !== nextProps.locations) {
      this.extendedLocations = this.initMarkers(nextProps.locations);
      this.extendedLocations = this.initInfoWindows(nextProps.locations);
    }

    if(this.props.filteredLocations !== nextProps.filteredLocations) {
      if(this.extendedLocations) {
        this.clearAllMarkers(this.extendedLocations);
        this.addFilteredMarkers(
            this.extendedLocations, 
            nextProps.filteredLocations,
            this.googleMap
          );
      }
    }

    if(this.props.previousLocation !== nextProps.previousLocation) {
      let previousLocation = this.extendedLocations[nextProps.previousLocation];
      previousLocation.googleMapMarker.setIcon('http://maps.google.com/mapfiles/ms/icons/blue-dot.png');
      previousLocation.googleInfoWin.close();

    }

    if(this.props.currentLocation !== nextProps.currentLocation) {
      let currentLocation = this.extendedLocations[nextProps.currentLocation];
      currentLocation.googleMapMarker.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png');
      currentLocation.googleInfoWin.open(this.googleMap, currentLocation.googleMapMarker);
    }

    // This method is used to detect props changes and call Google API accordingly, but always returns false because API takes care of map rendering, not React.
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