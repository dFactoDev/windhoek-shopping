import React, {Component} from 'react';
import PropTypes from 'prop-types';

class CategoryFilter extends Component {
  
  constructor(props) {
    super(props);

    props.renderFiltered();

  }

  categoryIDs = Object.getOwnPropertyNames(this.props.categories);
  
  render () {
    return (
      <select className="menu__selector" onChange={(e) => {
        this.props.renderFiltered(e.target.value);
      }}>
        {
          this.categoryIDs.map(
            (id) => {
              return (
                <option key={id} value={id}>
                  {this.props.categories[id]}
                </option>
              );
            }
          )
        }
      </select>
    )
  }
}

CategoryFilter.propTypes = {
  categories: PropTypes.object.isRequired
}

export default CategoryFilter;