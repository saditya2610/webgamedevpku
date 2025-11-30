import { useState } from 'react'
import { Link } from 'react-router-dom'
import activityImg1 from '../assets/IMG_20251116_171722.jpg'
import activityImg2 from '../assets/IMG-20251116-WA0035.jpg'
import activityImg3 from '../assets/IMG_20251116_141859.jpg'
import gatheringImg from '../assets/gathering1st/Foto bersama GamedevPKU.jpeg'
import gameDevIcon from '../assets/game-development.png'

const activitiesData = [
    {
        id: 1,
        src: gatheringImg,
        title: 'GamedevPKU Gathering',
        date: 'First Gathering',
        description: 'First official GamedevPKU community gathering',
        fullDescription: 'Momentum bersejarah dimulainya komunitas GamedevPKU. Acara ini mengumpulkan para developer game, gamer, dan entusiast industri game di Pekanbaru untuk berbagi pengalaman, membentuk jaringan, dan merencanakan masa depan industri game lokal.',
        category: 'Gathering',
        participants: 25
    },
    {
        id: 2,
        src: activityImg1,
        title: 'GamedevPKU x Umamusume Pekanbaru',
        date: 'November 2024',
        description: '2nd Gathering GamedevPKU collabs with Uma Musume and Other Communities games',
        fullDescription: 'Kolaborasi epik antara GamedevPKU dengan komunitas Uma Musume dan komunitas game lainnya di Pekanbaru. Acara ini menampilkan diskusi mendalam tentang game development, networking session, dan showcase proyek-proyek terbaru dari para member komunitas.',
        category: 'Collaboration',
        participants: 45
    },
    {
        id: 3,
        src: activityImg2,
        title: 'Trophy Tournament Fun Match Day',
        date: 'November 2025',
        description: 'Community gaming and networking event',
        fullDescription: 'Turnamen seru yang menguji kemampuan gaming para member komunitas. Acara ini tidak hanya tentang kompetisi, tetapi juga tentang pembelajaran, sharing tips & tricks, dan memperkuat bonding antar gamer di Pekanbaru.',
        category: 'Tournament',
        participants: 32
    },
    {
        id: 4,
        src: activityImg3,
        title: 'Game Showcase & Community Day',
        date: 'November 2025',
        description: 'Showcasing local game developer projects and The communities Games in Pekanbaru',
        fullDescription: 'Panggung bagi para developer game lokal untuk memamerkan karya terbaik mereka. Acara ini juga menampilkan berbagai game dari komunitas di Pekanbaru, dengan sesi demo, feedback gathering, dan diskusi tentang peluang industri game.',
        category: 'Showcase',
        participants: 60
    }
]

function ActivitiesPage() {
    const [selectedCategory, setSelectedCategory] = useState('All')
    const [searchTerm, setSearchTerm] = useState('')

    const categories = ['All', 'Gathering', 'Collaboration', 'Tournament', 'Showcase']

    const filteredActivities = activitiesData.filter(activity => {
        const matchesCategory = selectedCategory === 'All' || activity.category === selectedCategory
        const matchesSearch = activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            activity.description.toLowerCase().includes(searchTerm.toLowerCase())
        return matchesCategory && matchesSearch
    })

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-20 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1
                        className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 uppercase pixel-text"
                        style={{
                            color: 'var(--color-deep-blue)',
                            textShadow: '2px 2px 0 var(--color-neon-green)',
                        }}
                    >
                        Arsip Aktivitas
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                        Dokumentasi lengkap perjalanan komunitas GamedevPKU dari awal berdiri hingga saat ini
                    </p>
                </div>

                {/* Back Button */}
                <div className="mb-8">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 bg-cyan-400 text-blue-900 font-bold py-2 px-6 rounded-full uppercase tracking-wider border-2 border-cyan-300 hover:bg-cyan-300 hover:scale-105 transition-all duration-300 shadow-lg"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Kembali ke Beranda
                    </Link>
                </div>

                {/* Search and Filter */}
                <div className="bg-white rounded-2xl border-4 border-gray-300 shadow-lg p-6 mb-8">
                    <div className="flex flex-col lg:flex-row gap-4">
                        <div className="flex-1">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Cari aktivitas..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full px-4 py-3 pl-12 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent bg-white"
                                    style={{
                                        color: 'var(--color-deep-blue)',
                                    }}
                                />
                                <svg className="absolute left-4 top-3.5 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                    style={{
                                        color: 'var(--color-deep-blue)',
                                    }}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                        </div>
                        <div className="flex gap-2 flex-wrap">
                            {categories.map(category => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className={`px-4 py-2 rounded-xl font-semibold transition-all duration-200 ${selectedCategory === category
                                        ? 'bg-gradient-to-r from-cyan-400 to-cyan-500 text-blue-900 shadow-lg border-2 border-cyan-300'
                                        : 'bg-gray-200 hover:bg-gray-300'
                                        }`}
                                    style={{
                                        color: selectedCategory === category ? 'inherit' : 'var(--color-deep-blue)',
                                    }}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Activities Grid */}
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {filteredActivities.map(activity => (
                        <div
                            key={activity.id}
                            className="bg-white rounded-2xl border-4 border-gray-300 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
                        >
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={activity.src}
                                    alt={activity.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute top-4 right-4">
                                    <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                        {activity.category}
                                    </span>
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--color-deep-blue)' }}>
                                    {activity.title}
                                </h3>
                                <p className="text-sm text-gray-500 mb-3">{activity.date}</p>
                                <p className="text-gray-600 mb-4 line-clamp-2">{activity.description}</p>
                                <div className="border-t pt-4">
                                    <p className="text-sm text-gray-600 mb-3 line-clamp-3">{activity.fullDescription}</p>
                                    <button className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white font-bold py-2 px-4 rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-200">
                                        Lihat Detail
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {filteredActivities.length === 0 && (
                    <div className="text-center py-12">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-200 rounded-full mb-4">
                            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">Tidak ada aktivitas ditemukan</h3>
                        <p className="text-gray-500">Coba ubah filter atau kata kunci pencarian</p>
                    </div>
                )}

                {/* Stats Section */}
                <div className="mt-16 bg-white rounded-2xl border-4 border-gray-300 shadow-lg p-8">
                    <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: 'var(--color-deep-blue)' }}>
                        Statistik Komunitas
                    </h2>
                    <div className="text-center py-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-cyan-100 rounded-full mb-4">
                            <svg className="w-8 h-8 text-cyan-600 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-cyan-600 mb-2">On Development</h3>
                        <p className="text-gray-600 max-w-md mx-auto">
                            Fitur statistik komunitas sedang dalam pengembangan. Segera hadir dengan data lengkap tentang pertumbuhan dan aktivitas GamedevPKU!
                        </p>
                        <div className="mt-4 flex justify-center gap-2">
                            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ActivitiesPage
