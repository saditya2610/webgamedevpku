import React from 'react';

// Import image from the assets folder outside src
import resourceImage from '../assets/SMKMUDA/game_start_in_a_school.png';

const ResourcePage = () => {
    return (
        <main className="min-h-screen pt-32 pb-12 px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center">
            {/* Background blur container */}
            <div className="absolute inset-0 bg-blue-950/80 backdrop-blur-sm -z-10"></div>
            
            <div className="max-w-4xl w-full">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-5xl font-black text-white mb-4 uppercase tracking-widest" style={{ textShadow: '2px 2px 0 #0891b2' }}>
                        GAME RESOURCES
                    </h1>
                    <p className="text-cyan-300 text-lg md:text-xl font-bold tracking-wide">
                        Kumpulan Materi & Aset Pembelajaran
                    </p>
                </div>

                {/* Resource Card */}
                <div className="bg-white/10 backdrop-blur-md rounded-xl border-2 border-cyan-500/50 overflow-hidden shadow-[0_0_15px_rgba(34,211,238,0.2)] hover:shadow-[0_0_25px_rgba(34,211,238,0.4)] transition-shadow">
                    <div className="flex flex-col md:flex-row">
                        {/* Image Section */}
                        <div className="md:w-2/5 p-4 border-b md:border-b-0 md:border-r border-cyan-500/30 flex items-center justify-center bg-black/40">
                            <img 
                                src={resourceImage} 
                                alt="Game Start In A School" 
                                className="w-full h-auto max-h-[300px] object-contain rounded-lg shadow-lg border border-white/10"
                            />
                        </div>
                        
                        {/* Content Section */}
                        <div className="md:w-3/5 p-6 md:p-8 flex flex-col justify-center">
                            <div className="inline-block px-3 py-1 bg-yellow-400 text-blue-950 text-xs font-black uppercase tracking-widest rounded-full w-max mb-4">
                                Materi Dasar
                            </div>
                            
                            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                                Pengenalan Industri & Engine Game
                            </h2>
                            
                            <p className="text-cyan-100 mb-8 leading-relaxed">
                                Materi ini berasal dari Kegiatan Workshop SMK Muhammadiyah 2 Pekanbaru, berisi pengantar dasar mengenai industri game, dasar-seputar game engine, reverse engineering, dan dasar pembuatan variasi game sederhana. Silakan unduh modul dan bahan prakteknya melalui tautan di bawah ini.
                            </p>
                            
                            <a 
                                href="https://drive.google.com/drive/folders/1ivoVLhgh1rrzGb7hk3lVVJyaxZh2Sy7g?usp=sharing"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative inline-flex items-center justify-center px-6 py-3 font-bold text-blue-950 bg-cyan-400 rounded-lg hover:bg-cyan-300 transition-colors w-max uppercase tracking-wider"
                            >
                                <span className="absolute left-0 w-2 h-full bg-yellow-400 rounded-l-lg group-hover:w-full transition-all duration-300 opacity-20"></span>
                                <span className="relative flex items-center gap-2">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                    </svg>
                                    Akses Materi (G-Drive)
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ResourcePage;
