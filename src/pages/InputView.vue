<template>
    <div class="min-h-screen bg-white sm:bg-slate-50 text-slate-900 flex flex-col sm:items-center sm:py-12">

        <div
            class="w-full sm:max-w-md bg-white sm:border sm:border-slate-200 sm:shadow-sm sm:rounded-2xl flex-grow sm:flex-grow-0 flex flex-col">

            <div class="px-5 pt-8 pb-6 sm:px-6 sm:pt-6 sm:pb-4 border-b border-slate-100 sm:border-none">
                <h2 class="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                    Registrasi Produk Baru
                </h2>
                <p class="text-sm text-slate-500 mt-1.5 leading-relaxed">
                    Masukkan data barang baru ke dalam sistem inventaris.
                </p>
            </div>

            <form @submit.prevent="simpanProduk" class="px-5 py-6 sm:px-6 space-y-5 sm:space-y-4 flex-grow">

                <div>
                    <label class="block mb-2 sm:mb-1.5 text-sm font-semibold text-slate-700">
                        ID Barcode / SKU <span class="text-red-600">*</span>
                    </label>
                    <div class="flex gap-2 sm:gap-2.5">
                        <input v-model="form.id" type="text" required placeholder="Ketik atau scan ID..."
                            class="flex-1 px-4 py-3 sm:py-2.5 text-base sm:text-sm text-slate-900 bg-slate-50 border border-slate-300 rounded-xl sm:rounded-lg font-mono focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-colors" />

                        <button type="button" @click="scanIdSaja" title="Scan Barcode"
                            class="flex items-center justify-center px-4 sm:px-3 bg-slate-50 border border-slate-300 text-slate-600 rounded-xl sm:rounded-lg shadow-sm hover:bg-slate-100 hover:text-blue-700 active:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors shrink-0">
                            <svg class="w-6 h-6 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm14 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z">
                                </path>
                            </svg>
                        </button>
                    </div>
                </div>

                <div>
                    <label class="block mb-2 sm:mb-1.5 text-sm font-semibold text-slate-700">
                        Nama Barang <span class="text-red-600">*</span>
                    </label>
                    <input v-model="form.nama" type="text" required placeholder="Contoh: Kopi Sachet Spesial"
                        class="w-full px-4 py-3 sm:py-2.5 text-base sm:text-sm text-slate-900 bg-slate-50 border border-slate-300 rounded-xl sm:rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-colors" />
                </div>

                <div>
                    <label class="block mb-2 sm:mb-1.5 text-sm font-semibold text-slate-700">
                        Harga Jual <span class="text-red-600">*</span>
                    </label>
                    <div class="relative">
                        <div class="absolute inset-y-0 left-0 flex items-center pl-4 sm:pl-3 pointer-events-none">
                            <span class="text-slate-500 text-base sm:text-sm font-medium">Rp</span>
                        </div>
                        <input v-model="form.harga" type="number" min="0" required placeholder="0"
                            class="w-full pl-12 sm:pl-10 pr-4 py-3 sm:py-2.5 text-base sm:text-sm text-slate-900 bg-slate-50 border border-slate-300 rounded-xl sm:rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-colors" />
                    </div>
                </div>

                <div>
                    <label class="block mb-2 sm:mb-1.5 text-sm font-semibold text-slate-700">
                        Harga Pokok Penjualan (HPP) <span class="text-red-600">*</span>
                    </label>
                    <div class="relative">
                        <div class="absolute inset-y-0 left-0 flex items-center pl-4 sm:pl-3 pointer-events-none">
                            <span class="text-slate-500 text-base sm:text-sm font-medium">Rp</span>
                        </div>
                        <input v-model="form.hpp" type="number" min="0" required placeholder="0"
                            class="w-full pl-12 sm:pl-10 pr-4 py-3 sm:py-2.5 text-base sm:text-sm text-slate-900 bg-slate-50 border border-slate-300 rounded-xl sm:rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-colors" />
                    </div>
                </div>

                <div>
                    <label class="block mb-2 sm:mb-1.5 text-sm font-semibold text-slate-700">
                        Quantity (Stok) <span class="text-red-600">*</span>
                    </label>
                    <input v-model="form.quantity" type="number" min="0" required placeholder="0"
                        class="w-full px-4 py-3 sm:py-2.5 text-base sm:text-sm text-slate-900 bg-slate-50 border border-slate-300 rounded-xl sm:rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-colors" />
                </div>

                <div class="pt-4 sm:pt-2 pb-6 sm:pb-0">
                    <button type="submit"
                        class="w-full py-3.5 sm:py-2.5 text-base sm:text-sm font-semibold text-white bg-blue-700 rounded-xl sm:rounded-lg shadow-sm hover:bg-blue-800 active:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 transition-colors">
                        Simpan Data Produk
                    </button>
                </div>
            </form>
        </div>

        <div class="py-6 sm:py-0 sm:mt-6 w-full sm:max-w-md flex justify-center bg-slate-50 sm:bg-transparent">
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
</template>

<script setup>
import { reactive, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { CapacitorBarcodeScanner } from '@capacitor/barcode-scanner';
import { useProducts } from '../composables/useProduct';

const route = useRoute();
const { addProduct } = useProducts();

const form = reactive({
    id: '',
    nama: '',
    hpp: '',
    harga: '',
    quantity: ''
});

// Menangkap ID jika user dialihkan dari halaman "Cek Produk" (ScanView.vue)
onMounted(() => {
    if (route.query.newId) {
        form.id = route.query.newId;
    }
});

// Fungsi untuk melakukan scan khusus mengisi kolom ID di form ini
const scanIdSaja = async () => {
    try {
        const result = await CapacitorBarcodeScanner.scanBarcode({
            hint: 17,
            cameraDirection: 1,
            scanOrientation: 1,
            android: { scanningLibrary: 'mlkit' }
        });

        if (result && result.ScanResult) {
            // Langsung masukkan hasil scan ke input ID
            form.id = result.ScanResult;
        }
    } catch (error) {
        console.error('Proses scan dibatalkan atau error:', error);
    }
};

// Fungsi menyimpan data
const simpanProduk = async () => {
    if (!form.id) {
        alert('ID Barcode tidak boleh kosong!');
        return;
    }

    try {
        // Tambahkan await di sini
        await addProduct({
            id: form.id,
            nama: form.nama,
            hpp: Number(form.hpp),
            harga: Number(form.harga),
            quantity: Number(form.quantity),
            createdAt: Date.now()
        });
        alert(`Barang ${form.nama} berhasil disimpan!`);
    } catch (error) {
        console.error('Gagal menyimpan produk:', error);
        alert('Gagal menyimpan produk!');
        return;
    } finally {
        form.id = '';
        form.nama = '';
        form.hpp = '';
        form.harga = '';
        form.quantity = '';
    };
}
</script>