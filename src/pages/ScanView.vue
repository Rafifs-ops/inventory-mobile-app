<template>
    <div class="min-h-screen bg-gray-50 text-slate-800 p-6 flex flex-col items-center py-12">

        <div class="w-full max-w-md">

            <div class="mb-6 text-center">
                <h2 class="text-2xl font-bold text-slate-800 tracking-tight">Pemindaian Produk</h2>
                <p class="text-sm text-slate-500 mt-1">Sistem pencatatan kasir dan inventaris cepat</p>
            </div>

            <div class="grid grid-cols-2 gap-4 mb-6">
                <div class="p-4 bg-white border border-gray-200 rounded-xl shadow-sm flex flex-col justify-center">
                    <p class="text-xs font-semibold text-slate-500 uppercase tracking-wide">Total Penjualan</p>
                    <p class="mt-1.5 text-lg font-bold text-slate-800 truncate">
                        Rp {{ totalPenjualan.toLocaleString('id-ID') }}
                    </p>
                </div>
                <div
                    class="p-4 bg-emerald-50 border border-emerald-100 rounded-xl shadow-sm flex flex-col justify-center">
                    <p class="text-xs font-semibold text-emerald-700 uppercase tracking-wide">Est. Keuntungan</p>
                    <p class="mt-1.5 text-lg font-bold text-emerald-700 truncate">
                        Rp {{ totalKeuntungan.toLocaleString('id-ID') }}
                    </p>
                </div>
            </div>

            <button @click="mulaiScan"
                class="w-full flex items-center justify-center gap-2 py-4 px-6 text-base font-semibold text-white transition-all bg-blue-600 border border-transparent rounded-xl shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm14 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z">
                    </path>
                </svg>
                Mulai Pindai Barcode
            </button>

            <div v-if="barangDitemukan?.length > 0" class="mt-6 space-y-3">
                <h3 class="text-sm font-bold text-slate-800 uppercase tracking-wide border-b border-gray-200 pb-2">
                    Daftar Belanja ({{ barangDitemukan.length }} Item)
                </h3>

                <div v-for="produk in barangDitemukan" :key="produk.id"
                    class="p-4 bg-white border border-gray-200 rounded-xl shadow-sm hover:border-blue-300 transition-colors">

                    <div class="flex justify-between items-start">
                        <div>
                            <div class="flex items-center gap-2 mb-1">
                                <h4 class="text-base font-bold text-slate-800">{{ produk.nama }}</h4>
                                <span
                                    class="px-2 py-0.5 text-[10px] font-bold text-emerald-700 bg-emerald-100 rounded uppercase tracking-wider">
                                    Berhasil
                                </span>
                            </div>
                            <p class="text-sm font-medium text-slate-600">Rp {{ produk.harga.toLocaleString('id-ID') }}
                            </p>
                        </div>
                    </div>

                    <div class="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center text-xs">
                        <span
                            class="text-slate-500 font-mono bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                            ID: {{ produk.id }}
                        </span>
                        <span class="font-semibold text-emerald-600 flex items-center gap-1">
                            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg>
                            Margin Rp {{ (produk.harga - (produk.hpp || 0)).toLocaleString('id-ID') }}
                        </span>
                    </div>
                </div>
            </div>

            <button v-if="barangDitemukan?.length > 0" @click="prosesPenjualan"
                class="w-full py-3.5 mt-6 text-sm font-bold text-white transition-all bg-emerald-600 border border-transparent rounded-xl shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2">
                Selesai Transaksi & Cetak Nota
            </button>

            <RouterLink to="/"
                class="mt-8 flex items-center justify-center text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors">
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
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { CapacitorBarcodeScanner } from '@capacitor/barcode-scanner';
import { useProducts } from '../composables/useProduct';
import { db } from '../database/db';
import dayjs from 'dayjs';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { saveAndSharePDF } from '../utils/pdfHandler';

const router = useRouter();
const { getProduct } = useProducts();

const barangDitemukan = ref([]);
const totalPenjualan = ref(0);
const totalKeuntungan = ref(0);
const totalHppKasir = ref(0); // Tambahan untuk melacak HPP transaksi

const mulaiScan = async () => {
    try {
        const result = await CapacitorBarcodeScanner.scanBarcode({
            hint: 17, cameraDirection: 1, scanOrientation: 1, android: { scanningLibrary: 'mlkit' }
        });

        if (result && result.ScanResult) {
            const scannedId = result.ScanResult;
            const produk = await getProduct(scannedId);

            if (produk) {
                barangDitemukan.value.push(produk);
                const modalHpp = Number(produk.hpp) || 0;
                totalPenjualan.value += Number(produk.harga);
                totalKeuntungan.value += (Number(produk.harga) - modalHpp);
                totalHppKasir.value += modalHpp;
            } else {
                alert(`Produk belum terdaftar.`);
                router.push({ path: '/input', query: { newId: scannedId } });
            }
        }
    } catch (error) {
        console.error('Scan dibatalkan:', error);
    }
};

const prosesPenjualan = async () => {
    if (barangDitemukan.value.length === 0) return;

    const tanggal = dayjs().format('YYYY-MM-DD HH:mm:ss');

    // 1. Simpan ke database
    try {
        await db.penjualan.add({
            tanggal: tanggal,
            totalPenjualan: totalPenjualan.value,
            totalHpp: totalHppKasir.value,
            items: JSON.parse(JSON.stringify(barangDitemukan.value)) // Clone array
        });

        // 2. Buat Nota PDF
        await cetakNota(tanggal);

        // 3. Reset kasir
        resetTotal();
        alert('Penjualan berhasil dicatat dan nota siap!');
    } catch (error) {
        console.error('Gagal menyimpan penjualan:', error);
        alert('Terjadi kesalahan saat memproses penjualan.');
    }
};

const cetakNota = async (tanggal) => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Nota Penjualan - Smart Inventory", 14, 22);

    doc.setFontSize(11);
    doc.text(`Tanggal: ${tanggal}`, 14, 30);

    const tableData = barangDitemukan.value.map((p, index) => [
        index + 1,
        p.nama,
        `Rp ${Number(p.harga).toLocaleString('id-ID')}`
    ]);

    doc.autoTable({
        startY: 35,
        head: [['No', 'Nama Produk', 'Harga']],
        body: tableData,
        foot: [['', 'TOTAL', `Rp ${totalPenjualan.value.toLocaleString('id-ID')}`]],
        theme: 'striped'
    });

    await saveAndSharePDF(doc, `Nota_${dayjs().format('YYYYMMDD_HHmmss')}.pdf`);
};

const resetTotal = () => {
    totalPenjualan.value = 0;
    totalKeuntungan.value = 0;
    totalHppKasir.value = 0;
    barangDitemukan.value = [];
};
</script>