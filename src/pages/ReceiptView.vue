<template>
    <!-- Latar Belakang Utama: Slate kebiruan (Tanpa Putih) -->
    <div class="min-h-screen bg-slate-200 flex flex-col font-sans selection:bg-teal-300 selection:text-teal-900">

        <!-- Bagian Header (Curved Bottom & Decorative Blur) -->
        <div
            class="px-6 pt-12 pb-14 bg-blue-600 rounded-b-[2.5rem] shadow-[0_15px_40px_-15px_rgba(37,99,235,0.6)] flex flex-col items-center relative overflow-hidden border-b border-blue-400/50">
            <!-- Dekorasi Abstrak -->
            <div class="absolute -top-12 -left-10 w-48 h-48 bg-blue-500 rounded-full blur-3xl opacity-70"></div>
            <div class="absolute top-10 -right-12 w-40 h-40 bg-cyan-600 rounded-full blur-3xl opacity-60"></div>

            <!-- Teks Header & Success Icon -->
            <div class="text-center z-10 flex flex-col items-center">
                <div
                    class="relative w-16 h-16 bg-emerald-400/90 rounded-[1.5rem] border-2 border-emerald-300 flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(52,211,153,0.5)]">
                    <!-- Pinggiran Animasi -->
                    <div class="absolute inset-0 rounded-[1.5rem] border-2 border-emerald-200 animate-ping opacity-50">
                    </div>
                    <svg class="w-8 h-8 text-emerald-950 z-10" fill="none" stroke="currentColor" stroke-width="3"
                        viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h2 class="text-3xl font-extrabold text-blue-100 tracking-tight drop-shadow-md">Transaksi Berhasil!</h2>
                <div
                    class="mt-2 bg-blue-800/40 px-5 py-1.5 rounded-full border border-blue-300/30 backdrop-blur-md shadow-inner">
                    <p class="text-cyan-100 text-xs font-semibold tracking-wide">
                        Penjualan telah tersimpan di sistem
                    </p>
                </div>
            </div>
        </div>

        <!-- Bagian Konten Utama (Bento Grid) -->
        <div class="flex-grow px-5 pt-6 pb-12 w-full max-w-xl mx-auto flex flex-col gap-5">

            <!-- Card Nota / Receipt (Tema Teal-Emerald) -->
            <div
                class="relative bg-teal-200 p-6 sm:p-8 rounded-[2rem] shadow-sm border-2 border-teal-300/40 overflow-hidden flex flex-col gap-4">

                <!-- Lingkaran Dekoratif -->
                <div
                    class="absolute -right-16 -top-16 w-48 h-48 bg-teal-300 rounded-full opacity-40 pointer-events-none">
                </div>

                <!-- Header Nota -->
                <div
                    class="relative z-10 flex justify-between items-end border-b-2 border-dashed border-teal-400/50 pb-4">
                    <div>
                        <h3 class="text-[10px] font-extrabold text-teal-800 uppercase tracking-widest mb-1">Ringkasan
                            Nota</h3>
                        <span
                            class="text-xs font-mono font-bold text-teal-900 bg-teal-300/50 px-2.5 py-1 rounded-lg shadow-inner">
                            {{ transaksi?.tanggal }}
                        </span>
                    </div>
                    <div
                        class="w-10 h-10 bg-teal-300/60 rounded-xl flex items-center justify-center text-teal-800 shadow-inner">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </div>
                </div>

                <!-- Daftar Item Barang -->
                <div class="relative z-10 space-y-4 my-2">
                    <div v-for="(item, index) in transaksi?.items" :key="index"
                        class="flex justify-between items-center bg-teal-300/30 p-3 rounded-2xl border border-teal-300/50 backdrop-blur-sm">
                        <div class="pr-3">
                            <p class="font-extrabold text-teal-950 text-sm leading-tight">{{ item.nama }}</p>
                            <p class="text-[11px] font-bold text-teal-800 mt-0.5">
                                {{ item.quantity }} x Rp {{ Number(item.harga).toLocaleString('id-ID') }}
                            </p>
                        </div>
                        <div
                            class="font-extrabold text-teal-950 whitespace-nowrap bg-teal-200/50 px-2.5 py-1.5 rounded-xl shadow-inner">
                            Rp {{ (Number(item.harga) * item.quantity).toLocaleString('id-ID') }}
                        </div>
                    </div>
                </div>

                <!-- Total Penjualan -->
                <div
                    class="relative z-10 pt-4 border-t-2 border-dashed border-teal-400/50 flex justify-between items-center">
                    <p class="text-[11px] font-extrabold text-teal-900 uppercase tracking-widest">Total Penjualan</p>
                    <p class="text-2xl font-extrabold text-teal-950 tracking-tight drop-shadow-sm">
                        Rp {{ (transaksi?.totalPenjualan || 0).toLocaleString('id-ID') }}
                    </p>
                </div>

                <!-- QR Code (Menggunakan latar cerah tapi BUKAN putih, agar tetap bisa discan) -->
                <div
                    class="relative z-10 mt-4 flex flex-col items-center justify-center p-4 bg-teal-100 rounded-[1.5rem] shadow-inner border border-teal-200/80 mx-auto w-max">
                    <img :src="qrCodeBase64" alt="QR Code Nota"
                        :style="{ width: qrDisplaySize + 'px', height: qrDisplaySize + 'px' }"
                        class="object-contain mix-blend-multiply opacity-90" />
                    <span class="text-[9px] font-bold text-teal-800 uppercase tracking-widest mt-2">Scan QR Nota</span>
                </div>
            </div>

            <!-- Area Tombol Aksi -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                <!-- Tombol Unduh PDF (Tema Rose/Merah Estetik) -->
                <button @click="unduhPDF"
                    class="group relative flex items-center justify-center gap-2 p-4 rounded-[1.5rem] bg-rose-500 shadow-md hover:bg-rose-600 active:scale-95 transition-all duration-300 overflow-hidden">
                    <div
                        class="absolute -top-6 -right-6 w-20 h-20 bg-rose-400 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-500">
                    </div>
                    <svg class="w-5 h-5 text-rose-100 z-10 group-hover:-translate-y-1 transition-transform" fill="none"
                        stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    <span class="text-sm font-bold text-rose-50 z-10 tracking-wide">Unduh PDF</span>
                </button>

                <!-- Tombol Transaksi Baru (Tema Teal Utama) -->
                <RouterLink to="/scan"
                    class="group relative flex items-center justify-center gap-2 p-4 rounded-[1.5rem] bg-teal-600 shadow-md hover:bg-teal-700 active:scale-95 transition-all duration-300 overflow-hidden">
                    <div
                        class="absolute -top-6 -right-6 w-20 h-20 bg-teal-500 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-500">
                    </div>
                    <svg class="w-5 h-5 text-teal-100 z-10 group-hover:rotate-90 transition-transform duration-300"
                        fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                    </svg>
                    <span class="text-sm font-bold text-teal-50 z-10 tracking-wide">Transaksi Baru</span>
                </RouterLink>
            </div>

            <!-- Tombol Kembali Ke Beranda -->
            <RouterLink to="/"
                class="mt-2 py-4 px-6 rounded-full bg-slate-300 shadow-sm border border-slate-400/40 flex items-center justify-center text-sm font-bold text-slate-700 hover:bg-slate-400 hover:text-slate-900 active:scale-95 transition-all">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Kembali ke Beranda
            </RouterLink>

        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { db } from '../database/db';
