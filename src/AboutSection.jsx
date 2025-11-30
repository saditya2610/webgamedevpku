function AboutSection() {
    return (
        <>
            <section
                id="tentang"
                className="mt-16 md:mt-32 p-6 sm:p-8 md:p-10 rounded-2xl bg-gray-100 border-4 border-gray-300 shadow-xl text-center"
            >
                <h3
                    className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 uppercase pixel-text px-4"
                    style={{
                        color: 'var(--color-deep-blue)',
                        textShadow: '2px 2px 0 black',
                    }}
                >
                    Tentang Komunitas Gamedev PKU
                </h3>
                <p className="text-lg sm:text-xl mb-8 font-medium text-gray-700 max-w-4xl mx-auto px-4">
                    "Menjadikan komunitas yang menaungi ekosistem talenta industri gim secara inklusif dan inspiratif hingga mampu menciptakan karya yang menjual dan berdaya saing agar terwujudnya aspek gim sebagai ekonomi kreatif!"
                </p>
                <a
                    href="#gabung"
                    className="inline-block bg-black text-white text-lg sm:text-xl font-bold py-3 px-6 sm:px-8 rounded-xl uppercase tracking-widest border-2 border-gray-300 shadow-lg hover:shadow-xl hover:scale-[1.02] transform transition-all duration-300"
                >
                    Ayo Mulai Petualanganmu!
                </a>
            </section>

            <section className="mt-12 sm:mt-16 mb-16 md:mb-20 px-4">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2
                            className="text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase pixel-text mb-4"
                            style={{
                                color: 'var(--color-deep-blue)',
                                textShadow: '2px 2px 0 black',
                            }}
                        >
                            📜 Pondasi Gamedev PKU
                        </h2>
                        <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
                            Tiga pilar utama yang membentuk ekosistem game development di Pekanbaru
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {/* Coba Games Character Card */}
                        <div className="group relative">
                            <div className="bg-white rounded-2xl border-4 border-gray-300 shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
                                <div className="bg-gradient-to-br from-green-500 to-green-600 p-4 sm:p-6 text-center">
                                    <div className="inline-block w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-4">
                                        <span className="text-2xl sm:text-3xl font-bold text-white">1</span>
                                    </div>
                                    <h3 className="text-xl sm:text-2xl font-bold text-white uppercase tracking-wider">Coba Games</h3>
                                </div>
                                <div className="p-4 sm:p-6">
                                    <p className="text-gray-600 mb-6 text-center text-sm sm:text-base">
                                        Platform untuk eksplorasi dan pengalaman gaming bersama komunitas
                                    </p>
                                    <div className="space-y-3">
                                        <div className="flex items-start space-x-3">
                                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                                            <p className="text-gray-700">Mencoba beragam game dan konsol</p>
                                        </div>
                                        <div className="flex items-start space-x-3">
                                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                                            <p className="text-gray-700">Mengenal industri game general</p>
                                        </div>
                                        <div className="flex items-start space-x-3">
                                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                                            <p className="text-gray-700">Mengadakan turnamen game</p>
                                        </div>
                                        <div className="flex items-start space-x-3">
                                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                                            <p className="text-gray-700">Kumpul bersama komunitas</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Koleksi Games Character Card */}
                        <div className="group relative">
                            <div className="bg-white rounded-2xl border-4 border-gray-300 shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
                                <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 sm:p-6 text-center">
                                    <div className="inline-block w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-4">
                                        <span className="text-2xl sm:text-3xl font-bold text-white">2</span>
                                    </div>
                                    <h3 className="text-xl sm:text-2xl font-bold text-white uppercase tracking-wider">Koleksi Games</h3>
                                </div>
                                <div className="p-4 sm:p-6">
                                    <p className="text-gray-600 mb-6 text-center text-sm sm:text-base">
                                        Wadah untuk koleksi, diskusi, dan analisis game mendalam
                                    </p>
                                    <div className="space-y-3">
                                        <div className="flex items-start space-x-3">
                                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                                            <p className="text-gray-700">Membahas koleksi games</p>
                                        </div>
                                        <div className="flex items-start space-x-3">
                                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                                            <p className="text-gray-700">Bedah games dan tema</p>
                                        </div>
                                        <div className="flex items-start space-x-3">
                                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                                            <p className="text-gray-700">Transaksi dan market analysis</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Develop Games Character Card */}
                        <div className="group relative">
                            <div className="bg-white rounded-2xl border-4 border-gray-300 shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
                                <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-4 sm:p-6 text-center">
                                    <div className="inline-block w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-4">
                                        <span className="text-2xl sm:text-3xl font-bold text-white">3</span>
                                    </div>
                                    <h3 className="text-xl sm:text-2xl font-bold text-white uppercase tracking-wider">Develop Games</h3>
                                </div>
                                <div className="p-4 sm:p-6">
                                    <p className="text-gray-600 mb-6 text-center text-sm sm:text-base">
                                        Ekosistem untuk pengembangan game dan industri kreatif
                                    </p>
                                    <div className="space-y-3">
                                        <div className="flex items-start space-x-3">
                                            <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                                            <p className="text-gray-700">Pengembangan dan talent search</p>
                                        </div>
                                        <div className="flex items-start space-x-3">
                                            <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                                            <p className="text-gray-700">Kolaborasi industri</p>
                                        </div>
                                        <div className="flex items-start space-x-3">
                                            <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                                            <p className="text-gray-700">Showcase dan testing</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default AboutSection
