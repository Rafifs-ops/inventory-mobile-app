<template>
    <!-- Latar Belakang Utama: Slate kebiruan (Tanpa Putih) -->
    <div class="min-h-screen bg-slate-200 flex flex-col font-sans selection:bg-slate-300 selection:text-slate-900">

        <!-- Bagian Header (Curved Bottom & Decorative Blur) -->
        <div
            class="px-6 pt-12 pb-14 bg-blue-600 rounded-b-[2.5rem] shadow-[0_15px_40px_-15px_rgba(37,99,235,0.6)] flex flex-col items-center relative overflow-hidden border-b border-blue-400/50">
            <!-- Dekorasi Abstrak -->
            <div class="absolute -top-12 -left-10 w-48 h-48 bg-blue-500 rounded-full blur-3xl opacity-70"></div>
            <div class="absolute top-10 -right-12 w-40 h-40 bg-cyan-600 rounded-full blur-3xl opacity-60"></div>

            <!-- Teks Header & Logo -->
            <div class="text-center z-10 flex flex-col items-center mt-2">
                <!-- Frame Logo Estetik -->
                <div class="relative w-24 h-24 mb-4">
                    <div class="absolute inset-0 bg-blue-400 blur-xl opacity-50 rounded-full"></div>
                    <img src="/icons/icon-128.webp" alt="App Logo"
                        class="relative w-full h-full rounded-[1.5rem] object-cover bg-blue-800/40 p-2 shadow-inner border border-blue-300/40 backdrop-blur-md" />
                </div>

                <h1 class="m-0 text-3xl font-extrabold text-blue-100 tracking-tight drop-shadow-md">SmartPOS</h1>
                <span
                    class="mt-3 px-4 py-1.5 text-[10px] font-extrabold text-cyan-950 uppercase tracking-widest bg-cyan-300/80 rounded-lg shadow-inner border border-cyan-200/50">
                    Versi 1.0.1
                </span>
            </div>
        </div>

        <!-- Bagian Konten Utama -->
        <div class="flex-grow px-5 pt-6 pb-12 w-full max-w-xl mx-auto flex flex-col gap-4">

            <!-- Deskripsi Aplikasi (Mini Bento Box) -->
            <div
                class="bg-slate-300/60 rounded-[2rem] p-6 text-center shadow-inner border border-slate-400/40 backdrop-blur-sm">
                <p class="text-sm font-bold text-slate-700 leading-relaxed">
                    Aplikasi manajemen inventaris yang dirancang untuk mempermudah pelacakan stok barang, perhitungan
                    HPP, serta pencatatan riwayat transaksi secara terpadu dan efisien.
                </p>
            </div>

            <!-- Daftar Menu (Bento Card Group) -->
            <div
                class="bg-slate-300 rounded-[2rem] shadow-sm border-2 border-slate-400/40 overflow-hidden flex flex-col mt-2">

                <!-- Item Bantuan -->
                <button @click="openLink('support')"
                    class="group flex justify-between items-center px-6 py-5 border-b border-slate-400/30 hover:bg-slate-400/40 active:bg-slate-400/60 transition-colors focus:outline-none">
                    <div class="flex items-center gap-3">
                        <div
                            class="w-10 h-10 rounded-xl bg-slate-200/50 flex items-center justify-center text-slate-700 shadow-inner group-hover:bg-slate-400 group-hover:text-slate-900 transition-colors">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        </div>
                        <span class="font-extrabold text-slate-800 text-sm tracking-wide">Bantuan & Dukungan</span>
                    </div>
                    <span
                        class="w-8 h-8 flex items-center justify-center rounded-full bg-slate-200/50 text-slate-600 group-hover:bg-slate-400 group-hover:text-slate-900 transition-all">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
                        </svg>
                    </span>
                </button>

                <!-- Item Kebijakan Privasi -->
                <button @click="openLink('privacy')"
                    class="group flex justify-between items-center px-6 py-5 border-b border-slate-400/30 hover:bg-slate-400/40 active:bg-slate-400/60 transition-colors focus:outline-none">
                    <div class="flex items-center gap-3">
                        <div
                            class="w-10 h-10 rounded-xl bg-slate-200/50 flex items-center justify-center text-slate-700 shadow-inner group-hover:bg-slate-400 group-hover:text-slate-900 transition-colors">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                        </div>
                        <span class="font-extrabold text-slate-800 text-sm tracking-wide">Kebijakan Privasi</span>
                    </div>
                    <span
                        class="w-8 h-8 flex items-center justify-center rounded-full bg-slate-200/50 text-slate-600 group-hover:bg-slate-400 group-hover:text-slate-900 transition-all">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
                        </svg>
                    </span>
                </button>

                <!-- Item Syarat & Ketentuan -->
                <button @click="openLink('terms')"
                    class="group flex justify-between items-center px-6 py-5 hover:bg-slate-400/40 active:bg-slate-400/60 transition-colors focus:outline-none">
                    <div class="flex items-center gap-3">
                        <div
                            class="w-10 h-10 rounded-xl bg-slate-200/50 flex items-center justify-center text-slate-700 shadow-inner group-hover:bg-slate-400 group-hover:text-slate-900 transition-colors">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <span class="font-extrabold text-slate-800 text-sm tracking-wide">Syarat & Ketentuan</span>
                    </div>
                    <span
                        class="w-8 h-8 flex items-center justify-center rounded-full bg-slate-200/50 text-slate-600 group-hover:bg-slate-400 group-hover:text-slate-900 transition-all">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
                        </svg>
                    </span>
                </button>
            </div>

            <!-- Tombol Kembali Ke Beranda -->
            <RouterLink to="/"
                class="mt-2 py-4 px-6 rounded-full bg-slate-300 shadow-sm border border-slate-400/40 flex items-center justify-center text-sm font-bold text-slate-700 hover:bg-slate-400 hover:text-slate-900 active:scale-95 transition-all">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Kembali ke Menu Utama
            </RouterLink>

        </div>

        <!-- MODAL (Bento Style & Frosted Glass) -->
        <transition enter-active-class="transition-opacity duration-300"
            leave-active-class="transition-opacity duration-300" enter-from-class="opacity-0"
            enter-to-class="opacity-100" leave-from-class="opacity-100" leave-to-class="opacity-0">

            <div v-if="isModalOpen"
                class="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex justify-center items-center z-[1000] p-4"
                @click="closeModal">

                <div class="bg-slate-200 rounded-[2rem] w-full max-w-[550px] max-h-[85vh] flex flex-col shadow-2xl border-2 border-slate-300/60 overflow-hidden transform transition-all animate-fade-in-up relative"
                    @click.stop>

                    <!-- Dekorasi Lingkaran di dalam Modal -->
                    <div
                        class="absolute -right-16 -top-16 w-48 h-48 bg-slate-300 rounded-full opacity-50 pointer-events-none">
                    </div>

                    <!-- Header Modal -->
                    <header
                        class="flex justify-between items-center px-6 py-5 border-b-2 border-dashed border-slate-400/50 relative z-10">
                        <h3 class="m-0 text-lg font-extrabold text-slate-900 tracking-tight">
                            {{ modalType === 'privacy' ? 'Kebijakan Privasi' : 'Syarat & Ketentuan' }}
                        </h3>
                        <button
                            class="w-8 h-8 flex items-center justify-center bg-slate-300/80 rounded-xl text-slate-700 hover:bg-rose-300 hover:text-rose-950 transition-colors shadow-sm focus:outline-none"
                            @click="closeModal">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </header>

                    <!-- Isi Modal -->
                    <div
                        class="p-6 overflow-y-auto text-sm text-slate-700 leading-relaxed custom-scrollbar relative z-10">
                        <template v-if="modalType === 'privacy'">
                            <div
                                class="bg-slate-300/50 text-slate-900 px-4 py-3 rounded-[1rem] shadow-inner font-extrabold mb-6 border border-slate-400/40 text-[11px] uppercase tracking-widest text-center flex items-center justify-center gap-2">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                Terakhir Diperbarui: 8 Juli 2026
                            </div>

                            <h4
                                class="mt-6 mb-2 text-base text-slate-900 font-extrabold border-b-2 border-slate-300/50 pb-2">
                                1. Pendahuluan</h4>
                            <p class="mb-4">Kami sebagai <i class="font-semibold">developer</i> aplikasi ini menghormati
                                privasi Anda dan berkomitmen untuk melindunginya melalui kepatuhan kami terhadap
                                kebijakan ini. Kebijakan Privasi ini menjelaskan jenis informasi yang mungkin kami
                                kumpulkan dari Anda atau yang mungkin Anda berikan saat menggunakan aplikasi SmartPOS
                                ("Aplikasi") dan praktik kami dalam mengumpulkan, menggunakan, memelihara, dan
                                melindungi informasi tersebut.</p>

                            <h4
                                class="mt-6 mb-2 text-base text-slate-900 font-extrabold border-b-2 border-slate-300/50 pb-2">
                                2. Informasi yang Kami Kumpulkan</h4>
                            <p class="mb-3">Aplikasi kami dirancang untuk berfungsi secara maksimal di perangkat Anda.
                                Informasi yang kami proses meliputi:</p>
                            <ul class="mb-4 pl-5 list-none space-y-3">
                                <li
                                    class="relative before:content-[''] before:absolute before:-left-4 before:top-1.5 before:w-2 before:h-2 before:bg-slate-500 before:rounded-full">
                                    <strong class="text-slate-900">Data Inventaris dan Transaksi:</strong> Data barang,
                                    stok, Harga Pokok Penjualan (HPP), dan riwayat penjualan yang Anda masukkan.
                                    <span class="bg-slate-300/60 font-bold px-1 rounded block mt-1">Catatan
                                        Penting:</span> Data ini disimpan secara lokal di dalam perangkat Anda. Kami
                                    tidak mengunggah, menyalin, atau menyimpan data bisnis Anda di server kami.
                                </li>
                                <li
                                    class="relative before:content-[''] before:absolute before:-left-4 before:top-1.5 before:w-2 before:h-2 before:bg-slate-500 before:rounded-full">
                                    <strong class="text-slate-900">Akses Kamera:</strong> Aplikasi memerlukan izin akses
                                    kamera pada perangkat Anda semata-mata untuk fitur Scan Barcode barang. Kami tidak
                                    merekam, menyimpan, atau mengirimkan gambar atau video apa pun ke luar perangkat
                                    Anda.
                                </li>
                                <li
                                    class="relative before:content-[''] before:absolute before:-left-4 before:top-1.5 before:w-2 before:h-2 before:bg-slate-500 before:rounded-full">
                                    <strong class="text-slate-900">Penyimpanan Perangkat:</strong> Aplikasi mungkin
                                    memerlukan izin akses penyimpanan untuk mengekspor data (seperti PDF struk atau
                                    laporan Excel).
                                </li>
                            </ul>

                            <h4
                                class="mt-6 mb-2 text-base text-slate-900 font-extrabold border-b-2 border-slate-300/50 pb-2">
                                3. Penggunaan Informasi</h4>
                            <p class="mb-3">Kami menggunakan informasi yang ada di dalam Aplikasi semata-mata untuk:</p>
                            <ul class="mb-4 pl-5 list-disc space-y-1 marker:text-slate-500">
                                <li>Menyediakan fitur dan fungsionalitas Aplikasi kepada Anda (pencatatan stok,
                                    perhitungan biaya, dll).</li>
                                <li>Menjalankan fungsi pemindaian barcode secara real-time.</li>
                            </ul>

                            <h4
                                class="mt-6 mb-2 text-base text-slate-900 font-extrabold border-b-2 border-slate-300/50 pb-2">
                                4. Berbagi Informasi</h4>
                            <p class="mb-4">Karena data Anda disimpan secara lokal di perangkat Anda, kami tidak
                                menjual, memperdagangkan, atau menyewakan informasi atau data bisnis pengguna kepada
                                pihak ketiga.</p>

                            <h4
                                class="mt-6 mb-2 text-base text-slate-900 font-extrabold border-b-2 border-slate-300/50 pb-2">
                                5. Keamanan Data</h4>
                            <p class="mb-4">Keamanan data inventaris Anda bergantung pada keamanan perangkat seluler
                                Anda. Kami sangat menyarankan Anda untuk menggunakan fitur keamanan bawaan perangkat
                                (seperti PIN, sidik jari, atau password) dan secara rutin melakukan backup (pencadangan)
                                data Anda jika Aplikasi menyediakan fitur tersebut. Kami tidak bertanggung jawab atas
                                kehilangan data yang disebabkan oleh kerusakan perangkat atau penghapusan Aplikasi.</p>

                            <h4
                                class="mt-6 mb-2 text-base text-slate-900 font-extrabold border-b-2 border-slate-300/50 pb-2">
                                6. Informasi Kontak</h4>
                            <p class="mb-4">Jika Anda memiliki pertanyaan atau komentar tentang Kebijakan Privasi ini,
                                silakan hubungi kami di: <a href="mailto:windysuyono06@gmail.com"
                                    class="text-slate-900 font-extrabold hover:underline bg-slate-300/50 px-2 py-0.5 rounded ml-1 shadow-inner">windysuyono06@gmail.com</a>.
                            </p>
                        </template>

                        <template v-else-if="modalType === 'terms'">
                            <div
                                class="bg-slate-300/50 text-slate-900 px-4 py-3 rounded-[1rem] shadow-inner font-extrabold mb-6 border border-slate-400/40 text-[11px] uppercase tracking-widest text-center flex items-center justify-center gap-2">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                Terakhir Diperbarui: 8 Juli 2026
                            </div>

                            <h4
                                class="mt-6 mb-2 text-base text-slate-900 font-extrabold border-b-2 border-slate-300/50 pb-2">
                                1. Penerimaan Syarat</h4>
                            <p class="mb-4">Dengan mengunduh, mengakses, atau menggunakan aplikasi SmartPOS
                                ("Aplikasi"), Anda setuju untuk terikat oleh Syarat dan Ketentuan ini. Jika Anda tidak
                                setuju dengan ketentuan ini, mohon untuk tidak menggunakan Aplikasi.</p>

                            <h4
                                class="mt-6 mb-2 text-base text-slate-900 font-extrabold border-b-2 border-slate-300/50 pb-2">
                                2. Penggunaan Aplikasi</h4>
                            <p class="mb-4">Aplikasi ini disediakan untuk membantu Anda dalam manajemen inventaris,
                                pencatatan stok, perhitungan Harga Pokok Penjualan (HPP), dan pencetakan struk. Anda
                                setuju untuk menggunakan Aplikasi ini hanya untuk tujuan yang sah dan tidak melanggar
                                hukum yang berlaku di yurisdiksi Anda.</p>

                            <h4
                                class="mt-6 mb-2 text-base text-slate-900 font-extrabold border-b-2 border-slate-300/50 pb-2">
                                3. Tanggung Jawab Pengguna dan Data</h4>
                            <ul class="mb-4 pl-5 list-none space-y-3">
                                <li
                                    class="relative before:content-[''] before:absolute before:-left-4 before:top-1.5 before:w-2 before:h-2 before:bg-slate-500 before:rounded-full">
                                    <strong class="text-slate-900">Akurasi Data:</strong> Anda bertanggung jawab penuh
                                    atas keakuratan data barang, harga, dan perhitungan yang Anda masukkan ke dalam
                                    Aplikasi.
                                </li>
                                <li
                                    class="relative before:content-[''] before:absolute before:-left-4 before:top-1.5 before:w-2 before:h-2 before:bg-slate-500 before:rounded-full">
                                    <strong class="text-slate-900">Kehilangan Data:</strong> Data yang Anda masukkan
                                    disimpan secara lokal di perangkat Anda. Anda bertanggung jawab penuh untuk
                                    melakukan pencadangan (backup) data Anda secara mandiri. Kami tidak bertanggung
                                    jawab atas kehilangan data akibat uninstall Aplikasi, kerusakan perangkat, atau
                                    kelalaian pengguna.
                                </li>
                            </ul>

                            <h4
                                class="mt-6 mb-2 text-base text-slate-900 font-extrabold border-b-2 border-slate-300/50 pb-2">
                                4. Hak Kekayaan Intelektual</h4>
                            <p class="mb-4">Aplikasi, termasuk namun tidak terbatas pada desain, kode sumber (source
                                code), logo, dan teks, adalah milik Rafi Febrian Suprapto sebagai developer, Windy
                                Permata Suyono sebagai product owner, dan dilindungi oleh hukum hak cipta dan kekayaan
                                intelektual. Anda tidak diperbolehkan untuk menyalin, memodifikasi, mendistribusikan,
                                atau merekayasa balik (reverse engineer) Aplikasi tanpa izin tertulis dari kami.</p>

                            <h4
                                class="mt-6 mb-2 text-base text-slate-900 font-extrabold border-b-2 border-slate-300/50 pb-2">
                                5. Penyangkalan Jaminan</h4>
                            <p class="mb-4">Aplikasi ini disediakan "APA ADANYA" (as is) dan "SEBAGAIMANA TERSEDIA" (as
                                available). Kami tidak memberikan jaminan bahwa Aplikasi akan bebas dari bug, kesalahan
                                (error), atau gangguan. Kami tidak menjamin bahwa perhitungan finansial dalam aplikasi
                                100% sempurna untuk kebutuhan akuntansi resmi; pengguna wajib memverifikasi laporannya
                                sendiri.</p>

                            <h4
                                class="mt-6 mb-2 text-base text-slate-900 font-extrabold border-b-2 border-slate-300/50 pb-2">
                                6. Batasan Tanggung Jawab</h4>
                            <p class="mb-4">Sejauh diizinkan oleh hukum, developer dan product owner tidak akan
                                bertanggung jawab atas kerusakan langsung, tidak langsung, insidental, atau
                                konsekuensial, termasuk namun tidak terbatas pada kerugian laba, kerugian bisnis, atau
                                kehilangan data, yang timbul dari penggunaan atau ketidakmampuan Anda menggunakan
                                Aplikasi.</p>

                            <h4
                                class="mt-6 mb-2 text-base text-slate-900 font-extrabold border-b-2 border-slate-300/50 pb-2">
                                7. Kontak</h4>
                            <p class="mb-4">Untuk pertanyaan terkait Syarat dan Ketentuan ini, silakan hubungi kami
                                melalui: <a href="mailto:windysuyono06@gmail.com"
                                    class="text-slate-900 font-extrabold hover:underline bg-slate-300/50 px-2 py-0.5 rounded ml-1 shadow-inner">windysuyono06@gmail.com</a>.
                            </p>
                        </template>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<style scoped>
/* Opsional: Mempercantik scrollbar di dalam modal untuk desktop */
.custom-scrollbar::-webkit-scrollbar {
    width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
    background: #f1f5f9;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #94a3b8;
}

/* Animasi simpel saat modal terbuka */
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(10px) scale(0.98);
    }

    to {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
}

.animate-fade-in-up {
    animation: fadeInUp 0.3s ease-out forwards;
}
</style>

<script setup>
import { computed, ref } from 'vue'

const currentYear = computed(() => new Date().getFullYear())
const isModalOpen = ref(false)
const modalType = ref('')

// Fungsi simulasi untuk membuka tautan eksternal
const openLink = (type) => {
    if (type === 'support') {
        window.open('mailto:windysuyono06@gmail.com', '_blank')
    } else if (type === 'privacy') {
        modalType.value = 'privacy'
        isModalOpen.value = true
    } else if (type === 'terms') {
        modalType.value = 'terms'
        isModalOpen.value = true
    }
}

const closeModal = () => {
    isModalOpen.value = false
    modalType.value = ''
}
</script>