<template>
    <div class="p-4 bg-gray-50 min-h-screen pb-20">
        <div class="mb-6">
            <h1 class="text-2xl font-bold text-gray-800">Panduan Aplikasi</h1>
            <p class="text-sm text-gray-500 mt-1">Definisi dan istilah seputar keuangan bisnis.</p>
        </div>

        <!-- Dropdown / Accordion List -->
        <div class="space-y-3">
            <div v-for="(item, index) in guides" :key="index"
                class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <button @click="toggle(index)"
                    class="w-full flex justify-between items-center p-4 text-left focus:outline-none transition-colors hover:bg-gray-50">
                    <span class="font-semibold text-gray-700">{{ item.title }}</span>
                    <!-- Ikon Panah -->
                    <svg :class="{ 'rotate-180': item.isOpen }"
                        class="w-5 h-5 text-gray-400 transition-transform duration-300" fill="none"
                        stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </button>

                <!-- Isi Definisi -->
                <transition enter-active-class="transition-[max-height,opacity] duration-300 ease-in-out"
                    leave-active-class="transition-[max-height,opacity] duration-300 ease-in-out">
                    <div v-show="item.isOpen"
                        class="p-4 text-sm text-gray-600 bg-blue-50/30 border-t border-gray-100 leading-relaxed">
                        {{ item.content }}
                    </div>
                </transition>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const guides = ref([
    {
        title: 'HPP (Harga Pokok Penjualan)',
        content: 'HPP adalah total keseluruhan biaya yang dikeluarkan secara langsung oleh bisnis untuk memproduksi barang atau jasa yang dijual. Ini biasanya mencakup biaya bahan baku dan biaya operasinal pembuatan produk.',
        isOpen: false
    },
    {
        title: 'Biaya Pemasaran',
        content: 'Semua biaya yang dikeluarkan untuk tujuan mempromosikan, mengiklankan, dan mendistribusikan produk atau layanan kepada pelanggan. Contohnya termasuk iklan media sosial, cetak brosur, dan komisi penjualan.',
        isOpen: false
    },
    {
        title: 'Biaya Admin',
        content: 'Biaya yang berkaitan dengan manajemen dan administrasi bisnis sehari-hari. Contoh pengeluaran ini meliputi gaji staf admin, alat tulis kantor (ATK), biaya internet, dan biaya administrasi bank.',
        isOpen: false
    },
    {
        title: 'Biaya Sewa',
        content: 'Biaya tetap yang dibayarkan secara berkala untuk penggunaan properti atau fasilitas fisik. Contohnya adalah biaya sewa ruko, gudang, kantor, atau peralatan untuk kegiatan usaha.',
        isOpen: false
    },
    {
        title: 'Biaya Lain-lain',
        content: 'Pengeluaran insidental, tak terduga, atau biaya bernilai kecil yang tidak dapat diklasifikasikan secara spesifik ke dalam kategori biaya utama (Pemasaran, Admin, atau Sewa).',
        isOpen: false
    },
    {
        title: 'Laporan Laba Rugi',
        content: 'Laporan keuangan yang menyajikan ringkasan pendapatan, biaya, dan pengeluaran perusahaan dalam suatu periode tertentu. Laporan ini berfungsi untuk menunjukkan apakah bisnis Anda sedang menghasilkan keuntungan (laba) atau mengalami kerugian.',
        isOpen: false
    }
]);

// Fungsi untuk membuka/menutup dropdown accordion
const toggle = (index) => {
    guides.value.forEach((g, i) => { if (i !== index) g.isOpen = false });

    guides.value[index].isOpen = !guides.value[index].isOpen;
};
</script>