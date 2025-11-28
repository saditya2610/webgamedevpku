import heroCharacter from '../assets/zelda.png'

function HeroSection() {
    return (
        <section id="hero" className="hero-section text-center relative z-[1]">
            <div className="hero-card max-w-4xl mx-auto p-8 md:p-12 rounded-3xl bg-white border-4 border-gray-200 shadow-xl relative">
                <div className="hero-pixels">
                    <span className="hero-pixel hero-pixel-1" />
                    <span className="hero-pixel hero-pixel-2" />
                    <span className="hero-pixel hero-pixel-3" />
                </div>
                <img
                    src={heroCharacter}
                    alt="Karakter hero Gamedev PKU"
                    className="pointer-events-none select-none hidden sm:block absolute -right-10 -bottom-16 w-28 md:w-36 lg:w-44 drop-shadow-2xl z-0"
                    aria-hidden="true"
                />
                <div className="relative z-[1]">
                    <h2
                        className="text-5xl md:text-7xl font-extrabold mb-4 leading-tight game-title"
                        style={{
                            color: 'var(--color-fuchsia)',
                            textShadow: '4px 4px 0 black',
                        }}
                    >
                        Jangan Lupa Main di{' '}
                        <span
                            className="block sm:inline"
                            style={{
                                color: 'var(--color-neon-green)',
                                textShadow: '4px 4px 0 black',
                            }}
                        >
                            GAMEDEVPKU
                        </span>
                    </h2>
                    <p className="text-xl md:text-2xl text-gray-700 mb-8 font-medium">
                        Komunitas Pengembang Game (Game Developer) di Pekanbaru, Riau.
                        Mari berkumpul, berbagi, dan berkolaborasi membuat <em>game</em>{' '}
                        keren!
                    </p>
                    <a
                        href="#activities"
                        className="hero-cta inline-block bg-black text-white text-xl font-bold py-3 px-8 rounded-xl uppercase tracking-widest border-2 border-white neon-glow-green hover:scale-[1.02] transform"
                    >
                        Mulai Berkolaborasi Sekarang!
                    </a>
                </div>
            </div>
        </section>
    )
}

export default HeroSection
