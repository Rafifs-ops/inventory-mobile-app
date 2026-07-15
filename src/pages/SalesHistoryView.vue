<template>
    <div
        class="min-h-screen bg-gradient-to-br from-blue-800 to-blue-600 text-white pb-10 sm:py-12 flex flex-col items-center">
        <div class="w-full sm:max-w-3xl px-5 sm:px-0">
            <div
                class="pt-6 sm:pt-0 mb-6 sm:mb-8 text-center flex flex-col sm:flex-row sm:items-end justify-between gap-5 sm:gap-4">
                <div>
                    <h2 class="text-2xl font-bold text-white tracking-tight">Riwayat Penjualan</h2>
                    <p class="text-sm text-white mt-1.5">Daftar transaksi penjualan yang telah selesai</p>
                </div>
            </div>

            <div class="space-y-4">
                <div v-for="item in riwayat" :key="item.id"
                    class="bg-white p-5 rounded-2xl sm:rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div class="flex-1">
                        <div class="flex items-center gap-3 mb-2">
                            <span
                                class="px-2.5 py-1 text-xs font-mono font-bold text-emerald-700 bg-emerald-100 rounded-md">ID:
                                {{ item.id }}</span>
                            <span class="text-sm font-medium text-slate-500">{{ item.tanggal }}</span>
                        </div>
                        <p class="text-lg font-bold text-slate-900 mb-1">Rp {{
                            item.totalPenjualan.toLocaleString('id-ID') }}</p>
                        <p class="text-sm text-slate-600">{{ item.items.length }} macam produk terjual</p>
                    </div>
                    <div>
                        <button @click="unduhPDF(item)"
                            class="w-full sm:w-auto px-4 py-2 text-sm font-bold text-blue-700 bg-blue-50 border border-blue-200 rounded-xl hover:bg-blue-100 focus:outline-none transition-colors">
                            Unduh Nota (PDF)
                        </button>
                    </div>
                </div>

                <div v-if="riwayat.length === 0"
                    class="w-full px-6 py-16 text-center bg-slate-50/50 sm:bg-white border-2 border-slate-200 border-dashed rounded-2xl sm:rounded-xl shadow-sm">
                    <svg class="mx-auto h-12 w-12 text-white mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                        aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                    <h3 class="text-base font-bold text-white tracking-tight">Belum ada riwayat penjualan</h3>
                    <p class="mt-1.5 text-sm text-white max-w-sm mx-auto">Tidak ada riwayat penjualan yang terdaftar di
                        database
                        saat ini.</p>
                </div>

                <div class="py-6 sm:py-0 sm:mt-8 w-full sm:max-w-3xl flex justify-center">
                    <RouterLink to="/"
                        class="flex items-center px-4 py-2 text-sm font-medium text-white hover:text-slate-800 transition-colors rounded-lg">
                        <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Kembali ke Menu Utama
                    </RouterLink>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import { db } from '../database/db';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import autoTable from 'jspdf-autotable';
import { saveAndSharePDF } from '../utils/pdfHandler';
import dayjs from 'dayjs';
import QRCode from 'qrcode';

const riwayat = ref([]);

onMounted(async () => {
    riwayat.value = await db.penjualan.orderBy('id').reverse().toArray();
});

const unduhPDF = async (transaksi) => {
    const doc = new jsPDF();
    const warnaUtama = [41, 128, 185]; // Format RGB (Red, Green, Blue)

    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(warnaUtama[0], warnaUtama[1], warnaUtama[2]);
    doc.text("Nota Penjualan - Smart Inventory", 14, 22);

    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    doc.text(`Tanggal: ${transaksi.tanggal}`, 14, 30);

    const tableData = transaksi.items.map((p, index) => [
        index + 1,
        p.nama,
        `Rp ${Number(p.harga).toLocaleString('id-ID')}`,
        p.quantity,
        `Rp ${(Number(p.harga) * p.quantity).toLocaleString('id-ID')}`
    ]);

    autoTable(doc, {
        startY: 35,
        head: [['No', 'Nama Produk', 'Harga', 'Qty', 'Subtotal']],
        body: tableData,
        foot: [['', 'TOTAL', '', '', `Rp ${transaksi.totalPenjualan.toLocaleString('id-ID')}`]],
        theme: 'grid', // Memakai garis kotak-kotak sesuai referensi gambar
        headStyles: {
            fillColor: warnaUtama, // Warna background header tabel
            textColor: 255, // Teks putih
            fontStyle: 'bold',
            halign: 'center'
        },
        footStyles: {
            fillColor: [240, 240, 240], // Warna abu-abu terang untuk baris Total
            textColor: [0, 0, 0],
            fontStyle: 'bold',
        },
        columnStyles: {
            0: { halign: 'left' },
            1: { halign: 'right' },
            2: { halign: 'center' },
            3: { halign: 'right' } // Subtotal rata kanan agar sejajar angkanya
        }
    });

    const finalY = doc.lastAutoTable.finalY;

    // -- KODE BARU: Menambahkan QR Code di bawah nota --
    if (transaksi.tokenNota) {
        const urlTujuan = `https://rafifs-ops.github.io/note-viewer-smartpos/?t=${transaksi.tokenNota}`;
        const qrCodeBase64 = await QRCode.toDataURL(urlTujuan, { margin: 4, width: 500, errorCorrectionLevel: 'H' });
        const qrSize = 40; // Lebar dan Tinggi QR Code dalam satuan dokumen (milimeter)
        const posX = 14;   // Jarak dari kiri
        const posY = finalY + 10; // Jarak dari tabel (turun sedikit)

        // Format: addImage(imageData, format, x, y, width, height)
        doc.addImage(qrCodeBase64, 'PNG', posX, posY, qrSize, qrSize);

        // Teks di sebelah QR Code
        doc.setFontSize(10);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(warnaUtama[0], warnaUtama[1], warnaUtama[2]);
        doc.text('Scan untuk Cek Nota Online', posX + qrSize + 5, posY + 20);
    }

    await saveAndSharePDF(doc, `Nota_${dayjs(transaksi.tanggal).format('YYYYMMDD_HHmmss')}.pdf`);
};
</script>
