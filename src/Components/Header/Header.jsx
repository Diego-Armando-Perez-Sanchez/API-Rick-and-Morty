import React from 'react'
import './Header.css'

/**
 * Encabezado principal de la aplicación
 * Contiene: Logo y título "Rick and Morty"
 * Accesible desde cualquier página a través del logo
 */
const Header = () => {
    return (
        <header>
            <a className="logo-header" href="/" title="Ir a inicio">
                <img src="./src/assets/logo-header.png" alt="Logo Rick and Morty" />
            </a>
            <h1>Rick and Morty</h1>
        </header>
    )
}

export default Header