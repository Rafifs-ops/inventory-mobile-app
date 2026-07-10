<template>
    <div
        class="min-h-screen bg-gradient-to-br from-blue-800 to-blue-600 text-slate-900 pb-10 sm:py-12 flex flex-col items-center">

        <div class="w-full sm:max-w-md px-5 sm:px-0">

            <div
                class="pt-6 sm:pt-0 mb-6 sm:mb-8 text-center sm:text-left border-b border-slate-100 sm:border-none pb-4 sm:pb-0">
                <h2 class="text-2xl font-bold text-white tracking-tight">Pemindaian Produk</h2>
                <p class="text-sm text-white mt-1.5">Sistem pencatatan kasir dan inventaris cepat</p>
            </div>

            <ScanSummary :total-penjualan="totalPenjualan" :total-keuntungan="totalKeuntungan" />

            <ScanInput @scan="mulaiScan" @tambah-manual="tambahProdukKeKeranjang"
                @buka-pencarian="isSearchModalOpen = true" />

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
                    <CartItem v-for="(produk, index) in barangDitemukan" :key="index" :produk="produk"
                        @hapus="hapusItem(index)" />
                </div>

                <button @click="prosesPenjualan" :disabled="isProcessing"
                    class="w-full py-4 sm:py-3.5 mt-6 text-base sm:text-sm font-bold text-white transition-all bg-emerald-600 border border-transparent rounded-2xl sm:rounded-xl shadow-md hover:bg-emerald-700 hover:shadow-lg active:bg-emerald-800 active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2">
                    {{ isProcessing ? 'Memproses...' : 'Selesai Transaksi' }}
                </button>
            </div>

            <div class="py-6 sm:py-0 sm:mt-8 w-full flex justify-center">
                <RouterLink to="/"
                    class="flex items-center px-4 py-2 text-sm font-medium text-white hover:text-slate-800 transition-colors rounded-lg">
                    <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Kembali ke Menu Utama
                </RouterLink>
            </div>

        </div>

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