import React, { Component } from 'react';
import * as Const from './constants';

const google = window.google;

class Map extends Component {
  constructor(props) {
    super(props);

    // locations object will be extended with Google objects
    this.extendedLocations = {}; 
    this.googleMap;
    
  }

  initMap = () => {
    const map = new google.maps.Map(this.refs.map, {
      center: {lat: Const.mapCenterLat, lng: Const.mapCenterLng},
      zoom: Const.mapInitZoom,
      mapTypeId: Const.mapType,
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
        {
          featureType: 'poi',
          stylers: [{visibility: 'off'}]
        },
        {
          featureType: 'transit',
          stylers: [{visibility: 'off'}]
        }
      ]

    });
    return map;
  }

  initMarkers = (locations) => {
    Object.keys(locations).forEach (
      (locationId) => {
        // create the marker for this location
        let {lat, lng, name} = locations[locationId];
        let currentMarker = new google.maps.Marker({
          position: {lat,lng},
          title: name
        });
        currentMarker.addListener('click', () => {
          this.props.changeLocation(locationId);
        });
        
        currentMarker.setIcon       ('http://maps.google.com/mapfiles/ms/icons/blue-dot.png')
        // add the marker to this location's object
        locations[locationId].googleMapMarker = currentMarker;
      }
    );
    // return the updated locations objected with all the markers
    return locations;
  }

  clearAllMarkers(locationsWithMarkers) {
    for(let key of Object.keys(locationsWithMarkers)) {
      locationsWithMarkers[key].googleMapMarker.setMap(null);
    }
  }

  addFilteredMarkers(locationsWithMarkers, filteredLocations, map) {
    for(let key of Object.keys(filteredLocations)) {
      locationsWithMarkers[key].googleMapMarker.setMap(map);
    }
  }

  initInfoWindows = (locations) => {
    for(let id in locations) {
      let {name, address, website, rating, ratingCol} = locations[id];
      // create the InfoWin for this locations
      let currentInfoWin = new google.maps.InfoWindow({
        content: 
          `<div class="infowindow">
            <div class="infowindow__name">${name}</div>
            <div class="infowindow__address">${address}
            </div>
            <div class="infowindow__rating" 
              style="background-color: ${ratingCol}">${rating}
            </div>
            <a href=${website} target="_blank">More Info</a>
            <div class="infowindow__attribution">Provided by Google and Foursquare</div>
          </div>`
      });
      // add InfoWin to the location's object
      locations[id].googleInfoWin = currentInfoWin;
    }
    // return updated locations with the InfoWins added
    return locations;
  }

  clearAllInfoWin = (locationsWithInfoWin) => {
    for(let key of Object.keys(locationsWithInfoWin)) {
      locationsWithInfoWin[key].googleInfoWin.close();
    }
  }

  shouldComponentUpdate(nextProps) {

    let { 
          locations, 
          filteredLocations, 
          previousLocation, 
          selectedLocation } = nextProps;

    // when new locations received, extend with markers and info windows
    if(this.props.locations !== locations) {
      this.extendedLocations = this.initMarkers(locations);
      this.extendedLocations = this.initInfoWindows(locations);
    }

    // if filtered location list changed, clear previously opened markers and InfoWins and open the markers for the new list.
    if(this.props.filteredLocations !== filteredLocations) {
      if(this.extendedLocations) {
        this.clearAllInfoWin(this.extendedLocations);
        this.clearAllMarkers(this.extendedLocations);
        this.addFilteredMarkers(
            this.extendedLocations, 
            filteredLocations,
            this.googleMap
          );
      }
    }

    // if location selection has changed
    if(this.props.selectedLocation !== selectedLocation) {
      
      // if another location was selected before the new selection, reset marker color and close InfoWindow
      if(previousLocation) {
        let previousExtLocation = this.extendedLocations[previousLocation];
        previousExtLocation.googleMapMarker.setIcon('http://maps.google.com/mapfiles/ms/icons/blue-dot.png');
        previousExtLocation.googleInfoWin.close();
      }
      
      // change selected location's marker colour and open InfoWindow
      let selectedExtLocation = this.extendedLocations[selectedLocation];
      selectedExtLocation.googleMapMarker.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png');
      selectedExtLocation.googleInfoWin.open(
        this.googleMap, 
        selectedExtLocation.googleMapMarker
      );
    }

    // This method is used to detect props changes and call Google API accordingly, but always returns false because API takes care of map rendering, not React.
    return false;
  }

  componentDidMount() {
    this.googleMap = this.initMap();
  }

  render() {
    return (
      <div className="map" ref="map" role="application">
        Loading map ...
      </div>
      
    );
  }

}

export default Map;