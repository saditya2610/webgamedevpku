import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logoGDP from '../../assets/Logo GDP besar.png';

const Navigation = ({ isMenuOpen, setIsMenuOpen, isActivitiesDropdownOpen, setIsActivitiesDropdownOpen }) => {
    // State untuk mendeteksi scroll agar UI game bar merespon
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const navLinks = [
        { to: '/', label: 'Beranda' },
        { to: '/tentang', label: 'Tentang' },
        { to: '/develop-games', label: 'Develop Games' }
    ];

    const activitiesLinks = [
        { to: '/activities', label: 'Arsip Aktivitas' },
        { to: '/lomba', label: 'Challenge' },
        { to: '/resource', label: 'Resource Materi' }
    ];

    return (
        <>
            {/* INJEKSI CSS CUSTOM UNTUK ANIMASI GAME */}
            <style>{`
                @keyframes float {
                    0% { transform: translateY(0px); }
                    50% { transform: translateY(-6px); }
                    100% { transform: translateY(0px); }
                }
                @keyframes scrollBg {
                    0% { background-position: 0 0; }
                    100% { background-position: 50px 50px; }
                }
                @keyframes pulseGlow {
                    0%, 100% { box-shadow: 0 0 10px #22d3ee, 0 0 20px #22d3ee; }
                    50% { box-shadow: 0 0 20px #67e8f9, 0 0 30px #67e8f9; }
                }
                .game-float {
                    animation: float 3s ease-in-out infinite;
                }
                .game-bg-scroll {
                    background-image: repeating-linear-gradient(
                        -45deg,
                        rgba(255, 255, 255, 0.05),
                        rgba(255, 255, 255, 0.05) 10px,
                        transparent 10px,
                        transparent 20px
                    );
                    animation: scrollBg 2s linear infinite;
                }
                .btn-arcade {
                    box-shadow: 0 4px 0 #0e7490;
                    transition: all 0.1s;
                }
                .btn-arcade:active {
                    transform: translateY(4px);
                    box-shadow: 0 0px 0 #0e7490;
                }
                .pixel-border {
                    border: 4px solid #fff;
                    box-shadow: 4px 4px 0px rgba(0,0,0,0.5);
                }
            `}</style>

            <header
                className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${scrolled ? 'bg-blue-950 py-2' : 'bg-gradient-to-r from-blue-900 to-blue-800 py-4 md:py-6'
                    } border-b-4 border-blue-950 shadow-[0_4px_0_rgba(0,0,0,0.3)]`}
            >
                {/* Efek Background Bergerak (Game HUD Vibe) */}
                <div className="absolute inset-0 game-bg-scroll pointer-events-none z-0"></div>

                <div className="relative z-10 flex justify-between items-center w-full px-4 sm:px-6 lg:px-8">

                    {/* BAGIAN KIRI: LOGO & JUDUL */}
                    <div className="flex items-center space-x-4 group cursor-pointer">
                        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-2 shadow-lg game-float border-2 border-cyan-300 group-hover:border-yellow-400 transition-colors">
                            <img
                                src={logoGDP}
                                alt="Gamedev PKU"
                                className="h-10 w-auto object-contain"
                            />
                        </div>
                        <div className="hidden md:block">
                            <h1 className="text-white font-black text-xl uppercase tracking-widest transition-transform group-hover:scale-105"
                                style={{
                                    textShadow: '3px 3px 0 #0f172a, -1px -1px 0 #22d3ee',
                                    fontFamily: '"Press Start 2P", monospace, sans-serif' // Gunakan font pixel jika ada
                                }}>
                                GAMEDEVPKU
                            </h1>
                            <p className="text-cyan-300 text-xs font-bold tracking-widest opacity-0 group-hover:opacity-100 transition-opacity -mt-1">
                                LEVEL 1_
                            </p>
                        </div>
                    </div>

                    {/* BAGIAN KANAN: NAVIGASI */}
                    <div className="flex items-center">

                        {/* Mobile Menu Button (Start Button Style) */}
                        <button
                            onClick={toggleMenu}
                            className="md:hidden text-white bg-blue-800 p-2 rounded border-2 border-cyan-400 shadow-[0_4px_0_#0891b2] active:translate-y-1 active:shadow-none transition-all z-50"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {isMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center space-x-2 ml-6 bg-black/20 px-6 py-2 rounded-full border border-white/10 backdrop-blur-sm shadow-inner">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.to}
                                    to={link.to}
                                    className="group relative px-3 py-2 text-white/90 hover:text-yellow-300 font-bold transition-colors uppercase text-sm tracking-wide"
                                >
                                    {/* RPG Hover Pointer */}
                                    <span className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-yellow-300">
                                        ▶
                                    </span>
                                    {link.label}
                                </Link>
                            ))}

                            {/* Dropdown Menu (Inventory Style) */}
                            <div className="relative group/dropdown">
                                <button
                                    onClick={() => setIsActivitiesDropdownOpen(!isActivitiesDropdownOpen)}
                                    className="group relative px-3 py-2 text-white/90 hover:text-yellow-300 font-bold transition-colors uppercase text-sm tracking-wide flex items-center gap-1"
                                >
                                    <span className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-yellow-300">
                                        ▶
                                    </span>
                                    QUESTS
                                    <svg className={`w-4 h-4 transition-transform duration-300 ${isActivitiesDropdownOpen ? 'rotate-180 text-yellow-300' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>

                                {isActivitiesDropdownOpen && (
                                    <div className="absolute top-full right-0 mt-4 w-56 bg-blue-900 pixel-border z-50 animate-[translateY_0.2s_ease-out]">
                                        <div className="bg-blue-950 p-1 text-xs text-center text-cyan-400 font-bold border-b-2 border-white">
                                            SELECT QUEST
                                        </div>
                                        {activitiesLinks.map((link, index) => (
                                            <Link
                                                key={link.to}
                                                to={link.to}
                                                onClick={() => setIsActivitiesDropdownOpen(false)}
                                                className="block px-4 py-3 text-white hover:bg-cyan-600 hover:pl-6 transition-all font-bold border-b border-white/10 last:border-0 relative group/item"
                                            >
                                                <span className="absolute left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover/item:opacity-100 text-yellow-300">▸</span>
                                                {link.label}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Tombol CTA ala Arcade "INSERT COIN / START" */}
                            <Link
                                to="/gabung"
                                className="ml-4 bg-yellow-400 text-blue-950 font-black py-2 px-6 rounded uppercase tracking-widest border-2 border-white btn-arcade hover:bg-yellow-300"
                                style={{ animation: 'pulseGlow 2s infinite' }}
                            >
                                START
                            </Link>
                        </nav>
                    </div>
                </div>
            </header>

            {/* Layar Pause (Mobile Menu) */}
            {isMenuOpen && (
                <div className="fixed inset-0 z-40 md:hidden flex justify-center items-center">
                    <div
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm"
                        onClick={toggleMenu}
                    />

                    {/* Panel Menu Mobile ala Pause Screen Game */}
                    <div className="relative w-11/12 max-w-sm bg-blue-900 pixel-border p-6 shadow-2xl animate-[scale_0.2s_ease-out]">
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-blue-900 px-4 py-1 font-black border-2 border-white tracking-widest">
                            PAUSED
                        </div>

                        <nav className="flex flex-col space-y-2 mt-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.to}
                                    to={link.to}
                                    onClick={toggleMenu}
                                    className="group text-white hover:text-yellow-300 font-bold py-3 px-4 border-2 border-transparent hover:border-dashed hover:border-yellow-300 bg-blue-950/50 hover:bg-blue-800 transition-all text-center uppercase tracking-wide"
                                >
                                    {link.label}
                                </Link>
                            ))}

                            {/* Quest / Aktivitas Mobile */}
                            <div className="pt-2 pb-2">
                                <p className="text-cyan-400 text-xs font-bold text-center mb-2 tracking-widest border-b border-cyan-400/30 pb-1">AVAILABLE QUESTS</p>
                                {activitiesLinks.map((link) => (
                                    <Link
                                        key={link.to}
                                        to={link.to}
                                        onClick={toggleMenu}
                                        className="block text-white/80 hover:text-yellow-300 font-bold py-2 text-center text-sm uppercase transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                            </div>

                            <Link
                                to="/gabung"
                                onClick={toggleMenu}
                                className="bg-yellow-400 text-blue-950 font-black py-3 px-6 text-center uppercase tracking-widest border-2 border-white btn-arcade mt-4"
                            >
                                RESUME / JOIN
                            </Link>
                        </nav>
                    </div>
                </div>
            )}
        </>
    );
};

export default Navigation;