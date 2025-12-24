import React, { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "./components/Header/Header";
import PokemonDetail from "./components/PokemonDetail/PokemonDetail";
import { pokemonService } from "./services/pokemonService";
import "./App.css";
import PokemonGrid from "./components/PokemonGrid/PokemonGrid";

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    offset: 0,
    limit: 20,
    hasMore: true,
  });

  useEffect(() => {
    fetchPokemonList(0, 20);
  }, []);

  const fetchPokemonList = async (offset, limit) => {
    setLoading(true);
    setError(null);

    try {
      const data = await pokemonService.getPokemonList(offset, limit);

      setPokemonList((prev) =>
        offset === 0 ? data.data : [...prev, ...data.data]
      );

      setPagination({
        offset: data.offset,
        limit: data.limit,
        hasMore: data.hasMore,
      });
    } catch (err) {
      toast.error("Failed to load Pokémon list");
      setError("Failed to load Pokémon list");
    } finally {
      setLoading(false);
    }
  };

  const fetchPokemonDetails = async (nameOrId) => {
    if (!nameOrId || !nameOrId.trim()) {
      toast.warning("Please enter a Pokémon name or ID");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await pokemonService.getPokemonDetails(nameOrId);
      setSelectedPokemon(data);
    } catch (err) {
      setSelectedPokemon(null);

      if (err.status === 404) {
        toast.error(err.message); // "Pokemon not found: hh"
      } else if (err.status === 400) {
        toast.warning(err.message);
      } else if (err.status === 503) {
        toast.error("PokéAPI service is unavailable. Try again later.");
      } else {
        toast.error("Something went wrong. Please try again.");
      }

      setError(err.message); // optional (for inline error UI)
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      fetchPokemonDetails(searchQuery.trim());
    }
  };

  const handleExampleClick = (name) => {
    setSearchQuery(name);
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
    setSearchQuery("");
  };

  return (
    <div className="app">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        limit={3}
      />

      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSearch={handleSearch}
        onExampleClick={handleExampleClick}
        onTitleClick={handleBackToHome}
        showBackButton={!!selectedPokemon}
      />

      {selectedPokemon ? (
        <PokemonDetail pokemon={selectedPokemon} onBack={handleBackToHome} />
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
