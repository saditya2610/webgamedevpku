function AboutSection() {
    return (
        <section
            id="tentang"
            className="mt-20 md:mt-32 p-10 rounded-2xl bg-gray-900 border-4 border-white/20 neon-glow-green text-center"
        >
            <h3
                className="text-4xl font-bold mb-4 uppercase"
                style={{ color: 'var(--color-fuchsia)' }}
            >
                Tentang Komunitas Gamedev PKU
            </h3>
            <p className="text-xl mb-8 font-medium text-gray-300">
                Gamedev PKU adalah titik temu bagi siapa saja yang memiliki
                ketertarikan pada seni dan sains pembuatan game. Kami menyediakan
                platform untuk belajar, berkreasi, dan meluncurkan proyek game.
                Bergabunglah dengan kami untuk mengubah ide-ide brilian menjadi
                pengalaman bermain yang tak terlupakan!
            </p>
            <a
                href="#gabung"
                className="inline-block bg-black text-white text-xl font-bold py-3 px-8 rounded-xl uppercase tracking-widest border-2 border-white neon-glow-fuchsia hover:scale-[1.02] transform"
            >
                Ayo Mulai Petualanganmu!
            </a>
        </section>
    )
}

export default AboutSection
