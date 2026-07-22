<template>
    <!-- Latar Belakang Utama: Slate kebiruan (Tanpa Putih) -->
    <div class="min-h-screen bg-slate-200 flex flex-col font-sans selection:bg-amber-300 selection:text-amber-900">

        <!-- Bagian Header (Curved Bottom & Decorative Blur) -->
        <div
            class="px-6 pt-8 pb-8 bg-blue-600 rounded-b-[2.5rem] shadow-[0_15px_40px_-15px_rgba(37,99,235,0.6)] flex flex-col items-center relative overflow-hidden border-b border-blue-400/50">
            <!-- Dekorasi Abstrak -->
            <div class="absolute -top-12 -left-10 w-48 h-48 bg-blue-500 rounded-full blur-3xl opacity-70"></div>
            <div class="absolute top-10 -right-12 w-40 h-40 bg-cyan-600 rounded-full blur-3xl opacity-60"></div>

            <!-- Teks Header -->
            <div class="text-center z-10">
                <h2 class="text-3xl font-extrabold text-blue-100 tracking-tight drop-shadow-md">Riwayat Penjualan</h2>
                <div
                    class="mt-2 bg-blue-800/40 px-5 py-1.5 rounded-full border border-blue-300/30 backdrop-blur-md inline-block shadow-inner">
                    <p class="text-cyan-100 text-xs font-semibold tracking-wide">
                        Daftar Transaksi Selesai
                    </p>
                </div>
            </div>
        </div>

        <!-- Bagian Konten Utama -->
        <div class="flex-grow px-5 pt-6 pb-12 w-full max-w-xl mx-auto flex flex-col gap-6">

            <!-- Empty State (Bento Style) -->
            <div v-if="riwayat.length === 0"
                class="w-full p-8 text-center bg-amber-200/50 border-2 border-amber-400/50 border-dashed rounded-[2rem] shadow-sm flex flex-col items-center justify-center">
                <div
                    class="w-14 h-14 bg-amber-300/60 rounded-2xl flex items-center justify-center text-amber-700 mb-4 shadow-inner">
                    <svg class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                </div>
                <h3 class="text-base font-extrabold text-amber-950 tracking-tight">Belum ada riwayat penjualan</h3>
                <p class="mt-2 text-[11px] font-bold text-amber-800 leading-relaxed max-w-[250px]">
                    Tidak ada catatan transaksi yang terdaftar di database saat ini.
                </p>
            </div>

            <!-- List Data State -->
            <div v-else class="space-y-8">
                <!-- Grouping Berdasarkan Bulan -->
                <div v-for="(items, month) in groupedRiwayat" :key="month" class="flex flex-col gap-4">

                    <!-- Judul Bulan -->
                    <h3
                        class="text-sm font-extrabold text-slate-700 uppercase tracking-widest pl-3 border-l-4 border-amber-500 py-1">
                        {{ month }}
                    </h3>

                    <!-- Kartu Riwayat (Looping Item) - Tema Amber -->
                    <div v-for="item in items" :key="item.id"
                        class="relative bg-amber-200 p-5 sm:p-6 rounded-[2rem] shadow-sm border-2 border-amber-300/40 overflow-hidden flex flex-col transition-all hover:shadow-md hover:border-amber-400/60">

                        <!-- Dekorasi Abstrak di dalam Kartu -->
                        <div
                            class="absolute -right-12 -top-12 w-32 h-32 bg-amber-300 rounded-full opacity-40 pointer-events-none">
                        </div>

                        <!-- Header Kartu: ID & Tanggal -->
                        <div class="relative z-10 flex justify-between items-start mb-3">
                            <div class="flex flex-col gap-1.5">
                                <span
                                    class="w-max px-3 py-1 text-[10px] font-mono font-bold text-amber-900 uppercase tracking-wider bg-amber-400/40 rounded-lg shadow-inner border border-amber-400/30">
                                    ID: {{ item.id }}
                                </span>
                                <span class="text-[11px] font-bold text-amber-800 flex items-center gap-1">
                                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    {{ item.tanggal }}
                                </span>
                            </div>
                        </div>

                        <!-- Total Penjualan -->
                        <div class="relative z-10 mb-4">
                            <p class="text-[10px] font-bold text-amber-800 uppercase tracking-widest mb-0.5">Total
                                Penjualan</p>
                            <p class="text-2xl sm:text-3xl font-extrabold text-amber-950 tracking-tight drop-shadow-sm">
                                Rp {{ item.totalPenjualan.toLocaleString('id-ID') }}
                            </p>
                        </div>

                        <!-- Mini Bento: Detail Produk -->
                        <div
                            class="relative z-10 bg-amber-300/40 p-4 rounded-2xl shadow-inner backdrop-blur-sm border border-amber-300/50 mb-4">
                            <h4
                                class="text-[10px] font-bold text-amber-900 uppercase tracking-widest mb-3 border-b-2 border-dashed border-amber-400/40 pb-2 flex justify-between">
                                <span>Detail Produk Terjual</span>
                                <span class="bg-amber-400/60 px-2 py-0.5 rounded text-amber-950">{{ item.items.length }}
                                    Item</span>
                            </h4>

                            <div class="flex flex-col gap-3">
                                <div v-for="(prod, idx) in item.items" :key="idx"
                                    class="flex justify-between items-center">
                                    <div class="flex-1 pr-3">
                                        <p class="font-bold text-amber-950 text-sm leading-tight">{{ prod.nama }}</p>
                                        <p class="text-[10px] font-bold text-amber-800 mt-1">
                                            {{ prod.quantity }} x Rp {{ (prod.harga || 0).toLocaleString('id-ID') }}
                                        </p>
                                    </div>
                                    <div
                                        class="font-extrabold text-amber-950 text-sm whitespace-nowrap bg-amber-200/50 px-2.5 py-1 rounded-lg">
                                        Rp {{ (prod.quantity * (prod.harga || 0)).toLocaleString('id-ID') }}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Tombol Aksi (Unduh & Hapus) -->
                        <div class="relative z-10 flex gap-3 mt-auto">
                            <button @click="unduhPDF(item)"
                                class="flex-1 flex items-center justify-center gap-2 py-3.5 bg-amber-400 text-amber-950 text-xs font-bold rounded-2xl shadow-sm hover:bg-amber-500 active:scale-95 transition-all">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                Unduh Nota
                            </button>
                            <button @click="hapusRiwayat(item.id)" title="Hapus Riwayat"
                                class="w-12 flex items-center justify-center bg-rose-400/90 text-rose-50 rounded-2xl shadow-sm hover:bg-rose-500 active:scale-95 transition-all">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
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
import { ref, onMounted, computed } from 'vue';
import { RouterLink } from 'vue-router';
import { db } from '../database/db';
import { generateAndDownloadReceiptPDF } from '../utils/pdfHandler';
import { useToast } from '../composables/useToast';

