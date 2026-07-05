<template>
    <div class="min-h-screen bg-white sm:bg-slate-50 text-slate-900 pb-10 sm:py-12 flex flex-col items-center">

        <div class="w-full sm:max-w-3xl px-5 sm:px-0">

            <div
                class="pt-6 sm:pt-0 mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-5 sm:gap-4">
                <div>
                    <h2 class="text-2xl font-bold text-slate-900 tracking-tight">Dashboard & Laporan</h2>
                    <p class="text-sm text-slate-500 mt-1.5">Ringkasan performa finansial dan pergerakan produk</p>
                </div>

                <div class="w-full sm:w-auto">
                    <label class="block mb-2 sm:mb-1.5 text-xs font-bold text-slate-500 uppercase tracking-wider">
                        Periode Laporan
                    </label>
                    <input type="month" v-model="filterBulan" @change="muatData"
                        class="w-full sm:w-56 px-4 py-3 sm:py-2.5 text-base sm:text-sm text-slate-900 bg-slate-50 sm:bg-white border border-slate-300 rounded-xl sm:rounded-lg shadow-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-colors">
                </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div
                    class="bg-white p-5 rounded-2xl sm:rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                    <div>
                        <p class="text-sm font-semibold text-slate-500 mb-1">Total Penjualan</p>
                        <p class="text-2xl font-bold text-slate-900 tracking-tight">
                            Rp {{ totalJualBulanan.toLocaleString('id-ID') }}
                        </p>
                        <p class="text-xs font-medium text-slate-500 mt-1">
                            HPP Terjual: Rp {{ totalHppBaru.toLocaleString('id-ID') }}
                        </p>
                    </div>
                    <div class="p-3.5 bg-blue-50 rounded-xl text-blue-600">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                    </div>
                </div>

                <div
                    class="bg-white p-5 rounded-2xl sm:rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                    <div>
                        <p class="text-sm font-semibold text-slate-500 mb-1">Laba Bersih</p>
                        <p class="text-2xl font-bold text-emerald-600 tracking-tight">
                            Rp {{ labaBersih.toLocaleString('id-ID') }}
                        </p>
                    </div>
                    <div class="p-3.5 bg-emerald-50 rounded-xl text-emerald-600">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                </div>
            </div>

            <div class="bg-white border border-slate-200 rounded-2xl sm:rounded-xl shadow-sm mb-6 overflow-hidden">
                <div class="px-5 py-4 border-b border-slate-100 bg-slate-50">
                    <h3 class="text-sm font-bold text-slate-800 uppercase tracking-wide">
                        Rincian Pengeluaran (Bulan Ini)
                    </h3>
                </div>
                <div class="p-5">
                    <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <div
                            class="p-4 bg-orange-50/50 sm:bg-orange-50 rounded-xl border border-orange-100 flex flex-col justify-center">
                            <p class="text-xs font-bold text-orange-600 uppercase mb-1.5 tracking-wide">Pemasaran</p>
                            <p class="text-lg font-bold text-orange-700">Rp {{ dBiayaPemasaran.toLocaleString('id-ID')
                                }}</p>
                        </div>
                        <div
                            class="p-4 bg-purple-50/50 sm:bg-purple-50 rounded-xl border border-purple-100 flex flex-col justify-center">
                            <p class="text-xs font-bold text-purple-600 uppercase mb-1.5 tracking-wide">Admin</p>
                            <p class="text-lg font-bold text-purple-700">Rp {{ dBiayaAdmin.toLocaleString('id-ID') }}
                            </p>
                        </div>
                        <div
                            class="p-4 bg-sky-50/50 sm:bg-sky-50 rounded-xl border border-sky-100 flex flex-col justify-center">
                            <p class="text-xs font-bold text-sky-600 uppercase mb-1.5 tracking-wide">Sewa</p>
                            <p class="text-lg font-bold text-sky-700">Rp {{ dBiayaSewa.toLocaleString('id-ID') }}</p>
                        </div>
                        <div
                            class="p-4 bg-slate-50/50 sm:bg-slate-50 rounded-xl border border-slate-200 flex flex-col justify-center">
                            <p class="text-xs font-bold text-slate-600 uppercase mb-1.5 tracking-wide">Lain-lain</p>
                            <p class="text-lg font-bold text-slate-700">Rp {{ dBiayaLain.toLocaleString('id-ID') }}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="bg-white border border-slate-200 rounded-2xl sm:rounded-xl shadow-sm mb-6 overflow-hidden">
                <div class="p-5">
                    <div class="grid grid-cols-1 sm:grid-cols-4 gap-4">
                        <div class="p-4 bg-slate-50 rounded-xl border border-slate-100 flex flex-col justify-center">
                            <p class="text-xs font-bold text-slate-500 uppercase mb-1.5 tracking-wide">Persediaan
                                Saat ini</p>
                            <p class="text-lg font-bold text-slate-700">Rp {{ persediaanSaatIni.toLocaleString('id-ID')
                                }}</p>
                            <p class="text-[10px] text-slate-400 mt-1">Bulan ini</p>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="produkTerlaris || produkPalingSepi"
                class="bg-white border border-slate-200 rounded-2xl sm:rounded-xl shadow-sm mb-6 overflow-hidden">
                <div class="px-5 py-4 border-b border-slate-100 bg-slate-50">
                    <h3 class="text-sm font-bold text-slate-800 uppercase tracking-wide">
                        Ranking Produk (Bulan Ini)
                    </h3>
                </div>

                <div class="p-5 space-y-4">
                    <div class="flex items-start">
                        <div class="flex-shrink-0 mt-0.5">
                            <svg class="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M5 10l7-7m0 0l7 7m-7-7v18" />
                            </svg>
                        </div>
                        <div class="ml-3.5">
                            <p class="text-sm font-bold text-slate-800">Produk paling laku</p>
                            <p class="text-sm text-slate-500 mt-1">
                                {{ produkTerlaris.nama }} &mdash; <span class="font-semibold text-slate-700">{{
                                    produkTerlaris.qty }} unit</span> terjual
                            </p>
                        </div>
                    </div>

                    <div class="border-t border-slate-100"></div>

                    <div class="flex items-start">
                        <div class="flex-shrink-0 mt-0.5">
                            <svg class="w-5 h-5 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                            </svg>
                        </div>
                        <div class="ml-3.5">
                            <p class="text-sm font-bold text-slate-800">Produk paling sepi</p>
                            <p class="text-sm text-slate-500 mt-1">
                                {{ produkPalingSepi.nama }} &mdash; <span class="font-semibold text-slate-700">{{
                                    produkPalingSepi.qty }} unit</span> terjual
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div v-else
                class="flex items-center justify-center bg-white border border-slate-200 rounded-2xl sm:rounded-xl shadow-sm mb-6 p-4">
                <p class="text-sm font-medium text-slate-500">Belum ada data penjualan bulan ini.</p>
            </div>

            <button @click="eksporLabaRugi"
                class="w-full flex justify-center items-center py-3.5 sm:py-2.5 px-4 rounded-xl sm:rounded-lg shadow-sm text-base sm:text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 transition-colors">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Unduh Laporan Laba Rugi (PDF)
            </button>

            <RouterLink to="/"
                class="mt-6 sm:mt-8 flex items-center justify-center text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors">
                <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

