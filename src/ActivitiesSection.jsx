import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import activityImg1 from '../assets/IMG_20251116_171722.jpg'
import activityImg2 from '../assets/IMG-20251116-WA0035.jpg'
import activityImg3 from '../assets/IMG_20251116_141859.jpg'
import gatheringImg from '../assets/gathering1st/Foto bersama GamedevPKU.jpeg'
import gameDevIcon from '../assets/game-development.png'
import gameConsoleIcon from '../assets/game-console.png'

const activityData = [
    { src: activityImg1, title: 'GamedevPKU x Umamusume Pekanbaru', date: 'November 2025', description: '2nd Gathering GamedevPKU collabs with Uma Musume and Other Communities games' },
    { src: activityImg2, title: 'Trophy Tournament Fun Match Day', date: 'November 2025', description: 'Community gaming and networking event' },
    { src: activityImg3, title: '', date: 'November 2025', description: 'Showcasing local game developer projects and The communities Games in Pekanbaru' },
    { src: gatheringImg, title: 'GamedevPKU Gathering', date: 'First Gathering', description: 'First official GamedevPKU community gathering' }
]

function ActivitiesSection() {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [isPaused, setIsPaused] = useState(false)

    useEffect(() => {
        if (isPaused) return

        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % activityData.length)
        }, 4000)

        return () => clearInterval(interval)
    }, [isPaused])

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % activityData.length)
    }

    const prevSlide = () => {
        setCurrentSlide((prev) =>
            (prev - 1 + activityData.length) % activityData.length,
        )
    }

    const goToSlide = (index) => {
        setCurrentSlide(index)
    }

    const togglePause = () => {
        setIsPaused(!isPaused)
    }

    const sliderTrackStyle = {
        width: `${activityData.length * 100}%`,
        transform: `translateX(-${(currentSlide * 100) / activityData.length}%)`,
        transition: 'transform 0.5s ease-in-out'
    }

    const sliderItemStyle = {
        width: `${100 / activityData.length}%`,
    }

    return (
        <section id="activities" className="mt-20 md:mt-32">
            <h3
                className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center mb-12 sm:mb-16 uppercase pixel-text px-4"
                style={{
                    color: 'var(--color-deep-blue)',
                    textShadow: '2px 2px 0 var(--color-neon-green)',
                }}
            >
                Level Up Your Game!
            </h3>
            <div className="order-1 lg:order-2 mb-8 lg:mb-10 px-4">
                <div className="max-w-5xl mx-auto">
                    <div className="relative overflow-hidden rounded-3xl border-4 border-gray-300 shadow-2xl bg-gradient-to-br from-black/10 to-black/5">
                        <div
                            className="flex transition-transform duration-700 ease-in-out"
                            style={sliderTrackStyle}
                        >
                            {activityData.map((activity, index) => (
                                <div
                                    key={index}
                                    className="flex-shrink-0 relative group"
                                    style={sliderItemStyle}
                                >
                                    <div className="relative h-[500px] overflow-hidden">
                                        <img
                                            src={activity.src}
                                            alt={activity.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                            <h4 className="text-2xl font-bold text-white mb-2">{activity.title}</h4>
                                            <p className="text-sm text-gray-200 mb-2">{activity.date}</p>
                                            <p className="text-gray-300 text-sm">{activity.description}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button
                            type="button"
                            onClick={prevSlide}
                            className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 bg-black/70 text-white rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center hover:bg-black/90 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50 shadow-lg hover:scale-110"
                            aria-label="Previous slide"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button
                            type="button"
                            onClick={nextSlide}
                            className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 bg-black/70 text-white rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center hover:bg-black/90 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50 shadow-lg hover:scale-110"
                            aria-label="Next slide"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                        <button
                            type="button"
                            onClick={togglePause}
                            className="absolute bottom-4 right-4 bg-black/70 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-black/90 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50 shadow-lg hover:scale-110"
                            aria-label={isPaused ? "Play" : "Pause"}
                        >
                            {isPaused ? (
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            ) : (
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                                </svg>
                            )}
                        </button>
                    </div>

                    <div className="flex justify-center items-center mt-6 space-x-3">
                        {activityData.map((_, index) => (
                            <button
                                key={index}
                                type="button"
                                onClick={() => goToSlide(index)}
                                className={`h-3 rounded-full transition-all duration-300 ${currentSlide === index ? 'w-8 bg-gradient-to-r from-purple-500 to-purple-600 shadow-lg' : 'w-3 bg-gray-300 hover:bg-gray-400'
                                    }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>

                    <div className="flex justify-center mt-6">
                        <Link
                            to="/activities"
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-bold py-3 px-8 rounded-xl uppercase tracking-wider border-2 border-purple-400 hover:from-purple-600 hover:to-purple-700 hover:scale-105 transition-all duration-300 shadow-lg"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                            Lihat Semua Aktivitas
                        </Link>
                    </div>
                </div>
            </div>
            <div className="grid gap-6 md:gap-8 lg:grid-cols-3 px-4">
                <div className="p-6 sm:p-8 rounded-xl bg-gray-100 border-4 border-gray-300 shadow-lg hover:shadow-xl transition duration-300 text-center">
                    <img
                        src={gameConsoleIcon}
                        alt="Game Console"
                        className="h-16 w-auto object-contain mx-auto mb-4"
                    />
                    <h4
                        className="text-xl sm:text-2xl md:text-3xl font-extrabold mb-4 uppercase pixel-text"
                        style={{ color: 'var(--color-fuchsia)' }}
                    >
                        Coba Games
                    </h4>
                    <p className="text-sm sm:text-base md:text-lg text-gray-700">
                        Mengenal serta mencoba beragam games dan konsolnya, bersama komunitas gamedev dan gamer di Pekanbaru
                    </p>
                </div>

                <div className="p-6 sm:p-8 rounded-xl bg-gray-100 border-4 border-gray-300 shadow-lg hover:shadow-xl transition duration-300 text-center">
                    <div className="pixel-icon pixel-icon-2 mx-auto" />
                    <h4
                        className="text-xl sm:text-2xl md:text-3xl font-extrabold mb-4 uppercase pixel-text"
                        style={{ color: 'var(--color-neon-green)' }}
                    >
                        Koleksi Games
                    </h4>
                    <p className="text-sm sm:text-base md:text-lg text-gray-700">
                        Tunjukkan koleksi games yang sudah kamu coba, bedah gamesnya, hingga mengenal marketnya.
                    </p>
                </div>

                <div className="p-6 sm:p-8 rounded-xl bg-gray-100 border-4 border-gray-300 shadow-lg hover:shadow-xl transition duration-300 text-center">
                    <img
                        src={gameDevIcon}
                        alt="Game Development"
                        className="h-16 w-auto object-contain mx-auto mb-4"
                    />
                    <h4
                        className="text-xl sm:text-2xl md:text-3xl font-extrabold mb-4 uppercase pixel-text"
                        style={{ color: 'var(--color-fuchsia)' }}
                    >
                        Develop Games
                    </h4>
                    <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-6">
                        Mengolah ide bersama dengan gamer dan gamedev, menciptakan produk yang berkaitan dengan industri game, hingga berkolaborasi dengan para ahli di bidangnya.
                    </p>
                    <Link
                        to="/develop-games"
                        className="inline-block bg-gradient-to-r from-purple-500 to-purple-600 text-white font-bold py-3 px-6 rounded-xl uppercase tracking-wider border-2 border-purple-400 hover:from-purple-600 hover:to-purple-700 hover:scale-105 transition-all duration-300 shadow-lg"
                    >
                        Lihat Game List →
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default ActivitiesSection
