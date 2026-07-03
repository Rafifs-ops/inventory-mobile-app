import Dexie from 'dexie';

export const db = new Dexie('SmartInventoryDb');

db.version(1).stores({
    produk: 'id, nama, harga, hpp, quantity, createdAt',
    penjualan: '++id, tanggal, totalPenjualan, totalHpp, *items',
    pengeluaran: '++id, bulanTahun, jenis, nominal, keterangan', // jenis: pemasaran, admin, sewa, operasional, bahan_baku, lain_lain
    persediaan: 'bulanTahun, totalNilai' // snapshot persediaan akhir bulan
});