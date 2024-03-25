import React, { useState, useEffect, ChangeEvent } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';
import styles from './Search.module.css';
import { useNavigate, useLocation } from 'react-router-dom';

interface SearchProps {
  onSearch: (query: string) => void;
  onClear: () => void;
}

function Search({ onSearch, onClear }: SearchProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [query, setQuery] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchQuery = params.get('q');
    if (searchQuery) {
      setQuery(searchQuery);
      onSearch(searchQuery);
    }
  }, [location.search, onSearch]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
  };

  const handleClear = () => {
    setQuery('');
    onClear();
    navigate('/');
  };

  const handleSearch = () => {
    navigate(`/?q=${query}`);
    onSearch(query);
  };

  return (
    <div className={styles.searchContainer}>
      <input
        className={styles.searchInput}
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleInputChange}
      />
      {query && (
        <button onClick={handleClear} className={styles.clearButton}>
          <FaTimes />
        </button>
      )}
      {query.length >= 2 && (
        <button onClick={handleSearch} className={styles.searchButton}>
          <FaSearch />
        </button>
      )}
    </div>
  );
}

export default Search;
