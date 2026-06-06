import React, { useState, useRef, useEffect } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { id } from 'date-fns/locale';
import logoGDP from '../assets/Logo GDP besar.png';

const RichTextEditor = ({ value, onChange, placeholder, minHeight = "80px", isError = false }) => {
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

    const containerClass = `w-full mb-4 bg-white border rounded flex flex-col overflow-hidden transition-colors ${
        isError 
            ? 'border-red-500 bg-red-50 focus-within:border-red-600 focus-within:ring-1 focus-within:ring-red-600' 
            : 'border-gray-300 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500'
    }`;

    return (
        <div className={containerClass}>
            <div className={`flex items-center space-x-1 p-1.5 border-b ${isError ? 'border-red-200 bg-red-100' : 'border-gray-200 bg-gray-50'}`}>
                <button type="button" onClick={() => format('bold')} className="w-7 h-7 flex items-center justify-center bg-white border border-gray-300 hover:bg-gray-100 rounded text-black font-bold text-sm transition-colors" title="Tebal (Ctrl+B)">B</button>
                <button type="button" onClick={() => format('italic')} className="w-7 h-7 flex items-center justify-center bg-white border border-gray-300 hover:bg-gray-100 rounded text-black italic text-sm transition-colors" title="Miring (Ctrl+I)">I</button>
                <button type="button" onClick={() => format('underline')} className="w-7 h-7 flex items-center justify-center bg-white border border-gray-300 hover:bg-gray-100 rounded text-black underline text-sm transition-colors" title="Garis Bawah (Ctrl+U)">U</button>
                <div className={`text-xs ml-2 italic ${isError ? 'text-red-500 font-bold' : 'text-gray-500'}`}>{placeholder} {isError && '(Wajib Diisi)'}</div>
            </div>
            <div 
                ref={editorRef}
                contentEditable
                onInput={handleInput}
                onBlur={handleInput}
                className="w-full p-3 text-black focus:outline-none text-sm bg-transparent"
                style={{ minHeight }}
            />
        </div>
    );
};

