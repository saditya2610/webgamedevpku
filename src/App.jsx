import './App.css'
import logoGDP from '../assets/Logo GDP besar.png'
import { Routes, Route, Link } from 'react-router-dom'
import { useState } from 'react'
import HomePage from './HomePage.jsx'
import AboutPage from './AboutPage.jsx'
import JoinPage from './JoinPage.jsx'
import DevelopGamesPage from './DevelopGamesPage.jsx'
import ActivitiesPage from './ActivitiesPage.jsx'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }
  return (
    <div className="min-h-screen antialiased w-full overflow-x-hidden">
      <header className="fixed top-0 left-0 right-0 bg-gradient-to-r from-blue-900 to-blue-800 shadow-xl z-50 border-b-4 border-blue-950 w-full">
        <div className="flex justify-between items-center w-full px-4 sm:px-6 lg:px-8 py-4 md:py-6">
          <div className="flex items-center space-x-4">
            <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
              <img
                src={logoGDP}
                alt="Gamedev PKU"
                className="h-10 w-auto object-contain"
              />
            </div>
            <div className="hidden md:block">
              <h1 className="text-white font-bold text-lg uppercase tracking-wider pixel-text" style={{ textShadow: '2px 2px 0 rgba(0,0,0,0.5)' }}>
                GAMEDEVPKU
              </h1>
            </div>
          </div>
          <div className="flex items-center">
            {/* Mobile menu button */}
            <button
              onClick={toggleMenu}
              className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>

            {/* Desktop navigation */}
            <nav className="hidden md:flex items-center space-x-6 ml-6">
              <Link
                to="/"
                className="text-white hover:text-cyan-300 font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Beranda
              </Link>
              <Link
                to="/tentang"
                className="text-white hover:text-cyan-300 font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Tentang
              </Link>
              <Link
                to="/develop-games"
                className="text-white hover:text-cyan-300 font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Develop Games
              </Link>
              <Link
                to="/activities"
                className="text-white hover:text-cyan-300 font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Aktivitas
              </Link>
              <Link
                to="/gabung"
                className="bg-cyan-400 text-blue-900 font-bold py-2 px-6 rounded-full uppercase tracking-wider border-2 border-cyan-300 hover:bg-cyan-300 hover:scale-105 transition-all duration-300 shadow-lg"
              >
                Bergabung
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Mobile navigation menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={toggleMenu}
          />
          <div className="fixed right-0 top-0 h-full w-64 bg-gradient-to-b from-blue-900 to-blue-800 shadow-2xl transform transition-transform duration-300 ease-in-out">
            <div className="p-4">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-white font-bold text-lg pixel-text">MENU</h2>
                <button
                  onClick={toggleMenu}
                  className="text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <nav className="flex flex-col space-y-4">
                <Link
                  to="/"
                  onClick={toggleMenu}
                  className="text-white hover:text-cyan-300 font-semibold transition-all duration-300 py-3 px-4 rounded-lg hover:bg-white/10"
                >
                  Beranda
                </Link>
                <Link
                  to="/tentang"
                  onClick={toggleMenu}
                  className="text-white hover:text-cyan-300 font-semibold transition-all duration-300 py-3 px-4 rounded-lg hover:bg-white/10"
                >
                  Tentang
                </Link>
                <Link
                  to="/develop-games"
                  onClick={toggleMenu}
                  className="text-white hover:text-cyan-300 font-semibold transition-all duration-300 py-3 px-4 rounded-lg hover:bg-white/10"
                >
                  Develop Games
                </Link>
                <Link
                  to="/activities"
                  onClick={toggleMenu}
                  className="text-white hover:text-cyan-300 font-semibold transition-all duration-300 py-3 px-4 rounded-lg hover:bg-white/10"
                >
                  Aktivitas
                </Link>
                <Link
                  to="/gabung"
                  onClick={toggleMenu}
                  className="bg-cyan-400 text-blue-900 font-bold py-3 px-6 rounded-full uppercase tracking-wider border-2 border-cyan-300 hover:bg-cyan-300 transition-all duration-300 shadow-lg text-center mt-4"
                >
                  Bergabung
                </Link>
              </nav>
            </div>
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 md:pt-32 pb-24 md:pb-32 relative">
        <div className="hero-bg-overlay" />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tentang" element={<AboutPage />} />
          <Route path="/gabung" element={<JoinPage />} />
          <Route path="/develop-games" element={<DevelopGamesPage />} />
          <Route path="/activities" element={<ActivitiesPage />} />
        </Routes>
      </main>

      <footer className="mt-16 py-8 bg-gradient-to-r from-blue-900 to-blue-950 text-center border-t-4 border-blue-800 full-width">
        <div className="max-w-none w-full px-4 sm:px-6 lg:px-8">
          <p className="text-blue-100 text-sm font-mono tracking-widest font-semibold">
            &copy; 2025 Gamedev PKU by Sadit ID. ALL RIGHTS RESERVED.
          </p>
          <div className="mt-2 space-x-4">
            <a
              href="#"
              className="text-blue-200 hover:text-cyan-300 text-sm uppercase font-medium transition-colors"
            >
              Privasi Data
            </a>
            <span className="text-blue-200 text-sm font-medium">|</span>
            <a
              href="#"
              className="text-blue-200 hover:text-cyan-300 text-sm uppercase font-medium transition-colors"
            >
              Persetujuan Pengguna
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
