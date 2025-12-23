import React, { useState, useEffect } from 'react';
import Header from './components/Header/Header';
import PokemonDetail from './components/PokemonDetail/PokemonDetail';
import { pokemonService } from './services/pokemonService';
import './App.css';
import PokemonGrid from './components/PokemonGrid/PokemonGrid';

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    offset: 0,
    limit: 20,
    hasMore: true
  });

  useEffect(() => {
    fetchPokemonList(0, 20);
  }, []);

  const fetchPokemonList = async (offset, limit) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await pokemonService.getPokemonList(offset, limit);
      
      if (offset === 0) {
        setPokemonList(data.data);
      } else {
        setPokemonList(prev => [...prev, ...data.data]);
      }
      
      setPagination({
        offset: data.offset,
        limit: data.limit,
        hasMore: data.hasMore
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchPokemonDetails = async (nameOrId) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await pokemonService.getPokemonDetails(nameOrId);
      setSelectedPokemon(data);
    } catch (err) {
      setError(err.message);
      alert('Pokémon not found. Please try another name or ID.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      fetchPokemonDetails(searchQuery.trim());
      // Removed setSearchQuery('') to keep the text in search bar
    }
  };

  const handleExampleClick = (name) => {
    setSearchQuery(name); // Update search bar with the example name
    fetchPokemonDetails(name);
  };

  const handleCardClick = (pokemon) => {
    fetchPokemonDetails(pokemon.name);
  };

  const handleLoadMore = () => {
    const nextOffset = pagination.offset + pagination.limit;
    fetchPokemonList(nextOffset, pagination.limit);
  };

  const handleBackToHome = () => {
    setSelectedPokemon(null);
    setSearchQuery(''); // Clear search when going back to grid
  };

  return (
    <div className="app">
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSearch={handleSearch}
        onExampleClick={handleExampleClick}
        onTitleClick={handleBackToHome}
        showBackButton={!!selectedPokemon}
      />

      {error && (
        <div className="app__error">
          {error}
        </div>
      )}

      {selectedPokemon ? (
        <PokemonDetail
          pokemon={selectedPokemon}
          onBack={handleBackToHome}
        />
      ) : (
        <PokemonGrid
          pokemonList={pokemonList}
          loading={loading}
          hasMore={pagination.hasMore}
          onLoadMore={handleLoadMore}
          onCardClick={handleCardClick}
        />
      )}
    </div>
  );
}

export default App;