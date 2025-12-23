import { Link } from 'react-router-dom'
import logoGDP from '../../assets/Logo GDP besar.png'

const Navigation = ({ isMenuOpen, setIsMenuOpen, isActivitiesDropdownOpen, setIsActivitiesDropdownOpen }) => {
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    const navLinks = [
        { to: '/', label: 'Beranda' },
        { to: '/tentang', label: 'Tentang' },
        { to: '/develop-games', label: 'Develop Games' }
    ]

    const activitiesLinks = [
        { to: '/activities', label: 'Arsip Aktivitas' },
        { to: '/lomba', label: 'Challenge' }
    ]

    return (
        <>
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
                            {navLinks.map((link) => (
                                <Link
                                    key={link.to}
                                    to={link.to}
                                    className="text-white hover:text-cyan-300 font-semibold transition-all duration-300 transform hover:scale-105"
                                >
                                    {link.label}
                                </Link>
                            ))}

                            <div className="relative">
                                <button
                                    onClick={() => setIsActivitiesDropdownOpen(!isActivitiesDropdownOpen)}
                                    className="text-white hover:text-cyan-300 font-semibold transition-all duration-300 transform hover:scale-105 flex items-center gap-1"
                                >
                                    Aktivitas
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                                {isActivitiesDropdownOpen && (
                                    <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-xl border-2 border-cyan-300 z-50">
                                        {activitiesLinks.map((link, index) => (
                                            <Link
                                                key={link.to}
                                                to={link.to}
                                                onClick={() => setIsActivitiesDropdownOpen(false)}
                                                className={`block px-4 py-3 text-blue-900 hover:bg-cyan-100 font-semibold transition-colors ${index > 0 ? 'border-t border-gray-200' : ''
                                                    }`}
                                            >
                                                {link.label}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>

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
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.to}
                                        to={link.to}
                                        onClick={toggleMenu}
                                        className="text-white hover:text-cyan-300 font-semibold transition-all duration-300 py-3 px-4 rounded-lg hover:bg-white/10"
                                    >
                                        {link.label}
                                    </Link>
                                ))}

                                <div className="relative">
                                    <button
                                        onClick={() => setIsActivitiesDropdownOpen(!isActivitiesDropdownOpen)}
                                        className="text-white hover:text-cyan-300 font-semibold transition-all duration-300 py-3 px-4 rounded-lg hover:bg-white/10 flex items-center justify-between"
                                    >
                                        <span>Aktivitas</span>
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                    {isActivitiesDropdownOpen && (
                                        <div className="ml-4 mt-2 space-y-2">
                                            {activitiesLinks.map((link) => (
                                                <Link
                                                    key={link.to}
                                                    to={link.to}
                                                    onClick={toggleMenu}
                                                    className="block text-white hover:text-cyan-300 font-semibold transition-all duration-300 py-2 px-4 rounded-lg hover:bg-white/10"
                                                >
                                                    {link.label}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>

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
        </>
    )
}

export default Navigation
