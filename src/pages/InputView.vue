<template>
    <!-- Latar Belakang Utama: Slate kebiruan (Tanpa Putih) -->
    <div class="min-h-screen bg-slate-200 flex flex-col font-sans selection:bg-purple-300 selection:text-purple-900">

        <!-- Bagian Header (Curved Bottom & Decorative Blur) -->
        <div
            class="px-6 pt-8 pb-8 bg-blue-600 rounded-b-[2.5rem] shadow-[0_15px_40px_-15px_rgba(37,99,235,0.6)] flex flex-col items-center relative overflow-hidden border-b border-blue-400/50">
            <!-- Dekorasi Abstrak -->
            <div class="absolute -top-12 -left-10 w-48 h-48 bg-blue-500 rounded-full blur-3xl opacity-70"></div>
            <div class="absolute top-10 -right-12 w-40 h-40 bg-cyan-600 rounded-full blur-3xl opacity-60"></div>

            <!-- Teks Header -->
            <div class="text-center z-10">
                <h2 class="text-3xl font-extrabold text-blue-100 tracking-tight drop-shadow-md">Catat Produk</h2>
                <div
                    class="mt-2 bg-blue-800/40 px-5 py-1.5 rounded-full border border-blue-300/30 backdrop-blur-md inline-block shadow-inner">
                    <p class="text-cyan-100 text-xs font-semibold tracking-wide">
                        Registrasi Data Barang Baru
                    </p>
                </div>
            </div>
        </div>

        <!-- Bagian Form (Bento Style Card - Tema Purple) -->
        <div class="flex-grow px-3 pt-6 pb-12 w-full max-w-xl mx-auto flex flex-col gap-4">

            <form @submit.prevent="simpanProduk"
                class="relative bg-purple-200 p-6 sm:p-8 rounded-[2rem] shadow-sm border-2 border-purple-300/40 overflow-hidden flex flex-col gap-5">

                <!-- Lingkaran Dekoratif di dalam Form -->
                <div
                    class="absolute -right-16 -top-16 w-48 h-48 bg-purple-300 rounded-full opacity-40 pointer-events-none">
                </div>
                <div
                    class="absolute -left-10 -bottom-10 w-32 h-32 bg-purple-300 rounded-full opacity-30 pointer-events-none">
                </div>

                <!-- ID Barcode / SKU -->
                <div class="relative z-10">
                    <label class="block mb-2 text-[11px] font-bold text-purple-900 uppercase tracking-widest pl-1">
                        ID Barcode / SKU <span class="text-purple-600">*</span>
                    </label>
                    <div class="flex gap-2">
                        <input v-model="form.id" type="text" required placeholder="Ketik atau scan ID..."
                            class="flex-1 px-5 py-3.5 text-purple-950 placeholder:text-purple-700/50 bg-purple-300/50 border border-purple-400/40 rounded-2xl shadow-inner font-mono focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all backdrop-blur-sm" />

                        <button type="button" @click="scanIdSaja" title="Scan Barcode"
                            class="flex items-center justify-center py-2 px-4 bg-purple-500 border border-purple-400/50 text-purple-50 rounded-2xl shadow-md hover:bg-purple-600 active:scale-95 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all shrink-0">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm14 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z">
                                </path>
                            </svg>
                        </button>
                    </div>
                </div>

                <!-- Nama Barang -->
                <div class="relative z-10">
                    <label class="block mb-2 text-[11px] font-bold text-purple-900 uppercase tracking-widest pl-1">
                        Nama Barang <span class="text-purple-600">*</span>
                    </label>
                    <input v-model="form.nama" type="text" required placeholder="Contoh: Kopi Sachet Spesial"
                        class="w-full px-5 py-3.5 text-purple-950 placeholder:text-purple-700/50 bg-purple-300/50 border border-purple-400/40 rounded-2xl shadow-inner focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all backdrop-blur-sm font-semibold" />
                </div>

                <!-- Harga Jual -->
                <div class="relative z-10">
                    <label class="block mb-2 text-[11px] font-bold text-purple-900 uppercase tracking-widest pl-1">
                        Harga Jual <span class="text-purple-600">*</span>
                    </label>
                    <div class="relative">
                        <div class="absolute inset-y-0 left-0 flex z-10 items-center pl-5 pointer-events-none">
                            <span class="text-purple-800/70 font-bold text-sm">Rp</span>
                        </div>
                        <input v-model="form.harga" type="number" min="0" required placeholder="0"
                            class="w-full pl-14 pr-5 py-3.5 text-purple-950 placeholder:text-purple-700/50 bg-purple-300/50 border border-purple-400/40 rounded-2xl shadow-inner focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all backdrop-blur-sm font-semibold" />
                    </div>
                </div>

                <!-- Harga Pokok Penjualan (HPP) -->
                <div class="relative z-10">
                    <label class="block mb-2 text-[11px] font-bold text-purple-900 uppercase tracking-widest pl-1">
                        Harga Pokok (HPP) <span class="text-purple-600">*</span>
                    </label>
                    <div class="relative">
                        <div class="absolute inset-y-0 left-0 z-10 flex items-center pl-5 pointer-events-none">
                            <span class="text-purple-800/70 font-bold text-sm">Rp</span>
                        </div>
                        <input v-model="form.hpp" type="number" min="0" required placeholder="0"
                            class="w-full pl-14 pr-5 py-3.5 text-purple-950 placeholder:text-purple-700/50 bg-purple-300/50 border border-purple-400/40 rounded-2xl shadow-inner focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all backdrop-blur-sm font-semibold" />
                    </div>
                </div>

                <!-- Quantity (Stok) -->
                <div class="relative z-10">
                    <label class="block mb-2 text-[11px] font-bold text-purple-900 uppercase tracking-widest pl-1">
                        Quantity (Stok) <span class="text-purple-600">*</span>
                    </label>
                    <div class="relative w-full sm:w-1/2">
                        <input v-model="form.quantity" type="number" min="0" required placeholder="0"
                            class="w-full pl-5 pr-16 py-3.5 text-purple-950 placeholder:text-purple-700/50 bg-purple-300/50 border border-purple-400/40 rounded-2xl shadow-inner focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all backdrop-blur-sm font-semibold" />
                        <div
                            class="absolute inset-y-0 right-0 flex items-center pr-5 pointer-events-none bg-purple-400/30 rounded-r-2xl border-l border-purple-400/30 px-3">
                            <span class="text-purple-800 font-bold text-xs uppercase tracking-wide">Pcs</span>
                        </div>
                    </div>
                </div>

                <!-- Tombol Submit Bento Style -->
                <div class="mt-3 relative z-10">
                    <button type="submit"
                        class="w-full group relative flex items-center justify-center p-4 rounded-[1.5rem] bg-purple-600 shadow-md hover:bg-purple-700 active:scale-95 transition-all duration-300 overflow-hidden">
                        <div
                            class="absolute -top-6 -right-6 w-20 h-20 bg-purple-500 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-500">
                        </div>
                        <span class="text-sm font-bold text-purple-50 z-10 tracking-wide">
                            Simpan Data Produk
                        </span>
                        <svg class="w-5 h-5 ml-2 text-purple-100 z-10 group-hover:translate-x-1 transition-transform"
                            fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                    </button>
                </div>
            </form>

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
    </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { CapacitorBarcodeScanner } from '@capacitor/barcode-scanner';
import { useProducts } from '../composables/useProduct';
import { useToast } from '../composables/useToast';

const route = useRoute();
const { addProduct, getProduct } = useProducts();
const { showToast } = useToast();

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
        showToast('ID Barcode tidak boleh kosong!', 'warning');
        return;
    }

    try {
        const produkSudahAda = await getProduct(form.id);
        if (produkSudahAda) {
            showToast(`Peringatan! Barcode ID ${form.id} sudah terdaftar atas nama "${produkSudahAda.nama}". Jika ingin menambah stok, silakan gunakan menu Daftar Inventaris.`, 'warning');
            return; // Hentikan eksekusi
        }

        // Tambahkan await di sini
        await addProduct({
            id: form.id,
            nama: form.nama,
            hpp: Number(form.hpp),
            harga: Number(form.harga),
            quantity: Number(form.quantity),
            createdAt: Date.now()
        });
        showToast(`Barang ${form.nama} berhasil disimpan!`, 'success');
    } catch (error) {
        console.error('Gagal menyimpan produk:', error);
        showToast('Gagal menyimpan produk!', 'error');
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