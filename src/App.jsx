import './App.css'
import { Analytics } from '@vercel/analytics/react'
import { Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import HomePage from './HomePage.jsx'
import AboutPage from './AboutPage.jsx'
import JoinPage from './JoinPage.jsx'
import DevelopGamesPage from './DevelopGamesPage.jsx'
import ActivitiesPage from './ActivitiesPage.jsx'
import GamesCollectionPage from './GamesCollectionPage.jsx'
import LombaPage from './LombaPage.jsx'
import AudioPlayer from './AudioPlayer.jsx'
import Navigation from './components/Navigation.jsx'
import { GRADIENTS } from './constants/styles.js'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isActivitiesDropdownOpen, setIsActivitiesDropdownOpen] = useState(false)

  return (
    <div className="min-h-screen antialiased w-full overflow-x-hidden">
      <Navigation
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        isActivitiesDropdownOpen={isActivitiesDropdownOpen}
        setIsActivitiesDropdownOpen={setIsActivitiesDropdownOpen}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 md:pt-32 pb-24 md:pb-32 relative">
        <div className="hero-bg-overlay" />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tentang" element={<AboutPage />} />
          <Route path="/gabung" element={<JoinPage />} />
          <Route path="/develop-games" element={<DevelopGamesPage />} />
          <Route path="/activities" element={<ActivitiesPage />} />
          <Route path="/lomba" element={<LombaPage />} />
          <Route path="/koleksi-games" element={<GamesCollectionPage />} />
        </Routes>
      </main>

      <footer className={`mt-16 py-8 ${GRADIENTS.blueDark} text-center border-t-4 border-blue-800 full-width`}>
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
      <AudioPlayer />
      <Analytics />
    </div>
  )
}

export default App
