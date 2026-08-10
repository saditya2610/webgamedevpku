import React, { useState, useRef, useEffect } from 'react';
import { GRADIENTS } from './constants/styles';

const COLORS = [
    '#f87171', // red-400
    '#fbbf24', // amber-400
    '#34d399', // emerald-400
    '#60a5fa', // blue-400
    '#a78bfa', // violet-400
    '#f472b6', // pink-400
    '#fb923c', // orange-400
    '#2dd4bf', // teal-400
];

const WheelOfNamesPage = () => {
    const [names, setNames] = useState("Siswa 1\nSiswa 2\nSiswa 3\nSiswa 4\nSiswa 5\nSiswa 6");
    const [isSpinning, setIsSpinning] = useState(false);
    const [winner, setWinner] = useState(null);

    const canvasRef = useRef(null);
    const namesList = names.split('\n').map(n => n.trim()).filter(n => n !== '');

    // Physics/Animation state refs
    const currentRotation = useRef(0);
    const spinVelocity = useRef(0);
    const animationRef = useRef(null);
    const isSpinningRef = useRef(false);

    const drawWheel = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;
        const centerX = width / 2;
        const centerY = height / 2;
        const radius = Math.min(centerX, centerY) - 10; // 10px padding

        ctx.clearRect(0, 0, width, height);

        if (namesList.length === 0) {
            // Draw empty wheel
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
            ctx.fillStyle = '#1e3a8a'; // blue-900
            ctx.fill();
            ctx.lineWidth = 4;
            ctx.strokeStyle = '#fff';
            ctx.stroke();

            ctx.fillStyle = '#fff';
            ctx.font = 'bold 20px monospace';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('MASUKKAN NAMA', centerX, centerY);
            return;
        }

        const arcSize = (2 * Math.PI) / namesList.length;

        // Save context for rotation
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(currentRotation.current);

        namesList.forEach((name, index) => {
            const angle = index * arcSize;

            // Draw slice
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.arc(0, 0, radius, angle, angle + arcSize);
            ctx.closePath();
            ctx.fillStyle = COLORS[index % COLORS.length];
            ctx.fill();
            ctx.lineWidth = 2;
            ctx.strokeStyle = '#fff';
            ctx.stroke();

            // Draw text
            ctx.save();
            ctx.rotate(angle + arcSize / 2);
            ctx.textAlign = 'right';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = '#fff';
            ctx.font = 'bold 16px sans-serif';

            // Shadow for text readability
            ctx.shadowColor = 'rgba(0,0,0,0.8)';
            ctx.shadowBlur = 4;

            // Max text width based on radius
            const maxTextWidth = radius - 40;
            let displayName = name;
            if (ctx.measureText(name).width > maxTextWidth) {
                displayName = name.substring(0, 10) + '...';
            }

            ctx.fillText(displayName, radius - 20, 0);
            ctx.restore();
        });

        ctx.restore();

        // Draw center peg / inner circle
        ctx.beginPath();
        ctx.arc(centerX, centerY, 20, 0, 2 * Math.PI);
        ctx.fillStyle = '#fff';
        ctx.fill();
        ctx.lineWidth = 4;
        ctx.strokeStyle = '#1e3a8a';
        ctx.stroke();

        // Draw pointer (Top arrow)
        ctx.beginPath();
        ctx.moveTo(centerX, centerY - radius + 10);
        ctx.lineTo(centerX - 15, centerY - radius - 20);
        ctx.lineTo(centerX + 15, centerY - radius - 20);
        ctx.closePath();
        ctx.fillStyle = '#fbbf24'; // yellow-400
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#fff';
        ctx.stroke();
    };

    useEffect(() => {
        drawWheel();
    }, [names, currentRotation.current]); // Redraw when names change

    const animate = () => {
        if (!isSpinningRef.current) return;

        currentRotation.current += spinVelocity.current;

        // Friction
        spinVelocity.current *= 0.985;

        // Check if stopped
        if (spinVelocity.current < 0.002) {
            isSpinningRef.current = false;
            setIsSpinning(false);
            spinVelocity.current = 0;

            // Calculate winner
            // The pointer is at the top (-PI/2 relative to the standard right-facing 0 angle).
            // We need to account for rotation.

            if (namesList.length > 0) {
                const normalizedRotation = currentRotation.current % (2 * Math.PI);
                // Angle of the top pointer relative to the rotated wheel
                // Since we rotate the wheel clockwise by 'currentRotation', the top pointer (at -PI/2 in canvas space)
                // corresponds to an angle on the wheel of: -PI/2 - normalizedRotation

                let pointerAngle = (3 * Math.PI / 2) - normalizedRotation;

                // Normalize to 0 - 2PI
                pointerAngle = (pointerAngle % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI);

                const arcSize = (2 * Math.PI) / namesList.length;
                const winningIndex = Math.floor(pointerAngle / arcSize);

                setWinner(namesList[winningIndex]);
            }
        }

        drawWheel();

        if (isSpinningRef.current) {
            animationRef.current = requestAnimationFrame(animate);
        }
    };

    const spin = () => {
        if (isSpinning || namesList.length === 0) return;

        setWinner(null);
        setIsSpinning(true);
        isSpinningRef.current = true;

        // Random initial velocity (between 0.3 and 0.5)
        spinVelocity.current = 0.3 + Math.random() * 0.2;

        animate();
    };

    const removeWinner = () => {
        if (winner) {
            const newNamesList = namesList.filter(n => n !== winner);
            setNames(newNamesList.join('\n'));
            setWinner(null);
        }
    };

    return (
        <div className={`min-h-screen ${GRADIENTS.blueDark} text-white font-sans pt-8 pb-20 relative`}>
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
            </div>

            <div className="max-w-6xl mx-auto px-4 relative z-10">
                <div className="text-center mb-10">
                    <h1 className="text-4xl md:text-5xl font-black mb-4 uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-cyan-400"
                        style={{ fontFamily: '"Press Start 2P", monospace' }}>
                        WHEEL OF NAMES
                    </h1>
                    <p className="text-cyan-200 text-lg">Acak nama dengan mudah untuk giveaway atau undian.</p>
                </div>

                <div className="flex flex-col lg:flex-row gap-10 items-center justify-center">

                    {/* Wheel Section */}
                    <div className="flex flex-col items-center">
                        <div className="relative p-4 bg-blue-900/50 rounded-full border-4 border-blue-800 shadow-[0_0_30px_rgba(34,211,238,0.2)]">
                            <canvas
                                ref={canvasRef}
                                width="400"
                                height="400"
                                className="max-w-full h-auto rounded-full"
                            />
                        </div>

                        <button
                            onClick={spin}
                            disabled={isSpinning || namesList.length === 0}
                            className={`mt-8 px-12 py-4 rounded font-black text-2xl uppercase tracking-widest border-4 border-white transition-all
                        ${isSpinning || namesList.length === 0
                                    ? 'bg-gray-500 text-gray-300 cursor-not-allowed border-gray-400'
                                    : 'bg-yellow-400 text-blue-950 hover:bg-yellow-300 active:translate-y-2 shadow-[0_8px_0_#b45309] active:shadow-none cursor-pointer'
                                }`}
                        >
                            {isSpinning ? 'SPINNING...' : 'SPIN!'}
                        </button>
                    </div>

                    {/* Input Section */}
                    <div className="w-full lg:w-96 bg-blue-950/80 p-6 rounded-xl border-2 border-blue-800 backdrop-blur-sm shadow-xl flex flex-col h-[500px]">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-cyan-300 uppercase tracking-widest">Daftar Nama</h2>
                            <span className="bg-blue-800 text-white text-xs font-bold px-3 py-1 rounded-full border border-blue-600">
                                Total: {namesList.length}
                            </span>
                        </div>

                        <textarea
                            value={names}
                            onChange={(e) => setNames(e.target.value)}
                            disabled={isSpinning}
                            placeholder="Masukkan nama di sini, pisahkan dengan baris baru (enter)..."
                            className="flex-grow w-full bg-blue-900/50 text-white p-4 rounded border-2 border-blue-700 focus:border-cyan-400 focus:outline-none resize-none font-medium text-lg leading-relaxed shadow-inner"
                        />

                        <div className="mt-4 flex gap-2">
                            <button
                                onClick={() => setNames("Siswa 1\nSiswa 2\nSiswa 3")}
                                disabled={isSpinning}
                                className="flex-1 bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded border border-blue-600 transition-colors text-sm"
                            >
                                Contoh Data
                            </button>
                            <button
                                onClick={() => setNames("")}
                                disabled={isSpinning}
                                className="flex-1 bg-red-900/80 hover:bg-red-800 text-white font-bold py-2 px-4 rounded border border-red-700 transition-colors text-sm"
                            >
                                Hapus Semua
                            </button>
                        </div>
                    </div>
                </div>

                {/* Winner Modal */}
                {winner && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                        <div className="bg-gradient-to-b from-blue-900 to-blue-950 border-4 border-yellow-400 rounded-2xl p-8 max-w-md w-full text-center shadow-[0_0_50px_rgba(250,204,21,0.3)] animate-[scale_0.3s_ease-out]">
                            <h2 className="text-yellow-400 text-2xl font-black mb-2 uppercase tracking-widest" style={{ fontFamily: '"Press Start 2P", monospace' }}>
                                Pemenang!
                            </h2>
                            <div className="py-8">
                                <p className="text-5xl font-black text-white break-words drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)]">
                                    {winner}
                                </p>
                            </div>

                            <div className="flex flex-col gap-3 mt-6">
                                <button
                                    onClick={removeWinner}
                                    className="w-full bg-red-500 hover:bg-red-400 text-white font-bold py-3 px-4 rounded-lg uppercase tracking-wider border-b-4 border-red-700 active:border-b-0 active:translate-y-1 transition-all"
                                >
                                    Hapus Pemenang & Tutup
                                </button>
                                <button
                                    onClick={() => setWinner(null)}
                                    className="w-full bg-blue-700 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg uppercase tracking-wider border-b-4 border-blue-900 active:border-b-0 active:translate-y-1 transition-all"
                                >
                                    Tutup
                                </button>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default WheelOfNamesPage;
