import React from 'react';
import PropTypes from 'prop-types';

function LocationList({filteredLocations}) {
  return (
    <ul className="locations">
      {
        Object.keys(filteredLocations).map( 
          (locationId) => {
            return (
              <li 
                key={locationId} 
                value={locationId}
                className="locations__item">

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