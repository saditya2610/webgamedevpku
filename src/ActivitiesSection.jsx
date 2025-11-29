import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import activityImg1 from '../assets/IMG_20251116_171722.jpg'
import activityImg2 from '../assets/IMG-20251116-WA0035.jpg'
import activityImg3 from '../assets/IMG_20251116_141859.jpg'
import gameDevIcon from '../assets/game-development.png'
import gameConsoleIcon from '../assets/game-console.png'

function ActivitiesSection() {
    const activityImages = [activityImg1, activityImg2, activityImg3]
    const [currentSlide, setCurrentSlide] = useState(0)

    useEffect(() => {
        if (activityImages.length === 0) return

        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % activityImages.length)
        }, 4000)

        return () => clearInterval(interval)
    }, [activityImages.length])

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % activityImages.length)
    }

    const prevSlide = () => {
        setCurrentSlide((prev) =>
            (prev - 1 + activityImages.length) % activityImages.length,
        )
    }

    const sliderTrackStyle = {
        width: `${activityImages.length * 100}%`,
        transform: `translateX(-${(currentSlide * 100) / activityImages.length}%)`,
        transition: 'transform 0.5s ease-in-out'
    }

    const sliderItemStyle = {
        width: `${100 / activityImages.length}%`,
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
                <div className="max-w-4xl mx-auto">
                    <div className="relative overflow-hidden rounded-2xl border-4 border-gray-300 shadow-xl bg-black/5">
                        <div
                            className="flex transition-transform duration-700 ease-in-out"
                            style={sliderTrackStyle}
                        >
                            {activityImages.map((imgSrc, index) => (
                                <div
                                    // eslint-disable-next-line react/no-array-index-key
                                    key={index}
                                    className="flex-shrink-0 flex items-center justify-center"
                                    style={sliderItemStyle}
                                >
                                    <img
                                        src={imgSrc}
                                        alt={`Aktivitas Gamedev PKU ${index + 1}`}
                                        className="w-full max-h-[500px] object-contain bg-black"
                                    />
                                </div>
                            ))}
                        </div>

                        <button
                            type="button"
                            onClick={prevSlide}
                            className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 bg-black/60 text-white rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center hover:bg-black/80 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50"
                            aria-label="Previous slide"
                        >
                            &#10094;
                        </button>
                        <button
                            type="button"
                            onClick={nextSlide}
                            className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 bg-black/60 text-white rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center hover:bg-black/80 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50"
                            aria-label="Next slide"
                        >
                            &#10095;
                        </button>
                    </div>

                    <div className="flex justify-center mt-4 space-x-2">
                        {activityImages.map((_, index) => (
                            <button
                                // eslint-disable-next-line react/no-array-index-key
                                key={index}
                                type="button"
                                onClick={() => setCurrentSlide(index)}
                                className={`w-3 h-3 rounded-full border border-black transition-all duration-200 ${currentSlide === index ? 'bg-black scale-110' : 'bg-white/60 hover:bg-white/80'
                                    }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
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
