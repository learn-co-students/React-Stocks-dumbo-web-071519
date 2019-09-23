import React from 'react';

const SearchBar = (props) => {
  return (
    <div>

      <strong>Sort by:</strong>
      <label>
        <input type="radio" value="Alphabetically" checked={props.selectedOption === 'Alphabetically'}  onChange={e => props.handleSortChange(e)}/>
        Alphabetically
      </label>
      <label>
        <input type="radio" value="Price" checked={props.selectedOption === 'Price'} onChange={e=>props.handleSortChange(e)}/>
        Price
      </label>
      <br/>

      <label>
        <strong>Filter:</strong>
        <select onChange={ e=>props.handleFilterChange(e)}>
          <option value="Tech" name="Tech">Tech</option>
          <option value="Sportswear" name="Sportswear">Sportswear</option>
          <option value="Finance" name="Finance">Finance</option>
        </select>
      </label>


    </div>
  );
}


export default SearchBar;
