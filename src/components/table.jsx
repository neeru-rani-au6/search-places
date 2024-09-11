import React, { useState } from 'react';
import './table.css';
import GetAllCountry from '../hooks/getAllCountry';

const Table = ({ searchText }) => {
  const url = "https://wft-geo-db.p.rapidapi.com/v1/geo/cities";
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const { cities, loading, error, metaData } = GetAllCountry(url, itemsPerPage, currentPage, searchText);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;


  const totalPages = Math.ceil(metaData.totalCount / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleItemsPerPageChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 10) {
      alert('Can not fetch more than 10 items per page')
    }
    if (value >= 5 && value <= 10) {
      setItemsPerPage(value);
      setCurrentPage(1); // Reset to first page when changing the number of items per page
    }
  };

  return (
    <div className='table'>
      <table className="custom-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>City</th>
            <th>Country</th>
          </tr>
        </thead>
        <tbody>
          {cities.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.city}</td>
              <td>{item.country}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination-container">
        <div className="pagination">
          <button onClick={handlePreviousPage} disabled={currentPage === 1}>
            Previous
          </button>
          <button onClick={handleNextPage} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
        <div className="items-per-page">
          <label htmlFor="itemsPerPage">Cities per page: </label>
          <input
            id="itemsPerPage"
            type="number"
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            min="5"
            max="10"
          />
        </div>
      </div>
    </div>
  );
};

export default Table;
