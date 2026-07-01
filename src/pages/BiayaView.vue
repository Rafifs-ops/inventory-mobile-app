<template>
    <div class="min-h-screen bg-gray-50 text-slate-800 p-6 flex flex-col items-center py-12">

        <div class="w-full max-w-md mb-6 text-center">
            <h2 class="text-2xl font-bold text-slate-800 tracking-tight">
                Pencatatan Pengeluaran
            </h2>
            <p class="text-sm text-slate-500 mt-1">
                Masukkan detail pengeluaran operasional atau bahan baku
            </p>
        </div>

        <div class="w-full max-w-md bg-white border border-gray-200 shadow-sm rounded-xl overflow-hidden">
            <form @submit.prevent="simpanBiaya" class="p-6 space-y-5">

                <div>
                    <label class="block mb-1.5 text-sm font-medium text-slate-700">
                        Kategori Pengeluaran <span class="text-red-500">*</span>
                    </label>
                    <select v-model="form.jenis"
                        class="w-full p-2.5 text-slate-800 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
                        required>
                        <option value="" disabled selected>Pilih Kategori...</option>
                        <option value="pemasaran">Biaya Pemasaran</option>
                        <option value="admin">Biaya Admin</option>
                        <option value="sewa">Biaya Sewa</option>
                    </select>
                </div>

                <div>
                    <label class="block mb-1.5 text-sm font-medium text-slate-700">
                        Nominal (Rp) <span class="text-red-500">*</span>
                    </label>
                    <div class="relative">
                        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <span class="text-slate-500 sm:text-sm">Rp</span>
                        </div>
                        <input v-model="form.nominal" type="number" min="0" placeholder="0"
                            class="w-full p-2.5 pl-10 text-slate-800 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
                            required>
                    </div>
                </div>

                <div>
                    <label class="block mb-1.5 text-sm font-medium text-slate-700">
                        Periode (Bulan & Tahun) <span class="text-red-500">*</span>
                    </label>
                    <input v-model="form.bulanTahun" type="month"
                        class="w-full p-2.5 text-slate-800 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
                        required>
                </div>

                <div>
                    <label class="block mb-1.5 text-sm font-medium text-slate-700">
                        Keterangan Tambahan
                    </label>
                    <textarea v-model="form.keterangan" rows="3"
                        placeholder="Contoh: Pembelian tinta printer dan kertas HVS..."
                        class="w-full p-2.5 text-slate-800 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow resize-none"></textarea>
                </div>

                <div class="pt-2">
                    <button type="submit"
                        class="w-full py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
                        Simpan Data Pengeluaran
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