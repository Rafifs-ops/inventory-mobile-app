<template>
    <div class="min-h-screen bg-gray-50 text-slate-800 p-6 flex flex-col items-center py-12">

        <div class="w-full max-w-md mb-6 text-center">
            <h2 class="text-2xl font-bold text-slate-800 tracking-tight">
                Registrasi Produk Baru
            </h2>
            <p class="text-sm text-slate-500 mt-1">
                Masukkan data barang baru ke dalam sistem inventaris
            </p>
        </div>

        <div class="w-full max-w-md bg-white border border-gray-200 shadow-sm rounded-xl overflow-hidden">
            <form @submit.prevent="simpanProduk" class="p-6 space-y-5">

                <div>
                    <label class="block mb-1.5 text-sm font-medium text-slate-700">
                        ID Barcode / SKU <span class="text-red-500">*</span>
                    </label>
                    <div class="flex gap-2">
                        <input v-model="form.id" type="text" required placeholder="Ketik atau scan ID..."
                            class="flex-1 p-2.5 text-slate-800 bg-white border border-gray-300 rounded-lg shadow-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow" />

                        <button type="button" @click="scanIdSaja" title="Scan Barcode"
                            class="flex items-center justify-center px-4 bg-slate-50 border border-gray-300 text-slate-600 rounded-lg shadow-sm hover:bg-slate-100 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm14 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z">
                                </path>
                            </svg>
                        </button>
                    </div>
                </div>

                <div>
                    <label class="block mb-1.5 text-sm font-medium text-slate-700">
                        Nama Barang <span class="text-red-500">*</span>
                    </label>
                    <input v-model="form.nama" type="text" required placeholder="Contoh: Kopi Sachet Spesial"
                        class="w-full p-2.5 text-slate-800 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow" />
                </div>

                <div>
                    <label class="block mb-1.5 text-sm font-medium text-slate-700">
                        Harga Jual <span class="text-red-500">*</span>
                    </label>
                    <div class="relative">
                        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <span class="text-slate-500 sm:text-sm">Rp</span>
                        </div>
                        <input v-model="form.harga" type="number" min="0" required placeholder="0"
                            class="w-full p-2.5 pl-10 text-slate-800 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow" />
                    </div>
                </div>

                <div>
                    <label class="block mb-1.5 text-sm font-medium text-slate-700">
                        Harga Pokok Penjualan (HPP) <span class="text-red-500">*</span>
                    </label>
                    <div class="relative">
                        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <span class="text-slate-500 sm:text-sm">Rp</span>
                        </div>
                        <input v-model="form.hpp" type="number" min="0" required placeholder="0"
                            class="w-full p-2.5 pl-10 text-slate-800 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow" />
                    </div>
                </div>

                <div>
                    <label class="block mb-1.5 text-sm font-medium text-slate-700">
                        Quantity (Stok) <span class="text-red-500">*</span>
                    </label>
                    <input v-model="form.quantity" type="number" min="0" required placeholder="0"
                        class="w-full p-2.5 text-slate-800 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow" />
                </div>

                <div class="pt-2">
                    <button type="submit"
                        class="w-full py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
                        Simpan Data Produk
                    </button>
                </div>
            </form>
        </div>

        <RouterLink to="/"
            class="mt-6 flex items-center justify-center text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors">
            <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Kembali ke Menu Utama
        </RouterLink>

    </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { CapacitorBarcodeScanner } from '@capacitor/barcode-scanner';
import { useProducts } from '../composables/useProduct';

const route = useRoute();
const router = useRouter();
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
            quantity: Number(form.quantity)
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