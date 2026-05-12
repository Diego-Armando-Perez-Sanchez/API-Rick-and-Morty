import React from 'react'
import { Link } from 'react-router-dom'
import './Header.css'
import logo from '../../assets/logo-header.png'


/**
 * Encabezado principal de la aplicación
 * Contiene: Logo y título "Rick and Morty"
 * Accesible desde cualquier página a través del logo
 */
const Header = () => {
    return (
        <header>
            <Link to="/" className="logo-header" aria-label="Ir a inicio">
                <img src={logo} alt="Logo Rick and Morty" />
            </Link>
            <h1>Rick and Morty</h1>
        </header>
    )
}

export default Header