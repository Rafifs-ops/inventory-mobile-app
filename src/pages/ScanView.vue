<template>
    <!-- Latar Belakang Utama: Slate kebiruan (Tanpa Putih) -->
    <div class="min-h-screen bg-slate-200 flex flex-col font-sans selection:bg-teal-300 selection:text-teal-900">

        <!-- Bagian Header (Curved Bottom & Decorative Blur) -->
        <div
            class="px-6 pt-8 pb-8 bg-blue-600 rounded-b-[2.5rem] shadow-[0_15px_40px_-15px_rgba(37,99,235,0.6)] flex flex-col items-center relative overflow-hidden border-b border-blue-400/50">
            <!-- Dekorasi Abstrak -->
            <div class="absolute -top-12 -left-10 w-48 h-48 bg-blue-500 rounded-full blur-3xl opacity-70"></div>
            <div class="absolute top-10 -right-12 w-40 h-40 bg-cyan-600 rounded-full blur-3xl opacity-60"></div>

            <!-- Teks Header -->
            <div class="text-center z-10">
                <h2 class="text-3xl font-extrabold text-blue-100 tracking-tight drop-shadow-md">Kasir & Transaksi</h2>
                <div
                    class="mt-2 bg-blue-800/40 px-5 py-1.5 rounded-full border border-blue-300/30 backdrop-blur-md inline-block shadow-inner">
                    <p class="text-cyan-100 text-xs font-semibold tracking-wide">
                        Pemindaian & Pencatatan Cepat
                    </p>
                </div>
            </div>
        </div>

        <!-- Bagian Konten (Bento Grid - Tema Teal) -->
        <div class="flex-grow px-5 pt-6 pb-12 w-full max-w-xl mx-auto flex flex-col gap-4">

            <!-- Wrapper ScanSummary (Bento Card) -->
            <div
                class="bg-teal-200 rounded-[2rem] p-5 sm:p-6 shadow-sm border-2 border-teal-300/40 relative overflow-hidden">
                <div
                    class="absolute -right-12 -top-12 w-32 h-32 bg-teal-300 rounded-full opacity-40 pointer-events-none">
                </div>
                <ScanSummary :total-penjualan="totalPenjualan" :total-keuntungan="totalKeuntungan"
                    class="relative z-10" />
            </div>

            <!-- Wrapper ScanInput (Bento Card) -->
            <div
                class="bg-teal-200 rounded-[2rem] p-5 sm:p-6 shadow-sm border-2 border-teal-300/40 relative overflow-hidden">
                <div
                    class="absolute -left-12 -bottom-12 w-32 h-32 bg-teal-300 rounded-full opacity-30 pointer-events-none">
                </div>
                <ScanInput @scan="mulaiScan" @tambah-manual="tambahProdukKeKeranjang"
                    @buka-pencarian="isSearchModalOpen = true" class="relative z-10" />
            </div>

            <!-- Daftar Belanja (Keranjang) -->
            <div v-if="barangDitemukan?.length > 0"
                class="bg-teal-200 rounded-[2rem] p-5 sm:p-6 shadow-sm border-2 border-teal-300/40 relative overflow-hidden flex flex-col gap-4 transition-all mt-2">

                <!-- Dekorasi -->
                <div
                    class="absolute -right-10 -bottom-10 w-40 h-40 bg-teal-300 rounded-full opacity-30 pointer-events-none">
                </div>

                <!-- Header Keranjang -->
                <div
                    class="relative z-10 flex items-center justify-between border-b-2 border-dashed border-teal-300/60 pb-3">
                    <h3
                        class="text-[12px] font-extrabold text-teal-900 uppercase tracking-widest flex items-center gap-2">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        Daftar Belanja
                    </h3>
                    <span
                        class="px-3 py-1 bg-teal-400/50 text-teal-950 text-[10px] font-bold uppercase tracking-wider rounded-lg shadow-inner border border-teal-400/30">
                        {{ barangDitemukan.length }} Item
                    </span>
                </div>

                <!-- List Produk -->
                <div class="relative z-10 space-y-3">
                    <CartItem v-for="(produk, index) in barangDitemukan.slice().reverse()" :key="index" :produk="produk"
                        @hapus="hapusItem(index)" />
                </div>

                <!-- Tombol Proses Penjualan -->
                <div class="relative z-10 mt-2">
                    <button @click="prosesPenjualan" :disabled="isProcessing"
                        class="group relative w-full flex items-center justify-center p-4 rounded-[1.5rem] bg-teal-600 shadow-md hover:bg-teal-700 active:scale-95 transition-all duration-300 overflow-hidden disabled:opacity-70 disabled:active:scale-100 disabled:hover:bg-teal-600">
                        <!-- Animasi Hover Bulat -->
                        <div
                            class="absolute -top-6 -right-6 w-20 h-20 bg-teal-500 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-500">
                        </div>

                        <span class="text-sm font-bold text-teal-50 z-10 tracking-wide">
                            {{ isProcessing ? 'Memproses Transaksi...' : 'Selesai Transaksi' }}
                        </span>

                        <!-- Icon Default -->
                        <svg v-if="!isProcessing"
                            class="w-5 h-5 ml-2 text-teal-100 z-10 group-hover:translate-x-1 transition-transform"
                            fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>

                        <!-- Icon Loading -->
                        <svg v-else class="w-5 h-5 ml-2 text-teal-100 z-10 animate-spin" fill="none"
                            viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4">
                            </circle>
                            <path class="opacity-75" fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                            </path>
                        </svg>
                    </button>
                </div>
            </div>

            <!-- Tombol Kembali -->
            <RouterLink to="/"
                class="mt-2 py-4 px-6 rounded-full bg-slate-300 shadow-sm border border-slate-400/40 flex items-center justify-center text-sm font-bold text-slate-700 hover:bg-slate-400 hover:text-slate-900 active:scale-95 transition-all">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Kembali ke Menu Utama
            </RouterLink>

        </div>

        <!-- Komponen Modal -->
        <ProductSearchModal :is-open="isSearchModalOpen" @close="isSearchModalOpen = false"
            @select="onProductSelected" />
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { onBeforeRouteLeave } from 'vue-router';
import { useProducts } from '../composables/useProduct';
import { useToast } from '../composables/useToast';
import { useScanCart } from '../composables/useScanCart';
import { db } from '../database/db';
import dayjs from 'dayjs';
import { useRouter } from 'vue-router';
import { SignJWT } from 'jose';

