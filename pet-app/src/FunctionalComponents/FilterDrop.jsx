import React, { useState } from 'react';
import '../Css/FilterDrop.css';

const FilterDropdown = ({ onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    breed: '',
    org: '',
    age: ''
  });

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setSelectedFilters(prevState => ({
      ...prevState,
      [name]: value
    }));
    onFilterChange({ ...selectedFilters, [name]: value });
  };

  return (
    <div className="dropdown-container">
      <button
        onClick={toggleDropdown}
        className="dropdown-toggle"
      >
        Filters ▼
      </button>

      {isOpen && (
        <div className="dropdown-menu">
          <div className="dropdown-section">
            <h4>Breed</h4>
            <select 
              name="breed" 
              className="dropdown-select"
              onChange={handleFilterChange}
            >
              <option value="">All</option>
              <option value="Golden Retriever">Golden Retriever</option>
              <option value="Persian">Persian</option>
              <option value="Beagle">Beagle</option>
            </select>
          </div>
          <div className="dropdown-section">
            <h4>Organization</h4>
            <select 
              name="org" 
              className="dropdown-select"
              onChange={handleFilterChange}
            >
              <option value="">All</option>
              <option value="Happy Paws">Happy Paws</option>
              <option value="Pet Haven">Pet Haven</option>
              <option value="Animal Care">Animal Care</option>
            </select>
          </div>
          <div className="dropdown-section">
            <h4>Age</h4>
            <select 
              name="age" 
              className="dropdown-select"
              onChange={handleFilterChange}
            >
              <option value="">All</option>
              <option value="Puppy/Kitten">Puppy/Kitten</option>
              <option value="Young">Young</option>
              <option value="Adult">Adult</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;
