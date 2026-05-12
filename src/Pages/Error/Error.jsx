import React from 'react'
import { Link } from 'react-router-dom'
import './Error.css'

/**
 * Página de error - Página 404
 * Se muestra cuando el usuario intenta acceder a una ruta no existente
 * Ofrece enlaces para volver al inicio o a la sección de personajes
 */
const Error = () => {
  return (
    <section className="error">
      {/* Código de error */}
      <div className="error-code">404</div>

      {/* Título y descripción */}
      <h2>Página no encontrada</h2>
      <p>La ruta que intentaste abrir no existe o fue movida.</p>

      {/* Acciones: volver al inicio o ver personajes */}
      <div className="error-actions">
        <Link className="error-primary" to="/">Volver al inicio</Link>
        <Link className="error-secondary" to="/characters">Ver personajes</Link>
      </div>
    </section>
  )
}

export default Error
