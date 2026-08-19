import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import BanniereAbandon from './components/BanniereAbandon.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import RetourEnHaut from './components/RetourEnHaut.jsx'
import Home from './pages/Home.jsx'
import BuildPage from './pages/BuildPage.jsx'
import Compare from './pages/Compare.jsx'

/**
 * React Router conserve la position de scroll d'une page à l'autre.
 * On remonte en haut au changement de route, sauf si l'URL vise une ancre.
 */
function RestaurerLeScroll() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' })
      return
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])

  return null
}

export default function App() {
  // La clé de route force le remontage : chaque page rejoue son fondu d'entrée.
  const { pathname } = useLocation()

  return (
    <div className="flex min-h-screen flex-col">
      <RestaurerLeScroll />
      <BanniereAbandon />
      <Navbar />
      <main key={pathname} className="entree-page flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/build/:id" element={<BuildPage />} />
        </Routes>
      </main>
      <Footer />
      <RetourEnHaut />
    </div>
  )
}
