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
                    <div v-for="(produk, index) in barangDitemukan" :key="index"
                        class="p-4 sm:p-5 bg-white border border-slate-200 rounded-2xl sm:rounded-xl shadow-sm hover:border-blue-300 transition-colors">

                        <div class="flex justify-between items-start gap-4">
                            <div class="flex-1">
                                <div class="flex items-center flex-wrap gap-2 mb-1.5">
                                    <h4 class="text-base font-bold text-slate-900 leading-tight">
                                        {{ produk.nama }}
                                        <span class="text-sm font-semibold text-blue-600 ml-1">x{{ produk.quantity
                                        }}</span>
                                    </h4>
                                    <span
                                        class="px-2 py-0.5 text-[10px] font-bold text-emerald-700 bg-emerald-100 rounded-md uppercase tracking-wider">
                                        Berhasil
                                    </span>
                                </div>
                                <p class="text-sm font-bold text-slate-700">
                                    Rp {{ (produk.harga * produk.quantity).toLocaleString('id-ID') }}
                                    <span class="text-xs text-slate-500 font-medium ml-1">
                                        (@Rp {{ produk.harga.toLocaleString('id-ID') }})
                                    </span>
                                </p>
                            </div>
                        </div>

                        <div
                            class="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-slate-100 flex justify-between items-center text-xs">
                            <div class="flex gap-2">
                                <span
                                    class="text-slate-500 font-mono font-medium bg-slate-50 px-2 py-1 rounded-md border border-slate-200">
                                    ID: {{ produk.id }}
                                </span>
                                <button @click="hapusItem(index)"
                                    class="text-rose-600 bg-rose-50 px-2 py-1 rounded-md font-bold hover:bg-rose-100 mr-2">
                                    Batal
                                </button>
                            </div>

                            <span
                                class="font-bold text-emerald-600 flex items-center gap-1.5 bg-emerald-50/50 px-2 py-1 rounded-md">
                                Margin Rp {{ (((produk.harga - (produk.hpp || 0)) *
                                    produk.quantity)).toLocaleString('id-ID')
                                }}
                            </span>
                        </div>
                    </div>
                </div>

                <button @click="prosesPenjualan" :disabled="isProcessing"
                    class="w-full py-4 sm:py-3.5 mt-6 text-base sm:text-sm font-bold text-white transition-all bg-emerald-600 border border-transparent rounded-2xl sm:rounded-xl shadow-md hover:bg-emerald-700 hover:shadow-lg active:bg-emerald-800 active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2">
                    {{ isProcessing ? 'Memproses...' : 'Selesai Transaksi' }}
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
import { onBeforeRouteLeave } from 'vue-router';
import { CapacitorBarcodeScanner } from '@capacitor/barcode-scanner';
import { useProducts } from '../composables/useProduct';
import { db } from '../database/db';
import dayjs from 'dayjs';
import { useRouter } from 'vue-router';

const router = useRouter();
const { getProduct, decreaseProductStock } = useProducts();
const isProcessing = ref(false);

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

                // Cek jumlah barang yang sudah ada di keranjang
                const qtyDiKeranjang = existingItemIndex !== -1 ? barangDitemukan.value[existingItemIndex].quantity : 0;

                // VALIDASI STOK
                if (qtyDiKeranjang >= produk.quantity) {
                    alert(`Stok "${produk.nama}" tidak mencukupi! Sisa stok sistem: ${produk.quantity}`);
                    return; // Hentikan proses jika stok habis
                }

                if (existingItemIndex !== -1) {
                    barangDitemukan.value[existingItemIndex].quantity += 1;
                } else {
                    produk.quantity = 1; // inject quantity dari database menjadi quantity nota penjualan
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
    isProcessing.value = true;
    const tanggal = dayjs().format('YYYY-MM-DD HH:mm:ss');

    // 1. Simpan ke database
    try {
        const idTransaksi = await db.penjualan.add({
            tanggal: tanggal,
            totalPenjualan: totalPenjualan.value,
            totalHpp: totalHppKasir.value,
            items: JSON.parse(JSON.stringify(barangDitemukan.value)) // Clone array
        });

        // 2. Kurangi stok produk
        const updateStokPromises = barangDitemukan.value.map(item =>
            decreaseProductStock(item.id, item.quantity)
        );
        await Promise.all(updateStokPromises);

        // 3. Reset kasir dan alihkan ke halaman Receipt
        resetTotal();
        router.push({ path: '/receipt', query: { id: idTransaksi } });
    } catch (error) {
        console.error('Gagal menyimpan penjualan:', error);
        alert('Terjadi kesalahan saat memproses penjualan.' + ' ' + error);
        isProcessing.value = false;
    }
};

const resetTotal = () => {
    totalPenjualan.value = 0;
    totalKeuntungan.value = 0;
    totalHppKasir.value = 0;
    barangDitemukan.value = [];
};

const hapusItem = (index) => {
    const item = barangDitemukan.value[index];
    const modalHpp = Number(item.hpp) || 0;

    // Kurangi kalkulasi total
    totalPenjualan.value -= (item.harga * item.quantity);
    totalKeuntungan.value -= ((item.harga - modalHpp) * item.quantity);
    totalHppKasir.value -= (modalHpp * item.quantity);

    // Hapus dari keranjang
    barangDitemukan.value.splice(index, 1);
};

onBeforeRouteLeave((to, from, next) => {
    if (barangDitemukan.value.length > 0) {
        const konfirmasi = window.confirm(
            'Ada transaksi kasir yang belum diselesaikan! Apakah Anda yakin ingin keluar? Semua daftar belanja di keranjang akan terhapus.'
        );
        if (konfirmasi) {
            next(); // Izinkan pindah halaman
        } else {
            next(false); // Batalkan perpindahan halaman
        }
    } else {
        next(); // Langsung pindah jika keranjang kosong
    }
});
</script>