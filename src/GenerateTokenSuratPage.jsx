import React, { useState, useEffect } from 'react';

const GenerateTokenSuratPage = () => {
    const [token, setToken] = useState('');
    
    const generateNewToken = () => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let newToken = 'GDPKU-';
        for (let i = 0; i < 5; i++) {
            newToken += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        setToken(newToken);
        localStorage.setItem('adminToken', newToken);
    };

    useEffect(() => {
        const savedToken = localStorage.getItem('adminToken');
        if (savedToken) {
            setToken(savedToken);
        } else {
            generateNewToken();
        }
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8 animate-fade-in">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-500/20 text-red-500 mb-6 border-2 border-red-500/50">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-amber-500 mb-4 drop-shadow-md">Panel Admin Tersembunyi</h1>
            <p className="text-gray-300 mb-10 max-w-lg leading-relaxed">
                Halaman ini ditujukan <strong className="text-white">khusus untuk pengurus Gamedev PKU</strong>. 
                Gunakan token di bawah ini untuk membuka akses pengunggahan tanda tangan di menu <span className="font-mono bg-black/30 px-1 rounded">Generate Surat Resmi</span>.
            </p>
            
            <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative bg-black/60 backdrop-blur-xl border border-white/10 p-8 sm:p-12 rounded-2xl shadow-2xl">
                    <div className="text-sm font-bold tracking-widest text-cyan-400 mb-3 uppercase flex items-center justify-center gap-2">
                        <span>✨</span> Token Sekali Pakai <span>✨</span>
                    </div>
                    <div className="text-5xl sm:text-7xl font-mono font-black text-white tracking-widest selection:bg-cyan-900 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                        {token}
                    </div>
                    <button 
                        onClick={generateNewToken}
                        className="mt-6 px-6 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-sm font-bold text-white transition-all hover:scale-105 active:scale-95"
                    >
                        🔄 Generate Token Baru
                    </button>
                </div>
            </div>
            
            <p className="mt-12 text-xs text-gray-500 italic bg-black/20 py-2 px-4 rounded-full border border-white/5">
                *Sistem keamanan dinamis: Token ini hanya bisa digunakan satu kali. Setelah dipakai, sistem akan meresetnya secara otomatis.
            </p>
        </div>
    );
};

export default GenerateTokenSuratPage;
