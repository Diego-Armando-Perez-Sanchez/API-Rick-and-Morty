import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faGhost, faLayerGroup, faRobot, faUser, faUserAstronaut } from '@fortawesome/free-solid-svg-icons'
import './Filter.css'

/**
 * Página de filtrado por especie
 * Muestra un hero section con opciones de filtrado por especie:
 * Human, Alien, Robot, Mythological Creature
 * Incluye opción para ver todos los personajes
 */
const Filter = () => {
    // Opciones de filtrado disponibles
    const filterOptions = [
        { label: 'Human', species: 'Human', icon: faUser },
        { label: 'Alien', species: 'Alien', icon: faUserAstronaut },
        { label: 'Robot', species: 'Robot', icon: faRobot },
        { label: 'Mythological Creature', species: 'Mythological%20Creature', icon: faGhost }
    ]

    return (
        <section className="filter">
            {/* Hero section con título e instrucciones */}
            <div className="filter-hero">
                <div className="filter-hero-bg"></div>
                <div className="filter-hero-content">
                    <h1>Explora por Especie</h1>
                    <p>Descubre los personajes de Rick and Morty filtrados por su especie. Selecciona una categoría para comenzar.</p>
                </div>
            </div>

            {/* Grid de tarjetas de filtrado */}
            <div className="filter-container">
                <div className="filters-grid">
                    {filterOptions.map((option) => (
                        <Link
                            key={option.species}
                            to={`/characters?species=${option.species}`}
                            className="filter-card"
                        >
                            <span className="filter-card-icon">
                                <FontAwesomeIcon icon={option.icon} aria-hidden="true" />
                            </span>
                            <span className="filter-card-label">{option.label}</span>
                            <span className="filter-card-arrow">
                                <FontAwesomeIcon icon={faArrowRight} aria-hidden="true" />
                            </span>
                        </Link>
                    ))}
                </div>

                {/* Botón para ver todos los personajes */}
                <div className="filter-actions">
                    <Link className="filter-all" to="/characters">
                        <FontAwesomeIcon icon={faLayerGroup} aria-hidden="true" />
                        Ver todos los personajes
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default Filter
