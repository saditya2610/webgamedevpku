import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import challenge1 from '../assets/Challenge/challenge_(1).jpeg'
import challenge2 from '../assets/Challenge/challenge_(2).jpeg'
import challenge3 from '../assets/Challenge/challenge_(3).jpeg'
import challenge4 from '../assets/Challenge/challenge_(4).jpeg'
import challenge5 from '../assets/Challenge/challenge_(5).jpeg'

const challengeImages = [challenge1, challenge2, challenge3, challenge4, challenge5]

function LombaPage() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const [showModal, setShowModal] = useState(false)
    const [touchStart, setTouchStart] = useState(0)
    const [touchEnd, setTouchEnd] = useState(0)
    const [isDragging, setIsDragging] = useState(false)
    const [dragStart, setDragStart] = useState(0)
    const [dragOffset, setDragOffset] = useState(0)
    const modalRef = useRef(null)

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % challengeImages.length)
    }

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + challengeImages.length) % challengeImages.length)
    }

    // Touch handlers
    const handleTouchStart = (e) => {
        setTouchEnd(0)
        setTouchStart(e.targetTouches[0].clientX)
        setIsDragging(true)
    }

    const handleTouchMove = (e) => {
        const currentX = e.targetTouches[0].clientX
        setTouchEnd(currentX)
        const offset = currentX - touchStart
        setDragOffset(offset)
    }

    const handleTouchEnd = () => {
        setIsDragging(false)
        setDragOffset(0)
        if (!touchStart || !touchEnd) return
        const distance = touchStart - touchEnd
        const isLeftSwipe = distance > 50
        const isRightSwipe = distance < -50

        if (isLeftSwipe) {
            nextImage()
        } else if (isRightSwipe) {
            prevImage()
        }
    }

    // Mouse drag handlers for laptop
    const handleMouseDown = (e) => {
        setIsDragging(true)
        setDragStart(e.clientX)
        setDragOffset(0)
        e.preventDefault()
    }

    const handleMouseMove = (e) => {
        if (!isDragging) return
        const offset = e.clientX - dragStart
        setDragOffset(offset)
        e.preventDefault()
    }

    const handleMouseUp = (e) => {
        if (!isDragging) return
        setIsDragging(false)
        const distance = dragStart - e.clientX
        const isLeftSwipe = distance > 50
        const isRightSwipe = distance < -50

        setDragOffset(0)
        if (isLeftSwipe) {
            nextImage()
        } else if (isRightSwipe) {
            prevImage()
        }
    }

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!showModal) return
            if (e.key === 'ArrowLeft') prevImage()
            if (e.key === 'ArrowRight') nextImage()
            if (e.key === 'Escape') setShowModal(false)
        }

        const handleGlobalMouseUp = () => {
            setIsDragging(false)
        }

        window.addEventListener('keydown', handleKeyDown)
        window.addEventListener('mouseup', handleGlobalMouseUp)
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
            window.removeEventListener('mouseup', handleGlobalMouseUp)
        }
    }, [showModal, isDragging])

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
                        Game Challenge
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                        Kompetisi dan tantangan game development untuk meningkatkan skill dan portofolio
                    </p>
                </div>

                {/* Back Button */}
                <div className="mb-8">
                    <Link
                        to="/activities"
                        className="inline-flex items-center gap-2 bg-cyan-400 text-blue-900 font-bold py-2 px-6 rounded-full uppercase tracking-wider border-2 border-cyan-300 hover:bg-cyan-300 hover:scale-105 transition-all duration-300 shadow-lg"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Kembali ke Aktivitas
                    </Link>
                </div>

                {/* Single Challenge Card */}
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-2xl border-4 border-gray-300 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                        {/* Instagram-style Image Grid */}
                        <div className="grid grid-cols-2 gap-1 bg-gray-100">
                            <div className="relative col-span-2 row-span-2 aspect-square">
                                <img
                                    src={challengeImages[0]}
                                    alt="Game Challenge"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute bottom-4 left-4 right-4">
                                    <div className="bg-black/60 backdrop-blur-sm rounded-lg p-4">
                                        <h3 className="text-white font-bold text-lg mb-1">Mockup Challenge</h3>
                                        <p className="text-white/90 text-sm">Tantangan pengembangan game</p>
                                    </div>
                                </div>
                            </div>
                            <div className="relative aspect-square">
                                <img
                                    src={challengeImages[1]}
                                    alt="Challenge Gallery 1"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="relative aspect-square">
                                <img
                                    src={challengeImages[2]}
                                    alt="Challenge Gallery 2"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>

                        {/* Instagram-style Content */}
                        <div className="p-6">
                            {/* Header */}
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-cyan-500 rounded-full flex items-center justify-center">
                                        <span className="text-white font-bold text-sm">GD</span>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg" style={{ color: 'var(--color-deep-blue)' }}>
                                            Game Development Challenge (Mockup Challenge)
                                        </h3>
                                        <p className="text-sm text-gray-500">Desember 2025</p>
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    <span className="bg-orange-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                                        Challenge
                                    </span>
                                    <span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                                        27 Desember 2025
                                    </span>
                                </div>
                            </div>

                            {/* Description */}
                            <p className="text-gray-700 mb-4">
                                Mockup Challenge !!. Lihat detail pada gambar untuk informasi lengkap.
                            </p>

                            {/* Engagement Stats */}
                            <div className="flex items-center gap-6 mb-4 pb-4 border-b border-gray-200">
                                <div className="flex items-center gap-2 text-gray-600">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                    <span className="text-sm font-semibold">234</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-600">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                    </svg>
                                    <span className="text-sm font-semibold">42</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-600">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                    <span className="text-sm font-semibold">15 Peserta</span>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3">
                                <button
                                    className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold py-3 px-4 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-200 flex items-center justify-center gap-2"
                                    onClick={() => setShowModal(true)}
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                    Lihat Detail
                                </button>
                                <button className="bg-gray-100 text-gray-700 font-bold py-3 px-4 rounded-lg hover:bg-gray-200 transition-all duration-200">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Instagram-style Swipe Modal */}
                {showModal && (
                    <div
                        ref={modalRef}
                        className={`fixed inset-0 z-50 bg-black flex items-center justify-center ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-4 right-4 z-10 text-white bg-black/50 rounded-full p-2 hover:bg-black/70 transition-all duration-300 transform hover:scale-110"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* Main Image Container with Animation */}
                        <div className="relative w-full h-full flex items-center justify-center">
                            <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
                                <div
                                    className="flex items-center justify-center transition-transform duration-100 ease-out"
                                    style={{
                                        transform: `translateX(${dragOffset}px)`,
                                        cursor: isDragging ? 'grabbing' : 'grab'
                                    }}
                                >
                                    <img
                                        src={challengeImages[currentImageIndex]}
                                        alt={`Challenge Image ${currentImageIndex + 1}`}
                                        className="max-w-[90%] max-h-[80%] sm:max-w-[60%] sm:max-h-[70%] object-contain"
                                        style={{
                                            opacity: isDragging ? 0.8 : 1,
                                            transition: isDragging ? 'none' : 'opacity 0.3s ease-in-out'
                                        }}
                                    />
                                </div>

                                {/* Navigation Buttons with Enhanced Animation */}
                                <button
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-black/50 rounded-full p-3 hover:bg-black/70 transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
                                >
                                    <svg className="w-6 h-6 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>
                                <button
                                    onClick={nextImage}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-black/50 rounded-full p-3 hover:bg-black/70 transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
                                >
                                    <svg className="w-6 h-6 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>

                                {/* Enhanced Image Counter */}
                                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:bg-black/80">
                                    {currentImageIndex + 1} / {challengeImages.length}
                                </div>

                                {/* Enhanced Swipe Indicators */}
                                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-2 bg-black/50 backdrop-blur-sm px-3 py-2 rounded-full">
                                    {challengeImages.map((_, index) => (
                                        <div
                                            key={index}
                                            className={`w-2 h-2 rounded-full transition-all duration-300 transform ${index === currentImageIndex
                                                ? 'bg-white scale-125 shadow-lg'
                                                : 'bg-white/50 hover:bg-white/70'
                                                }`}
                                            style={{
                                                animation: index === currentImageIndex ? 'pulse 2s infinite' : 'none'
                                            }}
                                        />
                                    ))}
                                </div>

                                {/* Side Preview Images */}
                                <div className="absolute left-8 sm:left-16 top-1/2 -translate-y-1/2 opacity-0 sm:opacity-30 transform -translate-x-full transition-all duration-500">
                                    <img
                                        src={challengeImages[(currentImageIndex - 1 + challengeImages.length) % challengeImages.length]}
                                        alt="Previous"
                                        className="w-16 h-16 sm:w-24 sm:h-24 object-cover rounded-lg"
                                    />
                                </div>
                                <div className="absolute right-8 sm:right-16 top-1/2 -translate-y-1/2 opacity-0 sm:opacity-30 transform translate-x-full transition-all duration-500">
                                    <img
                                        src={challengeImages[(currentImageIndex + 1) % challengeImages.length]}
                                        alt="Next"
                                        className="w-16 h-16 sm:w-24 sm:h-24 object-cover rounded-lg"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Enhanced Touch/Swipe Support */}
                        <div className="absolute inset-0 flex items-end justify-center pointer-events-none pb-8">
                            <div className="text-white/80 text-center bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full text-sm animate-pulse">
                                <p className="flex items-center gap-2">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                                    </svg>
                                    Swipe atau gunakan panah untuk navigasi
                                </p>
                            </div>
                        </div>

                        {/* Add custom styles */}
                        <style jsx>{`
                            @keyframes fadeIn {
                                from {
                                    opacity: 0;
                                    transform: scale(0.95);
                                }
                                to {
                                    opacity: 1;
                                    transform: scale(1);
                                }
                            }
                            @keyframes pulse {
                                0%, 100% {
                                    opacity: 1;
                                }
                                50% {
                                    opacity: 0.7;
                                }
                            }
                        `}</style>
                    </div>
                )}
            </div>
        </div>
    )
}

export default LombaPage