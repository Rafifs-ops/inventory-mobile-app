import { db } from '../database/db';
import dayjs from 'dayjs'; // Anda sudah menggunakan dayjs
import * as XLSX from 'xlsx';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';

export const exportLabaRugiExcel = async (bulanTahun) => { // Parameter format: 'YYYY-MM'
    try {
        // 1. AMBIL & HITUNG DATA DARI DEXIE
        // Ambil penjualan pada bulan yang dipilih
        const semuaPenjualan = await db.penjualan.toArray();
        const penjualanBulanIni = semuaPenjualan.filter(p =>
            dayjs(p.tanggal).format('YYYY-MM') === bulanTahun
        );

        const totalPenjualan = penjualanBulanIni.reduce((sum, p) => sum + (p.totalPenjualan || 0), 0);
        const totalHpp = penjualanBulanIni.reduce((sum, p) => sum + (p.totalHpp || 0), 0);
        const labaKotor = totalPenjualan - totalHpp;

        // Ambil pengeluaran pada bulan yang dipilih berdasarkan field 'bulanTahun'
        const pengeluaranBulanIni = await db.pengeluaran
            .where('bulanTahun').equals(bulanTahun)
            .toArray();

        const totalPengeluaran = pengeluaranBulanIni.reduce((sum, p) => sum + (p.nominal || 0), 0);
        const labaBersih = labaKotor - totalPengeluaran;

        // 2. SUSUN DATA UNTUK EXCEL (Bentuk Array of Arrays)
        const excelData = [
            ['LAPORAN LABA RUGI'],
            ['Periode:', dayjs(bulanTahun).format('MMMM YYYY')],
            [], // Baris kosong
            ['PENDAPATAN'],
            ['Total Penjualan', totalPenjualan],
            ['Harga Pokok Penjualan (HPP)', `-${totalHpp}`], // Tanda minus agar jelas sebagai pengurang
            ['Laba Kotor', labaKotor],
            [],
            ['BEBAN / PENGELUARAN']
        ];

        // Masukkan rincian pengeluaran
        if (pengeluaranBulanIni.length > 0) {
            pengeluaranBulanIni.forEach(p => {
                excelData.push([`  - ${p.jenis} (${p.keterangan || '-'})`, p.nominal]);
            });
        } else {
            excelData.push(['  - Tidak ada pengeluaran', 0]);
        }

        excelData.push(['Total Pengeluaran', totalPengeluaran]);
        excelData.push([]);
        excelData.push(['LABA BERSIH', labaBersih]);

        // 3. GENERATE WORKSHEET & WORKBOOK
        const ws = XLSX.utils.aoa_to_sheet(excelData);

        // Opsional: atur lebar kolom agar rapi
        ws['!cols'] = [{ wch: 35 }, { wch: 20 }];

        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Laba Rugi');

        // 4. CONVERT KE BASE64 UNTUK DISIMPAN DI MOBILE (CAPACITOR)
        const base64Data = XLSX.write(wb, { type: 'base64', bookType: 'xlsx' });
        const fileName = `Laba_Rugi_${bulanTahun}.xlsx`;

        // 5. SIMPAN KE CACHE DAN SHARE
        const writeResult = await Filesystem.writeFile({
            path: fileName,
            data: base64Data,
            directory: Directory.Cache
        });

        await Share.share({
            title: `Laporan Laba Rugi periode ${bulanTahun}`,
            text: `Berikut adalah laporan laba rugi untuk periode ${bulanTahun}`,
            url: writeResult.uri,
            dialogTitle: 'Simpan atau Bagikan Laporan'
        });

        return true; // Menandakan sukses
    } catch (error) {
        console.error('Gagal membuat laporan Excel:', error);
        throw error;
    }
};