import { generateAndDownloadReceiptPDF } from '../utils/pdfHandler';
import QRCode from 'qrcode'; // <--- Import di sini
import { useToast } from '../composables/useToast';

const route = useRoute();
const router = useRouter();
const { showToast } = useToast();
const transaksi = ref(null);

const qrCodeBase64 = ref(null);

const qrDisplaySize = computed(() => {
    const baseSize = 160; // Ukuran dasar (w-40 h-40 = 160px)
    const itemCount = transaksi.value?.items?.length || 0;
    // Tambah 15px per jenis barang, maksimum 320px
    return Math.min(baseSize + (itemCount * 15), 320);
});

onMounted(async () => {
    const id = Number(route.query.id);
    if (id) {
        transaksi.value = await db.penjualan.get(id);
        // Generate QR Code di sini setelah data transaksi di-fetch
        if (transaksi.value && transaksi.value.tokenNota) {
            const urlTujuan = `https://rafifs-ops.github.io/note-viewer-smartpos/?t=${transaksi.value.tokenNota}`;
            qrCodeBase64.value = await QRCode.toDataURL(urlTujuan, { margin: 4, width: 500, errorCorrectionLevel: 'L', scale: 4 });
        }
    }
    if (!transaksi.value) {
        showToast("Data transaksi tidak ditemukan!", "error");
        router.replace('/');
    }
});

const unduhPDF = async () => {
    if (!transaksi.value) return;
    await generateAndDownloadReceiptPDF(transaksi.value, qrCodeBase64.value);
};
</script>
