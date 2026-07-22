<template>
    <!-- Latar Belakang Utama: Slate kebiruan -->
    <div class="min-h-screen bg-slate-200 flex flex-col font-sans selection:bg-blue-300 selection:text-blue-900">

        <!-- Bagian Header (Curved Bottom & Decorative Blur) -->
        <div
            class="px-6 pt-10 pb-10 bg-blue-600 rounded-b-[2.5rem] shadow-[0_15px_40px_-15px_rgba(37,99,235,0.6)] flex flex-col items-center relative overflow-hidden border-b border-blue-400/50">
            <!-- Dekorasi Abstrak -->
            <div class="absolute -top-12 -left-10 w-48 h-48 bg-blue-500 rounded-full blur-3xl opacity-70"></div>
            <div class="absolute top-10 -right-12 w-40 h-40 bg-cyan-600 rounded-full blur-3xl opacity-60"></div>

            <!-- Teks Header -->
            <div class="text-center z-10 mb-6">
                <h2 class="text-3xl font-extrabold text-blue-100 tracking-tight drop-shadow-md">Dashboard</h2>
                <div
                    class="mt-2 bg-blue-800/40 px-5 py-1.5 rounded-full border border-blue-300/30 backdrop-blur-md inline-block">
                    <p class="text-cyan-100 text-xs font-semibold tracking-wide">
                        Laporan Finansial & Produk
                    </p>
                </div>
            </div>

            <!-- Input Periode (Menyatu dengan Header) -->
            <div class="w-full max-w-sm z-10 flex flex-col gap-3">
                <!-- Dropdown Pilihan Periode -->
                <div>
                    <label class="block mb-2 text-[10px] font-bold text-blue-200 uppercase tracking-widest pl-2">
                        Periode Laporan
                    </label>
                    <div class="relative">
                        <select v-model="tipePeriode" @change="muatData"
                            class="w-full px-5 py-3.5 text-blue-50 bg-blue-900/40 border border-blue-300/30 rounded-2xl shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:border-cyan-300 transition-all backdrop-blur-sm appearance-none">
                            <option value="bulan" class="text-blue-900">1 Bulan</option>
                            <option value="semester" class="text-blue-900">1 Semester Terakhir</option>
                            <option value="semua" class="text-blue-900">Seluruh Waktu</option>
                        </select>
                    </div>
                </div>

                <!-- Input Bulan (Hanya muncul jika tipePeriode = 'bulan') -->
                <div v-if="tipePeriode === 'bulan'">
                    <label class="block mb-2 text-[10px] font-bold text-blue-200 uppercase tracking-widest pl-2">
                        Pilih Bulan
                    </label>
                    <div class="relative">
                        <input type="month" v-model="filterBulan" @change="muatData"
                            class="w-full px-5 py-3.5 text-blue-50 bg-blue-900/40 border border-blue-300/30 rounded-2xl shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:border-cyan-300 transition-all backdrop-blur-sm appearance-none">
                    </div>
                </div>
            </div>
        </div>

        <!-- Bagian Konten Utama (Bento Grid) -->
        <div class="flex-grow px-5 pt-6 pb-12 overflow-y-auto max-w-3xl w-full mx-auto flex flex-col gap-4">

            <!-- Grid Ringkasan Penjualan & Laba -->
            <div class="grid grid-cols-2 gap-4">
                <!-- Card Penjualan -->
                <div
                    class="group relative bg-blue-300 p-5 rounded-[2rem] shadow-sm overflow-hidden flex flex-col justify-center">
                    <div
                        class="absolute -right-4 -bottom-4 w-24 h-24 bg-blue-400 rounded-full opacity-40 group-hover:scale-125 transition-transform duration-500">
                    </div>
                    <div class="relative z-10">
                        <div class="p-2 bg-blue-400/50 w-max rounded-xl text-blue-900 mb-3 shadow-inner">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg>
                        </div>
                        <p class="text-[11px] font-bold text-blue-800 uppercase tracking-wider mb-0.5">Penjualan</p>
                        <p class="text-xl font-extrabold text-blue-950 tracking-tight whitespace-nowrap">
                            Rp {{ totalJualBulanan.toLocaleString('id-ID') }}
                        </p>
                        <p class="text-[10px] font-bold text-blue-700/80 mt-1">
                            HPP: Rp {{ totalHppBaru.toLocaleString('id-ID') }}
                        </p>
                    </div>
                </div>

                <!-- Card Laba Bersih -->
                <div
                    class="group relative bg-emerald-300 p-5 rounded-[2rem] shadow-sm overflow-hidden flex flex-col justify-center">
                    <div
                        class="absolute -right-4 -bottom-4 w-24 h-24 bg-emerald-400 rounded-full opacity-40 group-hover:scale-125 transition-transform duration-500">
                    </div>
                    <div class="relative z-10">
                        <div class="p-2 bg-emerald-400/50 w-max rounded-xl text-emerald-950 mb-3 shadow-inner">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <p class="text-[11px] font-bold text-emerald-800 uppercase tracking-wider mb-0.5">Laba Bersih
                        </p>
                        <p class="text-xl font-extrabold text-emerald-950 tracking-tight whitespace-nowrap">
                            Rp {{ labaBersih.toLocaleString('id-ID') }}
                        </p>
                    </div>
                </div>
            </div>

            <!-- Card Persediaan (Full Width Bento) -->
            <div
                class="relative bg-amber-200 p-5 rounded-[2rem] shadow-sm overflow-hidden flex items-center justify-between">
                <div class="absolute -left-10 -top-10 w-32 h-32 bg-amber-300 rounded-full opacity-40"></div>
                <div class="relative z-10">
                    <p class="text-xs font-bold text-amber-800 uppercase tracking-wider mb-1">Persediaan Saat Ini</p>
                    <p class="text-2xl font-extrabold text-amber-950">
                        Rp {{ persediaanSaatIni.toLocaleString('id-ID') }}
                    </p>
                </div>
                <div class="relative z-10 p-3 bg-amber-300/50 rounded-2xl text-amber-900 shadow-inner">
                    <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                </div>
            </div>

            <!-- Rincian Biaya Wrapper (Menggunakan warna Slate agar formal) -->
            <div class="bg-slate-300 rounded-[2rem] overflow-hidden shadow-sm border-2 border-slate-300/50">
                <!-- Komponen internal RincianBiaya -->
                <RincianBiaya :biayaPemasaran="dBiayaPemasaran" :biayaListrikAirInternet="dBiayaListrikAirInternet"
                    :biayaAdmin="dBiayaAdmin" :biayaPerlengkapan="dBiayaPerlengkapan" :biayaPajak="dBiayaPajak"
                    :biayaSewa="dBiayaSewa" :biayaLain="dBiayaLain" />
            </div>

            <!-- Ranking Produk Wrapper (Menggunakan warna ungu/pink netral) -->
            <div v-if="produkTerlaris || produkPalingSepi"
                class="bg-purple-200 rounded-[2rem] overflow-hidden shadow-sm border-2 border-purple-200/50">
                <RankingProduk :produkTerlaris="produkTerlaris" :produkPalingSepi="produkPalingSepi" />
            </div>

            <div v-else
                class="flex flex-col items-center justify-center bg-purple-200/60 rounded-[2rem] shadow-sm p-8 text-center border-2 border-purple-300/30 dashed">
                <div class="w-12 h-12 bg-purple-300 rounded-full flex items-center justify-center text-purple-700 mb-3">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                </div>
                <p class="text-sm font-bold text-purple-900">Belum ada data</p>
                <p class="text-xs text-purple-800 mt-1">Penjualan bulan ini masih kosong.</p>
            </div>

            <!-- Area Tombol Download (Bento Grid Button Style) -->
            <div class="grid grid-cols-2 gap-4 mt-2">
                <!-- Tombol PDF -->
                <button @click="eksporLabaRugi" :disabled="isLoading"
                    class="group relative flex flex-col items-center justify-center p-4 rounded-[1.5rem] bg-rose-500 shadow-md hover:bg-rose-600 active:scale-95 transition-all duration-300 overflow-hidden">
                    <div
                        class="absolute -top-4 -right-4 w-16 h-16 bg-rose-400 rounded-full opacity-30 group-hover:scale-150 transition-transform">
                    </div>
                    <svg class="w-6 h-6 text-rose-100 mb-2 z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span class="text-xs font-bold text-rose-50 z-10 text-center">
                        {{ isLoading ? 'Memproses...' : 'Unduh PDF' }}
                    </span>
                </button>

                <!-- Tombol Excel -->
                <button @click="downloadExcel" :disabled="isLoading"
                    class="group relative flex flex-col items-center justify-center p-4 rounded-[1.5rem] bg-teal-600 shadow-md hover:bg-teal-700 active:scale-95 transition-all duration-300 overflow-hidden">
                    <div
                        class="absolute -top-4 -right-4 w-16 h-16 bg-teal-500 rounded-full opacity-30 group-hover:scale-150 transition-transform">
                    </div>
                    <svg class="w-6 h-6 text-teal-100 mb-2 z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span class="text-xs font-bold text-teal-50 z-10 text-center">
                        {{ isLoading ? 'Memproses...' : 'Unduh Excel' }}
                    </span>
                </button>
            </div>

            <!-- Tombol Kembali -->
            <RouterLink to="/"
                class="mt-4 py-4 px-6 rounded-full bg-slate-300 shadow-sm border border-slate-400/40 flex items-center justify-center text-sm font-bold text-slate-700 hover:bg-slate-400 hover:text-slate-900 active:scale-95 transition-all">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Kembali ke Menu Utama
            </RouterLink>

        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { db } from '../database/db';
