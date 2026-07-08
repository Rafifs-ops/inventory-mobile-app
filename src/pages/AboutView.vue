<template>
    <div class="flex flex-col min-h-screen bg-gray-50 font-sans">
        <main class="py-8 px-6 flex-grow flex flex-col">
            <section class="flex flex-col items-center mb-8">
                <div class="logo-placeholder">
                    <img src="/icons/icon-128.webp" alt="App Logo" class="w-[90px] h-[90px] rounded-[20px] object-cover bg-gray-200 mb-4 shadow-md" />
                </div>
                <h1 class="m-0 text-2xl font-bold text-gray-900">SmartPOS</h1>
                <p class="mt-1 text-sm text-gray-500">Versi 1.0.0</p>
            </section>

            <section class="text-center text-gray-600 text-[0.95rem] leading-relaxed mb-10">
                <p>
                    Aplikasi manajemen inventaris yang dirancang untuk mempermudah pelacakan stok barang, perhitungan
                    HPP, serta pencatatan riwayat transaksi secara terpadu dan efisien.
                </p>
            </section>

            <section class="bg-white rounded-xl overflow-hidden shadow-sm mb-10">
                <ul class="list-none m-0 p-0">
                    <li @click="openLink('support')" class="flex justify-between items-center px-5 py-4 border-b border-gray-100 last:border-b-0 cursor-pointer text-gray-700 font-medium transition-colors duration-200 active:bg-gray-100">
                        <span>Bantuan & Dukungan</span>
                        <span class="text-xl text-gray-400">&#8250;</span>
                    </li>
                    <li @click="openLink('privacy')" class="flex justify-between items-center px-5 py-4 border-b border-gray-100 last:border-b-0 cursor-pointer text-gray-700 font-medium transition-colors duration-200 active:bg-gray-100">
                        <span>Kebijakan Privasi</span>
                        <span class="text-xl text-gray-400">&#8250;</span>
                    </li>
                    <li @click="openLink('terms')" class="flex justify-between items-center px-5 py-4 border-b border-gray-100 last:border-b-0 cursor-pointer text-gray-700 font-medium transition-colors duration-200 active:bg-gray-100">
                        <span>Syarat & Ketentuan</span>
                        <span class="text-xl text-gray-400">&#8250;</span>
                    </li>
                </ul>
            </section>

            <footer class="text-center text-gray-400 text-xs mt-auto">
                <p class="my-1">&copy; {{ currentYear }} Rafi Febrian Suprapto.</p>
                <p class="my-1">Dibuat dengan ❤️ di Indonesia</p>
            </footer>
        </main>

        <!-- Modal -->
        <div v-if="isModalOpen" class="fixed inset-0 bg-black/50 flex justify-center items-center z-[1000] p-4" @click="closeModal">
            <div class="bg-white rounded-xl w-full max-w-[500px] max-h-[80vh] flex flex-col shadow-lg" @click.stop>
                <header class="flex justify-between items-center px-6 py-4 border-b border-gray-200">
                    <h3 class="m-0 text-lg font-semibold text-gray-900">{{ modalType === 'privacy' ? 'Kebijakan Privasi' : 'Syarat & Ketentuan' }}</h3>
                    <button class="bg-transparent border-none text-2xl text-gray-500 cursor-pointer p-0 leading-none hover:text-gray-700" @click="closeModal">&times;</button>
                </header>
                <div class="p-6 overflow-y-auto text-sm text-gray-700 leading-relaxed">
                    <template v-if="modalType === 'privacy'">
                        <p class="mb-4"><strong>Terakhir Diperbarui: 8 Juli 2026</strong></p>
                        <h4 class="mt-5 mb-2 text-base text-gray-900 font-bold">1. Pendahuluan</h4>
                        <p class="mb-4">Kami sebagai <i>developer</i> aplikasi ini menghormati privasi Anda dan berkomitmen untuk
                            melindunginya melalui kepatuhan kami terhadap kebijakan ini. Kebijakan Privasi ini
                            menjelaskan jenis informasi yang mungkin kami kumpulkan dari Anda atau yang mungkin Anda
                            berikan saat menggunakan aplikasi SmartPOS ("Aplikasi") dan praktik kami dalam mengumpulkan,
                            menggunakan, memelihara, dan melindungi informasi tersebut.</p>

                        <h4 class="mt-5 mb-2 text-base text-gray-900 font-bold">2. Informasi yang Kami Kumpulkan dan Cara Pengumpulannya</h4>
                        <p class="mb-4">Aplikasi kami dirancang untuk berfungsi secara maksimal di perangkat Anda. Informasi yang
                            kami proses meliputi:</p>
                        <ul class="mb-4 pl-5 list-disc space-y-2">
                            <li><strong>Data Inventaris dan Transaksi:</strong> Data barang, stok, Harga Pokok Penjualan
                                (HPP), dan riwayat penjualan yang Anda masukkan. <strong>Catatan Penting:</strong> Data
                                ini disimpan secara lokal di dalam perangkat Anda. Kami tidak mengunggah, menyalin, atau
                                menyimpan data bisnis Anda di server kami.</li>
                            <li><strong>Akses Kamera:</strong> Aplikasi memerlukan izin akses kamera pada perangkat Anda
                                semata-mata untuk fitur Scan Barcode barang. Kami tidak merekam, menyimpan, atau
                                mengirimkan gambar atau video apa pun ke luar perangkat Anda.</li>
                            <li><strong>Penyimpanan Perangkat:</strong> Aplikasi mungkin memerlukan izin akses
                                penyimpanan untuk mengekspor data (seperti PDF struk atau laporan Excel).</li>
                        </ul>

                        <h4 class="mt-5 mb-2 text-base text-gray-900 font-bold">3. Bagaimana Kami Menggunakan Informasi Anda</h4>
                        <p class="mb-4">Kami menggunakan informasi yang ada di dalam Aplikasi semata-mata untuk:</p>
                        <ul class="mb-4 pl-5 list-disc space-y-2">
                            <li>Menyediakan fitur dan fungsionalitas Aplikasi kepada Anda (pencatatan stok, perhitungan
                                biaya, dll).</li>
                            <li>Menjalankan fungsi pemindaian barcode secara real-time.</li>
                        </ul>

                        <h4 class="mt-5 mb-2 text-base text-gray-900 font-bold">4. Berbagi Informasi Anda</h4>
                        <p class="mb-4">Karena data Anda disimpan secara lokal di perangkat Anda, kami tidak menjual,
                            memperdagangkan, atau menyewakan informasi atau data bisnis pengguna kepada pihak ketiga.
                        </p>

                        <h4 class="mt-5 mb-2 text-base text-gray-900 font-bold">5. Keamanan Data</h4>
                        <p class="mb-4">Keamanan data inventaris Anda bergantung pada keamanan perangkat seluler Anda. Kami sangat
                            menyarankan Anda untuk menggunakan fitur keamanan bawaan perangkat (seperti PIN, sidik jari,
                            atau password) dan secara rutin melakukan backup (pencadangan) data Anda jika Aplikasi
                            menyediakan fitur tersebut. Kami tidak bertanggung jawab atas kehilangan data yang
                            disebabkan oleh kerusakan perangkat atau penghapusan Aplikasi.</p>

                        <h4 class="mt-5 mb-2 text-base text-gray-900 font-bold">6. Perubahan pada Kebijakan Privasi Kami</h4>
                        <p class="mb-4">Kami dapat memperbarui Kebijakan Privasi kami dari waktu ke waktu. Kami akan memberi tahu
                            Anda tentang perubahan apa pun dengan memposting Kebijakan Privasi yang baru di halaman ini.
                        </p>

                        <h4 class="mt-5 mb-2 text-base text-gray-900 font-bold">7. Informasi Kontak</h4>
                        <p class="mb-4">Jika Anda memiliki pertanyaan atau komentar tentang Kebijakan Privasi ini, silakan hubungi
                            kami di: rafifebrians150206@gmail.com.</p>
                    </template>

                    <template v-else-if="modalType === 'terms'">
                        <p class="mb-4"><strong>Terakhir Diperbarui: 8 Juli 2026</strong></p>
                        <h4 class="mt-5 mb-2 text-base text-gray-900 font-bold">1. Penerimaan Syarat</h4>
                        <p class="mb-4">Dengan mengunduh, mengakses, atau menggunakan aplikasi SmartPOS ("Aplikasi"), Anda setuju
                            untuk terikat oleh Syarat dan Ketentuan ini. Jika Anda tidak setuju dengan ketentuan ini,
                            mohon untuk tidak menggunakan Aplikasi.</p>

                        <h4 class="mt-5 mb-2 text-base text-gray-900 font-bold">2. Penggunaan Aplikasi</h4>
                        <p class="mb-4">
                            Aplikasi ini disediakan untuk membantu Anda dalam manajemen inventaris, pencatatan stok,
                            perhitungan Harga Pokok Penjualan (HPP), dan pencetakan struk.
                            Anda setuju untuk menggunakan Aplikasi ini hanya untuk tujuan yang sah dan tidak
                            melanggar hukum yang berlaku di yurisdiksi Anda.
                        </p>

                        <h4 class="mt-5 mb-2 text-base text-gray-900 font-bold">3. Tanggung Jawab Pengguna dan Data</h4>
                        <ul class="mb-4 pl-5 list-disc space-y-2">
                            <li><strong>Akurasi Data:</strong> Anda bertanggung jawab penuh atas keakuratan data barang,
                                harga, dan perhitungan yang Anda masukkan ke dalam Aplikasi.</li>
                            <li><strong>Kehilangan Data:</strong> Data yang Anda masukkan disimpan secara lokal di
                                perangkat Anda. Anda bertanggung jawab penuh untuk melakukan pencadangan (backup) data
                                Anda secara mandiri. Kami tidak bertanggung jawab atas kehilangan data akibat uninstall
                                Aplikasi, kerusakan perangkat, atau kelalaian pengguna.</li>
                        </ul>

                        <h4 class="mt-5 mb-2 text-base text-gray-900 font-bold">4. Hak Kekayaan Intelektual</h4>
                        <p class="mb-4">Aplikasi, termasuk namun tidak terbatas pada desain, kode sumber (source code), logo, dan
                            teks, adalah milik Rafi Febrian Suprapto dan dilindungi oleh hukum hak cipta dan kekayaan
                            intelektual. Anda tidak diperbolehkan untuk menyalin, memodifikasi, mendistribusikan, atau
                            merekayasa balik (reverse engineer) Aplikasi tanpa izin tertulis dari kami.</p>

                        <h4 class="mt-5 mb-2 text-base text-gray-900 font-bold">5. Penyangkalan Jaminan (Disclaimer of Warranties)</h4>
                        <p class="mb-4">Aplikasi ini disediakan "APA ADANYA" (as is) dan "SEBAGAIMANA TERSEDIA" (as available). Kami
                            tidak memberikan jaminan bahwa Aplikasi akan bebas dari bug, kesalahan (error), atau
                            gangguan. Kami tidak menjamin bahwa perhitungan finansial dalam aplikasi 100% sempurna untuk
                            kebutuhan akuntansi resmi; pengguna wajib memverifikasi laporannya sendiri.</p>

                        <h4 class="mt-5 mb-2 text-base text-gray-900 font-bold">6. Batasan Tanggung Jawab</h4>
                        <p class="mb-4">Sejauh diizinkan oleh hukum, Rafi Febrian Suprapto tidak akan bertanggung jawab atas
                            kerusakan langsung, tidak langsung, insidental, atau konsekuensial, termasuk namun tidak
                            terbatas pada kerugian laba, kerugian bisnis, atau kehilangan data, yang timbul dari
                            penggunaan atau ketidakmampuan Anda menggunakan Aplikasi.</p>

                        <h4 class="mt-5 mb-2 text-base text-gray-900 font-bold">7. Perubahan Syarat dan Ketentuan</h4>
                        <p class="mb-4">Kami berhak untuk mengubah atau memodifikasi Syarat dan Ketentuan ini kapan saja. Terus
                            menggunakan Aplikasi setelah adanya perubahan merupakan bentuk persetujuan Anda terhadap
                            syarat yang baru.</p>

                        <h4 class="mt-5 mb-2 text-base text-gray-900 font-bold">8. Kontak</h4>
                        <p class="mb-4">Untuk pertanyaan terkait Syarat dan Ketentuan ini, silakan hubungi kami melalui:
                            rafifebrians150206@gmail.com.</p>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

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