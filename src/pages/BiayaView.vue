<template>
    <div class="min-h-screen bg-white sm:bg-slate-50 text-slate-900 flex flex-col sm:items-center sm:py-12">

        <div
            class="w-full sm:max-w-md bg-white sm:border sm:border-slate-200 sm:shadow-sm sm:rounded-2xl flex-grow sm:flex-grow-0 flex flex-col">

            <div class="px-5 pt-8 pb-6 sm:px-6 sm:pt-6 sm:pb-4 border-b border-slate-100 sm:border-none">
                <h2 class="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                    Pencatatan Pengeluaran
                </h2>
                <p class="text-sm text-slate-500 mt-1.5 leading-relaxed">
                    Masukkan detail pengeluaran operasional atau bahan baku perusahaan.
                </p>
            </div>

            <form @submit.prevent="simpanBiaya" class="px-5 py-6 sm:px-6 space-y-5 sm:space-y-4 flex-grow">

                <div>
                    <label class="block mb-2 sm:mb-1.5 text-sm font-semibold text-slate-700">
                        Kategori Pengeluaran <span class="text-red-600">*</span>
                    </label>
                    <select v-model="form.jenis"
                        class="w-full px-4 py-3 sm:py-2.5 text-base sm:text-sm text-slate-900 bg-slate-50 border border-slate-300 rounded-xl sm:rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-colors appearance-none"
                        required>
                        <option value="" disabled selected>Pilih Kategori...</option>
                        <option value="pemasaran">Biaya Pemasaran</option>
                        <option value="admin">Biaya Admin</option>
                        <option value="sewa">Biaya Sewa</option>
                    </select>
                </div>

                <div>
                    <label class="block mb-2 sm:mb-1.5 text-sm font-semibold text-slate-700">
                        Nominal (Rp) <span class="text-red-600">*</span>
                    </label>
                    <div class="relative">
                        <div class="absolute inset-y-0 left-0 flex items-center pl-4 sm:pl-3 pointer-events-none">
                            <span class="text-slate-500 text-base sm:text-sm font-medium">Rp</span>
                        </div>
                        <input v-model="form.nominal" type="number" min="0" placeholder="0"
                            class="w-full pl-12 sm:pl-10 pr-4 py-3 sm:py-2.5 text-base sm:text-sm text-slate-900 bg-slate-50 border border-slate-300 rounded-xl sm:rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-colors"
                            required>
                    </div>
                </div>

                <div>
                    <label class="block mb-2 sm:mb-1.5 text-sm font-semibold text-slate-700">
                        Periode (Bulan & Tahun) <span class="text-red-600">*</span>
                    </label>
                    <input v-model="form.bulanTahun" type="month"
                        class="w-full px-4 py-3 sm:py-2.5 text-base sm:text-sm text-slate-900 bg-slate-50 border border-slate-300 rounded-xl sm:rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-colors"
                        required>
                </div>

                <div>
                    <label class="block mb-2 sm:mb-1.5 text-sm font-semibold text-slate-700">
                        Keterangan Tambahan
                    </label>
                    <textarea v-model="form.keterangan" rows="3"
                        placeholder="Contoh: Pembelian tinta printer dan kertas HVS..."
                        class="w-full px-4 py-3 sm:py-2.5 text-base sm:text-sm text-slate-900 bg-slate-50 border border-slate-300 rounded-xl sm:rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-colors resize-none"></textarea>
                </div>

                <div class="pt-4 sm:pt-2 pb-6 sm:pb-0">
                    <button type="submit"
                        class="w-full py-3.5 sm:py-2.5 text-base sm:text-sm font-semibold text-white bg-blue-700 rounded-xl sm:rounded-lg shadow-sm hover:bg-blue-800 active:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 transition-colors">
                        Simpan Data Pengeluaran
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
import { ref } from 'vue';
import { db } from '../database/db';
import dayjs from 'dayjs';

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
        alert('Data biaya berhasil disimpan!');
        form.value.nominal = '';
        form.value.keterangan = '';
    } catch (error) {
        console.error(error);
        alert('Gagal menyimpan biaya');
    }
};
</script>