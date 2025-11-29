import { useState } from 'react'
import nyusrukImage from '../assets/games/nyusruk.png'
import lostEclipseImage from '../assets/games/losteclipse.jpg'
import itchioIcon from '../assets/iconsapp/itchio.png'
import steamIcon from '../assets/iconsapp/steam.png'

function DevelopGamesPage() {
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('all')

    const games = [
        {
            id: 1,
            title: "Nyusruk",
            category: "indie",
            console: "Web Browser",
            description: "Game indie yang menarik dan bisa dimainkan langsung di browser. Nikmati pengalaman gaming yang seru!",
            link: "https://one-project.itch.io/nyusruk",
            image: nyusrukImage
        },
        {
            id: 2,
            title: "Lost Eclipse",
            category: "indie",
            console: "Multi Platform",
            description: "Game petualangan indie yang seru dengan grafis menarik. Tersedia di itch.io dan Steam!",
            itchLink: "https://fabicomm-pro.itch.io/lost-eclipse",
            steamLink: "https://store.steampowered.com/app/3853160/Lost_Eclipse/",
            image: lostEclipseImage
        }
    ]

    const categories = [
        { value: 'all', label: 'Semua Kategori' },
        { value: 'indie', label: 'Indie' }
    ]

    const filteredGames = games.filter(game => {
        const matchesSearch = game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            game.description.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesCategory = selectedCategory === 'all' || game.category === selectedCategory
        return matchesSearch && matchesCategory
    })

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
                <div className="mb-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <div className="relative w-full sm:w-96">
                        <input
                            type="text"
                            placeholder="Cari game..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-4 py-3 pr-10 rounded-xl border-4 border-gray-300 shadow-lg focus:outline-none focus:border-blue-500 text-gray-900 bg-white"
                        />
                        <svg
                            className="absolute right-3 top-3.5 w-5 h-5 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </div>
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="px-4 py-3 rounded-xl border-4 border-gray-300 shadow-lg focus:outline-none focus:border-blue-500 text-gray-900 font-medium bg-white"
                    >
                        {categories.map(category => (
                            <option key={category.value} value={category.value}>
                                {category.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Games Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {filteredGames.map(game => (
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
                                ) : (
                                    <a
                                        href={game.link}
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
