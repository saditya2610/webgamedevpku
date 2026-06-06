import React, { useState, useEffect, useRef } from 'react';
import logoGDP from '../assets/Logo GDP besar.png';

const RichTextEditor = ({ value, onChange, placeholder, minHeight = "80px" }) => {
    const editorRef = useRef(null);

    useEffect(() => {
        if (editorRef.current && value !== editorRef.current.innerHTML && document.activeElement !== editorRef.current) {
            editorRef.current.innerHTML = value;
        }
    }, [value]);

    const handleInput = () => {
        onChange(editorRef.current.innerHTML);
    };

    const format = (command) => {
        document.execCommand(command, false, null);
        editorRef.current.focus();
        handleInput();
    };

    return (
        <div className="w-full mb-4 bg-black/50 border border-cyan-800 rounded focus-within:border-cyan-400 focus-within:bg-black/70 flex flex-col overflow-hidden">
            <div className="flex items-center space-x-1 p-1.5 border-b border-cyan-800/50 bg-black/60">
                <button type="button" onClick={() => format('bold')} className="w-7 h-7 flex items-center justify-center bg-white/10 hover:bg-cyan-500 hover:text-black rounded text-white font-bold text-sm transition-colors" title="Tebal (Ctrl+B)">B</button>
                <button type="button" onClick={() => format('italic')} className="w-7 h-7 flex items-center justify-center bg-white/10 hover:bg-cyan-500 hover:text-black rounded text-white italic text-sm transition-colors" title="Miring (Ctrl+I)">I</button>
                <button type="button" onClick={() => format('underline')} className="w-7 h-7 flex items-center justify-center bg-white/10 hover:bg-cyan-500 hover:text-black rounded text-white underline text-sm transition-colors" title="Garis Bawah (Ctrl+U)">U</button>
                <div className="text-gray-400 text-xs ml-2 italic">{placeholder}</div>
            </div>
            <div 
                ref={editorRef}
                contentEditable
                onInput={handleInput}
                onBlur={handleInput}
                className="w-full p-3 text-black bg-white focus:outline-none text-sm"
                style={{ minHeight }}
            />
        </div>
    );
};

