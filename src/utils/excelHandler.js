import { db } from '../database/db';
import dayjs from 'dayjs'; // Anda sudah menggunakan dayjs
import * as XLSX from 'xlsx';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';

export const exportLabaRugiExcel = async (periodeParam) => { 
    try {
        let penjualanData = [];
        let pengeluaranData = [];
        let periodeTextStr = '';

        if (periodeParam === 'Seluruh Waktu') {
            penjualanData = await db.penjualan.toArray();
            pengeluaranData = await db.pengeluaran.toArray();
            periodeTextStr = 'Seluruh Waktu';
        } else if (periodeParam === '1 Semester Terakhir') {
            const semesterAwal = dayjs().subtract(5, 'month').startOf('month').format('YYYY-MM-DD HH:mm:ss');
            const semesterAkhir = dayjs().endOf('month').format('YYYY-MM-DD HH:mm:ss');
            const startMonthStr = dayjs().subtract(5, 'month').format('YYYY-MM');
            const endMonthStr = dayjs().format('YYYY-MM');
            
            penjualanData = await db.penjualan
                .where('tanggal').between(semesterAwal, semesterAkhir, true, true)
                .toArray();
            pengeluaranData = await db.pengeluaran
                .where('bulanTahun').between(startMonthStr, endMonthStr, true, true)
                .toArray();
            periodeTextStr = '1 Semester Terakhir';
        } else {
            // Asumsi format 'YYYY-MM'
            const bulanAwal = dayjs(periodeParam).startOf('month').format('YYYY-MM-DD HH:mm:ss');
            const bulanAkhir = dayjs(periodeParam).endOf('month').format('YYYY-MM-DD HH:mm:ss');
            
            penjualanData = await db.penjualan
                .where('tanggal').between(bulanAwal, bulanAkhir, true, true)
                .toArray();
            pengeluaranData = await db.pengeluaran
                .where('bulanTahun').equals(periodeParam)
                .toArray();
            periodeTextStr = dayjs(periodeParam).format('MMMM YYYY');
        }

        const totalPenjualan = penjualanData.reduce((sum, p) => sum + (Number(p.totalPenjualan) || 0), 0);
        const totalHpp = penjualanData.reduce((sum, p) => sum + (Number(p.totalHpp) || 0), 0);
        const labaKotor = totalPenjualan - totalHpp;

        const totalPengeluaran = pengeluaranData.reduce((sum, p) => sum + (Number(p.nominal) || 0), 0);
        const labaBersih = labaKotor - totalPengeluaran;

        // 2. SUSUN DATA UNTUK EXCEL (Bentuk Array of Arrays)
        const excelData = [
            ['LAPORAN LABA RUGI'],
            ['Periode:', periodeTextStr],
            [], // Baris kosong
            ['PENDAPATAN'],
            ['Total Penjualan', totalPenjualan],
            ['Harga Pokok Penjualan (HPP)', `-${totalHpp}`], // Tanda minus agar jelas sebagai pengurang
            ['Laba Kotor', labaKotor],
            [],
            ['BEBAN / PENGELUARAN']
        ];

        // Masukkan rincian pengeluaran
        if (pengeluaranData.length > 0) {
            pengeluaranData.forEach(p => {
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
        
        let safePeriodeName = periodeParam.replace(/\s+/g, '_');
        const fileName = `Laba_Rugi_${safePeriodeName}.xlsx`;

        // 5. SIMPAN KE CACHE DAN SHARE
        const writeResult = await Filesystem.writeFile({
            path: fileName,
            data: base64Data,
            directory: Directory.Cache
        });

        await Share.share({
            title: `Laporan Laba Rugi periode ${periodeTextStr}`,
            text: `Berikut adalah laporan laba rugi untuk periode ${periodeTextStr}`,
            url: writeResult.uri,
            dialogTitle: 'Simpan atau Bagikan Laporan'
        });

        return true; // Menandakan sukses
    } catch (error) {
        console.error('Gagal membuat laporan Excel:', error);
        throw error;
    }
};