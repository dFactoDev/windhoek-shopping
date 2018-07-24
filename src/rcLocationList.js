import React from 'react';
import PropTypes from 'prop-types';

function LocationList({locations}) {
  return (
    <ul className="locations">
      {
        locations.map( 
          (location) => {
            return (
              <li key={location.id} className="locations__item">
                {location.name}
              </li>
            );
          }
        )
      }
    </ul>
  );
}

LocationList.propTypes = {
  locations: PropTypes.array.isRequired
};

export default LocationList;