const ManajemenKeuanganPage = () => {
    const [transactions, setTransactions] = useState([]);
    
    // Surat Data
    const [suratData, setSuratData] = useState({
        nomor: '02/GDPKU/KEUANGAN/V/2026',
        hal: 'Laporan Keuangan Manajerial Komunitas',
        instansi: 'Ketua Umum Gamedev PKU',
        tempatInstansi: 'di Pekanbaru',
        paragrafPembuka: 'Bersama surat ini, kami melaporkan rekapitulasi data keuangan komunitas Gamedev PKU. Rincian pemasukan dan pengeluaran kas yang tercatat hingga tanggal laporan ini dibuat adalah sebagai berikut:',
        paragrafPenutup: 'Demikian laporan keuangan ini kami sampaikan untuk dapat diketahui dan dipergunakan sebagai bahan evaluasi serta dokumentasi kas komunitas.',
        tempatTanggalDibuat: 'Pekanbaru, 13 Mei 2026',
        jabatanPenandatangan: 'Bendahara Gamedev PKU',
        namaPenandatangan: 'Nama Bendahara',
        capImage: null
    });

    const [formData, setFormData] = useState({
        tanggal: new Date().toISOString().split('T')[0],
        keterangan: '',
        tipe: 'Pemasukan',
        nominal: ''
    });

    // Load from localStorage on mount
    useEffect(() => {
        const savedTx = localStorage.getItem('gamedevpku_keuangan');
        if (savedTx) {
            try {
                setTransactions(JSON.parse(savedTx));
            } catch (e) {
                console.error("Failed to parse financial data");
            }
        }
    }, []);

    // Save to localStorage whenever transactions change
    useEffect(() => {
        localStorage.setItem('gamedevpku_keuangan', JSON.stringify(transactions));
    }, [transactions]);

    const handleSuratChange = (e) => {
        const { name, value } = e.target;
        setSuratData({ ...suratData, [name]: value });
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => setSuratData({ ...suratData, capImage: event.target.result });
            reader.readAsDataURL(file);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const addTransaction = (e) => {
        e.preventDefault();
        if (!formData.keterangan || !formData.nominal) return;

        const newTx = {
            id: Date.now(),
            tanggal: formData.tanggal,
            keterangan: formData.keterangan,
            tipe: formData.tipe,
            nominal: parseInt(formData.nominal, 10)
        };

        setTransactions([...transactions, newTx]);
        setFormData({
            ...formData,
            keterangan: '',
            nominal: ''
        });
    };

    const removeTransaction = (id) => {
        setTransactions(transactions.filter(tx => tx.id !== id));
    };

    const formatRupiah = (angka) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka);
    };

    const totalPemasukan = transactions.filter(t => t.tipe === 'Pemasukan').reduce((acc, curr) => acc + curr.nominal, 0);
    const totalPengeluaran = transactions.filter(t => t.tipe === 'Pengeluaran').reduce((acc, curr) => acc + curr.nominal, 0);
    const saldo = totalPemasukan - totalPengeluaran;

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="flex flex-col lg:flex-row gap-8 font-sans">
            <style type="text/css" media="print">
                {`
                    @page { size: A4 portrait; margin: 2cm; }
                    body { background: white; -webkit-print-color-adjust: exact; print-color-adjust: exact; margin: 0; padding: 0; }
                    
                    /* Sembunyikan elemen bawaan sistem website */
                    header, footer, .hero-bg-overlay, .audio-player-container, .print\\:hidden { display: none !important; }
                    
                    /* Reset layout main container agar print A4 presisi */
                    main { padding: 0 !important; margin: 0 !important; max-width: none !important; }
                    
                    /* Pastikan font selalu hitam, lebar 100% dari kertas, tidak ada overflow hidden agar bisa banyak halaman */
                    .print-container { 
                        width: 100% !important; 
                        max-width: 100% !important;
                        height: auto !important;
                        min-height: auto !important; 
                        padding: 0 !important;
                        margin: 0 !important; 
                        border: none !important; 
                        box-shadow: none !important; 
                        color: black !important; 
                        box-sizing: border-box !important;
                        overflow: visible !important;
                    }
                    .print-container * { color: black !important; }
                    
                    table { page-break-inside: auto; }
                    tr { page-break-inside: avoid; page-break-after: auto; }
                    thead { display: table-header-group; }
                    tfoot { display: table-footer-group; }
                `}
            </style>
            
            {/* Form Section - Hidden on Print */}
            <div className="w-full lg:w-1/3 print:hidden bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 shadow-xl overflow-y-auto max-h-[80vh]">
                <h2 className="text-2xl font-bold text-white mb-6 border-b border-white/20 pb-2">Surat & Manajemen Keuangan</h2>
                
                {/* Summary Cards */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="bg-green-900/50 border border-green-500/50 p-3 rounded-lg text-center">
                        <p className="text-green-300 text-xs font-bold uppercase tracking-wider mb-1">Pemasukan</p>
                        <p className="text-white font-bold">{formatRupiah(totalPemasukan)}</p>
                    </div>
                    <div className="bg-red-900/50 border border-red-500/50 p-3 rounded-lg text-center">
                        <p className="text-red-300 text-xs font-bold uppercase tracking-wider mb-1">Pengeluaran</p>
                        <p className="text-white font-bold">{formatRupiah(totalPengeluaran)}</p>
                    </div>
                    <div className="col-span-2 bg-cyan-900/50 border border-cyan-500/50 p-4 rounded-lg text-center">
                        <p className="text-cyan-300 text-sm font-bold uppercase tracking-wider mb-1">Saldo Kas Saat Ini</p>
                        <p className={`text-2xl font-bold ${saldo >= 0 ? 'text-green-400' : 'text-red-400'}`}>{formatRupiah(saldo)}</p>
                    </div>
                </div>

                <div className="space-y-4 text-white">
                    {/* Data Surat Keuangan */}
                    <div className="pt-2">
                        <label className="block text-sm font-semibold mb-1 text-cyan-300">Nomor Surat Keuangan</label>
                        <input type="text" name="nomor" value={suratData.nomor} onChange={handleSuratChange} className="w-full p-2 bg-white border border-gray-300 rounded text-black placeholder-gray-500 focus:border-cyan-500 focus:bg-white focus:outline-none" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-1 text-cyan-300">Hal</label>
                        <input type="text" name="hal" value={suratData.hal} onChange={handleSuratChange} className="w-full p-2 bg-white border border-gray-300 rounded text-black placeholder-gray-500 focus:border-cyan-500 focus:bg-white focus:outline-none" />
                    </div>
                    
                    <div className="pt-4 border-t border-white/20">
                        <label className="block text-sm font-semibold mb-1 text-yellow-300">Tujuan Surat</label>
                        <input type="text" name="instansi" value={suratData.instansi} onChange={handleSuratChange} placeholder="Yth. (Nama/Jabatan)" className="w-full p-2 mb-2 bg-white border border-gray-300 rounded text-black placeholder-gray-500 focus:border-cyan-500 focus:bg-white focus:outline-none" />
                        <input type="text" name="tempatInstansi" value={suratData.tempatInstansi} onChange={handleSuratChange} placeholder="Tempat (di Pekanbaru)" className="w-full p-2 bg-white border border-gray-300 rounded text-black placeholder-gray-500 focus:border-cyan-500 focus:bg-white focus:outline-none" />
                    </div>

                    <div className="pt-4 border-t border-white/20">
                        <label className="block text-sm font-semibold mb-2 text-yellow-300">Isi Surat Pengantar Keuangan</label>
                        <RichTextEditor value={suratData.paragrafPembuka} onChange={(val) => setSuratData({...suratData, paragrafPembuka: val})} placeholder="Paragraf Pembuka" minHeight="100px" />
                        <RichTextEditor value={suratData.paragrafPenutup} onChange={(val) => setSuratData({...suratData, paragrafPenutup: val})} placeholder="Paragraf Penutup" minHeight="80px" />
                    </div>

                    {/* Transaksi Input */}
                    <div className="pt-4 border-t border-white/20">
                        <label className="block text-sm font-semibold mb-2 text-green-300">Kelola Data Transaksi</label>
                        <form onSubmit={addTransaction}>
                            <input type="date" name="tanggal" value={formData.tanggal} onChange={handleInputChange} required className="w-full p-2 mb-2 bg-white border border-gray-300 rounded text-black focus:border-cyan-500 focus:bg-white focus:outline-none" />
                            <input type="text" name="keterangan" value={formData.keterangan} onChange={handleInputChange} placeholder="Keterangan (Donasi, dll)" required className="w-full p-2 mb-2 bg-white border border-gray-300 rounded text-black placeholder-gray-500 focus:border-cyan-500 focus:bg-white focus:outline-none" />
                            <select name="tipe" value={formData.tipe} onChange={handleInputChange} className="w-full p-2 mb-2 bg-white border border-gray-300 rounded text-black focus:border-cyan-500 focus:bg-white focus:outline-none">
                                <option value="Pemasukan">Pemasukan (Uang Masuk)</option>
                                <option value="Pengeluaran">Pengeluaran (Uang Keluar)</option>
                            </select>
                            <input type="number" name="nominal" value={formData.nominal} onChange={handleInputChange} placeholder="Nominal (Tanpa Titik)" required min="0" className="w-full p-2 mb-4 bg-white border border-gray-300 rounded text-black placeholder-gray-500 focus:border-cyan-500 focus:bg-white focus:outline-none" />
                            <button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 px-4 rounded transition-colors mb-4">+ Tambah Transaksi</button>
                        </form>

                        <div className="space-y-2 max-h-[250px] overflow-y-auto pr-2 custom-scrollbar">
                            {transactions.length === 0 && <p className="text-gray-400 text-sm italic text-center py-4">Belum ada transaksi</p>}
                            {transactions.slice().reverse().map((tx) => (
                                <div key={tx.id} className="flex justify-between items-center bg-black/30 p-2 rounded border border-white/10 hover:bg-black/50 transition-colors">
                                    <div className="flex-1">
                                        <p className="text-xs text-gray-400">{tx.tanggal}</p>
                                        <p className="text-sm font-semibold text-white">{tx.keterangan}</p>
                                        <p className={`text-sm font-bold ${tx.tipe === 'Pemasukan' ? 'text-green-400' : 'text-red-400'}`}>
                                            {tx.tipe === 'Pemasukan' ? '+' : '-'}{formatRupiah(tx.nominal)}
                                        </p>
                                    </div>
                                    <button onClick={() => removeTransaction(tx.id)} className="ml-3 text-red-400 hover:text-red-300 bg-red-900/30 hover:bg-red-900/50 p-2 rounded transition-colors text-xs" title="Hapus">✕</button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="pt-4 border-t border-white/20">
                        <label className="block text-sm font-semibold mb-1 text-yellow-300">Penutup & Tanda Tangan</label>
                        <input type="text" name="tempatTanggalDibuat" value={suratData.tempatTanggalDibuat} onChange={handleSuratChange} placeholder="Tempat & Tanggal (Pekanbaru, ...)" className="w-full p-2 mb-2 bg-white border border-gray-300 rounded text-black placeholder-gray-500 focus:border-cyan-500 focus:bg-white focus:outline-none" />
                        <input type="text" name="jabatanPenandatangan" value={suratData.jabatanPenandatangan} onChange={handleSuratChange} placeholder="Jabatan Penandatangan" className="w-full p-2 mb-2 bg-white border border-gray-300 rounded text-black placeholder-gray-500 focus:border-cyan-500 focus:bg-white focus:outline-none" />
                        <input type="text" name="namaPenandatangan" value={suratData.namaPenandatangan} onChange={handleSuratChange} placeholder="Nama Lengkap Penandatangan" className="w-full p-2 mb-4 bg-white border border-gray-300 rounded text-black placeholder-gray-500 focus:border-cyan-500 focus:bg-white focus:outline-none" />
                        
                        <label className="block text-sm font-semibold mb-1 text-cyan-300">Upload Cap / Tanda Tangan (Opsional)</label>
                        <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full p-2 bg-white border border-gray-300 rounded text-black placeholder-gray-500 focus:border-cyan-500 focus:bg-white focus:outline-none text-sm" />
                    </div>

                </div>

                <button 
                    onClick={handlePrint}
                    className="mt-8 w-full bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-300 hover:to-yellow-500 text-black font-black py-4 px-6 rounded-lg uppercase tracking-widest border-2 border-yellow-200 shadow-[0_0_15px_rgba(250,204,21,0.5)] transition-all hover:scale-[1.02] active:scale-95"
                >
                    🖨️ CETAK SURAT LAPORAN
                </button>
            </div>

            {/* Preview & Print Section */}
            <div className="w-full lg:w-2/3 bg-gray-200 p-4 lg:p-8 rounded-xl overflow-x-auto flex justify-center print:p-0 print:bg-white print:w-full print:block print:overflow-visible">
                {/* A4 Paper Container */}
                <div 
                    className="bg-white shadow-2xl print-container mx-auto relative text-black"
                    style={{ 
                        width: '210mm', 
                        minHeight: '297mm', 
                        padding: '2.54cm',
                        fontFamily: '"Times New Roman", Times, serif'
                    }}
                >
                    {/* Header Kop Surat */}
                    <div className="flex items-center mb-2">
                        <img src={logoGDP} alt="Logo" className="h-[80px] w-auto object-contain flex-shrink-0 mr-4" />
                        <div className="flex-1 text-center">
                            <h1 className="font-bold text-[18px] sm:text-[20px] leading-snug uppercase tracking-wide" style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}>
                                JAJARAN PIMPINAN DAN MANAJERIAL<br />
                                KOMUNITAS GAMEDEV PKU (PEKANBARU)
                            </h1>
                        </div>
                    </div>
                    
                    {/* Double underline correctly styled */}
                    <div className="w-full border-b-[3px] border-black mb-[2px]"></div>
                    <div className="w-full border-b border-black mb-6"></div>

                    {/* Meta Surat */}
                    <div className="text-[12pt] leading-relaxed mb-4 space-y-1">
                        <p><strong>Nomor:</strong> {suratData.nomor}</p>
                        <p><strong>Lampiran:</strong> -</p>
                        <p><strong>Hal:</strong> {suratData.hal}</p>
                    </div>

                    {/* Tujuan */}
                    <div className="text-[12pt] leading-relaxed mb-6">
                        <p><strong>Yth.</strong></p>
                        <p><strong> {suratData.instansi}</strong></p>
                        <p>{suratData.tempatInstansi}</p>
                    </div>

                    {/* Isi Surat */}
                    <div className="text-[12pt] leading-relaxed text-justify mb-4">
                        <p className="mb-4" dangerouslySetInnerHTML={{ __html: suratData.paragrafPembuka }}></p>
                        
                        {/* Ringkasan */}
                        <div className="mb-6 bg-gray-100 p-4 border border-black rounded">
                            <h2 className="text-[14pt] font-bold mb-3 text-center uppercase border-b border-black pb-2">Ringkasan Kas</h2>
                            <div className="flex justify-between px-8 text-[12pt]">
                                <div>
                                    <p className="mb-1"><strong>Total Pemasukan:</strong></p>
                                    <p className="mb-1"><strong>Total Pengeluaran:</strong></p>
                                    <p className="mt-2 text-[14pt]"><strong>Saldo Akhir:</strong></p>
                                </div>
                                <div className="text-right">
                                    <p className="mb-1">{formatRupiah(totalPemasukan)}</p>
                                    <p className="mb-1">{formatRupiah(totalPengeluaran)}</p>
                                    <p className="mt-2 text-[14pt] font-bold">{formatRupiah(saldo)}</p>
                                </div>
                            </div>
                        </div>

                        <h3 className="text-[12pt] font-bold mb-3">Rincian Transaksi:</h3>

                        {/* Tabel Transaksi */}
                        <table className="w-full border-collapse border border-black text-[11pt] mb-6">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="border border-black p-2 text-center w-12">No</th>
                                    <th className="border border-black p-2 text-left w-24">Tanggal</th>
                                    <th className="border border-black p-2 text-left">Keterangan</th>
                                    <th className="border border-black p-2 text-right w-32">Masuk (Rp)</th>
                                    <th className="border border-black p-2 text-right w-32">Keluar (Rp)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactions.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="border border-black p-4 text-center italic">Tidak ada data transaksi.</td>
                                    </tr>
                                ) : (
                                    transactions.map((tx, idx) => (
                                        <tr key={tx.id}>
                                            <td className="border border-black p-2 text-center">{idx + 1}</td>
                                            <td className="border border-black p-2">{tx.tanggal}</td>
                                            <td className="border border-black p-2">{tx.keterangan}</td>
                                            <td className="border border-black p-2 text-right">
                                                {tx.tipe === 'Pemasukan' ? formatRupiah(tx.nominal).replace('Rp', '').trim() : '-'}
                                            </td>
                                            <td className="border border-black p-2 text-right">
                                                {tx.tipe === 'Pengeluaran' ? formatRupiah(tx.nominal).replace('Rp', '').trim() : '-'}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                            {transactions.length > 0 && (
                                <tfoot>
                                    <tr className="bg-gray-100 font-bold">
                                        <td colSpan="3" className="border border-black p-2 text-right">TOTAL</td>
                                        <td className="border border-black p-2 text-right">{formatRupiah(totalPemasukan).replace('Rp', '').trim()}</td>
                                        <td className="border border-black p-2 text-right">{formatRupiah(totalPengeluaran).replace('Rp', '').trim()}</td>
                                    </tr>
                                </tfoot>
                            )}
                        </table>

                        <p className="mb-4" dangerouslySetInnerHTML={{ __html: suratData.paragrafPenutup }}></p>
                    </div>

                    {/* Tanda Tangan */}
                    <div className="flex justify-end text-[12pt] leading-relaxed relative">
                        <div className="w-[300px] text-center relative z-10">
                            <p className="mb-2">{suratData.tempatTanggalDibuat}</p>
                            <p className="mb-2">{suratData.jabatanPenandatangan}</p>
                            
                            <div className="h-28 relative flex items-center justify-center my-2">
                                {suratData.capImage && (
                                    <img 
                                        src={suratData.capImage} 
                                        alt="Cap/TTD" 
                                        className="absolute max-h-32 max-w-[250px] object-contain" 
                                        style={{ 
                                            mixBlendMode: 'multiply', 
                                            transform: 'translate(-10%, -5%)',
                                            zIndex: -1
                                        }} 
                                    />
                                )}
                            </div>

                            <p className="font-bold underline">{suratData.namaPenandatangan}</p>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    );
};

export default ManajemenKeuanganPage;
