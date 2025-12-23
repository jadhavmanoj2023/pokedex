import React from 'react';
import PokemonCard from '../PokemonCard/PokemonCard';
import './PokemonGrid.css';

const PokemonGrid = ({ 
  pokemonList, 
  loading, 
  hasMore, 
  onLoadMore, 
  onCardClick 
}) => {
  return (
    <div className="pokemon-grid-container">
      <div className="pokemon-grid">
        {pokemonList.map(pokemon => (
          <PokemonCard
            key={pokemon.id}
            pokemon={pokemon}
            onClick={onCardClick}
          />
        ))}
      </div>

      {loading && (
        <div className="pokemon-grid__loading">
          <div className="pokemon-grid__spinner"></div>
          <p>Loading Pokémon...</p>
        </div>
      )}

      {!loading && hasMore && (
        <div className="pokemon-grid__load-more">
          <button 
            className="pokemon-grid__load-more-button"
            onClick={onLoadMore}
          >
            Load More Pokémon
          </button>
        </div>
      )}

      {!loading && !hasMore && pokemonList.length > 0 && (
        <div className="pokemon-grid__end-message">
          You've reached the end! All Pokémon loaded.
        </div>
      )}
    </div>
  );
};

export default PokemonGrid;