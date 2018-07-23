import React from 'react';
import PropTypes from 'prop-types';

export function CategoryFilter ({categories}) {
  let categoryIDs = Object.getOwnPropertyNames(categories);
  return (
    <select className="menu__selector">
      {
        categoryIDs.map(
          (id) => {
            return (
              <option key={id}>{categories[id]}</option>
            );
          })
      }
    </select>
  );
}

CategoryFilter.propTypes = {
  categories: PropTypes.object.isRequired
}