const filterBulan = ref(dayjs().format('YYYY-MM'));
const totalJualBulanan = ref(0);
const labaBersih = ref(0);
const produkTerlaris = ref(null);
const produkPalingSepi = ref(null);

// Variabel untuk PDF
const totalHppBaru = ref(0);
const dBiayaPemasaran = ref(0);
const dBiayaAdmin = ref(0);
const dBiayaSewa = ref(0);
const dBiayaLain = ref(0);

const persediaanSaatIni = ref(0);

const muatData = async () => {
    const bulanAwal = dayjs(filterBulan.value).startOf('month').format('YYYY-MM-DD HH:mm:ss');
    const bulanAkhir = dayjs(filterBulan.value).endOf('month').format('YYYY-MM-DD HH:mm:ss');

    // Ambil data penjualan bulan ini
    const penjualanBulanIni = await db.penjualan
        .where('tanggal').between(bulanAwal, bulanAkhir, true, true)
        .toArray();

    // Ambil data pengeluaran bulan ini
    const pengeluaranBulanIni = await db.pengeluaran
        .where('bulanTahun').equals(filterBulan.value)
        .toArray();

    // Ambil Snapshot Persediaan
    const snapshotSaatIni = await db.persediaan.get(filterBulan.value);
    persediaanSaatIni.value = snapshotSaatIni ? snapshotSaatIni.totalNilai : 0;

    // Kalkulasi Total Penjualan
    totalJualBulanan.value = penjualanBulanIni.reduce((sum, item) => sum + (Number(item.totalPenjualan) || 0), 0);

    // Kalkulasi Biaya
    dBiayaPemasaran.value = pengeluaranBulanIni.filter(p => p.jenis === 'pemasaran').reduce((sum, item) => sum + item.nominal, 0);
    dBiayaAdmin.value = pengeluaranBulanIni.filter(p => p.jenis === 'admin').reduce((sum, item) => sum + item.nominal, 0);
    dBiayaSewa.value = pengeluaranBulanIni.filter(p => p.jenis === 'sewa').reduce((sum, item) => sum + item.nominal, 0);
    dBiayaLain.value = pengeluaranBulanIni.filter(p => p.jenis === 'lain_lain').reduce((sum, item) => sum + item.nominal, 0);

    // Hitung HPP dengan rumus baru
    totalHppBaru.value = penjualanBulanIni.reduce((sum, item) => sum + (Number(item.totalHpp) || 0), 0);

    // Rumus Laba Rugi: Penjualan - Total HPP Terjual - (Pengeluaran Lainnya)
    labaBersih.value = totalJualBulanan.value - totalHppBaru.value - dBiayaPemasaran.value - dBiayaAdmin.value - dBiayaSewa.value - dBiayaLain.value;

    // Hitung Produk Terlaris / Sepi
    hitungStatistikProduk(penjualanBulanIni);
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
                // Jika barang sudah ada maka tambahkan quantity-nya
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
    doc.text(`Laporan Laba Rugi - Periode: ${filterBulan.value}`, 14, 20);

    autoTable(doc, {
        startY: 30,
        body: [
            ['Total Pendapatan Penjualan', `Rp ${totalJualBulanan.value.toLocaleString('id-ID')}`],
            ['Dikurangi: HPP (Harga Pokok Penjualan)', `(Rp ${totalHppBaru.value.toLocaleString('id-ID')})`],
            ['Laba Kotor', `Rp ${(totalJualBulanan.value - totalHppBaru.value).toLocaleString('id-ID')}`],
            ['', ''],
            ['Dikurangi: Biaya Pemasaran', `(Rp ${dBiayaPemasaran.value.toLocaleString('id-ID')})`],
            ['Dikurangi: Biaya Admin', `(Rp ${dBiayaAdmin.value.toLocaleString('id-ID')})`],
            ['Dikurangi: Biaya Sewa', `(Rp ${dBiayaSewa.value.toLocaleString('id-ID')})`],
            ['Dikurangi: Biaya Lain-lain', `(Rp ${dBiayaLain.value.toLocaleString('id-ID')})`],
            ['', ''],
            ['LABA / RUGI BERSIH', `Rp ${labaBersih.value.toLocaleString('id-ID')}`]
        ],
        theme: 'grid',
        styles: { fontSize: 12 },
        willDrawCell: function (data) {
            if (data.row.index === 9) { // Baris Laba Bersih
                doc.setFont(undefined, 'bold');
                doc.setTextColor(labaBersih.value >= 0 ? 0 : 255, labaBersih.value >= 0 ? 128 : 0, 0);
            }
        }
    });

    await saveAndSharePDF(doc, `Laporan_Laba_Rugi_${filterBulan.value}.pdf`);
};

onMounted(() => {
    muatData();
});
</script>