<template>
    <!-- Latar Belakang Utama: Slate kebiruan (Tanpa Putih) -->
    <div class="min-h-screen bg-slate-200 flex flex-col font-sans selection:bg-rose-300 selection:text-rose-900">

        <!-- Bagian Header (Curved Bottom & Decorative Blur) -->
        <div
            class="px-6 pt-8 pb-8 bg-blue-600 rounded-b-[2.5rem] shadow-[0_15px_40px_-15px_rgba(37,99,235,0.6)] flex flex-col items-center relative overflow-hidden border-b border-blue-400/50">
            <!-- Dekorasi Abstrak -->
            <div class="absolute -top-12 -left-10 w-48 h-48 bg-blue-500 rounded-full blur-3xl opacity-70"></div>
            <div class="absolute top-10 -right-12 w-40 h-40 bg-cyan-600 rounded-full blur-3xl opacity-60"></div>

            <!-- Teks Header -->
            <div class="text-center z-10">
                <h2 class="text-3xl font-extrabold text-blue-100 tracking-tight drop-shadow-md">Input Biaya</h2>
                <div
                    class="mt-2 bg-blue-800/40 px-5 py-1.5 rounded-full border border-blue-300/30 backdrop-blur-md inline-block">
                    <p class="text-cyan-100 text-xs font-semibold tracking-wide">
                        Pencatatan Pengeluaran Operasional
                    </p>
                </div>
            </div>
        </div>

        <!-- Bagian Form (Bento Style Card) -->
        <div class="flex-grow px-5 pt-6 pb-12 w-full max-w-xl mx-auto flex flex-col gap-4">

            <form @submit.prevent="simpanBiaya"
                class="relative bg-rose-200 p-6 sm:p-8 rounded-[2rem] shadow-sm border-2 border-rose-300/40 overflow-hidden flex flex-col gap-5">

                <!-- Lingkaran Dekoratif di dalam Form -->
                <div
                    class="absolute -right-16 -top-16 w-48 h-48 bg-rose-300 rounded-full opacity-40 pointer-events-none">
                </div>
                <div
                    class="absolute -left-10 -bottom-10 w-32 h-32 bg-rose-300 rounded-full opacity-30 pointer-events-none">
                </div>

                <!-- Kategori Pengeluaran -->
                <div class="relative z-10">
                    <label class="block mb-2 text-[11px] font-bold text-rose-900 uppercase tracking-widest pl-1">
                        Kategori Pengeluaran <span class="text-rose-600">*</span>
                    </label>
                    <div class="relative">
                        <select v-model="form.jenis" required
                            class="w-full px-5 py-3.5 text-rose-950 bg-rose-300/50 border border-rose-400/40 rounded-2xl shadow-inner focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all appearance-none backdrop-blur-sm">
                            <option value="" disabled selected class="bg-rose-200">Pilih Kategori...</option>
                            <option value="pemasaran" class="bg-rose-200">Biaya Pemasaran</option>
                            <option value="listrik_air_internet" class="bg-rose-200">Biaya Listrik, Air, dan Internet
                            </option>
                            <option value="perlengkapan" class="bg-rose-200">Biaya Perlengkapan</option>
                            <option value="admin" class="bg-rose-200">Biaya Admin</option>
                            <option value="pajak" class="bg-rose-200">Biaya Pajak</option>
                            <option value="sewa" class="bg-rose-200">Biaya Sewa</option>
                            <option value="lain_lain" class="bg-rose-200">Biaya Lain-lain</option>
                        </select>
                        <div class="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-rose-700">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                </div>

                <!-- Nominal (Rp) -->
                <div class="relative z-10">
                    <label class="block mb-2 text-[11px] font-bold text-rose-900 uppercase tracking-widest pl-1">
                        Nominal <span class="text-rose-600">*</span>
                    </label>
                    <div class="relative">
                        <div class="absolute inset-y-0 z-10 left-0 flex items-center pl-5 pointer-events-none">
                            <span class="text-rose-800/70 font-bold text-sm">Rp</span>
                        </div>
                        <input v-model="form.nominal" type="number" min="0" placeholder="0" required
                            class="w-full pl-14 pr-5 py-3.5 text-rose-950 placeholder:text-rose-700/50 bg-rose-300/50 border border-rose-400/40 rounded-2xl shadow-inner focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all backdrop-blur-sm font-semibold">
                    </div>
                </div>

                <!-- Periode Bulan & Tahun -->
                <div class="relative z-10">
                    <label class="block mb-2 text-[11px] font-bold text-rose-900 uppercase tracking-widest pl-1">
                        Periode (Bulan & Tahun) <span class="text-rose-600">*</span>
                    </label>
                    <div class="relative">
                        <input v-model="form.bulanTahun" type="month" required
                            class="w-full px-5 py-3.5 text-rose-950 bg-rose-300/50 border border-rose-400/40 rounded-2xl shadow-inner focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all backdrop-blur-sm appearance-none">
                    </div>
                </div>

                <!-- Keterangan Tambahan -->
                <div class="relative z-10">
                    <label class="block mb-2 text-[11px] font-bold text-rose-900 uppercase tracking-widest pl-1">
                        Keterangan Tambahan
                    </label>
                    <textarea v-model="form.keterangan" rows="3" placeholder="Contoh: Pembelian alat tulis..."
                        class="w-full px-5 py-4 text-rose-950 placeholder:text-rose-700/50 bg-rose-300/50 border border-rose-400/40 rounded-2xl shadow-inner focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all resize-none backdrop-blur-sm"></textarea>
                </div>

                <!-- Tombol Submit Bento Style -->
                <div class="mt-2 relative z-10">
                    <button type="submit"
                        class="w-full group relative flex items-center justify-center p-4 rounded-[1.5rem] bg-rose-600 shadow-md hover:bg-rose-700 active:scale-95 transition-all duration-300 overflow-hidden">
                        <div
                            class="absolute -top-6 -right-6 w-20 h-20 bg-rose-500 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-500">
                        </div>
                        <span class="text-sm font-bold text-rose-50 z-10 tracking-wide">
                            Simpan Data Pengeluaran
                        </span>
                        <svg class="w-5 h-5 ml-2 text-rose-100 z-10 group-hover:translate-x-1 transition-transform"
                            fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
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
import { ref } from 'vue';
import { db } from '../database/db';
import dayjs from 'dayjs';
import { useToast } from '../composables/useToast';

const { showToast } = useToast();

const form = ref({
    jenis: '',
    nominal: '',
    bulanTahun: dayjs().format('YYYY-MM'),
    keterangan: ''
});

const simpanBiaya = async () => {
    try {
        await db.pengeluaran.add({
            jenis: form.value.jenis,
            nominal: Number(form.value.nominal),
            bulanTahun: form.value.bulanTahun,
            keterangan: form.value.keterangan
        });
        showToast('Data biaya berhasil disimpan!', 'success');
        form.value.nominal = '';
        form.value.keterangan = '';
    } catch (error) {
        console.error(error);
        showToast('Gagal menyimpan biaya', 'error');
    }
};
</script>