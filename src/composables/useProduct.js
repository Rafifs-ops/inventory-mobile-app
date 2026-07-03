import { ref } from 'vue';
import { db } from '../database/db'; // Sesuaikan path dengan lokasi file db.js Anda

const productList = ref([]);

export function useProducts() {

    // Fungsi untuk mengambil semua data dari tabel 'produk'
    const loadProducts = async () => {
        try {
            productList.value = await db.produk.orderBy('createdAt').reverse().toArray();
        } catch (error) {
            console.error('Gagal memuat data:', error);
        }
    };

    // Fungsi untuk mencari satu produk berdasarkan ID Barcode
    const getProduct = async (id) => {
        try {
            return await db.produk.get(id); // Mengembalikan objek produk atau undefined
        } catch (error) {
            console.error('Gagal mencari produk:', error);
            return null;
        }
    };

    // Fungsi untuk menyimpan atau memperbarui produk
    const addProduct = async (product) => {
        try {
            // Menggunakan put() alih-alih add() agar jika ID sudah ada, data akan di-update (Upsert)
            await db.produk.put(product);
            await loadProducts(); // Refresh list setelah menyimpan
        } catch (error) {
            console.error('Gagal menyimpan produk:', error);
        }
    };

    const deleteProduct = async (id) => {
        try {
            await db.produk.delete(id); // Menghapus dari database Dexie
            await loadProducts();       // Memperbarui daftar state secara otomatis
        } catch (error) {
            console.error('Gagal menghapus produk:', error);
        }
    };

    // Fungsi untuk mengurangi stok saat penjualan selesai
    const decreaseProductStock = async (id, qtySold) => {
        try {
            const product = await db.produk.get(id);
            if (product && product.quantity !== undefined) {
                const newQty = Math.max(0, product.quantity - qtySold);
                await db.produk.update(id, { quantity: newQty });
            }
        } catch (error) {
            console.error('Gagal mengupdate stok produk:', error);
        }
    };

    // Fungsi untuk mengubah stok secara langsung
    const updateProductStock = async (id, newQty) => {
        try {
            await db.produk.update(id, { quantity: Math.max(0, newQty) });
            await loadProducts(); // Refresh list setelah update
        } catch (error) {
            console.error('Gagal mengupdate stok produk:', error);
        }
    };

    // Fungsi untuk mengubah detail produk (nama, harga, hpp)
    const updateProductDetails = async (id, updatedData) => {
        try {
            await db.produk.update(id, updatedData);
            await loadProducts();
        } catch (error) {
            console.error('Gagal mengupdate detail produk:', error);
        }
    };

    return { productList, loadProducts, getProduct, addProduct, deleteProduct, decreaseProductStock, updateProductStock, updateProductDetails };
}