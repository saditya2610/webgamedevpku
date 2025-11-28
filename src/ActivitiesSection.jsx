import { useEffect, useState } from 'react'
import activityImg1 from '../assets/IMG_20251116_171722.jpg'
import activityImg2 from '../assets/IMG-20251116-WA0035.jpg'
import activityImg3 from '../assets/IMG_20251116_141859.jpg'

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
    }

    const sliderItemStyle = {
        width: `${100 / activityImages.length}%`,
    }

    return (
        <section id="activities" className="mt-20 md:mt-32">
            <h3
                className="text-4xl md:text-5xl font-extrabold text-center mb-16 uppercase pixel-text"
                style={{
                    color: 'var(--color-deep-blue)',
                    textShadow: '2px 2px 0 var(--color-neon-green)',
                }}
            >
                Level Up Your Game!
            </h3>
            <div className="mt-10 grid gap-8 md:gap-10 lg:gap-12 lg:grid-cols-2 items-start">
                <div className="order-2 lg:order-1 space-y-6 md:space-y-8">
                    <div className="p-6 md:p-8 rounded-xl bg-gray-100 border-4 border-gray-300 shadow-lg hover:shadow-xl transition duration-300 text-center">
                        <div className="pixel-icon pixel-icon-1 mx-auto" />
                        <h4
                            className="text-2xl md:text-3xl font-extrabold mb-4 uppercase pixel-text"
                            style={{ color: 'var(--color-fuchsia)' }}
                        >
                            Coba Games
                        </h4>
                        <p className="text-base md:text-lg text-gray-700">
                            Mainkan game-game terbaru dan karya komunitas lokal. Beri{' '}
                            <em>feedback</em> dan temukan inspirasi!
                        </p>
                    </div>

                    <div className="p-8 rounded-xl bg-gray-100 border-4 border-gray-300 shadow-lg hover:shadow-xl transition duration-300 text-center">
                        <div className="pixel-icon pixel-icon-2 mx-auto" />
                        <h4
                            className="text-2xl md:text-3xl font-extrabold mb-4 uppercase pixel-text"
                            style={{ color: 'var(--color-neon-green)' }}
                        >
                            Koleksi Games
                        </h4>
                        <p className="text-base md:text-lg text-gray-700">
                            Perluas <em>library</em> game Kamu dengan judul-judul unik dari
                            pengembang independen di Pekanbaru.
                        </p>
                    </div>

                    <div className="p-8 rounded-xl bg-gray-100 border-4 border-gray-300 shadow-lg hover:shadow-xl transition duration-300 text-center">
                        <div className="pixel-icon pixel-icon-3 mx-auto" />
                        <h4
                            className="text-2xl md:text-3xl font-extrabold mb-4 uppercase pixel-text"
                            style={{ color: 'var(--color-fuchsia)' }}
                        >
                            Develop Games
                        </h4>
                        <p className="text-base md:text-lg text-gray-700">
                            Dari ide hingga rilis, kembangkan game impian Kamu bersama para
                            ahli dan <em>passionate developer</em>.
                        </p>
                    </div>
                </div>

                <div className="order-1 lg:order-2">
                    <div className="max-w-xl mx-auto">
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
                                            className="w-full max-h-[420px] object-contain bg-black"
                                        />
                                    </div>
                                ))}
                            </div>

                            <button
                                type="button"
                                onClick={prevSlide}
                                className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/60 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-black/80 transition"
                            >
                                &#10094;
                            </button>
                            <button
                                type="button"
                                onClick={nextSlide}
                                className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/60 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-black/80 transition"
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
                                    className={`w-3 h-3 rounded-full border border-black ${currentSlide === index ? 'bg-black' : 'bg-white/60'
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ActivitiesSection
