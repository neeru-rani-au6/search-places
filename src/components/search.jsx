import React, { useState, useEffect, useRef } from 'react';
import './search.css';

const Search = ({ searchText, handleSearchTextChange }) => {
  const [isFocused, setIsFocused] = useState(false);
  const searchInputRef = useRef(null);


  const handleInputChange = (e) => {
    handleSearchTextChange(e.target.value)
  };

  // Focus the search input when Ctrl + / is pressed
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key === '/') {
        e.preventDefault(); // Prevent the default action of Ctrl + /
        if (searchInputRef.current) {
          searchInputRef.current.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);


  return (
    <div className="search-box-container">
      <input
        type="text"
        className={`search-box`}
        placeholder="Search places..."
        value={searchText}
        ref={searchInputRef}
        onChange={handleInputChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        disabled={false} // Set this to true if you want to disable it
      />
      <span className="keyboard-shortcut">Ctrl + /</span>
    </div>
  );
};

export default Search;
