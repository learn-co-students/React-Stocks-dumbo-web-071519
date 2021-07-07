import React from 'react';

const SearchBar = (props) => {
  
  const onChangeHendler = (event)=>{
    return props.sortHendler(event.target.value) 
  }
  return (
    <div>

      <strong>Sort by:</strong>
      <label>
        <input type="radio" value="Alphabetically" checked={props.selectedOption === 'Alphabetically'} onChange={onChangeHendler}/>
        Alphabetically
      </label>
      <label>
        <input type="radio" value="Price" checked={props.selectedOption === 'Price'} onChange={onChangeHendler}/>
        Price
      </label>
      <br/>

      <label>
        <strong>Filter:</strong>
        <select onChange={(event) => { props.filterHendler(event.target.value)}}>
          <option value="Tech">Tech</option>
          <option value="Sportswear">Sportswear</option>
          <option value="Finance">Finance</option>
        </select>
      </label>

{/*  */}
    </div>
  );
}


export default SearchBar;