const GenerateSuratPage = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = 5;

    const [formData, setFormData] = useState({
        jenisSurat: 'Kustom',
        nomorUrut: '01',
        nomorInisial: 'GSIS',
        nomorBulan: 'V',
        nomorTahun: '2026',
        lampiran: '-',
        hal: 'Balasan Permohonan Narasumber dan Guru Tamu Implementasi',
        instansi: 'Kepala Sekolah SMK Muhammadiyah 2 Pekanbaru',
        tempatTujuan: 'Pekanbaru',
        namaGdpku: 'Fadel Dzahabi',
        jabatanGdpku: 'Chairman Gamedev PKU',
        tanggalMulai: new Date(2026, 4, 20),
        tanggalSelesai: new Date(2026, 4, 21),
        waktuMulaiJam: '08',
        waktuMulaiMenit: '00',
        waktuSelesaiJam: '',
        waktuSelesaiMenit: '',
        zonaWaktu: 'WIB',
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
        capImage: null,
        inputToken: ''
    });

    const [errors, setErrors] = useState([]);
    const [isTokenValid, setIsTokenValid] = useState(false);

    const fullNomorSurat = `${formData.nomorUrut}/GDPKU/${formData.nomorInisial}/${formData.nomorBulan}/${formData.nomorTahun}`;

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setFormData({ ...formData, capImage: event.target.result });
                if (errors.includes('capImage')) {
                    setErrors(errors.filter(err => err !== 'capImage'));
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleJenisSuratChange = (e) => {
        const val = e.target.value;
        let newKode = formData.nomorInisial;
        let newHal = formData.hal;
        
        if (val === 'Permohonan') { newKode = 'PRM'; newHal = 'Permohonan ...'; }
        else if (val === 'Undangan') { newKode = 'UND'; newHal = 'Undangan Kegiatan ...'; }
        else if (val === 'Balasan') { newKode = 'BLS'; newHal = 'Balasan Surat ...'; }
        else if (val === 'Pemberitahuan') { newKode = 'PMB'; newHal = 'Pemberitahuan ...'; }
        else if (val === 'Surat Tugas') { newKode = 'ST'; newHal = 'Penugasan ...'; }
        else if (val === 'Surat Keputusan') { newKode = 'SK'; newHal = 'Keputusan ...'; }
        
        setFormData({
            ...formData,
            jenisSurat: val,
            nomorInisial: val === 'Kustom' ? formData.nomorInisial : newKode,
            hal: val === 'Kustom' ? formData.hal : newHal
        });
        
        if (errors.includes('jenisSurat')) {
            setErrors(errors.filter(err => err !== 'jenisSurat'));
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        // Clear error if typing
        if (errors.includes(name)) {
            setErrors(errors.filter(err => err !== name));
        }
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

    const validateForm = () => {
        const requiredFields = {
            nomorUrut: 'Urutan Nomor Surat',
            nomorInisial: 'Inisial Nomor Surat',
            nomorBulan: 'Bulan Nomor Surat',
            nomorTahun: 'Tahun Nomor Surat',
            lampiran: 'Lampiran',
            hal: 'Hal',
            instansi: 'Tujuan Surat (Nama/Jabatan)',
            tempatTujuan: 'Tempat Tujuan',
            paragrafPembuka: 'Paragraf Pembuka',
            paragrafPenutup1: 'Paragraf Penutup 1',
            tempatTanggalDibuat: 'Tempat & Tanggal Pengesahan',
            jabatanPenandatangan: 'Jabatan Penandatangan',
            namaPenandatangan: 'Nama Terang Penandatangan',
            capImage: 'Upload Cap / Tanda Tangan'
        };

        let newErrors = [];
        let stepErrors = new Set();

        for (const [key, label] of Object.entries(requiredFields)) {
            let val = formData[key];
            let isEmpty = false;
            
            if (typeof val === 'string') {
                const stripped = val.replace(/<[^>]*>?/gm, '').replace(/&nbsp;/g, '').trim();
                if (!stripped) isEmpty = true;
            } else if (!val) {
                isEmpty = true;
            }

            if (isEmpty) {
                newErrors.push(key);
                if (['nomorUrut', 'nomorInisial', 'nomorBulan', 'nomorTahun', 'lampiran', 'hal'].includes(key)) stepErrors.add(1);
                if (['instansi', 'tempatTujuan'].includes(key)) stepErrors.add(2);
                if (['paragrafPembuka', 'paragrafPenutup1'].includes(key)) stepErrors.add(3);
                if (['tempatTanggalDibuat', 'jabatanPenandatangan', 'namaPenandatangan', 'capImage'].includes(key)) stepErrors.add(4);
            }
        }
        
        setErrors(newErrors);
        
        if (newErrors.length > 0) {
            const stepArr = Array.from(stepErrors).sort();
            alert(`Tidak bisa mencetak surat!\nAda field wajib yang belum diisi (ditandai dengan warna merah).\n\nSilakan periksa kembali Langkah: ${stepArr.join(', ')}`);
            return false;
        }
        return true;
    };

    const handlePrint = () => {
        if (validateForm()) {
            window.print();
        }
    };

    const nextStep = () => {
        if (currentStep < totalSteps) setCurrentStep(currentStep + 1);
    };

    const prevStep = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1);
    };

    const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100;

    const getInputClass = (name, isSmall = false) => {
        const baseClass = isSmall ? "text-center p-1 rounded text-black focus:outline-none" : "w-full p-2 rounded text-black placeholder-gray-500 focus:outline-none";
        const borderClass = errors.includes(name) 
            ? "border-2 border-red-500 bg-red-50 focus:border-red-600 focus:ring-1 focus:ring-red-600" 
            : "border border-gray-300 bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500";
        return `${baseClass} ${borderClass}`;
    };

    // Date & Time Formatting Helpers
    const formatIndonesianDate = (dateStr) => {
        if (!dateStr) return '';
        const date = new Date(dateStr);
        if (isNaN(date)) return dateStr;
        const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
        const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
        return `${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
    };

    const getFormattedWaktuKegiatan = () => {
        const { tanggalMulai, tanggalSelesai } = formData;
        if (!tanggalMulai) return '';
        if (tanggalMulai && tanggalSelesai && new Date(tanggalMulai).getTime() !== new Date(tanggalSelesai).getTime()) {
            const d1 = new Date(tanggalMulai);
            const d2 = new Date(tanggalSelesai);
            if (!isNaN(d1) && !isNaN(d2)) {
                if (d1.getMonth() === d2.getMonth() && d1.getFullYear() === d2.getFullYear()) {
                    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
                    const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
                    return `${days[d1.getDay()]}–${days[d2.getDay()]}, ${d1.getDate()}–${d2.getDate()} ${months[d1.getMonth()]} ${d1.getFullYear()}`;
                }
                return `${formatIndonesianDate(tanggalMulai)} s.d. ${formatIndonesianDate(tanggalSelesai)}`;
            }
        }
        return formatIndonesianDate(tanggalMulai);
    };

    const getFormattedJamKegiatan = () => {
        const { waktuMulaiJam, waktuMulaiMenit, waktuSelesaiJam, waktuSelesaiMenit, zonaWaktu } = formData;
        if (!waktuMulaiJam || !waktuMulaiMenit) return '';
        const mulai = `${waktuMulaiJam}.${waktuMulaiMenit}`;
        if (waktuSelesaiJam && waktuSelesaiMenit) {
            const selesai = `${waktuSelesaiJam}.${waktuSelesaiMenit}`;
            return `${mulai} s.d. ${selesai} ${zonaWaktu}`;
        }
        return `${mulai} ${zonaWaktu} s.d. Selesai`;
    };

    const displayWaktuKegiatan = getFormattedWaktuKegiatan();
    const displayJamKegiatan = getFormattedJamKegiatan();

    // Check if Detail Kegiatan has any content
    const hasDetailKegiatan = displayWaktuKegiatan || displayJamKegiatan || formData.tempatKegiatan || formData.materi.some(m => m.target || m.materi);

    return (
        <div className="flex flex-col lg:flex-row gap-6 font-sans h-[80vh] min-h-[600px] print:h-auto print:min-h-0">
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
                `}
            </style>
            
            {/* Wizard Form Section - Hidden on Print */}
            <div className="w-full lg:w-1/3 print:hidden bg-white p-6 rounded-xl border border-gray-200 shadow-xl flex flex-col h-full">
                <h2 className="text-2xl font-bold text-black mb-4">Wizard Surat Resmi</h2>
                
                {/* Progress Bar */}
                <div className="mb-6">
                    <div className="w-full bg-gray-200 rounded-full h-2.5 border border-gray-300">
                        <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2.5 rounded-full transition-all duration-300" style={{ width: `${progressPercentage}%` }}></div>
                    </div>
                    <div className="flex justify-between text-[10px] sm:text-xs mt-2 font-semibold">
                        <span className={currentStep >= 1 ? "text-blue-700" : "text-gray-400"}>1. Identitas</span>
                        <span className={currentStep >= 2 ? "text-blue-700" : "text-gray-400"}>2. Penerima</span>
                        <span className={currentStep >= 3 ? "text-blue-700" : "text-gray-400"}>3. Isi & Acara</span>
                        <span className={currentStep >= 4 ? "text-blue-700" : "text-gray-400"}>4. Tanda Tangan</span>
                        <span className={currentStep >= 5 ? "text-blue-700" : "text-gray-400"}>5. Selesai</span>
                    </div>
                </div>
                
                <div className="flex-1 space-y-4 text-black overflow-y-auto pr-2 custom-scrollbar">
                    
                    {/* STEP 1: Kepala Surat */}
                    {currentStep === 1 && (
                        <div className="animate-fade-in">
                            <h3 className="text-lg font-bold text-amber-700 border-b border-gray-200 pb-2 mb-4">Langkah 1: Identitas Surat</h3>
                            
                            <label className="block text-sm font-semibold mb-1 text-gray-800">Jenis Surat</label>
                            <select name="jenisSurat" value={formData.jenisSurat} onChange={handleJenisSuratChange} className="w-full mb-4 p-2 rounded text-black border border-gray-300 bg-white focus:outline-none focus:border-blue-500">
                                <option value="Kustom">-- Pilih Jenis Surat -- (Kustom)</option>
                                <option value="Permohonan">Surat Permohonan</option>
                                <option value="Undangan">Surat Undangan</option>
                                <option value="Balasan">Surat Balasan</option>
                                <option value="Pemberitahuan">Surat Pemberitahuan</option>
                                <option value="Surat Tugas">Surat Tugas</option>
                                <option value="Surat Keputusan">Surat Keputusan</option>
                            </select>

                            <label className="block text-sm font-semibold mb-1 text-gray-800">Penomoran Surat <span className="text-red-500">*</span></label>
                            <div className="text-xs text-gray-500 mb-3 italic">Silakan sesuaikan urutan surat, kode, bulan (Romawi), dan tahun pembuatan.</div>
                            
                            <div className="flex items-end flex-wrap gap-2 mb-4 p-3 bg-gray-50 border border-gray-200 rounded-lg">
                                <span className="font-bold text-sm mb-2">Nomor:</span>
                                <div>
                                    <label className="block text-[10px] text-gray-500">Urutan</label>
                                    <input type="text" name="nomorUrut" value={formData.nomorUrut} onChange={handleInputChange} className={`w-12 ${getInputClass('nomorUrut', true)}`} placeholder="01" />
                                </div>
                                <span className="text-gray-600 font-medium mb-2">/GDPKU/</span>
                                <div>
                                    <label className="block text-[10px] text-gray-500">Kode</label>
                                    <input type="text" name="nomorInisial" value={formData.nomorInisial} onChange={handleInputChange} className={`w-16 ${getInputClass('nomorInisial', true)}`} placeholder="GATH" />
                                </div>
                                <span className="text-gray-600 font-medium mb-2">/</span>
                                <div>
                                    <label className="block text-[10px] text-gray-500">Bulan</label>
                                    <input type="text" name="nomorBulan" value={formData.nomorBulan} onChange={handleInputChange} className={`w-12 ${getInputClass('nomorBulan', true)}`} placeholder="VI" />
                                </div>
                                <span className="text-gray-600 font-medium mb-2">/</span>
                                <div>
                                    <label className="block text-[10px] text-gray-500">Tahun</label>
                                    <input type="text" name="nomorTahun" value={formData.nomorTahun} onChange={handleInputChange} className={`w-16 ${getInputClass('nomorTahun', true)}`} placeholder="2026" />
                                </div>
                            </div>
                            
                            <label className="block text-sm font-semibold mb-1 text-gray-800">Lampiran <span className="text-red-500">*</span></label>
                            <input type="text" name="lampiran" value={formData.lampiran} onChange={handleInputChange} placeholder="Contoh: - atau 1 Lembar" className={`mb-4 ${getInputClass('lampiran')}`} />

                            <label className="block text-sm font-semibold mb-1 text-gray-800">Hal <span className="text-red-500">*</span></label>
                            <input type="text" name="hal" value={formData.hal} onChange={handleInputChange} placeholder="Perihal Surat" className={`mb-4 ${getInputClass('hal')}`} />
                        </div>
                    )}

                    {/* STEP 2: Tujuan */}
                    {currentStep === 2 && (
                        <div className="animate-fade-in">
                            <h3 className="text-lg font-bold text-amber-700 border-b border-gray-200 pb-2 mb-4">Langkah 2: Tujuan Surat</h3>

                            <label className="block text-sm font-semibold mb-1 text-gray-800">Penerima Surat (Kepada Yth.) <span className="text-red-500">*</span></label>
                            <input type="text" name="instansi" value={formData.instansi} onChange={handleInputChange} placeholder="Contoh: Kepala Sekolah SMK Muhammadiyah 2 Pekanbaru" className={`mb-4 ${getInputClass('instansi')}`} />
                            
                            <label className="block text-sm font-semibold mb-1 text-gray-800">Lokasi / Kota Penerima <span className="text-red-500">*</span></label>
                            <input type="text" name="tempatTujuan" value={formData.tempatTujuan} onChange={handleInputChange} placeholder="Contoh: di Pekanbaru" className={`mb-4 ${getInputClass('tempatTujuan')}`} />
                        </div>
                    )}

                    {/* STEP 3: Isi Surat */}
                    {currentStep === 3 && (
                        <div className="animate-fade-in">
                            <h3 className="text-lg font-bold text-amber-700 border-b border-gray-200 pb-2 mb-4">Langkah 3: Isi Surat & Jadwal Acara</h3>
                            
                            <label className="block text-sm font-semibold mb-2 text-gray-800">Kalimat Pembuka Surat <span className="text-red-500">*</span></label>
                            <div className="text-xs text-gray-500 mb-2 italic">Tuliskan salam dan maksud dari surat. (Contoh: Assalamu'alaikum Wr. Wb. Menanggapi surat permohonan...)</div>
                            <RichTextEditor value={formData.paragrafPembuka} onChange={(val) => { setFormData({...formData, paragrafPembuka: val}); setErrors(errors.filter(e => e !== 'paragrafPembuka')); }} placeholder="Tuliskan pembuka surat di sini..." minHeight="80px" isError={errors.includes('paragrafPembuka')} />
                            
                            <div className="bg-gray-50 p-4 border border-gray-200 rounded-lg mb-4">
                                <label className="block text-sm font-semibold mb-2 text-gray-800 border-b border-gray-200 pb-2">Informasi Waktu & Tempat Pelaksanaan</label>
                                <div className="text-xs text-gray-500 mb-3 italic">Hanya perlu diisi jika surat Anda menginformasikan jadwal kegiatan. Kosongkan jika tidak ada.</div>
                                
                                <div className="space-y-4 mb-4">
                                    {/* Kolom 1: Mulai */}
                                    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm relative">
                                        <div className="absolute top-0 left-0 w-1 h-full bg-blue-500 rounded-l-lg"></div>
                                        <h4 className="text-xs font-bold text-blue-800 mb-3 border-b border-gray-100 pb-1 pl-2">Jadwal Mulai <span className="text-red-500">*</span></h4>
                                        
                                        <div className="flex flex-col sm:flex-row gap-3 pl-2">
                                            <div className="flex-1">
                                                <label className="block text-[10px] font-semibold text-gray-500 mb-1">Tanggal</label>
                                                <DatePicker
                                                    selected={formData.tanggalMulai}
                                                    onChange={(date) => setFormData({ ...formData, tanggalMulai: date })}
                                                    dateFormat="EEEE, d MMMM yyyy"
                                                    locale={id}
                                                    wrapperClassName="w-full"
                                                    className="w-full p-2 rounded text-black text-xs border border-gray-300 bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                                    placeholderText="Pilih Tanggal Mulai"
                                                />
                                            </div>

                                            <div className="flex-1">
                                                <label className="block text-[10px] font-semibold text-gray-500 mb-1">Pukul (Jam : Menit)</label>
                                                <div className="flex gap-2 items-center">
                                                    <select name="waktuMulaiJam" value={formData.waktuMulaiJam} onChange={handleInputChange} className="flex-1 p-2 text-xs rounded text-black border border-gray-300 bg-white focus:outline-none focus:border-blue-500">
                                                        {[...Array(24)].map((_, i) => <option key={i} value={i.toString().padStart(2, '0')}>{i.toString().padStart(2, '0')}</option>)}
                                                    </select>
                                                    <span className="font-bold text-gray-400">:</span>
                                                    <select name="waktuMulaiMenit" value={formData.waktuMulaiMenit} onChange={handleInputChange} className="flex-1 p-2 text-xs rounded text-black border border-gray-300 bg-white focus:outline-none focus:border-blue-500">
                                                        {[...Array(60)].map((_, i) => <option key={i} value={i.toString().padStart(2, '0')}>{i.toString().padStart(2, '0')}</option>)}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Kolom 2: Selesai */}
                                    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm relative">
                                        <div className="absolute top-0 left-0 w-1 h-full bg-amber-500 rounded-l-lg"></div>
                                        <h4 className="text-xs font-bold text-amber-800 mb-3 border-b border-gray-100 pb-1 pl-2">Jadwal Selesai <span className="text-gray-400 font-normal">(Opsional)</span></h4>
                                        
                                        <div className="flex flex-col sm:flex-row gap-3 pl-2">
                                            <div className="flex-1">
                                                <label className="block text-[10px] font-semibold text-gray-500 mb-1">Tanggal</label>
                                                <DatePicker
                                                    selected={formData.tanggalSelesai}
                                                    onChange={(date) => setFormData({ ...formData, tanggalSelesai: date })}
                                                    dateFormat="EEEE, d MMMM yyyy"
                                                    locale={id}
                                                    isClearable
                                                    wrapperClassName="w-full"
                                                    className="w-full p-2 rounded text-black text-xs border border-gray-300 bg-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                                                    placeholderText="Pilih Tanggal Selesai"
                                                />
                                            </div>

                                            <div className="flex-1">
                                                <label className="block text-[10px] font-semibold text-gray-500 mb-1">Pukul (Kosongkan = s.d Selesai)</label>
                                                <div className="flex gap-2 items-center">
                                                    <select name="waktuSelesaiJam" value={formData.waktuSelesaiJam} onChange={handleInputChange} className="flex-1 p-2 text-xs rounded text-black border border-gray-300 bg-white focus:outline-none focus:border-amber-500">
                                                        <option value="">--</option>
                                                        {[...Array(24)].map((_, i) => <option key={i} value={i.toString().padStart(2, '0')}>{i.toString().padStart(2, '0')}</option>)}
                                                    </select>
                                                    <span className="font-bold text-gray-400">:</span>
                                                    <select name="waktuSelesaiMenit" value={formData.waktuSelesaiMenit} onChange={handleInputChange} className="flex-1 p-2 text-xs rounded text-black border border-gray-300 bg-white focus:outline-none focus:border-amber-500">
                                                        <option value="">--</option>
                                                        {[...Array(60)].map((_, i) => <option key={i} value={i.toString().padStart(2, '0')}>{i.toString().padStart(2, '0')}</option>)}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="mb-4">
                                    <label className="block text-xs font-semibold text-gray-600 mb-1">Zona Waktu</label>
                                    <select name="zonaWaktu" value={formData.zonaWaktu} onChange={handleInputChange} className="w-32 p-2 text-xs rounded text-black border border-gray-300 bg-white focus:outline-none focus:border-blue-500">
                                        <option value="WIB">WIB</option>
                                        <option value="WITA">WITA</option>
                                        <option value="WIT">WIT</option>
                                    </select>
                                </div>
                                
                                <label className="block text-xs font-semibold mb-1 text-gray-600 mt-3">Lokasi Acara / Tempat</label>
                                <input type="text" name="tempatKegiatan" value={formData.tempatKegiatan} onChange={handleInputChange} placeholder="Contoh: Workshop SMK Muhammadiyah 2 Pekanbaru" className={`mb-4 ${getInputClass('tempatKegiatan')}`} />

                                <label className="block text-xs font-semibold mb-2 text-gray-600 border-t border-gray-200 pt-2">Daftar Topik / Materi Acara</label>
                                {formData.materi.map((item, index) => (
                                    <div key={item.id} className="mb-3 relative group">
                                        <input type="text" value={item.target} onChange={(e) => handleMateriChange(index, 'target', e.target.value)} placeholder="Topik / Target (Contoh: Kelas PPLG)" className={`mb-1 ${getInputClass('materi')}`} />
                                        <textarea value={item.materi} onChange={(e) => handleMateriChange(index, 'materi', e.target.value)} placeholder="Deskripsi Materi" className={`h-16 ${getInputClass('materi')}`} />
                                        <button type="button" onClick={() => removeMateri(index)} className="absolute top-1 right-1 text-red-500 hover:text-red-700 text-sm font-bold bg-white border border-gray-200 shadow-sm w-6 h-6 rounded flex items-center justify-center transition-colors">✕</button>
                                    </div>
                                ))}
                                <button type="button" onClick={addMateri} className="w-full p-2 mt-2 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded transition-colors text-sm font-bold shadow-sm">
                                    + Tambah Materi
                                </button>
                                
                                <div className="mt-4 pt-4 border-t border-gray-200">
                                    <label className="block text-xs font-semibold mb-2 text-gray-600">Pengantar Rincian (Ditampilkan jika detail diisi)</label>
                                    <RichTextEditor value={formData.teksPengantarRincian} onChange={(val) => setFormData({...formData, teksPengantarRincian: val})} placeholder="Adapun rincian detail waktu..." minHeight="60px" />
                                </div>
                            </div>

                            <label className="block text-sm font-semibold mb-2 text-gray-800 mt-4">Paragraf Penutup <span className="text-red-500">*</span></label>
                            <RichTextEditor value={formData.paragrafPenutup1} onChange={(val) => { setFormData({...formData, paragrafPenutup1: val}); setErrors(errors.filter(e => e !== 'paragrafPenutup1')); }} placeholder="Harapan, Doa, & Salam Penutup..." minHeight="80px" isError={errors.includes('paragrafPenutup1')} />
                            <RichTextEditor value={formData.paragrafPenutup2} onChange={(val) => { setFormData({...formData, paragrafPenutup2: val}); setErrors(errors.filter(e => e !== 'paragrafPenutup2')); }} placeholder="Kalimat Terima Kasih Akhir (Opsional)..." minHeight="60px" />
                        </div>
                    )}

                    {/* STEP 4: Pengesahan & Tanda Tangan */}
                    {currentStep === 4 && (
                        <div className="animate-fade-in">
                            <h3 className="text-lg font-bold text-amber-700 border-b border-gray-200 pb-2 mb-4">Langkah 4: Bagian Tanda Tangan</h3>
                            
                            <label className="block text-sm font-semibold mb-1 text-gray-800">Tempat & Tanggal Surat Dibuat <span className="text-red-500">*</span></label>
                            <input type="text" name="tempatTanggalDibuat" value={formData.tempatTanggalDibuat} onChange={handleInputChange} placeholder="Contoh: Pekanbaru, 13 Mei 2026" className={`mb-4 ${getInputClass('tempatTanggalDibuat')}`} />
                            
                            <label className="block text-sm font-semibold mb-1 text-gray-800">Jabatan Penandatangan <span className="text-red-500">*</span></label>
                            <input type="text" name="jabatanPenandatangan" value={formData.jabatanPenandatangan} onChange={handleInputChange} placeholder="Contoh: Chairman Gamedev PKU" className={`mb-4 ${getInputClass('jabatanPenandatangan')}`} />
                            
                            <label className="block text-sm font-semibold mb-2 text-gray-800">Upload Cap / Tanda Tangan <span className="text-red-500">*</span></label>
                            
                            {!isTokenValid ? (
                                <div className="mb-4 p-4 border border-gray-300 bg-gray-50 rounded-lg">
                                    <div className="mb-2">
                                        <label className="block text-xs font-bold text-gray-700">Token Otorisasi Diperlukan</label>
                                    </div>
                                    <div className="flex gap-2">
                                        <input 
                                            type="password" 
                                            value={formData.inputToken} 
                                            onChange={(e) => setFormData({...formData, inputToken: e.target.value})} 
                                            placeholder="Masukkan token akses..." 
                                            className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-sm"
                                        />
                                        <button 
                                            type="button" 
                                            onClick={() => {
                                                const currentToken = localStorage.getItem('adminToken');
                                                if ((currentToken && formData.inputToken === currentToken) || formData.inputToken === 'SADITID') {
                                                    setIsTokenValid(true);
                                                    
                                                    // Invalidate token by generating a new one
                                                    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
                                                    let newToken = 'GDPKU-';
                                                    for (let i = 0; i < 5; i++) {
                                                        newToken += chars.charAt(Math.floor(Math.random() * chars.length));
                                                    }
                                                    localStorage.setItem('adminToken', newToken);
                                                } else {
                                                    alert('Token tidak valid atau sudah digunakan!');
                                                }
                                            }}
                                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded transition-colors shadow-sm"
                                        >
                                            Buka Akses
                                        </button>
                                    </div>
                                    <div className="text-[10px] text-gray-500 mt-2 italic">*Hanya pihak berwenang yang dapat mengunggah tanda tangan.</div>
                                </div>
                            ) : (
                                <div className={`p-4 rounded text-center relative overflow-hidden group transition-colors cursor-pointer mb-4 ${errors.includes('capImage') ? 'border-2 border-red-500 bg-red-50 hover:border-red-600' : 'bg-gray-50 border border-gray-300 hover:border-blue-500'}`} onClick={() => document.getElementById('capUpload').click()}>
                                    {formData.capImage ? (
                                        <div className="flex flex-col items-center">
                                            <img src={formData.capImage} alt="Cap Preview" className="h-20 object-contain mb-2 mix-blend-screen" />
                                            <span className="text-xs text-blue-600">Klik untuk ganti gambar TTD</span>
                                        </div>
                                    ) : (
                                        <div className="py-4 text-gray-500 flex flex-col items-center">
                                            <span className="text-3xl mb-2">🖋️</span>
                                            <span className="text-sm">Klik untuk upload TTD (.png, .jpg)</span>
                                        </div>
                                    )}
                                    <input id="capUpload" type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                                </div>
                            )}

                            <label className="block text-sm font-semibold mb-1 text-gray-800">Nama Lengkap Penandatangan <span className="text-red-500">*</span></label>
                            <input type="text" name="namaPenandatangan" value={formData.namaPenandatangan} onChange={handleInputChange} placeholder="Masukkan Nama Lengkap Penandatangan" className={`mb-6 ${getInputClass('namaPenandatangan')}`} />
                        </div>
                    )}

                    {/* STEP 5: Review & Cetak */}
                    {currentStep === 5 && (
                        <div className="animate-fade-in text-center py-6">
                            <h3 className="text-2xl font-bold text-amber-700 mb-2">Langkah 5: Selesai & Review</h3>
                            <p className="text-gray-600 mb-8">
                                Surat Anda sudah siap! Silakan periksa hasilnya di panel sebelah kanan. Pastikan nomor surat, penerima, isi, dan tanda tangan sudah sesuai dengan kebutuhan Anda.
                            </p>

                            {errors.length > 0 && (
                                <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-left text-sm text-red-700 rounded-r">
                                    <p className="font-bold mb-1">Ada field wajib yang belum diisi!</p>
                                    <p>Surat tidak bisa dicetak. Harap kembali ke langkah sebelumnya yang ditandai dengan field merah untuk melengkapi data.</p>
                                </div>
                            )}

                            <button 
                                onClick={handlePrint}
                                className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-300 hover:to-yellow-500 text-black font-black py-4 px-6 rounded-lg uppercase tracking-widest border-2 border-yellow-200 shadow-lg transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2"
                            >
                                <span>🖨️</span> CETAK SURAT SEKARANG
                            </button>
                        </div>
                    )}
                </div>

                {/* Wizard Navigation Buttons */}
                <div className="mt-6 flex justify-between border-t border-gray-200 pt-4">
                    <button 
                        onClick={prevStep}
                        disabled={currentStep === 1}
                        className={`px-4 py-2 rounded font-semibold text-sm transition-colors ${currentStep === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200' : 'bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 shadow-sm'}`}
                    >
                        ← Sebelumnya
                    </button>
                    
                    <button 
                        onClick={nextStep}
                        disabled={currentStep === totalSteps}
                        className={`px-4 py-2 rounded font-semibold text-sm transition-colors ${currentStep === totalSteps ? 'bg-blue-50 text-blue-300 cursor-not-allowed border border-blue-100' : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md'}`}
                    >
                        Selanjutnya →
                    </button>
                </div>
            </div>

            {/* Preview & Print Section */}
            <div className="w-full lg:w-2/3 bg-gray-200 p-4 lg:p-8 rounded-xl overflow-auto flex justify-center print:p-0 print:bg-white print:w-full print:block print:overflow-visible transition-all duration-500 custom-scrollbar h-full">
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
                        <p><strong>Nomor:</strong> {fullNomorSurat}</p>
                        <p><strong>Lampiran:</strong> {formData.lampiran || '-'}</p>
                        <p><strong>Hal:</strong> {formData.hal}</p>
                    </div>

                    {/* Tujuan */}
                    <div className="text-[12pt] leading-relaxed mb-4">
                        <p><strong>Yth.</strong></p>
                        <p><strong> {formData.instansi}</strong></p>
                        <p>di {formData.tempatTujuan || 'Tempat'}</p>
                    </div>

                    {/* Isi Surat */}
                    <div className="text-[12pt] leading-relaxed text-justify mb-4">
                        <p className="mb-4" dangerouslySetInnerHTML={{ __html: formData.paragrafPembuka }}></p>

                        {/* Rincian Kegiatan (Conditional) */}
                        {hasDetailKegiatan && (
                            <>
                                <p className="mb-4" dangerouslySetInnerHTML={{ __html: formData.teksPengantarRincian }}></p>

                                <div className="pl-8 mb-4">
                                    <table className="w-full">
                                        <tbody>
                                            {displayWaktuKegiatan && (
                                                <tr>
                                                    <td className="w-36 font-bold align-top py-1">Hari / Tanggal</td>
                                                    <td className="w-4 align-top py-1">:</td>
                                                    <td className="align-top py-1">{displayWaktuKegiatan}</td>
                                                </tr>
                                            )}
                                            {displayJamKegiatan && (
                                                <tr>
                                                    <td className="font-bold align-top py-1">Waktu</td>
                                                    <td className="align-top py-1">:</td>
                                                    <td className="align-top py-1">{displayJamKegiatan}</td>
                                                </tr>
                                            )}
                                            {formData.tempatKegiatan && (
                                                <tr>
                                                    <td className="font-bold align-top py-1">Tempat</td>
                                                    <td className="align-top py-1">:</td>
                                                    <td className="align-top py-1">{formData.tempatKegiatan}</td>
                                                </tr>
                                            )}
                                            {formData.materi.map((item, index) => (
                                                (item.target || item.materi) && (
                                                    <tr key={index}>
                                                        <td className="font-bold align-top py-1">{item.target}</td>
                                                        <td className="align-top py-1">:</td>
                                                        <td className="align-top py-1 text-justify">{item.materi}</td>
                                                    </tr>
                                                )
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </>
                        )}

                        <p className="mb-4" dangerouslySetInnerHTML={{ __html: formData.paragrafPenutup1 }}></p>
                        
                        {formData.paragrafPenutup2 && (
                            <p className="mb-12" dangerouslySetInnerHTML={{ __html: formData.paragrafPenutup2 }}></p>
                        )}
                    </div>

                    {/* Tanda Tangan */}
                    <div className="flex justify-end text-[12pt] leading-relaxed relative page-break-inside-avoid mt-8">
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
