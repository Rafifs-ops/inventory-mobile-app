import Dexie from 'dexie';

export const db = new Dexie('InventoryDB');

db.version(1).stores({
    produk: 'id, nama, harga, hpp',
    penjualan: '++id, tanggal, totalPenjualan, totalHpp, *items', // Menyimpan riwayat transaksi
    pengeluaran: '++id, bulanTahun, jenis, nominal, keterangan' // jenis: 'operasional' | 'bahan_baku'
});