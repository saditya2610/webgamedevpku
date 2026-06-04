import { useState, useEffect } from 'react'
import nyusrukImage from '../assets/games/nyusruk.png'
import lostEclipseImage from '../assets/games/losteclipse.jpg'
import evalynImage from '../assets/games/evalyn.png'
import candyImage from '../assets/games/candy.jpg'
import everwinterImage from '../assets/games/everwinter.png'
import infernoGaloreImage from '../assets/games/infernogalore.jpg'
// import coinnerImage from '../assets/games/coinner.png'
import itchioIcon from '../assets/iconsapp/itchio.png'
import steamIcon from '../assets/iconsapp/steam.png'

function DevelopGamesPage() {
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('all')
    const [selectedPlatform, setSelectedPlatform] = useState('all')
    const [currentPage, setCurrentPage] = useState(1)
    const ITEMS_PER_PAGE = 6

    useEffect(() => {
        setCurrentPage(1)
    }, [searchTerm, selectedCategory, selectedPlatform])

    const games = [
        {
            id: 1,
            title: "Nyusruk",
            category: "indie",
            console: "PC",
            description: "Game indie yang menarik dan bisa dimainkan langsung di browser. Nikmati pengalaman gaming yang seru!",
            link: "https://one-project.itch.io/nyusruk",
            image: nyusrukImage
        },
        {
            id: 2,
            title: "Lost Eclipse",
            category: "indie",
            console: "Multi Platform",
            description: "After the city was shrouded with nightmares, you've been assigned to dive into this psychological survival-horror adventure to uncover its strange phenomenons that are affiliated to a certain science-tech corporation and bring them to justice.",
            itchLink: "https://fabicomm-pro.itch.io/lost-eclipse",
            steamLink: "https://store.steampowered.com/app/3853160/Lost_Eclipse/",
            image: lostEclipseImage
        },
        {
            id: 3,
            title: "Evalyn: Plunderer of the Seven Seas",
            category: "indie",
            console: "PC",
            description: "Play as Evalyn, a young pirate with a big passion. Guide her to collect many treasures across the Seven Seas! A top-down shooter with roguelike elements.",
            link: "https://renuice-devs.itch.io/evalyn-plunderer-of-the-seven-seas",
            image: evalynImage
        },
        {
            id: 4,
            title: "Inferno Galore",
            category: "indie",
            console: "PC",
            description: "Destroy the cursed invaders and avoid the bullets of hell in this intense boss rush game. Specially made for Boss Rush Jam 2025.",
            link: "https://cranium-basher.itch.io/inferno-galore",
            image: infernoGaloreImage
        },
        {
            id: 5,
            title: "Candy - The Wanderer",
            category: "indie",
            console: "Multi Platform",
            description: "Immerse yourself in the land full of wonders as a merchant with Candy. A Game Boy styled top-down adventure roguelike about a young elf opening her first shop.",
            link: "https://fabicomm-pro.itch.io/candy-the-wanderer",
            image: candyImage
        },
        {
            id: 6,
            title: "Everwinter",
            category: "indie",
            console: "PC",
            description: "Raid the ice fortress enemy in this action survival game. A submission for MigJam #26 with pixel art graphics and challenging gameplay.",
            link: "https://jelliut.itch.io/everwinter",
            image: everwinterImage
        },
        {
            id: 7,
            title: "Coinner",
            category: "indie",
            console: "PC",
            description: "Experience a high-stakes chase where you must constantly run from a pursuing monster. While trying to escape, your main objective is to collect every coin you find along the way. Stay fast, outrun the beast, and gather as many coins as possible to achieve the highest score",
            link: "https://one-project.itch.io/coinner",
            image: "https://img.itch.zone/aW1hZ2UvNDIyOTg0Ny8yNTIwMjU3Ni5wbmc=/original/DEcqAX.png"
        },
        {
            id: 8,
            title: "Cardlatro",
            category: "indie",
            console: "Multi Platform",
            description: "Cardlatro is not your average poker game. It's a Roguelike Deckbuilder where you must use traditional poker hands combined with the game-breaking effects of Joker cards to achieve unimaginably high scores (Chips).",
            link: "https://saditya2610.itch.io/cardlatro",
            image: "https://img.itch.zone/aW1nLzI3NDIyMDA0LnBuZw==/original/TQ4ybv.png"
        },
        {
            id: 9,
            title: "Clash of Beasts",
            category: "indie",
            console: "Multi Platform",
            description: "A small game prototype of UNO + Monster Elemental + Roguelike Attacks! Defeat the monster in the center of the arena before the AI does.",
            link: "https://fabicomm-pro.itch.io/clash-of-beasts",
            image: "https://img.itch.zone/aW1nLzI3NDA5MjA4LmpwZw==/original/5sl1hB.jpg"
        },
        {
            id: 10,
            title: "egg rice with soy sauce",
            category: "indie",
            console: "PC",
            description: "A simple midnight meal turns into a nightmare. Play this short horror comedy game where someone who came home from working overtime and felt hungry finally cooked rice with egg and sweet soy sauce, but something happened.",
            link: "https://one-project.itch.io/egg-rice-with-soy-sauce",
            image: "https://img.itch.zone/aW1nLzI2ODM2NjM4LmpwZw==/original/FDm90g.jpg"
        },
        {
            id: 11,
            title: "Malpractice Crypt",
            category: "indie",
            console: "Multi Platform",
            description: "Jadilah Apoteker Jaga Klinis di bangsal IGD! Skrining resep secepat kilat, mainkan kartu intervensi, dan cegah Medication Error sebelum terjadi dalam game simulasi klinis roguelite ini.",
            link: "https://saditya2610.itch.io/malpractice-crypt",
            image: "https://img.itch.zone/aW1nLzI3NjI5MTU5LnBuZw==/original/q9PSKW.png"
        },
        {
            id: 12,
            title: "Hell's Interior",
            category: "indie",
            console: "PC",
            description: "A fast-paced first-person shooter set in the depths of hell. Survive waves of demons and escape the inferno.",
            link: "https://fabicomm-pro.itch.io/hells-interior",
            image: "https://img.itch.zone/aW1nLzI3NDY1MzI5LmpwZw==/original/H%2FuDAT.jpg"
        },
        {
            id: 13,
            title: "A P A R T M E N T",
            category: "indie",
            console: "PC",
            description: "A psychological horror game where you explore an eerie apartment. Uncover the dark secrets hidden within its walls.",
            link: "https://wansatari.itch.io/a-p-a-r-t-m-e-n-t",
            image: "https://img.itch.zone/aW1nLzkxOTQ4MjQucG5n/original/QmmSX2.png"
        },
        {
            id: 14,
            title: "Lucia Journey",
            category: "indie",
            console: "PC",
            description: "Join Lucia on an epic journey. A 2D adventure game filled with puzzles, combat, and an engaging storyline.",
            steamLink: "https://store.steampowered.com/app/4505530/Lucia_Journey/",
            image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/4505530/dcc9a08d23c24783fff06d63dc31b93cc92d1d5e/capsule_616x353.jpg?t=1773365942"
        }
    ]

    const categories = [
        { value: 'all', label: 'Semua Kategori' },
        { value: 'indie', label: 'Indie' }
    ]

    const platforms = [
        { value: 'all', label: 'Semua Platform' },
        { value: 'steam', label: 'Steam' },
        { value: 'itchio', label: 'itch.io' }
    ]

    const filteredGames = games.filter(game => {
        const matchesSearch = game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            game.description.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesCategory = selectedCategory === 'all' || game.category === selectedCategory
        
        let matchesPlatform = true;
        if (selectedPlatform === 'steam') {
            matchesPlatform = !!game.steamLink;
        } else if (selectedPlatform === 'itchio') {
            matchesPlatform = !!game.itchLink || (game.link && game.link.includes('itch.io'));
        }

        return matchesSearch && matchesCategory && matchesPlatform
    })

    const totalPages = Math.ceil(filteredGames.length / ITEMS_PER_PAGE)
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const currentGames = filteredGames.slice(startIndex, startIndex + ITEMS_PER_PAGE)

    return (
        <section id="develop-games" className="min-h-screen pt-32 pb-20 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1
                        className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 uppercase pixel-text"
                        style={{
                            color: 'var(--color-deep-blue)',
                            textShadow: '2px 2px 0 var(--color-neon-green)',
                        }}
                    >
                        🎮 Develop Games
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto">
                        Jelajahi berbagai game yang sedang dikembangkan. Lihat proyek game terbaru dan mainkan versi demo yang tersedia!
                    </p>
                </div>

                {/* Search and Filter */}
                <div className="mb-10 flex flex-col sm:flex-row gap-4 justify-center items-center px-2">
                    {/* Search Input */}
                    <div className="relative w-full sm:w-96 group">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-500"></div>
                        <input
                            type="text"
                            placeholder="Cari game..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="relative w-full px-5 py-3.5 pl-12 rounded-2xl border-2 border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.08)] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 bg-white/90 backdrop-blur-md transition-all duration-300 placeholder-gray-400 font-medium"
                        />
                        <svg
                            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors duration-300"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>

                    {/* Category Dropdown */}
                    <div className="relative w-full sm:w-auto group">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-500"></div>
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="appearance-none relative w-full sm:w-48 px-5 py-3.5 pr-10 rounded-2xl border-2 border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.08)] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-800 font-bold bg-white/90 backdrop-blur-md transition-all duration-300 cursor-pointer hover:bg-white"
                        >
                            {categories.map(category => (
                                <option key={category.value} value={category.value} className="font-medium text-gray-800">
                                    {category.label}
                                </option>
                            ))}
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 group-hover:text-purple-500 transition-colors duration-300">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>

                    {/* Platform Dropdown */}
                    <div className="relative w-full sm:w-auto group">
                        <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-500"></div>
                        <select
                            value={selectedPlatform}
                            onChange={(e) => setSelectedPlatform(e.target.value)}
                            className="appearance-none relative w-full sm:w-48 px-5 py-3.5 pr-10 rounded-2xl border-2 border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.08)] focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-800 font-bold bg-white/90 backdrop-blur-md transition-all duration-300 cursor-pointer hover:bg-white"
                        >
                            {platforms.map(platform => (
                                <option key={platform.value} value={platform.value} className="font-medium text-gray-800">
                                    {platform.label}
                                </option>
                            ))}
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 group-hover:text-green-500 transition-colors duration-300">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Games Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {currentGames.map(game => (
                        <div
                            key={game.id}
                            className="bg-white rounded-2xl border-4 border-gray-300 shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] group"
                        >
                            <div className="relative overflow-hidden h-48">
                                <img
                                    src={game.image}
                                    alt={game.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                    loading="lazy"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = `https://via.placeholder.com/300x200/4A90E2/FFFFFF?text=${encodeURIComponent(game.title)}`;
                                    }}
                                />
                                <div className="absolute top-2 right-2 bg-black/80 text-white px-3 py-1 rounded-full text-xs font-bold uppercase backdrop-blur-sm shadow-lg border border-white/20">
                                    {game.category}
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-800 mb-2">
                                    {game.title}
                                </h3>
                                <p className="text-sm text-gray-600 mb-1">
                                    🎯 {game.console}
                                </p>
                                <p className="text-gray-700 mb-4 line-clamp-2">
                                    {game.description}
                                </p>
                                {game.itchLink && game.steamLink ? (
                                    <div className="space-y-3">
                                        <a
                                            href={game.itchLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-block w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white font-bold py-3 px-6 rounded-xl uppercase tracking-wider border-2 border-purple-400 hover:from-purple-600 hover:to-purple-700 hover:scale-105 transition-all duration-300 shadow-lg text-center flex items-center justify-center gap-2"
                                        >
                                            <img src={itchioIcon} alt="itch.io" className="w-5 h-5" />
                                            Mainkan di itch.io →
                                        </a>
                                        <a
                                            href={game.steamLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-block w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold py-3 px-6 rounded-xl uppercase tracking-wider border-2 border-blue-400 hover:from-blue-600 hover:to-blue-700 hover:scale-105 transition-all duration-300 shadow-lg text-center flex items-center justify-center gap-2"
                                        >
                                            <img src={steamIcon} alt="Steam" className="w-5 h-5" />
                                            Mainkan di Steam →
                                        </a>
                                    </div>
                                ) : game.steamLink && !game.itchLink ? (
                                    <a
                                        href={game.steamLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-block w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold py-3 px-6 rounded-xl uppercase tracking-wider border-2 border-blue-400 hover:from-blue-600 hover:to-blue-700 hover:scale-105 transition-all duration-300 shadow-lg text-center flex items-center justify-center gap-2"
                                    >
                                        <img src={steamIcon} alt="Steam" className="w-5 h-5" />
                                        Mainkan di Steam →
                                    </a>
                                ) : (
                                    <a
                                        href={game.link || game.itchLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-block w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-bold py-3 px-6 rounded-xl uppercase tracking-wider border-2 border-green-400 hover:from-green-600 hover:to-green-700 hover:scale-105 transition-all duration-300 shadow-lg text-center flex items-center justify-center gap-2"
                                    >
                                        <img src={itchioIcon} alt="itch.io" className="w-5 h-5" />
                                        Mainkan di itch.io →
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                    <div className="flex justify-center items-center space-x-2 mb-12">
                        <button
                            onClick={() => {
                                setCurrentPage(prev => Math.max(prev - 1, 1));
                                window.scrollTo({ top: document.getElementById('develop-games').offsetTop, behavior: 'smooth' });
                            }}
                            disabled={currentPage === 1}
                            className="px-4 py-2 rounded-lg bg-white border-2 border-gray-300 font-bold text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors shadow-sm"
                        >
                            Sebelumnya
                        </button>
                        
                        <div className="flex space-x-1 hidden sm:flex">
                            {[...Array(totalPages)].map((_, i) => (
                                <button
                                    key={i + 1}
                                    onClick={() => {
                                        setCurrentPage(i + 1);
                                        window.scrollTo({ top: document.getElementById('develop-games').offsetTop, behavior: 'smooth' });
                                    }}
                                    className={`w-10 h-10 rounded-lg border-2 font-bold transition-colors shadow-sm ${
                                        currentPage === i + 1 
                                            ? 'bg-blue-600 border-blue-600 text-white' 
                                            : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-100'
                                    }`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>

                        <span className="sm:hidden font-bold text-gray-700 mx-2">
                            {currentPage} / {totalPages}
                        </span>

                        <button
                            onClick={() => {
                                setCurrentPage(prev => Math.min(prev + 1, totalPages));
                                window.scrollTo({ top: document.getElementById('develop-games').offsetTop, behavior: 'smooth' });
                            }}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 rounded-lg bg-white border-2 border-gray-300 font-bold text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors shadow-sm"
                        >
                            Selanjutnya
                        </button>
                    </div>
                )}

                {/* No Results */}
                {filteredGames.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-xl text-gray-600 mb-4">
                            😔 Tidak ada game yang ditemukan
                        </p>
                        <p className="text-gray-500">
                            Coba ubah kata kunci pencarian atau kategori filter
                        </p>
                    </div>
                )}

                {/* Back Button */}
                <div className="text-center">
                    <a
                        href="/"
                        className="inline-block bg-gray-800 text-white font-bold py-3 px-8 rounded-xl uppercase tracking-wider border-2 border-gray-600 hover:bg-gray-700 hover:scale-105 transition-all duration-300 shadow-lg"
                    >
                        ← Kembali ke Beranda
                    </a>
                </div>
            </div>
        </section>
    )
}

export default DevelopGamesPage
