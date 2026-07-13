<template>
    <div class="flex flex-col min-h-screen bg-gradient-to-br from-blue-800 to-blue-600 font-sans text-slate-800">
        <main class="py-10 px-6 flex-grow flex flex-col items-center">
            <section class="flex flex-col items-center mb-8 w-full max-w-md">
                <div class="logo-placeholder relative mb-5">
                    <div class="absolute inset-0 bg-blue-600 blur-[20px] opacity-20 rounded-full"></div>
                    <img src="/icons/icon-128.webp" alt="App Logo"
                        class="relative w-[100px] h-[100px] rounded-2xl object-cover bg-white p-2 shadow-lg ring-1 ring-slate-900/5" />
                </div>
                <h1 class="m-0 text-3xl font-extrabold text-white tracking-tight">SmartPOS</h1>
                <span
                    class="mt-3 px-3 py-1 text-xs font-semibold text-blue-700 bg-blue-100 rounded-full shadow-sm">Versi
                    1.0.0</span>
            </section>

            <section class="text-center text-white text-[0.95rem] leading-relaxed mb-10 w-full max-w-md">
                <p>
                    Aplikasi manajemen inventaris yang dirancang untuk mempermudah pelacakan stok barang, perhitungan
                    HPP, serta pencatatan riwayat transaksi secara terpadu dan efisien.
                </p>
            </section>

            <section
                class="w-full max-w-md bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden mb-10">
                <ul class="list-none m-0 p-0">
                    <li @click="openLink('support')"
                        class="group flex justify-between items-center px-6 py-4 border-b border-slate-100 last:border-b-0 cursor-pointer transition-all duration-200 hover:bg-blue-50 active:bg-blue-100 border-l-4 border-transparent hover:border-l-blue-600">
                        <span class="text-slate-700 font-semibold group-hover:text-blue-900 transition-colors">Bantuan &
                            Dukungan</span>
                        <span class="text-2xl text-slate-300 group-hover:text-blue-500 transition-colors">&#8250;</span>
                    </li>
                    <li @click="openLink('privacy')"
                        class="group flex justify-between items-center px-6 py-4 border-b border-slate-100 last:border-b-0 cursor-pointer transition-all duration-200 hover:bg-blue-50 active:bg-blue-100 border-l-4 border-transparent hover:border-l-blue-600">
                        <span class="text-slate-700 font-semibold group-hover:text-blue-900 transition-colors">Kebijakan
                            Privasi</span>
                        <span class="text-2xl text-slate-300 group-hover:text-blue-500 transition-colors">&#8250;</span>
                    </li>
                    <li @click="openLink('terms')"
                        class="group flex justify-between items-center px-6 py-4 border-b border-slate-100 last:border-b-0 cursor-pointer transition-all duration-200 hover:bg-blue-50 active:bg-blue-100 border-l-4 border-transparent hover:border-l-blue-600">
                        <span class="text-slate-700 font-semibold group-hover:text-blue-900 transition-colors">Syarat &
                            Ketentuan</span>
                        <span class="text-2xl text-slate-300 group-hover:text-blue-500 transition-colors">&#8250;</span>
                    </li>
                </ul>
            </section>

            <footer class="text-center text-white text-xs mt-auto w-full max-w-md font-medium">
                <p class="my-1">&copy; {{ currentYear }} Rafi Febrian Suprapto.</p>
                <p class="my-1">Dibuat dengan <span class="text-red-500">❤️</span> di Indonesia</p>
            </footer>
        </main>

        <div v-if="isModalOpen"
            class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex justify-center items-center z-[1000] p-4 transition-opacity"
            @click="closeModal">
            <div class="bg-white rounded-2xl w-full max-w-[550px] max-h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-fade-in-up"
                @click.stop>

                <header class="flex justify-between items-center px-6 py-4 bg-blue-800 text-white shadow-md z-10">
                    <h3 class="m-0 text-lg font-bold tracking-wide">{{ modalType === 'privacy' ? 'Kebijakan Privasi' :
                        'Syarat & Ketentuan' }}</h3>
                    <button
                        class="bg-transparent border-none text-3xl text-blue-200 cursor-pointer p-0 leading-none hover:text-white transition-colors focus:outline-none"
                        @click="closeModal">&times;</button>
                </header>

                <div class="p-6 overflow-y-auto text-sm text-slate-600 leading-relaxed custom-scrollbar">
                    <template v-if="modalType === 'privacy'">
                        <div
                            class="bg-blue-50 text-blue-800 px-4 py-3 rounded-lg font-medium mb-6 border border-blue-100">
                            Terakhir Diperbarui: 8 Juli 2026
                        </div>

                        <h4 class="mt-6 mb-2 text-base text-blue-900 font-bold border-b border-slate-100 pb-2">1.
                            Pendahuluan</h4>
                        <p class="mb-4">Kami sebagai <i>developer</i> aplikasi ini menghormati privasi Anda dan
                            berkomitmen untuk melindunginya melalui kepatuhan kami terhadap kebijakan ini. Kebijakan
                            Privasi ini menjelaskan jenis informasi yang mungkin kami kumpulkan dari Anda atau yang
                            mungkin Anda berikan saat menggunakan aplikasi SmartPOS ("Aplikasi") dan praktik kami dalam
                            mengumpulkan, menggunakan, memelihara, dan melindungi informasi tersebut.</p>

                        <h4 class="mt-6 mb-2 text-base text-blue-900 font-bold border-b border-slate-100 pb-2">2.
                            Informasi yang Kami Kumpulkan dan Cara Pengumpulannya</h4>
                        <p class="mb-3">Aplikasi kami dirancang untuk berfungsi secara maksimal di perangkat Anda.
                            Informasi yang kami proses meliputi:</p>
                        <ul class="mb-4 pl-5 list-disc space-y-2 marker:text-blue-500">
                            <li><strong class="text-slate-800">Data Inventaris dan Transaksi:</strong> Data barang,
                                stok, Harga Pokok Penjualan (HPP), dan riwayat penjualan yang Anda masukkan. <strong
                                    class="text-blue-700">Catatan Penting:</strong> Data ini disimpan secara lokal di
                                dalam perangkat Anda. Kami tidak mengunggah, menyalin, atau menyimpan data bisnis Anda
                                di server kami.</li>
                            <li><strong class="text-slate-800">Akses Kamera:</strong> Aplikasi memerlukan izin akses
                                kamera pada perangkat Anda semata-mata untuk fitur Scan Barcode barang. Kami tidak
                                merekam, menyimpan, atau mengirimkan gambar atau video apa pun ke luar perangkat Anda.
                            </li>
                            <li><strong class="text-slate-800">Penyimpanan Perangkat:</strong> Aplikasi mungkin
                                memerlukan izin akses penyimpanan untuk mengekspor data (seperti PDF struk atau laporan
                                Excel).</li>
                        </ul>

                        <h4 class="mt-6 mb-2 text-base text-blue-900 font-bold border-b border-slate-100 pb-2">3.
                            Bagaimana Kami Menggunakan Informasi Anda</h4>
                        <p class="mb-3">Kami menggunakan informasi yang ada di dalam Aplikasi semata-mata untuk:</p>
                        <ul class="mb-4 pl-5 list-disc space-y-2 marker:text-blue-500">
                            <li>Menyediakan fitur dan fungsionalitas Aplikasi kepada Anda (pencatatan stok, perhitungan
                                biaya, dll).</li>
                            <li>Menjalankan fungsi pemindaian barcode secara real-time.</li>
                        </ul>

                        <h4 class="mt-6 mb-2 text-base text-blue-900 font-bold border-b border-slate-100 pb-2">4.
                            Berbagi Informasi Anda</h4>
                        <p class="mb-4">Karena data Anda disimpan secara lokal di perangkat Anda, kami tidak menjual,
                            memperdagangkan, atau menyewakan informasi atau data bisnis pengguna kepada pihak ketiga.
                        </p>

                        <h4 class="mt-6 mb-2 text-base text-blue-900 font-bold border-b border-slate-100 pb-2">5.
                            Keamanan Data</h4>
                        <p class="mb-4">Keamanan data inventaris Anda bergantung pada keamanan perangkat seluler Anda.
                            Kami sangat menyarankan Anda untuk menggunakan fitur keamanan bawaan perangkat (seperti PIN,
                            sidik jari, atau password) dan secara rutin melakukan backup (pencadangan) data Anda jika
                            Aplikasi menyediakan fitur tersebut. Kami tidak bertanggung jawab atas kehilangan data yang
                            disebabkan oleh kerusakan perangkat atau penghapusan Aplikasi.</p>

                        <h4 class="mt-6 mb-2 text-base text-blue-900 font-bold border-b border-slate-100 pb-2">6.
                            Perubahan pada Kebijakan Privasi Kami</h4>
                        <p class="mb-4">Kami dapat memperbarui Kebijakan Privasi kami dari waktu ke waktu. Kami akan
                            memberi tahu Anda tentang perubahan apa pun dengan memposting Kebijakan Privasi yang baru di
                            halaman ini.</p>

                        <h4 class="mt-6 mb-2 text-base text-blue-900 font-bold border-b border-slate-100 pb-2">7.
                            Informasi Kontak</h4>
                        <p class="mb-4">Jika Anda memiliki pertanyaan atau komentar tentang Kebijakan Privasi ini,
                            silakan hubungi kami di: <a href="mailto:rafifebrians150206@gmail.com"
                                class="text-blue-600 font-semibold hover:underline">rafifebrians150206@gmail.com</a>.
                        </p>
                    </template>

                    <template v-else-if="modalType === 'terms'">
                        <div
                            class="bg-blue-50 text-blue-800 px-4 py-3 rounded-lg font-medium mb-6 border border-blue-100">
                            Terakhir Diperbarui: 8 Juli 2026
                        </div>

                        <h4 class="mt-6 mb-2 text-base text-blue-900 font-bold border-b border-slate-100 pb-2">1.
                            Penerimaan Syarat</h4>
                        <p class="mb-4">Dengan mengunduh, mengakses, atau menggunakan aplikasi SmartPOS ("Aplikasi"),
                            Anda setuju untuk terikat oleh Syarat dan Ketentuan ini. Jika Anda tidak setuju dengan
                            ketentuan ini, mohon untuk tidak menggunakan Aplikasi.</p>

                        <h4 class="mt-6 mb-2 text-base text-blue-900 font-bold border-b border-slate-100 pb-2">2.
                            Penggunaan Aplikasi</h4>
                        <p class="mb-4">Aplikasi ini disediakan untuk membantu Anda dalam manajemen inventaris,
                            pencatatan stok, perhitungan Harga Pokok Penjualan (HPP), dan pencetakan struk. Anda setuju
                            untuk menggunakan Aplikasi ini hanya untuk tujuan yang sah dan tidak melanggar hukum yang
                            berlaku di yurisdiksi Anda.</p>

                        <h4 class="mt-6 mb-2 text-base text-blue-900 font-bold border-b border-slate-100 pb-2">3.
                            Tanggung Jawab Pengguna dan Data</h4>
                        <ul class="mb-4 pl-5 list-disc space-y-2 marker:text-blue-500">
                            <li><strong class="text-slate-800">Akurasi Data:</strong> Anda bertanggung jawab penuh atas
                                keakuratan data barang, harga, dan perhitungan yang Anda masukkan ke dalam Aplikasi.
                            </li>
                            <li><strong class="text-slate-800">Kehilangan Data:</strong> Data yang Anda masukkan
                                disimpan secara lokal di perangkat Anda. Anda bertanggung jawab penuh untuk melakukan
                                pencadangan (backup) data Anda secara mandiri. Kami tidak bertanggung jawab atas
                                kehilangan data akibat uninstall Aplikasi, kerusakan perangkat, atau kelalaian pengguna.
                            </li>
                        </ul>

                        <h4 class="mt-6 mb-2 text-base text-blue-900 font-bold border-b border-slate-100 pb-2">4. Hak
                            Kekayaan Intelektual</h4>
                        <p class="mb-4">Aplikasi, termasuk namun tidak terbatas pada desain, kode sumber (source code),
                            logo, dan teks, adalah milik Rafi Febrian Suprapto sebagai developer, Windy Permata Suyono
                            sebagai product owner, dan dilindungi oleh hukum hak cipta dan
                            kekayaan intelektual. Anda tidak diperbolehkan untuk menyalin, memodifikasi,
                            mendistribusikan, atau merekayasa balik (reverse engineer) Aplikasi tanpa izin tertulis dari
                            kami.</p>

                        <h4 class="mt-6 mb-2 text-base text-blue-900 font-bold border-b border-slate-100 pb-2">5.
                            Penyangkalan Jaminan (Disclaimer of Warranties)</h4>
                        <p class="mb-4">Aplikasi ini disediakan "APA ADANYA" (as is) dan "SEBAGAIMANA TERSEDIA" (as
                            available). Kami tidak memberikan jaminan bahwa Aplikasi akan bebas dari bug, kesalahan
                            (error), atau gangguan. Kami tidak menjamin bahwa perhitungan finansial dalam aplikasi 100%
                            sempurna untuk kebutuhan akuntansi resmi; pengguna wajib memverifikasi laporannya sendiri.
                        </p>

                        <h4 class="mt-6 mb-2 text-base text-blue-900 font-bold border-b border-slate-100 pb-2">6.
                            Batasan Tanggung Jawab</h4>
                        <p class="mb-4">Sejauh diizinkan oleh hukum, developer dan product owner tidak akan bertanggung
                            jawab
                            atas kerusakan langsung, tidak langsung, insidental, atau konsekuensial, termasuk namun
                            tidak terbatas pada kerugian laba, kerugian bisnis, atau kehilangan data, yang timbul dari
                            penggunaan atau ketidakmampuan Anda menggunakan Aplikasi.</p>

                        <h4 class="mt-6 mb-2 text-base text-blue-900 font-bold border-b border-slate-100 pb-2">7.
                            Perubahan Syarat dan Ketentuan</h4>
                        <p class="mb-4">Kami berhak untuk mengubah atau memodifikasi Syarat dan Ketentuan ini kapan
                            saja. Terus menggunakan Aplikasi setelah adanya perubahan merupakan bentuk persetujuan Anda
                            terhadap syarat yang baru.</p>

                        <h4 class="mt-6 mb-2 text-base text-blue-900 font-bold border-b border-slate-100 pb-2">8. Kontak
                        </h4>
                        <p class="mb-4">Untuk pertanyaan terkait Syarat dan Ketentuan ini, silakan hubungi kami melalui:
                            <a href="mailto:rafifebrians150206@gmail.com"
                                class="text-blue-600 font-semibold hover:underline">rafifebrians150206@gmail.com</a>.
                        </p>
                    </template>
                </div>
            </div>
        </div>
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
        window.open('mailto:rafifebrians150206@gmail.com', '_blank')
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