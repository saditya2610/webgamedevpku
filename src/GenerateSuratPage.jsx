import React, { useState, useRef, useEffect } from 'react';
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
                className="w-full p-3 text-white focus:outline-none text-sm"
                style={{ minHeight }}
            />
        </div>
    );
};

const GenerateSuratPage = () => {
    const [formData, setFormData] = useState({
        nomor: '01/GDPKU/GSIS/V/2026',
        hal: 'Balasan Permohonan Narasumber dan Guru Tamu Implementasi',
        instansi: 'SMK Muhammadiyah 2 Pekanbaru',
        nomorInstansi: '347/III.4.AU/A/2026',
        tanggalInstansi: '12 Mei 2026',
        namaGdpku: 'Fadel Dzahabi',
        jabatanGdpku: 'Chairman Gamedev PKU',
        waktuKegiatan: 'Rabu–Kamis, 20–21 Mei 2026',
        jamKegiatan: '08.00 WIB s.d Selesai',
        tempatKegiatan: 'Workshop SMK Muhammadiyah 2 Pekanbaru',
        tempatTanggalDibuat: 'Pekanbaru, 13 Mei 2026',
        namaPenandatangan: 'Ar. Fadel Dzahabi, S.Ars.',
        jabatanPenandatangan: 'Chairman Gamedev PKU',
        paragrafPembuka: 'Menanggapi surat permohonan terkait kegiatan Narasumber dan Guru Tamu, maka dengan ini saya selaku perwakilan Gamedev PKU menyampaikan bahwa kami <b>menerima dan bersedia</b> untuk menghadiri serta mendampingi kegiatan workshop tersebut.',
        teksPengantarRincian: 'Adapun rincian detail waktu, tempat, dan pelaksanaan kegiatan yang telah kami konfirmasi adalah sebagai berikut:',
        paragrafPenutup1: 'Kami berharap materi yang disampaikan nantinya dapat memberikan wawasan baru, memotivasi para peserta, serta mempererat sinergi antara dunia pendidikan dengan industri game.',
        paragrafPenutup2: 'Demikian surat balasan ini kami sampaikan. Atas perhatiannya, kami ucapkan terima kasih.',
        materi: [
            { id: 1, target: 'Kelas PPLG', materi: 'Pengenalan Industri Game, Pengenalan Engine Game, Reverse Engineering Karya Narasumber, dan Pembuatan Variasi Game Sederhana.' },
            { id: 2, target: 'Kelas DKV', materi: 'Pengenalan Industri Game, Pengenalan Engine Game, Pengenalan Aset Game, dan Penerapan Aset Game.' }
        ],
        capImage: null
    });

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => setFormData({ ...formData, capImage: event.target.result });
            reader.readAsDataURL(file);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleMateriChange = (index, field, value) => {
        const newMateri = [...formData.materi];
        newMateri[index][field] = value;
        setFormData({ ...formData, materi: newMateri });
    };

    const addMateri = () => {
        setFormData({
            ...formData,
            materi: [...formData.materi, { id: Date.now(), target: '', materi: '' }]
        });
    };

    const removeMateri = (index) => {
        const newMateri = [...formData.materi];
        newMateri.splice(index, 1);
        setFormData({ ...formData, materi: newMateri });
    };

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
                        padding: 0 !important; /* Gunakan margin dari @page agar tidak terpotong */
                        margin: 0 !important; 
                        border: none !important; 
                        box-shadow: none !important; 
                        color: black !important; 
                        box-sizing: border-box !important;
                        overflow: visible !important;
                    }
                    .print-container * { color: black !important; }
                `}
            </style>
            
            {/* Form Section - Hidden on Print */}
            <div className="w-full lg:w-1/3 print:hidden bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 shadow-xl overflow-y-auto max-h-[80vh]">
                <h2 className="text-2xl font-bold text-black mb-6 border-b border-black/20 pb-2">Form Data Surat</h2>
                
                <div className="space-y-4 text-white">
                    <div>
                        <label className="block text-sm font-semibold mb-1 text-cyan-300">Nomor Surat Balasan</label>
                        <input type="text" name="nomor" value={formData.nomor} onChange={handleInputChange} className="w-full p-2 bg-black/50 border border-cyan-800 rounded text-white placeholder-gray-400 focus:border-cyan-400 focus:bg-black/70 focus:outline-none" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-1 text-cyan-300">Hal</label>
                        <input type="text" name="hal" value={formData.hal} onChange={handleInputChange} className="w-full p-2 bg-black/50 border border-cyan-800 rounded text-white placeholder-gray-400 focus:border-cyan-400 focus:bg-black/70 focus:outline-none" />
                    </div>
                    
                    <div className="pt-4 border-t border-white/20">
                        <label className="block text-sm font-semibold mb-1 text-yellow-300">Data Pemohon / Instansi</label>
                        <input type="text" name="instansi" value={formData.instansi} onChange={handleInputChange} placeholder="Nama Instansi" className="w-full p-2 mb-2 bg-black/50 border border-cyan-800 rounded text-white placeholder-gray-400 focus:border-cyan-400 focus:bg-black/70 focus:outline-none" />
                        <input type="text" name="nomorInstansi" value={formData.nomorInstansi} onChange={handleInputChange} placeholder="Nomor Surat Instansi" className="w-full p-2 mb-2 bg-black/50 border border-cyan-800 rounded text-white placeholder-gray-400 focus:border-cyan-400 focus:bg-black/70 focus:outline-none" />
                        <input type="text" name="tanggalInstansi" value={formData.tanggalInstansi} onChange={handleInputChange} placeholder="Tanggal Surat Instansi" className="w-full p-2 bg-black/50 border border-cyan-800 rounded text-white placeholder-gray-400 focus:border-cyan-400 focus:bg-black/70 focus:outline-none" />
                    </div>

                    <div className="pt-4 border-t border-white/20">
                        <label className="block text-sm font-semibold mb-1 text-yellow-300">Data Pihak Gamedev PKU</label>
                        <input type="text" name="namaGdpku" value={formData.namaGdpku} onChange={handleInputChange} placeholder="Nama Perwakilan" className="w-full p-2 mb-2 bg-black/50 border border-cyan-800 rounded text-white placeholder-gray-400 focus:border-cyan-400 focus:bg-black/70 focus:outline-none" />
                        <input type="text" name="jabatanGdpku" value={formData.jabatanGdpku} onChange={handleInputChange} placeholder="Jabatan" className="w-full p-2 bg-black/50 border border-cyan-800 rounded text-white placeholder-gray-400 focus:border-cyan-400 focus:bg-black/70 focus:outline-none" />
                    </div>

                    <div className="pt-4 border-t border-white/20">
                        <label className="block text-sm font-semibold mb-1 text-yellow-300">Detail Kegiatan</label>
                        <input type="text" name="waktuKegiatan" value={formData.waktuKegiatan} onChange={handleInputChange} placeholder="Hari / Tanggal" className="w-full p-2 mb-2 bg-black/50 border border-cyan-800 rounded text-white placeholder-gray-400 focus:border-cyan-400 focus:bg-black/70 focus:outline-none" />
                        <input type="text" name="jamKegiatan" value={formData.jamKegiatan} onChange={handleInputChange} placeholder="Waktu (Jam)" className="w-full p-2 mb-2 bg-black/50 border border-cyan-800 rounded text-white placeholder-gray-400 focus:border-cyan-400 focus:bg-black/70 focus:outline-none" />
                        <input type="text" name="tempatKegiatan" value={formData.tempatKegiatan} onChange={handleInputChange} placeholder="Tempat" className="w-full p-2 bg-black/50 border border-cyan-800 rounded text-white placeholder-gray-400 focus:border-cyan-400 focus:bg-black/70 focus:outline-none" />
                    </div>

                    <div className="pt-4 border-t border-white/20">
                        <label className="block text-sm font-semibold mb-1 text-yellow-300">Materi / Sasaran</label>
                        {formData.materi.map((item, index) => (
                            <div key={item.id} className="mb-4 bg-black/20 p-3 rounded border border-white/10">
                                <input type="text" value={item.target} onChange={(e) => handleMateriChange(index, 'target', e.target.value)} placeholder="Target (Materi Kelas X)" className="w-full p-2 mb-2 bg-black/50 border border-cyan-800 rounded text-white placeholder-gray-400 focus:border-cyan-400 focus:bg-black/70 focus:outline-none" />
                                <textarea value={item.materi} onChange={(e) => handleMateriChange(index, 'materi', e.target.value)} placeholder="Deskripsi Materi" className="w-full p-2 mb-2 bg-black/50 border border-cyan-800 rounded text-white placeholder-gray-400 focus:border-cyan-400 focus:bg-black/70 focus:outline-none text-sm h-20" />
                                <button type="button" onClick={() => removeMateri(index)} className="text-red-400 text-sm hover:text-red-300 transition-colors">Hapus Materi</button>
                            </div>
                        ))}
                        <button type="button" onClick={addMateri} className="w-full p-2 bg-cyan-900/50 hover:bg-cyan-800 text-cyan-200 border border-cyan-600 rounded transition-colors text-sm font-bold">
                            + Tambah Materi
                        </button>
                    </div>

                    <div className="pt-4 border-t border-white/20">
                        <label className="block text-sm font-semibold mb-2 text-yellow-300">Isi Surat (Pilih teks lalu klik tombol B/I/U di bawah)</label>
                        <RichTextEditor value={formData.paragrafPembuka} onChange={(val) => setFormData({...formData, paragrafPembuka: val})} placeholder="Paragraf Pembuka" minHeight="100px" />
                        <RichTextEditor value={formData.teksPengantarRincian} onChange={(val) => setFormData({...formData, teksPengantarRincian: val})} placeholder="Teks Pengantar Rincian" minHeight="60px" />
                        <RichTextEditor value={formData.paragrafPenutup1} onChange={(val) => setFormData({...formData, paragrafPenutup1: val})} placeholder="Paragraf Penutup 1" minHeight="80px" />
                        <RichTextEditor value={formData.paragrafPenutup2} onChange={(val) => setFormData({...formData, paragrafPenutup2: val})} placeholder="Paragraf Penutup 2" minHeight="60px" />
                    </div>

                    <div className="pt-4 border-t border-white/20">
                        <label className="block text-sm font-semibold mb-1 text-yellow-300">Penutup & Tanda Tangan</label>
                        <input type="text" name="tempatTanggalDibuat" value={formData.tempatTanggalDibuat} onChange={handleInputChange} placeholder="Tempat & Tanggal (Pekanbaru, ...)" className="w-full p-2 mb-2 bg-black/50 border border-cyan-800 rounded text-white placeholder-gray-400 focus:border-cyan-400 focus:bg-black/70 focus:outline-none" />
                        <input type="text" name="jabatanPenandatangan" value={formData.jabatanPenandatangan} onChange={handleInputChange} placeholder="Jabatan Penandatangan" className="w-full p-2 mb-2 bg-black/50 border border-cyan-800 rounded text-white placeholder-gray-400 focus:border-cyan-400 focus:bg-black/70 focus:outline-none" />
                        <input type="text" name="namaPenandatangan" value={formData.namaPenandatangan} onChange={handleInputChange} placeholder="Nama Lengkap Penandatangan" className="w-full p-2 mb-4 bg-black/50 border border-cyan-800 rounded text-white placeholder-gray-400 focus:border-cyan-400 focus:bg-black/70 focus:outline-none" />
                        
                        <label className="block text-sm font-semibold mb-1 text-cyan-300">Upload Cap / Tanda Tangan (Opsional)</label>
                        <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full p-2 bg-black/50 border border-cyan-800 rounded text-white placeholder-gray-400 focus:border-cyan-400 focus:bg-black/70 focus:outline-none text-sm" />
                    </div>

                </div>

                <button 
                    onClick={handlePrint}
                    className="mt-8 w-full bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-300 hover:to-yellow-500 text-black font-black py-4 px-6 rounded-lg uppercase tracking-widest border-2 border-yellow-200 shadow-[0_0_15px_rgba(250,204,21,0.5)] transition-all hover:scale-[1.02] active:scale-95"
                >
                    🖨️ CETAK SURAT
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
                        <p><strong>Nomor:</strong> {formData.nomor}</p>
                        <p><strong>Lampiran:</strong> -</p>
                        <p><strong>Hal:</strong> {formData.hal}</p>
                    </div>

                    {/* Tujuan */}
                    <div className="text-[12pt] leading-relaxed mb-4">
                        <p><strong>Yth.</strong></p>
                        <p><strong> {formData.instansi}</strong></p>
                        <p>di Pekanbaru</p>
                    </div>

                    {/* Isi Surat */}
                    <div className="text-[12pt] leading-relaxed text-justify mb-4">
                        <p className="mb-4" dangerouslySetInnerHTML={{ __html: formData.paragrafSalam }}></p>
                        
                        <p className="mb-4" dangerouslySetInnerHTML={{ __html: formData.paragrafPembuka }}></p>

                        <p className="mb-4" dangerouslySetInnerHTML={{ __html: formData.teksPengantarRincian }}></p>

                        <div className="pl-8 mb-4">
                            <table className="w-full">
                                <tbody>
                                    <tr>
                                        <td className="w-36 font-bold align-top py-1">Hari / Tanggal</td>
                                        <td className="w-4 align-top py-1">:</td>
                                        <td className="align-top py-1">{formData.waktuKegiatan}</td>
                                    </tr>
                                    <tr>
                                        <td className="font-bold align-top py-1">Waktu</td>
                                        <td className="align-top py-1">:</td>
                                        <td className="align-top py-1">{formData.jamKegiatan}</td>
                                    </tr>
                                    <tr>
                                        <td className="font-bold align-top py-1">Tempat</td>
                                        <td className="align-top py-1">:</td>
                                        <td className="align-top py-1">{formData.tempatKegiatan}</td>
                                    </tr>
                                    {formData.materi.map((item, index) => (
                                        <tr key={index}>
                                            <td className="font-bold align-top py-1">Materi {item.target}</td>
                                            <td className="align-top py-1">:</td>
                                            <td className="align-top py-1 text-justify">{item.materi}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <p className="mb-4" dangerouslySetInnerHTML={{ __html: formData.paragrafPenutup1 }}></p>
                        
                        <p className="mb-12" dangerouslySetInnerHTML={{ __html: formData.paragrafPenutup2 }}></p>
                    </div>

                    {/* Tanda Tangan */}
                    <div className="flex justify-end text-[12pt] leading-relaxed relative">
                        <div className="w-[300px] text-center relative z-10">
                            <p className="mb-2">{formData.tempatTanggalDibuat}</p>
                            <p className="mb-2">{formData.jabatanPenandatangan}</p>
                            
                            <div className="h-28 relative flex items-center justify-center my-2">
                                {formData.capImage && (
                                    <img 
                                        src={formData.capImage} 
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

                            <p className="font-bold underline">{formData.namaPenandatangan}</p>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    );
};

export default GenerateSuratPage;