import ProductSearchModal from '../components/ProductSearchModal.vue';
import ScanSummary from '../components/ScanSummary.vue';
import ScanInput from '../components/ScanInput.vue';
import CartItem from '../components/CartItem.vue';

const router = useRouter();
const { decreaseProductStock } = useProducts();
const { showToast } = useToast();
const isProcessing = ref(false);

const {
    barangDitemukan,
    totalPenjualan,
    totalKeuntungan,
    totalHppKasir,
    tambahProdukKeKeranjang,
    mulaiScan,
    resetTotal,
    hapusItem
} = useScanCart();

const isSearchModalOpen = ref(false);

const onProductSelected = async (id) => {
    isSearchModalOpen.value = false;
    await tambahProdukKeKeranjang(id);
};

const prosesPenjualan = async () => {
    if (barangDitemukan.value.length === 0) return;
    isProcessing.value = true;
    const tanggal = dayjs().format('YYYY-MM-DD HH:mm:ss');

    try {
        const secret = new TextEncoder().encode('RAHASIA_NOTA_ANDA');
        const token = await new SignJWT({
            tanggal: tanggal,
            totalPenjualan: totalPenjualan.value,
            totalHpp: totalHppKasir.value,
            items: JSON.parse(JSON.stringify(barangDitemukan.value))
        })
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .sign(secret);

        const idTransaksi = await db.penjualan.add({
            tanggal: tanggal,
            totalPenjualan: totalPenjualan.value,
            totalHpp: totalHppKasir.value,
            items: JSON.parse(JSON.stringify(barangDitemukan.value)),
            tokenNota: token
        });

        const updateStokPromises = barangDitemukan.value.map(item =>
            decreaseProductStock(item.id, item.quantity)
        );
        await Promise.all(updateStokPromises);

        resetTotal();
        router.push({ path: '/receipt', query: { id: idTransaksi } });
    } catch (error) {
        console.error('Gagal menyimpan penjualan:', error);
        showToast('Terjadi kesalahan saat memproses penjualan. ' + error, 'error');
    } finally {
        isProcessing.value = false;
    }
};

onBeforeRouteLeave((to, from, next) => {
    if (barangDitemukan.value.length > 0) {
        const konfirmasi = window.confirm(
            'Ada transaksi kasir yang belum diselesaikan! Apakah Anda yakin ingin keluar? Semua daftar belanja di keranjang akan terhapus.'
        );
        if (konfirmasi) {
            next();
        } else {
            next(false);
        }
    } else {
        next();
    }
});
</script>