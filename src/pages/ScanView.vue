<template>
    <div class="min-h-screen bg-white sm:bg-slate-50 text-slate-900 pb-10 sm:py-12 flex flex-col items-center">

        <div class="w-full sm:max-w-md px-5 sm:px-0">

            <div
                class="pt-6 sm:pt-0 mb-6 sm:mb-8 text-center sm:text-left border-b border-slate-100 sm:border-none pb-4 sm:pb-0">
                <h2 class="text-2xl font-bold text-slate-900 tracking-tight">Pemindaian Produk</h2>
                <p class="text-sm text-slate-500 mt-1.5">Sistem pencatatan kasir dan inventaris cepat</p>
            </div>

            <div class="grid grid-cols-2 gap-3 sm:gap-4 mb-6">
                <div
                    class="p-4 sm:p-5 bg-white border border-slate-200 rounded-2xl sm:rounded-xl shadow-sm flex flex-col justify-center">
                    <p class="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Penjualan</p>
                    <p class="mt-1.5 text-lg sm:text-xl font-bold text-slate-900 truncate tracking-tight">
                        Rp {{ totalPenjualan.toLocaleString('id-ID') }}
                    </p>
                </div>
                <div
                    class="p-4 sm:p-5 bg-emerald-50 sm:bg-emerald-50/80 border border-emerald-100 rounded-2xl sm:rounded-xl shadow-sm flex flex-col justify-center">
                    <p class="text-xs font-bold text-emerald-700 uppercase tracking-wider">Est. Keuntungan</p>
                    <p class="mt-1.5 text-lg sm:text-xl font-bold text-emerald-700 truncate tracking-tight">
                        Rp {{ totalKeuntungan.toLocaleString('id-ID') }}
                    </p>
                </div>
            </div>

            <button @click="mulaiScan"
                class="w-full flex items-center justify-center gap-2 py-4 sm:py-3.5 text-base sm:text-sm font-bold text-white transition-all bg-blue-600 border border-transparent rounded-2xl sm:rounded-xl shadow-md hover:bg-blue-700 hover:shadow-lg active:bg-blue-800 active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2">
                <svg class="w-6 h-6 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm14 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z">
                    </path>
                </svg>
                Mulai Pindai Barcode
            </button>

            <div v-if="barangDitemukan?.length > 0" class="mt-8">
                <div class="flex items-center justify-between mb-4 px-1 sm:px-0">
                    <h3 class="text-sm font-bold text-slate-800 uppercase tracking-wide">
                        Daftar Belanja
                    </h3>
                    <span class="px-2.5 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded-full">
                        {{ barangDitemukan.length }} Item
                    </span>
                </div>

                <div class="space-y-3 sm:space-y-2.5">
                    <div v-for="produk in barangDitemukan" :key="produk.id"
                        class="p-4 sm:p-5 bg-white border border-slate-200 rounded-2xl sm:rounded-xl shadow-sm hover:border-blue-300 transition-colors">

                        <div class="flex justify-between items-start gap-4">
                            <div class="flex-1">
                                <div class="flex items-center flex-wrap gap-2 mb-1.5">
                                    <h4 class="text-base font-bold text-slate-900 leading-tight">
                                        {{ produk.nama }}
                                        <span class="text-sm font-semibold text-blue-600 ml-1">x{{ produk.qty }}</span>
                                    </h4>
                                    <span
                                        class="px-2 py-0.5 text-[10px] font-bold text-emerald-700 bg-emerald-100 rounded-md uppercase tracking-wider">
                                        Berhasil
                                    </span>
                                </div>
                                <p class="text-sm font-bold text-slate-700">
                                    Rp {{ (produk.harga * produk.qty).toLocaleString('id-ID') }}
                                    <span class="text-xs text-slate-500 font-medium ml-1">
                                        (@Rp {{ produk.harga.toLocaleString('id-ID') }})
                                    </span>
                                </p>
                            </div>
                        </div>

                        <div
                            class="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-slate-100 flex justify-between items-center text-xs">
                            <span
                                class="text-slate-500 font-mono font-medium bg-slate-50 px-2 py-1 rounded-md border border-slate-200">
                                ID: {{ produk.id }}
                            </span>
                            <span
                                class="font-bold text-emerald-600 flex items-center gap-1.5 bg-emerald-50/50 px-2 py-1 rounded-md">
                                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                </svg>
                                Margin Rp {{ ((produk.harga - (produk.hpp || 0)) * produk.qty).toLocaleString('id-ID')
                                }}
                            </span>
                        </div>
                    </div>
                </div>

                <button @click="prosesPenjualan"
                    class="w-full py-4 sm:py-3.5 mt-6 text-base sm:text-sm font-bold text-white transition-all bg-emerald-600 border border-transparent rounded-2xl sm:rounded-xl shadow-md hover:bg-emerald-700 hover:shadow-lg active:bg-emerald-800 active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2">
                    Selesai Transaksi & Cetak Nota
                </button>
            </div>

            <div class="py-6 sm:py-0 sm:mt-8 w-full flex justify-center">
                <RouterLink to="/"
                    class="flex items-center px-4 py-2 text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors rounded-lg">
                    <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Kembali ke Menu Utama
                </RouterLink>
            </div>

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
import autoTable from 'jspdf-autotable';
import { saveAndSharePDF } from '../utils/pdfHandler';

const router = useRouter();
const { getProduct, decreaseProductStock } = useProducts();

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
                const existingItemIndex = barangDitemukan.value.findIndex(item => item.id === produk.id);
                if (existingItemIndex !== -1) {
                    barangDitemukan.value[existingItemIndex].qty += 1;
                } else {
                    produk.qty = 1;
                    barangDitemukan.value.push(produk);
                }

                const modalHpp = Number(produk.hpp) || 0;
                totalPenjualan.value += Number(produk.harga);
                totalKeuntungan.value += (Number(produk.harga) - modalHpp);
                totalHppKasir.value += modalHpp;
            } else {
                alert(`Produk belum terdaftar.`);
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

        // 3. Kurangi stok produk
        for (const item of barangDitemukan.value) {
            await decreaseProductStock(item.id, item.qty);
        }

        // 4. Reset kasir
        resetTotal();
        alert('Penjualan berhasil dicatat dan nota siap!');
    } catch (error) {
        console.error('Gagal menyimpan penjualan:', error);
        alert('Terjadi kesalahan saat memproses penjualan.' + ' ' + error);
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
        p.qty,
        `Rp ${Number(p.harga).toLocaleString('id-ID')}`,
        `Rp ${(Number(p.harga) * p.qty).toLocaleString('id-ID')}`
    ]);

    autoTable(doc, {
        startY: 35,
        head: [['No', 'Nama Produk', 'Qty', 'Harga', 'Subtotal']],
        body: tableData,
        foot: [['', 'TOTAL', '', '', `Rp ${totalPenjualan.value.toLocaleString('id-ID')}`]],
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