<template>
    <div class="min-h-screen bg-white sm:bg-slate-50 text-slate-900 pb-10 sm:py-12 flex flex-col items-center">
        <div class="w-full sm:max-w-3xl px-5 sm:px-0">
            <div class="pt-6 sm:pt-0 mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-5 sm:gap-4">
                <div>
                    <h2 class="text-2xl font-bold text-slate-900 tracking-tight">Riwayat Penjualan</h2>
                    <p class="text-sm text-slate-500 mt-1.5">Daftar transaksi penjualan yang telah selesai</p>
                </div>
            </div>

            <div class="space-y-4">
                <div v-for="item in riwayat" :key="item.id" class="bg-white p-5 rounded-2xl sm:rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div class="flex-1">
                        <div class="flex items-center gap-3 mb-2">
                            <span class="px-2.5 py-1 text-xs font-mono font-bold text-emerald-700 bg-emerald-100 rounded-md">ID: {{ item.id }}</span>
                            <span class="text-sm font-medium text-slate-500">{{ item.tanggal }}</span>
                        </div>
                        <p class="text-lg font-bold text-slate-900 mb-1">Rp {{ item.totalPenjualan.toLocaleString('id-ID') }}</p>
                        <p class="text-sm text-slate-600">{{ item.items.length }} macam produk terjual</p>
                    </div>
                    <div>
                        <button @click="unduhPDF(item)"
                            class="w-full sm:w-auto px-4 py-2 text-sm font-bold text-blue-700 bg-blue-50 border border-blue-200 rounded-xl hover:bg-blue-100 focus:outline-none transition-colors">
                            Unduh Nota (PDF)
                        </button>
                    </div>
                </div>

                <div v-if="riwayat.length === 0" class="w-full px-6 py-16 text-center bg-slate-50 border-2 border-slate-200 border-dashed rounded-2xl shadow-sm">
                    <p class="text-sm text-slate-500">Belum ada riwayat penjualan.</p>
                </div>
            </div>

            <div class="py-6 sm:py-0 sm:mt-8 w-full flex justify-center">
                <RouterLink to="/" class="flex items-center px-4 py-2 text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors rounded-lg">
                    Kembali ke Beranda
                </RouterLink>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { db } from '../database/db';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import autoTable from 'jspdf-autotable';
import { saveAndSharePDF } from '../utils/pdfHandler';
import dayjs from 'dayjs';

const riwayat = ref([]);

onMounted(async () => {
    riwayat.value = await db.penjualan.orderBy('id').reverse().toArray();
});

const unduhPDF = async (transaksi) => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Nota Penjualan - Smart Inventory", 14, 22);

    doc.setFontSize(11);
    doc.text(`Tanggal: ${transaksi.tanggal}`, 14, 30);

    const tableData = transaksi.items.map((p, index) => [
        index + 1,
        p.nama,
        p.quantity,
        `Rp ${Number(p.harga).toLocaleString('id-ID')}`,
        `Rp ${(Number(p.harga) * p.quantity).toLocaleString('id-ID')}`
    ]);

    autoTable(doc, {
        startY: 35,
        head: [['No', 'Nama Produk', 'Qty', 'Harga', 'Subtotal']],
        body: tableData,
        foot: [['', 'TOTAL', '', '', `Rp ${transaksi.totalPenjualan.toLocaleString('id-ID')}`]],
        theme: 'striped'
    });

    await saveAndSharePDF(doc, `Nota_${dayjs(transaksi.tanggal).format('YYYYMMDD_HHmmss')}.pdf`);
};
</script>
