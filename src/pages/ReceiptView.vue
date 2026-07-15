<template>
    <div
        class="min-h-screen bg-gradient-to-br from-blue-800 to-blue-600 text-slate-900 pb-10 sm:py-12 flex flex-col items-center">
        <div class="w-full sm:max-w-md px-5 sm:px-0">
            <div class="pt-6 sm:pt-0 mb-6 sm:mb-8 text-center border-b border-slate-100 sm:border-none pb-4 sm:pb-0">
                <div class="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-4">
                    <svg class="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h2 class="text-2xl font-bold text-white tracking-tight">Transaksi Berhasil!</h2>
                <p class="text-sm text-white mt-1.5">Penjualan telah disimpan ke sistem.</p>
            </div>

            <div class="bg-white border border-slate-200 rounded-2xl sm:rounded-xl shadow-sm overflow-hidden mb-6">
                <div class="px-5 py-4 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
                    <h3 class="text-sm font-bold text-slate-800 uppercase tracking-wide">Ringkasan Nota</h3>
                    <span class="text-xs font-mono text-slate-500">{{ transaksi?.tanggal }}</span>
                </div>
                <div class="p-5">
                    <div class="space-y-3 mb-4">
                        <div v-for="(item, index) in transaksi?.items" :key="index"
                            class="flex justify-between items-start text-sm">
                            <div>
                                <p class="font-bold text-slate-800">{{ item.nama }}</p>
                                <p class="text-slate-500">{{ item.quantity }} x Rp {{
                                    Number(item.harga).toLocaleString('id-ID') }}</p>
                            </div>
                            <p class="font-bold text-slate-900">Rp {{ (Number(item.harga) *
                                item.quantity).toLocaleString('id-ID') }}</p>
                        </div>
                    </div>
                    <div class="pt-4 border-t border-slate-200 border-dashed flex justify-between items-center">
                        <p class="text-base font-bold text-slate-800 uppercase tracking-wider">Total Penjualan</p>
                        <p class="text-xl font-bold text-blue-600">Rp {{ (transaksi?.totalPenjualan ||
                            0).toLocaleString('id-ID') }}</p>
                    </div>

                    <img :src="qrCodeBase64" alt="QR Code Nota"
                        class="w-40 h-40 object-contain bg-white p-2 rounded-lg shadow-sm border border-slate-100 my-3 mx-auto text-center" />
                </div>
            </div>

            <div class="space-y-3">
                <button @click="unduhPDF"
                    class="w-full flex items-center justify-center gap-2 py-4 sm:py-3.5 text-base sm:text-sm font-bold text-white bg-red-600 border border-red-200 rounded-2xl sm:rounded-xl shadow-sm hover:bg-red-700 hover:shadow active:bg-red-800 active:scale-[0.99] transition-all">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Unduh Nota (PDF)
                </button>
                <RouterLink to="/scan"
                    class="w-full flex items-center justify-center gap-2 py-4 sm:py-3.5 text-base sm:text-sm font-bold text-white bg-gradient-to-br from-green-600 to-green-400 border border-transparent rounded-2xl sm:rounded-xl shadow-md hover:shadow-lg active:scale-[0.99] transition-all">
                    Transaksi Baru
                </RouterLink>
            </div>

            <div class="mt-6 w-full flex justify-center">
                <RouterLink to="/"
                    class="flex items-center px-4 py-2 text-sm font-medium text-white transition-colors rounded-lg">
                    <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Kembali ke Beranda
                </RouterLink>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { db } from '../database/db';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import autoTable from 'jspdf-autotable';
import { saveAndSharePDF } from '../utils/pdfHandler';
import dayjs from 'dayjs';
import QRCode from 'qrcode'; // <--- Import di sini
import { useToast } from '../composables/useToast';

const route = useRoute();
const router = useRouter();
const { showToast } = useToast();
const transaksi = ref(null);

const qrCodeBase64 = ref(null);

onMounted(async () => {
    const id = Number(route.query.id);
    if (id) {
        transaksi.value = await db.penjualan.get(id);
        // Generate QR Code di sini setelah data transaksi di-fetch
        if (transaksi.value && transaksi.value.tokenNota) {
            const urlTujuan = `https://rafifs-ops.github.io/note-viewer-smartpos/?t=${transaksi.value.tokenNota}`;
            qrCodeBase64.value = await QRCode.toDataURL(urlTujuan, { margin: 4, width: 500, errorCorrectionLevel: 'L', scale: 4 });
        }
    }
    if (!transaksi.value) {
        showToast("Data transaksi tidak ditemukan!", "error");
        router.replace('/');
    }
});

const unduhPDF = async () => {
    if (!transaksi.value) return;
    const doc = new jsPDF();
    const warnaUtama = [41, 128, 185]; // Format RGB (Red, Green, Blue)

    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(warnaUtama[0], warnaUtama[1], warnaUtama[2]);
    doc.text("Nota Penjualan - Smart Inventory", 14, 22);

    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    doc.text(`Tanggal: ${transaksi.value.tanggal}`, 14, 30);

    const tableData = transaksi.value.items.map((p, index) => [
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
        foot: [['', 'TOTAL', '', '', `Rp ${transaksi.value.totalPenjualan.toLocaleString('id-ID')}`]],
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
            0: { halign: 'center' },
            1: { halign: 'center' },
            2: { halign: 'center' },
            3: { halign: 'center' },
            4: { halign: 'center' }
        }
    });

    const finalY = doc.lastAutoTable.finalY;

    // -- KODE BARU: Menambahkan QR Code di bawah nota --
    if (qrCodeBase64.value) {
        const qrSize = 40; // Lebar dan Tinggi QR Code dalam satuan dokumen (milimeter)
        const posX = 14;   // Jarak dari kiri
        const posY = finalY + 10; // Jarak dari tabel (turun sedikit)

        // Format: addImage(imageData, format, x, y, width, height)
        doc.addImage(qrCodeBase64.value, 'PNG', posX, posY, qrSize, qrSize);

        // Teks di sebelah QR Code
        doc.setFontSize(10);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(warnaUtama[0], warnaUtama[1], warnaUtama[2]);
        doc.text('Scan untuk Cek Nota Online', posX + qrSize + 5, posY + 20);
    }
    await saveAndSharePDF(doc, `Nota_${dayjs(transaksi.value.tanggal).format('YYYYMMDD_HHmmss')}.pdf`);
};
</script>
