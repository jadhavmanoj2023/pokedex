import React from 'react';
import { TYPE_COLORS } from '../../utils/typeColors';
import './PokemonDetail.css';

const PokemonDetail = ({ pokemon, onBack }) => {
  const primaryType = pokemon.types?.[0] || 'normal';
  const secondaryType = pokemon.types?.[1];
  const bgColor = TYPE_COLORS[primaryType] || TYPE_COLORS.normal;
  const secondaryColor = secondaryType ? TYPE_COLORS[secondaryType] : null;

  const backgroundStyle = secondaryColor
    ? { background: `linear-gradient(135deg, ${bgColor} 0%, ${secondaryColor} 100%)` }
    : { backgroundColor: bgColor };

  return (
    <div className="detail-page" style={backgroundStyle}>
      {/* Decorative Pokeball backgrounds */}
      <div className="detail-page__pokeball detail-page__pokeball--1"></div>
      <div className="detail-page__pokeball detail-page__pokeball--2"></div>
      <div className="detail-page__pokeball detail-page__pokeball--3"></div>
      
      <div className="detail-wrapper">
        {/* Left side - Image and basic info */}
        <div className="detail-left">
          <div className="detail-left__header">
            <h1 className="detail__name">{pokemon.name}</h1>
            <span className="detail__id">
              #{String(pokemon.id).padStart(3, '0')}
            </span>
          </div>

          <div className="detail__image-container">
            <div className="detail__image-bg"></div>
            <img 
              src={pokemon.image} 
              alt={pokemon.name}
              className="detail__image"
            />
          </div>

          <div className="detail__type-badges">
            {pokemon.types?.map(type => (
              <span 
                key={type} 
                className="detail__type-badge"
                style={{ backgroundColor: TYPE_COLORS[type] }}
              >
                {type}
              </span>
            ))}
          </div>
        </div>

        {/* Right side - Details */}
        <div className="detail-right">
          <div className="detail__content">
            <p className="detail__description">{pokemon.description}</p>

            <div className="detail__info-grid">
              <div className="detail__info-card">
                <span className="detail__info-label">Height</span>
                <span className="detail__info-value">
                  {(pokemon.height / 10).toFixed(1)} m
                </span>
              </div>
              <div className="detail__info-card">
                <span className="detail__info-label">Weight</span>
                <span className="detail__info-value">
                  {(pokemon.weight / 10).toFixed(1)} kg
                </span>
              </div>
            </div>

            <div className="detail__section">
              <h3 className="detail__section-title">Abilities</h3>
              <div className="detail__abilities-list">
                {pokemon.abilities?.map((ability, idx) => (
                  <span key={idx} className="detail__ability-badge">
                    {ability}
                  </span>
                ))}
              </div>
            </div>

            <div className="detail__section">
              <h3 className="detail__section-title">Base Stats</h3>
              <div className="detail__stats-list">
                {pokemon.stats && Object.entries(pokemon.stats).map(([stat, value]) => (
                  <div key={stat} className="detail__stat-row">
                    <span className="detail__stat-name">
                      {stat.replace('-', ' ')}
                    </span>
                    <div className="detail__stat-bar-container">
                      <div 
                        className="detail__stat-bar"
                        style={{ width: `${(value / 255) * 100}%` }}
                      />
                    </div>
                    <span className="detail__stat-number">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;