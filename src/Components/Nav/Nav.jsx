import React, { useEffect, useState } from 'react'
import './Nav.css'
import { Link } from 'react-router-dom'

/**
 * Navegación principal
 * Características:
 * - Menú hamburger responsivo (visible en pantallas < 992px)
 * - Bloquea scroll del body cuando el drawer está abierto
 * - Cierra con tecla Escape
 * - Animaciones suaves de entrada
 */
const Nav = () => {
    const [open, setOpen] = useState(false)

    // Controla scroll del body cuando el drawer está abierto
    useEffect(() => {
        document.body.style.overflow = open ? 'hidden' : ''
        return () => {
            document.body.style.overflow = ''
        }
    }, [open])

    // Maneja cierre con tecla Escape
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape' && open) {
                setOpen(false)
            }
        }

        document.addEventListener('keydown', handleEscape)
        return () => document.removeEventListener('keydown', handleEscape)
    }, [open])

    return (
        <nav className="nav">
            {/* Botón hamburger */}
            <button
                className="nav-toggle"
                aria-controls="nav-list"
                aria-expanded={open}
                onClick={() => setOpen(o => !o)}
                title={open ? 'Cerrar menú' : 'Abrir menú'}
            >
                <span className="sr-only">Abrir menú</span>
                <span className={`hamburger ${open ? 'open' : ''}`} aria-hidden="true">
                    <span></span>
                    <span></span>
                    <span></span>
                </span>
            </button>

            {/* Backdrop oscuro tras el drawer */}
            <div
                className={`nav-backdrop ${open ? 'open' : ''}`}
                onClick={() => setOpen(false)}
                aria-hidden={!open}
            ></div>

            {/* Drawer con enlaces de navegación */}
            <div className={`nav-drawer ${open ? 'open' : ''}`}>
                {/* Botón cerrar para el drawer */}
                <button
                    type="button"
                    className="nav-close"
                    aria-label="Cerrar menú"
                    onClick={() => setOpen(false)}
                    title="Cerrar"
                >
                    ×
                </button>

                {/* Enlaces principales */}
                <ul id="nav-list" className="nav-list" onClick={() => setOpen(false)}>
                    <li><Link to="/">Inicio</Link></li>
                    <li><Link to="/filter">Filtrar por especie</Link></li>
                    <li><Link to="/characters">Personajes</Link></li>
                </ul>
            </div>
        </nav>
    )
}

export default Nav