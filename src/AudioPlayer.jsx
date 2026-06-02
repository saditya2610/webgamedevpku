import { useState, useRef, useEffect } from 'react'
import zeldaSong from '../assets/song/Zelda\'s Lullaby - The Legend of Zelda_ Skyward Sword.mp3'
import ffixSong from '../assets/song/FFIX - Melodies of Life (Music box) [Extended].mp3'

const playlist = [
    {
        id: 1,
        title: "Zelda's Lullaby",
        artist: "The Legend of Zelda",
        src: zeldaSong
    },
    {
        id: 2,
        title: "Melodies of Life (Music box)",
        artist: "Final Fantasy IX",
        src: ffixSong
    }
]

function AudioPlayer() {
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)
    const [currentSongIndex, setCurrentSongIndex] = useState(0)
    const [isExpanded, setIsExpanded] = useState(false)
    const audioRef = useRef(null)

    useEffect(() => {
        const audio = audioRef.current
        if (!audio) return

        const setAudioData = () => {
            setDuration(audio.duration)
        }

        const setAudioTime = () => setCurrentTime(audio.currentTime)
        
        const handleEnded = () => {
            setCurrentSongIndex(prev => {
                const nextIndex = (prev + 1) % playlist.length;
                localStorage.setItem('audioCurrentSongIndex', nextIndex.toString());
                localStorage.setItem('audioCurrentTime', '0');
                return nextIndex;
            });
            // We'll let the other useEffect handle playing the new song
            if (isPlaying) {
                // Ensure it plays when changed
                setTimeout(() => {
                    audioRef.current?.play().catch(console.error);
                }, 100);
            }
        }

        audio.addEventListener('loadedmetadata', setAudioData)
        audio.addEventListener('timeupdate', setAudioTime)
        audio.addEventListener('ended', handleEnded)

        // Restore playback state, position, and song index
        const savedTime = localStorage.getItem('audioCurrentTime')
        const savedPlayingState = localStorage.getItem('audioIsPlaying')
        const savedSongIndex = localStorage.getItem('audioCurrentSongIndex')

        if (savedSongIndex !== null && !isNaN(savedSongIndex)) {
            const index = parseInt(savedSongIndex)
            if (index >= 0 && index < playlist.length) {
                setCurrentSongIndex(index)
            }
        }

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

        if (savedPlayingState === 'true') {
            attemptAutoPlay()
        }

        const handleUserInteraction = () => {
            if (!isPlaying) {
                attemptAutoPlay()
            }
        }

        document.addEventListener('click', handleUserInteraction, { once: true })

        const saveInterval = setInterval(() => {
            if (audio.currentTime) {
                localStorage.setItem('audioCurrentTime', audio.currentTime.toString())
            }
        }, 1000)

        return () => {
            audio.removeEventListener('loadedmetadata', setAudioData)
            audio.removeEventListener('timeupdate', setAudioTime)
            audio.removeEventListener('ended', handleEnded)
            document.removeEventListener('click', handleUserInteraction)
            clearInterval(saveInterval)
        }
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    // Update src and play when song changes (if we didn't just mount)
    const currentSongRef = useRef(currentSongIndex);
    useEffect(() => {
        if (currentSongRef.current !== currentSongIndex) {
            currentSongRef.current = currentSongIndex;
            localStorage.setItem('audioCurrentSongIndex', currentSongIndex.toString());
            localStorage.setItem('audioCurrentTime', '0'); // Reset time
            
            const audio = audioRef.current;
            if (audio) {
                audio.currentTime = 0;
                if (isPlaying) {
                    audio.play().catch(console.error);
                }
            }
        }
    }, [currentSongIndex, isPlaying]);

    const togglePlayPause = (e) => {
        if (e) e.stopPropagation();
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

    const playNext = (e) => {
        if (e) e.stopPropagation();
        setCurrentSongIndex((prev) => (prev + 1) % playlist.length)
        if (!isPlaying) {
            setIsPlaying(true)
            localStorage.setItem('audioIsPlaying', 'true')
        }
    }

    const playPrev = (e) => {
        if (e) e.stopPropagation();
        setCurrentSongIndex((prev) => (prev - 1 + playlist.length) % playlist.length)
        if (!isPlaying) {
            setIsPlaying(true)
            localStorage.setItem('audioIsPlaying', 'true')
        }
    }

    const handleProgressChange = (e) => {
        const audio = audioRef.current
        if (!audio) return

        const newTime = (e.target.value / 100) * duration
        audio.currentTime = newTime
        setCurrentTime(newTime)
    }

    const formatTime = (time) => {
        if (isNaN(time)) return '0:00'
        const minutes = Math.floor(time / 60)
        const seconds = Math.floor(time % 60)
        return `${minutes}:${seconds.toString().padStart(2, '0')}`
    }

    const currentSong = playlist[currentSongIndex]

    return (
        <>
            <audio
                ref={audioRef}
                src={currentSong.src}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
            />

            <div 
                className={`print:hidden fixed bottom-6 right-6 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] z-50 ${isExpanded ? 'w-[340px] h-[110px]' : 'w-14 h-14'} overflow-hidden shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] border border-white/20 group ${isExpanded ? 'rounded-2xl bg-black/70 backdrop-blur-2xl' : 'rounded-full bg-gradient-to-tr from-cyan-600 to-purple-600 hover:scale-105 hover:shadow-[0_0_20px_rgba(6,182,212,0.6)]'}`}
                onMouseEnter={() => setIsExpanded(true)}
                onMouseLeave={() => setIsExpanded(false)}
            >
                {/* Compact View - Floating Action Button */}
                <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${isExpanded ? 'opacity-0 scale-50 pointer-events-none' : 'opacity-100 scale-100'}`}>
                    <button
                        onClick={togglePlayPause}
                        className="w-full h-full rounded-full flex items-center justify-center text-white relative"
                    >
                        {isPlaying && (
                            <div className="absolute inset-0 rounded-full animate-ping bg-white/40" style={{ animationDuration: '2.5s' }}></div>
                        )}
                        {/* Spinning Vinyl or Note */}
                        <div className={`relative z-10 flex items-center justify-center w-10 h-10 rounded-full bg-black/20 backdrop-blur-sm border border-white/20 shadow-inner ${isPlaying ? 'animate-[spin_4s_linear_infinite]' : ''}`}>
                           {isPlaying ? (
                                <svg className="w-5 h-5 text-cyan-100" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 14.5c-2.481 0-4.5-2.019-4.5-4.5S9.519 7.5 12 7.5s4.5 2.019 4.5 4.5-2.019 4.5-4.5 4.5z"/>
                                    <circle cx="12" cy="12" r="2" fill="#fff"/>
                                </svg>
                            ) : (
                                <svg className="w-5 h-5 ml-0.5 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" /></svg>
                            )}
                        </div>
                    </button>
                </div>

                {/* Expanded View */}
                <div className={`absolute inset-0 p-4 flex flex-col justify-between transition-all duration-300 delay-100 ${isExpanded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
                    <div className="flex justify-between items-start">
                        <div className="flex flex-col overflow-hidden mr-2 max-w-[170px]">
                            <span className="text-cyan-400 text-[10px] font-bold tracking-widest uppercase flex items-center gap-1.5 mb-1">
                                {isPlaying ? (
                                    <div className="flex items-end space-x-[2px] h-2.5">
                                        <div className="w-[3px] bg-cyan-400 animate-[bounce_1s_infinite] rounded-t-sm h-full"></div>
                                        <div className="w-[3px] bg-cyan-400 animate-[bounce_1s_infinite_0.2s] rounded-t-sm h-2/3"></div>
                                        <div className="w-[3px] bg-cyan-400 animate-[bounce_1s_infinite_0.4s] rounded-t-sm h-full"></div>
                                    </div>
                                ) : (
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path></svg>
                                )}
                                Now Playing
                            </span>
                            <span className="text-white font-extrabold text-sm truncate drop-shadow-md">{currentSong.title}</span>
                            <span className="text-gray-300 text-xs truncate font-medium">{currentSong.artist}</span>
                        </div>

                        {/* Controls */}
                        <div className="flex items-center space-x-2 bg-white/10 px-3 py-1.5 rounded-full border border-white/5 backdrop-blur-md shadow-inner">
                            <button onClick={playPrev} className="text-gray-400 hover:text-white transition-all hover:scale-110 active:scale-95">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M8.445 14.832A1 1 0 0010 14v-2.798l5.445 3.63A1 1 0 0017 14V6a1 1 0 00-1.555-.832L10 8.798V6a1 1 0 00-1.555-.832l-6 4a1 1 0 000 1.664l6 4z"/></svg>
                            </button>
                            
                            <button
                                onClick={togglePlayPause}
                                className="w-9 h-9 bg-gradient-to-tr from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95 shadow-[0_0_15px_rgba(6,182,212,0.6)]"
                            >
                                {isPlaying ? (
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                                ) : (
                                    <svg className="w-4 h-4 ml-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" /></svg>
                                )}
                            </button>
                            
                            <button onClick={playNext} className="text-gray-400 hover:text-white transition-all hover:scale-110 active:scale-95">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M11.555 14.832A1 1 0 0013 14v-2.798l5.445 3.63A1 1 0 0020 14V6a1 1 0 00-1.555-.832L13 8.798V6a1 1 0 00-1.555-.832l-6 4a1 1 0 000 1.664l6 4z"/><path d="M2.555 14.832A1 1 0 004 14v-2.798l5.445 3.63A1 1 0 0011 14V6a1 1 0 00-1.555-.832L4 8.798V6a1 1 0 00-1.555-.832l-6 4a1 1 0 000 1.664l6 4z"/></svg>
                            </button>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="flex items-center space-x-3 text-[10px] font-bold text-gray-300 mt-1">
                        <span className="w-7 text-right font-mono">{formatTime(currentTime)}</span>
                        <div className="relative flex-1 h-1.5 group cursor-pointer">
                            <input 
                                type="range" 
                                min="0" 
                                max="100" 
                                value={duration ? (currentTime / duration) * 100 : 0} 
                                onChange={handleProgressChange}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                            />
                            <div className="absolute inset-0 bg-white/20 rounded-full overflow-hidden">
                                <div 
                                    className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full transition-all duration-100"
                                    style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                                ></div>
                            </div>
                            {/* Thumb indicator */}
                            <div 
                                className="absolute top-1/2 -mt-1.5 w-3 h-3 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                                style={{ left: `calc(${duration ? (currentTime / duration) * 100 : 0}% - 6px)` }}
                            ></div>
                        </div>
                        <span className="w-7 text-left font-mono">{formatTime(duration)}</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AudioPlayer
