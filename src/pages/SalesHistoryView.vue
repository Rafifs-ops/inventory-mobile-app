<template>
    <div
        class="min-h-screen bg-gradient-to-br from-blue-800 to-blue-600 text-slate-900 pb-10 sm:py-12 flex flex-col items-center">
        <div class="w-full sm:max-w-3xl px-5 sm:px-0">
            <div
                class="pt-6 sm:pt-0 mb-6 sm:mb-8 text-center flex flex-col sm:flex-row sm:items-end justify-between gap-5 sm:gap-4">
                <div class="text-left sm:text-left">
                    <h2 class="text-2xl font-bold text-white tracking-tight">Riwayat Penjualan</h2>
                    <p class="text-sm text-white mt-1.5">Daftar transaksi penjualan yang telah selesai</p>
                </div>
            </div>

            <div class="space-y-8">
                <div v-if="riwayat.length === 0"
                    class="w-full px-6 py-16 text-center bg-white border-2 border-slate-200 border-dashed rounded-2xl sm:rounded-xl shadow-sm">
                    <svg class="mx-auto h-12 w-12 text-slate-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                        aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                    <h3 class="text-base font-bold text-slate-900 tracking-tight">Belum ada riwayat penjualan</h3>
                    <p class="mt-1.5 text-sm text-slate-500 max-w-sm mx-auto">Tidak ada riwayat penjualan yang terdaftar di
                        database
                        saat ini.</p>
                </div>

                <div v-else>
                    <div v-for="(items, month) in groupedRiwayat" :key="month" class="mb-8">
                        <h3 class="text-xl font-bold text-white mb-4 border-b border-blue-400/30 pb-2">{{ month }}</h3>
                        <div class="space-y-4">
                            <div v-for="item in items" :key="item.id"
                                class="bg-white p-5 rounded-2xl sm:rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col gap-4">
                                
                                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <div class="flex-1">
                                        <div class="flex items-center gap-3 mb-2">
                                            <span
                                                class="px-2.5 py-1 text-xs font-mono font-bold text-emerald-700 bg-emerald-100 rounded-md">ID:
                                                {{ item.id }}</span>
                                            <span class="text-sm font-medium text-slate-500">{{ item.tanggal }}</span>
                                        </div>
                                        <p class="text-lg font-bold text-slate-900 mb-1">Rp {{
                                            item.totalPenjualan.toLocaleString('id-ID') }}</p>
                                        <p class="text-sm text-slate-600">{{ item.items.length }} macam produk terjual</p>
                                    </div>
                                    <div class="flex flex-col sm:flex-row gap-2">
                                        <button @click="unduhPDF(item)"
                                            class="w-full sm:w-auto px-4 py-2 text-sm font-bold text-blue-700 bg-blue-50 border border-blue-200 rounded-xl hover:bg-blue-100 focus:outline-none transition-colors">
                                            Unduh Nota (PDF)
                                        </button>
                                        <button @click="hapusRiwayat(item.id)"
                                            class="w-full sm:w-auto px-4 py-2 text-sm font-bold text-red-700 bg-red-50 border border-red-200 rounded-xl hover:bg-red-100 focus:outline-none transition-colors">
                                            Hapus
                                        </button>
                                    </div>
                                </div>

                                <!-- Product Details -->
                                <div class="mt-2 border-t border-slate-100 pt-4">
                                    <h4 class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Detail Produk Terjual</h4>
                                    <div class="space-y-3">
                                        <div v-for="(prod, idx) in item.items" :key="idx" class="flex justify-between items-center text-sm">
                                            <div class="flex-1 pr-4">
                                                <p class="font-medium text-slate-800">{{ prod.nama }}</p>
                                                <p class="text-xs text-slate-500 mt-0.5">{{ prod.quantity }} x Rp {{ (prod.harga || 0).toLocaleString('id-ID') }}</p>
                                            </div>
                                            <div class="font-semibold text-slate-900 whitespace-nowrap">
                                                Rp {{ (prod.quantity * (prod.harga || 0)).toLocaleString('id-ID') }}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                <div class="py-6 sm:py-0 sm:mt-8 w-full sm:max-w-3xl flex justify-center">
                    <RouterLink to="/"
                        class="flex items-center px-4 py-2 text-sm font-medium text-white hover:text-slate-800 transition-colors rounded-lg bg-white/10 hover:bg-white/20">
                        <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Kembali ke Menu Utama
                    </RouterLink>
                </div>

            </div>
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
