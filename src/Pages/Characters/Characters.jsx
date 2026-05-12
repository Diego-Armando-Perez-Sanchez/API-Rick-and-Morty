import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight, faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons'
import CardCharacter from '../../Components/CardCharacter/CardCharacter.jsx'
import './Characters.css'

// ===== CONSTANTS =====
const CHARACTERS_PER_PAGE = 12

/**
 * Genera los números de página a mostrar en paginación
 * Muestra: primera, última y páginas alrededor de la actual
 * Agrega elipsis (...) cuando hay gaps entre números
 */
const buildPageItems = (currentPage, totalPages) => {
    if (totalPages <= 7) {
        return Array.from({ length: totalPages }, (_, index) => index + 1)
    }

    const pages = new Set([1, totalPages, currentPage])

    if (currentPage <= 3) {
        pages.add(2)
        pages.add(3)
        pages.add(4)
    } else if (currentPage >= totalPages - 2) {
        pages.add(totalPages - 1)
        pages.add(totalPages - 2)
        pages.add(totalPages - 3)
    } else {
        pages.add(currentPage - 1)
        pages.add(currentPage + 1)
    }

    return Array.from(pages)
        .filter((page) => page >= 1 && page <= totalPages)
        .sort((a, b) => a - b)
        .reduce((result, page, index, sortedPages) => {
            if (index > 0 && page - sortedPages[index - 1] > 1) {
                result.push(`ellipsis-${sortedPages[index - 1]}`)
            }
            result.push(page)
            return result
        }, [])
}

/**
 * Characters Page - Listado de personajes
 * Características:
 * - Búsqueda en tiempo real por nombre
 * - Filtrado por especie desde query params
 * - Paginación inteligente (12 personajes por página)
 * - Carga de todos los personajes + filtrado en cliente
 */