import dayjs from 'dayjs';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import autoTable from 'jspdf-autotable';
import { saveAndSharePDF } from '../utils/pdfHandler';
import { exportLabaRugiExcel } from '../utils/excelHandler';
import { useToast } from '../composables/useToast';
import RincianBiaya from '@/components/RincianBiaya.vue';
import RankingProduk from '@/components/RankingProduk.vue';

const tipePeriode = ref('bulan');
const filterBulan = ref(dayjs().format('YYYY-MM'));
const { showToast } = useToast();
const totalJualBulanan = ref(0);
const labaBersih = ref(0);
const produkTerlaris = ref(null);
const produkPalingSepi = ref(null);

const isLoading = ref(false);

// Variabel untuk PDF
const totalHppBaru = ref(0);
const dBiayaPemasaran = ref(0);
const dBiayaListrikAirInternet = ref(0);
const dBiayaPerlengkapan = ref(0);
const dBiayaAdmin = ref(0);
const dBiayaPajak = ref(0);
const dBiayaSewa = ref(0);
const dBiayaLain = ref(0);

const persediaanSaatIni = ref(0);

const muatData = async () => {
    let penjualanData = [];
    let pengeluaranData = [];

    if (tipePeriode.value === 'bulan') {
        const bulanAwal = dayjs(filterBulan.value).startOf('month').format('YYYY-MM-DD HH:mm:ss');
        const bulanAkhir = dayjs(filterBulan.value).endOf('month').format('YYYY-MM-DD HH:mm:ss');
        
        penjualanData = await db.penjualan
            .where('tanggal').between(bulanAwal, bulanAkhir, true, true)
            .toArray();
            
        pengeluaranData = await db.pengeluaran
            .where('bulanTahun').equals(filterBulan.value)
            .toArray();
            
        const snapshotSaatIni = await db.persediaan.get(filterBulan.value);
        persediaanSaatIni.value = snapshotSaatIni ? snapshotSaatIni.totalNilai : 0;
    } else if (tipePeriode.value === 'semester') {
        const semesterAwal = dayjs().subtract(5, 'month').startOf('month').format('YYYY-MM-DD HH:mm:ss');
        const semesterAkhir = dayjs().endOf('month').format('YYYY-MM-DD HH:mm:ss');
        const startMonthStr = dayjs().subtract(5, 'month').format('YYYY-MM');
        const endMonthStr = dayjs().format('YYYY-MM');

        penjualanData = await db.penjualan
            .where('tanggal').between(semesterAwal, semesterAkhir, true, true)
            .toArray();
            
        pengeluaranData = await db.pengeluaran
            .where('bulanTahun').between(startMonthStr, endMonthStr, true, true)
            .toArray();
            
        const snapshotSaatIni = await db.persediaan.orderBy('bulanTahun').last();
        persediaanSaatIni.value = snapshotSaatIni ? snapshotSaatIni.totalNilai : 0;
    } else if (tipePeriode.value === 'semua') {
        penjualanData = await db.penjualan.toArray();
        pengeluaranData = await db.pengeluaran.toArray();
        
        const snapshotSaatIni = await db.persediaan.orderBy('bulanTahun').last();
        persediaanSaatIni.value = snapshotSaatIni ? snapshotSaatIni.totalNilai : 0;
    }

    // Kalkulasi Total Penjualan
    totalJualBulanan.value = penjualanData.reduce((sum, item) => sum + (Number(item.totalPenjualan) || 0), 0);

    // Kalkulasi Biaya
    dBiayaPemasaran.value = pengeluaranData.filter(p => p.jenis === 'pemasaran').reduce((sum, item) => sum + item.nominal, 0);
    dBiayaAdmin.value = pengeluaranData.filter(p => p.jenis === 'admin').reduce((sum, item) => sum + item.nominal, 0);
    dBiayaSewa.value = pengeluaranData.filter(p => p.jenis === 'sewa').reduce((sum, item) => sum + item.nominal, 0);
    dBiayaLain.value = pengeluaranData.filter(p => p.jenis === 'lain_lain').reduce((sum, item) => sum + item.nominal, 0);
    dBiayaListrikAirInternet.value = pengeluaranData.filter(p => p.jenis === 'listrik_air_internet').reduce((sum, item) => sum + item.nominal, 0);
    dBiayaPerlengkapan.value = pengeluaranData.filter(p => p.jenis === 'perlengkapan').reduce((sum, item) => sum + item.nominal, 0);
    dBiayaPajak.value = pengeluaranData.filter(p => p.jenis === 'pajak').reduce((sum, item) => sum + item.nominal, 0);

    // Hitung HPP dengan rumus baru
    totalHppBaru.value = penjualanData.reduce((sum, item) => sum + (Number(item.totalHpp) || 0), 0);

    // Rumus Laba Rugi: Penjualan - Total HPP Terjual - (Pengeluaran Lainnya)
    labaBersih.value = totalJualBulanan.value - totalHppBaru.value - dBiayaPemasaran.value - dBiayaListrikAirInternet.value - dBiayaPerlengkapan.value - dBiayaAdmin.value - dBiayaPajak.value - dBiayaSewa.value - dBiayaLain.value;

    // Hitung Produk Terlaris / Sepi
    hitungStatistikProduk(penjualanData);
};

