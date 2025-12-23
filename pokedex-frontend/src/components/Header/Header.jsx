import React from 'react';
import './Header.css';

const Header = ({ 
  searchQuery, 
  onSearchChange, 
  onSearch, 
  onExampleClick,
  onTitleClick,
  showBackButton
}) => {
  const exampleSearches = ['Pikachu', 'Charizard', 'Bulbasaur', 'Mew'];

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <header className="header">
      <h1 
        className="header__title" 
        onClick={onTitleClick}
        style={{ cursor: 'pointer' }}
      >
        Pokédex
      </h1>
      
      <div className="header__search">
        <input
          type="text"
          className="header__search-input"
          placeholder="Search eg. ditto or pikachu"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button 
          className="header__search-button" 
          onClick={onSearch}
        >
          Search
        </button>
      </div>

      <div className="header__examples">
        {exampleSearches.map(name => (
          <button
            key={name}
            className="header__example-button"
            onClick={() => onExampleClick(name)}
          >
            {name}
          </button>
        ))}
      </div>
    </header>
  );
};

export default Header;