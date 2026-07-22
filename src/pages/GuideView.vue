<template>
    <!-- Latar Belakang Utama: Slate kebiruan (Tanpa Putih) -->
    <div class="min-h-screen bg-slate-200 flex flex-col font-sans selection:bg-cyan-300 selection:text-cyan-900">

        <!-- Bagian Header (Curved Bottom & Decorative Blur) -->
        <div
            class="px-6 pt-12 pb-14 bg-blue-600 rounded-b-[2.5rem] shadow-[0_15px_40px_-15px_rgba(37,99,235,0.6)] flex flex-col items-center relative overflow-hidden border-b border-blue-400/50">
            <!-- Dekorasi Abstrak -->
            <div class="absolute -top-12 -left-10 w-48 h-48 bg-blue-500 rounded-full blur-3xl opacity-70"></div>
            <div class="absolute top-10 -right-12 w-40 h-40 bg-cyan-600 rounded-full blur-3xl opacity-60"></div>

            <!-- Teks Header -->
            <div class="text-center z-10 flex flex-col items-center">
                <div
                    class="w-12 h-12 bg-blue-500/50 rounded-2xl border border-blue-400/50 flex items-center justify-center mb-3 shadow-inner">
                    <svg class="w-6 h-6 text-blue-100" fill="none" stroke="currentColor" stroke-width="2"
                        viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                </div>
                <h2 class="text-3xl font-extrabold text-blue-100 tracking-tight drop-shadow-md">Panduan Aplikasi</h2>
                <div
                    class="mt-2 bg-blue-800/40 px-5 py-1.5 rounded-full border border-blue-300/30 backdrop-blur-md shadow-inner">
                    <p class="text-cyan-100 text-xs font-semibold tracking-wide">
                        Kamus & Istilah Keuangan Bisnis
                    </p>
                </div>
            </div>
        </div>

        <!-- Bagian Konten Utama -->
        <div class="flex-grow px-5 pt-6 pb-12 w-full max-w-xl mx-auto flex flex-col gap-4">

            <!-- Daftar Accordion (Bento Card Item) -->
            <div class="flex flex-col gap-3">
                <div v-for="(item, index) in guides" :key="index"
                    class="relative bg-cyan-200 rounded-[1.5rem] shadow-sm border-2 overflow-hidden transition-all duration-300"
                    :class="item.isOpen ? 'border-cyan-400/60 shadow-md' : 'border-cyan-300/40 hover:border-cyan-400/60'">

                    <!-- Dekorasi Tipis di dalam Card -->
                    <div class="absolute -right-8 -bottom-8 w-24 h-24 bg-cyan-300 rounded-full opacity-30 pointer-events-none transition-transform duration-500"
                        :class="item.isOpen ? 'scale-150' : 'scale-100'"></div>

                    <!-- Header Tombol Accordion -->
                    <button @click="toggle(index)"
                        class="w-full relative z-10 flex justify-between items-center p-5 focus:outline-none">
                        <span class="font-extrabold text-cyan-950 text-left text-sm leading-tight pr-4">
                            {{ item.title }}
                        </span>
                        <!-- Ikon Indikator Buka/Tutup -->
                        <div class="shrink-0 w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300 shadow-inner"
                            :class="item.isOpen ? 'bg-cyan-500 text-cyan-50 rotate-180' : 'bg-cyan-300/50 text-cyan-800'">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"
                                    d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </button>

                    <!-- Isi Definisi -->
                    <transition
                        enter-active-class="transition-[max-height,opacity] duration-500 ease-in-out overflow-hidden"
                        leave-active-class="transition-[max-height,opacity] duration-300 ease-in-out overflow-hidden"
                        enter-from-class="max-h-0 opacity-0" enter-to-class="max-h-[500px] opacity-100"
                        leave-from-class="max-h-[500px] opacity-100" leave-to-class="max-h-0 opacity-0">
                        <div v-show="item.isOpen" class="relative z-10 px-5 pb-5 text-sm">
                            <div
                                class="pt-4 border-t-2 border-dashed border-cyan-400/40 text-cyan-900 font-medium leading-relaxed bg-cyan-300/20 p-4 rounded-xl backdrop-blur-sm shadow-inner">
                                {{ item.content }}
                            </div>
                        </div>
                    </transition>
                </div>
            </div>

            <!-- Tombol Kembali Ke Beranda -->
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
import { ref } from 'vue';

const guides = ref([
    {
        title: 'HPP (Harga Pokok Penjualan)',
        content: 'HPP adalah total keseluruhan biaya yang dikeluarkan secara langsung oleh bisnis untuk memproduksi barang atau jasa yang dijual. Ini biasanya mencakup biaya bahan baku dan biaya operasional pembuatan produk.',
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
        title: 'Biaya Listrik, Air, dan Internet',
        content: 'Biaya tagihan listrik, air, dan internet bulanan yang menunjang operasional bisnis Anda.',
        isOpen: false
    },
    {
        title: 'Biaya Perlengkapan',
        content: 'Pengeluaran untuk barang-barang pendukung usaha yang biasanya cepat habis terpakai, tapi bukan bahan baku utama produk. Contohnya kardus packaging, bubble wrap, kantong belanja, stiker, atau nota kasir.',
        isOpen: false
    },
    {
        title: 'Biaya Pajak',
        content: 'Kewajiban finansial yang harus disetorkan ke negara dari hasil usahamu. Untuk pengusaha atau UMKM, biasanya berupa Pajak Penghasilan (PPh) Final. Pastikan selalu disisihkan dari awal agar tidak mengganggu arus kas bisnis nanti.',
        isOpen: false
    },
    {
        title: 'Biaya Lain-lain',
        content: 'Pengeluaran insidental, tak terduga, atau biaya bernilai kecil yang tidak dapat diklasifikasikan secara spesifik ke dalam kategori biaya utama (Pemasaran, Admin, atau Sewa).',
        isOpen: false
    },
    {
        title: 'Pendapatan (Omset)',
        content: 'Total uang yang masuk dari hasil penjualan kamu sebelum dipotong biaya apa pun. Ibaratnya, ini adalah uang kotor yang masuk ke laci kasir atau rekening bisnis.',
        isOpen: false
    },
    {
        title: 'Laba Kotor (Gross Profit)',
        content: 'Keuntungan awal dari jualan Anda setelah dikurangi modal pembuatan atau pembelian barang (HPP). Keuntungan ini belum bersih karena belum dipotong pengeluaran lainnya seperti pemasaran, admin, dan lain-lain.',
        isOpen: false
    },
    {
        title: 'Laba Bersih (Net Profit)',
        content: 'Nah, ini dia cuan atau keuntungan murni yang benar-benar masuk kantong Anda! Angka ini didapat dari Laba Kotor yang sudah dikurangi dengan Total Biaya lainnya seperti pemasaran, admin, dan lain-lain.',
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