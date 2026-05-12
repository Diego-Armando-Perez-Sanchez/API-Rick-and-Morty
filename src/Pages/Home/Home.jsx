import React from 'react'
import './Home.css'

/**
 * Página de inicio
 * Muestra un título de bienvenida y una imagen representativa
 * de Rick and Morty con instrucciones de navegación
 */
const Home = () => {
  return (
    <section className="home">
      {/* Título y descripción */}
      <section className="home-title">
        <h1>Personajes de Rick and Morty</h1>
        <p>Usa el menú para ver personajes o filtrar por especie.</p>
      </section>

      {/* Imagen representativa */}
      <section className="home-content">
        <img
          src="https://i.blogs.es/cfa26e/rickandmortycabecera/650_1200.jpg"
          alt="Imagen de portada - Rick y Morty sonriendo"
        />
      </section>
    </section>
  )
}

export default Home
