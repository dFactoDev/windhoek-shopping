import React, {Component} from 'react';
import PropTypes from 'prop-types';

class CategoryFilter extends Component {
  
  constructor(props) {
    super(props);

    props.changeFilter();

  }

  categoryIDs = Object.keys(this.props.categories);
  
  render () {
    return (
      <label for="Categories">
        <select 
          className="menu__selector" 
          onChange={(e) => {
            this.props.changeFilter(e.target.value);
          }}
          value={this.props.selectedFilter}>
          <option key='0' value='0'>All</option>
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
      </label>
    )
  }
}

CategoryFilter.propTypes = {
  categories: PropTypes.object.isRequired
}

export default CategoryFilter;