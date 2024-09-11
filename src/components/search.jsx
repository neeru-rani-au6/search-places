import React, { useState } from 'react';
import './search.css';

const Search = ({ searchText, handleSearchTextChange }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleInputChange = (e) => {
    handleSearchTextChange(e.target.value)
  };

  return (
    <div className="search-box-container">
      <input
        type="text"
        className={`search-box`}
        placeholder="Search places..."
        value={searchText}
        onChange={handleInputChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        disabled={false} // Set this to true if you want to disable it
      />
    </div>
  );
};

export default Search;