const Characters = () => {
    // ===== STATE =====
    const [characters, setCharacters] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [searchParams] = useSearchParams()
    const [searchName, setSearchName] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [retryCount, setRetryCount] = useState(0)

    const species = searchParams.get('species')

    // Reinicia paginación cuando cambian filtro o búsqueda
    useEffect(() => {
        setCurrentPage(1)
    }, [species, searchName])

    // Obtiene personajes de la API
    useEffect(() => {
        const fetchCharacters = async () => {
            const createCharacterUrl = (page) => {
                const url = new URL('https://rickandmortyapi.com/api/character')
                if (species) {
                    url.searchParams.set('species', species)
                }
                url.searchParams.set('page', String(page))
                return url.toString()
            }

            try {
                setLoading(true)
                setError('')

                const firstResponse = await fetch(createCharacterUrl(1))
                if (!firstResponse.ok) {
                    throw new Error('No se pudieron cargar los personajes')
                }

                const firstData = await firstResponse.json()
                const totalPages = firstData.info?.pages ?? 1

                // Carga todas las páginas en paralelo
                const remainingPages = await Promise.all(
                    Array.from({ length: Math.max(totalPages - 1, 0) }, (_, index) => index + 2).map(async (page) => {
                        const response = await fetch(createCharacterUrl(page))
                        if (!response.ok) {
                            throw new Error('No se pudieron cargar los personajes')
                        }
                        return response.json()
                    })
                )

                const allCharacters = [firstData, ...remainingPages].flatMap((page) => page.results ?? [])
                setCharacters(allCharacters)
            } catch (err) {
                setCharacters([])
                setError(err.message || 'Ocurrió un error inesperado')
            } finally {
                setLoading(false)
            }
        }

        fetchCharacters()
    }, [species, retryCount])

    // ===== FILTERING & PAGINATION =====
    // Filtra personajes por nombre (búsqueda en cliente)
    const filteredCharacters = characters.filter((character) =>
        character.name.toLowerCase().includes(searchName.toLowerCase())
    )

    // Calcula datos de paginación
    const totalPages = Math.max(1, Math.ceil(filteredCharacters.length / CHARACTERS_PER_PAGE))
    const safeCurrentPage = Math.min(currentPage, totalPages)
    const startIndex = (safeCurrentPage - 1) * CHARACTERS_PER_PAGE
    const endIndex = startIndex + CHARACTERS_PER_PAGE
    const visibleCharacters = filteredCharacters.slice(startIndex, endIndex)
    const pageItems = buildPageItems(safeCurrentPage, totalPages)

    const goToPage = (page) => {
        const nextPage = Math.min(Math.max(page, 1), totalPages)
        setCurrentPage(nextPage)
    }

    return (
        <section className='characters-page'>
            {/* ===== HEADER =====  */}
            <div className='characters-header'>
                <div className='characters-header-content'>
                    <div>
                        <h2>Todos los personajes</h2>
                        {species && <p className='characters-filter-info'>Filtro activo: {species}</p>}
                    </div>

                    {/* Barra de búsqueda y opciones */}
                    <div className='characters-header-actions'>
                        <div className='characters-search'>
                            <span className='characters-search-icon' aria-hidden='true'>
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                            </span>
                            <input
                                type='text'
                                placeholder='Buscar por nombre...'
                                value={searchName}
                                onChange={(e) => setSearchName(e.target.value)}
                                className='characters-search-input'
                                aria-label='Buscar personaje por nombre'
                            />
                            {searchName && (
                                <button
                                    type='button'
                                    className='characters-search-clear'
                                    onClick={() => setSearchName('')}
                                    aria-label='Limpiar búsqueda'
                                >
                                    <FontAwesomeIcon icon={faXmark} aria-hidden='true' />
                                </button>
                            )}
                        </div>

                        {species && (
                            <Link className='characters-clear-filter' to='/characters'>
                                Limpiar filtro
                            </Link>
                        )}
                    </div>
                </div>
            </div>

            {/* ===== LOADING STATE ===== */}
            {loading && <p>Cargando personajes...</p>}

            {/* ===== ERROR STATE ===== */}
            {error && (
                <div className='characters-error-box'>
                    <p className='characters-error'>{error}</p>
                    <button 
                        type='button' 
                        className='characters-retry' 
                        onClick={() => setRetryCount((count) => count + 1)}
                    >
                        Reintentar
                    </button>
                </div>
            )}

            {/* ===== CONTENT STATE ===== */}
            {!loading && !error && (
                filteredCharacters.length > 0 ? (
                    <>
                        {/* Metadata de resultados */}
                        <div className='characters-results-meta'>
                            <p className='characters-results-count'>
                                Mostrando {startIndex + 1}-{Math.min(endIndex, filteredCharacters.length)} de {filteredCharacters.length} personajes
                            </p>
                            <p className='characters-results-pages'>
                                Página {safeCurrentPage} de {totalPages}
                            </p>
                        </div>

                        {/* Grid de tarjetas */}
                        <div className='characters-grid'>
                            {visibleCharacters.map((character) => (
                                <Link key={character.id} to={`/characters/${character.id}`} className='characters-card-link'>
                                    <CardCharacter
                                        image={character.image}
                                        name={character.name}
                                        species={character.species}
                                        status={character.status}
                                        gender={character.gender}
                                    />
                                </Link>
                            ))}
                        </div>

                        {/* Paginación */}
                        {totalPages > 1 && (
                            <nav className='characters-pagination' aria-label='Paginación de personajes'>
                                <button
                                    type='button'
                                    className='characters-pagination-button characters-pagination-nav'
                                    onClick={() => goToPage(safeCurrentPage - 1)}
                                    disabled={safeCurrentPage === 1}
                                    title='Página anterior'
                                >
                                    <FontAwesomeIcon icon={faArrowLeft} aria-hidden='true' />
                                </button>

                                <div className='characters-pagination-pages'>
                                    {pageItems.map((item) => (
                                        typeof item === 'string' ? (
                                            <span key={item} className='characters-pagination-ellipsis'>…</span>
                                        ) : (
                                            <button
                                                key={item}
                                                type='button'
                                                className={`characters-pagination-button ${item === safeCurrentPage ? 'active' : ''}`}
                                                onClick={() => goToPage(item)}
                                                aria-current={item === safeCurrentPage ? 'page' : undefined}
                                                title={`Ir a página ${item}`}
                                            >
                                                {item}
                                            </button>
                                        )
                                    ))}
                                </div>

                                <button
                                    type='button'
                                    className='characters-pagination-button characters-pagination-nav'
                                    onClick={() => goToPage(safeCurrentPage + 1)}
                                    disabled={safeCurrentPage === totalPages}
                                    title='Página siguiente'
                                >
                                    <FontAwesomeIcon icon={faArrowRight} aria-hidden='true' />
                                </button>
                            </nav>
                        )}
                    </>
                ) : (
                    <p className='characters-empty'>No se encontraron personajes con ese filtro.</p>
                )
            )}
        </section>
    )
}

export default Characters