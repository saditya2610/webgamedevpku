import heroCharacter from '../assets/zelda.png'

function HeroSection() {
    return (
        <section id="hero" className="hero-section relative z-[1] py-10 px-4 overflow-hidden">
            <div className="relative max-w-5xl mx-auto">
                {/* Decorative Background Blobs */}
                <div className="absolute top-0 -left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-[pulse_4s_ease-in-out_infinite]"></div>
                <div className="absolute top-0 -right-10 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-[pulse_4s_ease-in-out_infinite_1s]"></div>
                <div className="absolute -bottom-10 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-[pulse_4s_ease-in-out_infinite_2s]"></div>
                
                {/* Main Card */}
                <div className="hero-card relative p-10 md:p-16 rounded-[2.5rem] bg-white/80 backdrop-blur-xl border-2 border-white/60 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] group transition-all duration-500 hover:shadow-[0_20px_60px_-15px_rgba(147,51,234,0.2)]">
                    <div className="hero-pixels">
                        <span className="hero-pixel hero-pixel-1" />
                        <span className="hero-pixel hero-pixel-2" />
                        <span className="hero-pixel hero-pixel-3" />
                    </div>
                    
                    <img
                        src={heroCharacter}
                        alt="Karakter hero Gamedev PKU"
                        className="pointer-events-none select-none hidden sm:block absolute -right-8 -bottom-12 w-28 md:w-36 lg:w-48 xl:w-56 drop-shadow-[0_20px_20px_rgba(0,0,0,0.3)] z-10 transition-transform duration-700 group-hover:-translate-y-4 group-hover:scale-110"
                        aria-hidden="true"
                    />
                    
                    <div className="relative z-[1] flex flex-col items-center text-center">
                        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl mb-6 leading-tight game-title transform transition-transform duration-500">
                            <span 
                                className="inline-block text-[#FF00FF] drop-shadow-[4px_4px_0_rgba(0,0,0,1)]" 
                                style={{ WebkitTextStroke: '1.5px black' }}
                            >
                                Jangan Lupa Main di
                            </span>
                            <br />
                            <span 
                                className="inline-block mt-2 sm:mt-4 text-[#00FF00] drop-shadow-[5px_5px_0_rgba(0,0,0,1)]" 
                                style={{ WebkitTextStroke: '2px black' }}
                            >
                                GAMEDEVPKU
                            </span>
                        </h2>
                        
                        <p className="text-lg sm:text-xl md:text-2xl text-gray-700 mb-10 font-bold max-w-2xl leading-relaxed">
                            Komunitas Pengembang Game di Pekanbaru, Riau.
                            Mari berkumpul, berbagi, dan berkolaborasi membuat <span className="text-purple-600">game keren!</span>
                        </p>
                        
                        <a
                            href="#activities"
                            className="relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-300 bg-gray-900 rounded-2xl overflow-hidden hover:scale-105 hover:shadow-[0_0_40px_rgba(16,185,129,0.5)] group/btn"
                        >
                            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-gray-900 to-black"></span>
                            <span className="relative z-10 flex items-center gap-2">
                                Mulai Berkolaborasi Sekarang!
                                <svg className="w-6 h-6 group-hover/btn:translate-x-2 transition-transform duration-300 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
                            </span>
                            <div className="absolute inset-0 border-2 border-white/10 rounded-2xl"></div>
                            <div className="absolute inset-0 border-2 border-emerald-500 rounded-2xl opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HeroSection