const hitungStatistikProduk = (penjualan) => {
    if (penjualan.length === 0) {
        produkTerlaris.value = null;
        produkPalingSepi.value = null;
        return;
    }

    const rekap = {};
    penjualan.forEach(transaksi => {
        transaksi.items.forEach(produk => {

            // Jika barang belum ada di data penjualan maka tambahkan
            if (!rekap[produk.id]) {
                rekap[produk.id] = { nama: produk.nama, qty: produk.quantity };
            } else {
                // Jika barang sudah ada maka cukup tambahkan quantity-nya saja
                rekap[produk.id].qty += produk.quantity;
            }
        });
    });

    const arrRekap = Object.values(rekap).sort((a, b) => b.qty - a.qty);
    produkTerlaris.value = arrRekap[0]; // ambil nilai paling awal dari urutan
    produkPalingSepi.value = arrRekap[arrRekap.length - 1]; // ambil nilai paling akhir dari urutan
};

const eksporLabaRugi = async () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    
    let periodeText = filterBulan.value;
    if (tipePeriode.value === 'semester') periodeText = '1 Semester Terakhir';
    if (tipePeriode.value === 'semua') periodeText = 'Seluruh Waktu';

    doc.text(`Laporan Laba Rugi - Periode: ${periodeText}`, 14, 20);

    autoTable(doc, {
        startY: 30,
        body: [
            ['Total Pendapatan Penjualan', `Rp ${totalJualBulanan.value.toLocaleString('id-ID')}`],
            ['Dikurangi: HPP (Harga Pokok Penjualan)', `(Rp ${totalHppBaru.value.toLocaleString('id-ID')})`],
            ['Laba Kotor', `Rp ${(totalJualBulanan.value - totalHppBaru.value).toLocaleString('id-ID')}`],
            ['', ''],
            ['Dikurangi: Biaya Pemasaran', `(Rp ${dBiayaPemasaran.value.toLocaleString('id-ID')})`],
            ['Dikurangi: Biaya Listrik, Air, dan Internet', `(Rp ${dBiayaListrikAirInternet.value.toLocaleString('id-ID')})`],
            ['Dikurangi: Biaya Perlengkapan', `(Rp ${dBiayaPerlengkapan.value.toLocaleString('id-ID')})`],
            ['Dikurangi: Biaya Admin', `(Rp ${dBiayaAdmin.value.toLocaleString('id-ID')})`],
            ['Dikurangi: Biaya Pajak', `(Rp ${dBiayaPajak.value.toLocaleString('id-ID')})`],
            ['Dikurangi: Biaya Sewa', `(Rp ${dBiayaSewa.value.toLocaleString('id-ID')})`],
            ['Dikurangi: Biaya Lain-lain', `(Rp ${dBiayaLain.value.toLocaleString('id-ID')})`],
            ['', ''],
            ['LABA / RUGI BERSIH', `Rp ${labaBersih.value.toLocaleString('id-ID')}`]
        ],
        theme: 'grid',
        styles: { fontSize: 12 },
        willDrawCell: function (data) {
            if (data.row.index === 12) { // Baris Laba Bersih
                doc.setFont(undefined, 'bold');
                doc.setTextColor(labaBersih.value >= 0 ? 0 : 255, labaBersih.value >= 0 ? 128 : 0, 0);
            }
        }
    });

    let filename = `Laporan_Laba_Rugi_${filterBulan.value}.pdf`;
    if (tipePeriode.value === 'semester') filename = `Laporan_Laba_Rugi_1_Semester.pdf`;
    if (tipePeriode.value === 'semua') filename = `Laporan_Laba_Rugi_Seluruh_Waktu.pdf`;

    await saveAndSharePDF(doc, filename);
};

const downloadExcel = async () => {
    if (tipePeriode.value === 'bulan' && !filterBulan.value) {
        showToast('Pilih bulan terlebih dahulu', 'warning');
        return;
    }

    isLoading.value = true;
    try {
        let periodeArg = filterBulan.value;
        if (tipePeriode.value === 'semester') periodeArg = '1 Semester Terakhir';
        if (tipePeriode.value === 'semua') periodeArg = 'Seluruh Waktu';
        
        await exportLabaRugiExcel(periodeArg);
    } catch (error) {
        showToast('Terjadi kesalahan saat mengunduh laporan.', 'error');
    } finally {
        isLoading.value = false;
    }
};

onMounted(() => {
    muatData();
});
</script>