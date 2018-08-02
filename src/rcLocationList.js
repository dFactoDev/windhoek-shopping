import React from 'react';
import PropTypes from 'prop-types';

function LocationList({filteredLocations, currentLocation, changeLocation}) {
  return (
    <ul className="locations">
      {
        Object.keys(filteredLocations).map( 
          (locationId) => {

            let className;
            locationId === currentLocation 
            ? className = 'locations__item locations__item--selected'
            : className = 'locations__item'

            return (
              <li 
                key={locationId} 
                value={locationId}
                className={className}
                onClick={() => changeLocation(locationId) }
                onFocus={() => changeLocation(locationId) }>
                {filteredLocations[locationId].name}
              </li>
            );
          }
        )
      }
    </ul>
  );
}

LocationList.propTypes = {
  filteredLocations: PropTypes.object.isRequired
};

export default LocationList;