import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import './CharactersDetails.css'

/**
 * Página de detalles de personaje
 * Obtiene el ID del personaje de los parámetros de la URL
 * Consulta la API para obtener información completa del personaje
 */
const CharactersDetails = () => {
    const { id } = useParams()
    const [character, setCharacter] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    // Obtiene los detalles del personaje de la API
    useEffect(() => {
        const fetchCharacter = async () => {
            try {
                setLoading(true)
                setError('')

                const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`)
                if (!response.ok) {
                    throw new Error('No se pudo cargar el detalle del personaje')
                }

                const data = await response.json()
                setCharacter(data)
            } catch (err) {
                setCharacter(null)
                setError(err.message || 'Error inesperado al consultar el personaje')
            } finally {
                setLoading(false)
            }
        }

        fetchCharacter()
    }, [id])

    return (
        <section className="characters-details">
            {/* Estado de carga */}
            {loading && <p className="characters-details-loading">Cargando detalle...</p>}

            {/* Manejo de errores */}
            {error && (
                <div className="characters-details-error">
                    <p>{error}</p>
                    <Link to="/characters" className="characters-details-link">Volver a personajes</Link>
                </div>
            )}

            {/* Contenido: detalles del personaje */}
            {!loading && !error && character && (
                <article className="characters-details-card">
                    <img src={character.image} alt={character.name} className="characters-details-image" />
                    <div className="characters-details-info">
                        <h2>{character.name}</h2>
                        <p><strong>Especie:</strong> {character.species}</p>
                        <p><strong>Estado:</strong> {character.status}</p>
                        <p><strong>Género:</strong> {character.gender}</p>
                        <Link to="/characters" className="characters-details-link">Volver a personajes</Link>
                    </div>
                </article>
            )}
        </section>
    )
}

export default CharactersDetails