import React from 'react';
import { TYPE_COLORS } from '../../utils/typeColors';
import './PokemonCard.css';

const PokemonCard = ({ pokemon, onClick }) => {
  const primaryType = pokemon.types?.[0] || 'normal';
  const bgColor = TYPE_COLORS[primaryType] || TYPE_COLORS.normal;

  return (
    <div 
      className="pokemon-card" 
      onClick={() => onClick(pokemon)}
      style={{ backgroundColor: bgColor }}
    >
      <div className="pokemon-card__id">
        #{String(pokemon.id).padStart(3, '0')}
      </div>
      
      <div className="pokemon-card__image-container">
        <img 
          src={pokemon.image} 
          alt={pokemon.name}
          className="pokemon-card__image"
        />
      </div>
      
      <div className="pokemon-card__info">
        <h3 className="pokemon-card__name">{pokemon.name}</h3>
        {pokemon.types?.[0] && (
          <span className="pokemon-card__type">{pokemon.types[0]}</span>
        )}
      </div>
    </div>
  );
};

export default PokemonCard;