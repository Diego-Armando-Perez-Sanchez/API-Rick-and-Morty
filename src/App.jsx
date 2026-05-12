import './App.css'
import { Routes, Route } from 'react-router-dom'

// ===== COMPONENTS =====
import Header from './Components/Header/Header.jsx'
import Nav from './Components/Nav/Nav.jsx'
import Footer from './Components/Footer/Footer.jsx'

// ===== PAGES =====
import Home from './Pages/Home/Home.jsx'
import Characters from './Pages/Characters/Characters.jsx'
import CharactersDetails from './Pages/CharactersDetails/CharactersDetails.jsx'
import Filter from './Pages/Filter/Filter.jsx'
import Error from './Pages/Error/Error.jsx'

/**
 * Componente principal de la aplicación
 * Estructura: Header -> Nav -> Routes (main) -> Footer
 * Rutas: Home, Characters, CharactersDetails, Filter, Error (404)
 */
function App() {
  return (
    <div className="app-shell">
      <Header />
      <Nav />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/characters" element={<Characters />} />
          <Route path="/characters/:id" element={<CharactersDetails />} />
          <Route path="/filter" element={<Filter />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
