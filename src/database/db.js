import Dexie from 'dexie';

export const db = new Dexie('InventoryDB');

// Tingkatkan versi menjadi 2 untuk menambahkan tabel baru tanpa menghapus data lama
db.version(2).stores({
    produk: 'id, nama, harga, hpp',
    penjualan: '++id, tanggal, totalPenjualan, totalHpp, *items', // Menyimpan riwayat transaksi
    pengeluaran: '++id, bulanTahun, jenis, nominal, keterangan' // jenis: 'operasional' | 'bahan_baku'
});