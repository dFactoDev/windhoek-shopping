import React from 'react';
import PropTypes from 'prop-types';

function LocationList({locations}) {
  let locationIDs = Object.getOwnPropertyNames(locations);
  return (
    <ul className="locations">
      {
        locationIDs.map( 
          (id) => {
            return (
              <li key={id} className="locations__item">
                {locations[id]}
              </li>
            );
          }
        )
      }
    </ul>
  );
}

LocationList.propTypes = {
  locations: PropTypes.object.isRequired
};

export default LocationList;