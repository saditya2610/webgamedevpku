import marioKontak from '../assets/mariokontak.png'
import ratchetCharacter from '../assets/ratchet.png'

function JoinSection() {
    return (
        <section id="gabung" className="mt-20 md:mt-32 relative">
            <img
                src={ratchetCharacter}
                alt="Ratchet karakter"
                className="pointer-events-none select-none absolute -top-20 left-2 md:left-4 w-44 md:w-52 lg:w-60 drop-shadow-2xl z-0 opacity-95 ratchet-character"
                aria-hidden="true"
            />
            <div className="text-center relative z-[1]">
                <h3
                    className="text-4xl md:text-5xl font-extrabold mb-6 md:mb-8 uppercase pixel-text"
                    style={{
                        color: 'var(--color-deep-blue)',
                        textShadow: '2px 2px 0 var(--color-fuchsia)',
                    }}
                >
                    Hubungi Kami: Start New Game!
                </h3>
                <p className="text-xl text-gray-700 max-w-2xl mx-auto">
                    Terhubung dengan komunitas kami melalui platform di bawah ini. Mari
                    wujudkan ide game Kamu bersama!
                </p>
            </div>

            <div className="mt-12 grid gap-8 lg:grid-cols-[1.3fr,1fr] items-stretch">
                <div className="p-6 md:p-8 rounded-2xl bg-gray-100 border-4 border-gray-300 shadow-lg relative overflow-hidden">
                    <img
                        src={marioKontak}
                        alt="Mario karakter"
                        className="pointer-events-none select-none absolute -right-4 -bottom-4 w-32 md:w-40 lg:w-48 drop-shadow-lg z-0"
                        aria-hidden="true"
                    />
                    <div className="relative z-[1]">
                        <h4
                            className="text-2xl md:text-3xl font-extrabold mb-4 uppercase pixel-text"
                            style={{ color: 'var(--color-fuchsia)' }}
                        >
                            Kenapa Gabung dengan Gamedev PKU?
                        </h4>
                        <p className="text-base md:text-lg text-gray-700 mb-4">
                            Kamu bisa berdiskusi seputar pembuatan game, berbagi progres
                            project, dan menemukan teman kolaborasi baru di Pekanbaru.
                        </p>
                        <ul className="text-left space-y-2 text-sm md:text-base text-gray-800 list-disc list-inside">
                            <li>Update info meetup &amp; event komunitas.</li>
                            <li>Sharing tool, asset, dan tips pengembangan game.</li>
                            <li>Ruang tanya-jawab santai seputar industri game.</li>
                        </ul>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="p-6 md:p-8 rounded-2xl bg-gray-900 border-4 border-white/20 neon-glow-green text-center">
                        <p
                            className="text-xl font-bold uppercase mb-4 pixel-text"
                            style={{ color: 'var(--color-neon-green)' }}
                        >
                            WA Group &gt;&gt;
                        </p>
                        <div className="qr-code-box mx-auto">
                            <img
                                src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://chat.whatsapp.com/E320S5sqo8A8c7zuteeadg?mode=hqrt1"
                                alt="QR Code WhatsApp Group"
                                className="w-40 h-40 object-cover"
                            />
                        </div>
                        <p className="mt-4 text-sm text-gray-300">
                            Scan QR di atas untuk langsung masuk ke grup WhatsApp komunitas.
                        </p>
                    </div>

                    <div className="p-6 md:p-8 rounded-2xl bg-gray-900 border-4 border-white/20 neon-glow-fuchsia text-center">
                        <p
                            className="text-xl font-bold uppercase mb-4 pixel-text"
                            style={{ color: 'var(--color-fuchsia)' }}
                        >
                            IG: @gamedevpku
                        </p>
                        <a
                            href="https://instagram.com/gamedevpku"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block bg-black text-white font-bold py-3 px-8 rounded-xl uppercase hover:bg-gray-800 border-2 border-white/50"
                        >
                            Follow Kami!
                        </a>
                        <p className="mt-3 text-sm text-gray-300">
                            Lihat dokumentasi kegiatan, highlight proyek, dan info terbaru
                            langsung di Instagram.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default JoinSection
