import { useState, useRef, useEffect } from 'react'
import song from '../assets/song/Zelda\'s Lullaby - The Legend of Zelda_ Skyward Sword.mp3'

function AudioPlayer() {
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)
    const audioRef = useRef(null)

    useEffect(() => {
        const audio = audioRef.current
        if (!audio) return

        const setAudioData = () => {
            setDuration(audio.duration)
            setCurrentTime(audio.currentTime)
        }

        const setAudioTime = () => setCurrentTime(audio.currentTime)

        audio.addEventListener('loadeddata', setAudioData)
        audio.addEventListener('timeupdate', setAudioTime)

        // Restore playback state and position
        const savedTime = localStorage.getItem('audioCurrentTime')
        const savedPlayingState = localStorage.getItem('audioIsPlaying')

        if (savedTime) {
            audio.currentTime = parseFloat(savedTime)
        }

        // Auto play when component mounts
        const attemptAutoPlay = () => {
            audio.play().then(() => {
                setIsPlaying(true)
                localStorage.setItem('audioIsPlaying', 'true')
            }).catch(error => {
                console.log('Auto-play failed:', error)
                setIsPlaying(false)
                localStorage.setItem('audioIsPlaying', 'false')
            })
        }

        // Try to play immediately if it was playing before
        if (savedPlayingState === 'true') {
            attemptAutoPlay()
        }

        // Also try on user interaction
        const handleUserInteraction = () => {
            if (!isPlaying) {
                attemptAutoPlay()
            }
        }

        document.addEventListener('click', handleUserInteraction, { once: true })

        // Save current time periodically
        const saveInterval = setInterval(() => {
            if (audio.currentTime) {
                localStorage.setItem('audioCurrentTime', audio.currentTime.toString())
            }
        }, 1000)

        return () => {
            audio.removeEventListener('loadeddata', setAudioData)
            audio.removeEventListener('timeupdate', setAudioTime)
            document.removeEventListener('click', handleUserInteraction)
            clearInterval(saveInterval)
        }
    }, [])

    const togglePlayPause = () => {
        const audio = audioRef.current
        if (!audio) return

        if (isPlaying) {
            audio.pause()
            localStorage.setItem('audioIsPlaying', 'false')
        } else {
            audio.play().catch(error => {
                console.log('Audio play failed:', error)
            })
            localStorage.setItem('audioIsPlaying', 'true')
        }
        setIsPlaying(!isPlaying)
    }

    const formatTime = (time) => {
        if (isNaN(time)) return '0:00'
        const minutes = Math.floor(time / 60)
        const seconds = Math.floor(time % 60)
        return `${minutes}:${seconds.toString().padStart(2, '0')}`
    }

    return (
        <>
            <audio
                ref={audioRef}
                src={song}
                loop
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
            />

            <div className="fixed bottom-4 right-4 bg-black/80 backdrop-blur-md rounded-lg p-3 shadow-2xl border border-cyan-400/30 z-40">
                <div className="flex items-center space-x-3">
                    <button
                        onClick={togglePlayPause}
                        className="w-10 h-10 bg-cyan-500 hover:bg-cyan-400 rounded-full flex items-center justify-center transition-colors shadow-lg"
                    >
                        {isPlaying ? (
                            <div className="w-5 h-5 flex items-center justify-center">
                                <div className="flex space-x-1">
                                    <div className="w-1.5 h-5 bg-white rounded-sm"></div>
                                    <div className="w-1.5 h-5 bg-white rounded-sm"></div>
                                </div>
                            </div>
                        ) : (
                            <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-white border-b-[8px] border-b-transparent ml-1"></div>
                        )}
                    </button>

                    <div className="text-white">
                        <div className="text-xs font-medium text-cyan-300">Now Playing</div>
                        <div className="text-sm font-semibold truncate max-w-[200px]">Zelda's Lullaby</div>
                        <div className="text-xs text-gray-300">
                            {formatTime(currentTime)} / {formatTime(duration)}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AudioPlayer