const riwayat = ref([]);
const { showToast } = useToast();

const bulanIndo = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];

onMounted(async () => {
    await loadRiwayat();
});

const loadRiwayat = async () => {
    riwayat.value = await db.penjualan.orderBy('id').reverse().toArray();
};

const groupedRiwayat = computed(() => {
    const groups = {};
    riwayat.value.forEach(item => {
        let monthName = 'Tidak Diketahui';
        let year = '';
        if (item.tanggal) {
            // Asumsi format tanggal adalah YYYY-MM-DD HH:mm:ss
            const yyyy = item.tanggal.substring(0, 4);
            const mm = item.tanggal.substring(5, 7);
            const monthIdx = parseInt(mm, 10) - 1;
            if (monthIdx >= 0 && monthIdx < 12) {
                monthName = bulanIndo[monthIdx];
                year = yyyy;
            }
        }
        const key = `${monthName} ${year}`.trim();
        if (!groups[key]) groups[key] = [];
        groups[key].push(item);
    });
    return groups;
});

const hapusRiwayat = async (id) => {
    if (confirm('Apakah Anda yakin ingin menghapus riwayat penjualan ini?')) {
        try {
            await db.penjualan.delete(id);
            riwayat.value = riwayat.value.filter(item => item.id !== id);
            showToast('Riwayat penjualan berhasil dihapus', 'success');
        } catch (error) {
            console.error('Gagal menghapus riwayat:', error);
            showToast('Gagal menghapus riwayat penjualan', 'error');
        }
    }
};

const unduhPDF = async (transaksi) => {
    await generateAndDownloadReceiptPDF(transaksi);
};
</script>
