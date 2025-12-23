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
      
      <div className="detail-container">
        {/* Header with name and ID side by side */}
        <div className="detail-header">
          <h1 className="detail-header__name">{pokemon.name}</h1>
          <span className="detail-header__id">#{String(pokemon.id).padStart(3, '0')}</span>
        </div>

        {/* Main content grid */}
        <div className="detail-grid">
          {/* Left side - Image */}
          <div className="detail-image-section">
            <img 
              src={pokemon.image} 
              alt={pokemon.name}
              className="detail-image-section__img"
            />
          </div>

          {/* Right side - All details */}
          <div className="detail-info">
            {/* Description */}
            <div className="detail-section">
              <p className="detail-description">{pokemon.description}</p>
            </div>

            {/* Height and Weight */}
            <div className="detail-section">
              <div className="detail-physical">
                <div className="detail-physical__item">
                  <span className="detail-physical__label">Height</span>
                  <span className="detail-physical__value">{(pokemon.height / 10).toFixed(1)} m</span>
                </div>
                <div className="detail-physical__item">
                  <span className="detail-physical__label">Weight</span>
                  <span className="detail-physical__value">{(pokemon.weight / 10).toFixed(1)} kg</span>
                </div>
              </div>
            </div>

            {/* Type */}
            <div className="detail-section">
              <h3 className="detail-section__title">Type</h3>
              <div className="detail-types">
                {pokemon.types?.map(type => (
                  <span 
                    key={type} 
                    className="detail-types__badge"
                    style={{ backgroundColor: TYPE_COLORS[type] }}
                  >
                    {type}
                  </span>
                ))}
              </div>
            </div>

            {/* Abilities */}
            <div className="detail-section">
              <h3 className="detail-section__title">Abilities</h3>
              <div className="detail-abilities">
                {pokemon.abilities?.map((ability, idx) => (
                  <span key={idx} className="detail-abilities__badge">
                    {ability}
                  </span>
                ))}
              </div>
            </div>

            {/* Base Stats */}
            <div className="detail-section">
              <h3 className="detail-section__title">Base Stats</h3>
              <div className="detail-stats">
                {pokemon.stats && Object.entries(pokemon.stats).map(([stat, value]) => {
                  const maxStat = 255;
                  const percentage = (value / maxStat) * 100;
                  
                  // Determine color based on stat value
                  let statColor = '#10b981'; // green
                  if (value >= 150) statColor = '#8b5cf6'; // purple - excellent
                  else if (value >= 100) statColor = '#3b82f6'; // blue - great
                  else if (value >= 70) statColor = '#10b981'; // green - good
                  else if (value >= 40) statColor = '#f59e0b'; // orange - average
                  else statColor = '#ef4444'; // red - low

                  return (
                    <div key={stat} className="detail-stats__row">
                      <span className="detail-stats__name">
                        {stat.replace('-', ' ')}
                      </span>
                      <div className="detail-stats__bar-container">
                        <div 
                          className="detail-stats__bar"
                          style={{ 
                            width: `${percentage}%`,
                            backgroundColor: statColor
                          }}
                        />
                      </div>
                      <span className="detail-stats__value">{value}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;