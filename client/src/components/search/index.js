import React from 'react';
import PropTypes from 'prop-types'
import '../../App.css'
import './index.css';

class Search extends React.Component {
  render() {
    const { handleSearch } = this.props

    return (
      <div className="Search">
        <div className="main-search">
            <input type="text" id="filtro" placeholder="Search" onChange={handleSearch}/>
        </div>
      </div>
    );
  }

  PropTypes = {
    handleSearch: PropTypes.func.isRequired
  }
}

export default Search;